(() => {
  "use strict";

  const $ = (id) => document.getElementById(id);
  const ANSWERS_KEY = "marketingMarathonMission2Answers";
  const PROGRESS_KEY = "marketingMarathonMission2Progress";

  const introScreen = $("introScreen");
  const taskScreen = $("taskScreen");
  const celebrationScreen = $("celebrationScreen");
  const beginButton = $("beginButton");
  const musicButton = $("musicButton");
  const musicLabel = $("musicLabel");
  const revisitButton = $("revisitButton");

  if (revisitButton) {
    revisitButton.addEventListener("click", () => {
      progress.vaultUnlocked = false;
      progress.currentTask = 1;
      saveAll();
      celebrationScreen.classList.add("hidden");
      celebrationScreen.style.display = "";
      taskScreen.classList.add("hidden");
      introScreen.classList.remove("hidden");
      renderIntro();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  let answers = {};
  let progress = { currentTask: 1, completedTasks: [], vaultUnlocked: false };
  let audioContext = null;
  let musicOn = false;
  let musicNodes = [];
  let musicTimer = null;

  try {
    answers = JSON.parse(localStorage.getItem(ANSWERS_KEY) || "{}");
    progress = { ...progress, ...JSON.parse(localStorage.getItem(PROGRESS_KEY) || "{}") };
  } catch (error) {
    answers = {};
    progress = { currentTask: 1, completedTasks: [], vaultUnlocked: false };
  }

  if (!answers || typeof answers !== "object" || Array.isArray(answers)) answers = {};
  if (!Array.isArray(progress.completedTasks)) progress.completedTasks = [];
  progress.currentTask = Math.min(6, Math.max(1, Number(progress.currentTask) || 1));

  const tasks = [
  {
    "title": "Change in Formula",
    "short": "Product or Service",
    "description": "Get detached from your product/service and answer honestly",
    "questions": [
      {
        "id": "m2_1_uniqueness",
        "title": "If your competitor copied your business tomorrow, what would make the customers still come to you for?",
        "tag": "Uniqueness",
        "placeholder": "Write your answer honestly and specifically..."
      },
      {
        "id": "m2_1_hidden_demand",
        "title": "What is the one thing that customers repeatedly ask you for, but you still haven't added in your product/service?",
        "tag": "Hidden Demand",
        "placeholder": "Write your answer honestly and specifically..."
      },
      {
        "id": "m2_1_needs_simplification",
        "title": "What part of your product/service creates confusion, delay, frustration for you or your customers?",
        "tag": "Needs Simplification",
        "placeholder": "Write your answer honestly and specifically..."
      },
      {
        "id": "m2_1_deeper_positioning",
        "title": "What emotional problem does your product/service solve?",
        "tag": "Deeper Positioning",
        "placeholder": "Write your answer honestly and specifically..."
      },
      {
        "id": "m2_1_eradication",
        "title": "What can you remove from your existing product/service that customers don't even notice or value anymore?",
        "tag": "Eradication",
        "placeholder": "Write your answer honestly and specifically..."
      },
      {
        "id": "m2_1_premium_thinking",
        "title": "If you have to charge 2X of your current price, what needs to be added or improved?",
        "tag": "Premium Thinking",
        "placeholder": "Write your answer honestly and specifically..."
      },
      {
        "id": "m2_1_cif_product",
        "title": "What change are you going to bring in your product/service?",
        "tag": "CiF - Product/Service",
        "placeholder": "Write your answer honestly and specifically..."
      }
    ]
  },
  {
    "title": "Delivery Process",
    "short": "Delivery Process",
    "description": "Think about your current delivery process and answer honestly",
    "questions": [
      {
        "id": "m2_2_weak_delivery",
        "title": "Where are customers losing excitement after they buy from you?",
        "tag": "Weak Delivery Systems",
        "placeholder": "Write your answer honestly and specifically..."
      },
      {
        "id": "m2_2_modernize",
        "title": "What part of your delivery process feels outdated in today's market?",
        "tag": "Modernize",
        "placeholder": "Write your answer honestly and specifically..."
      },
      {
        "id": "m2_2_mindset_shift",
        "title": "If Amazon or any big player enters your market tomorrow, what delivery experience would customers expect from you?",
        "tag": "Mindset Shift",
        "placeholder": "Write your answer honestly and specifically..."
      },
      {
        "id": "m2_2_insufficiencies",
        "title": "What is taking unnecessary time, manpower or follow-ups in your current process?",
        "tag": "Understanding Insufficiencies",
        "placeholder": "Write your answer honestly and specifically..."
      },
      {
        "id": "m2_2_memorable_experiences",
        "title": "What small improvement in customer experience can make people talk about your business?",
        "tag": "Memorable Experiences",
        "placeholder": "Write your answer honestly and specifically..."
      },
      {
        "id": "m2_2_delivery_method",
        "title": "How can you make buying from you easier, faster and more comfortable?",
        "tag": "Delivery Method",
        "placeholder": "Write your answer honestly and specifically..."
      },
      {
        "id": "m2_2_cif_delivery",
        "title": "What change are you going to bring in your delivery process?",
        "tag": "CiF - Delivery Process",
        "placeholder": "Write your answer honestly and specifically..."
      }
    ]
  },
  {
    "title": "Customer or Market",
    "short": "Customer / Market",
    "description": "Stop serving everyone. Answer the questions honestly",
    "questions": [
      {
        "id": "m2_3_realization",
        "title": "Are you struggling because your business is weak, or because you are selling to the wrong people?",
        "tag": "Realization",
        "placeholder": "Write your answer honestly and specifically..."
      },
      {
        "id": "m2_3_ideal_customer",
        "title": "Who gets the fastest results or is super happy with your product/service?",
        "tag": "Ideal Customer",
        "placeholder": "Write your answer honestly and specifically..."
      },
      {
        "id": "m2_3_premium_audience",
        "title": "Which customers value your work the most without negotiating much?",
        "tag": "Premium Audience",
        "placeholder": "Write your answer honestly and specifically..."
      },
      {
        "id": "m2_3_wrong_audience",
        "title": "What type of customers drain your energy, time and profit repeatedly?",
        "tag": "Wrong Audience",
        "placeholder": "Write your answer honestly and specifically..."
      },
      {
        "id": "m2_3_niche_clarity",
        "title": "Are you marketing to everyone because you still do not deeply understand your best customer?",
        "tag": "Niche Clarity",
        "placeholder": "Write your answer honestly and specifically..."
      },
      {
        "id": "m2_3_market_mapping",
        "title": "Where are your ideal customers already spending their attention, trust and money?",
        "tag": "Market Mapping",
        "placeholder": "Write your answer honestly and specifically..."
      },
      {
        "id": "m2_3_cif_customer",
        "title": "What change are you planning to make with respect to your market or customer?",
        "tag": "CiF - Customer/Market",
        "placeholder": "Write your answer honestly and specifically..."
      }
    ]
  },
  {
    "title": "Marketing",
    "short": "Marketing",
    "description": "Write based on what you are currently doing in marketing",
    "questions": [
      {
        "id": "m2_4_messaging_clarity",
        "title": "Are people ignoring your business or are they simply not understanding its value?",
        "tag": "Messaging Clarity",
        "placeholder": "Write your answer honestly and specifically..."
      },
      {
        "id": "m2_4_brand_strength",
        "title": "What makes your brand immediately irresistible in the first 10 seconds?",
        "tag": "Understanding Your Strength",
        "placeholder": "Write your answer honestly and specifically..."
      },
      {
        "id": "m2_4_marketing_clarity",
        "title": "If a stranger sees your marketing today, will they instantly know what you do, who it is for, why they should trust you, and why they should act now?",
        "tag": "Marketing Clarity",
        "placeholder": "Write your answer honestly and specifically..."
      },
      {
        "id": "m2_4_system_thinking",
        "title": "Are you depending on random marketing activities or do you actually have a predictable system?",
        "tag": "System Thinking",
        "placeholder": "Write your answer honestly and specifically..."
      },
      {
        "id": "m2_4_focus_scaling",
        "title": "What marketing activity is giving you the biggest result now, and why are you not doubling down on it?",
        "tag": "Focus & Scaling",
        "placeholder": "Write your answer honestly and specifically..."
      },
      {
        "id": "m2_4_psychological_marketing",
        "title": "What beliefs or fears are stopping your customer from buying, and are you addressing them in your marketing?",
        "tag": "Psychological Marketing",
        "placeholder": "Write your answer honestly and specifically..."
      },
      {
        "id": "m2_4_cif_marketing",
        "title": "What ideas are you getting to change in marketing?",
        "tag": "CiF - Marketing",
        "placeholder": "Write your answer honestly and specifically..."
      }
    ]
  },
  {
    "title": "Final Action Points",
    "short": "Action Points",
    "description": "Based on the answers you have given above, plan your CiF activities",
    "questions": [
      {
        "id": "m2_5_broken_formula",
        "title": "If your business is a formula, which part of the formula is broken right now?",
        "tag": "Broken Formula",
        "placeholder": "Write your answer honestly and specifically..."
      },
      {
        "id": "m2_5_change_anything",
        "title": "If everything was possible for you, and you couldn't fail at all, what would you change in your business?",
        "tag": "Unlimited Possibilities",
        "placeholder": "Write your answer honestly and specifically..."
      },
      {
        "id": "m2_5_no_change",
        "title": "If you do not change anything, then what will happen?",
        "tag": "If Nothing Changes",
        "placeholder": "Write your answer honestly and specifically..."
      },
      {
        "id": "m2_5_if_change",
        "title": "If you change something or all the things, then what could happen?",
        "tag": "If You Change",
        "placeholder": "Write your answer honestly and specifically..."
      },
      {
        "id": "m2_5_better_results",
        "title": "If you can change one or all, can you get better results?",
        "tag": "Better Results",
        "placeholder": "Write your answer honestly and specifically..."
      },
      {
        "id": "m2_5_five_week_changes",
        "title": "List down all the changes you are going to bring in these 5 weeks.",
        "tag": "Five-Week Changes",
        "placeholder": "Write your answer honestly and specifically..."
      }
    ]
  },
  {
    "title": "Learning from Achievers",
    "short": "Achievers",
    "description": "Watch any one speaker story from the Real People, Real Stories series on the BEE YouTube channel",
    "questions": [
      {
        "id": "m2_6_success_story",
        "title": "Whose success story have you watched from BEE this week?",
        "tag": "Success Story",
        "placeholder": "Write your answer honestly and specifically..."
      },
      {
        "id": "m2_6_takeaways",
        "title": "What are your top takeaways?",
        "tag": "Top Takeaways",
        "placeholder": "Write your answer honestly and specifically..."
      },
      {
        "id": "m2_6_youtube_comment",
        "title": "Have you shared the takeaways in the comment of the YouTube video?",
        "tag": "YouTube Comment",
        "placeholder": "Write your answer honestly and specifically..."
      }
    ]
  }
];

  function saveAll() {
    try {
      localStorage.setItem(ANSWERS_KEY, JSON.stringify(answers));
      localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
    } catch (error) {
      console.warn("Could not save progress in this browser.", error);
    }
  }

  function escapeHtml(value) {
    return String(value ?? "").replace(/[&<>"']/g, (char) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    })[char]);
  }

  function getFieldIds(question, taskNumber, questionNumber) {
    if (question.type === "multiple") return question.fields.map((field) => field.id);
    return [question.id || `answer_${taskNumber}_${questionNumber}`];
  }

  function readValue(id) {
    const element = $(id);
    return element ? element.value.trim() : String(answers[id] || "").trim();
  }

  function isQuestionAnswered(question, taskNumber, questionNumber) {
    return getFieldIds(question, taskNumber, questionNumber).every((id) => readValue(id).length > 0);
  }

  function renderIntro() {
    const number = progress.currentTask;
    const task = tasks[number - 1];
    introScreen.querySelector(".eyebrow").innerHTML = '<span class="status-dot"></span> THE SECOND OPERATION · MISSION 02';
    introScreen.querySelector(".task-label").textContent = `TASK ${String(number).padStart(2, "0")} / 06`;
    introScreen.querySelector("h1").innerHTML = `${escapeHtml(task.title.split(" ").slice(0, -1).join(" "))} <span>${escapeHtml(task.title.split(" ").slice(-1)[0])}</span>`;
    introScreen.querySelector(".intro-description").textContent = task.description;
    introScreen.querySelector(".intro-bottom").innerHTML = `<span>${String(number).padStart(2, "0")} — ${escapeHtml(task.short.toUpperCase())}</span><span>YOUR JOURNEY CONTINUES</span><span>06 TASKS</span>`;
    beginButton.innerHTML = `LET'S BEGIN <span aria-hidden="true">↗</span>`;
  }

  function renderQuestion(question, taskNumber, questionNumber) {
    const number = String(questionNumber).padStart(2, "0");
    const tag = question.tag || "YOUR REFLECTION";
    let inputMarkup = "";

    if (question.type === "multiple") {
      inputMarkup = `<div class="routine-grid">${question.fields.map((field) => `
        <div class="field">
          <label for="${field.id}">${escapeHtml(field.label)}</label>
          <input id="${field.id}" name="${field.id}" value="${escapeHtml(answers[field.id] || "")}" placeholder="${escapeHtml(field.placeholder)}" required>
        </div>`).join("")}</div>`;
    } else {
      const id = question.id || `answer_${taskNumber}_${questionNumber}`;
      const value = escapeHtml(answers[id] || "");
      const longAnswer = true;
      inputMarkup = `<div class="field">
        <label for="${id}">YOUR ANSWER</label>
        ${longAnswer
          ? `<textarea id="${id}" name="${id}" placeholder="${escapeHtml(question.placeholder || "")}" required>${value}</textarea>`
          : `<input id="${id}" name="${id}" type="text" value="${value}" placeholder="${escapeHtml(question.placeholder || "")}" required>`}
      </div>`;
    }

    const supportId = taskNumber === 1 ? `support${questionNumber}` : `support_${taskNumber}_${questionNumber}`;
    const feedbackId = taskNumber === 1 ? `feedback${questionNumber}` : `feedback_${taskNumber}_${questionNumber}`;

    return `<article class="question-card">
      <div class="question-heading"><span class="question-number">${number}</span><div><p class="question-tag">${escapeHtml(tag)}</p><h3>${escapeHtml(question.title)}</h3></div></div>
      ${inputMarkup}
      <div class="field extra-field"><label for="${supportId}">SUPPORTING DOCUMENT / REFERENCE (OPTIONAL)</label>
        <input id="${supportId}" name="${supportId}" value="${escapeHtml(answers[supportId] || "")}" placeholder="Paste a link or reference"></div>
      <div class="field extra-field"><label for="${feedbackId}">YOUR FEEDBACK (OPTIONAL)</label>
        <textarea id="${feedbackId}" name="${feedbackId}" placeholder="Any additional thoughts...">${escapeHtml(answers[feedbackId] || "")}</textarea></div>
    </article>`;
  }

  function renderTask() {
    const number = progress.currentTask;
    const task = tasks[number - 1];
    introScreen.classList.add("hidden");
    taskScreen.classList.remove("hidden");
    celebrationScreen.classList.add("hidden");
    celebrationScreen.innerHTML = "";

    taskScreen.innerHTML = `
      <div class="task-heading"><div>
        <p class="eyebrow"><span class="status-dot"></span> MISSION 02 / CRACK THE CODE</p>
        <h2>Task ${String(number).padStart(2, "0")} — <span>${escapeHtml(task.short)}</span></h2>
        <p class="muted">${escapeHtml(task.description)} Your answers are saved on this browser.</p>
      </div><div class="task-counter"><span>TASK</span><strong>${String(number).padStart(2, "0")} <i>/ 06</i></strong></div></div>
      <div class="progress-area"><div class="progress-caption"><span>TASK ${number} PROGRESS</span><span id="progressText">0 / ${task.questions.length} answered</span></div>
        <div class="progress-track"><div id="progressBar" class="progress-bar"></div></div></div>
      <form id="dynamicTaskForm">
        ${task.questions.map((question, index) => renderQuestion(question, number, index + 1)).join("")}
        <div class="save-row"><p id="saveMessage">Your progress is saved as you type.</p>
          <button class="gold-button" type="submit">${number === 6 ? "COMPLETE & UNLOCK THE VAULT" : "COMPLETE TASK"} <span aria-hidden="true">↗</span></button></div>
      </form>`;

    const form = $("dynamicTaskForm");
    form.addEventListener("input", (event) => {
      const element = event.target;
      if (!element.id) return;
      answers[element.id] = element.value;
      saveAll();
      updateProgress();
      $("saveMessage").textContent = "✓ Progress saved on this browser";
    });
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      completeCurrentTask();
    });
    updateProgress();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function updateProgress() {
    const task = tasks[progress.currentTask - 1];
    if (!task || !$("progressText") || !$("progressBar")) return;
    const completed = task.questions.filter((question, index) => isQuestionAnswered(question, progress.currentTask, index + 1)).length;
    $("progressText").textContent = `${completed} / ${task.questions.length} answered`;
    $("progressBar").style.width = `${(completed / task.questions.length) * 100}%`;
  }

  function completeCurrentTask() {
    const number = progress.currentTask;
    const task = tasks[number - 1];
    taskScreen.querySelectorAll("input, textarea").forEach((element) => {
      if (element.id) answers[element.id] = element.value;
    });
    saveAll();

    const missing = task.questions.findIndex((question, index) => !isQuestionAnswered(question, number, index + 1));
    if (missing !== -1) {
      const card = taskScreen.querySelectorAll(".question-card")[missing];
      if (card) {
        card.scrollIntoView({ behavior: "smooth", block: "center" });
        const input = card.querySelector("input[required], textarea[required]");
        if (input) input.focus({ preventScroll: true });
      }
      const message = $("saveMessage");
      if (message) message.textContent = "Please answer all required questions before continuing.";
      return;
    }

    if (!progress.completedTasks.includes(number)) progress.completedTasks.push(number);
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

  function showTaskUnlockCelebration(nextTask) {
    taskScreen.classList.add("hidden");
    const screen = document.createElement("section");
    screen.className = "celebration-screen task-unlock-screen";
    screen.innerHTML = `<div class="confetti-layer"></div><div class="celebration-content">
      <div class="unlocked-key">⚿</div><p class="eyebrow">TASK COMPLETED</p><h2>Well <span>Done!</span></h2>
      <p>Progress saved. Task ${String(nextTask).padStart(2, "0")} is now unlocked.</p>
      <div class="achievement-seal">✦ TASK ${String(nextTask - 1).padStart(2, "0")} COMPLETE ✦</div>
      <button class="gold-button" id="continueNextTask" type="button">CONTINUE TO TASK ${String(nextTask).padStart(2, "0")} ↗</button>
    </div>`;
    document.body.appendChild(screen);
    createConfetti(screen.querySelector(".confetti-layer"));
    screen.querySelector("#continueNextTask").addEventListener("click", () => {
      screen.remove();
      renderIntro();
      introScreen.classList.remove("hidden");
      taskScreen.classList.add("hidden");
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  function createConfetti(layer) {
    if (!layer) return;
    layer.replaceChildren();
    for (let i = 0; i < 85; i++) {
      const piece = document.createElement("span");
      piece.className = "confetti";
      piece.style.left = `${Math.random() * 100}%`;
      piece.style.animationDelay = `${Math.random() * 1.4}s`;
      piece.style.animationDuration = `${2 + Math.random() * 2}s`;
      piece.style.setProperty("--drift", `${Math.round(Math.random() * 220 - 110)}px`);
      layer.appendChild(piece);
    }
  }

  function showVaultFinale() {
    introScreen.classList.add("hidden");
    taskScreen.classList.add("hidden");
    celebrationScreen.classList.remove("hidden");
    celebrationScreen.style.display = "grid";
    celebrationScreen.innerHTML = `<div class="finale-particles" aria-hidden="true"></div>
      <div class="master-finale">
        <div class="finale-red-glow"></div>
        <div class="heist-character" aria-label="The Professor character">
          <div class="character-hood"><div class="character-face"><div class="character-eyes"></div><div class="character-mask"></div></div></div>
          <div class="character-body"></div><div class="character-label">THE PROFESSOR</div>
        </div>
        <div class="finale-vault"><div class="vault-ring"></div><div class="vault-lock">🔐</div></div>
        <div class="finale-completion">
          <p class="finale-eyebrow">MISSION 02 · CRACK THE CODE</p>
          <h1 class="finale-heading">YOU SUCCESSFULLY<br>COMPLETED</h1>
          <h2 class="finale-mission-name">CHANGE IN FORMULA</h2>
          <div class="finale-divider"></div>
          <p class="finale-subtitle">Every breakthrough begins with a question.<br>Your next chapter starts now.</p>
          <button class="finale-return-btn" id="returnMainButton" type="button">RETURN TO MAIN PAGE ↗</button>
        </div>
        <div class="finale-sparks" aria-hidden="true">${Array.from({ length: 24 }, (_, i) => `<span style="--i:${i}"></span>`).join("")}</div>
      </div>`;

    createFinaleCelebration(celebrationScreen);
    $("returnMainButton").addEventListener("click", () => { window.location.href = "index.html"; });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function createFinaleCelebration(screen) {
    const layer = screen.querySelector(".finale-particles");
    if (!layer) return;
    layer.replaceChildren();
    const symbols = ["🍫", "🍬", "🪙", "✦", "◆", "🎊", "✨", "🍫"];
    for (let i = 0; i < 130; i++) {
      const particle = document.createElement("span");
      particle.className = "finale-particle";
      particle.textContent = symbols[i % symbols.length];
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.animationDelay = `${Math.random() * 3}s`;
      particle.style.animationDuration = `${3 + Math.random() * 4}s`;
      particle.style.setProperty("--drift", `${Math.random() * 220 - 110}px`);
      layer.appendChild(particle);
    }
    for (let i = 0; i < 10; i++) {
      const firework = document.createElement("span");
      firework.className = "firework";
      firework.style.left = `${12 + Math.random() * 76}%`;
      firework.style.top = `${10 + Math.random() * 55}%`;
      firework.style.animationDelay = `${i * 0.45}s`;
      layer.appendChild(firework);
    }
  }

  function startMusic() {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) {
      musicLabel.textContent = "UNAVAILABLE";
      return;
    }
    if (!audioContext) audioContext = new AudioContextClass();
    audioContext.resume().then(() => {
      if (!musicOn || musicNodes.length) return;
      const master = audioContext.createGain();
      master.gain.value = 0.025;
      master.connect(audioContext.destination);
      musicNodes.push(master);
      [110, 164.81, 220, 329.63].forEach((frequency, index) => {
        const oscillator = audioContext.createOscillator();
        const gain = audioContext.createGain();
        oscillator.type = index === 1 ? "triangle" : "sine";
        oscillator.frequency.value = frequency;
        gain.gain.value = index === 0 ? 0.35 : 0.12;
        oscillator.connect(gain);
        gain.connect(master);
        oscillator.start();
        musicNodes.push(oscillator, gain);
      });
      let pulse = 0;
      musicTimer = window.setInterval(() => {
        if (!musicOn || !audioContext) return;
        pulse += 0.04;
        master.gain.setTargetAtTime(0.018 + (Math.sin(pulse) + 1) * 0.006, audioContext.currentTime, 0.4);
      }, 300);
    }).catch(() => { musicLabel.textContent = "TAP TO RETRY"; });
  }

  function stopMusic() {
    if (musicTimer) window.clearInterval(musicTimer);
    musicTimer = null;
    musicNodes.forEach((node) => {
      try {
        if (typeof node.stop === "function") node.stop();
        if (typeof node.disconnect === "function") node.disconnect();
      } catch (_) {}
    });
    musicNodes = [];
  }

  musicButton.addEventListener("click", () => {
    musicOn = !musicOn;
    musicButton.setAttribute("aria-pressed", String(musicOn));
    musicLabel.textContent = musicOn ? "MUSIC ON" : "MUSIC OFF";
    if (musicOn) startMusic(); else stopMusic();
  });

  beginButton.addEventListener("click", () => {
    renderTask();
    if (musicOn) startMusic();
  });

  // Resume the correct screen if the page is refreshed.
  if (progress.vaultUnlocked) {
    showVaultFinale();
  } else {
    renderIntro();
    introScreen.classList.remove("hidden");
    taskScreen.classList.add("hidden");
    celebrationScreen.classList.add("hidden");
  }
})();
