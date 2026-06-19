const stateKey = "ecoworld-mobile-state-v4";
const legacyStateKey = "ecoworld-mobile-state-v3";
const adminTasksKey = "ecoworld-admin-tasks-v3";
const legacyAdminTasksKeys = ["ecoworld-admin-tasks-v2", "ecoworld-admin-tasks-v1"];
const contentKey = "ecoworld-admin-content-v1";

const taskTypologies = [
  "Сокращение отходов",
  "Переработка и повторное использование",
  "Сбережение ресурсов",
  "Забота о природе и городской среде"
];

const taxonomyIcons = {
  "Сокращение отходов": "./assets/typologies/waste-reduction.png",
  "Переработка и повторное использование": "./assets/typologies/recycling.png",
  "Сбережение ресурсов": "./assets/typologies/resource-saving.png",
  "Забота о природе и городской среде": "./assets/typologies/nature-care.png"
};

const learningIcons = {
  "learn-sort": "./assets/learning-icons/home-sorting.png",
  "learn-battery": "./assets/learning-icons/battery-safety.png",
  "learn-packaging": "./assets/learning-icons/smart-packaging.png",
  "learn-city": "./assets/learning-icons/urban-ecology.png"
};

const interestDirections = [
  "Дом и быт",
  "Покупки и еда",
  "Переработка",
  "Одежда и вещи",
  "Городская среда",
  "Животные"
];

const defaultTasks = [
  {
    id: "coffee-cup",
    title: "Кофе со своей кружкой",
    type: "partner",
    taxonomy: "Сокращение отходов",
    direction: "Покупки и еда",
    partner: "Green Cup",
    address: "Москва, ул. Мясницкая, 14",
    coords: [55.7617, 37.6364],
    image: "./assets/tasks/coffee-cup.png",
    category: "Покупки",
    points: 35,
    reward: "Скидка 10% на напиток",
    description: "Купи напиток у партнера без одноразового стаканчика. Возьми свою кружку или попроси налить напиток в многоразовую тару.",
    impact: { co2: 0.12, waste: 0.03, water: 1.5 }
  },
  {
    id: "battery",
    title: "Сдать батарейки партнеру",
    type: "partner",
    taxonomy: "Переработка и повторное использование",
    direction: "Переработка",
    partner: "ЭкоСвод",
    address: "Москва, проспект Мира, 22",
    coords: [55.7781, 37.6337],
    image: "./assets/tasks/battery-recycling.png",
    category: "Переработка",
    points: 80,
    reward: "Скидка 7% на товары для дома",
    description: "Принеси использованные батарейки в пункт партнера. Передай их сотруднику и предъяви QR-код на кассе.",
    impact: { co2: 0.9, waste: 0.5, water: 8 }
  },
  {
    id: "eco-delivery",
    title: "Заказ без лишней упаковки",
    type: "partner",
    taxonomy: "Сокращение отходов",
    direction: "Покупки и еда",
    partner: "Fresh Market",
    address: "Москва, Садовая-Кудринская, 9",
    coords: [55.7622, 37.5909],
    image: "./assets/tasks/eco-delivery.png",
    category: "Покупки",
    points: 50,
    reward: "150 бонусов магазина",
    description: "Выбери у партнера опцию без пластикового пакета и лишней упаковки. Покажи QR-код при получении заказа.",
    impact: { co2: 0.35, waste: 0.18, water: 3 }
  },
  {
    id: "home-sort",
    title: "Рассортируй мусор дома",
    type: "simple",
    taxonomy: "Переработка и повторное использование",
    direction: "Дом и быт",
    partner: null,
    address: "Не привязано к карте",
    coords: null,
    image: "./assets/tasks/home-sort.png",
    category: "Дом",
    points: 45,
    reward: "45 баллов рейтинга",
    description: "Раздели дома отходы минимум на две категории: перерабатываемое и смешанное. Сфотографируй результат или опиши, что отсортировано.",
    impact: { co2: 0.22, waste: 0.7, water: 2 }
  },
  {
    id: "clothes",
    title: "Сдай вещи на переработку",
    type: "simple",
    taxonomy: "Переработка и повторное использование",
    direction: "Одежда и вещи",
    partner: null,
    address: "Любой пункт приема",
    coords: null,
    image: "./assets/tasks/clothes-recycling.png",
    category: "Переработка",
    points: 90,
    reward: "90 баллов рейтинга",
    description: "Отнеси ненужную одежду в контейнер для переработки или благотворительный пункт. Прикрепи фото пакета или пункта приема.",
    impact: { co2: 2.4, waste: 1.2, water: 14 }
  },
  {
    id: "bottle-day",
    title: "День без пластиковых бутылок",
    type: "simple",
    taxonomy: "Сокращение отходов",
    direction: "Дом и быт",
    partner: null,
    address: "Где угодно",
    coords: null,
    image: "./assets/tasks/bottle-day.png",
    category: "Личный вклад",
    points: 30,
    reward: "30 баллов рейтинга",
    description: "Используй многоразовую бутылку в течение дня. Для подтверждения прикрепи фото бутылки или напиши короткий отчет.",
    impact: { co2: 0.28, waste: 0.05, water: 2 }
  }
];

