const API_URL = "/api/chat";
const PROCEDURES_URL = "/api/procedures";

let conversationHistory = [];
let isLoading = false;
let procedures = [];
let activeCategory = "Tous";
let searchTerm = "";
let selectedLanguage = "fr";
const UI_TEXT = {
  fr: {
    header_eyebrow: "Plateforme d'information administrative",
    nav_assistant: "Assistant",
    nav_procedures: "Procedures",
    nav_contact: "Contact",
    language_label: "Langue",
    option_french: "Francais",
    option_arabic: "Arabe",
    theme_light: "Mode nuit",
    theme_dark: "Mode jour",
    hero_eyebrow: "Procedures, delais, tarifs, documents",
    hero_title: "Un assistant guide pour orienter les usagers vers la bonne demarche.",
    hero_description:
      "L'interface combine une base de procedures structuree avec une couche IA pour repondre en langage naturel. L'utilisateur peut chercher librement ou partir d'une fiche procedure, puis demander une reponse en francais, en arabe, ou en checklist simple.",
    quick_checklist: "Obtenir une checklist",
    checklist_select_label: "Choisir une procedure",
    checklist_select_placeholder: "Selectionner une procedure",
    metric_procedures: "Procedures disponibles",
    metric_guidance: "Guidage",
    metric_guidance_value: "Checklist, documents et etapes",
    metric_usage: "Usage conseille",
    metric_usage_value: "Question libre ou selection par fiche",
    catalog_eyebrow: "Catalogue",
    catalog_title: "Explorer les procedures",
    search_label: "Recherche rapide",
    search_placeholder: "Certificat, adhesion, export...",
    clear_conversation: "Reinitialiser la conversation",
    official_site: "Consulter le site officiel",
    chat_eyebrow: "Assistant conversationnel",
    chat_title: "Poser une question sur une procedure",
    chip_documents: "Documents",
    chip_tarifs: "Tarifs",
    chip_etapes: "Etapes",
    chip_checklist: "Checklist",
    chip_procedure: "Procedure",
    welcome_intro: "<strong>Bienvenue.</strong> Je peux vous informer sur les procedures de la CCISTTA.",
    welcome_subtitle: "Choisissez la langue de reponse puis demandez une procedure en langage naturel, par exemple :",
    welcome_example_1: "Je veux creer une entreprise, quelle demarche pour le nom commercial ?",
    welcome_example_2: "Quels documents faut-il pour un certificat d'origine ?",
    welcome_example_3: "Resume-moi la procedure de legalisation.",
    assistant_name: "Assistant CCISTTA",
    typing_label: "Analyse de la demande...",
    input_placeholder: "Exemple : Je veux une checklist pour la legalisation",
    send_button: "Envoyer",
    procedures_eyebrow: "Base de procedures",
    procedures_title: "Fiches rapides",
    procedures_description: "Chaque fiche resume le delai, le tarif, les documents et le besoin d'adhesion.",
    contact_eyebrow: "Contact",
    contact_title: "Coordonnees utiles",
    contact_description: "Pour une confirmation officielle ou une demarche specifique, contactez directement la CCISTTA.",
    contact_address: "Adresse",
    contact_website: "Site officiel",
    contact_payments: "Paiements",
    contact_payments_value: "TPE, Tresor, Regisseur",
    empty_state: "Aucune procedure ne correspond a cette recherche.",
    status_unavailable: "Serveur indisponible",
    action_ask_chatbot: "Demander au chatbot",
    label_delay: "Delai",
    label_price: "Tarif",
    label_membership: "Adhesion",
    membership_required: "Obligatoire",
    membership_not_required: "Non obligatoire",
  },
  ar: {
    header_eyebrow: "منصة معلومات ادارية",
    nav_assistant: "المساعد",
    nav_procedures: "المساطر",
    nav_contact: "اتصال",
    language_label: "اللغة",
    option_french: "الفرنسية",
    option_arabic: "العربية",
    theme_light: "الوضع الليلي",
    theme_dark: "الوضع النهاري",
    hero_eyebrow: "المساطر، الاجال، الرسوم، الوثائق",
    hero_title: "مساعد ارشادي لتوجيه المستعمل نحو المسطرة المناسبة.",
    hero_description:
      "تعتمد الواجهة على قاعدة مساطر منظمة مع طبقة ذكاء اصطناعي للفهم باللغة الطبيعية. يمكن للمستخدم البحث مباشرة او الانطلاق من بطاقة مسطرة، ثم طلب الجواب بالفرنسية او العربية او في شكل لائحة تحقق.",
    quick_checklist: "الحصول على لائحة تحقق",
    checklist_select_label: "اختر مسطرة",
    checklist_select_placeholder: "حدد مسطرة",
    metric_procedures: "عدد المساطر",
    metric_guidance: "المساعدة",
    metric_guidance_value: "لوائح تحقق، وثائق، وخطوات",
    metric_usage: "طريقة الاستعمال",
    metric_usage_value: "سؤال حر او اختيار مسطرة",
    catalog_eyebrow: "الفهرس",
    catalog_title: "استكشاف المساطر",
    search_label: "بحث سريع",
    search_placeholder: "شهادة، انخراط، تصدير...",
    clear_conversation: "اعادة تهيئة المحادثة",
    official_site: "زيارة الموقع الرسمي",
    chat_eyebrow: "المساعد التفاعلي",
    chat_title: "اطرح سؤالا حول احدى المساطر",
    chip_documents: "الوثائق",
    chip_tarifs: "الرسوم",
    chip_etapes: "الخطوات",
    chip_checklist: "لائحة تحقق",
    chip_procedure: "المسطرة",
    welcome_intro: "<strong>مرحبا.</strong> يمكنني مساعدتك في شرح مساطر CCISTTA.",
    welcome_subtitle: "اختر لغة الواجهة ثم اطرح سؤالك بصياغة طبيعية، مثلا:",
    welcome_example_1: "اريد انشاء شركة، ما هي مسطرة الاسم التجاري؟",
    welcome_example_2: "ما هي الوثائق المطلوبة للحصول على شهادة الاصل؟",
    welcome_example_3: "لخص لي مسطرة المصادقة.",
    assistant_name: "مساعد CCISTTA",
    typing_label: "جار تحليل الطلب...",
    input_placeholder: "مثال: اريد لائحة تحقق خاصة بالمصادقة",
    send_button: "ارسال",
    procedures_eyebrow: "قاعدة المساطر",
    procedures_title: "بطاقات سريعة",
    procedures_description: "كل بطاقة تلخص الاجل والرسوم والوثائق وشرط الانخراط.",
    contact_eyebrow: "اتصال",
    contact_title: "معلومات مفيدة",
    contact_description: "لتاكيد رسمي او لمسطرة خاصة، يرجى التواصل مباشرة مع CCISTTA.",
    contact_address: "العنوان",
    contact_website: "الموقع الرسمي",
    contact_payments: "وسائل الاداء",
    contact_payments_value: "TPE، الخزينة، القابض",
    empty_state: "لا توجد مسطرة مطابقة لهذا البحث.",
    status_unavailable: "الخادم غير متاح",
    action_ask_chatbot: "اسال المساعد",
    label_delay: "الاجل",
    label_price: "الرسوم",
    label_membership: "الانخراط",
    membership_required: "اجباري",
    membership_not_required: "غير اجباري",
  },
};

