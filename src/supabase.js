import { createClient } from '@supabase/supabase-js';

// Configuration du projet Supabase Sakbi
export const SUPABASE_URL = 'https://jcvpeyzetqgahoyryxhl.supabase.co';

// Récupération de la clé publishable / anon : vérifie le cache local ou la valeur par défaut
const savedAnonKey = typeof window !== 'undefined' ? (localStorage.getItem('sakbi_supabase_anon_key') || '') : '';
export const SUPABASE_ANON_KEY = savedAnonKey || 'sb_publishable_2kl0_LWNR1AFn-ozn-t8Hg_6VaZT4Df';

// Instance du client Supabase
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  }
});

/**
 * Met à jour dynamiquement la clé API anon et réinitialise le client
 */
export function setSupabaseAnonKey(newKey) {
  if (typeof window !== 'undefined' && newKey) {
    localStorage.setItem('sakbi_supabase_anon_key', newKey.trim());
    window.location.reload();
  }
}

/**
 * Vérifie si la connexion Supabase est opérationnelle
 */
export async function testSupabaseConnection() {
  try {
    const { data, error } = await supabase.from('products').select('id').limit(1);
    if (error && error.code === 'PGRST301') {
      return { connected: false, reason: 'unauthorized_key' };
    }
    if (error && error.code === '42P01') {
      return { connected: true, tablesReady: false, reason: 'tables_not_created' };
    }
    return { connected: true, tablesReady: true };
  } catch (err) {
    return { connected: false, reason: err.message };
  }
}

/* ==============================================================
   1. MODULE AUTHENTIFICATION (Marchands)
   ============================================================== */

export async function authSignUp({ email, password, fullName, phone, storeName }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        phone: phone,
        store_name: storeName
      }
    }
  });

  if (error) throw error;

  // Création immédiate de la boutique liée au profil
  if (data?.user) {
    try {
      const slug = (storeName || 'boutique')
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '') || `boutique-${Date.now().toString().slice(-4)}`;

      await supabase.from('stores').insert({
        owner_id: data.user.id,
        name: storeName || 'Ma Boutique Sakbi',
        slug: slug,
        currency: 'XOF',
        country: 'Sénégal',
        plan: 'starter'
      });
    } catch (e) {
      console.warn('Création boutique via trigger ou manuelle :', e);
    }
  }

  return data;
}

export async function authSignIn({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });
  if (error) throw error;
  return data;
}

export async function authSignOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
  if (typeof window !== 'undefined') {
    localStorage.removeItem('sakbi_auth_session');
  }
}

export async function getCurrentUser() {
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) return null;
  return user;
}

/* ==============================================================
   2. MODULE BOUTIQUE (Store)
   ============================================================== */

export async function getStoreByOwner(userId) {
  const { data, error } = await supabase
    .from('stores')
    .select('*')
    .eq('owner_id', userId)
    .single();

  if (error && error.code !== 'PGRST116') throw error;
  return data;
}

export async function updateStore(storeId, updates) {
  const { data, error } = await supabase
    .from('stores')
    .update(updates)
    .eq('id', storeId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

/* ==============================================================
   3. MODULE PRODUITS (Catalogue)
   ============================================================== */

export async function getStoreProducts(storeId) {
  const { data, error } = await supabase
    .from('products')
    .select('*, categories(name)')
    .eq('store_id', storeId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function createProduct(productData) {
  const { data, error } = await supabase
    .from('products')
    .insert([productData])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateProduct(productId, updates) {
  const { data, error } = await supabase
    .from('products')
    .update(updates)
    .eq('id', productId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteProduct(productId) {
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', productId);

  if (error) throw error;
  return true;
}

/* ==============================================================
   4. MODULE COMMANDES (Tunnel de vente & Dashboard)
   ============================================================== */

export async function getStoreOrders(storeId) {
  const { data, error } = await supabase
    .from('orders')
    .select('*, order_items(*)')
    .eq('store_id', storeId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function createCustomerOrder({ storeId, customerName, customerPhone, customerCity, customerAddress, totalAmount, paymentMethod, items }) {
  const orderNumber = `#${Math.floor(1000 + Math.random() * 9000)}`;

  const { data: order, error: orderErr } = await supabase
    .from('orders')
    .insert([{
      store_id: storeId,
      order_number: orderNumber,
      customer_name: customerName,
      customer_phone: customerPhone,
      customer_city: customerCity,
      customer_address: customerAddress,
      total_amount: totalAmount,
      currency: 'XOF',
      payment_method: paymentMethod || 'cash_on_delivery',
      status: 'pending',
      payment_status: paymentMethod === 'cash_on_delivery' ? 'pending' : 'completed'
    }])
    .select()
    .single();

  if (orderErr) throw orderErr;

  if (items && items.length > 0) {
    const orderItemsData = items.map(item => ({
      order_id: order.id,
      product_id: item.productId || null,
      product_name: item.name,
      quantity: item.quantity || 1,
      unit_price: item.price
    }));

    await supabase.from('order_items').insert(orderItemsData);
  }

  return order;
}

export async function updateOrderStatus(orderId, status) {
  const { data, error } = await supabase
    .from('orders')
    .update({ status })
    .eq('id', orderId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

/* ==============================================================
   5. TEMPS RÉEL (Realtime Notifications)
   ============================================================== */

export function subscribeToOrders(storeId, onNewOrderCallback) {
  return supabase
    .channel(`orders:${storeId}`)
    .on('postgres_changes', {
      event: 'INSERT',
      schema: 'public',
      table: 'orders',
      filter: `store_id=eq.${storeId}`
    }, payload => {
      if (onNewOrderCallback) onNewOrderCallback(payload.new);
    })
    .subscribe();
}
