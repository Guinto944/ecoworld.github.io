const adminTasksKey = "ecoworld-admin-tasks-v3";
const legacyAdminTasksKeys = ["ecoworld-admin-tasks-v2", "ecoworld-admin-tasks-v1"];
const appStateKey = "ecoworld-mobile-state-v4";
const contentKey = "ecoworld-admin-content-v1";

const taskTypologies = [
  "Сокращение отходов",
  "Переработка и повторное использование",
  "Сбережение ресурсов",
  "Забота о природе и городской среде"
];

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

defaultTasks.push(...(window.EcoWorldCatalog?.tasks || []));

const demoUsers = [
  { name: "Алина", points: 520, completed: 11 },
  { name: "Марк", points: 430, completed: 9 },
  { name: "София", points: 360, completed: 8 },
  { name: "Даниил", points: 260, completed: 6 }
];

let tasks = loadTasks();
let contentItems = loadContent();

const statsGrid = document.getElementById("statsGrid");
const taxonomyStats = document.getElementById("taxonomyStats");
const completionStats = document.getElementById("completionStats");
const impactSummary = document.getElementById("impactSummary");
const taskTable = document.getElementById("taskTable");
const taskForm = document.getElementById("taskForm");
const contentForm = document.getElementById("contentForm");
const contentList = document.getElementById("contentList");
const editorTitle = document.getElementById("editorTitle");

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
    return [...defaultTasks];
  }
  return [...defaultTasks];
}

function loadContent() {
  try {
    const saved = JSON.parse(localStorage.getItem(contentKey));
    if (Array.isArray(saved)) return saved;
  } catch {
    return [];
  }
  return [];
}

function loadAppState() {
  try {
    return JSON.parse(localStorage.getItem(appStateKey)) || { points: 145, completed: [] };
  } catch {
    return { points: 145, completed: [] };
  }
}

function normalizeTaxonomy(value) {
  if (taskTypologies.includes(value)) return value;
  if (["Борьба с одноразовой упаковкой", "Борьба с пластиком", "Осознанные покупки"].includes(value)) return "Сокращение отходов";
  if (["Безопасная переработка", "Сортировка отходов", "Повторное использование вещей"].includes(value)) return "Переработка и повторное использование";
  return taskTypologies[0];
}

function saveTasks() {
  localStorage.setItem(adminTasksKey, JSON.stringify(tasks));
}

function saveContent() {
  localStorage.setItem(contentKey, JSON.stringify(contentItems));
}

function normalizeTask(task) {
  const taxonomy = normalizeTaxonomy(task.taxonomy);
  return {
    id: task.id || makeId(),
    title: task.title || "Новое задание",
    type: task.type === "partner" ? "partner" : "simple",
    taxonomy,
    direction: task.direction || task.category || interestDirections[0],
    partner: task.type === "partner" ? task.partner || "" : null,
    address: task.address || "",
    coords: Array.isArray(task.coords) && task.coords.length === 2 ? task.coords.map(Number) : null,
    image: task.image || "./assets/tasks/home-sort.png",
    category: task.category || "Экология",
    points: Number(task.points) || 0,
    reward: task.reward || "Баллы рейтинга",
    description: task.description || "",
    impact: {
      co2: Number(task.impact?.co2) || 0,
      waste: Number(task.impact?.waste) || 0,
      water: Number(task.impact?.water) || 0
    }
  };
}