const messagesArea = document.getElementById("messagesArea");
const chatInput = document.getElementById("chatInput");
const sendBtn = document.getElementById("sendMsgBtn");
const typingIndicator = document.getElementById("typingIndicator");
const clearBtn = document.getElementById("clearChatBtn");
const themeToggle = document.getElementById("themeToggle");
const procedureList = document.getElementById("procedureList");
const procedureCards = document.getElementById("procedureCards");
const categoryFilters = document.getElementById("categoryFilters");
const procedureSearch = document.getElementById("procedureSearch");
const procedureCount = document.getElementById("procedureCount");
const languageSelect = document.getElementById("languageSelect");
const checklistProcedureSelect = document.getElementById("checklistProcedureSelect");
const checklistBtn = document.getElementById("checklistBtn");

function getUIText(key) {
  return UI_TEXT[selectedLanguage][key] || UI_TEXT.fr[key] || key;
}

function initTheme() {
  const savedTheme = localStorage.getItem("theme") || "light";
  document.documentElement.setAttribute("data-theme", savedTheme);
  themeToggle.textContent = savedTheme === "dark" ? getUIText("theme_dark") : getUIText("theme_light");
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const nextTheme = currentTheme === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", nextTheme);
  localStorage.setItem("theme", nextTheme);
  themeToggle.textContent = nextTheme === "dark" ? getUIText("theme_dark") : getUIText("theme_light");
}

