require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const PORT = process.env.PORT || 3000;
const HF_MODEL = process.env.HF_MODEL || "deepseek-ai/DeepSeek-R1:fastest";

const PROCEDURES = [
  {
    id: "certificat-negatif",
    code: "PR-03-81",
    title: "Certificat Negatif",
    category: "Creation d'entreprise",
    delay: "24 heures",
    price: "230 DH a 480 DH selon le cas",
    membershipRequired: false,
    summary: "Verification et reservation de denomination commerciale via l'OMPIC.",
    documents: ["CIN", "Carte bancaire", "3 propositions de noms"],
    keywords: ["certificat negatif", "negatif", "denomination", "nom commercial", "creation entreprise", "ompic", "شهادة سلبية", "الاسم التجاري", "تسمية"],
    details:
      "Tarifs : nouvelle denomination 230 DH, modification avant immatriculation 230 DH, modification apres immatriculation 480 DH, renouvellement 210 DH.",
  },
  {
    id: "carte-adhesion",
    code: "PR-03-27",
    title: "Carte d'Adhesion",
    category: "Adhesion",
    delay: "24h si le dossier est conforme",
    price: "100 DH a 200 DH selon le profil",
    membershipRequired: false,
    summary: "Obtention de la carte d'adhesion pour personne physique, morale ou autoentrepreneur.",
    documents: [
      "Personne physique : taxe professionnelle, CIN, photo",
      "Personne morale : taxe professionnelle, RC, statut, PV",
      "Autoentrepreneur : carte autoentrepreneur, attestation registre national, CIN, photo",
    ],
    keywords: ["adhesion", "carte adhesion", "membre", "adhere", "cotisation", "بطاقة الانخراط", "الانخراط", "عضوية"],
    details: "Tarifs : personne physique 100 DH, personne morale 200 DH.",
  },
  {
    id: "location-salle",
    code: "PR-03-122",
    title: "Location de Salle",
    category: "Services",
    delay: "Demande a deposer 3 jours avant",
    price: "Gratuite pour certaines structures professionnelles, sinon 1000 DH a 2000 DH",
    membershipRequired: false,
    summary: "Reservation d'une salle de reunion ou de formation.",
    documents: ["Societes : RC + demande", "Associations : recepisse de depot legal + demande"],
    keywords: ["location salle", "salle", "reservation", "reunion", "formation", "evenement", "حجز قاعة", "قاعة", "كراء قاعة"],
    details:
      "Grande salle : associations non professionnelles 2000 DH, professionnels et societes gratuite. Salle de formation : associations non professionnelles 1000 DH, professionnels et societes gratuite.",
  },
  {
    id: "alc",
    code: "PR-03-75",
    title: "Attestation de Libre Commercialisation",
    category: "Certifications",
    delay: "24h",
    price: "200 DH",
    membershipRequired: true,
    summary: "Document attestant la libre commercialisation du produit.",
    documents: ["Certification ISO ou certificat de conformite", "Declaration sur l'honneur", "Facture"],
    keywords: ["libre commercialisation", "alc", "attestation alc", "commercialisation", "certificat conformite", "حرية التسويق", "شهادة التسويق الحر"],
    details: "Adhesion obligatoire avant depot.",
  },
  {
    id: "attestation-professionnelle",
    code: "PR-03-37",
    title: "Attestation Professionnelle",
    category: "Certifications",
    delay: "24h",
    price: "50 DH a 100 DH selon le profil",
    membershipRequired: false,
    summary: "Attestation administrative liee a l'activite professionnelle.",
    documents: [
      "Personne physique : taxe professionnelle, CIN, photo",
      "Personne morale : ICE, RC, statut, PV",
      "Autoentrepreneur : carte AE, RN, CIN, photo",
    ],
    keywords: ["attestation professionnelle", "attestation pro", "professionnelle", "justificatif activite", "شهادة مهنية", "وثيقة مهنية"],
    details: "Tarifs : personne physique 50 DH, personne morale 100 DH.",
  },
  {
    id: "certificat-origine",
    code: "PR-03-46",
    title: "Certificat d'Origine",
    category: "Export",
    delay: "24h",
    price: "1 pour mille de la facture avec minimum 500 DH et maximum 2000 DH",
    membershipRequired: true,
    summary: "Certification de l'origine des marchandises pour l'export.",
    documents: ["Facture export originale", "Liste de colisage", "DUM ou bulletin de sortie"],
    keywords: ["certificat origine", "origine", "export", "marchandise", "facture export", "شهادة الاصل", "اصل", "تصدير", "بضاعة"],
    details: "Adhesion obligatoire et formulaire extranet requis.",
  },
  {
    id: "renseignement-ompic",
    code: "PR-03-91",
    title: "Demande de Renseignement OMPIC",
    category: "OMPIC",
    delay: "24 a 48h",
    price: "180 DH",
    membershipRequired: false,
    summary: "Demande d'information officielle via la plateforme SIPIC.",
    documents: ["CIN", "Copie de la CIN"],
    keywords: ["renseignement ompic", "sivic", "sipic", "formulaire c3", "renseignement", "ompic", "استعلام", "استفسار امبيك"],
    details: "Processus : plateforme SIPIC, formulaire C3, puis envoi par mail a l'OMPIC.",
  },
  {
    id: "marque",
    code: "PR-03-100",
    title: "Elaboration de la Marque",
    category: "OMPIC",
    delay: "2,5 mois",
    price: "1800 DH a 2400 DH pour 1 classe, puis supplement par classe",
    membershipRequired: false,
    summary: "Depot et elaboration de marque aupres de l'OMPIC.",
    documents: [
      "Personne morale : formulaire M1, pouvoir mandataire, reproduction logo, CIN",
      "Personne physique : formulaire M1, logo, CIN",
    ],
    keywords: ["marque", "depot marque", "logo", "m1", "propriete industrielle", "علامة", "علامة تجارية", "شعار"],
    details:
      "Tarifs 1 classe : personne morale 2400 DH, personne physique 1800 DH. Classe supplementaire : personne morale 480 DH, personne physique 360 DH.",
  },
  {
    id: "design",
    code: "PR-03-110",
    title: "Certificat de Design",
    category: "OMPIC",
    delay: "2,5 mois",
    price: "760 DH a 960 DH pour 1 classe, puis supplement par classe",
    membershipRequired: false,
    summary: "Depot de design ou modele aupres de l'OMPIC.",
    documents: [
      "Personne morale : formulaire D1, pouvoir mandataire, reproduction design, CIN",
      "Personne physique : formulaire D1, design, CIN",
    ],
    keywords: ["design", "modele", "certificat design", "d1", "ompic design", "تصميم", "نموذج صناعي"],
    details: "Tarifs 1 classe : personne morale 960 DH, personne physique 760 DH. Classe supplementaire : 360 DH.",
  },
  {
    id: "visa",
    code: "PR-03-56",
    title: "Visa / Legalisation",
    category: "Legalisation",
    delay: "24h",
    price: "300 DH",
    membershipRequired: true,
    summary: "Visa et legalisation de documents via la CCISTTA.",
    documents: [
      "Personne physique : taxe professionnelle, CIN, photo",
      "Personne morale : taxe professionnelle, CIN, photo, RC, statut, PV",
    ],
    keywords: ["visa", "legalisation", "legaliser", "legalise", "tampon", "تصديق", "مصادقة", "تاشيرة"],
    details: "Adhesion obligatoire et formulaire extranet requis.",
  },
];

