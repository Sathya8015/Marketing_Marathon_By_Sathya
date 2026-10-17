
const $ = (id) => document.getElementById(id);

const STORAGE_KEY = "marketingMarathonMission3";

const introScreen = $("introScreen");
const missionScreen = $("missionScreen");
const taskList = $("taskList");
const progressText = $("progressText");
const progressFill = $("progressFill");
const finale = $("finale");
const music = $("backgroundMusic");
const musicToggle = $("musicToggle");

const tasks = [
  {
    title: "Reality Check",
    subtitle: "The Truth About My Traffic",
    description: "Answer honestly and discover the potential in your existing relationships.",
    questions: [
      ["1.1", "How many total contacts do I currently have in my phone?", "number"],
      ["1.2", "How many customers have bought from me till date?", "number"],
      ["1.3", "How many old enquiries are lying unattended?", "number"],
      ["1.4", "How many Instagram followers do I have?", "number"],
      ["1.5", "How many WhatsApp contacts do I have?", "number"],
      ["1.6", "How many business cards have I collected but never followed up with?", "number"],
      ["1.7", "How many people already know what I do?", "number"],
      ["1.8", "How many people did I meaningfully connect with in the last 30 days?", "number"],
      ["1.9", "How many people did I contact only when I wanted to sell something?", "number"],
      ["1.10", "How many relationships have gone cold because of lack of follow-up?", "number"],
      ["1.11", "Am I really lacking leads or am I neglecting relationships?", "textarea"],
      ["1.12", "How much money may already be hidden inside my existing database?", "textarea"],
      ["1.13", "If I consistently nurtured my people for 90 days, what could happen to my business?", "textarea"]
    ]
  },
  {
    title: "Traffic Audit",
    subtitle: "Let Us Dig Your Hidden Goldmine",
    description: "Audit your owned traffic, earned traffic and paid traffic.",
    questions: [
      ["2.1", "Number of phone contacts", "number", "Traffic You Own"],
      ["2.2", "Number of existing customers", "number"],
      ["2.3", "Number of old customers", "number"],
      ["2.4", "Number of unconverted, captured leads", "number"],
      ["2.5", "Number of unsaved WhatsApp contacts from groups", "number"],
      ["2.6", "Number of people in email list", "number"],
      ["2.7", "Number of Instagram followers", "number"],
      ["2.8", "Number of LinkedIn connections", "number"],
      ["2.9", "Number of Facebook friends", "number"],
      ["2.10", "Number of business cards", "number"],
      ["2.11", "Total number of TYO — Goldmine Number", "number"],
      ["2.12", "Which TYO source am I under-utilizing the most?", "textarea"],
      ["2.13", "Which source can generate sales immediately if activated properly?", "textarea"],
      ["2.14", "Which relationship needs re-building?", "textarea"],
      ["2.16", "Who can help me in giving immediate referrals if asked?", "textarea", "Traffic You Earn"],
      ["2.17", "Who are the people or businesses I can possibly collaborate with?", "textarea"],
      ["2.18", "Are there influencers from my network who may give a shout-out through barter collaboration?", "textarea"],
      ["2.19", "What communities can give me referrals or recommendations?", "textarea"],
      ["2.21", "How many leads do I plan to generate from Meta and Google ads this month?", "number", "Traffic You Buy"],
      ["2.22", "Can I participate in events or exhibitions? If yes, how many leads could they generate?", "textarea"],
      ["2.23", "How many leads can I expect this month from other paid promotions?", "number"],
      ["2.24", "What is my total marketing spend this month?", "text"],
      ["2.25", "How many leads will be generated through TYB this month?", "number"],
      ["2.26", "What is my expected cost per lead?", "text"]
    ]
  },
  {
    title: "Relationship Scorecard",
    subtitle: "Do People Feel Valued & Remembered?",
    description: "Rate yourself from 1 (lowest) to 10 (highest). Be honest about your relationships.",
    questions: [
      ["3.1", "I genuinely care about my customers beyond sales.", "score", "Score 1–10"],
      ["3.2", "I regularly stay in touch with my audience.", "score"],
      ["3.3", "I follow up consistently and meaningfully.", "score"],
      ["3.4", "I provide value without expecting immediate sales.", "score"],
      ["3.5", "My audience feels emotionally connected to me.", "score"],
      ["3.6", "I appreciate customers openly.", "score"],
      ["3.7", "I listen to customer problems deeply.", "score"],
      ["3.8", "I nurture customer relationships patiently.", "score"],
      ["3.9", "Would my customers describe me as transactional or relational?", "textarea", "Reflection"],
      ["3.10", "Do people hear from me only when I want revenue?", "textarea"],
      ["3.11", "Am I building a database or a fan club for my product/service?", "textarea"]
    ]
  },
  {
    title: "21 Days SIT Plan",
    subtitle: "Plan Your Small, Intentional Touchpoints",
    description: "For each day, record the message or action, medium and customer category.",
    questions: [
      ["4.1", "Day 1 — List down 100 important contacts.", "textarea", "Week 1"],
      ["4.2", "Day 2 — Send an appreciation or thank-you message to 10 people.", "textarea"],
      ["4.3", "Day 3 — Reconnect with 10 old leads with meaningful messages.", "textarea"],
      ["4.4", "Day 4 — Call 5 old customers.", "textarea"],
      ["4.5", "Day 5 — Share an emotional story about why you do what you do.", "textarea"],
      ["4.6", "Day 6 — Post one value-based piece of content.", "textarea"],
      ["4.7", "Day 7 — Review learning and respond genuinely.", "textarea"],
      ["4.8", "Day 8 — Send an educational WhatsApp message.", "textarea", "Week 2"],
      ["4.9", "Day 9 — Ask your audience an engaging question.", "textarea"],
      ["4.10", "Day 10 — Share a customer transformation or success story.", "textarea"],
      ["4.11", "Day 11 — Do 5 follow-up calls.", "textarea"],
      ["4.12", "Day 12 — Show a behind-the-scenes video of your workplace.", "textarea"],
      ["4.13", "Day 13 — Appreciate existing customers publicly.", "textarea"],
      ["4.14", "Day 14 — Track engagement from the past two weeks.", "textarea"],
      ["4.15", "Day 15 — Ask for feedback or testimonials.", "textarea", "Week 3"],
      ["4.16", "Day 16 — Share your business journey.", "textarea"],
      ["4.17", "Day 17 — Share one important tip with your audience.", "textarea"],
      ["4.18", "Day 18 — Appreciate referral partners.", "textarea"],
      ["4.19", "Day 19 — Share an offer naturally.", "textarea"],
      ["4.20", "Day 20 — Review sales generated.", "textarea"],
      ["4.21", "Day 21 — Create an SIT plan for the next 21 days.", "textarea"]
    ]
  },
  {
    title: "Learning from Achievers",
    subtitle: "Real People, Real Stories",
    description: "Watch one BEE speaker story from the Real People, Real Stories series on YouTube.",
    questions: [
      ["5.1", "Whose success story have you watched from BEE this week?", "textarea"],
      ["5.2", "What are your top takeaways?", "textarea"],
      ["5.3", "Have you shared your takeaways in the YouTube video comments?", "select"]
    ]
  }
];