function normalizeText(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function autoResizeTextarea() {
  chatInput.style.height = "auto";
  chatInput.style.height = `${Math.min(chatInput.scrollHeight, 150)}px`;
}

function setInputValue(value) {
  chatInput.value = value;
  sendBtn.disabled = !value.trim();
  autoResizeTextarea();
  chatInput.focus();
}

function applyLanguageUI() {
  document.documentElement.lang = selectedLanguage === "ar" ? "ar" : "fr";
  document.documentElement.dir = selectedLanguage === "ar" ? "rtl" : "ltr";
  chatInput.dir = selectedLanguage === "ar" ? "rtl" : "ltr";
  procedureSearch.dir = selectedLanguage === "ar" ? "rtl" : "ltr";
  chatInput.placeholder = getUIText("input_placeholder");
  procedureSearch.placeholder = getUIText("search_placeholder");
  themeToggle.textContent =
    document.documentElement.getAttribute("data-theme") === "dark" ? getUIText("theme_dark") : getUIText("theme_light");
  languageSelect.querySelector('option[value="fr"]').textContent = getUIText("option_french");
  languageSelect.querySelector('option[value="ar"]').textContent = getUIText("option_arabic");

  document.querySelectorAll("[data-i18n]").forEach((node) => {
    node.textContent = getUIText(node.dataset.i18n);
  });

  document.querySelectorAll("[data-i18n-html]").forEach((node) => {
    node.innerHTML = getUIText(node.dataset.i18nHtml);
  });

  renderCategoryFilters();
  renderChecklistChooser();
  renderProcedureRail();
  renderProcedureCards();
}

function scrollToBottom() {
  requestAnimationFrame(() => {
    messagesArea.scrollTop = messagesArea.scrollHeight;
  });
}

function showTyping(show) {
  typingIndicator.classList.toggle("is-visible", Boolean(show));
  if (show) {
    scrollToBottom();
  }
}

function addMessage(role, content) {
  const wrapper = document.createElement("article");
  wrapper.className = `message ${role === "user" ? "user-message" : "assistant-message"}`;

  const avatar = document.createElement("div");
  avatar.className = "avatar";
  if (role === "assistant") {
    const image = document.createElement("img");
    image.src = "logo.png";
    image.alt = "Logo CCISTTA";
    image.className = "avatar-img";
    avatar.appendChild(image);
  }

  const bubble = document.createElement("div");
  bubble.className = "bubble";

  const contentNode = document.createElement("div");
  contentNode.className = "bubble-content";
  if (role === "assistant" && typeof marked !== "undefined") {
    contentNode.innerHTML = marked.parse(content);
  } else {
    contentNode.textContent = content;
  }

  const meta = document.createElement("div");
  meta.className = "message-meta";
  meta.textContent = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  bubble.appendChild(contentNode);
  bubble.appendChild(meta);
  wrapper.appendChild(avatar);
  wrapper.appendChild(bubble);
  messagesArea.appendChild(wrapper);
  scrollToBottom();
}

function getFilteredProcedures() {
  return procedures.filter((procedure) => {
    const allLabel = selectedLanguage === "ar" ? "الكل" : "Tous";
    const matchesCategory = activeCategory === allLabel || procedure.category === activeCategory;
    const haystack = normalizeText(
      `${procedure.title} ${procedure.summary} ${procedure.category} ${procedure.documents.join(" ")} ${procedure.details}`
    );
    const matchesSearch = !searchTerm || haystack.includes(normalizeText(searchTerm));
    return matchesCategory && matchesSearch;
  });
}

function buildProcedureQuery(procedure) {
  if (selectedLanguage === "ar") {
    return `اشرح لي بوضوح مسطرة ${procedure.title} مع الاجل والرسوم والوثائق والخطوات.`;
  }
  return `Explique-moi clairement la procedure "${procedure.title}" avec le delai, le tarif, les documents et les etapes.`;
}

function buildChecklistQuery(procedure) {
  if (selectedLanguage === "ar") {
    return `اريد لائحة تحقق كاملة للحصول على ${procedure.title}.`;
  }
  return `Je veux une checklist complete pour obtenir ${procedure.title}.`;
}

function switchSection(sectionName) {
  document.querySelectorAll(".content-section").forEach((section) => section.classList.remove("active"));
  document.querySelectorAll(".nav-link").forEach((link) => link.classList.remove("active"));
  document.getElementById(`${sectionName}Section`).classList.add("active");
  document.querySelector(`.nav-link[data-section="${sectionName}"]`).classList.add("active");
}

function renderCategoryFilters() {
  const allLabel = selectedLanguage === "ar" ? "الكل" : "Tous";
  const categories = [allLabel, ...new Set(procedures.map((procedure) => procedure.category))];
  categoryFilters.innerHTML = "";

  categories.forEach((category) => {
    const button = document.createElement("button");
    button.className = `chip ${category === activeCategory ? "active" : ""}`;
    button.textContent = category;
    button.addEventListener("click", () => {
      activeCategory = category;
      renderCategoryFilters();
      renderProcedureRail();
    });
    categoryFilters.appendChild(button);
  });
}

function renderProcedureRail() {
  const filtered = getFilteredProcedures();
  procedureList.innerHTML = "";

  if (!filtered.length) {
    const emptyState = document.createElement("p");
    emptyState.className = "empty-state";
    emptyState.textContent = getUIText("empty_state");
    procedureList.appendChild(emptyState);
    return;
  }

  filtered.forEach((procedure) => {
    const item = document.createElement("button");
    item.className = "procedure-item";
    item.type = "button";
    item.innerHTML = `
      <strong>${procedure.title}</strong>
      <p>${procedure.summary}</p>
      <div class="procedure-meta">
        <span class="mini-pill">${procedure.delay}</span>
        <span class="mini-pill">${procedure.category}</span>
      </div>
    `;
    item.addEventListener("click", () => {
      procedureList.querySelectorAll(".procedure-item").forEach((node) => node.classList.remove("active"));
      item.classList.add("active");
      switchSection("assistant");
      setInputValue(buildProcedureQuery(procedure));
      sendMessage(buildProcedureQuery(procedure));
    });
    procedureList.appendChild(item);
  });
}

function renderProcedureCards() {
  procedureCards.innerHTML = "";

  procedures.forEach((procedure) => {
    const card = document.createElement("article");
    card.className = "procedure-card";
    card.innerHTML = `
      <p class="eyebrow">${procedure.code}</p>
      <h3>${procedure.title}</h3>
      <p>${procedure.summary}</p>
      <ul>
        <li><strong>${getUIText("label_delay")} :</strong> ${procedure.delay}</li>
        <li><strong>${getUIText("label_price")} :</strong> ${procedure.price}</li>
        <li><strong>${getUIText("label_membership")} :</strong> ${procedure.membershipRequired ? getUIText("membership_required") : getUIText("membership_not_required")}</li>
      </ul>
      <div class="card-footer">
        <span class="mini-pill">${procedure.category}</span>
        <button class="text-btn" type="button">${getUIText("action_ask_chatbot")}</button>
      </div>
    `;

    card.querySelector(".text-btn").addEventListener("click", () => {
      switchSection("assistant");
      sendMessage(buildProcedureQuery(procedure));
    });

    procedureCards.appendChild(card);
  });
}

function renderChecklistChooser() {
  if (!checklistProcedureSelect) {
    return;
  }

  const previousValue = checklistProcedureSelect.value;
  checklistProcedureSelect.innerHTML = "";

  const placeholder = document.createElement("option");
  placeholder.value = "";
  placeholder.textContent = getUIText("checklist_select_placeholder");
  checklistProcedureSelect.appendChild(placeholder);

  procedures.forEach((procedure) => {
    const option = document.createElement("option");
    option.value = procedure.id;
    option.textContent = procedure.title;
    checklistProcedureSelect.appendChild(option);
  });

  if (previousValue && procedures.some((procedure) => procedure.id === previousValue)) {
    checklistProcedureSelect.value = previousValue;
  } else {
    checklistProcedureSelect.value = "";
  }

  checklistBtn.disabled = !checklistProcedureSelect.value;
}

async function loadProcedures() {
  try {
    const response = await fetch(`${PROCEDURES_URL}?language=${selectedLanguage}`);
    const data = await response.json();
    procedures = data.procedures || [];
    procedureCount.textContent = String(procedures.length);
    renderCategoryFilters();
    renderChecklistChooser();
    renderProcedureRail();
    renderProcedureCards();
  } catch {
    procedureCount.textContent = "0";
    if (checklistBtn) {
      checklistBtn.disabled = true;
    }
  }
}

async function sendMessage(text) {
  if (!text.trim() || isLoading) {
    return;
  }

  const outgoingText = text.trim();
  isLoading = true;
  sendBtn.disabled = true;
  showTyping(false);
  addMessage("user", outgoingText);
  conversationHistory.push({ role: "user", content: outgoingText });
  setInputValue("");
  showTyping(true);

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: conversationHistory, language: selectedLanguage }),
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();
    addMessage("assistant", data.content);
    conversationHistory.push({ role: "assistant", content: data.content });
  } catch (error) {
    addMessage("assistant", getUIText("status_unavailable"));
  } finally {
    isLoading = false;
    showTyping(false);
    sendBtn.disabled = !chatInput.value.trim();
  }
}

