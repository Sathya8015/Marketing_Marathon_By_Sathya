
const $ = (id) => document.getElementById(id);

const STORAGE_KEY = "beeMission5UnlockVault_v2";

const sections = [
  {
    title: "Understanding Your Customer",
    subtitle: "Get clarity on your customers before presenting your 4C.",
    short: "Customer Clarity",
    questions: [
      ["1.1", "Who is your Ideal Customer whom you are preparing this 4C for?"],
      ["1.2", "What is the Biggest Problem they are facing right now?"],
      ["1.3", "What keeps them Awake all night?"],
      ["1.4", "What Outcome do they desperately want?"],
      ["1.5", "What is the Cost of Not Solving the Problem?"],
      ["1.6", "What have they already tried and did not work?"],
      ["1.7", "What are their Biggest Fears before buying from someone like you?"],
      ["1.8", "What Objections do they typically have?"]
    ]
  },
  {
    title: "C1 — Create Authority",
    subtitle: "Build trust with your experience, proof, results and personal story.",
    short: "Create Authority",
    questions: [
      ["2.1", "Why should customers trust you?"],
      ["2.2", "What results have you personally achieved?"],
      ["2.3", "What results have your customers achieved?"],
      ["2.4", "What unique experience or expertise do you have?"],
      ["2.5", "What mistakes have you made already and overcome?"],
      ["2.6", "What proof can you show?"],
      ["2.7", "What is your Big Promise?"],
      ["2.8", "What is your Biggest Success Story?"],
      ["2.9", "If a customer asks you, “Why should I listen to you?” — What would you say?"],
      ["2.10", "Create your Personal Authority Story — not more than 2 minutes. Why do you do what you do?"],
      ["2.11", "Create a Customer Success Story — From here to there."],
      ["2.12", "Showcase your Top 5 Testimonials."],
      ["2.13", "What is your Credibility Statement?"],
      ["2.14", "What is your C1 Script?"]
    ]
  },
  {
    title: "C2 — Cultivate Value",
    subtitle: "Choose a C2 topic and develop three valuable concepts for your ideal customer.",
    short: "Cultivate Value",
    questions: [
      ["3.1", "Which type of C2 are you choosing?", "Select the content format or type you plan to use."],
      ["3.2", "Key Concept / Point — 1"],
      ["3.3", "Explanation structure for Key Concept 1"],
      ["3.4", "Case Studies / Examples for Key Concept 1"],
      ["3.5", "Key Concept / Point — 2"],
      ["3.6", "Explanation structure for Key Concept 2"],
      ["3.7", "Case Studies / Examples for Key Concept 2"],
      ["3.8", "Key Concept / Point — 3"],
      ["3.9", "Explanation structure for Key Concept 3"],
      ["3.10", "Case Studies / Examples for Key Concept 3"]
    ]
  },
  {
    title: "C3 — Connect C2 & C4",
    subtitle: "Recap your value, build agreement and address customer objections.",
    short: "Connect & Convert",
    questions: [
      ["4.1", "Part 1 — Recap of C2. What key ideas and benefits will you recap?"],
      ["4.2", "Yes Question 1: Would you agree that the problem we discussed today is real and needs to be solved? Rewrite this for your industry."],
      ["4.3", "Yes Question 2: Can you see how continuing with the current approach may keep giving you the same results? Rewrite this for your industry."],
      ["4.4", "Yes Question 3: Does the framework/detail I've shared today make sense to you? Rewrite this for your industry."],
      ["4.5", "Yes Question 4: Would achieving this result make a meaningful difference to your life or business? Rewrite this for your industry."],
      ["4.6", "No Question: Based on what you've learned today, if you continue doing things exactly as you are right now, do you believe you'll achieve the result you truly want? Adapt this to your industry."],
      ["4.7", "Objection 1 — Why do customers hesitate?"],
      ["4.8", "What supporting story or case study do you have to handle Objection 1?"],
      ["4.9", "Objection 2 — What fears stop customers from buying?"],
      ["4.10", "What supporting story or case study do you have to handle Objection 2?"],
      ["4.11", "Objection 3 — What risks do customers perceive?"],
      ["4.12", "What supporting story or case study do you have to handle Objection 3?"],
      ["4.13", "What more objections can you think of?"],
      ["4.14", "What supporting story or case study do you have to handle the additional objections?"]
    ]
  },
  {
    title: "C4 — Closing",
    subtitle: "Build a clear, compelling offer and create your final closing script.",
    short: "Close the Sale",
    questions: [
      ["5.1", "What exactly are you selling?"],
      ["5.2", "What transformation are customers buying?"],
      ["5.3", "What bonuses can you add?"],
      ["5.4", "What guarantees can you offer?"],
      ["5.5", "What support can you provide?"],
      ["5.6", "Why should customers act now?"],
      ["5.7", "What happens if they delay?"],
      ["5.8", "How can you make the offer irresistible?"],
      ["5.9", "C4 Script — Define your No-Brainer Offer."]
    ]
  },
  {
    title: "Learning from Achievers",
    subtitle: "Learn from a BEE Real People, Real Stories speaker and record your takeaways.",
    short: "Learn & Grow",
    questions: [
      ["6.1", "Whose success story have you watched from BEE this week?"],
      ["6.2", "What are your top takeaways?"],
      ["6.3", "Have you shared the takeaways in the comments of the YouTube video?"]
    ]
  }
];