const sharedCatalog = window.EcoWorldCatalog || { tasks: [], learning: [], learningEnrichment: {} };
defaultTasks.push(...sharedCatalog.tasks);

const defaultLearning = [
  {
    id: "learn-sort",
    title: "Как сортировать отходы дома",
    type: "Гайд",
    format: "Карточка",
    time: "4 минуты",
    theme: "Дом и быт",
    image: "./assets/tasks/home-sort.png",
    summary: "Базовая схема разделения отходов без сложных правил.",
    text: "Начни с двух потоков: перерабатываемое и смешанное. В перерабатываемое можно отделять чистую бумагу, пластик, металл и стекло. Упаковку лучше промывать и сжимать, чтобы она занимала меньше места."
  },
  {
    id: "learn-battery",
    title: "Почему батарейки нельзя выбрасывать",
    type: "Объяснение",
    format: "Статья",
    time: "3 минуты",
    theme: "Переработка",
    image: "./assets/tasks/battery-recycling.png",
    summary: "Коротко о безопасной сдаче батареек и пользе переработки.",
    text: "Батарейки содержат вещества, которые не должны попадать в обычные отходы. Сдача в специальные боксы снижает риск загрязнения почвы и помогает вернуть часть материалов в оборот."
  },
  {
    id: "learn-packaging",
    title: "Как покупать без лишней упаковки",
    type: "Практика",
    format: "Чек-лист",
    time: "5 минут",
    theme: "Покупки и еда",
    image: "./assets/tasks/eco-delivery.png",
    summary: "Простые решения для магазинов, кафе и доставок.",
    text: "Выбирай опцию без пакета, бери свою сумку и многоразовую бутылку, отказывайся от лишних приборов в доставке. Это обычные действия, которые быстро уменьшают объем одноразовых отходов."
  },
  {
    id: "learn-city",
    title: "Городская среда: где начинается вклад",
    type: "Материал",
    format: "Статья",
    time: "4 минуты",
    theme: "Городская среда",
    image: "./assets/tasks/clothes-recycling.png",
    summary: "Что можно делать рядом с домом без специальных знаний.",
    text: "Локальный вклад начинается с простых действий: поддерживать чистоту во дворе, пользоваться пунктами приема, участвовать в городских экособытиях и выбирать сервисы, которые уменьшают отходы."
  }
];

defaultLearning.forEach((item) => Object.assign(item, sharedCatalog.learningEnrichment[item.id] || {}));
defaultLearning.push(...sharedCatalog.learning);

const leadersBase = [
  { name: "Алина", title: "Эко-лидер", points: 520 },
  { name: "Марк", title: "Хранитель природы", points: 430 },
  { name: "София", title: "Защитник ресурсов", points: 360 },
  { name: "Даниил", title: "Исследователь экосреды", points: 260 }
];

let tasks = loadTasks();
let learningItems = loadLearningItems();
let appState = loadState();
let activeTaskFilter = "all";
let selectedTaskId = tasks[0]?.id || "";
let selectedLearningId = learningItems[0]?.id || "";
let previousMainScreen = "tasks";
let yandexMap = null;
let yandexPlacemarkByTask = {};