const ARABIC_PROCEDURE_COPY = {
  "certificat-negatif": {
    title: "الشهادة السلبية",
    summary: "التحقق من الاسم التجاري وحجزه عبر OMPIC.",
    details: "الرسوم: تسمية جديدة 230 درهم، تعديل قبل السجل التجاري 230 درهم، تعديل بعد السجل التجاري 480 درهم، تجديد 210 درهم.",
    documents: ["البطاقة الوطنية", "بطاقة بنكية", "3 اقتراحات للاسماء"],
  },
  "carte-adhesion": {
    title: "بطاقة الانخراط",
    summary: "الحصول على بطاقة الانخراط للاشخاص الذاتيين او المعنويين او فئة المقاول الذاتي.",
    details: "الرسوم: 100 درهم للشخص الذاتي و200 درهم للشخص المعنوي.",
    documents: [
      "الشخص الذاتي: الضريبة المهنية، البطاقة الوطنية، صورة",
      "الشخص المعنوي: الضريبة المهنية، السجل التجاري، القانون الاساسي، المحضر",
      "المقاول الذاتي: بطاقة المقاول الذاتي، شهادة السجل الوطني، البطاقة الوطنية، صورة",
    ],
  },
  "location-salle": {
    title: "كراء القاعة",
    summary: "حجز قاعة للاجتماعات او التكوين.",
    details: "القاعة الكبرى: 2000 درهم للجمعيات غير المهنية ومجانية للمهنيين والشركات. قاعة التكوين: 1000 درهم للجمعيات غير المهنية ومجانية للمهنيين والشركات.",
    documents: ["الشركات: السجل التجاري + طلب", "الجمعيات: وصل الايداع القانوني + طلب"],
  },
  alc: {
    title: "شهادة حرية التسويق",
    summary: "وثيقة تثبت امكانية تسويق المنتوج بحرية.",
    details: "الانخراط اجباري قبل ايداع الملف.",
    documents: ["شهادة ISO او شهادة المطابقة", "تصريح بالشرف", "فاتورة"],
  },
  "attestation-professionnelle": {
    title: "الشهادة المهنية",
    summary: "شهادة ادارية مرتبطة بالنشاط المهني.",
    details: "الرسوم: 50 درهم للشخص الذاتي و100 درهم للشخص المعنوي.",
    documents: [
      "الشخص الذاتي: الضريبة المهنية، البطاقة الوطنية، صورة",
      "الشخص المعنوي: ICE، السجل التجاري، القانون الاساسي، المحضر",
      "المقاول الذاتي: بطاقة المقاول الذاتي، السجل الوطني، البطاقة الوطنية، صورة",
    ],
  },
  "certificat-origine": {
    title: "شهادة الاصل",
    summary: "شهادة تثبت اصل البضائع الموجهة للتصدير.",
    details: "الانخراط اجباري مع تعبئة استمارة الاكسترانيت.",
    documents: ["الفاتورة الاصلية للتصدير", "لائحة التلفيف", "DUM او وصل الخروج"],
  },
  "renseignement-ompic": {
    title: "طلب معلومات لدى OMPIC",
    summary: "طلب معلومات رسمية عبر منصة SIPIC.",
    details: "المسطرة: منصة SIPIC ثم استمارة C3 ثم ارسال البريد الى OMPIC.",
    documents: ["البطاقة الوطنية", "نسخة من البطاقة الوطنية"],
  },
  marque: {
    title: "ايداع العلامة التجارية",
    summary: "ايداع العلامة التجارية لدى OMPIC.",
    details: "رسوم صنف واحد: 2400 درهم للشخص المعنوي و1800 درهم للشخص الذاتي. الصنف الاضافي: 480 او 360 درهم حسب الحالة.",
    documents: ["الشخص المعنوي: استمارة M1، وكالة، الشعار، البطاقة الوطنية", "الشخص الذاتي: استمارة M1، الشعار، البطاقة الوطنية"],
  },
  design: {
    title: "شهادة التصميم",
    summary: "ايداع التصميم او النموذج الصناعي لدى OMPIC.",
    details: "رسوم صنف واحد: 960 درهم للشخص المعنوي و760 درهم للشخص الذاتي. الصنف الاضافي: 360 درهم.",
    documents: ["الشخص المعنوي: استمارة D1، وكالة، نسخة التصميم، البطاقة الوطنية", "الشخص الذاتي: استمارة D1، التصميم، البطاقة الوطنية"],
  },
  visa: {
    title: "التاشير / المصادقة",
    summary: "خدمة التاشير والمصادقة على الوثائق لدى CCISTTA.",
    details: "الانخراط اجباري مع تعبئة استمارة الاكسترانيت.",
    documents: [
      "الشخص الذاتي: الضريبة المهنية، البطاقة الوطنية، صورة",
      "الشخص المعنوي: الضريبة المهنية، البطاقة الوطنية، صورة، السجل التجاري، القانون الاساسي، المحضر",
    ],
  },
};

