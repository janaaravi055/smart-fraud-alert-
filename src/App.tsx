import React, { FormEvent, useMemo, useState } from 'react';
import {
  BrowserRouter,
  Link,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from 'react-router-dom';

type LanguageCode = 'en' | 'ta' | 'hi' | 'fr';
type RiskLevel = 'safe' | 'suspicious' | 'high-risk';

type AppChoice =
  | 'WhatsApp'
  | 'Telegram'
  | 'SMS'
  | 'Gmail'
  | 'Outlook'
  | 'Instagram'
  | 'Facebook';

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

const appOptions: AppChoice[] = [
  'WhatsApp',
  'Telegram',
  'SMS',
  'Gmail',
  'Outlook',
  'Instagram',
  'Facebook',
];

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
    privacyNotice:
      'This demo stores report data locally in the browser only. It is not sent automatically to any authority.',
    reportSaved: 'Report saved successfully',
    caseId: 'Case ID',
    dangerTitle: 'Warning! Suspicious login detected',
    safeTitle: 'Safe message confirmed',
    suspiciousTitle: 'Potential scam pattern identified',
    warningVoice:
      'Warning. Suspicious login detected on the selected app.',
    dangerVoice:
      'High risk. Scam link detected. Please stop and verify the message.',
    safeVoice:
      'Safe. No suspicious pattern detected in this message.',
    detectionInputHint:
      'Paste SMS, email, or social message content to check for scam indicators.',
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
    appSelectionHint:
      'எந்த ஆப்ஸில் எச்சரிக்கையை உருவகிக்க வேண்டும் என்பதைத் தேர்ந்தெடுக்கவும்.',
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
    privacyNotice:
      'இந்த டெமோ அறிக்கையை browser-ல் மட்டும் local-ஆக சேமிக்கிறது. எந்த அதிகாரியுக்கும் தானாக அனுப்பப்படாது.',
    reportSaved: 'அறிக்கை வெற்றிகரமாக சேமிக்கப்பட்டது',
    caseId: 'வழக்கு எண்',
    dangerTitle: 'எச்சரிக்கை! சந்தேகமான உள்நுழைவு கண்டறியப்பட்டது',
    safeTitle: 'பாதுகாப்பான செய்தி உறுதி செய்யப்பட்டது',
    suspiciousTitle: 'சந்தேகமான மோசடி வடிவம் கண்டறியப்பட்டது',
    warningVoice:
      'எச்சரிக்கை. தேர்ந்தெடுக்கப்பட்ட ஆப்ஸில் சந்தேகமான உள்நுழைவு கண்டறியப்பட்டது.',
    dangerVoice:
      'மிக அதிக ஆபத்து. மோசடி இணை கண்டறியப்பட்டது. தயவுசெய்து நிறுத்தி செய்தியை சரிபார்க்கவும்.',
    safeVoice:
      'பாதுகாப்பானது. இந்த செய்தியில் சந்தேகமான வடிவம் இல்லை.',
    detectionInputHint:
      'ஸ்கேம் அறிகுறிகளைச் சரிபார்க்க SMS, மின்னஞ்சல் அல்லது social message-ஐ ஒட்டவும்.',
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
    appSelectionHint:
      'किस ऐप पर अलर्ट का सिमुलेशन करना है चुनें।',
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
    privacyNotice:
      'यह डेमो रिपोर्ट को केवल ब्राउज़र में लोकल रूप से सेव करता है। इसे स्वचालित रूप से किसी प्राधिकरण को नहीं भेजा जाता है।',
    reportSaved: 'रिपोर्ट सफलतापूर्वक सेव की गई',
    caseId: 'केस आईडी',
    dangerTitle: 'चेतावनी! संदिग्ध लॉगिन पाया गया',
    safeTitle: 'सुरक्षित संदेश की पुष्टि',
    suspiciousTitle: 'संभावित स्कैम पैटर्न पाया गया',
    warningVoice:
      'चेतावनी। चयनित ऐप पर संदिग्ध लॉगिन पाया गया।',
    dangerVoice:
      'उच्च जोखिम। स्कैम लिंक पाया गया। कृपया रुकें और संदेश सत्यापित करें।',
    safeVoice:
      'सुरक्षित। इस संदेश में कोई संदिग्ध पैटर्न नहीं मिला।',
    detectionInputHint:
      'स्कैम संकेतों की जांच के लिए SMS, ईमेल या सोशल मैसेज को पेस्ट करें।',
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
    appSelectionHint:
      'Choisissez les applications à simuler pour les alertes.',
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
    privacyNotice:
      'Cette démo conserve les données localement dans le navigateur uniquement.',
    reportSaved: 'Rapport enregistré avec succès',
    caseId: 'ID du dossier',
    dangerTitle: 'Alerte ! Connexion suspecte détectée',
    safeTitle: 'Message sûr confirmé',
    suspiciousTitle: 'Motif d’arnaque potentiel détecté',
    warningVoice:
      'Alerte. Une connexion suspecte a été détectée.',
    dangerVoice:
      'Risque élevé. Lien d’arnaque détecté. Veuillez vérifier le message.',
    safeVoice:
      'Sécurisé. Aucun motif suspect n’a été détecté.',
    detectionInputHint:
      'Collez un SMS, un e-mail ou un message social.',
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

  const [selectedApps, setSelectedApps] = useState<AppChoice[]>([
    'WhatsApp',
    'Gmail',
    'Instagram',
  ]);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const labels = translations[language];

  const toggleApp = (app: AppChoice) => {
    setSelectedApps((current) =>
      current.includes(app)
        ? current.filter((item) => item !== app)
        : [...current, app],
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
                <DashboardPage
                  language={language}
                  labels={labels}
                  selectedApps={selectedApps}
                />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />

          <Route
            path="/chatbot"
            element={<ChatbotPage labels={labels} />}
          />

          <Route
            path="/detection"
            element={
              <DetectionPage
                labels={labels}
                selectedApps={selectedApps}
              />
            }
          />

          <Route
            path="/checklist"
            element={<ChecklistPage labels={labels} />}
          />

          <Route
            path="/userinfo"
            element={<UserInfoPage labels={labels} />}
          />

          <Route
            path="/police"
            element={<PolicePage labels={labels} />}
          />

          <Route
            path="/login"
            element={<Navigate to="/" replace />}
          />

          <Route
            path="*"
            element={<NotFoundPage labels={labels} />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

function LoginPage({
  language,
  setLanguage,
  selectedApps,
  toggleApp,
  labels,
  onLogin,
}: {
  language: LanguageCode;
  setLanguage: (language: LanguageCode) => void;
  selectedApps: AppChoice[];
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
            <div className="eyebrow">
              {labels.brand}
            </div>

            <div className="muted-text">
              Prevent · Detect · Guide · Protect
            </div>
          </div>
        </div>

        <div className="panel login-panel">
          <div className="section-head centered">
            <span className="badge badge-success">
              {labels.prototype}
            </span>

            <h1>{labels.loginTitle}</h1>
          </div>

          <form
            onSubmit={handleSubmit}
            className="form-stack"
          >
            <label className="field">
              <span>{labels.username}</span>

              <input
                defaultValue="demo.user"
                required
              />
            </label>

            <label className="field">
              <span>{labels.password}</span>

              <input
                type="password"
                defaultValue="secure123"
                required
              />
            </label>

            <label className="field">
              <span>{labels.language}</span>

              <select
                value={language}
                onChange={(event) =>
                  setLanguage(
                    event.target.value as LanguageCode,
                  )
                }
              >
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
                  <label
                    key={app}
                    className={`app-option ${
                      selectedApps.includes(app)
                        ? 'selected'
                        : ''
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={selectedApps.includes(app)}
                      onChange={() => toggleApp(app)}
                    />

                    <span>{app}</span>
                  </label>
                ))}
              </div>

              <small>
                {labels.appSelectionHint}
              </small>
            </div>

            <button
              type="submit"
              className="primary-button"
            >
              {labels.signIn}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}

function DashboardPage({
  labels,
  selectedApps,
  language,
}: {
  labels: TranslationDictionary;
  selectedApps: AppChoice[];
  language: LanguageCode;
}) {
  const currentApps = useMemo(
    () =>
      selectedApps.length > 0
        ? selectedApps
        : ['WhatsApp', 'Gmail', 'Instagram'],
    [selectedApps],
  );

  return (
    <div className="page-shell">
      <HeaderBar
        labels={labels}
        language={language}
      />

      <div className="stats-grid">
        {dashboardStats.map((item) => (
          <div
            key={item.key}
            className="panel stat-card"
          >
            <div className="stat-label">
              {
                labels[
                  item.key as keyof TranslationDictionary
                ] || item.label
              }
            </div>

            <div className="stat-value">
              {item.value}
            </div>

            <div className="stat-bar" />
          </div>
        ))}
      </div>

      <div className="content-grid two-col">
        <div className="panel">
          <h3>{labels.dashboard}</h3>

          <div className="grid-actions">
            {quickActions.map((action) => (
              <Link
                key={action.route}
                to={action.route}
                className="action-card"
              >
                <span>{action.icon}</span>

                <strong>
                  {
                    labels[
                      action.labelKey as keyof TranslationDictionary
                    ]
                  }
                </strong>
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
              <button
                key={report}
                type="button"
                className="report-item"
              >
                <div>
                  <strong>{report}</strong>
                  <small>
                    Case #{index + 204}
                  </small>
                </div>

                <span className="chip success">
                  {labels.open}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="panel app-panel">
        <h3>{labels.selectedApps}</h3>

        <div className="app-pill-row">
          {currentApps.map((app) => (
            <span
              key={app}
              className="app-pill"
            >
              {app}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function ChatbotPage({
  labels,
}: {
  labels: TranslationDictionary;
}) {
  const [customQuestion, setCustomQuestion] =
    useState('How do I enable 2FA?');

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
      'How do I enable 2FA?':
        'Step 1: Open security settings. Step 2: Choose 2-step verification. Step 3: Link your phone number or authenticator app. Step 4: Save backup codes.',

      'What is a phishing message?':
        'A phishing message tricks you into sharing passwords, OTPs, or payment details through fake links or urgent requests.',

      'How do I report a scam?':
        'Report the message in the app, block the sender, and submit a scam case in the protection dashboard for review.',

      'How can I secure my WhatsApp?':
        'Turn on two-step verification, review active sessions, and never click unknown verification links.',
    };

    const answer =
      answerMap[question] ??
      'Use strong passwords and verify unusual requests before clicking links.';

    setCustomQuestion(question);

    setResponses((current) => [
      `Q: ${question}\nA: ${answer}`,
      ...current,
    ]);
  };

  return (
    <div className="page-shell">
      <HeaderBar labels={labels} />

      <div className="panel chatbot-panel">
        <h3>{labels.chatbot}</h3>
        <div className="quick-question-list">
          {quickQuestions.map((question) => (
            <button
              key={question}
              type="button"
              className="mini-button"
              onClick={() => askAssistant(question)}
            >
              {question}
            </button>
          ))}
        </div>

        <div className="chat-input-wrap">
          <input
            value={customQuestion}
            onChange={(event) =>
              setCustomQuestion(event.target.value)
            }
            placeholder="Ask the security assistant"
          />

          <button
            type="button"
            className="primary-button"
            onClick={() =>
              askAssistant(customQuestion)
            }
          >
            Ask
          </button>
        </div>

        <div className="chat-output">
          {responses.map((response, index) => (
            <div
              key={`${response}-${index}`}
              className="chat-bubble"
            >
              {response}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DetectionPage({
  labels,
  selectedApps,
}: {
  labels: TranslationDictionary;
  selectedApps: AppChoice[];
}) {
  const [input, setInput] = useState(
    'Urgent! Your account has been locked. Verify now: https://secure-login-check.co',
  );

  const [result, setResult] = useState<{
    level: RiskLevel;
    message: string;
  } | null>(null);

  const [showAlert, setShowAlert] =
    useState(false);

  const playAlert = (text: string) => {
    if (
      typeof window !== 'undefined' &&
      'speechSynthesis' in window
    ) {
      window.speechSynthesis.cancel();

      const speech =
        new SpeechSynthesisUtterance(text);

      speech.rate = 0.9;
      speech.pitch = 1;

      window.speechSynthesis.speak(speech);
    }
  };

  const analyzeMessage = () => {
    const text = input.toLowerCase();

    const highRiskWords = [
      'otp',
      'password',
      'verify now',
      'account locked',
      'urgent',
      'click here',
      'payment',
      'bank',
      'upi',
      'prize',
      'winner',
      'crypto',
    ];

    const suspiciousWords = [
      'login',
      'verify',
      'offer',
      'free',
      'claim',
      'limited',
      'security',
    ];

    const highRiskCount =
      highRiskWords.filter((word) =>
        text.includes(word),
      ).length;

    const suspiciousCount =
      suspiciousWords.filter((word) =>
        text.includes(word),
      ).length;

    let level: RiskLevel;
    let message: string;

    if (highRiskCount >= 2) {
      level = 'high-risk';
      message = labels.riskHigh;

      setShowAlert(true);
      playAlert(labels.dangerVoice);
    } else if (suspiciousCount >= 1) {
      level = 'suspicious';
      message = labels.riskSuspicious;

      setShowAlert(true);
      playAlert(labels.warningVoice);
    } else {
      level = 'safe';
      message = labels.riskSafe;

      setShowAlert(false);
      playAlert(labels.safeVoice);
    }

    setResult({
      level,
      message,
    });
  };

  return (
    <div className="page-shell">
      <HeaderBar labels={labels} />

      <div className="content-grid two-col">
        <div className="panel">
          <div className="section-head">
            <span className="badge badge-success">
              {labels.detectionDemoLabel}
            </span>

            <h2>{labels.detectionDemo}</h2>
          </div>

          <p className="muted-text">
            {labels.detectionInputHint}
          </p>

          <textarea
            className="detection-textarea"
            value={input}
            onChange={(event) =>
              setInput(event.target.value)
            }
            rows={9}
          />

          <button
            type="button"
            className="primary-button"
            onClick={analyzeMessage}
          >
            {labels.analyze}
          </button>
        </div>

        <div className="panel">
          <h3>{labels.protectionFlow}</h3>

          <div className="flow-step">
            <span>01</span>
            <div>
              <strong>Scan</strong>
              <small>
                Analyze suspicious patterns
              </small>
            </div>
          </div>

          <div className="flow-step">
            <span>02</span>
            <div>
              <strong>Detect</strong>
              <small>
                Classify the risk level
              </small>
            </div>
          </div>

          <div className="flow-step">
            <span>03</span>
            <div>
              <strong>Alert</strong>
              <small>
                Warn the user when required
              </small>
            </div>
          </div>

          <div className="flow-step">
            <span>04</span>
            <div>
              <strong>Protect</strong>
              <small>
                Guide the user to verify safely
              </small>
            </div>
          </div>
        </div>
      </div>

      {result && (
        <div
          className={`panel result-panel ${result.level}`}
        >
          <div>
            <span className="badge">
              {result.level}
            </span>

            <h2>{result.message}</h2>

            <p>
              Selected apps:{' '}
              {selectedApps.length > 0
                ? selectedApps.join(', ')
                : 'None'}
            </p>
          </div>

          {result.level === 'high-risk' && (
            <strong className="danger-text">
              {labels.dangerTitle}
            </strong>
          )}

          {result.level === 'suspicious' && (
            <strong>
              {labels.suspiciousTitle}
            </strong>
          )}

          {result.level === 'safe' && (
            <strong>
              {labels.safeTitle}
            </strong>
          )}
        </div>
      )}

      {showAlert && (
        <div className="alert-banner">
          ⚠️ {labels.dangerTitle}
        </div>
      )}
    </div>
  );
}

function ChecklistPage({
  labels,
}: {
  labels: TranslationDictionary;
}) {
  const checklist = [
    'Never share OTP or passwords',
    'Verify links before opening',
    'Enable two-factor authentication',
    'Review active login sessions',
    'Block suspicious senders',
    'Report fraudulent messages',
  ];

  return (
    <div className="page-shell">
      <HeaderBar labels={labels} />

      <div className="panel">
        <h2>{labels.checklist}</h2>

        <div className="checklist">
          {checklist.map((item) => (
            <label
              key={item}
              className="check-item"
            >
              <input type="checkbox" />
              <span>{item}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

function UserInfoPage({
  labels,
}: {
  labels: TranslationDictionary;
}) {
  const [saved, setSaved] = useState(false);

  const [name, setName] =
    useState('Demo User');

  const [email, setEmail] =
    useState('demo@example.com');

  const [phone, setPhone] =
    useState('+91 98765 43210');

  const saveUserInfo = () => {
    localStorage.setItem(
      'smartFraudUser',
      JSON.stringify({
        name,
        email,
        phone,
      }),
    );

    setSaved(true);
  };

  return (
    <div className="page-shell">
      <HeaderBar labels={labels} />

      <div className="panel">
        <h2>{labels.userInfo}</h2>

        <div className="form-stack">
          <label className="field">
            <span>Name</span>
            <input
              value={name}
              onChange={(event) =>
                setName(event.target.value)
              }
            />
          </label>

          <label className="field">
            <span>Email</span>
            <input
              type="email"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
            />
          </label>

          <label className="field">
            <span>Phone</span>
            <input
              value={phone}
              onChange={(event) =>
                setPhone(event.target.value)
              }
            />
          </label>

          <button
            type="button"
            className="primary-button"
            onClick={saveUserInfo}
          >
            Save information
          </button>

          {saved && (
            <div className="success-message">
              Information saved locally.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function PolicePage({
  labels,
}: {
  labels: TranslationDictionary;
}) {
  const [message, setMessage] =
    useState('');

  const [submitted, setSubmitted] =
    useState(false);

  const submitReport = () => {
    if (!message.trim()) return;

    localStorage.setItem(
      'policeReport',
      JSON.stringify({
        message,
        createdAt: new Date().toISOString(),
      }),
    );

    setSubmitted(true);
  };

  return (
    <div className="page-shell">
      <HeaderBar labels={labels} />

      <div className="panel">
        <div className="section-head">
          <span className="badge">
            Demo
          </span>

          <h2>{labels.police}</h2>
        </div>

        <p className="muted-text">
          This prototype prepares a report locally.
          It does not automatically send information
          to police or another authority.
        </p>

        <textarea
          className="detection-textarea"
          rows={8}
          value={message}
          onChange={(event) =>
            setMessage(event.target.value)
          }
          placeholder="Describe the suspicious activity..."
        />

        <button
          type="button"
          className="primary-button"
          onClick={submitReport}
        >
          {labels.saveReport}
        </button>

        {submitted && (
          <div className="success-message">
            {labels.reportSaved}
          </div>
        )}
      </div>
    </div>
  );
}

function HeaderBar({
  labels,
  language,
}: {
  labels: TranslationDictionary;
  language?: LanguageCode;
}) {
  return (
    <header className="topbar">
      <Link
        to="/dashboard"
        className="topbar-brand"
      >
        <div className="brand-icon small">
          S
        </div>

        <div>
          <strong>{labels.brand}</strong>
          <small>
            {labels.protected}
          </small>
        </div>
      </Link>

      <nav className="topnav">
        <Link to="/dashboard">
          {labels.dashboard}
        </Link>

        <Link to="/detection">
          {labels.detectionDemo}
        </Link>

        <Link to="/chatbot">
          {labels.chatbot}
        </Link>

        <Link to="/checklist">
          {labels.checklist}
        </Link>
      </nav>

      <div className="status">
        <span className="status-dot" />
        {labels.ready}

        {language && (
          <span className="language-tag">
            {language.toUpperCase()}
          </span>
        )}
      </div>
    </header>
  );
}

function NotFoundPage({
  labels,
}: {
  labels: TranslationDictionary;
}) {
  return (
    <div className="page-shell">
      <div className="panel not-found">
        <h1>404</h1>

        <p>
          Page not found.
        </p>

        <Link
          to="/"
          className="primary-button"
        >
          {labels.signIn}
        </Link>
      </div>
    </div>
  );
}

export default App;