let currentSection = 0;
let answers = loadAnswers();
let audioContext = null;
let musicNodes = [];
let musicEnabled = false;
let toastTimer = null;

function loadAnswers() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    return saved && typeof saved === "object" && !Array.isArray(saved)
      ? saved
      : {};
  } catch {
    return {};
  }
}

function saveAnswers(showMessage = false) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
    $("saveStatus").textContent = "Progress saved locally";

    if (showMessage) {
      showToast("Progress saved successfully.");
    }
  } catch {
    $("saveStatus").textContent = "Unable to save — export your answers";
    showToast("Browser storage unavailable. Download your answers to keep a copy.");
  }

  updateProgress();
}

function getKey(sectionIndex, questionIndex) {
  return `${sectionIndex}_${questionIndex}`;
}

function getAnswer(sectionIndex, questionIndex, field) {
  const item = answers[getKey(sectionIndex, questionIndex)] || {};
  return typeof item[field] === "string" ? item[field] : "";
}

function setAnswer(sectionIndex, questionIndex, field, value) {
  const key = getKey(sectionIndex, questionIndex);

  if (!answers[key]) {
    answers[key] = {};
  }

  answers[key][field] = value;
  saveAnswers();
}

function answeredCount() {
  return Object.values(answers).filter(
    item =>
      item &&
      typeof item.answer === "string" &&
      item.answer.trim().length > 0
  ).length;
}

function totalQuestions() {
  return sections.reduce(
    (total, section) => total + section.questions.length,
    0
  );
}

function sectionAnsweredCount(sectionIndex) {
  return sections[sectionIndex].questions.filter((_, questionIndex) =>
    getAnswer(sectionIndex, questionIndex, "answer").trim().length > 0
  ).length;
}

function isSectionComplete(sectionIndex) {
  return sectionAnsweredCount(sectionIndex) ===
    sections[sectionIndex].questions.length;
}

function updateProgress() {
  const total = totalQuestions();
  const answered = answeredCount();
  const percent = total ? Math.round((answered / total) * 100) : 0;

  $("progressFill").style.width = `${percent}%`;
  $("progressPercent").textContent = `${percent}%`;
  $("progressStat").textContent = `${String(percent).padStart(2, "0")}%`;
  $("answeredStat").textContent = String(answered).padStart(2, "0");

  $("progressHeading").textContent = percent === 100
    ? "Every answer is in. The vault is ready."
    : `${answered} of ${total} questions answered`;

  renderChapterNav();
}

