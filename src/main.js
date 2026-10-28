import confetti from 'canvas-confetti';

// State & Mock Orders Data
const mockOrders = [
  { name: 'Aminata', amount: '18 500' },
  { name: 'Moussa', amount: '34 000' },
  { name: 'Fatou', amount: '12 800' },
  { name: 'Ibrahima', amount: '45 000' },
  { name: 'Aïcha', amount: '26 500' },
  { name: 'Cheikh', amount: '19 900' }
];

let currentOrderIndex = 0;

// Multi-Language Translation Dictionaries
const translations = {
  fr: {
    code: 'FR',
    lang_menu_title: 'Choisir une langue',
    nav_features: 'Fonctionnalités',
    nav_pricing: 'Tarifs',
    nav_blog: 'Blog',
    nav_login: 'Se connecter',
    nav_start: "S'inscrire",
    hero_tag: 'BOUTIQUE EN LIGNE',
    hero_title_1: 'Gérez, personnalisez',
    hero_title_2: 'et publiez votre site',
    hero_title_3: 'en 3 minutes avec Logicom.',
    hero_btn_signup: "S'inscrire & Créer ma boutique",
    hero_btn_dashboard: 'Accéder au Tableau de bord ↗',
    mockup_live: 'LIVE',
    mockup_today: 'AUJOURD’HUI',
    mockup_revenue_30d: 'REVENU • 30J',
    mockup_orders: 'COMMANDES',
    mockup_visits: 'VISITES',
    mockup_conversion: 'CONVERSION',
    mockup_new_order: 'NOUVELLE COMMANDE',
    features_tag: 'FONCTIONNALITÉS',
    features_heading: "Tout ce qu'il faut pour vendre en ligne.",
    features_subtitle: "Un outil pensé pour les entrepreneurs en ligne. Rien de superflu, tout l'essentiel.",
    feat_1_title: 'Boutique en ligne',
    feat_1_text: 'Site auto-généré avec ton sous-domaine <strong>mystore.logicom.io</strong>. Personnalisable en quelques clics.',
    feat_2_title: 'Commandes simplifiées',
    feat_2_text: 'Statuts visuels, kanban — gère tes commandes sans stress.',
    feat_3_title: 'Analytics temps réel',
    feat_3_text: 'Revenu, visites, conversion, sources de trafic — tout ce qu\'il faut pour grandir.',
    feat_4_title: 'Livraison intégrée',
    feat_4_text: 'Assigne tes livreurs, suis chaque colis. Un statut clair pour chaque client.',
    feat_5_title: 'Équipe et rôles',
    feat_5_text: 'Propriétaire, admin, staff, livreur — accès séparés. Travaille à plusieurs sans risque.',
    feat_6_title: 'Paiements en FCFA',
    feat_6_text: 'Prix et paiements adaptés aux marchés qui utilisent le FCFA.',
    modal_badge: '🚀 Lancement Express',
    modal_heading: 'Créez votre boutique Logicom',
    modal_sub: 'Prête en moins de 2 minutes. Sans carte bancaire.',
    modal_lbl_name: 'Nom de votre boutique',
    modal_ph_name: 'ex: chic-mode, dakar-shop',
    modal_lbl_category: 'Catégorie principale',
    cat_fashion: 'Mode & Vêtements',
    cat_beauty: 'Beauté & Cosmétiques',
    cat_tech: 'Électronique & Téléphonie',
    cat_food: 'Épicerie & Alimentation',
    cat_other: 'Autre secteur',
    modal_lbl_currency: 'Devise par défaut',
    modal_btn_submit: 'Générer ma boutique gratuitement ↗',
    toast_created: '🎉 Félicitations ! Boutique "{name}" créée. Redirection vers votre tableau de bord...',
    toast_lang_changed: 'Langue modifiée en Français (FR)'
  },
  en: {
    code: 'EN',
    lang_menu_title: 'Select a language',
    nav_features: 'Features',
    nav_pricing: 'Pricing',
    nav_blog: 'Blog',
    nav_login: 'Log in',
    nav_start: 'Sign up',
    hero_tag: 'ONLINE STORE',
    hero_title_1: 'Manage, customize',
    hero_title_2: 'and publish your website',
    hero_title_3: 'in 3 minutes with Logicom.',
    hero_btn_signup: 'Sign up & Create my store',
    hero_btn_dashboard: 'Go to Dashboard ↗',
    mockup_live: 'LIVE',
    mockup_today: 'TODAY',
    mockup_revenue_30d: 'REVENUE • 30D',
    mockup_orders: 'ORDERS',
    mockup_visits: 'VISITS',
    mockup_conversion: 'CONVERSION',
    mockup_new_order: 'NEW ORDER',
    features_tag: 'FEATURES',
    features_heading: 'Everything you need to sell online.',
    features_subtitle: 'A platform built for digital entrepreneurs. Pure essential power, zero complexity.',
    feat_1_title: 'Online Store',
    feat_1_text: 'Auto-generated website with your subdomain <strong>mystore.logicom.io</strong>. Fully customizable in clicks.',
    feat_2_title: 'Streamlined Orders',
    feat_2_text: 'Visual Kanban statuses — fulfill customer orders smoothly with zero friction.',
    feat_3_title: 'Real-Time Analytics',
    feat_3_text: 'Revenue, visits, conversion rate, traffic channels — key insights to scale faster.',
    feat_4_title: 'Built-in Delivery',
    feat_4_text: 'Assign dispatch riders, track every parcel. Clear delivery status for every buyer.',
    feat_5_title: 'Team & Permissions',
    feat_5_text: 'Owner, manager, staff, courier — segregated access controls for secure teamwork.',
    feat_6_title: 'FCFA & Mobile Money',
    feat_6_text: 'Native local currency pricing and African mobile money checkout flows.',
    modal_badge: '🚀 Express Launch',
    modal_heading: 'Create your Logicom store',
    modal_sub: 'Ready in less than 2 minutes. No credit card required.',
    modal_lbl_name: 'Store name',
    modal_ph_name: 'e.g., chic-mode, dakar-shop',
    modal_lbl_category: 'Primary category',
    cat_fashion: 'Fashion & Clothing',
    cat_beauty: 'Beauty & Cosmetics',
    cat_tech: 'Electronics & Phones',
    cat_food: 'Grocery & Food',
    cat_other: 'Other sector',
    modal_lbl_currency: 'Default currency',
    modal_btn_submit: 'Generate my free store ↗',
    toast_created: '🎉 Congratulations! Store "{name}" created. Redirecting to your dashboard...',
    toast_lang_changed: 'Language switched to English (EN)'
  },
  de: {
    code: 'DE',
    lang_menu_title: 'Sprache auswählen',
    nav_features: 'Funktionen',
    nav_pricing: 'Preise',
    nav_blog: 'Blog',
    nav_login: 'Anmelden',
    nav_start: 'Registrieren',
    hero_tag: 'ONLINE-SHOP',
    hero_title_1: 'Verwalten, anpassen',
    hero_title_2: 'und veröffentlichen Sie Ihre Website',
    hero_title_3: 'in 3 Minuten mit Logicom.',
    hero_btn_signup: 'Registrieren & Shop erstellen',
    hero_btn_dashboard: 'Zum Dashboard ↗',
    mockup_live: 'LIVE',
    mockup_today: 'HEUTE',
    mockup_revenue_30d: 'UMSATZ • 30T',
    mockup_orders: 'BESTELLUNGEN',
    mockup_visits: 'BESUCHE',
    mockup_conversion: 'KONVERSION',
    mockup_new_order: 'NEUE BESTELLUNG',
    features_tag: 'FUNKTIONEN',
    features_heading: 'Alles, was Sie für den Online-Verkauf brauchen.',
    features_subtitle: 'Für Online-Unternehmer entwickelt. Nichts Überflüssiges, alles Wesentliche.',
    feat_1_title: 'Online-Shop',
    feat_1_text: 'Automatisch erstellter Shop mit Subdomain <strong>mystore.logicom.io</strong>. Anpassbar mit wenigen Klicks.',
    feat_2_title: 'Einfache Bestellungen',
    feat_2_text: 'Visuelle Status, Kanban — stressfreie Bestellungsverwaltung.',
    feat_3_title: 'Echtzeit-Analysen',
    feat_3_text: 'Umsatz, Besuche, Konversion, Traffic-Quellen — alles für Ihr Wachstum.',
    feat_4_title: 'Integrierte Lieferung',
    feat_4_text: 'Kuriere zuweisen, Pakete verfolgen. Klarer Status für jeden Kunden.',
    feat_5_title: 'Team & Rollen',
    feat_5_text: 'Inhaber, Administrator, Mitarbeiter, Kurier — sichere Zugriffskontrollen.',
    feat_6_title: 'Zahlungen in FCFA',
    feat_6_text: 'Preise und Zahlungsabläufe optimiert für Märkte mit FCFA und Mobile Money.',
    modal_badge: '🚀 Express-Start',
    modal_heading: 'Erstellen Sie Ihren Logicom-Shop',
    modal_sub: 'In unter 2 Minuten bereit. Keine Kreditkarte erforderlich.',
    modal_lbl_name: 'Name Ihres Shops',
    modal_ph_name: 'z.B.: chic-mode, dakar-shop',
    modal_lbl_category: 'Hauptkategorie',
    cat_fashion: 'Mode & Kleidung',
    cat_beauty: 'Schönheit & Kosmetik',
    cat_tech: 'Elektronik & Handys',
    cat_food: 'Lebensmittel & Ernährung',
    cat_other: 'Sonstiger Bereich',
    modal_lbl_currency: 'Standardwährung',
    modal_btn_submit: 'Meinen Shop kostenlos erstellen ↗',
    toast_created: '🎉 Glückwunsch! Shop "{name}" erstellt. Weiterleitung zum Dashboard...',
    toast_lang_changed: 'Sprache auf Deutsch geändert (DE)'
  },
  es: {
    code: 'ES',
    lang_menu_title: 'Seleccionar idioma',
    nav_features: 'Funcionalidades',
    nav_pricing: 'Tarifas',
    nav_blog: 'Blog',
    nav_login: 'Iniciar sesión',
    nav_start: 'Registrarse',
    hero_tag: 'TIENDA ONLINE',
    hero_title_1: 'Gestiona, personaliza',
    hero_title_2: 'y publica tu sitio web',
    hero_title_3: 'en 3 minutos con Logicom.',
    hero_btn_signup: 'Registrarse y Crear mi tienda',
    hero_btn_dashboard: 'Ir al Panel de control ↗',
    mockup_live: 'EN VIVO',
    mockup_today: 'HOY',
    mockup_revenue_30d: 'INGRESOS • 30D',
    mockup_orders: 'PEDIDOS',
    mockup_visits: 'VISITAS',
    mockup_conversion: 'CONVERSIÓN',
    mockup_new_order: 'NUEVO PEDIDO',
    features_tag: 'FUNCIONALIDADES',
    features_heading: 'Todo lo que necesitas para vender online.',
    features_subtitle: 'Una herramienta pensada para emprendedores. Sin complejidades, solo lo esencial.',
    feat_1_title: 'Tienda Online',
    feat_1_text: 'Sitio auto-generado con tu subdominio <strong>mystore.logicom.io</strong>. Personalizable en pocos clics.',
    feat_2_title: 'Pedidos simplificados',
    feat_2_text: 'Estados visuales, tablero Kanban — gestiona tus pedidos sin estrés.',
    feat_3_title: 'Analíticas en tiempo real',
    feat_3_text: 'Ingresos, visitas, conversión, canales de tráfico — métricas para crecer.',
    feat_4_title: 'Envíos integrados',
    feat_4_text: 'Asigna repartidores, rastrea cada paquete con transparencia.',
    feat_5_title: 'Equipo y roles',
    feat_5_text: 'Propietario, admin, staff, repartidor — accesos seguros y diferenciados.',
    feat_6_title: 'Pagos en FCFA',
    feat_6_text: 'Precios y pasarelas adaptadas al FCFA y Mobile Money.',
    modal_badge: '🚀 Lanzamiento Exprés',
    modal_heading: 'Crea tu tienda Logicom',
    modal_sub: 'Lista en menos de 2 minutos. Sin tarjeta de crédito.',
    modal_lbl_name: 'Nombre de tu tienda',
    modal_ph_name: 'ej: chic-mode, dakar-shop',
    modal_lbl_category: 'Categoría principal',
    cat_fashion: 'Moda y Ropa',
    cat_beauty: 'Belleza y Cosmética',
    cat_tech: 'Electrónica y Móviles',
    cat_food: 'Alimentación y Supermercado',
    cat_other: 'Otro sector',
    modal_lbl_currency: 'Moneda por defecto',
    modal_btn_submit: 'Generar mi tienda gratis ↗',
    toast_created: '🎉 ¡Felicidades! Tienda "{name}" creada. Redirigiendo a tu panel...',
    toast_lang_changed: 'Idioma cambiado a Español (ES)'
  },
  ar: {
    code: 'AR',
    lang_menu_title: 'اختيار اللغة',
    nav_features: 'المميزات',
    nav_pricing: 'الأسعار',
    nav_blog: 'المدونة',
    nav_login: 'تسجيل الدخول',
    nav_start: 'إنشاء حساب',
    hero_tag: 'متجر إلكتروني',
    hero_title_1: 'أدِر، خصّص',
    hero_title_2: 'وانشر موقعك الإلكتروني',
    hero_title_3: 'في 3 دقائق مع Logicom.',
    hero_btn_signup: 'سجّل وأنشئ متجري',
    hero_btn_dashboard: 'الانتقال إلى لوحة التحكم ↗',
    mockup_live: 'مباشر',
    mockup_today: 'اليوم',
    mockup_revenue_30d: 'الإيرادات • 30 يوم',
    mockup_orders: 'الطلبات',
    mockup_visits: 'الزيارات',
    mockup_conversion: 'التحويل',
    mockup_new_order: 'طلب جديد',
    features_tag: 'المميزات',
    features_heading: 'كل ما تحتاجه للبيع عبر الإنترنت.',
    features_subtitle: 'منصة مصممة لرواد الأعمال الرقميين. كل ما هو ضروري دون أي تعقيد.',
    feat_1_title: 'متجر إلكتروني',
    feat_1_text: 'موقع مُنشأ تلقائيًا بنطاقك الفرعي <strong>mystore.logicom.io</strong> قابل للتخصيص بنقرات.',
    feat_2_title: 'إدارة طلبات مبسطة',
    feat_2_text: 'حالات مرئية ولوحة كانبان لمتابعة الطلبات بسلاسة ودون عناء.',
    feat_3_title: 'تحليلات في الوقت الفعلي',
    feat_3_text: 'الإيرادات والزيارات ومعدل التحويل ومصادر الزيارات لدعم نموك.',
    feat_4_title: 'توصيل مدمج',
    feat_4_text: 'عيّن المندوبين وتتبع كل شحنة بشفافية لكل زبون.',
    feat_5_title: 'فريق العمل والأدوار',
    feat_5_text: 'المالك، المدير، الموظف، السائق — صلاحيات محددة لعمل جماعي آمن.',
    feat_6_title: 'مدفوعات بالفرنك الإفريقي',
    feat_6_text: 'تسعير ودفع متوافق مع أسواق الفرنك الإفريقي وخدمات الهاتف المحمول.',
    modal_badge: '🚀 إطلاق فوري',
    modal_heading: 'أنشئ متجرك على Logicom',
    modal_sub: 'جاهز في أقل من دقيقتين. بدون بطاقة بنكية.',
    modal_lbl_name: 'اسم المتجر',
    modal_ph_name: 'مثال: chic-mode, dakar-shop',
    modal_lbl_category: 'التصنيف الرئيسي',
    cat_fashion: 'الموضة والملابس',
    cat_beauty: 'الجمال والعناية',
    cat_tech: 'الإلكترونيات والهواتف',
    cat_food: 'البقالة والمواد الغذائية',
    cat_other: 'قطاع آخر',
    modal_lbl_currency: 'العملة الافتراضية',
    modal_btn_submit: 'إنشاء متجري مجانًا ↗',
    toast_created: '🎉 تهانينا! تم إنشاء المتجر "{name}". جارٍ التوجيه للوحة التحكم...',
    toast_lang_changed: 'تم تغيير اللغة إلى العربية (AR)'
  }
};