const CATEGORY_LOCALIZATION = {
  "Creation d'entreprise": { ar: "انشاء المقاولة" },
  Adhesion: { ar: "الانخراط" },
  Services: { ar: "الخدمات" },
  Certifications: { ar: "الشهادات" },
  Export: { ar: "التصدير" },
  OMPIC: { ar: "اومبيك" },
  Legalisation: { ar: "المصادقة" },
};

function getLocalizedCategory(category, language) {
  if (language !== "ar") {
    return category;
  }
  return CATEGORY_LOCALIZATION[category]?.ar || category;
}

function getProcedureLocalizedFields(procedure, language) {
  if (language !== "ar") {
    return {
      title: procedure.title,
      summary: procedure.summary,
      details: procedure.details,
      documents: procedure.documents,
      category: procedure.category,
    };
  }

  const localized = ARABIC_PROCEDURE_COPY[procedure.id] || {};
  return {
    title: localized.title || procedure.title,
    summary: localized.summary || procedure.summary,
    details: localized.details || procedure.details,
    documents: localized.documents || procedure.documents,
    category: getLocalizedCategory(procedure.category, language),
  };
}

function getLocalizedProcedure(procedure, language) {
  const localized = getProcedureLocalizedFields(procedure, language);
  return {
    ...procedure,
    title: localized.title,
    summary: localized.summary,
    details: localized.details,
    documents: localized.documents,
    category: localized.category,
  };
}