function makeId() {
  return `task-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}

function renderAll() {
  renderStats();
  renderTaskTable();
  renderContent();
}

function renderStats() {
  const appState = loadAppState();
  const partnerCount = tasks.filter((task) => task.type === "partner").length;
  const simpleCount = tasks.length - partnerCount;
  const totalPoints = tasks.reduce((sum, task) => sum + task.points, 0);
  const completedCount = appState.completed?.length || 0;
  const issuedPoints = (appState.completed || []).reduce((sum, item) => sum + Number(item.points || 0), 0);
  const usersCount = demoUsers.length + 1;

  statsGrid.innerHTML = [
    ["Заданий", tasks.length, `${partnerCount} с точкой, ${simpleCount} без точки`],
    ["Пользователей", usersCount, "демо-аудитория"],
    ["Выполнений", completedCount, `${issuedPoints} баллов начислено`],
    ["Материалов", contentItems.length, "контент админки"],
    ["Баллов в заданиях", totalPoints, "общий пул"],
    ["QR-заданий", partnerCount, "для партнерских точек"],
    ["Фото-подтверждений", simpleCount, "для заданий без точки"],
    ["Средний чек баллов", Math.round(totalPoints / Math.max(tasks.length, 1)), "на одно задание"]
  ].map(([label, value, note]) => `
    <div class="stat-card">
      <span>${label}</span>
      <strong>${value}</strong>
      <span>${note}</span>
    </div>
  `).join("");

  renderTaxonomyStats();
  renderCompletionStats(appState);
  renderImpactSummary(appState);
}

function renderTaxonomyStats() {
  const rows = Object.values(tasks.reduce((acc, task) => {
    acc[task.taxonomy] ||= { label: task.taxonomy, count: 0, points: 0 };
    acc[task.taxonomy].count += 1;
    acc[task.taxonomy].points += task.points;
    return acc;
  }, {})).sort((a, b) => b.points - a.points);
  const max = Math.max(...rows.map((row) => row.points), 1);
  taxonomyStats.innerHTML = rows.map((row) => `
    <div class="bar-row">
      <div class="bar-meta"><span>${row.label}</span><span>${row.count} шт. · ${row.points} баллов</span></div>
      <div class="bar-track"><div class="bar-fill" style="--bar-width:${Math.round((row.points / max) * 100)}%"></div></div>
    </div>
  `).join("");
}

function renderCompletionStats(appState) {
  const completions = tasks.map((task) => ({
    title: task.title,
    value: (appState.completed || []).filter((item) => item.id === task.id).length
  })).sort((a, b) => b.value - a.value);
  const max = Math.max(...completions.map((item) => item.value), 1);
  completionStats.innerHTML = completions.map((item) => `
    <div class="bar-row">
      <div class="bar-meta"><span>${item.title}</span><span>${item.value}</span></div>
      <div class="bar-track"><div class="bar-fill" style="--bar-width:${Math.round((item.value / max) * 100)}%"></div></div>
    </div>
  `).join("");
}

function renderImpactSummary(appState) {
  const completedIds = new Set((appState.completed || []).map((item) => item.id));
  const possible = tasks.reduce((acc, task) => {
    acc.co2 += task.impact.co2;
    acc.waste += task.impact.waste;
    acc.water += task.impact.water;
    return acc;
  }, { co2: 0, waste: 0, water: 0 });
  const actual = tasks.reduce((acc, task) => {
    if (!completedIds.has(task.id)) return acc;
    acc.co2 += task.impact.co2;
    acc.waste += task.impact.waste;
    acc.water += task.impact.water;
    return acc;
  }, { co2: 0, waste: 0, water: 0 });
  impactSummary.innerHTML = [
    ["CO2 в каталоге", possible.co2.toFixed(2), "кг"],
    ["Отходы в каталоге", possible.waste.toFixed(2), "кг"],
    ["Вода в каталоге", possible.water.toFixed(1), "л"],
    ["Факт CO2", actual.co2.toFixed(2), "кг выполнено"]
  ].map(([label, value, note]) => `
    <div class="impact-tile">
      <strong>${value}</strong>
      <span>${label} · ${note}</span>
    </div>
  `).join("");
}

function renderTaskTable() {
  taskTable.innerHTML = tasks.map((task) => `
    <tr>
      <td>
        <div class="task-cell">
          <img src="${task.image}" alt="${task.title}" />
          <span><strong>${task.title}</strong><br /><small>${task.category} · ${task.reward}</small></span>
        </div>
      </td>
      <td>${task.type === "partner" ? "Партнерское" : "Простое"}</td>
      <td>${task.taxonomy}<br /><small>${task.direction}</small></td>
      <td><strong>${task.points}</strong></td>
      <td>${task.partner || "Без партнера"}<br /><small>${task.address || "Без адреса"}</small></td>
      <td>
        <div class="table-actions">
          <button class="icon-action" type="button" data-edit="${task.id}">Изменить</button>
          <button class="icon-action" type="button" data-copy="${task.id}">Копия</button>
          <button class="icon-action" type="button" data-delete="${task.id}">Удалить</button>
        </div>
      </td>
    </tr>
  `).join("");

  taskTable.querySelectorAll("[data-edit]").forEach((button) => {
    button.addEventListener("click", () => fillTaskForm(getTask(button.dataset.edit)));
  });
  taskTable.querySelectorAll("[data-copy]").forEach((button) => {
    button.addEventListener("click", () => duplicateTask(button.dataset.copy));
  });
  taskTable.querySelectorAll("[data-delete]").forEach((button) => {
    button.addEventListener("click", () => deleteTask(button.dataset.delete));
  });
}

function getTask(id) {
  return tasks.find((task) => task.id === id);
}

function fillTaskForm(task) {
  if (!task) return;
  editorTitle.textContent = `Редактирование: ${task.title}`;
  taskForm.elements.id.value = task.id;
  taskForm.elements.title.value = task.title;
  taskForm.elements.type.value = task.type;
  taskForm.elements.taxonomy.value = task.taxonomy;
  taskForm.elements.direction.value = task.direction;
  taskForm.elements.category.value = task.category;
  taskForm.elements.points.value = task.points;
  taskForm.elements.reward.value = task.reward;
  taskForm.elements.partner.value = task.partner || "";
  taskForm.elements.address.value = task.address || "";
  taskForm.elements.lat.value = task.coords?.[0] ?? "";
  taskForm.elements.lng.value = task.coords?.[1] ?? "";
  taskForm.elements.image.value = task.image;
  taskForm.elements.co2.value = task.impact.co2;
  taskForm.elements.waste.value = task.impact.waste;
  taskForm.elements.water.value = task.impact.water;
  taskForm.elements.description.value = task.description;
  document.getElementById("editor").scrollIntoView({ behavior: "smooth", block: "start" });
}

function clearTaskForm() {
  editorTitle.textContent = "Новое задание";
  taskForm.reset();
  taskForm.elements.id.value = "";
  taskForm.elements.type.value = "partner";
  taskForm.elements.taxonomy.value = taskTypologies[0];
  taskForm.elements.direction.value = interestDirections[0];
  taskForm.elements.image.value = "./assets/tasks/home-sort.png";
}

function readTaskForm() {
  const form = taskForm.elements;
  const type = form.type.value;
  const lat = Number(form.lat.value);
  const lng = Number(form.lng.value);
  return normalizeTask({
    id: form.id.value || makeId(),
    title: form.title.value.trim(),
    type,
    taxonomy: form.taxonomy.value.trim(),
    direction: form.direction.value.trim(),
    partner: type === "partner" ? form.partner.value.trim() : null,
    address: form.address.value.trim(),
    coords: type === "partner" && Number.isFinite(lat) && Number.isFinite(lng) ? [lat, lng] : null,
    image: form.image.value,
    category: form.category.value.trim(),
    points: Number(form.points.value),
    reward: form.reward.value.trim(),
    description: form.description.value.trim(),
    impact: {
      co2: Number(form.co2.value),
      waste: Number(form.waste.value),
      water: Number(form.water.value)
    }
  });
}

function upsertTask(task) {
  const index = tasks.findIndex((item) => item.id === task.id);
  if (index >= 0) tasks[index] = task;
  else tasks.unshift(task);
  saveTasks();
  renderAll();
  fillTaskForm(task);
}

function duplicateTask(id) {
  const task = getTask(id);
  if (!task) return;
  const copy = normalizeTask({ ...task, id: makeId(), title: `${task.title} — копия` });
  tasks.unshift(copy);
  saveTasks();
  renderAll();
  fillTaskForm(copy);
}

function deleteTask(id) {
  tasks = tasks.filter((task) => task.id !== id);
  saveTasks();
  renderAll();
  clearTaskForm();
}

function restoreDefaults() {
  tasks = defaultTasks.map(normalizeTask);
  saveTasks();
  renderAll();
  clearTaskForm();
}

function renderContent() {
  contentList.innerHTML = contentItems.length
    ? contentItems.map((item) => `
      <article class="content-item">
        <div>
          <span class="tag">${item.type}</span>
          <span class="tag">${item.status}</span>
          <h3>${item.title}</h3>
          <p>${item.text}</p>
          <small>${item.createdAt}</small>
        </div>
        <button class="icon-action" type="button" data-content-delete="${item.id}">Удалить</button>
      </article>
    `).join("")
    : `<p>Материалы еще не созданы.</p>`;

  contentList.querySelectorAll("[data-content-delete]").forEach((button) => {
    button.addEventListener("click", () => {
      contentItems = contentItems.filter((item) => item.id !== button.dataset.contentDelete);
      saveContent();
      renderAll();
    });
  });
}

taskForm.addEventListener("submit", (event) => {
  event.preventDefault();
  upsertTask(readTaskForm());
});

contentForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const form = contentForm.elements;
  contentItems.unshift({
    id: makeId(),
    type: form.type.value,
    status: form.status.value,
    title: form.title.value.trim(),
    text: form.text.value.trim(),
    createdAt: new Date().toLocaleDateString("ru-RU")
  });
  saveContent();
  contentForm.reset();
  renderAll();
});

document.getElementById("newTaskButton").addEventListener("click", () => {
  clearTaskForm();
  document.getElementById("editor").scrollIntoView({ behavior: "smooth", block: "start" });
});

document.getElementById("clearFormButton").addEventListener("click", clearTaskForm);
document.getElementById("restoreDefaultsButton").addEventListener("click", restoreDefaults);
document.getElementById("resetDemoStats").addEventListener("click", () => {
  localStorage.removeItem(appStateKey);
  renderAll();
});

clearTaskForm();
renderAll();