let progress = loadProgress();

function loadProgress() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {
      answers: {},
      completed: []
    };
  } catch {
    return { answers: {}, completed: [] };
  }
}

function saveProgress() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[char]);
}

function makeControl(question) {
  const [id, prompt, type] = question;
  const value = progress.answers[id] ?? "";
  const safeValue = escapeHTML(value);

  if (type === "textarea") {
    return `<textarea id="answer-${id}" data-answer="${id}"
      placeholder="Write your answer...">${safeValue}</textarea>`;
  }

  if (type === "score") {
    return `<select id="answer-${id}" data-answer="${id}">
      <option value="">Select score</option>
      ${Array.from({ length: 10 }, (_, i) => {
        const score = i + 1;
        return `<option value="${score}"
          ${String(value) === String(score) ? "selected" : ""}>
          ${score}
        </option>`;
      }).join("")}
    </select>`;
  }

  if (type === "select") {
    return `<select id="answer-${id}" data-answer="${id}">
      <option value="">Choose an answer</option>
      <option value="Yes" ${value === "Yes" ? "selected" : ""}>Yes</option>
      <option value="Not yet" ${value === "Not yet" ? "selected" : ""}>Not yet</option>
    </select>`;
  }

  return `<input id="answer-${id}" data-answer="${id}"
    type="${type === "number" ? "number" : "text"}"
    ${type === "number" ? 'min="0"' : ""}
    value="${safeValue}"
    placeholder="${type === "number" ? "Enter number" : "Enter answer"}">`;
}