function clearConversation() {
  conversationHistory = [];
  isLoading = false;
  showTyping(false);
  messagesArea.querySelectorAll(".message").forEach((message, index) => {
    if (index > 0) {
      message.remove();
    }
  });
  procedureList.querySelectorAll(".procedure-item").forEach((item) => item.classList.remove("active"));
  setInputValue("");
}

function bindEvents() {
  themeToggle.addEventListener("click", toggleTheme);

  sendBtn.addEventListener("click", () => {
    sendMessage(chatInput.value);
  });

  chatInput.addEventListener("input", () => {
    sendBtn.disabled = !chatInput.value.trim();
    autoResizeTextarea();
  });

  chatInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage(chatInput.value);
    }
  });

  clearBtn.addEventListener("click", clearConversation);

  checklistProcedureSelect.addEventListener("change", () => {
    checklistBtn.disabled = !checklistProcedureSelect.value;
  });

  checklistBtn.addEventListener("click", () => {
    const selectedProcedure = procedures.find((procedure) => procedure.id === checklistProcedureSelect.value);
    if (!selectedProcedure) {
      return;
    }
    switchSection("assistant");
    sendMessage(buildChecklistQuery(selectedProcedure));
  });

  procedureSearch.addEventListener("input", (event) => {
    searchTerm = event.target.value.trim();
    renderProcedureRail();
  });

  languageSelect.addEventListener("change", (event) => {
    selectedLanguage = event.target.value;
    activeCategory = selectedLanguage === "ar" ? "الكل" : "Tous";
    applyLanguageUI();
    loadProcedures();
  });

  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      switchSection(link.dataset.section);
    });
  });

  document.querySelectorAll(".quick-action").forEach((button) => {
    button.addEventListener("click", () => {
      switchSection("assistant");
      sendMessage(button.dataset.query);
    });
  });
}

async function init() {
  selectedLanguage = languageSelect.value;
  activeCategory = selectedLanguage === "ar" ? "الكل" : "Tous";
  initTheme();
  bindEvents();
  applyLanguageUI();
  autoResizeTextarea();
  await loadProcedures();
}

document.addEventListener("DOMContentLoaded", init);
