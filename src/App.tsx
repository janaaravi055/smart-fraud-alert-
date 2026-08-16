<<<<<<< HEAD
﻿import React, { ChangeEvent, FormEvent, useMemo, useState } from 'react';
import { BrowserRouter, Link, Navigate, Route, Routes, useNavigate } from 'react-router-dom';

type LanguageCode = 'en' | 'ta' | 'hi' | 'fr';
type RiskLevel = 'safe' | 'suspicious' | 'high-risk';
type AppChoice = 'WhatsApp' | 'Telegram' | 'SMS' | 'Gmail' | 'Outlook' | 'Instagram' | 'Facebook';

type TranslationDictionary = {
  brand: string;
  loginTitle: string;
  username: string;
  password: string;
  language: string;
  appAccess: string;
  signIn: string;
  dashboard: string;
  reports: string;
  scamCases: string;
  safeMessages: string;
  highRiskAlerts: string;
  recentReports: string;
  chatbot: string;
  detectionDemo: string;
  checklist: string;
  userInfo: string;
  police: string;
  appSelectionHint: string;
  riskSafe: string;
  riskSuspicious: string;
  riskHigh: string;
  analyze: string;
  protected: string;
  ready: string;
  prototype: string;
  selectedApps: string;
  saveReport: string;
  privacyConsent: string;
  privacyNotice: string;
  reportSaved: string;
  caseId: string;
  dangerTitle: string;
  safeTitle: string;
  suspiciousTitle: string;
  warningVoice: string;
  dangerVoice: string;
  safeVoice: string;
  detectionInputHint: string;
  detectionDemoLabel: string;
  open: string;
  protectionFlow: string;
};

const appOptions: AppChoice[] = ['WhatsApp', 'Telegram', 'SMS', 'Gmail', 'Outlook', 'Instagram', 'Facebook'];