function renderChapterNav() {
  const nav = $("chapterNav");
  nav.innerHTML = "";

  sections.forEach((section, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "chapter-link";

    if (index === currentSection) button.classList.add("active");
    if (isSectionComplete(index)) button.classList.add("completed");

    const number = document.createElement("span");
    number.className = "chapter-index";
    number.textContent = isSectionComplete(index)
      ? "✓"
      : String(index + 1).padStart(2, "0");

    const textWrap = document.createElement("span");
    textWrap.className = "chapter-text";

    const title = document.createElement("strong");
    title.textContent = section.short;

    const small = document.createElement("small");
    small.textContent =
      `${sectionAnsweredCount(index)} / ${section.questions.length} answered`;

    textWrap.append(title, small);
    button.append(number, textWrap);
    button.addEventListener("click", () => showSection(index));

    nav.appendChild(button);
  });
}

function makeField(sectionIndex, questionIndex, field, placeholder, short = false) {
  const textarea = document.createElement("textarea");

  textarea.className = `answer-input${short ? " short-answer" : ""}`;
  textarea.value = getAnswer(sectionIndex, questionIndex, field);
  textarea.placeholder = placeholder;
  textarea.setAttribute("aria-label", placeholder);
  textarea.dataset.section = sectionIndex;
  textarea.dataset.question = questionIndex;
  textarea.dataset.field = field;

  if (textarea.value.trim()) {
    textarea.classList.add("filled");
  }

  textarea.addEventListener("input", () => {
    setAnswer(sectionIndex, questionIndex, field, textarea.value);

    textarea.classList.toggle("filled", textarea.value.trim().length > 0);

    const card = textarea.closest(".question-card");
    const answerField = card.querySelector('[data-field="answer"]');

    card.classList.toggle(
      "has-answer",
      Boolean(answerField && answerField.value.trim())
    );

    renderChapterNav();

    $("sectionCount").textContent =
      `Section ${currentSection + 1} of ${sections.length} · ` +
      `${sectionAnsweredCount(currentSection)} / ` +
      `${sections[currentSection].questions.length} answered`;
  });

  return textarea;
}

function renderQuestions(sectionIndex) {
  const container = $("questionContainer");
  container.innerHTML = "";

  sections[sectionIndex].questions.forEach((question, questionIndex) => {
    const [number, prompt, hint] = question;

    const card = document.createElement("article");
    card.className = "question-card";

    const top = document.createElement("div");
    top.className = "question-top";

    const numberEl = document.createElement("span");
    numberEl.className = "question-number";
    numberEl.textContent = number;

    const copy = document.createElement("div");
    copy.className = "question-copy";

    const heading = document.createElement("h3");
    heading.textContent = prompt;
    copy.appendChild(heading);

    if (hint) {
      const hintEl = document.createElement("p");
      hintEl.textContent = hint;
      copy.appendChild(hintEl);
    }

    top.append(numberEl, copy);

    const answer = makeField(
      sectionIndex,
      questionIndex,
      "answer",
      "Write your detailed answer here..."
    );

    const support = makeField(
      sectionIndex,
      questionIndex,
      "support",
      "Supporting document link / evidence (optional)",
      true
    );

    support.style.minHeight = "55px";
    support.style.marginTop = "9px";

    const feedback = makeField(
      sectionIndex,
      questionIndex,
      "feedback",
      "Your feedback or notes (optional)",
      true
    );

    feedback.style.minHeight = "55px";
    feedback.style.marginTop = "9px";

    const supportLabel = document.createElement("p");
    supportLabel.className = "eyebrow";
    supportLabel.style.margin = "15px 0 7px";
    supportLabel.textContent = "SUPPORTING DOCUMENT · OPTIONAL";

    const feedbackLabel = document.createElement("p");
    feedbackLabel.className = "eyebrow";
    feedbackLabel.style.margin = "15px 0 7px";
    feedbackLabel.textContent = "YOUR FEEDBACK · OPTIONAL";

    card.append(
      top,
      answer,
      supportLabel,
      support,
      feedbackLabel,
      feedback
    );

    if (answer.value.trim()) {
      card.classList.add("has-answer");
    }

    container.appendChild(card);
  });
}