const authScreen = document.getElementById("authScreen");
const authForm = document.getElementById("authForm");
const screens = document.querySelectorAll(".screen");
const bottomLinks = document.querySelectorAll(".bottom-link");
const headerBalance = document.getElementById("headerBalance");
const taskFeed = document.getElementById("taskFeed");
const partnerMapList = document.getElementById("partnerMapList");
const taskDetailPage = document.getElementById("taskDetailPage");
const confirmPage = document.getElementById("confirmPage");
const learningFeed = document.getElementById("learningFeed");
const learningDetailPage = document.getElementById("learningDetailPage");
const leaderboard = document.getElementById("leaderboard");
const profileHero = document.getElementById("profileHero");
const impactGrid = document.getElementById("impactGrid");
const historyList = document.getElementById("historyList");
const mapFallback = document.getElementById("mapFallback");

function loadTasks() {
  try {
    const saved = JSON.parse(localStorage.getItem(adminTasksKey));
    if (Array.isArray(saved)) return saved.map(normalizeTask);

    for (const legacyKey of legacyAdminTasksKeys) {
      const legacySaved = JSON.parse(localStorage.getItem(legacyKey));
      if (Array.isArray(legacySaved)) {
        const merged = new Map(defaultTasks.map((task) => [task.id, task]));
        legacySaved.forEach((task) => merged.set(task.id, task));
        const migrated = [...merged.values()].map(normalizeTask);
        localStorage.setItem(adminTasksKey, JSON.stringify(migrated));
        return migrated;
      }
    }
  } catch {
    return defaultTasks;
  }
  return defaultTasks;
}

function normalizeTaxonomy(value) {
  if (taskTypologies.includes(value)) return value;
  if (["Борьба с одноразовой упаковкой", "Борьба с пластиком", "Осознанные покупки"].includes(value)) return "Сокращение отходов";
  if (["Безопасная переработка", "Сортировка отходов", "Повторное использование вещей"].includes(value)) return "Переработка и повторное использование";
  return taskTypologies[0];
}

function normalizeTask(task) {
  const taxonomy = normalizeTaxonomy(task.taxonomy);
  return {
    id: task.id || `task-${Date.now()}`,
    title: task.title || "Новое задание",
    type: task.type === "partner" ? "partner" : "simple",
    taxonomy,
    direction: task.direction || task.category || interestDirections[0],
    partner: task.type === "partner" ? task.partner || "Партнер EcoWorld" : null,
    address: task.address || "Не указано",
    coords: Array.isArray(task.coords) && task.coords.length === 2 ? task.coords.map(Number) : null,
    image: task.image || "./assets/tasks/home-sort.png",
    category: task.category || "Экология",
    points: Number(task.points) || 0,
    reward: task.reward || "Баллы рейтинга",
    description: task.description || "Описание задания появится здесь.",
    impact: {
      co2: Number(task.impact?.co2) || 0,
      waste: Number(task.impact?.waste) || 0,
      water: Number(task.impact?.water) || 0
    }
  };
}

function loadLearningItems() {
  let adminItems = [];
  try {
    const saved = JSON.parse(localStorage.getItem(contentKey));
    if (Array.isArray(saved)) {
      adminItems = saved
        .filter((item) => item.type === "Обучающий материал")
        .map((item) => ({
          id: item.id,
          title: item.title,
          type: item.type,
          format: item.status || "Материал",
          time: "3 минуты",
          theme: "EcoWorld",
          image: "./assets/tasks/eco-delivery.png",
          summary: item.text.slice(0, 110),
          text: item.text
        }));
    }
  } catch {
    adminItems = [];
  }
  return [...adminItems, ...defaultLearning];
}

function getLearningIcon(item) {
  if (item.thumbnail) return item.thumbnail;
  if (learningIcons[item.id]) return learningIcons[item.id];
  const searchText = `${item.theme || ""} ${item.title || ""}`.toLowerCase();
  if (searchText.includes("батар") || searchText.includes("энерг")) return learningIcons["learn-battery"];
  if (searchText.includes("сорт") || searchText.includes("переработ") || searchText.includes("электрон") || searchText.includes("одеж")) return learningIcons["learn-sort"];
  if (searchText.includes("покуп") || searchText.includes("упаков") || searchText.includes("пищ") || searchText.includes("многораз") || searchText.includes("осознан") || searchText.includes("привыч")) return learningIcons["learn-packaging"];
  return learningIcons["learn-city"];
}