const translations: Record<LanguageCode, TranslationDictionary> = {
  en: {
    brand: 'Smart Fraud Alert',
    loginTitle: 'Secure Login',
    username: 'Username',
    password: 'Password',
    language: 'Language',
    appAccess: 'App Access',
    signIn: 'Sign in',
    dashboard: 'Dashboard',
    reports: 'Reports',
    scamCases: 'Scam cases',
    safeMessages: 'Safe messages',
    highRiskAlerts: 'High-risk alerts',
    recentReports: 'Recent reports',
    chatbot: 'Chatbot Guidance',
    detectionDemo: 'Detection Demo',
    checklist: 'Security Checklist',
    userInfo: 'User Information',
    police: 'Police Inform',
    appSelectionHint: 'Choose the apps to simulate alerts for.',
    riskSafe: 'Safe / Normal message',
    riskSuspicious: 'Suspicious message detected',
    riskHigh: 'High-risk scam alert',
    analyze: 'Analyze',
    protected: 'Protected by prototype safeguards',
    ready: 'Ready',
    prototype: 'Prototype',
    selectedApps: 'Selected apps',
    saveReport: 'Save report',
    privacyConsent: 'Privacy & Consent',
    privacyNotice: 'This demo stores report data locally in the browser only. It is not sent automatically to any authority.',
    reportSaved: 'Report saved successfully',
    caseId: 'Case ID',
    dangerTitle: 'Warning! Suspicious login detected',
    safeTitle: 'Safe message confirmed',
    suspiciousTitle: 'Potential scam pattern identified',
    warningVoice: 'Warning. Suspicious login detected on the selected app.',
    dangerVoice: 'High risk. Scam link detected. Please stop and verify the message.',
    safeVoice: 'Safe. No suspicious pattern detected in this message.',
    detectionInputHint: 'Paste SMS, email, or social message content to check for scam indicators.',
    detectionDemoLabel: 'Demo scope',
    open: 'Open',
    protectionFlow: 'Protection flow',
  },
  ta: {
    brand: 'ஸ்மார்ட் ஃப்ராட் அலர்ட்',
    loginTitle: 'பாதுகாப்பான உள்நுழைவு',
    username: 'பயனர் பெயர்',
    password: 'கடவுச்சொல்',
    language: 'மொழி',
    appAccess: 'ஆப் அணுகல்',
    signIn: 'உள்நுழை',
    dashboard: 'டாஷ்போர்டு',
    reports: 'அறிக்கைகள்',
    scamCases: 'ஃப்ராட் வழக்குகள்',
    safeMessages: 'பாதுகாப்பான செய்திகள்',
    highRiskAlerts: 'உயர் ஆபத்து விழிப்புகள்',
    recentReports: 'சமீபத்திய அறிக்கைகள்',
    chatbot: 'சாட்போட் வழிகாட்டி',
    detectionDemo: 'கண்டறிதல் டெமோ',
    checklist: 'பாதுகாப்பு பட்டியல்',
    userInfo: 'பயனர் தகவல்',
    police: 'போலீஸ் அறிவிப்பு',
    appSelectionHint: 'எந்த ஆப்ஸ் மீது எச்சரிக்கையை உருவகிக்க வேண்டும் என்பதைத் தேர்ந்தெடுக்கவும்.',
    riskSafe: 'பாதுகாப்பான / சாதாரண செய்தி',
    riskSuspicious: 'சந்தேகமான செய்தி கண்டறியப்பட்டது',
    riskHigh: 'உயர் ஆபத்து மோசடி எச்சரிக்கை',
    analyze: 'பகுப்பாய்வு',
    protected: 'முன்மாதிரி பாதுகாப்புகளால் பாதுகாக்கப்படுகிறது',
    ready: 'தயார்',
    prototype: 'முன்மாதிரி',
    selectedApps: 'தேர்ந்தெடுக்கப்பட்ட ஆப்ஸ்',
    saveReport: 'அறிக்கையை சேமி',
    privacyConsent: 'தனியுரிமை & சம்மதம்',
    privacyNotice: 'இந்த டெமோ அறிக்கையை குரோமில் மட்டும் உள்ளூர் அமைப்பில் சேமிக்கிறது. எந்த அதிகாரியுக்கும் தானாக அனுப்பப்படாது.',
    reportSaved: 'அறிக்கை வெற்றிகரமாக சேமிக்கப்பட்டது',
    caseId: 'வழக்கு எண்',
    dangerTitle: 'எச்சரிக்கை! சந்தேகமான உள்நுழைவு கண்டறியப்பட்டது',
    safeTitle: 'சேவைக்கான மீள் சோதனை',
    suspiciousTitle: 'சந்தேகமான மோசடி வடிவம் கண்டறியப்பட்டது',
    warningVoice: 'எச்சரிக்கை. தேர்ந்தெடுக்கப்பட்ட ஆப்ஸில் சந்தேகமான உள்நுழைவு கண்டறியப்பட்டது.',
    dangerVoice: 'மிக அதிக ஆபத்து. மோசடி இணை கண்டறியப்பட்டது. தயவுசெய்து நிறுத்தி செய்தியை சரிபார்க்கவும்.',
    safeVoice: 'பாதுகாப்பானது. இந்த செய்தியில் சந்தேகமான வடிவம் இல்லை.',
    detectionInputHint: 'ஸ்கேம் அறிகுறிகளைச் சரிபார்க்க எஸ்எம்.எஸ், மின்னஞ்சல் அல்லது சமூக செய்தியை ஒட்டவும்.',
    detectionDemoLabel: 'டெமோ வரம்பு',
    open: 'திற',
    protectionFlow: 'பாதுகாப்பு ஓட்டம்',
  },
  hi: {
    brand: 'स्मार्ट फ्रॉड अलर्ट',
    loginTitle: 'सुरक्षित लॉगिन',
    username: 'उपयोगकर्ता नाम',
    password: 'पासवर्ड',
    language: 'भाषा',
    appAccess: 'ऐप एक्सेस',
    signIn: 'लॉगिन',
    dashboard: 'डैशबोर्ड',
    reports: 'रिपोर्ट',
    scamCases: 'स्कैम केस',
    safeMessages: 'सुरक्षित संदेश',
    highRiskAlerts: 'हाई-रिस्क अलर्ट',
    recentReports: 'हाल की रिपोर्ट',
    chatbot: 'चैटबॉट मार्गदर्शन',
    detectionDemo: 'डिटेक्शन डेमो',
    checklist: 'सुरक्षा चेकलिस्ट',
    userInfo: 'उपयोगकर्ता जानकारी',
    police: 'पुलिस सूचना',
    appSelectionHint: 'किस ऐप पर अलर्ट का सिमुलेशन करना है चुनें।',
    riskSafe: 'सुरक्षित / सामान्य संदेश',
    riskSuspicious: 'संदिग्ध संदेश मिला',
    riskHigh: 'हाई-रिस्क स्कैम अलर्ट',
    analyze: 'विश्लेषण करें',
    protected: 'प्रोटोटाइप सुरक्षा से सुरक्षित',
    ready: 'तैयार',
    prototype: 'प्रोटोटाइप',
    selectedApps: 'चयनित ऐप्स',
    saveReport: 'रिपोर्ट सेव करें',
    privacyConsent: 'गोपनीयता & सहमति',
    privacyNotice: 'यह डेमो रिपोर्ट को केवल ब्राउज़र में लोकल रूप से सेव करता है। इसे स्वचालित रूप से किसी भी प्राधिकरण को नहीं भेजा जाता है।',
    reportSaved: 'रिपोर्ट सफलतापूर्वक सेव की गई',
    caseId: 'केस आईडी',
    dangerTitle: 'चेतावनी! संदिग्ध लॉगिन पाया गया',
    safeTitle: 'सुरक्षित संदेश पुष्टि',
    suspiciousTitle: 'संभावित स्कैम पैटर्न पाया गया',
    warningVoice: 'चेतावनी। चयनित ऐप पर संदिग्ध लॉगिन पाया गया।',
    dangerVoice: 'उच्च जोखिम। स्कैम लिंक पाया गया। कृपया रुकें और संदेश सत्यापित करें।',
    safeVoice: 'सुरक्षित। इस संदेश में कोई संदिग्ध पैटर्न नहीं मिला।',
    detectionInputHint: 'स्कैम संकेतों की जांच के लिए एसएमएस, ईमेल या सोशल मैसेज को पेस्ट करें।',
    detectionDemoLabel: 'डेमो सीमा',
    open: 'खुला',
    protectionFlow: 'प्रोटेक्शन फ्लो',
  },
  fr: {
    brand: 'Alerte Smart Fraud',
    loginTitle: 'Connexion sécurisée',
    username: "Nom d'utilisateur",
    password: 'Mot de passe',
    language: 'Langue',
    appAccess: 'Accès aux applications',
    signIn: 'Se connecter',
    dashboard: 'Tableau de bord',
    reports: 'Rapports',
    scamCases: 'Cas d’arnaque',
    safeMessages: 'Messages sûrs',
    highRiskAlerts: 'Alertes à haut risque',
    recentReports: 'Rapports récents',
    chatbot: 'Assistant guidé',
    detectionDemo: 'Démo de détection',
    checklist: 'Liste de sécurité',
    userInfo: 'Informations utilisateur',
    police: 'Signalement police',
    appSelectionHint: 'Choisissez les applications à simuler pour les alertes.',
    riskSafe: 'Message sûr / normal',
    riskSuspicious: 'Message suspect détecté',
    riskHigh: 'Alerte d’arnaque à haut risque',
    analyze: 'Analyser',
    protected: 'Protégé par des garde-fous de prototype',
    ready: 'Prêt',
    prototype: 'Prototype',
    selectedApps: 'Applications sélectionnées',
    saveReport: 'Enregistrer le rapport',
    privacyConsent: 'Confidentialité & consentement',
    privacyNotice: 'Cette démo conserve les données localement dans le navigateur uniquement. Elles ne sont pas envoyées automatiquement à une autorité.',
    reportSaved: 'Rapport enregistré avec succès',
    caseId: 'ID du dossier',
    dangerTitle: 'Alerte ! Connexion suspecte détectée',
    safeTitle: 'Message sûr confirmé',
    suspiciousTitle: 'Motif d’arnaque potentiel détecté',
    warningVoice: 'Alerte. Une connexion suspecte a été détectée sur l’application sélectionnée.',
    dangerVoice: 'Risque élevé. Lien d’arnaque détecté. Veuillez arrêter et vérifier le message.',
    safeVoice: 'Sécurisé. Aucun motif suspect n’a été détecté dans ce message.',
    detectionInputHint: 'Collez un SMS, un e-mail ou un message social pour vérifier les indicateurs d’arnaque.',
    detectionDemoLabel: 'Périmètre de démonstration',
    open: 'Ouvrir',
    protectionFlow: 'Flux de protection',
  },
};