function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const completed = progress.completed.includes(index);
    const card = document.createElement("article");

    card.className = `task-card ${completed ? "completed" : ""}`;
    card.dataset.task = index;

    const fields = [];
    let previousSection = "";

    task.questions.forEach(question => {
      const [id, prompt, type, section] = question;

      if (section && section !== previousSection) {
        fields.push(
          `<div class="section-label">${escapeHTML(section)}</div>`
        );
        previousSection = section;
      }

      fields.push(`
        <div class="question ${type === "textarea" ? "full" : ""}">
          <label for="answer-${id}">
            <b>${escapeHTML(id)}</b>
            ${escapeHTML(prompt)}
          </label>
          ${makeControl(question)}
        </div>
      `);
    });

    card.innerHTML = `
      <div class="task-head" role="button" tabindex="0"
        aria-expanded="false">
        <span class="task-number">${completed ? "✓" : String(index + 1).padStart(2, "0")}</span>
        <div class="task-title">
          <h2>${escapeHTML(task.title)}</h2>
          <p>${escapeHTML(task.subtitle)}</p>
        </div>
        <span class="task-state">${completed ? "COMPLETED" : "OPEN"} ⌄</span>
      </div>

      <div class="task-body">
        <p class="lead">${escapeHTML(task.description)}</p>
        <div class="question-grid">${fields.join("")}</div>

        <div class="task-actions">
          <span class="task-hint">Answers save automatically.</span>
          <button class="gold-button submit-task" type="button">
            ${completed ? "UPDATE TASK ✓" : "SUBMIT CHALLENGE ↗"}
          </button>
        </div>
      </div>
    `;

    taskList.appendChild(card);
  });

  updateProgress();
}

function updateProgress() {
  const count = progress.completed.length;
  progressText.textContent = `${count} / ${tasks.length} COMPLETE`;
  progressFill.style.width = `${count / tasks.length * 100}%`;

  finale.classList.toggle("hidden", count !== tasks.length);
}

taskList.addEventListener("input", event => {
  const field = event.target;

  if (!field.dataset.answer) return;

  progress.answers[field.dataset.answer] = field.value;
  saveProgress();
});

taskList.addEventListener("change", event => {
  const field = event.target;

  if (!field.dataset.answer) return;

  progress.answers[field.dataset.answer] = field.value;
  saveProgress();
});

taskList.addEventListener("click", event => {
  const submitButton = event.target.closest(".submit-task");

  if (submitButton) {
    const card = submitButton.closest(".task-card");
    const index = Number(card.dataset.task);

    const unanswered = tasks[index].questions.filter(question => {
      const answer = progress.answers[question[0]];
      return answer === undefined || String(answer).trim() === "";
    });

    if (unanswered.length > 0) {
      alert(`Please answer the remaining ${unanswered.length} question(s) before submitting.`);
      card.querySelector(`[data-answer="${unanswered[0][0]}"]`)?.focus();
      return;
    }

    if (!progress.completed.includes(index)) {
      progress.completed.push(index);
    }

    saveProgress();
    renderTasks();

    if (index < tasks.length - 1) {
      const nextCard = taskList.querySelector(`[data-task="${index + 1}"]`);
      nextCard.classList.add("open");
      nextCard.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      finale.scrollIntoView({ behavior: "smooth", block: "center" });
    }

    return;
  }

  const heading = event.target.closest(".task-head");

  if (heading) {
    const card = heading.closest(".task-card");
    card.classList.toggle("open");
    heading.setAttribute("aria-expanded", card.classList.contains("open"));
  }
});

taskList.addEventListener("keydown", event => {
  if (
    (event.key === "Enter" || event.key === " ") &&
    event.target.classList.contains("task-head")
  ) {
    event.preventDefault();
    event.target.click();
  }
});

$("startButton").addEventListener("click", () => {
  introScreen.classList.add("hidden");
  missionScreen.classList.remove("hidden");

  renderTasks();

  const firstIncomplete = tasks.findIndex(
    (_, index) => !progress.completed.includes(index)
  );

  const targetIndex = firstIncomplete === -1 ? 0 : firstIncomplete;
  const targetCard = taskList.querySelector(`[data-task="${targetIndex}"]`);

  targetCard?.classList.add("open");
  window.scrollTo({ top: 0, behavior: "smooth" });
});

$("replayButton").addEventListener("click", () => {
  const firstIncomplete = tasks.findIndex(
    (_, index) => !progress.completed.includes(index)
  );

  const targetIndex = firstIncomplete === -1 ? 0 : firstIncomplete;
  const targetCard = taskList.querySelector(`[data-task="${targetIndex}"]`);

  targetCard?.classList.add("open");
  targetCard?.scrollIntoView({ behavior: "smooth", block: "start" });
});

/* Background music ON / OFF */
musicToggle.addEventListener("click", async () => {
  if (music.paused) {
    try {
      await music.play();
      musicToggle.textContent = "🎵 MUSIC: ON";
    } catch (error) {
      musicToggle.textContent = "🔇 CLICK TO RETRY";
      console.error("Music could not start:", error);
    }
  } else {
    music.pause();
    musicToggle.textContent = "🎵 MUSIC: OFF";
  }
});

/* Restore saved completion when the mission is opened again */
if (progress.completed.length === tasks.length) {
  // The finale appears when the user enters the mission.
}
