export const DEMO_LEADS = [
  { 
    id: 1, 
    name: 'ישראל כהן', 
    phone: '050-1234567', 
    email: 'israel@example.com', 
    status: 'hot', 
    score: 92, 
    lastContact: '2024-01-10', 
    monthlyValue: 299, 
    source: 'Facebook', 
    sentiment: 'positive', 
    city: 'תל אביב', 
    notes: 'מעוניין בחבילת טריפל פרימיום', 
    currentProvider: 'הוט', 
    packageType: 'טריפל פרימיום', 
    stage: 'negotiation', 
    familySize: 4, 
    interests: ['ספורט', 'סרטים', 'נטפליקס'] 
  },
  { 
    id: 2, 
    name: 'שרה לוי', 
    phone: '052-2345678', 
    email: 'sara@example.com', 
    status: 'warm', 
    score: 78, 
    lastContact: '2024-01-09', 
    monthlyValue: 199, 
    source: 'Google Ads', 
    sentiment: 'neutral', 
    city: 'חיפה', 
    notes: 'מעוניינת באינטרנט מהיר בלבד', 
    currentProvider: 'בזק', 
    packageType: 'אינטרנט 500', 
    stage: 'proposal', 
    familySize: 2, 
    interests: ['עבודה מהבית'] 
  },
  { 
    id: 3, 
    name: 'משה ברק', 
    phone: '054-3456789', 
    email: 'moshe@example.com', 
    status: 'cold', 
    score: 45, 
    lastContact: '2024-01-08', 
    monthlyValue: 149, 
    source: 'Website', 
    sentiment: 'negative', 
    city: 'באר שבע', 
    notes: 'לא מרוצה מהמחיר', 
    currentProvider: 'פרטנר', 
    packageType: 'בסיסי', 
    stage: 'qualification', 
    familySize: 3, 
    interests: ['חסכון'] 
  },
  { 
    id: 4, 
    name: 'רחל אברהם', 
    phone: '053-4567890', 
    email: 'rachel@example.com', 
    status: 'hot', 
    score: 88, 
    lastContact: '2024-01-10', 
    monthlyValue: 399, 
    source: 'Instagram', 
    sentiment: 'positive', 
    city: 'ירושלים', 
    notes: 'רוצה לעבור מהוט עם כל המשפחה', 
    currentProvider: 'הוט', 
    packageType: 'טריפל משפחתי', 
    stage: 'demo', 
    familySize: 6, 
    interests: ['ילדים', 'VOD', 'ספורט'] 
  }
];

export const DEMO_CALLS = [
  { 
    id: 1, 
    leadName: 'ישראל כהן', 
    duration: '5:23', 
    date: '2024-01-10', 
    time: '10:30', 
    status: 'completed', 
    recording: true, 
    sentiment: 'positive', 
    notes: 'שיחה מוצלחת, סגירה צפויה',
    leadScore: 92,
    callQuality: 95,
    keywords: ['מעוניין', 'טריפל', '3 חודשים חינם', 'נטפליקס'],
    transcript: [
      { time: '0:00', speaker: 'agent', text: 'שלום ישראל, מדבר יוסי מחברת התקשורת. ראיתי שביקשת מידע על חבילות שלנו.' },
      { time: '0:05', speaker: 'customer', text: 'כן, אני עם הוט כבר 5 שנים ומחפש משהו יותר משתלם.' },
      { time: '0:10', speaker: 'agent', text: 'מצוין. מה כולל החבילה שלך היום בהוט?' },
      { time: '0:15', speaker: 'customer', text: 'יש לי טלוויזיה, אינטרנט 100 מגה וקו טלפון. משלם 320 שקל בחודש.' },
    ],
    summary: 'הלקוח מעוניין לעבור מהוט. מחפש חיסכון וערך טוב יותר.',
    actionItems: ['לשלוח הצעת מחיר מפורטת', 'להדגיש חיסכון של 70₪ לחודש']
  },
  { 
    id: 2, 
    leadName: 'שרה לוי', 
    duration: '3:45', 
    date: '2024-01-10', 
    time: '11:15', 
    status: 'completed', 
    recording: true, 
    sentiment: 'neutral', 
    notes: 'ביקשה זמן לחשוב',
    leadScore: 78,
    callQuality: 82,
    keywords: ['תקציב מוגבל', 'צריכה לבדוק', 'רק אינטרנט'],
    transcript: [],
    summary: 'הלקוחה מחפשת רק אינטרנט מהיר לעבודה מהבית. תקציב מוגבל.',
    actionItems: ['להציע חבילת אינטרנט 500 מגה', 'לשלוח השוואת מחירים']
  },
  { 
    id: 3, 
    leadName: 'משה ברק', 
    duration: '0:00', 
    date: '2024-01-10', 
    time: '12:00', 
    status: 'missed', 
    recording: false, 
    sentiment: 'negative', 
    notes: 'לא ענה - ניסיון שלישי',
    leadScore: 45,
    callQuality: 0,
    keywords: [],
    transcript: [],
    summary: 'לא ענה בניסיון השלישי. לשקול שליחת SMS או מייל.',
    actionItems: ['לנסות שוב מחר בשעה אחרת', 'לשלוח SMS']
  }
];