function renderLearningContent(item) {
  const explanation = item.explanation || item.text || "Материал готовится.";
  const checklist = Array.isArray(item.checklist) ? item.checklist : [];
  const sections = Array.isArray(item.sections) ? item.sections : [];
  const gallery = Array.isArray(item.gallery) ? item.gallery : [];
  const videos = Array.isArray(item.videos) ? item.videos : [];
  return `
    <section class="learning-section">
      <span class="learning-section-icon">i</span>
      <div>
        <h2>Объяснение</h2>
        <p>${explanation}</p>
      </div>
    </section>
    ${sections.map((section) => `
      <section class="article-subsection">
        <h2>${section.title}</h2>
        ${(section.paragraphs || []).map((paragraph) => `<p>${paragraph}</p>`).join("")}
        ${section.items?.length ? `<ul>${section.items.map((entry) => `<li>${entry}</li>`).join("")}</ul>` : ""}
        ${section.tip ? `<div class="article-tip"><strong>Совет:</strong> ${section.tip}</div>` : ""}
      </section>
    `).join("")}
    ${gallery.length ? `
      <section class="learning-media-block">
        <div class="media-heading">
          <span class="kicker">Галерея</span>
          <h2>Листай карточки</h2>
        </div>
        <div class="glossary-gallery">
          ${gallery.map((card) => `
            <article class="glossary-card">
              <img src="${card.image}" alt="Иллюстрация термина ${card.term}" loading="lazy" />
              <div class="glossary-copy">
                <h3>${card.term}</h3>
                ${card.subtitle ? `<span>${card.subtitle}</span>` : ""}
                <p>${card.definition}</p>
                <small>${card.example}</small>
              </div>
            </article>
          `).join("")}
        </div>
      </section>
    ` : ""}
    ${item.infographic ? `
      <section class="learning-media-block">
        <div class="media-heading">
          <span class="kicker">Инфографика</span>
          <h2>Этапы переработки</h2>
        </div>
        <img class="learning-infographic" src="${item.infographic.image}" alt="${item.infographic.alt}" loading="lazy" />
        <ol class="infographic-stages">
          ${item.infographic.stages.map((stage) => `<li><span>${stage}</span></li>`).join("")}
        </ol>
      </section>
    ` : ""}
    ${videos.length ? `
      <section class="learning-media-block">
        <div class="media-heading">
          <span class="kicker">Видео</span>
          <h2>Материалы для просмотра</h2>
        </div>
        <div class="video-learning-list">
          ${videos.map((video) => `
            <article class="video-learning-item">
              <h3>${video.title}</h3>
              ${video.embedUrl ? `<div class="video-frame"><iframe src="${video.embedUrl}" title="${video.title}" loading="lazy" allow="autoplay; encrypted-media; fullscreen; picture-in-picture" allowfullscreen></iframe></div>` : ""}
              <a class="external-media-link" href="${video.url}" target="_blank" rel="noopener noreferrer">Открыть источник</a>
            </article>
          `).join("")}
        </div>
      </section>
    ` : ""}
    ${checklist.length ? `
      <section class="learning-section">
        <span class="learning-section-icon">✓</span>
        <div>
          <h2>Чек-лист</h2>
          <ul class="learning-checklist">${checklist.map((step) => `<li>${step}</li>`).join("")}</ul>
        </div>
      </section>
    ` : ""}
    ${item.firstStep ? `
      <section class="learning-callout first-step">
        <span>Что сделать в первую очередь</span>
        <strong>${item.firstStep}</strong>
      </section>
    ` : ""}
    ${item.fact ? `
      <section class="learning-callout fact-card">
        <span>Интересный факт</span>
        <strong>${item.fact}</strong>
      </section>
    ` : ""}
  `;
}