let currentLang = 'fr';

// DOM Elements
const storeModal = document.getElementById('store-modal');
const modalCloseX = document.getElementById('modal-close-x');
const storeForm = document.getElementById('store-form');
const toastShelf = document.getElementById('toast-shelf');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  setupLanguageSwitcher();
  setupModalHandlers();
  setupLiveOrdersSimulation();
  setupSmoothScroll();
});

// Language Switcher Management
function setupLanguageSwitcher() {
  const toggleBtn = document.getElementById('lang-toggle-btn');
  const dropdownMenu = document.getElementById('lang-dropdown-menu');
  const langItems = document.querySelectorAll('.lang-dropdown-item');

  // Load saved language or browser preference
  const savedLang = localStorage.getItem('logicom_lang') || localStorage.getItem('sakbi_lang') || 'fr';
  applyLanguage(savedLang, false);

  if (toggleBtn && dropdownMenu) {
    // Toggle dropdown on button click
    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = dropdownMenu.classList.contains('show');
      if (isOpen) {
        closeLangDropdown();
      } else {
        openLangDropdown();
      }
    });

    // Close on click outside
    document.addEventListener('click', (e) => {
      if (!toggleBtn.contains(e.target) && !dropdownMenu.contains(e.target)) {
        closeLangDropdown();
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeLangDropdown();
      }
    });
  }

  // Handle clicking on language options
  langItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const selectedLang = item.getAttribute('data-lang');
      if (selectedLang && selectedLang !== currentLang) {
        applyLanguage(selectedLang, true);
      }
      closeLangDropdown();
    });
  });

  function openLangDropdown() {
    dropdownMenu.classList.add('show');
    toggleBtn.classList.add('open');
    toggleBtn.setAttribute('aria-expanded', 'true');
  }

  function closeLangDropdown() {
    if (dropdownMenu) dropdownMenu.classList.remove('show');
    if (toggleBtn) {
      toggleBtn.classList.remove('open');
      toggleBtn.setAttribute('aria-expanded', 'false');
    }
  }
}