function formatProceduresForPrompt() {
  return PROCEDURES.map((procedure) => {
    const membership = procedure.membershipRequired ? "Oui" : "Non";
    return [
      `- ${procedure.title} (${procedure.code})`,
      `  Categorie : ${procedure.category}`,
      `  Delai : ${procedure.delay}`,
      `  Tarif : ${procedure.price}`,
      `  Adhesion obligatoire : ${membership}`,
      `  Resume : ${procedure.summary}`,
      `  Documents : ${procedure.documents.join(" ; ")}`,
      `  Details : ${procedure.details}`,
    ].join("\n");
  }).join("\n\n");
}

const SYSTEM_PROMPT = `
Tu es l'assistant virtuel officiel de la CCISTTA (Chambre de Commerce, d'Industrie et de Services de la Region Tanger-Tetouan-Al Hoceima).

 Ta mission :
- Repondre dans la langue choisie par l'utilisateur. Si une langue est fournie par l'interface, respecte-la prioritairement. Sinon, detecte la langue du message. Par defaut, repondre en francais.
- Donner des informations claires, courtes, professionnelles et actionnables.
- Quand l'utilisateur demande une procedure, structure la reponse en sections courtes : procedure, delai, tarif, documents, etapes.
- Si l'utilisateur demande une checklist, une liste simple, ou un guide pas a pas, repondre sous forme de checklist concise.
- Si la demande est floue, commence par identifier la procedure la plus probable et dis-le explicitement.
- Si des informations manquent dans la base, dis-le clairement et oriente vers https://ccistta.ma.
- Ne pas inventer d'informations.

Base de connaissances des procedures :
${formatProceduresForPrompt()}
`;

const INTENT_PATTERNS = {
  ask_documents: [
    "document",
    "documents",
    "piece",
    "pieces",
    "dossier",
    "fournir",
    "faut il",
    "required documents",
    "وثائق",
    "ملف",
    "المطلوبة",
  ],
  ask_price: [
    "tarif",
    "tarifs",
    "prix",
    "cout",
    "combien",
    "frais",
    "price",
    "cost",
    "رسوم",
    "ثمن",
    "تكلفة",
  ],
  ask_delay: [
    "delai",
    "combien de temps",
    "quand",
    "duree",
    "24h",
    "48h",
    "timing",
    "duration",
    "مدة",
    "اجل",
    "متى",
  ],
  ask_steps: [
    "comment",
    "etapes",
    "procedure",
    "processus",
    "demarche",
    "how",
    "steps",
    "guide",
    "خطوات",
    "طريقة",
    "مسطرة",
    "كيف",
  ],
  ask_checklist: [
    "checklist",
    "check list",
    "liste simple",
    "liste de verification",
    "pas a pas",
    "etape par etape",
    "لائحة",
    "تحقق",
    "check",
  ],
  ask_membership: [
    "adhesion",
    "adhesion obligatoire",
    "membre",
    "membership",
    "inscription",
    "الانخراط",
    "عضوية",
  ],
  ask_eligibility: [
    "qui peut",
    "pour qui",
    "personne morale",
    "personne physique",
    "autoentrepreneur",
    "eligibilite",
    "من يمكنه",
    "لمن",
    "مقاول ذاتي",
  ],
};