export const STATS = {
  newLeads: 24,
  activeCalls: 8,
  conversions: 15,
  monthlyTarget: { current: 142, target: 200 },
  conversionRate: 28,
  avgPackageValue: 249,
  totalCustomers: 2850,
  callsToday: 47
};

export const ACHIEVEMENTS = [
  { id: 1, name: 'כוכב מכירות', icon: 'Star', unlocked: true, description: '10 עסקאות בשבוע', progress: 100 },
  { id: 2, name: 'מלך השיחות', icon: 'Phone', unlocked: true, description: '100 שיחות ביום', progress: 100 },
  { id: 3, name: 'אלוף ההמרות', icon: 'TrendingUp', unlocked: false, description: '50% המרה', progress: 65 },
  { id: 4, name: 'שובר שיאים', icon: 'Trophy', unlocked: false, description: 'מיליון ש"ח בחודש', progress: 68 },
  { id: 5, name: 'נינג\'ה מכירות', icon: 'Zap', unlocked: false, description: '5 עסקאות ביום', progress: 40 },
  { id: 6, name: 'מאסטר CRM', icon: 'Brain', unlocked: true, description: 'השתמש בכל הפיצ\'רים', progress: 100 },
];

export const LEADERBOARD = [
  { name: 'דני גולד', score: 152, deals: 28, avatar: '👨', trend: 'up', change: 12 },
  { name: 'מיכל כהן', score: 143, deals: 25, avatar: '👩', trend: 'up', change: 8 },
  { name: 'אתה', score: 128, deals: 22, avatar: '🎯', isCurrentUser: true, trend: 'up', change: 15 },
  { name: 'יוסי לוי', score: 115, deals: 20, avatar: '👨‍💼', trend: 'down', change: -3 },
  { name: 'נועה ברק', score: 108, deals: 18, avatar: '👩‍💼', trend: 'up', change: 5 },
];

export const PERFORMANCE_DATA = [
  { month: 'ינואר', sales: 156, calls: 1200, conversion: 25, revenue: 38844 },
  { month: 'פברואר', sales: 178, calls: 1350, conversion: 28, revenue: 44322 },
  { month: 'מרץ', sales: 165, calls: 1280, conversion: 26, revenue: 41085 },
  { month: 'אפריל', sales: 198, calls: 1450, conversion: 32, revenue: 49302 },
  { month: 'מאי', sales: 212, calls: 1520, conversion: 35, revenue: 52788 },
  { month: 'יוני', sales: 225, calls: 1600, conversion: 38, revenue: 56025 },
];

export const PACKAGE_DATA = [
  { name: 'טריפל פרימיום', value: 35, color: '#1877F2' },
  { name: 'טריפל בסיסי', value: 28, color: '#4285F4' },
  { name: 'אינטרנט בלבד', value: 20, color: '#E4405F' },
  { name: 'טלוויזיה + אינטרנט', value: 12, color: '#00C853' },
  { name: 'אחר', value: 5, color: '#9E9E9E' },
];

export const TEAM_PERFORMANCE = [
  { subject: 'שיחות', A: 120, B: 110, fullMark: 150 },
  { subject: 'המרות', A: 98, B: 130, fullMark: 150 },
  { subject: 'מכירות', A: 86, B: 130, fullMark: 150 },
  { subject: 'שביעות רצון', A: 99, B: 100, fullMark: 150 },
  { subject: 'זמן תגובה', A: 85, B: 90, fullMark: 150 },
];