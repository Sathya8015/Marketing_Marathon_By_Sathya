
(() => {
  "use strict";

  const $ = (id) => document.getElementById(id);

  const ANSWERS_KEY = "marketingMarathonTask1";
  const PROGRESS_KEY = "marketingMarathonTaskProgress";

  const introScreen = $("introScreen");
  const taskScreen = $("taskScreen");
  const celebrationScreen = $("celebrationScreen");
  const beginButton = $("beginButton");
  const musicButton = $("musicButton");
  
const revisitButton = $("revisitButton");

if (revisitButton) {
  revisitButton.addEventListener("click", () => {
    // Keep the previously saved answers.
    progress.vaultUnlocked = false;

    // Start again from Task 1.
    progress.currentTask = 1;

    saveAll();

    // Hide the final celebration and show the mission intro.
    celebrationScreen.classList.add("hidden");
    celebrationScreen.style.display = "none";

    taskScreen.classList.add("hidden");
    introScreen.classList.remove("hidden");

    renderIntro();

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}

  const musicLabel = $("musicLabel");

  let answers = {};
  let progress = {
    currentTask: 1,
    completedTasks: [],
    vaultUnlocked: false
  };

  let audioContext = null;
  let musicOn = false;
  let musicNodes = [];
  let musicTimer = null;

  // Load saved answers and progress.
  try {
    answers = JSON.parse(localStorage.getItem(ANSWERS_KEY) || "{}");

    progress = {
      ...progress,
      ...JSON.parse(localStorage.getItem(PROGRESS_KEY) || "{}")
    };
  } catch (error) {
    answers = {};
    progress = {
      currentTask: 1,
      completedTasks: [],
      vaultUnlocked: false
    };
  }

  if (!answers || typeof answers !== "object" || Array.isArray(answers)) {
    answers = {};
  }

  if (!Array.isArray(progress.completedTasks)) {
    progress.completedTasks = [];
  }

  progress.currentTask = Math.min(
    6,
    Math.max(1, Number(progress.currentTask) || 1)
  );

  // All six mission tasks.
  const tasks = [
    {
      title: "The Art of Routines",
      short: "Routines",
      description:
        "Identify the routines you want to change over five weeks.",
      questions: [
        {
          id: "routine_group",
          title:
            "What are the 3 routines you picked to change in these 5 weeks?",
          tag: "SELF-AWARENESS",
          type: "multiple",
          fields: [
            {
              id: "routine1",
              label: "ROUTINE ONE",
              placeholder: "Plan my day every morning"
            },
            {
              id: "routine2",
              label: "ROUTINE TWO",
              placeholder: "Reduce unnecessary screen time"
            },
            {
              id: "routine3",
              label: "ROUTINE THREE",
              placeholder: "Learn for 30 minutes daily"
            }
          ]
        },
        {
          id: "fixes",
          title:
            "What all do you think you could fix in these 5 weeks?",
          tag: "YOUR OPPORTUNITY",
          placeholder: "Describe the changes you want to make..."
        },
        {
          id: "benefits",
          title: "What are the benefits of fixing this?",
          tag: "THE REWARD",
          placeholder:
            "How will these changes improve your work or life?"
        }
      ]
    },

    {
      title: "Crack the Code",
      short: "Numbers",
      description:
        "Record the business numbers that help you understand performance.",
      questions: [
        ["Marketing Spends", "Enter your marketing spend."],
        [
          "No. of Leads / Enquiries Generated",
          "Enter the number of leads or enquiries."
        ],
        [
          "New Customers Acquired",
          "Enter the number of new customers."
        ],
        [
          "Cost Per Lead or Cost Per Enquiry",
          "Enter the cost per lead or enquiry."
        ],
        [
          "Customer Acquisition Cost",
          "Enter the customer acquisition cost."
        ],
        ["Total Revenue", "Enter total revenue."],
        ["New Customer Orders", "Enter new customer orders."],
        [
          "Repeated Customer Orders",
          "Enter repeat customer orders."
        ],
        ["Total Expenses", "Enter total expenses."],
        ["Profit / Loss", "Enter profit or loss."],
        ["Profit After Tax", "Enter profit after tax."],
        [
          "Capacity Utilization",
          "Enter capacity utilization, percentage or details."
        ]
      ].map(([title, placeholder], index) => ({
        id: `answer_2_${index + 1}`,
        title,
        tag: "BUSINESS METRICS",
        placeholder
      }))
    },

    {
      title: "Activate the Crew",
      short: "Network",
      description:
        "Identify the person you can discuss each area with. Enter a name or NO.",
      questions: [
        "Sales",
        "Marketing",
        "Management",
        "Operations",
        "Finance",
        "R&D",
        "HR",
        "Legal",
        "Family",
        "Relationship",
        "Health",
        "Personal Finance",
        "Habits",
        "Routine",
        "Spirituality",
        "Hobbies"
      ].map((area, index) => ({
        id: `answer_3_${index + 1}`,
        title: area,
        tag: "YOUR SUPPORT NETWORK",
        placeholder: "Enter a person's name or NO"
      }))
    },

    {
      title: "Inside Intel",
      short: "Thoughts",
      description:
        "Reflect honestly on your thinking patterns and mindful activities.",
      questions: [
        [
          "What are the things you think frequently?",
          "Describe your frequent thoughts."
        ],
        [
          "Where does your energy go in terms of thinking?",
          "Describe where your mental energy goes."
        ],
        [
          "Which thoughts empower, motivate or uplift you?",
          "Write the thoughts that motivate you."
        ],
        [
          "Which thoughts put you down, demotivate, trouble or worry you?",
          "Describe thoughts that trouble you."
        ],
        [
          "What mindful activities do you do in your routine?",
          "Describe your mindful activities."
        ]
      ].map(([title, placeholder], index) => ({
        id: `answer_4_${index + 1}`,
        title,
        tag: "MINDSET & AWARENESS",
        placeholder
      }))
    },

    {
      title: "Build Your Learning",
      short: "Learning",
      description:
        "Review the time you invest in business, domain and personal growth.",
      questions: [
        [
          "How much time do you spend learning and implementing new things in Business weekly?",
          "Example: 3 hours per week"
        ],
        [
          "How much time do you spend learning and implementing new things in your Domain weekly?",
          "Example: 4 hours per week"
        ],
        [
          "How much time do you spend learning and implementing new things in Personal Growth weekly?",
          "Example: 2 hours per week"
        ],
        [
          "What do you feel when you look at your learning time?",
          "Reflect on your learning time."
        ]
      ].map(([title, placeholder], index) => ({
        id: `answer_5_${index + 1}`,
        title,
        tag: "PERSONAL DEVELOPMENT",
        placeholder
      }))
    },

    {
      title: "Learning from Achievers",
      short: "Achievers",
      description:
        "Learn from a BEE success story and put your takeaways into action.",
      questions: [
        [
          "Whose BEE success story did you watch this week?",
          "Enter the person's name or success story."
        ],
        [
          "What are your top takeaways?",
          "Write the key lessons you learned."
        ],
        [
          "Did you share your takeaways in a YouTube comment?",
          "Enter YES or NO. You can also add the comment link."
        ]
      ].map(([title, placeholder], index) => ({
        id: `answer_6_${index + 1}`,
        title,
        tag: "LEARN FROM SUCCESS",
        placeholder
      }))
    }
  ];

  // Save answers and progress.
  function saveAll() {
    try {
      localStorage.setItem(ANSWERS_KEY, JSON.stringify(answers));
      localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
    } catch (error) {
      console.warn("Could not save progress in this browser.", error);
    }
  }

  // Prevent user-entered text from being treated as HTML.
  function escapeHtml(value) {
    return String(value ?? "").replace(/[&<>"']/g, (char) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    })[char]);
  }

  function getFieldIds(question, taskNumber, questionNumber) {
    if (question.type === "multiple") {
      return question.fields.map((field) => field.id);
    }

    return [
      question.id || `answer_${taskNumber}_${questionNumber}`
    ];
  }

  function readValue(id) {
    const element = $(id);

    return element
      ? element.value.trim()
      : String(answers[id] || "").trim();
  }

  function isQuestionAnswered(question, taskNumber, questionNumber) {
    return getFieldIds(
      question,
      taskNumber,
      questionNumber
    ).every((id) => readValue(id).length > 0);
  }

  // Update the intro screen for the current task.
  function renderIntro() {
    const number = progress.currentTask;
    const task = tasks[number - 1];

    introScreen.querySelector(".eyebrow").innerHTML =
      '<span class="status-dot"></span> THE FIRST OPERATION · MISSION 01';

    introScreen.querySelector(".task-label").textContent =
      `TASK ${String(number).padStart(2, "0")} / 06`;

    const titleParts = task.title.split(" ");

    introScreen.querySelector("h1").innerHTML =
      `${escapeHtml(titleParts.slice(0, -1).join(" "))} ` +
      `<span>${escapeHtml(titleParts.slice(-1)[0])}</span>`;

    introScreen.querySelector(".intro-description").textContent =
      task.description;

    introScreen.querySelector(".intro-bottom").innerHTML =
      `<span>${String(number).padStart(2, "0")} — ` +
      `${escapeHtml(task.short.toUpperCase())}</span>` +
      `<span>YOUR JOURNEY CONTINUES</span>` +
      `<span>06 TASKS</span>`;

    beginButton.innerHTML =
      `LET'S BEGIN <span aria-hidden="true">↗</span>`;
  }

  // Create one question card.
  function renderQuestion(question, taskNumber, questionNumber) {
    const number = String(questionNumber).padStart(2, "0");
    const tag = question.tag || "YOUR REFLECTION";

    let inputMarkup = "";

    if (question.type === "multiple") {
      inputMarkup = `
        <div class="routine-grid">
          ${question.fields.map((field) => `
            <div class="field">
              <label for="${field.id}">
                ${escapeHtml(field.label)}
              </label>
              <input
                id="${field.id}"
                name="${field.id}"
                value="${escapeHtml(answers[field.id] || "")}"
                placeholder="${escapeHtml(field.placeholder)}"
                required
              >
            </div>
          `).join("")}
        </div>`;
    } else {
      const id =
        question.id || `answer_${taskNumber}_${questionNumber}`;

      const value = escapeHtml(answers[id] || "");
      const longAnswer = taskNumber !== 2;

      inputMarkup = `
        <div class="field">
          <label for="${id}">YOUR ANSWER</label>
          ${
            longAnswer
              ? `<textarea
                   id="${id}"
                   name="${id}"
                   placeholder="${escapeHtml(question.placeholder || "")}"
                   required
                 >${value}</textarea>`
              : `<input
                   id="${id}"
                   name="${id}"
                   type="text"
                   value="${value}"
                   placeholder="${escapeHtml(question.placeholder || "")}"
                   required
                 >`
          }
        </div>`;
    }

    const supportId =
      taskNumber === 1
        ? `support${questionNumber}`
        : `support_${taskNumber}_${questionNumber}`;

    const feedbackId =
      taskNumber === 1
        ? `feedback${questionNumber}`
        : `feedback_${taskNumber}_${questionNumber}`;

    return `
      <article class="question-card">
        <div class="question-heading">
          <span class="question-number">${number}</span>
          <div>
            <p class="question-tag">${escapeHtml(tag)}</p>
            <h3>${escapeHtml(question.title)}</h3>
          </div>
        </div>

        ${inputMarkup}

        <div class="field extra-field">
          <label for="${supportId}">
            SUPPORTING DOCUMENT / REFERENCE (OPTIONAL)
          </label>
          <input
            id="${supportId}"
            name="${supportId}"
            value="${escapeHtml(answers[supportId] || "")}"
            placeholder="Paste a link or reference"
          >
        </div>

        <div class="field extra-field">
          <label for="${feedbackId}">YOUR FEEDBACK (OPTIONAL)</label>
          <textarea
            id="${feedbackId}"
            name="${feedbackId}"
            placeholder="Any additional thoughts..."
          >${escapeHtml(answers[feedbackId] || "")}</textarea>
        </div>
      </article>`;
  }

  // Render the active task and attach its event listeners.
  function renderTask() {
    const number = progress.currentTask;
    const task = tasks[number - 1];

    introScreen.classList.add("hidden");
    taskScreen.classList.remove("hidden");
    celebrationScreen.classList.add("hidden");
    celebrationScreen.style.display = "";
    celebrationScreen.innerHTML = "";

    taskScreen.innerHTML = `
      <div class="task-heading">
        <div>
          <p class="eyebrow">
            <span class="status-dot"></span>
            MISSION 01 / THE MASTER PLAN
          </p>
          <h2>
            Task ${String(number).padStart(2, "0")} —
            <span>${escapeHtml(task.short)}</span>
          </h2>
          <p class="muted">
            ${escapeHtml(task.description)}
            Your answers are saved on this browser.
          </p>
        </div>

        <div class="task-counter">
          <span>TASK</span>
          <strong>
            ${String(number).padStart(2, "0")}
            <i>/ 06</i>
          </strong>
        </div>
      </div>

      <div class="progress-area">
        <div class="progress-caption">
          <span>TASK ${number} PROGRESS</span>
          <span id="progressText">
            0 / ${task.questions.length} answered
          </span>
        </div>
        <div class="progress-track">
          <div id="progressBar" class="progress-bar"></div>
        </div>
      </div>

      <form id="dynamicTaskForm">
        ${task.questions.map((question, index) =>
          renderQuestion(question, number, index + 1)
        ).join("")}

        <div class="save-row">
          <p id="saveMessage">
            Your progress is saved as you type.
          </p>
          <button class="gold-button" type="submit">
            ${
              number === 6
                ? "COMPLETE & UNLOCK THE VAULT"
                : "COMPLETE TASK"
            }
            <span aria-hidden="true">↗</span>
          </button>
        </div>
      </form>`;

    const form = $("dynamicTaskForm");

    form.addEventListener("input", (event) => {
      const element = event.target;

      if (!element.id) return;

      answers[element.id] = element.value;
      saveAll();
      updateProgress();

      const message = $("saveMessage");

      if (message) {
        message.textContent = "✓ Progress saved on this browser";
      }
    });

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      completeCurrentTask();
    });

    updateProgress();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // Update the answered count and progress bar.
  function updateProgress() {
    const task = tasks[progress.currentTask - 1];

    if (!task || !$("progressText") || !$("progressBar")) {
      return;
    }

    const completed = task.questions.filter(
      (question, index) =>
        isQuestionAnswered(
          question,
          progress.currentTask,
          index + 1
        )
    ).length;

    $("progressText").textContent =
      `${completed} / ${task.questions.length} answered`;

    $("progressBar").style.width =
      `${(completed / task.questions.length) * 100}%`;
  }

  // Validate and complete the current task.
  function completeCurrentTask() {
    const number = progress.currentTask;
    const task = tasks[number - 1];

    taskScreen.querySelectorAll("input, textarea").forEach((element) => {
      if (element.id) {
        answers[element.id] = element.value;
      }
    });

    saveAll();

    const missing = task.questions.findIndex(
      (question, index) =>
        !isQuestionAnswered(question, number, index + 1)
    );

    if (missing !== -1) {
      const cards = taskScreen.querySelectorAll(".question-card");
      const card = cards[missing];

      if (card) {
        card.scrollIntoView({
          behavior: "smooth",
          block: "center"
        });

        const input = card.querySelector(
          "input[required], textarea[required]"
        );

        if (input) {
          input.focus({ preventScroll: true });
        }
      }

      const message = $("saveMessage");

      if (message) {
        message.textContent =
          "Please answer all required questions before continuing.";
      }

      return;
    }

    if (!progress.completedTasks.includes(number)) {
      progress.completedTasks.push(number);
    }

    if (number < 6) {
      progress.currentTask = number + 1;
      saveAll();
      showTaskUnlockCelebration(number + 1);
    } else {
      progress.vaultUnlocked = true;
      saveAll();
      showVaultFinale();
    }
  }

  // Show a celebration between tasks.
  function showTaskUnlockCelebration(nextTask) {
    taskScreen.classList.add("hidden");

    const screen = document.createElement("section");

    screen.className = "celebration-screen task-unlock-screen";

    screen.innerHTML = `
      <div class="confetti-layer"></div>

      <div class="celebration-content">
        <div class="unlocked-key">⚿</div>

        <p class="eyebrow">TASK COMPLETED</p>

        <h2>Well <span>Done!</span></h2>

        <p>
          Progress saved. Task
          ${String(nextTask).padStart(2, "0")}
          is now unlocked.
        </p>

        <div class="achievement-seal">
          ✦ TASK ${String(nextTask - 1).padStart(2, "0")} COMPLETE ✦
        </div>

        <button
          class="gold-button"
          id="continueNextTask"
          type="button"
        >
          CONTINUE TO TASK
          ${String(nextTask).padStart(2, "0")} ↗
        </button>
      </div>`;

    document.body.appendChild(screen);

    createConfetti(screen.querySelector(".confetti-layer"));

    screen.querySelector("#continueNextTask").addEventListener(
      "click",
      () => {
        screen.remove();

        renderIntro();

        introScreen.classList.remove("hidden");
        taskScreen.classList.add("hidden");
        celebrationScreen.classList.add("hidden");

        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    );
  }

  // Create falling confetti for task celebrations.
  function createConfetti(layer) {
    if (!layer) return;

    layer.replaceChildren();

    for (let i = 0; i < 85; i++) {
      const piece = document.createElement("span");

      piece.className = "confetti";
      piece.style.left = `${Math.random() * 100}%`;
      piece.style.animationDelay = `${Math.random() * 1.4}s`;
      piece.style.animationDuration = `${2 + Math.random() * 2}s`;

      piece.style.setProperty(
        "--drift",
        `${Math.round(Math.random() * 220 - 110)}px`
      );

      layer.appendChild(piece);
    }
  }

  // Display the final vault screen after Task 6.
  function showVaultFinale() {
    introScreen.classList.add("hidden");
    taskScreen.classList.add("hidden");

    // IMPORTANT: Make sure the final screen is visible.
    celebrationScreen.classList.remove("hidden");
    celebrationScreen.style.display = "grid";

    celebrationScreen.innerHTML = `
      <div class="finale-particles" aria-hidden="true"></div>

      <div class="master-finale">
        <div class="finale-red-glow"></div>

        
<div class="heist-character">
  <img
    src="professor.png"
    alt="Masked heist character"
    class="professor-image"
  >
  <div class="character-label">THE PROFESSOR</div>
</div>


        <div class="finale-vault">
          <div class="vault-ring"></div>
          <div class="vault-lock">🔐</div>
        </div>

        <div class="finale-completion">
          <p class="finale-eyebrow">
            MISSION 01 · THE MASTER PLAN
          </p>

          <h1 class="finale-heading">
            YOU SUCCESSFULLY<br>COMPLETED
          </h1>

          <h2 class="finale-mission-name">
            CLARITY &amp; TARGET SETTING
          </h2>

          <div class="finale-divider"></div>

          <p class="finale-subtitle">
            Every great heist begins with a master plan.<br>
            Your next chapter starts now.
          </p>

          <button
            class="finale-return-btn"
            id="returnMainButton"
            type="button"
          >
            RETURN TO MAIN PAGE ↗
          </button>
        </div>

        <div class="finale-sparks" aria-hidden="true">
          ${Array.from(
            { length: 24 },
            (_, i) => `<span style="--i:${i}"></span>`
          ).join("")}
        </div>
      </div>`;

    // IMPORTANT: This call starts the chocolate shower and fireworks.
    createFinaleCelebration(celebrationScreen);

    $("returnMainButton").addEventListener("click", () => {
      window.location.href = "index.html";
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // Chocolate, candy, coins and fireworks animation.
  function createFinaleCelebration(screen) {
    const layer = screen.querySelector(".finale-particles");

    if (!layer) return;

    layer.replaceChildren();

    const symbols = [
      "🍫",
      "🍬",
      "🪙",
      "✦",
      "◆",
      "🎊",
      "✨",
      "🍫"
    ];

    // Falling chocolate and candy.
    for (let i = 0; i < 130; i++) {
      const particle = document.createElement("span");

      particle.className = "finale-particle";
      particle.textContent = symbols[i % symbols.length];
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.animationDelay = `${Math.random() * 3}s`;
      particle.style.animationDuration = `${3 + Math.random() * 4}s`;

      particle.style.setProperty(
        "--drift",
        `${Math.random() * 220 - 110}px`
      );

      layer.appendChild(particle);
    }

    // Fireworks.
    for (let i = 0; i < 10; i++) {
      const firework = document.createElement("span");

      firework.className = "firework";
      firework.style.left = `${12 + Math.random() * 76}%`;
      firework.style.top = `${10 + Math.random() * 55}%`;
      firework.style.animationDelay = `${i * 0.45}s`;

      layer.appendChild(firework);
    }
  }

 
const backgroundMusic = document.getElementById("backgroundMusic");

musicButton.addEventListener("click", async () => {
  if (!backgroundMusic) return;

  if (backgroundMusic.paused) {
    try {
      await backgroundMusic.play();
      musicOn = true;
      musicButton.setAttribute("aria-pressed", "true");
      musicLabel.textContent = "MUSIC ON";
    } catch (error) {
      musicLabel.textContent = "CHECK MUSIC FILE";
      console.error("Music playback failed:", error);
    }
  } else {
    backgroundMusic.pause();
    musicOn = false;
    musicButton.setAttribute("aria-pressed", "false");
    musicLabel.textContent = "MUSIC OFF";
  }
});

 

  // Begin the current task.
  beginButton.addEventListener("click", () => {
    renderTask();

    if (musicOn) {
      startMusic();
    }
  });

  // Restore the appropriate screen after refreshing the page.
  if (progress.vaultUnlocked) {
    showVaultFinale();
  } else {
    renderIntro();

    introScreen.classList.remove("hidden");
    taskScreen.classList.add("hidden");
    celebrationScreen.classList.add("hidden");
  }
})();