const ENTITY_PATTERNS = {
  document_type: ["cin", "rc", "statut", "pv", "facture", "logo", "dum", "iso", "photo", "carte bancaire", "بطاقة", "فاتورة", "شعار"],
  user_profile: ["personne physique", "personne morale", "autoentrepreneur", "pp", "pm", "الشخص الذاتي", "الشخص المعنوي", "مقاول ذاتي"],
  process_channel: ["ompic", "sipic", "extranet", "plateforme", "guichet", "منصة"],
  payment: ["dh", "dirham", "paiement", "regler", "tpe", "tresor", "درهم", "اداء"],
  timing: ["24h", "48h", "jours", "mois", "heures", "يوم", "شهر", "ساعة"],
};

function normalizeText(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function uniqueValues(values) {
  return [...new Set(values.filter(Boolean))];
}

function hasArabicCharacters(value) {
  return /[\u0600-\u06FF]/.test(String(value || ""));
}

function detectLanguage(userMessage) {
  const normalized = normalizeText(userMessage);
  if (hasArabicCharacters(userMessage) || normalized.includes("en arabe") || normalized.includes("arabic")) {
    return "ar";
  }
  return "fr";
}

function resolveLanguage(preferredLanguage, userMessage) {
  if (preferredLanguage === "fr" || preferredLanguage === "ar") {
    return preferredLanguage;
  }
  return detectLanguage(userMessage);
}

function detectResponseMode(userMessage) {
  const normalized = normalizeText(userMessage);
  const checklistHints = [
    "checklist",
    "check list",
    "liste simple",
    "liste de verification",
    "pas a pas",
    "etape par etape",
    "step by step",
    "simple steps",
  ];

  return checklistHints.some((hint) => normalized.includes(hint)) ? "checklist" : "standard";
}

function scorePatternMatches(message, patterns) {
  const haystack = normalizeText(message);
  let score = 0;
  const matches = [];

  for (const pattern of patterns) {
    const normalizedPattern = normalizeText(pattern);
    if (haystack.includes(normalizedPattern)) {
      score += normalizedPattern.includes(" ") ? 3 : 2;
      matches.push(pattern);
    }
  }

  return { score, matches: uniqueValues(matches) };
}

function scoreProcedureMatch(message, procedure) {
  const haystack = normalizeText(message);
  let score = 0;

  for (const keyword of procedure.keywords) {
    const normalizedKeyword = normalizeText(keyword);
    if (haystack.includes(normalizedKeyword)) {
      score += normalizedKeyword.split(" ").length > 1 ? 4 : 2;
    }
  }

  for (const token of normalizeText(procedure.title).split(/\s+/)) {
    if (token.length > 2 && haystack.includes(token)) {
      score += 1;
    }
  }

  if (haystack.includes(normalizeText(procedure.code))) {
    score += 5;
  }

  return score;
}

function rankProcedures(userMessage) {
  return PROCEDURES.map((procedure) => ({
    procedure,
    score: scoreProcedureMatch(userMessage, procedure),
  }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score);
}

function findRelevantProcedure(userMessage) {
  const ranked = rankProcedures(userMessage);
  return ranked[0]?.procedure || null;
}

function detectIntents(userMessage, mode) {
  const ranked = Object.entries(INTENT_PATTERNS)
    .map(([intent, patterns]) => {
      const result = scorePatternMatches(userMessage, patterns);
      return {
        intent,
        score: result.score + (intent === "ask_checklist" && mode === "checklist" ? 4 : 0),
        matches: result.matches,
      };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score);

  if (!ranked.length) {
    return [{ intent: mode === "checklist" ? "ask_checklist" : "ask_steps", score: 1, matches: [] }];
  }

  return ranked;
}

function extractEntities(userMessage) {
  return Object.entries(ENTITY_PATTERNS)
    .map(([type, patterns]) => {
      const result = scorePatternMatches(userMessage, patterns);
      return {
        type,
        values: result.matches,
      };
    })
    .filter((entity) => entity.values.length > 0);
}

function buildNlpExplanation(analysis) {
  const topIntent = analysis.intents[0]?.intent || "ask_steps";
  const procedureLabel = analysis.procedure ? `${analysis.procedure.title} (${analysis.procedure.code})` : "aucune procedure claire";
  const entitySummary = analysis.entities.length
    ? analysis.entities.map((entity) => `${entity.type}: ${entity.values.join(", ")}`).join(" | ")
    : "aucune entite notable";

  return [
    `Langue detectee: ${analysis.language}.`,
    `Mode de reponse: ${analysis.mode}.`,
    `Intention principale: ${topIntent}.`,
    `Procedure la plus probable: ${procedureLabel}.`,
    `Entites detectees: ${entitySummary}.`,
  ].join(" ");
}

function analyzeRequest(userMessage, preferredLanguage) {
  const language = resolveLanguage(preferredLanguage, userMessage);
  const mode = detectResponseMode(userMessage);
  const intents = detectIntents(userMessage, mode);
  const rankedProcedures = rankProcedures(userMessage);
  const procedure = rankedProcedures[0]?.procedure || null;
  const entities = extractEntities(userMessage);
  const confidence = rankedProcedures[0]
    ? Math.min(0.98, Number((rankedProcedures[0].score / 12).toFixed(2)))
    : 0.2;

  const analysis = {
    language,
    mode,
    intents,
    entities,
    procedure,
    confidence,
    procedureCandidates: rankedProcedures.slice(0, 3).map((entry) => ({
      id: entry.procedure.id,
      title: entry.procedure.title,
      code: entry.procedure.code,
      score: entry.score,
    })),
  };

  return {
    ...analysis,
    explanation: buildNlpExplanation(analysis),
  };
}

function buildStructuredProcedureReply(procedure) {
  const membershipLabel = procedure.membershipRequired ? "Oui" : "Non";
  const steps = [
    "Verifier que votre dossier est complet.",
    "Preparer les pieces demandees.",
    "Deposer la demande aupres de la CCISTTA ou via l'extranet si indique.",
    "Regler les frais correspondants.",
    "Suivre le delai annonce avant retrait ou validation.",
  ];

  return [
    `**${procedure.title}** (${procedure.code})`,
    "",
    `- Delai : ${procedure.delay}`,
    `- Tarif : ${procedure.price}`,
    `- Adhesion obligatoire : ${membershipLabel}`,
    `- Objet : ${procedure.summary}`,
    "",
    "**Documents a preparer**",
    ...procedure.documents.map((item) => `- ${item}`),
    "",
    "**Etapes conseillees**",
    ...steps.map((item) => `- ${item}`),
    "",
    `**Precision** : ${procedure.details}`,
    "",
    "Si vous voulez, je peux aussi vous donner cette procedure sous forme de checklist simple.",
  ].join("\n");
}

function buildChecklistReplyFr(procedure) {
  const membershipLabel = procedure.membershipRequired ? "Verifier votre adhesion CCISTTA." : "Aucune adhesion obligatoire indiquee.";
  return [
    `## Checklist : ${procedure.title}`,
    "",
    `**Code** : ${procedure.code}`,
    "",
    `**Delai** : ${procedure.delay}`,
    `**Tarif** : ${procedure.price}`,
    `**Objet** : ${procedure.summary}`,
    "",
    "### A faire",
    `- [ ] Confirmer que la demande concerne bien ${procedure.title.toLowerCase()}.`,
    `- [ ] ${membershipLabel}`,
    ...procedure.documents.map((item) => `- [ ] Preparer : ${item}.`),
    "- [ ] Deposer la demande avec un dossier complet.",
    "- [ ] Effectuer le paiement demande.",
    "- [ ] Suivre le traitement puis recuperer le document ou la validation.",
    "",
    "> Rappel : " + procedure.details,
  ].join("\n");
}

function buildChecklistReplyAr(procedure) {
  const localized = getProcedureLocalizedFields(procedure, "ar");
  const membershipLine = procedure.membershipRequired
    ? "- تاكد من توفر الانخراط في CCISTTA قبل ايداع الطلب."
    : "- لا تشير المعطيات الحالية الى ان الانخراط اجباري لهذه الخدمة.";

  return [
    `## لائحة التحقق: ${localized.title}`,
    "",
    `**الرمز** : ${procedure.code}`,
    "",
    `**المدة** : ${procedure.delay}`,
    `**الرسوم** : ${procedure.price}`,
    `**هدف الخدمة** : ${localized.summary}`,
    "",
    "### المطلوب",
    `- [ ] تاكد ان الطلب يتعلق بخدمة ${localized.title}.`,
    `- [ ] ${membershipLine.slice(2)}`,
    ...localized.documents.map((item) => `- [ ] جهز الوثائق التالية: ${item}.`),
    "- [ ] اودع الملف كاملا لدى CCISTTA او عبر المنصة عند الحاجة.",
    "- [ ] قم باداء الرسوم المطلوبة.",
    "- [ ] تابع الطلب الى حين الاستلام او التاشير النهائي.",
    "",
    `> ملاحظة: ${localized.details}`,
  ].join("\n");
}

function buildStructuredProcedureReplyAr(procedure) {
  const localized = getProcedureLocalizedFields(procedure, "ar");
  const membershipLabel = procedure.membershipRequired ? "نعم" : "لا";
  return [
    `**${localized.title}** (${procedure.code})`,
    "",
    `- المدة: ${procedure.delay}`,
    `- الرسوم: ${procedure.price}`,
    `- هل الانخراط اجباري: ${membershipLabel}`,
    `- الهدف من الخدمة: ${localized.summary}`,
    "",
    "**الوثائق المطلوبة**",
    ...localized.documents.map((item) => `- ${item}`),
    "",
    "**الخطوات المقترحة**",
    "- التحقق من اكتمال الملف.",
    "- تجهيز جميع الوثائق المطلوبة.",
    "- ايداع الطلب لدى CCISTTA او عبر المنصة عندما تكون مطلوبة.",
    "- اداء الرسوم المستحقة.",
    "- انتظار الاجل المعلن ثم استلام الوثيقة او النتيجة.",
    "",
    `**توضيح**: ${localized.details}`,
    "",
    "اذا رغبت، يمكنني ايضا تحويل هذه الخدمة الى لائحة تحقق مبسطة.",
  ].join("\n");
}

function buildProcedureReply(procedure, options = {}) {
  const language = options.language || "fr";
  const mode = options.mode || "standard";

  if (language === "ar") {
    return mode === "checklist" ? buildChecklistReplyAr(procedure) : buildStructuredProcedureReplyAr(procedure);
  }

  return mode === "checklist" ? buildChecklistReplyFr(procedure) : buildStructuredProcedureReply(procedure);
}

async function queryHuggingFace(messages) {
  const OpenAI = require("openai");
  const client = new OpenAI({
    apiKey: process.env.HF_TOKEN,
    baseURL: "https://router.huggingface.co/v1",
  });
  const formatted = [{ role: "system", content: SYSTEM_PROMPT }, ...messages];
  const response = await client.chat.completions.create({
    model: HF_MODEL,
    messages: formatted,
    max_tokens: 1024,
  });
  return response.choices[0].message.content;
}

function localFallback(userMessage, analysis) {
  const language = analysis.language;
  const mode = analysis.mode;
  const match = analysis.procedure;
  if (match) {
    return buildProcedureReply(match, { language, mode });
  }

  if (language === "ar") {
    return [
      "**مرحبا بكم في CCISTTA**",
      "",
      "يمكنني مساعدتك في شرح المساطر الادارية الخاصة بـ CCISTTA بشكل واضح، مختصر، او على شكل لائحة تحقق.",
      "",
      "**امثلة**",
      "- ما هي وثائق شهادة الاصل؟",
      "- اريد لائحة التحقق الخاصة بخدمة المصادقة.",
      "- اشرح لي مسطرة بطاقة الانخراط.",
      "",
      "للمعلومات الرسمية الاضافية يرجى زيارة https://ccistta.ma.",
    ].join("\n");
  }

  return [
    "**Bienvenue a la CCISTTA**",
    "",
    "Je peux vous informer sur les procedures administratives et vous guider etape par etape.",
    "",
    "**Exemples de demandes**",
    "- Comment obtenir un certificat negatif ?",
    "- Quels documents faut-il pour la carte d'adhesion ?",
    "- Je veux legaliser un document.",
    "- Je veux exporter et obtenir un certificat d'origine.",
    "",
    "Pour toute information non couverte ici, consultez https://ccistta.ma.",
  ].join("\n");
}

async function queryWithFallback(messages, preferredLanguage) {
  const providers = [];
  const lastUserMessage = messages[messages.length - 1]?.content || "";
  const analysis = analyzeRequest(lastUserMessage, preferredLanguage);
  const inferredProcedure = analysis.procedure;
  const language = analysis.language;
  const mode = analysis.mode;

  if (mode === "checklist" && inferredProcedure) {
    return {
      content: buildProcedureReply(inferredProcedure, { language, mode }),
      procedure: inferredProcedure,
      mode,
      language,
      nlp: analysis,
    };
  }

  const enrichedMessages = inferredProcedure
    ? [
        ...messages.slice(0, -1),
        {
          role: "user",
          content: `${lastUserMessage}\n\nContexte NLP : ${analysis.explanation} Utilise ce contexte seulement s'il est pertinent.`,
        },
      ]
    : messages;

  if (process.env.HF_TOKEN && !process.env.HF_TOKEN.startsWith("your_")) {
    providers.push({ name: "HuggingFace", fn: () => queryHuggingFace(enrichedMessages) });
  }

  for (const provider of providers) {
    try {
      console.log(`[IA] Tentative avec ${provider.name}...`);
      const content = await provider.fn(enrichedMessages);
      console.log(`[IA] Succes avec ${provider.name}`);
      return { content, procedure: inferredProcedure, mode, language, nlp: analysis };
    } catch (error) {
      console.warn(`[IA] ${provider.name} a echoue : ${error.message}`);
    }
  }

  console.log("[IA] Fallback vers la base locale");
  return {
    content: localFallback(lastUserMessage, analysis),
    procedure: inferredProcedure,
    mode,
    language,
    nlp: analysis,
  };
}

app.get("/api/procedures", (req, res) => {
  const language = req.query.language === "ar" ? "ar" : "fr";
  res.json({
    procedures: PROCEDURES.map((procedure) => getLocalizedProcedure(procedure, language)),
    categories: [...new Set(PROCEDURES.map((procedure) => getLocalizedCategory(procedure.category, language)))],
  });
});

app.post("/api/nlp/analyze", (req, res) => {
  try {
    const { text, language } = req.body;
    if (!text || typeof text !== "string") {
      return res.status(400).json({ error: "Texte invalide" });
    }

    const analysis = analyzeRequest(text, language);
    res.json(analysis);
  } catch (error) {
    console.error("Erreur /api/nlp/analyze:", error);
    res.status(500).json({ error: "Erreur interne" });
  }
});

app.post("/api/chat", async (req, res) => {
  try {
    const { messages, language } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Format invalide" });
    }
    const answer = await queryWithFallback(messages, language);
    res.json(answer);
  } catch (error) {
    console.error("Erreur /api/chat:", error);
    res.status(500).json({ error: "Erreur interne" });
  }
});

app.get("/api/status", (req, res) => {
  res.json({
    huggingface: !!(process.env.HF_TOKEN && !process.env.HF_TOKEN.startsWith("your_")),
    fallback: true,
    procedures: PROCEDURES.length,
  });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`CCISTTA chatbot actif sur http://localhost:${PORT}`);
  console.log("IA active : Hugging Face si le token existe, sinon fallback local structure.");
});
