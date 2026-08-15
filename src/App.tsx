import { useEffect, useMemo, useState } from 'react';
import { BrowserRouter, Link, Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';

type LanguageCode = 'en' | 'ta' | 'hi' | 'fr';
type AppChoice = 'WhatsApp' | 'Telegram' | 'SMS' | 'Gmail' | 'Outlook' | 'Instagram' | 'Facebook';
type AlertLevel = 'safe' | 'suspicious' | 'high-risk';

type Report = {
  id: string;
  title: string;
  app: AppChoice;
  risk: AlertLevel;
  message: string;
  timestamp: string;
  reason: string;
  userName?: string;
  phone?: string;
  email?: string;
  suspectInfo?: string;
  suspiciousUrl?: string;
};

const APP_OPTIONS: AppChoice[] = ['WhatsApp', 'Telegram', 'SMS', 'Gmail', 'Outlook', 'Instagram', 'Facebook'];

const translations: Record<LanguageCode, Record<string, string>> = {
  en: {
    appName: 'Smart Fraud Alert System',
    tagline: 'Prevent · Detect · Guide · Protect',
    loginTitle: 'Secure Access',
    username: 'Username',
    password: 'Password',
    language: 'Language',
    appSelection: 'Select apps to simulate detection',
    loginButton: 'Login',
    dashboardTitle: 'Dashboard',
    dashboardSubtitle: 'Protection overview for your selected apps',
    reports: 'Reports',
    scamCases: 'Scam/Fraud Cases',
    safeMessages: 'Safe Messages',
    highRiskAlerts: 'High-Risk Alerts',
    recentReports: 'Recent Reports',
    chatbot: 'Chatbot Guidance',
    detection: 'Detection Demo',
    checklist: 'Security Checklist',
    userInfo: 'User Information',
    police: 'Police Inform',
    quickAction: 'Quick action',
    navigation: 'Navigation',
    openReport: 'Open report',
    noReports: 'No incidents yet',
    detectionPageTitle: 'Threat Detection Simulator',
    detectionDescription: 'Paste suspicious content and review risk levels for your selected apps.',
    selectApp: 'App',
    pasteText: 'Alert content',
    analyze: 'Analyze',
    safeResult: 'Safe message',
    suspiciousResult: 'Suspicious message',
    highRiskResult: 'High-risk alert',
    alert: 'Alert',
    siren: 'Siren alert',
    voiceAlert: 'AI voice alert',
    caseId: 'Case ID',
    checklistTitle: 'Security Checklist',
    checklistSubtitle: 'Complete these steps to reduce your digital risk',
    checklistItem1: 'Enable two-factor authentication for all accounts',
    checklistItem2: 'Verify links before opening or entering login details',
    checklistItem3: 'Review message senders and avoid urgent payment requests',
    checklistItem4: 'Use strong, unique passwords for every app',
    checklistItem5: 'Update devices and applications regularly',
    checklistDone: 'Completed',
    userInfoTitle: 'Incident Details',
    userInfoDescription: 'Capture all relevant evidence and keep the record private.',
    privacyNotice: 'Privacy notice: This is a prototype demo. No real data is shared automatically.',
    saveReport: 'Save report',
    formName: 'Name',
    formPhone: 'Phone',
    formEmail: 'Email',
    formDate: 'Date & time',
    formScamType: 'Scam type',
    formMessage: 'Suspicious message',
    formSuspect: 'Suspect info',
    formUrl: 'Suspicious URL',
    formDescription: 'Description',
    formEvidence: 'Evidence / Screenshot',
    policeTitle: 'Police Inform',
    policeDescription: 'Prepare a professional report. You decide whether to share it.',
    generateReport: 'Generate report',
    download: 'Download',
    share: 'Share',
    export: 'Export',
    chatbotTitle: 'Safety Assistant',
    chatbotPrompt: 'Ask about digital safety, 2FA, account recovery, or scam prevention.',
    ask: 'Ask',
    chatbotWelcome: 'I can guide you step by step on how to protect your accounts and spot scams.',
    profile: 'Profile',
    status: 'Status',
    selectedApps: 'Selected apps',
    logout: 'Logout',
    demoMode: 'Prototype demo only',
    continue: 'Continue',
    victim: 'Victim / Reporter Name',
    settings: 'Settings',
    sampleQuestion: 'How do I enable 2FA?'
  },
  ta: {
    appName: 'ஸ்மார்ட் ஃப்ராட் அலர்ட் சிஸ்டம்',
    tagline: 'தடுப்பு · கண்டறிதல் · வழிகாட்டல் · பாதுகாப்பு',
    loginTitle: 'பாதுகாப்பான அணுகல்',
    username: 'பயனர் பெயர்',
    password: 'முடியுரு',
    language: 'மொழி',
    appSelection: 'கண்டறிதலுக்கான செயலிகளை தேர்ந்தெடுக்கவும்',
    loginButton: 'உள்நுழை',
    dashboardTitle: 'டாஷ்போர்டு',
    dashboardSubtitle: 'தேர்ந்தெடுக்கப்பட்ட செயலிகளுக்கான பாதுகாப்பு கண்ணோட்டம்',
    reports: 'அறிக்கைகள்',
    scamCases: 'மோசடி / ஏமாற்று நிகழ்வுகள்',
    safeMessages: 'பாதுகாப்பான செய்திகள்',
    highRiskAlerts: 'உயர் ஆபத்து விழிப்பூட்டல்கள்',
    recentReports: 'சமீபத்திய அறிக்கைகள்',
    chatbot: 'சாட்போட் வழிகாட்டி',
    detection: 'கண்டறிதல் டெமோ',
    checklist: 'பாதுகாப்பு பட்டியல்',
    userInfo: 'பயனர் தகவல்',
    police: 'போலிஸ் அறிவிப்பு',
    quickAction: 'விரைவான நடவடிக்கை',
    navigation: 'வழிசெலுத்தல்',
    openReport: 'அறிக்கையை திற',
    noReports: 'இன்னும் நிகழ்வுகள் இல்லை',
    detectionPageTitle: 'அச்சுறுத்தல் கண்டறிதல் சிமுலேட்டர்',
    detectionDescription: 'சந்தேகமான உள்ளடக்கத்தை ஒட்டிவிட்டு, உங்கள் தேர்ந்தெடுக்கப்பட்ட செயலிகளுக்கான அபாய நிலையை மதிப்பீடு செய்யுங்கள்.',
    selectApp: 'செயலி',
    pasteText: 'எச்சரிக்கை உள்ளடக்கம்',
    analyze: 'பகுப்பாய்வு செய்யுங்கள்',
    safeResult: 'பாதுகாப்பான செய்தி',
    suspiciousResult: 'சந்தேகமான செய்தி',
    highRiskResult: 'உயர் ஆபத்து எச்சரிக்கை',
    alert: 'எச்சரிக்கை',
    siren: 'சைரன் விழிப்பூட்டு',
    voiceAlert: 'AI குரல் எச்சரிக்கை',
    caseId: 'வழக்கு எண்',
    checklistTitle: 'பாதுகாப்பு பட்டியல்',
    checklistSubtitle: 'டிஜிட்டல் ஆபத்தை குறைக்க இந்த படிகளை முடிக்கவும்',
    checklistItem1: 'அனைத்து கணக்குகளிலும் இரண்டு-அடுக்கு அங்கீகாரத்தை இயக்கவும்',
    checklistItem2: 'இணைப்புகளை திறப்பதற்கு முன் சரிபார்க்கவும்',
    checklistItem3: 'அனுப்புநர்களை சரிபார்த்து, அவசரமாக பணம் கோரும் கோரிக்கைகளை தவிர்க்கவும்',
    checklistItem4: 'ஒவ்வொரு செயலிக்கும் வலுவான தனித்துவமான கடவுச்சொற்களை பயன்படுத்தவும்',
    checklistItem5: 'சாதனங்கள் மற்றும் பயன்பாடுகளை தவறாமல் புதுப்பிக்கவும்',
    checklistDone: 'முடிந்தது',
    userInfoTitle: 'சம்பவ விவரங்கள்',
    userInfoDescription: 'அனைத்து சான்றுகளையும் பதிவு செய்து தனிப்பட்ட முறையில் வைத்துக் கொள்ளுங்கள்.',
    privacyNotice: 'தனியுரிமை அறிவிப்பு: இது முன்மாதிரி டெமோ. உண்மையான தரவு தானாகவே பகிரப்படுவதில்லை.',
    saveReport: 'அறிக்கையை சேமி',
    formName: 'பெயர்',
    formPhone: 'தொலைபேசி',
    formEmail: 'மின்னஞ்சல்',
    formDate: 'தேதி & நேரம்',
    formScamType: 'மோசடி வகை',
    formMessage: 'சந்தேகமான செய்தி',
    formSuspect: 'சந்தேக நபர் தகவல்',
    formUrl: 'சந்தேக URL',
    formDescription: 'விளக்கம்',
    formEvidence: 'சான்று / ஸ்கிரீன் ஷாட்',
    policeTitle: 'போலிஸ் அறிவிப்பு',
    policeDescription: 'தொழில்முறை அறிக்கையை தயார் செய்யுங்கள். பகிர்வது குறித்து நீங்கள் முடிவு செய்யலாம்.',
    generateReport: 'அறிக்கையை உருவாக்கு',
    download: 'பதிவிறக்கு',
    share: 'பகிர்',
    export: 'ஏற்றுமதி',
    chatbotTitle: 'பாதுகாப்பு உதவியாளர்',
    chatbotPrompt: 'டிஜிட்டல் பாதுகாப்பு, 2FA, கணக்கு மீட்பு அல்லது மோசடி தடுப்பு பற்றி கேளுங்கள்.',
    ask: 'கேள்',
    chatbotWelcome: 'கணக்குகளைப் பாதுகாக்கவும், மோசடிகளைப் புரிந்துகொள்ளவும் நான் படிப்படியாக வழிகாட்ட முடியும்.',
    profile: 'சுயவிவரம்',
    status: 'நிலை',
    selectedApps: 'தேர்ந்தெடுக்கப்பட்ட செயலிகள்',
    logout: 'வெளியேறு',
    demoMode: 'முன்மாதிரி டெமோ மட்டுமே',
    continue: 'தொடரவும்',
    victim: 'பாதிக்கப்பட்டவர் / புகாரளிப்பவர் பெயர்',
    settings: 'அமைப்புகள்',
    sampleQuestion: '2FA ஐ எவ்வாறு இயக்குவது?' 
  },
  hi: {
    appName: 'स्मार्ट फ्रॉड अलर्ट सिस्टम',
    tagline: 'रोकें · पहचानें · मार्गदर्शन · सुरक्षित रखें',
    loginTitle: 'सुरक्षित एक्सेस',
    username: 'उपयोगकर्ता नाम',
    password: 'पासवर्ड',
    language: 'भाषा',
    appSelection: 'डिटेक्शन के लिए ऐप चुनें',
    loginButton: 'लॉगिन',
    dashboardTitle: 'डैशबोर्ड',
    dashboardSubtitle: 'आपके चुने हुए ऐप्स के लिए सुरक्षा अवलोकन',
    reports: 'रिपोर्ट्स',
    scamCases: 'धोखाधड़ी/फ्रॉड मामले',
    safeMessages: 'सुरक्षित संदेश',
    highRiskAlerts: 'उच्च जोखिम अलर्ट',
    recentReports: 'हाल की रिपोर्ट्स',
    chatbot: 'चैटबॉट गाइड',
    detection: 'डिटेक्शन डेमो',
    checklist: 'सुरक्षा चेकलिस्ट',
    userInfo: 'उपयोगकर्ता जानकारी',
    police: 'पुलिस रिपोर्ट',
    quickAction: 'त्वरित कार्रवाई',
    navigation: 'नेविगेशन',
    openReport: 'रिपोर्ट खोलें',
    noReports: 'अभी कोई घटना नहीं',
    detectionPageTitle: 'थ्रेट डिटेक्शन सिम्युलेटर',
    detectionDescription: 'संदिग्ध सामग्री पेस्ट करें और आपके चयनित ऐप्स के लिए जोखिम स्तर देखें।',
    selectApp: 'ऐप',
    pasteText: 'अलर्ट सामग्री',
    analyze: 'विश्लेषण करें',
    safeResult: 'सुरक्षित संदेश',
    suspiciousResult: 'संदिग्ध संदेश',
    highRiskResult: 'उच्च जोखिम अलर्ट',
    alert: 'अलर्ट',
    siren: 'साइरन अलर्ट',
    voiceAlert: 'AI आवाज अलर्ट',
    caseId: 'केस आईडी',
    checklistTitle: 'सुरक्षा चेकलिस्ट',
    checklistSubtitle: 'अपने डिजिटल जोखिम को कम करने के लिए ये चरण पूरा करें',
    checklistItem1: 'सभी खातों में टू-फैक्टर ऑथेंटिकेशन चालू करें',
    checklistItem2: 'लिंक खोलने से पहले सत्यापित करें',
    checklistItem3: 'संदेश भेजने वालों की जांच करें और तुरंत भुगतान के अनुरोधों से बचें',
    checklistItem4: 'हर ऐप के लिए मजबूत और अलग पासवर्ड उपयोग करें',
    checklistItem5: 'डिवाइस और ऐप्स को नियमित रूप से अपडेट करें',
    checklistDone: 'पूरा',
    userInfoTitle: 'घटना का विवरण',
    userInfoDescription: 'सभी साक्ष्य एकत्र करें और रिकॉर्ड को निजी रखें।',
    privacyNotice: 'प्राइवेसी नोटिस: यह एक प्रोटोटाइप डेमो है। कोई वास्तविक डेटा ऑटो शेयर नहीं होता है।',
    saveReport: 'रिपोर्ट सेव करें',
    formName: 'नाम',
    formPhone: 'फोन',
    formEmail: 'ईमेल',
    formDate: 'तारीख और समय',
    formScamType: 'धोखाधड़ी का प्रकार',
    formMessage: 'संदिग्ध संदेश',
    formSuspect: 'संदिग्ध व्यक्ति की जानकारी',
    formUrl: 'संदिग्ध URL',
    formDescription: 'विवरण',
    formEvidence: 'साक्ष्य / स्क्रीनशॉट',
    policeTitle: 'पुलिस सूचना',
    policeDescription: 'एक प्रोफेशनल रिपोर्ट तैयार करें। आप तय करेंगे कि शेयर करना है या नहीं।',
    generateReport: 'रिपोर्ट बनाएं',
    download: 'डाउनलोड',
    share: 'शेयर',
    export: 'एक्सपोर्ट',
    chatbotTitle: 'सुरक्षा सहायक',
    chatbotPrompt: 'डिजिटल सुरक्षा, 2FA, अकाउंट रिकवरी या स्कैम प्रिवेंशन के बारे में पूछें।',
    ask: 'पूछें',
    chatbotWelcome: 'मैं आपके खातों को सुरक्षित रखने और धोखाधड़ी को पहचानने में चरण-दर-चरण मार्गदर्शन कर सकता हूँ।',
    profile: 'प्रोफ़ाइल',
    status: 'स्थिति',
    selectedApps: 'चुने गए ऐप्स',
    logout: 'लॉगआउट',
    demoMode: 'केवल प्रोटोटाइप डेमो',
    continue: 'जारी रखें',
    victim: 'पीड़ित / रिपोर्टर का नाम',
    settings: 'सेटिंग्स',
    sampleQuestion: 'मैं 2FA कैसे सक्रिय करूं?'
  },
  fr: {
    appName: 'Système d’alerte anti-fraude intelligent',
    tagline: 'Prévenir · Détecter · Guider · Protéger',
    loginTitle: 'Accès sécurisé',
    username: 'Nom d’utilisateur',
    password: 'Mot de passe',
    language: 'Langue',
    appSelection: 'Sélectionnez les applications pour simuler la détection',
    loginButton: 'Connexion',
    dashboardTitle: 'Tableau de bord',
    dashboardSubtitle: 'Vue d’ensemble de la protection pour vos applications choisies',
    reports: 'Rapports',
    scamCases: 'Cas d’escroquerie',
    safeMessages: 'Messages sûrs',
    highRiskAlerts: 'Alertes à haut risque',
    recentReports: 'Rapports récents',
    chatbot: 'Assistant chatbot',
    detection: 'Démo de détection',
    checklist: 'Liste de vérification',
    userInfo: 'Informations utilisateur',
    police: 'Informer la police',
    quickAction: 'Action rapide',
    navigation: 'Navigation',
    openReport: 'Ouvrir le rapport',
    noReports: 'Aucun incident pour le moment',
    detectionPageTitle: 'Simulateur de détection des menaces',
    detectionDescription: 'Collez du contenu suspect et vérifiez les niveaux de risque pour les applications sélectionnées.',
    selectApp: 'Application',
    pasteText: 'Contenu d’alerte',
    analyze: 'Analyser',
    safeResult: 'Message sûr',
    suspiciousResult: 'Message suspect',
    highRiskResult: 'Alerte à haut risque',
    alert: 'Alerte',
    siren: 'Alarme sonore',
    voiceAlert: 'Alerte vocale IA',
    caseId: 'ID du dossier',
    checklistTitle: 'Liste de vérification de sécurité',
    checklistSubtitle: 'Complétez ces étapes pour réduire votre risque numérique',
    checklistItem1: 'Activez l’authentification à deux facteurs pour tous les comptes',
    checklistItem2: 'Vérifiez les liens avant de les ouvrir ou de saisir des informations',
    checklistItem3: 'Vérifiez les expéditeurs et évitez les demandes urgentes de paiement',
    checklistItem4: 'Utilisez des mots de passe forts et uniques pour chaque application',
    checklistItem5: 'Mettez régulièrement à jour les appareils et applications',
    checklistDone: 'Terminé',
    userInfoTitle: 'Détails de l’incident',
    userInfoDescription: 'Collectez toutes les preuves pertinentes et gardez l’enregistrement privé.',
    privacyNotice: 'Avis de confidentialité: il s’agit d’une démo de prototype. Aucune donnée réelle n’est partagée automatiquement.',
    saveReport: 'Enregistrer le rapport',
    formName: 'Nom',
    formPhone: 'Téléphone',
    formEmail: 'E-mail',
    formDate: 'Date et heure',
    formScamType: 'Type d’escroquerie',
    formMessage: 'Message suspect',
    formSuspect: 'Informations sur le suspect',
    formUrl: 'URL suspecte',
    formDescription: 'Description',
    formEvidence: 'Preuve / capture d’écran',
    policeTitle: 'Informer la police',
    policeDescription: 'Préparez un rapport professionnel. Vous décidez si vous souhaitez le partager.',
    generateReport: 'Générer le rapport',
    download: 'Télécharger',
    share: 'Partager',
    export: 'Exporter',
    chatbotTitle: 'Assistant de sécurité',
    chatbotPrompt: 'Posez des questions sur la sécurité numérique, la 2FA, la récupération de compte ou la prévention des arnaques.',
    ask: 'Poser',
    chatbotWelcome: 'Je peux vous guider étape par étape pour protéger vos comptes et repérer les arnaques.',
    profile: 'Profil',
    status: 'Statut',
    selectedApps: 'Applications sélectionnées',
    logout: 'Déconnexion',
    demoMode: 'Démo prototype uniquement',
    continue: 'Continuer',
    victim: 'Nom de la victime / du déclarant',
    settings: 'Paramètres',
    sampleQuestion: 'Comment activer la 2FA ?'
  }
};

const fakeReportsSeed: Report[] = [
  { id: 'CASE-1048', title: 'Suspicious OTP request', app: 'WhatsApp', risk: 'high-risk', message: 'Use this code immediately to verify your account.', timestamp: '2026-08-15 09:21', reason: 'Urgent verification and OTP request', userName: 'Riya', phone: '+91 98765 43210', email: 'riya@demo.com', suspectInfo: 'Unknown sender', suspiciousUrl: 'https://secure-wallet-update.net' },
  { id: 'CASE-1042', title: 'Phishing email', app: 'Gmail', risk: 'suspicious', message: 'Your invoice is overdue, click to resolve it.', timestamp: '2026-08-14 18:40', reason: 'Fake invoice and login lure', userName: 'Aman', phone: '+91 98765 12345', email: 'aman@demo.com', suspectInfo: 'Unknown sender', suspiciousUrl: 'https://pay-invoice-update.net' },
  { id: 'CASE-1039', title: 'Safe social message', app: 'Instagram', risk: 'safe', message: 'Your post has been liked by 42 people.', timestamp: '2026-08-14 12:15', reason: 'Normal social activity', userName: 'Neha', phone: '+91 98765 67890', email: 'neha@demo.com', suspectInfo: 'Official support account', suspiciousUrl: '' },
  { id: 'CASE-1034', title: 'Telegram login alert', app: 'Telegram', risk: 'high-risk', message: 'A new device logged into your Telegram account. Approve now.', timestamp: '2026-08-13 08:03', reason: 'Fake login approval prompt', userName: 'Leo', phone: '+91 97531 45678', email: 'leo@demo.com', suspectInfo: 'Unknown device', suspiciousUrl: 'https://auth-verify.link' }
];

const keywordLibrary: Record<string, string[]> = {
  suspicious: ['urgent', 'verify', 'otp', 'secure', 'click', 'bank', 'password', 'immediate', 'invoice', 'update your account', 'free gift', 'claim now'],
  risky: ['bit.ly', 'http://', 'https://', 'login', 'support', 'refund', 'confirm identity', 'reset your password']
};

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

function AppRoutes() {
  const navigate = useNavigate();
  const location = useLocation();
  const [language, setLanguage] = useState<LanguageCode>('en');
  const [selectedApps, setSelectedApps] = useState<AppChoice[]>(['WhatsApp', 'Gmail', 'Instagram']);
  const [userName, setUserName] = useState('Demo User');
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem('malai-session') === 'true';
  });
  const [reports, setReports] = useState<Report[]>(() => {
    if (typeof window === 'undefined') return fakeReportsSeed;
    const saved = localStorage.getItem('malai-reports');
    return saved ? JSON.parse(saved) : fakeReportsSeed;
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('malai-session', String(isLoggedIn));
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('malai-reports', JSON.stringify(reports));
    }
  }, [reports]);

  useEffect(() => {
    if (!isLoggedIn && location.pathname !== '/') {
      navigate('/', { replace: true });
    }
  }, [isLoggedIn, location.pathname, navigate]);

  const t = useMemo(() => translations[language], [language]);

  const handleAppToggle = (app: AppChoice) => {
    setSelectedApps((current) =>
      current.includes(app) ? current.filter((item) => item !== app) : [...current, app]
    );
  };

  const handleLogin = (loginUser: string) => {
    setUserName(loginUser || 'Demo User');
    setIsLoggedIn(true);
    navigate('/dashboard', { replace: true });
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate('/', { replace: true });
  };

  const addReport = (report: Report) => {
    setReports((current) => [report, ...current].slice(0, 10));
  };

  return (
    <div className="app-shell">
      <Routes>
        <Route
          path="/"
          element={
            <LoginPage
              language={language}
              setLanguage={setLanguage}
              selectedApps={selectedApps}
              onToggleApp={handleAppToggle}
              onLogin={handleLogin}
              userName={userName}
              t={t}
            />
          }
        />
        <Route
          path="/dashboard"
          element={
            isLoggedIn ? (
              <DashboardPage
                language={language}
                selectedApps={selectedApps}
                reports={reports}
                userName={userName}
                onLogout={handleLogout}
                t={t}
              />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/chatbot"
          element={
            isLoggedIn ? (
              <ChatbotPage language={language} selectedApps={selectedApps} userName={userName} onLogout={handleLogout} t={t} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/detection"
          element={
            isLoggedIn ? (
              <DetectionPage
                language={language}
                selectedApps={selectedApps}
                reports={reports}
                onAddReport={addReport}
                userName={userName}
                onLogout={handleLogout}
                t={t}
              />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/checklist"
          element={
            isLoggedIn ? (
              <ChecklistPage language={language} userName={userName} onLogout={handleLogout} t={t} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/userinfo"
          element={
            isLoggedIn ? (
              <UserInfoPage
                language={language}
                userName={userName}
                reports={reports}
                onAddReport={addReport}
                onLogout={handleLogout}
                t={t}
              />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/police"
          element={
            isLoggedIn ? (
              <PolicePage language={language} reports={reports} userName={userName} onLogout={handleLogout} t={t} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
      </Routes>
    </div>
  );
}

function LoginPage({
  language,
  setLanguage,
  selectedApps,
  onToggleApp,
  onLogin,
  userName,
  t
}: {
  language: LanguageCode;
  setLanguage: (language: LanguageCode) => void;
  selectedApps: AppChoice[];
  onToggleApp: (app: AppChoice) => void;
  onLogin: (username: string) => void;
  userName: string;
  t: Record<string, string>;
}) {
  const [username, setUsername] = useState(userName);
  const [password, setPassword] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onLogin(username || 'Demo User');
  };

  return (
    <div className="page login-page">
      <div className="login-card glow-card">
        <div className="brand-box">
          <div className="brand-mark">S</div>
          <div>
            <p className="eyebrow">{t.appName}</p>
            <h1>{t.tagline}</h1>
          </div>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <label>
            <span>{t.username}</span>
            <input value={username} onChange={(event) => setUsername(event.target.value)} placeholder={t.username} />
          </label>

          <label>
            <span>{t.password}</span>
            <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder={t.password} />
          </label>

          <label>
            <span>{t.language}</span>
            <select value={language} onChange={(event) => setLanguage(event.target.value as LanguageCode)}>
              <option value="en">English</option>
              <option value="ta">தமிழ்</option>
              <option value="hi">हिन्दी</option>
              <option value="fr">Français</option>
            </select>
          </label>

          <div className="app-selector">
            <span>{t.appSelection}</span>
            <div className="toggle-grid">
              {APP_OPTIONS.map((app) => (
                <button
                  key={app}
                  type="button"
                  className={selectedApps.includes(app) ? 'chip active' : 'chip'}
                  onClick={() => onToggleApp(app)}
                >
                  {app}
                </button>
              ))}
            </div>
          </div>

          <button className="primary-button" type="submit">{t.loginButton}</button>
        </form>
      </div>
    </div>
  );
}

function DashboardPage({
  language,
  selectedApps,
  reports,
  userName,
  onLogout,
  t
}: {
  language: LanguageCode;
  selectedApps: AppChoice[];
  reports: Report[];
  userName: string;
  onLogout: () => void;
  t: Record<string, string>;
}) {
  const totals = useMemo(() => {
    const scamCount = reports.filter((item) => item.risk !== 'safe').length;
    const safeCount = reports.filter((item) => item.risk === 'safe').length;
    const highRiskCount = reports.filter((item) => item.risk === 'high-risk').length;
    return {
      reports: reports.length,
      scam: scamCount,
      safe: safeCount,
      highRisk: highRiskCount,
      recent: reports.slice(0, 4)
    };
  }, [reports]);

  const [openReport, setOpenReport] = useState<Report | null>(null);

  return (
    <div className="page dashboard-page">
      <header className="topbar">
        <div>
          <p className="eyebrow">{t.appName}</p>
          <h2>{t.dashboardTitle}</h2>
        </div>
        <div className="topbar-actions">
          <span>{userName}</span>
          <button className="secondary-button" onClick={onLogout}>{t.logout}</button>
        </div>
      </header>

      <div className="stats-grid">
        <StatCard title={t.reports} value={String(totals.reports)} accent="green" />
        <StatCard title={t.scamCases} value={String(totals.scam)} accent="red" />
        <StatCard title={t.safeMessages} value={String(totals.safe)} accent="green" />
        <StatCard title={t.highRiskAlerts} value={String(totals.highRisk)} accent="red" />
      </div>

      <div className="dashboard-grid">
        <section className="card large-panel">
          <div className="section-head">
            <h3>{t.recentReports}</h3>
          </div>
          <div className="report-list">
            {totals.recent.length ? (
              totals.recent.map((report) => (
                <div key={report.id} className="report-row">
                  <div>
                    <strong>{report.id}</strong>
                    <p>{report.title}</p>
                  </div>
                  <div className="row-meta">
                    <span className={`risk-badge ${report.risk}`}>{report.risk}</span>
                    <button className="link-button" onClick={() => setOpenReport(report)}>{t.openReport}</button>
                  </div>
                </div>
              ))
            ) : (
              <p>{t.noReports}</p>
            )}
          </div>
        </section>

        <aside className="card nav-panel">
          <div className="section-head">
            <h3>{t.navigation}</h3>
          </div>
          <div className="nav-grid">
            <AppNavItem to="/chatbot" icon="🧠" label={t.chatbot} />
            <AppNavItem to="/detection" icon="🔍" label={t.detection} />
            <AppNavItem to="/checklist" icon="✅" label={t.checklist} />
            <AppNavItem to="/userinfo" icon="📋" label={t.userInfo} />
            <AppNavItem to="/police" icon="🚔" label={t.police} />
          </div>
          <div className="selected-apps-box">
            <span>{t.selectedApps}</span>
            <div className="chip-row">
              {selectedApps.map((app) => (
                <span key={app} className="mini-chip">{app}</span>
              ))}
            </div>
          </div>
        </aside>
      </div>

      {openReport && (
        <div className="modal-backdrop" onClick={() => setOpenReport(null)}>
          <div className="modal-card" onClick={(event) => event.stopPropagation()}>
            <div className="section-head">
              <h3>{openReport.id}</h3>
              <button className="simple-button" onClick={() => setOpenReport(null)}>Close</button>
            </div>
            <p><strong>{openReport.title}</strong></p>
            <p>{openReport.message}</p>
            <p><em>{openReport.reason}</em></p>
            <div className="detail-list">
              <span>{openReport.app}</span>
              <span>{openReport.timestamp}</span>
              <span className={`risk-badge ${openReport.risk}`}>{openReport.risk}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ChatbotPage({ language, selectedApps, userName, onLogout, t }: { language: LanguageCode; selectedApps: AppChoice[]; userName: string; onLogout: () => void; t: Record<string, string> }) {
  const [question, setQuestion] = useState(t.sampleQuestion);
  const [chatHistory, setChatHistory] = useState<string[]>([t.chatbotWelcome]);

  const answerQuestion = (input: string) => {
    const lower = input.toLowerCase();
    if (lower.includes('2fa') || lower.includes('two-factor')) {
      return 'Enable 2FA in your app settings, choose authenticator app, and verify recovery codes. This blocks account takeovers even if a password is leaked.';
    }
    if (lower.includes('password')) {
      return 'Use a unique password for every account, at least 12 characters, and combine uppercase, numbers, and symbols. Store it securely in a password manager.';
    }
    if (lower.includes('scam') || lower.includes('phishing')) {
      return 'Pause before you click. Check the sender, verify the URL, and call the official number directly if the message claims to be urgent or threatening.';
    }
    if (lower.includes('suspicious') || lower.includes('link')) {
      return 'Hover over the link, inspect the domain, and only open it if it matches the official service. Never enter credentials on a page reached from an unexpected message.';
    }
    return 'If something feels urgent, unexpected, or asks for money or credentials, stop, verify, and report it before acting.';
  };

  const askAssistant = () => {
    const answer = answerQuestion(question);
    setChatHistory((current) => [...current, `You: ${question}`, `Assistant: ${answer}`]);
    setQuestion('');
  };

  return (
    <div className="page">
      <header className="topbar">
        <div>
          <p className="eyebrow">{t.appName}</p>
          <h2>{t.chatbotTitle}</h2>
        </div>
        <div className="topbar-actions">
          <span>{userName}</span>
          <button className="secondary-button" onClick={onLogout}>{t.logout}</button>
        </div>
      </header>

      <div className="card wide-panel">
        <div className="section-head">
          <h3>{t.chatbotPrompt}</h3>
        </div>
        <div className="chat-box">
          {chatHistory.map((entry, index) => (
            <div key={`${entry}-${index}`} className="chat-bubble">{entry}</div>
          ))}
        </div>
        <div className="chat-input-row">
          <input value={question} onChange={(event) => setQuestion(event.target.value)} />
          <button className="primary-button" onClick={askAssistant}>{t.ask}</button>
        </div>
        <div className="chip-row">
          {selectedApps.map((app) => (
            <span key={app} className="mini-chip">{app}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function DetectionPage({
  language,
  selectedApps,
  reports,
  onAddReport,
  userName,
  onLogout,
  t
}: {
  language: LanguageCode;
  selectedApps: AppChoice[];
  reports: Report[];
  onAddReport: (report: Report) => void;
  userName: string;
  onLogout: () => void;
  t: Record<string, string>;
}) {
  const [app, setApp] = useState<AppChoice>(selectedApps[0] || 'WhatsApp');
  const [message, setMessage] = useState('Urgent action required: verify your account now and enter your OTP.');
  const [result, setResult] = useState<{ level: AlertLevel; title: string; reason: string } | null>(null);
  const [activeVoice, setActiveVoice] = useState(false);

  useEffect(() => {
    if (selectedApps.length && !selectedApps.includes(app)) {
      setApp(selectedApps[0]);
    }
  }, [selectedApps, app]);

  const playAlert = (level: AlertLevel) => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.type = level === 'high-risk' ? 'sawtooth' : 'square';
    oscillator.frequency.value = level === 'safe' ? 440 : level === 'suspicious' ? 660 : 820;
    gainNode.gain.value = 0.03;
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    oscillator.start();

    const ramp = level === 'high-risk' ? 0.45 : 0.25;
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + ramp);
    oscillator.stop(audioContext.currentTime + ramp);

    const speech = new SpeechSynthesisUtterance(
      level === 'safe'
        ? 'Safe message. No suspicious activity detected.'
        : level === 'suspicious'
          ? 'Warning! Suspicious message detected.'
          : 'Critical warning! High risk scam detected.'
    );
    speech.lang = language === 'ta' ? 'ta-IN' : language === 'hi' ? 'hi-IN' : language === 'fr' ? 'fr-FR' : 'en-US';
    speech.rate = 1.03;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(speech);
    setActiveVoice(true);
    setTimeout(() => setActiveVoice(false), 1800);
  };

  const analyzeMessage = () => {
    const normalized = message.toLowerCase();
    const suspiciousMatches = keywordLibrary.suspicious.filter((keyword) => normalized.includes(keyword));
    const riskyMatches = keywordLibrary.risky.filter((keyword) => normalized.includes(keyword));

    let level: AlertLevel = 'safe';
    let title = t.safeResult;
    let reason = 'No scam indicators found in the provided content.';

    if (suspiciousMatches.length || riskyMatches.length) {
      level = riskyMatches.length >= 2 || suspiciousMatches.length >= 2 ? 'high-risk' : 'suspicious';
      title = level === 'high-risk' ? t.highRiskResult : t.suspiciousResult;
      reason = level === 'high-risk'
        ? `High-risk indicators: ${[...new Set([...suspiciousMatches, ...riskyMatches])].slice(0, 3).join(', ')}`
        : `Suspicious indicators: ${[...new Set([...suspiciousMatches, ...riskyMatches])].slice(0, 2).join(', ')}`;
    }

    setResult({ level, title, reason });
    playAlert(level);

    if (level !== 'safe') {
      const report: Report = {
        id: `CASE-${Date.now().toString().slice(-5)}`,
        title: `${app} signal check`,
        app,
        risk: level,
        message,
        timestamp: new Date().toLocaleString(),
        reason,
        userName,
        suspectInfo: 'Auto-detection',
        suspiciousUrl: 'simulated://demo-domain',
      };
      onAddReport(report);
    }
  };

  return (
    <div className="page">
      <header className="topbar">
        <div>
          <p className="eyebrow">{t.appName}</p>
          <h2>{t.detectionPageTitle}</h2>
        </div>
        <div className="topbar-actions">
          <span>{userName}</span>
          <button className="secondary-button" onClick={onLogout}>{t.logout}</button>
        </div>
      </header>

      <div className="card wide-panel detection-panel">
        <div className="section-head">
          <h3>{t.detectionDescription}</h3>
        </div>

        <div className="detection-controls">
          <label>
            <span>{t.selectApp}</span>
            <select value={app} onChange={(event) => setApp(event.target.value as AppChoice)}>
              {selectedApps.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </label>

          <textarea value={message} onChange={(event) => setMessage(event.target.value)} rows={6} />
          <button className="primary-button" onClick={analyzeMessage}>{t.analyze}</button>
        </div>

        {result && (
          <div className={`alert-box ${result.level}`}>
            <div className="alert-head">
              <span>{t.alert}</span>
              <span className={`risk-badge ${result.level}`}>{result.level}</span>
            </div>
            <h4>{result.title}</h4>
            <p>{result.reason}</p>
            <div className="alert-actions">
              <span>{t.siren}</span>
              <span>{activeVoice ? t.voiceAlert : t.voiceAlert}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ChecklistPage({ language, userName, onLogout, t }: { language: LanguageCode; userName: string; onLogout: () => void; t: Record<string, string> }) {
  const tasks = [
    t.checklistItem1,
    t.checklistItem2,
    t.checklistItem3,
    t.checklistItem4,
    t.checklistItem5
  ];

  return (
    <div className="page">
      <header className="topbar">
        <div>
          <p className="eyebrow">{t.appName}</p>
          <h2>{t.checklistTitle}</h2>
        </div>
        <div className="topbar-actions">
          <span>{userName}</span>
          <button className="secondary-button" onClick={onLogout}>{t.logout}</button>
        </div>
      </header>

      <div className="card wide-panel">
        <div className="section-head">
          <h3>{t.checklistSubtitle}</h3>
        </div>
        <div className="checklist-list">
          {tasks.map((task, index) => (
            <div key={task} className="check-item">
              <span className="checkmark">✓</span>
              <span>{task}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function UserInfoPage({
  language,
  userName,
  reports,
  onAddReport,
  onLogout,
  t
}: {
  language: LanguageCode;
  userName: string;
  reports: Report[];
  onAddReport: (report: Report) => void;
  onLogout: () => void;
  t: Record<string, string>;
}) {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    dateTime: new Date().toISOString().slice(0, 16),
    scamType: 'Phishing',
    suspiciousMessage: '',
    suspectInfo: '',
    suspiciousUrl: '',
    description: '',
    evidence: ''
  });
  const [savedMessage, setSavedMessage] = useState<string | null>(null);

  const updateForm = (field: string, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSave = () => {
    const report: Report = {
      id: `CASE-${Date.now().toString().slice(-5)}`,
      title: `${form.scamType} report`,
      app: 'WhatsApp',
      risk: 'suspicious',
      message: form.suspiciousMessage || 'User submitted suspicious message',
      timestamp: form.dateTime,
      reason: form.description || 'User captured incident details',
      userName: form.name || userName,
      phone: form.phone,
      email: form.email,
      suspectInfo: form.suspectInfo,
      suspiciousUrl: form.suspiciousUrl,
    };

    onAddReport(report);
    setSavedMessage(`${t.saveReport}: ${report.id}`);
    setForm((current) => ({ ...current, suspiciousMessage: '', description: '', evidence: '', suspiciousUrl: '' }));
  };

  return (
    <div className="page">
      <header className="topbar">
        <div>
          <p className="eyebrow">{t.appName}</p>
          <h2>{t.userInfoTitle}</h2>
        </div>
        <div className="topbar-actions">
          <span>{userName}</span>
          <button className="secondary-button" onClick={onLogout}>{t.logout}</button>
        </div>
      </header>

      <div className="card wide-panel form-panel">
        <div className="section-head">
          <h3>{t.userInfoDescription}</h3>
        </div>

        <div className="user-form-grid">
          <label><span>{t.formName}</span><input value={form.name} onChange={(event) => updateForm('name', event.target.value)} /></label>
          <label><span>{t.formPhone}</span><input value={form.phone} onChange={(event) => updateForm('phone', event.target.value)} /></label>
          <label><span>{t.formEmail}</span><input type="email" value={form.email} onChange={(event) => updateForm('email', event.target.value)} /></label>
          <label><span>{t.formDate}</span><input type="datetime-local" value={form.dateTime} onChange={(event) => updateForm('dateTime', event.target.value)} /></label>
          <label><span>{t.formScamType}</span><input value={form.scamType} onChange={(event) => updateForm('scamType', event.target.value)} /></label>
          <label className="full-width"><span>{t.formMessage}</span><textarea value={form.suspiciousMessage} onChange={(event) => updateForm('suspiciousMessage', event.target.value)} rows={3} /></label>
          <label className="full-width"><span>{t.formSuspect}</span><input value={form.suspectInfo} onChange={(event) => updateForm('suspectInfo', event.target.value)} /></label>
          <label className="full-width"><span>{t.formUrl}</span><input value={form.suspiciousUrl} onChange={(event) => updateForm('suspiciousUrl', event.target.value)} /></label>
          <label className="full-width"><span>{t.formDescription}</span><textarea value={form.description} onChange={(event) => updateForm('description', event.target.value)} rows={3} /></label>
          <label className="full-width"><span>{t.formEvidence}</span><textarea value={form.evidence} onChange={(event) => updateForm('evidence', event.target.value)} rows={2} /></label>
        </div>

        <div className="privacy-box">{t.privacyNotice}</div>
        <button className="primary-button" onClick={handleSave}>{t.saveReport}</button>
        {savedMessage && <p className="success-message">{savedMessage}</p>}
      </div>
    </div>
  );
}

function PolicePage({ language, reports, userName, onLogout, t }: { language: LanguageCode; reports: Report[]; userName: string; onLogout: () => void; t: Record<string, string> }) {
  const latestReport = reports[0];

  const createReportText = () => {
    if (!latestReport) return 'No report generated yet.';
    return [
      'Incident Report',
      `Case ID: ${latestReport.id}`,
      `App: ${latestReport.app}`,
      `Risk: ${latestReport.risk}`,
      `Message: ${latestReport.message}`,
      `Reason: ${latestReport.reason}`,
      `User Name: ${latestReport.userName || 'Demo User'}`,
      `Timestamp: ${latestReport.timestamp}`
    ].join('\n');
  };

  const handleDownload = () => {
    const text = createReportText();
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'fraud-incident-report.txt';
    anchor.click();
    URL.revokeObjectURL(url);
  };

  const handleShare = async () => {
    const report = createReportText();
    if (navigator.share) {
      await navigator.share({ title: 'Safety report', text: report });
    } else {
      alert('Sharing is not supported in this browser, so the report has been prepared for manual export.');
    }
  };

  return (
    <div className="page">
      <header className="topbar">
        <div>
          <p className="eyebrow">{t.appName}</p>
          <h2>{t.policeTitle}</h2>
        </div>
        <div className="topbar-actions">
          <span>{userName}</span>
          <button className="secondary-button" onClick={onLogout}>{t.logout}</button>
        </div>
      </header>

      <div className="card wide-panel police-panel">
        <div className="section-head">
          <h3>{t.policeDescription}</h3>
        </div>
        <pre className="report-output">{createReportText()}</pre>
        <div className="inline-actions">
          <button className="primary-button" onClick={handleDownload}>{t.download}</button>
          <button className="secondary-button" onClick={handleShare}>{t.share}</button>
          <button className="secondary-button" onClick={() => navigator.clipboard?.writeText(createReportText())}>{t.export}</button>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, accent }: { title: string; value: string; accent: string }) {
  return (
    <div className={`stat-card ${accent}`}>
      <span>{title}</span>
      <strong>{value}</strong>
    </div>
  );
}

function AppNavItem({ to, icon, label }: { to: string; icon: string; label: string }) {
  return (
    <Link to={to} className="nav-item">
      <span>{icon}</span>
      <strong>{label}</strong>
    </Link>
  );
}

export default App;