function loadState() {
  const defaults = {
    name: "Ксюша",
    points: 145,
    completed: [],
    studied: [],
    registered: false,
    interests: []
  };
  try {
    return { ...defaults, ...JSON.parse(localStorage.getItem(stateKey)) };
  } catch {
    try {
      const legacy = JSON.parse(localStorage.getItem(legacyStateKey));
      return { ...defaults, ...legacy, registered: false };
    } catch {
      return defaults;
    }
  }
}

function saveState() {
  localStorage.setItem(stateKey, JSON.stringify(appState));
}

function completedIds() {
  return new Set(appState.completed.map((item) => item.id));
}

function studiedIds() {
  return new Set(appState.studied || []);
}

function partnerTasks() {
  return tasks.filter((task) => task.type === "partner" && task.coords);
}

function getTask(id) {
  return tasks.find((task) => task.id === id);
}

function getLearningItem(id) {
  return learningItems.find((item) => item.id === id);
}

function taskMatchesFilter(task) {
  if (activeTaskFilter === "points") return task.type === "partner";
  if (activeTaskFilter === "independent") return task.type === "simple";
  return true;
}

function renderRegistration() {
  authScreen.classList.toggle("active", !appState.registered);
}

function showScreen(name, options = {}) {
  screens.forEach((screen) => screen.classList.toggle("active", screen.id === `screen-${name}`));
  const isMain = ["tasks", "map", "learning", "rating", "profile"].includes(name);
  if (isMain) {
    previousMainScreen = name;
    bottomLinks.forEach((link) => link.classList.toggle("active", link.dataset.view === name));
  }
  document.querySelector(".phone-shell").scrollTo?.(0, 0);
  window.scrollTo(0, 0);
  if (name === "map") setTimeout(initYandexMap, 80);
  if (options.focusMapTask) setTimeout(() => focusTaskOnMap(options.focusMapTask), 250);
}

function renderAll() {
  headerBalance.textContent = appState.points;
  renderRegistration();
  renderTaskFeed();
  renderPartnerMapList();
  renderLearningFeed();
  renderLeaderboard();
  renderProfile();
  saveState();
}

function renderTaskFeed() {
  const done = completedIds();
  const filtered = tasks.filter(taskMatchesFilter);
  taskFeed.innerHTML = filtered.map((task) => {
    const recommended = appState.interests.includes(task.direction);
    return `
      <button class="task-card" data-task-open="${task.id}">
        <div class="task-thumb"><img src="${taxonomyIcons[task.taxonomy]}" alt="" /></div>
        <div class="task-body">
          <div class="task-tags">
            <span class="tag">${task.taxonomy}</span>
            ${recommended ? '<span class="tag accent">Для вас</span>' : ""}
            ${done.has(task.id) ? '<span class="tag done">Выполнено</span>' : ""}
          </div>
          <h3>${task.title}</h3>
          <p class="task-summary">${task.description}</p>
          <div class="task-card-footer">
            <strong>+${task.points}</strong>
            <span>${task.direction}</span>
          </div>
        </div>
      </button>
    `;
  }).join("");
  taskFeed.querySelectorAll("[data-task-open]").forEach((button) => {
    button.addEventListener("click", () => openTaskDetail(button.dataset.taskOpen));
  });
}

function renderPartnerMapList() {
  partnerMapList.innerHTML = partnerTasks().map((task) => `
    <button class="partner-row" data-map-task="${task.id}">
      <span class="round-image"><img src="${taxonomyIcons[task.taxonomy]}" alt="" /></span>
      <span>
        <strong>${task.title}</strong><br />
        <small>${task.taxonomy} · ${task.partner} · ${task.address}</small>
      </span>
    </button>
  `).join("");
  partnerMapList.querySelectorAll("[data-map-task]").forEach((button) => {
    button.addEventListener("click", () => focusTaskOnMap(button.dataset.mapTask));
  });
}