function showSection(index) {
  currentSection = Math.max(0, Math.min(index, sections.length - 1));

  const section = sections[currentSection];

  $("sectionNumber").textContent =
    `CHAPTER ${String(currentSection + 1).padStart(2, "0")} / ` +
    `${String(sections.length).padStart(2, "0")}`;

  $("sectionTitle").textContent = section.title;
  $("sectionDescription").textContent = section.subtitle;
  $("sectionBadge").textContent = String(currentSection + 1).padStart(2, "0");

  $("previousButton").disabled = currentSection === 0;

  $("nextButton").textContent =
    currentSection === sections.length - 1
      ? "Complete Mission ✦"
      : "Save & Continue →";

  $("sectionCount").textContent =
    `Section ${currentSection + 1} of ${sections.length} · ` +
    `${sectionAnsweredCount(currentSection)} / ${section.questions.length} answered`;

  renderQuestions(currentSection);
  renderChapterNav();

  $("finale").classList.add("hidden");
  $("magicKeyScene")?.classList.add("hidden");

  document.querySelector(".workspace").classList.remove("hidden");

  if (window.innerWidth < 760) {
    document.querySelector(".content-panel").scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }
}

function showToast(message) {
  const toast = $("toast");
  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(toastTimer);

  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2400);
}

/* ==========================================
   MISSION COMPLETION + MAGIC KEY ANIMATION
========================================== */


function completeMission(event) {
  saveAnswers();
  $("finalAnswered").textContent = answeredCount();

  const scene = $("magicKeyScene");
  const magicKey = $("magicKey");

  // Hide the workspace and show the original golden key scene.
  document.querySelector(".workspace").classList.add("hidden");
  $("finale").classList.add("hidden");

  if (scene && magicKey) {
    const x = event && Number.isFinite(event.clientX)
      ? event.clientX
      : window.innerWidth / 2;

    const y = event && Number.isFinite(event.clientY)
      ? event.clientY
      : window.innerHeight / 2;

    scene.style.setProperty("--cursor-x", `${x}px`);
    scene.style.setProperty("--cursor-y", `${y}px`);

    scene.classList.remove("hidden", "magic-start");
    magicKey.classList.remove("key-materialize");

    void scene.offsetWidth;

    scene.classList.add("magic-start");
    magicKey.classList.add("key-materialize");

    createMagicParticles();
    launchConfetti();
  } else {
    $("finale").classList.remove("hidden");
    launchConfetti();
  }

  showToast("Mission 5 completed! The Golden Key has appeared!");

  // Give the golden key animation time to play.
  setTimeout(() => {
    window.location.href = "index.html?vault=1";
  }, 4500);
}



function createMagicParticles() {
  const container = $("magicParticles");
  if (!container) return;

  container.innerHTML = "";

  for (let i = 0; i < 85; i++) {
    const particle = document.createElement("span");
    particle.className = "magic-particle";

    const angle = Math.random() * Math.PI * 2;
    const distance = 60 + Math.random() * 260;

    particle.style.setProperty(
      "--dx",
      `${Math.cos(angle) * distance}px`
    );

    particle.style.setProperty(
      "--dy",
      `${Math.sin(angle) * distance}px`
    );

    particle.style.setProperty(
      "--size",
      `${2 + Math.random() * 5}px`
    );

    particle.style.setProperty(
      "--duration",
      `${1.5 + Math.random() * 2}s`
    );

    particle.style.setProperty(
      "--delay",
      `${Math.random() * 0.8}s`
    );

    container.appendChild(particle);
  }
}

function launchConfetti() {
  const holder = $("celebration");
  if (!holder) return;

  holder.innerHTML = "";
  holder.classList.remove("hidden");

  for (let i = 0; i < 100; i++) {
    const piece = document.createElement("span");
    piece.className = "confetti-piece";

    piece.style.left = `${Math.random() * 100}%`;
    piece.style.animationDelay = `${Math.random() * 1.5}s`;
    piece.style.animationDuration = `${2.5 + Math.random() * 2}s`;

    piece.style.setProperty(
      "--drift",
      `${Math.random() * 200 - 100}px`
    );

    holder.appendChild(piece);
  }

  setTimeout(() => {
    holder.classList.add("hidden");
    holder.innerHTML = "";
  }, 6000);
}