const dashboardStats = [
  { key: 'reports', label: 'Reports', value: '284' },
  { key: 'scamCases', label: 'Scam cases', value: '39' },
  { key: 'safeMessages', label: 'Safe messages', value: '198' },
  { key: 'highRiskAlerts', label: 'High-risk alerts', value: '12' },
] as const;

const quickActions = [
  { icon: '🧠', labelKey: 'chatbot', route: '/chatbot' },
  { icon: '🔍', labelKey: 'detectionDemo', route: '/detection' },
  { icon: '✅', labelKey: 'checklist', route: '/checklist' },
  { icon: '📋', labelKey: 'userInfo', route: '/userinfo' },
  { icon: '🚔', labelKey: 'police', route: '/police' },
] as const;

function App() {
  const [language, setLanguage] = useState<LanguageCode>('en');
  const [selectedApps, setSelectedApps] = useState<AppChoice[]>(['WhatsApp', 'Gmail', 'Instagram']);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const labels = translations[language];

  const toggleApp = (app: AppChoice) => {
    setSelectedApps((current) =>
      current.includes(app) ? current.filter((item) => item !== app) : [...current, app],
    );
  };

  return (
    <BrowserRouter>
      <div className="app-shell">
        <div className="background-grid" />

        <Routes>
          <Route
            path="/"
            element={
              <LoginPage
                language={language}
                setLanguage={setLanguage}
                selectedApps={selectedApps}
                toggleApp={toggleApp}
                labels={labels}
                onLogin={() => setIsLoggedIn(true)}
              />
            }
          />
          <Route
            path="/dashboard"
            element={
              isLoggedIn ? (
                <DashboardPage language={language} labels={labels} selectedApps={selectedApps} />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route path="/chatbot" element={<ChatbotPage labels={labels} />} />
          <Route path="/detection" element={<DetectionPage labels={labels} selectedApps={selectedApps} />} />
          <Route path="/checklist" element={<ChecklistPage labels={labels} />} />
          <Route path="/userinfo" element={<UserInfoPage labels={labels} />} />
          <Route path="/police" element={<PolicePage labels={labels} />} />
          <Route path="/login" element={<Navigate to="/" replace />} />
          <Route path="*" element={<NotFoundPage labels={labels} />} />
        </Routes>
      </div>
    </BrowserRouter>
=======
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
>>>>>>> 464fbf0c0f48c84d42844d6ee2ce818a7f35b9de
  );
}

function LoginPage({
  language,
  setLanguage,
  selectedApps,
<<<<<<< HEAD
  toggleApp,
  labels,
  onLogin,
=======
  onToggleApp,
  onLogin,
  userName,
  t
>>>>>>> 464fbf0c0f48c84d42844d6ee2ce818a7f35b9de
}: {
  language: LanguageCode;
  setLanguage: (language: LanguageCode) => void;
  selectedApps: AppChoice[];
<<<<<<< HEAD
  toggleApp: (app: AppChoice) => void;
  labels: TranslationDictionary;
  onLogin: () => void;
}) {
  const navigate = useNavigate();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onLogin();
    navigate('/dashboard');
  };

  return (
    <div className="auth-layout">
      <div className="auth-shell">
        <div className="brand-lockup">
          <div className="brand-icon">S</div>
          <div>
            <div className="eyebrow">{labels.brand}</div>
            <div className="muted-text">Prevent · Detect · Guide · Protect</div>
          </div>
        </div>

        <div className="panel login-panel">
          <div className="section-head centered">
            <span className="badge badge-success">{labels.prototype}</span>
            <h1>{labels.loginTitle}</h1>
          </div>

          <form onSubmit={handleSubmit} className="form-stack">
            <label className="field">
              <span>{labels.username}</span>
              <input defaultValue="demo.user" />
            </label>

            <label className="field">
              <span>{labels.password}</span>
              <input type="password" defaultValue="secure123" />
            </label>

            <label className="field">
              <span>{labels.language}</span>
              <select value={language} onChange={(event) => setLanguage(event.target.value as LanguageCode)}>
                <option value="en">English</option>
                <option value="ta">தமிழ்</option>
                <option value="hi">हिन्दी</option>
                <option value="fr">Français</option>
              </select>
            </label>

            <div className="field">
              <span>{labels.appAccess}</span>
              <div className="app-grid">
                {appOptions.map((app) => (
                  <label key={app} className={`app-option ${selectedApps.includes(app) ? 'selected' : ''}`}>
                    <input type="checkbox" checked={selectedApps.includes(app)} onChange={() => toggleApp(app)} />
                    <span>{app}</span>
                  </label>
                ))}
              </div>
              <small>{labels.appSelectionHint}</small>
            </div>

            <button type="submit" className="primary-button">
              {labels.signIn}
            </button>
          </form>
        </div>
=======
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
>>>>>>> 464fbf0c0f48c84d42844d6ee2ce818a7f35b9de
      </div>
    </div>
  );
}

function DashboardPage({
<<<<<<< HEAD
  labels,
  selectedApps,
  language,
}: {
  labels: TranslationDictionary;
  selectedApps: AppChoice[];
  language: LanguageCode;
}) {
  const currentApps = useMemo(
    () => (selectedApps.length > 0 ? selectedApps : ['WhatsApp', 'Gmail', 'Instagram']),
    [selectedApps],
  );

  return (
    <div className="page-shell">
      <HeaderBar labels={labels} language={language} />

      <div className="stats-grid">
        {dashboardStats.map((item) => (
          <div key={item.key} className="panel stat-card">
            <div className="stat-label">{labels[item.key as keyof TranslationDictionary] || item.label}</div>
            <div className="stat-value">{item.value}</div>
            <div className="stat-bar" />
          </div>
        ))}
      </div>

      <div className="content-grid two-col">
        <div className="panel">
          <h3>{labels.dashboard}</h3>
          <div className="grid-actions">
            {quickActions.map((action) => (
              <Link key={action.route} to={action.route} className="action-card">
                <span>{action.icon}</span>
                <strong>{labels[action.labelKey as keyof TranslationDictionary]}</strong>
              </Link>
            ))}
          </div>
        </div>

        <div className="panel">
          <h3>{labels.recentReports}</h3>
          <div className="report-list">
            {[
              'WhatsApp phishing alert',
              'Telegram suspicious login attempt',
              'Gmail invoice scam',
              'Instagram giveaway scam',
            ].map((report, index) => (
              <button key={report} type="button" className="report-item">
                <div>
                  <strong>{report}</strong>
                  <small>Case #{index + 204}</small>
                </div>
                <span className="chip success">{labels.open}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="panel app-panel">
        <h3>{labels.selectedApps}</h3>
        <div className="app-pill-row">
          {currentApps.map((app) => (
            <span key={app} className="app-pill">{app}</span>
          ))}
        </div>
      </div>
=======
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
>>>>>>> 464fbf0c0f48c84d42844d6ee2ce818a7f35b9de
    </div>
  );
}

<<<<<<< HEAD
function ChatbotPage({ labels }: { labels: TranslationDictionary }) {
  const [customQuestion, setCustomQuestion] = useState('How do I enable 2FA?');
  const [responses, setResponses] = useState<string[]>([
    'Step 1: Open your security settings. Step 2: Turn on 2-step verification. Step 3: Use an authenticator app or SMS code. Step 4: Save backup codes.',
  ]);

  const quickQuestions = [
    'How do I enable 2FA?',
    'What is a phishing message?',
    'How do I report a scam?',
    'How can I secure my WhatsApp?',
  ];

  const askAssistant = (question: string) => {
    const answerMap: Record<string, string> = {
      'How do I enable 2FA?': 'Step 1: Open security settings. Step 2: Choose 2-step verification. Step 3: Link your phone number or authenticator app. Step 4: Save backup codes.',
      'What is a phishing message?': 'A phishing message tricks you into sharing passwords, OTPs, or payment details through fake links or urgent requests.',
      'How do I report a scam?': 'Report the message in the app, block the sender, and submit a scam case in the protection dashboard for review.',
      'How can I secure my WhatsApp?': 'Turn on two-step verification, review active sessions, and never click unknown verification links.',
    };

    const answer = answerMap[question] ?? 'Use strong passwords and verify odd requests before clicking links.';
    setCustomQuestion(question);
    setResponses((current) => [`Q: ${question}\nA: ${answer}`, ...current]);
  };

  return (
    <div className="page-shell">
      <HeaderBar labels={labels} />
      <div className="panel chatbot-panel">
        <h3>{labels.chatbot}</h3>

        <div className="quick-question-list">
          {quickQuestions.map((question) => (
            <button key={question} type="button" className="mini-button" onClick={() => askAssistant(question)}>
              {question}
            </button>
          ))}
        </div>

        <div className="chat-input-wrap">
          <input value={customQuestion} onChange={(event) => setCustomQuestion(event.target.value)} placeholder="Ask the security assistant" />
          <button type="button" className="primary-button" onClick={() => askAssistant(customQuestion)}>
            Ask
          </button>
        </div>

        <div className="chat-output">
          {responses.map((response, index) => (
            <div key={`${response}-${index}`} className="chat-bubble">
              {response}
            </div>
=======
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
>>>>>>> 464fbf0c0f48c84d42844d6ee2ce818a7f35b9de
          ))}
        </div>
      </div>
    </div>
  );
}

<<<<<<< HEAD
function DetectionPage({ labels, selectedApps }: { labels: TranslationDictionary; selectedApps: AppChoice[] }) {
  const [input, setInput] = useState('Urgent! Your account has been locked. Verify now: https://secure-login-check.co');
  const [result, setResult] = useState<{ level: RiskLevel; message: string } | null>(null);
  const [showAlert, setShowAlert] = useState(false);

  const playAlert = (tone: 'safe' | 'warning' | 'danger') => {
    const AudioCtor =
      (window.AudioContext || (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext) || undefined;

    if (!AudioCtor) return;

    const audioContext = new AudioCtor();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.type = 'sine';
    oscillator.frequency.value = tone === 'safe' ? 440 : tone === 'warning' ? 620 : 180;
    gainNode.gain.value = tone === 'safe' ? 0.02 : 0.05;

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    oscillator.start();
    oscillator.stop(audioContext.currentTime + (tone === 'safe' ? 0.22 : 0.8));
  };

  const speakAlert = (text: string) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = labels.language === 'ta' ? 'ta-IN' : labels.language === 'hi' ? 'hi-IN' : labels.language === 'fr' ? 'fr-FR' : 'en-US';
    utterance.rate = 0.96;
    window.speechSynthesis.speak(utterance);
  };

  const analyze = () => {
    const activeApps = selectedApps.length > 0 ? selectedApps.join(', ') : 'General';
    const lower = input.toLowerCase();
    const suspiciousWords = ['urgent', 'verify now', 'password', 'click here', 'locked', 'otp', 'bank update', 'secure-login'];
    const isRisky = suspiciousWords.some((word) => lower.includes(word)) || /https?:\/\//i.test(input);

    if (isRisky) {
      const message = `High-risk phishing pattern detected in ${activeApps}: urgent wording, sign-in pressure, and external URL. This message is unsafe.`;
      setResult({ level: 'high-risk', message });
      setShowAlert(true);
      playAlert('danger');
      speakAlert(labels.dangerVoice);
      return;
    }

    const safeMessage = `Safe / Normal message: no scam or phishing indicators found in this content for ${activeApps}.`;
    setResult({ level: 'safe', message: safeMessage });
    setShowAlert(false);
    playAlert('safe');
    speakAlert(labels.safeVoice);
  };

  return (
    <div className="page-shell">
      <HeaderBar labels={labels} />
      <div className="panel detection-panel">
        <h3>{labels.detectionDemo}</h3>
        <div className="inline-tag">{labels.detectionDemoLabel}: {selectedApps.length > 0 ? selectedApps.join(', ') : 'No apps selected'}</div>
        <p className="field-hint">{labels.detectionInputHint}</p>
        <textarea value={input} onChange={(event) => setInput(event.target.value)} rows={6} />
        <button type="button" className="primary-button" onClick={analyze}>
          {labels.analyze}
        </button>

        {result && (
          <div className={`alert-box ${result.level}`}>
            <div className="alert-title">
              {result.level === 'safe' ? labels.riskSafe : result.level === 'suspicious' ? labels.riskSuspicious : labels.riskHigh}
            </div>
            <p>{result.message}</p>
          </div>
        )}

        {showAlert && (
          <div className="modal-backdrop" onClick={() => setShowAlert(false)}>
            <div className="warning-modal" onClick={(event) => event.stopPropagation()}>
              <div className="warning-icon">🚨</div>
              <h3>{labels.dangerTitle}</h3>
              <p>{labels.warningVoice}</p>
              <div className="warning-actions">
                <button type="button" className="primary-button" onClick={() => setShowAlert(false)}>
                  Acknowledge
                </button>
              </div>
=======
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
>>>>>>> 464fbf0c0f48c84d42844d6ee2ce818a7f35b9de
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

<<<<<<< HEAD
function ChecklistPage({ labels }: { labels: TranslationDictionary }) {
  const tasks = [
    'I use a unique password for each app.',
    'I enable two-factor authentication on critical accounts.',
    'I review login sessions and unknown devices.',
    'I never click on odd links from strangers.',
    'I keep my security app updated.',
  ];

  return (
    <div className="page-shell">
      <HeaderBar labels={labels} />
      <div className="panel checklist-panel">
        <h3>{labels.checklist}</h3>
        <ul className="checklist-list">
          {tasks.map((task) => (
            <li key={task}>
              <span className="checkmark">✓</span>
              <span>{task}</span>
            </li>
          ))}
        </ul>
=======
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
>>>>>>> 464fbf0c0f48c84d42844d6ee2ce818a7f35b9de
      </div>
    </div>
  );
}

<<<<<<< HEAD
function UserInfoPage({ labels }: { labels: TranslationDictionary }) {
  const [submitted, setSubmitted] = useState(false);
  const [formValue, setFormValue] = useState({
    name: '',
    phone: '',
    email: '',
    dateTime: '',
    scamType: '',
=======
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
>>>>>>> 464fbf0c0f48c84d42844d6ee2ce818a7f35b9de
    suspiciousMessage: '',
    suspectInfo: '',
    suspiciousUrl: '',
    description: '',
<<<<<<< HEAD
  });

  const handleChange = (field: string, value: string) => {
    setFormValue((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const caseId = `FRAUD-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const report = { ...formValue, caseId, language: labels.brand, storedAt: new Date().toISOString() };
    const previousReports = JSON.parse(localStorage.getItem('smartFraudReportDb') ?? '[]');
    localStorage.setItem('smartFraudReportDb', JSON.stringify([...previousReports, report]));
    setSubmitted(true);
  };

  return (
    <div className="page-shell">
      <HeaderBar labels={labels} />
      <div className="panel form-panel">
        <h3>{labels.userInfo}</h3>
        <form className="form-stack" onSubmit={handleSubmit}>
          <div className="two-input-grid">
            <label className="field"><span>Name</span><input value={formValue.name} onChange={(event) => handleChange('name', event.target.value)} /></label>
            <label className="field"><span>Phone</span><input value={formValue.phone} onChange={(event) => handleChange('phone', event.target.value)} /></label>
          </div>
          <div className="two-input-grid">
            <label className="field"><span>Email</span><input type="email" value={formValue.email} onChange={(event) => handleChange('email', event.target.value)} /></label>
            <label className="field"><span>Date / Time</span><input type="datetime-local" value={formValue.dateTime} onChange={(event) => handleChange('dateTime', event.target.value)} /></label>
          </div>

          <label className="field"><span>Scam type</span><input value={formValue.scamType} onChange={(event) => handleChange('scamType', event.target.value)} /></label>
          <label className="field"><span>Suspicious message</span><textarea rows={4} value={formValue.suspiciousMessage} onChange={(event) => handleChange('suspiciousMessage', event.target.value)} /></label>
          <label className="field"><span>Suspect info</span><input value={formValue.suspectInfo} onChange={(event) => handleChange('suspectInfo', event.target.value)} /></label>
          <label className="field"><span>Suspicious URL</span><input value={formValue.suspiciousUrl} onChange={(event) => handleChange('suspiciousUrl', event.target.value)} /></label>
          <label className="field"><span>Description</span><textarea rows={4} value={formValue.description} onChange={(event) => handleChange('description', event.target.value)} /></label>
          <label className="field"><span>Evidence / screenshot</span><input type="file" /></label>

          <div className="privacy-box">
            <strong>{labels.privacyConsent}</strong>
            <p>{labels.privacyNotice}</p>
          </div>

          <button type="submit" className="primary-button">{labels.saveReport}</button>
        </form>

        {submitted && (
          <div className="success-popup">
            <strong>{labels.reportSaved}</strong>
            <p>{labels.caseId}: FRAUD-{new Date().getFullYear()}-{Math.floor(1000 + Math.random() * 9000)}</p>
          </div>
        )}
=======
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
>>>>>>> 464fbf0c0f48c84d42844d6ee2ce818a7f35b9de
      </div>
    </div>
  );
}

<<<<<<< HEAD
function PolicePage({ labels }: { labels: TranslationDictionary }) {
  const storedReports = JSON.parse(localStorage.getItem('smartFraudReportDb') ?? '[]');
  const latestReport = storedReports[storedReports.length - 1] ?? {
    caseId: 'FRAUD-2026-1148',
    name: 'Demo User',
    suspiciousMessage: 'Urgent account verification request from an unknown sender.',
  };

  const reportText = `Incident ID: ${latestReport.caseId}\nReporter: ${latestReport.name || 'Demo User'}\nStatus: Under review\nSummary: ${latestReport.suspiciousMessage || 'Suspicious fraud attempt through fake verification link.'}\nAction: User reported scam and blocked sender.`;

  const downloadReport = () => {
    const blob = new Blob([reportText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'smart-fraud-report.txt';
    link.click();
    URL.revokeObjectURL(url);
  };

  const shareReport = async () => {
    if (navigator.share) {
      await navigator.share({
        title: 'Smart Fraud Report',
        text: reportText,
      });
      return;
    }

    downloadReport();
  };

  return (
    <div className="page-shell">
      <HeaderBar labels={labels} />
      <div className="panel police-panel">
        <h3>{labels.police}</h3>
        <pre>{reportText}</pre>
        <div className="action-row">
          <button type="button" className="primary-button" onClick={downloadReport}>Download</button>
          <button type="button" className="secondary-button" onClick={shareReport}>Share</button>
        </div>
      </div>
    </div>
  );
}

function NotFoundPage({ labels }: { labels: TranslationDictionary }) {
  return (
    <div className="page-shell">
      <HeaderBar labels={labels} />
      <div className="panel not-found-panel">
        <h3>Page not found</h3>
      </div>
    </div>
  );
}

function HeaderBar({ labels, language }: { labels: TranslationDictionary; language?: LanguageCode }) {
  return (
    <header className="topbar">
      <div className="brand-lockup">
        <div className="brand-icon">S</div>
        <div>
          <div className="eyebrow">{labels.brand}</div>
          <div className="muted-text">{labels.protected}</div>
        </div>
      </div>

      <nav className="nav-row">
        <Link to="/dashboard">{labels.dashboard}</Link>
        <Link to="/chatbot">{labels.chatbot}</Link>
        <Link to="/detection">{labels.detectionDemo}</Link>
        <Link to="/checklist">{labels.checklist}</Link>
        <Link to="/userinfo">{labels.userInfo}</Link>
        <Link to="/police">{labels.police}</Link>
      </nav>

      {language && <span className="language-indicator">{language.toUpperCase()}</span>}
    </header>
=======
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
>>>>>>> 464fbf0c0f48c84d42844d6ee2ce818a7f35b9de
  );
}

export default App;