function renderLearningFeed() {
  const studied = studiedIds();
  learningFeed.innerHTML = learningItems.map((item) => `
    <button class="learning-card" data-learning-open="${item.id}">
      <img src="${getLearningIcon(item)}" alt="" />
      <span>
        <span class="task-tags">
          <span class="tag">${item.type}</span>
          <span class="tag">${item.time}</span>
          ${studied.has(item.id) ? '<span class="tag done">Изучено</span>' : ""}
        </span>
        <strong>${item.title}</strong>
        <small>${item.theme} · ${item.format}</small>
        <p>${item.summary}</p>
      </span>
    </button>
  `).join("");
  learningFeed.querySelectorAll("[data-learning-open]").forEach((button) => {
    button.addEventListener("click", () => openLearningDetail(button.dataset.learningOpen));
  });
}

function openTaskDetail(taskId) {
  selectedTaskId = taskId;
  const task = getTask(taskId);
  const done = completedIds().has(task.id);
  taskDetailPage.innerHTML = `
    <div class="detail-card">
      <span class="kicker">${task.partner || "EcoWorld"}</span>
      <h1>${task.title}</h1>
      <div class="task-image" role="img" aria-label="${task.title}">
        <img src="${task.image}" alt="${task.title}" />
      </div>
      <div class="detail-meta">
        <span class="tag">${task.taxonomy}</span>
        <span class="tag">${task.direction}</span>
      </div>
      <h2>Что нужно сделать</h2>
      <p>${task.description}</p>
      <h2>Польза для экологии</h2>
      <div class="task-impact-grid">
        <div><strong>${task.impact.co2.toFixed(2)}</strong><span>кг CO2</span></div>
        <div><strong>${task.impact.waste.toFixed(2)}</strong><span>кг отходов</span></div>
        <div><strong>${task.impact.water.toFixed(1)}</strong><span>л воды</span></div>
      </div>
      <div class="points-box">
        <span>Сколько баллов принесет</span>
        <strong>+${task.points}</strong>
      </div>
      <p><strong>Награда:</strong> ${task.reward}</p>
      <div class="action-stack">
        ${done ? '<div class="points-box"><span>Задание уже подтверждено</span><strong>✓</strong></div>' : '<button class="primary-action" data-confirm-task>Подтвердить задание</button>'}
        ${task.type === "partner" ? '<button class="secondary-action" data-show-on-map>Показать на карте</button>' : ""}
      </div>
    </div>
  `;
  taskDetailPage.querySelector("[data-confirm-task]")?.addEventListener("click", () => openConfirmPage(task.id));
  taskDetailPage.querySelector("[data-show-on-map]")?.addEventListener("click", () => showScreen("map", { focusMapTask: task.id }));
  showScreen("task-detail");
}

function openLearningDetail(itemId) {
  selectedLearningId = itemId;
  const item = getLearningItem(itemId);
  const studied = studiedIds().has(item.id);
  learningDetailPage.innerHTML = `
    <div class="detail-card">
      <span class="kicker">${item.type}</span>
      <h1>${item.title}</h1>
      ${item.gallery || item.infographic ? "" : `
        <div class="task-image" role="img" aria-label="${item.title}">
          <img src="${item.image}" alt="${item.title}" />
        </div>
      `}
      <div class="detail-meta">
        <span class="tag">${item.format}</span>
        <span class="tag">${item.time}</span>
        <span class="tag">${item.theme}</span>
      </div>
      <div class="learning-content">
        ${renderLearningContent(item)}
      </div>
      <div class="action-stack">
        ${studied ? '<div class="points-box"><span>Материал уже отмечен как изученный</span><strong>✓</strong></div>' : '<button class="primary-action" data-study-material>Отметить как изученное</button>'}
      </div>
    </div>
  `;
  learningDetailPage.querySelector("[data-study-material]")?.addEventListener("click", () => markLearningStudied(item.id));
  showScreen("learning-detail");
}

function markLearningStudied(itemId) {
  if (!appState.studied.includes(itemId)) appState.studied.push(itemId);
  renderAll();
  openLearningDetail(itemId);
}