/* ==========================================
   DOWNLOAD ANSWERS AS JSON
========================================== */

function downloadAnswers() {
  const report = {
    mission: "Mission 5 - Unlock the Vault - 4C Sales in Action",
    exportedAt: new Date().toISOString(),
    answeredQuestions: answeredCount(),
    totalQuestions: totalQuestions(),

    sections: sections.map((section, sectionIndex) => ({
      section: section.title,

      questions: section.questions.map((question, questionIndex) => {
        const saved = answers[getKey(sectionIndex, questionIndex)] || {};

        return {
          number: question[0],
          question: question[1],
          answer: saved.answer || "",
          supportingDocument: saved.support || "",
          feedback: saved.feedback || ""
        };
      })
    }))
  };

  const blob = new Blob(
    [JSON.stringify(report, null, 2)],
    { type: "application/json;charset=utf-8" }
  );

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = "Mission5_4C_Sales_Report.json";

  document.body.appendChild(link);
  link.click();
  link.remove();

  setTimeout(() => URL.revokeObjectURL(url), 1000);

  showToast("Your mission report download has started.");
}

/* ==========================================
   OPTIONAL AMBIENT VAULT SOUND
========================================== */

async function toggleMusic() {
  const button = $("musicToggle");

  if (musicEnabled) {
    musicNodes.forEach(node => {
      try {
        if (typeof node.stop === "function") node.stop();
      } catch {}

      try {
        node.disconnect();
      } catch {}
    });

    musicNodes = [];
    musicEnabled = false;

    button.textContent = "♫ SOUND: OFF";
    button.classList.remove("active");
    return;
  }

  try {
    const AudioContextClass =
      window.AudioContext || window.webkitAudioContext;

    if (!AudioContextClass) {
      showToast("Audio is not supported by this browser.");
      return;
    }

    if (!audioContext) {
      audioContext = new AudioContextClass();
    }

    await audioContext.resume();

    [55, 82.41, 110].forEach((frequency, index) => {
      const oscillator = audioContext.createOscillator();
      const gain = audioContext.createGain();

      oscillator.type = index === 1 ? "sine" : "triangle";
      oscillator.frequency.value = frequency;
      gain.gain.value = index === 0 ? 0.025 : 0.012;

      oscillator.connect(gain);
      gain.connect(audioContext.destination);
      oscillator.start();

      musicNodes.push(oscillator, gain);
    });

    musicEnabled = true;

    button.textContent = "♫ SOUND: ON";
    button.classList.add("active");

    showToast("Ambient vault sound enabled.");
  } catch {
    showToast("Could not start audio. Please try again.");
  }
}

/* ==========================================
   EVENT LISTENERS
========================================== */

$("previousButton").addEventListener("click", () => {
  saveAnswers();

  if (currentSection > 0) {
    showSection(currentSection - 1);
  }
});

$("nextButton").addEventListener("click", event => {
  saveAnswers();

  if (currentSection < sections.length - 1) {
    showSection(currentSection + 1);
  } else {
    completeMission(event);
  }
});

$("downloadButton").addEventListener("click", downloadAnswers);

$("reviewButton").addEventListener("click", () => {
  $("finale").classList.add("hidden");
  $("magicKeyScene")?.classList.add("hidden");
  showSection(0);
});

$("musicToggle").addEventListener("click", toggleMusic);

const magicContinue = $("magicContinue");

if (magicContinue) {
  magicContinue.addEventListener("click", () => {
    $("magicKeyScene").classList.add("hidden");
    $("finale").classList.remove("hidden");

    $("finale").scrollIntoView({
      behavior: "smooth",
      block: "center"
    });
  });
}

/* ==========================================
   START MISSION
========================================== */

showSection(0);
updateProgress();