// Apply selected language
function applyLanguage(lang, showNotification = true) {
  if (!translations[lang]) lang = 'fr';
  currentLang = lang;
  const t = translations[lang];

  // Save to persistent storage
  localStorage.setItem('logicom_lang', lang);
  localStorage.setItem('sakbi_lang', lang);

  // Update HTML tag attributes
  document.documentElement.lang = lang;
  if (lang === 'ar') {
    document.documentElement.setAttribute('dir', 'rtl');
  } else {
    document.documentElement.setAttribute('dir', 'ltr');
  }

  // Update navbar button label
  const labelEl = document.getElementById('current-lang-code');
  if (labelEl) labelEl.textContent = t.code;

  // Update active state in dropdown
  document.querySelectorAll('.lang-dropdown-item').forEach(item => {
    if (item.getAttribute('data-lang') === lang) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });

  // Update all [data-i18n] text nodes
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key] !== undefined) {
      el.innerHTML = t[key];
    }
  });

  // Update all [data-i18n-ph] placeholders
  document.querySelectorAll('[data-i18n-ph]').forEach(el => {
    const key = el.getAttribute('data-i18n-ph');
    if (t[key] !== undefined) {
      el.setAttribute('placeholder', t[key]);
    }
  });

  // Optional toast notification on user switch
  if (showNotification && t.toast_lang_changed) {
    showToast(t.toast_lang_changed);
  }
}