function openConfirmPage(taskId) {
  selectedTaskId = taskId;
  const task = getTask(taskId);
  if (task.type === "partner") {
    confirmPage.innerHTML = `
      <div class="confirm-card">
        <span class="kicker">Подтверждение</span>
        <h1>${task.title}</h1>
        <p class="confirm-hint">Предъяви QR-код на кассе для получения скидки</p>
        <div class="qr-wrap"><canvas id="qrCanvas" width="230" height="230"></canvas></div>
        <button class="primary-action" data-complete-task>Сканирование выполнено</button>
      </div>
    `;
    drawQr(`EcoWorld:${task.id}:${Date.now()}`);
  } else {
    confirmPage.innerHTML = `
      <div class="confirm-card">
        <span class="kicker">Подтверждение</span>
        <h1>${task.title}</h1>
        <p class="confirm-hint">Введите необходимую информацию</p>
        <label class="upload-label">Прикрепить фото или видео<input type="file" accept="image/*,video/*" data-proof-file /></label>
        <textarea class="proof-textarea" placeholder="Например: отсортировала пластик и бумагу дома" data-proof-text></textarea>
        <button class="text-submit" data-complete-task>Отправить подтверждение</button>
      </div>
    `;
  }
  confirmPage.querySelector("[data-complete-task]").addEventListener("click", () => completeTask(task.id));
  showScreen("confirm");
}

function completeTask(taskId) {
  const task = getTask(taskId);
  if (!task || completedIds().has(task.id)) {
    openTaskDetail(taskId);
    return;
  }
  appState.points += task.points;
  appState.completed.unshift({
    id: task.id,
    title: task.title,
    points: task.points,
    reward: task.reward,
    date: new Date().toLocaleDateString("ru-RU")
  });
  renderAll();
  openTaskDetail(taskId);
}

function drawQr(seed) {
  const canvas = document.getElementById("qrCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const size = canvas.width;
  const cells = 25;
  const cell = size / cells;
  let hash = 0;
  for (let i = 0; i < seed.length; i += 1) hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, size, size);
  ctx.fillStyle = "#172522";
  for (let y = 0; y < cells; y += 1) {
    for (let x = 0; x < cells; x += 1) {
      const finder = (x < 7 && y < 7) || (x > 17 && y < 7) || (x < 7 && y > 17);
      if (finder) {
        if (x % 6 === 0 || y % 6 === 0 || (x > 1 && x < 5 && y > 1 && y < 5) || (x > 19 && x < 23 && y > 1 && y < 5) || (x > 1 && x < 5 && y > 19 && y < 23)) {
          ctx.fillRect(x * cell, y * cell, cell, cell);
        }
      } else {
        hash = (hash * 1664525 + 1013904223) >>> 0;
        if (hash % 3 === 0) ctx.fillRect(x * cell, y * cell, cell, cell);
      }
    }
  }
}

function initYandexMap() {
  if (yandexMap) return;
  if (!window.ymaps) {
    mapFallback.hidden = false;
    return;
  }
  window.ymaps.ready(() => {
    const center = [55.7628, 37.6173];
    yandexMap = new window.ymaps.Map("yandexMap", {
      center,
      zoom: 12,
      controls: ["zoomControl", "geolocationControl"]
    });
    partnerTasks().forEach((task) => {
      const placemark = new window.ymaps.Placemark(task.coords, {
        hintContent: task.title,
        balloonContent: `<strong>${task.title}</strong><br>${task.taxonomy}<br>${task.partner}<br>${task.address}`
      }, {
        preset: "islands#greenCircleDotIcon"
      });
      placemark.events.add("click", () => openTaskDetail(task.id));
      yandexMap.geoObjects.add(placemark);
      yandexPlacemarkByTask[task.id] = placemark;
    });
  });
  setTimeout(() => {
    if (!yandexMap) mapFallback.hidden = false;
  }, 3500);
}

function focusTaskOnMap(taskId) {
  const task = getTask(taskId);
  if (!task?.coords) return;
  if (yandexMap) {
    yandexMap.setCenter(task.coords, 15, { duration: 250 });
    yandexPlacemarkByTask[taskId]?.balloon.open();
  }
}

function renderLeaderboard() {
  const leaders = [...leadersBase, { name: appState.name, title: getUserTitle(), points: appState.points, current: true }]
    .sort((a, b) => b.points - a.points);
  leaderboard.innerHTML = leaders.map((user, index) => `
    <div class="leader-row">
      <span class="rank">${index + 1}</span>
      <span>
        <strong>${user.name}${user.current ? " (вы)" : ""}</strong><br />
        <small>${user.title}</small>
      </span>
      <strong>${user.points}</strong>
    </div>
  `).join("");
}