// Modal Management
function setupModalHandlers() {
  const openModal = () => {
    if (storeModal) {
      storeModal.classList.add('open');
      const input = document.getElementById('store-name');
      if (input) setTimeout(() => input.focus(), 100);
    }
  };

  const closeModal = () => {
    if (storeModal) storeModal.classList.remove('open');
  };

  const btnQuickStore = document.getElementById('btn-quick-store-modal');
  if (btnQuickStore) btnQuickStore.addEventListener('click', (e) => {
    e.preventDefault();
    openModal();
  });
  if (modalCloseX) modalCloseX.addEventListener('click', closeModal);

  // Click outside to close
  if (storeModal) {
    storeModal.addEventListener('click', (e) => {
      if (e.target === storeModal) closeModal();
    });
  }

  // Form submission
  if (storeForm) {
    storeForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const storeName = document.getElementById('store-name').value.trim();

      if (!storeName) return;

      localStorage.setItem('sakbi_store_name', storeName);

      // Initialisation de la session marchand pour accès immédiat au dashboard
      const token = 'tok_' + Math.random().toString(36).substring(2) + Date.now();
      const session = {
        token: token,
        email: 'fondateur@' + (storeName.toLowerCase().replace(/[^a-z0-9]/g, '') || 'logicom') + '.io',
        name: storeName,
        createdAt: Date.now(),
        expiresAt: Date.now() + (24 * 60 * 60 * 1000)
      };
      localStorage.setItem('sakbi_auth_session', JSON.stringify(session));
      localStorage.setItem('sakbi_user_name', session.name);
      localStorage.setItem('sakbi_user_email', session.email);

      closeModal();

      // Confetti burst
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });

      const t = translations[currentLang] || translations.fr;
      const msg = (t.toast_created || 'Boutique créée !').replace('{name}', storeName);
      showToast(msg);

      setTimeout(() => {
        window.location.href = './dashboard.html';
      }, 1500);
    });
  }
}

// Live Orders Simulation (Changes every 6s)
function setupLiveOrdersSimulation() {
  const customerEl = document.getElementById('order-customer');
  const priceEl = document.getElementById('order-price');
  const pill = document.getElementById('order-pill');

  if (!customerEl || !priceEl || !pill) return;

  setInterval(() => {
    currentOrderIndex = (currentOrderIndex + 1) % mockOrders.length;
    const nextOrder = mockOrders[currentOrderIndex];

    // Subtle fade transition
    pill.style.opacity = '0';
    pill.style.transform = 'translateY(6px)';

    setTimeout(() => {
      customerEl.textContent = nextOrder.name;
      priceEl.textContent = nextOrder.amount;
      pill.style.opacity = '1';
      pill.style.transform = 'translateY(0)';
    }, 250);
  }, 6000);
}

// Smooth Anchor Links
function setupSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;
      e.preventDefault();
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

// Toast Helper
function showToast(message) {
  if (!toastShelf) return;
  const toast = document.createElement('div');
  toast.className = 'toast-item';
  toast.innerHTML = `<span>${message}</span>`;
  toastShelf.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(12px)';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}