function getUserTitle() {
  if (appState.points >= 500) return "Эко-лидер";
  if (appState.points >= 300) return "Хранитель природы";
  if (appState.points >= 220) return "Защитник ресурсов";
  return "Участник экодвижения";
}

function totalImpact() {
  const done = completedIds();
  return tasks.reduce((acc, task) => {
    if (!done.has(task.id)) return acc;
    acc.co2 += task.impact.co2;
    acc.waste += task.impact.waste;
    acc.water += task.impact.water;
    return acc;
  }, { co2: 0, waste: 0, water: 0 });
}

function taxonomyResults() {
  const done = completedIds();
  return taskTypologies.map((taxonomy) => {
    const completedTasks = tasks.filter((task) => task.taxonomy === taxonomy && done.has(task.id));
    return {
      taxonomy,
      icon: taxonomyIcons[taxonomy],
      count: completedTasks.length,
      points: completedTasks.reduce((sum, task) => sum + task.points, 0)
    };
  });
}

function renderProfile() {
  const impact = totalImpact();
  const results = taxonomyResults();
  const maxTaxonomyPoints = Math.max(...results.map((item) => item.points), 1);
  profileHero.innerHTML = `
    <div class="profile-top">
      <div class="avatar">${appState.name.slice(0, 1)}</div>
      <div>
        <span class="kicker">Профиль</span>
        <h2>${appState.name}</h2>
        <p>${getUserTitle()}</p>
      </div>
    </div>
    <div class="profile-stats">
      <div class="stat-box"><strong>${appState.points}</strong><span>баллов</span></div>
      <div class="stat-box"><strong>${appState.completed.length}</strong><span>заданий</span></div>
      <div class="stat-box"><strong>${impact.waste.toFixed(1)}</strong><span>кг отходов направлено с пользой</span></div>
      <div class="stat-box"><strong>${impact.water.toFixed(0)}</strong><span>л воды сохранено</span></div>
    </div>
    <div class="profile-meta">
      <span>${appState.interests.length ? appState.interests.join(" · ") : "Участник EcoWorld"}</span>
    </div>
  `;
  impactGrid.innerHTML = results.map((item) => `
    <div class="impact-card taxonomy-result">
      <img src="${item.icon}" alt="" />
      <div class="taxonomy-result-copy">
        <span>${item.taxonomy}</span>
        <div class="taxonomy-result-numbers">
          <strong>+${item.points}</strong>
          <small>${item.count} ${item.count === 1 ? "задание" : "заданий"}</small>
        </div>
        <div class="result-track"><span style="width:${Math.round((item.points / maxTaxonomyPoints) * 100)}%"></span></div>
      </div>
    </div>
  `).join("");
  historyList.innerHTML = appState.completed.length
    ? appState.completed.map((item) => `
      <div class="history-row">
        <span class="rank">✓</span>
        <span><strong>${item.title}</strong><br /><small>${item.date} · ${item.reward}</small></span>
        <strong>+${item.points}</strong>
      </div>
    `).join("")
    : `<p>Пока нет подтвержденных заданий.</p>`;
}

authForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = authForm.elements.name.value.trim();
  if (!name) return;
  appState.name = name;
  appState.registered = true;
  saveState();
  renderAll();
});

bottomLinks.forEach((link) => {
  link.addEventListener("click", () => showScreen(link.dataset.view));
});

document.querySelectorAll("[data-task-filter]").forEach((button) => {
  button.addEventListener("click", () => {
    activeTaskFilter = button.dataset.taskFilter;
    document.querySelectorAll("[data-task-filter]").forEach((item) => item.classList.toggle("active", item === button));
    renderTaskFeed();
  });
});

document.querySelectorAll("[data-back]").forEach((button) => {
  button.addEventListener("click", () => {
    let target = previousMainScreen;
    if (button.dataset.back === "detail") target = "task-detail";
    if (button.dataset.back === "learning") target = "learning";
    showScreen(target);
  });
});

document.querySelector("[data-home]").addEventListener("click", () => showScreen("tasks"));

renderAll();
