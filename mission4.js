"use strict";

const $ = (id) => document.getElementById(id);

const STORAGE_KEY = "insideIntelMission4";
const form = $("missionForm");
const saveStatus = $("saveStatus");

const irbItems = [
  ["IRB 1", "First IRB line and the brand where you saw it"],
  ["IRB 2", "Second IRB line and the brand where you saw it"],
  ["IRB 3", "Third IRB line and the brand where you saw it"],
  ["IRB 4", "Fourth IRB line and the brand where you saw it"],
  ["IRB 5", "Fifth IRB line and the brand where you saw it"]
];

const usageChannels = [
  "Email",
  "Whatsapp Messages",
  "Ads",
  "Pamphlets / Hoardings",
  "Exhibition",
  "Website / Landing Page",
  "Lead Magnets",
  "Reels / Organic Content",
  "SEO Marketing Titles",
  "Anywhere else"
];

const customerQuestions = [
  ["demographics", "Who are they? Mention demographic details."],
  ["feelings", "What do they feel mostly?"],
  ["identity", "Who do they want to become?"],
  ["fears", "What are their fears and frustrations?"],
  ["needs", "What are their logical problems and needs?"],
  ["desires", "What are their visible wants and desires?"],
  ["secret", "What do they secretly crave but rarely express?"]
];

const bankCategories = [
  {
    title: "CATEGORY 1 — REEL HOOKS",
    subtitle: "Write five hooks that make your audience stop scrolling.",
    items: ["IRB 1-1", "IRB 1-2", "IRB 1-3", "IRB 1-4", "IRB 1-5"]
  },
  {
    title: "CATEGORY 2 — AD LINES",
    subtitle: "Write five strong ad lines that create curiosity and encourage clicks.",
    items: ["IRB 2-1", "IRB 2-2", "IRB 2-3", "IRB 2-4", "IRB 2-5"]
  },
  {
    title: "CATEGORY 3 — 4C CURIOSITY",
    subtitle: "Write five IRBs that make people curious enough to approach you for the 4C.",
    items: ["IRB 3-1", "IRB 3-2", "IRB 3-3", "IRB 3-4", "IRB 3-5"]
  },
  {
    title: "CATEGORY 4 — SIT MESSAGES",
    subtitle: "Write five SIT messages that make your audience feel you are different.",
    items: ["IRB 4-1", "IRB 4-2", "IRB 4-3", "IRB 4-4", "IRB 4-5"]
  },
  {
    title: "CATEGORY 5 — LEAD MAGNETS",
    subtitle: "Create five lead magnets that attract people towards your CTA.",
    items: ["IRB 5-1", "IRB 5-2", "IRB 5-3", "IRB 5-4", "IRB 5-5"]
  }
];

function makeReviewFields(prefix) {
  return `
    <details class="review-details">
      <summary>Captain & BEE Team Review</summary>

      <label class="field-label" for="${prefix}_captainScore">
        Captain's Score
      </label>
      <input
        class="text-input"
        id="${prefix}_captainScore"
        name="${prefix}_captainScore"
        type="number"
        min="0"
        placeholder="Score"
      >

      <label class="field-label" for="${prefix}_captainFeedback">
        Captain's Feedback
      </label>
      <textarea
        id="${prefix}_captainFeedback"
        name="${prefix}_captainFeedback"
        placeholder="Captain's comments..."
      ></textarea>

      <label class="field-label" for="${prefix}_beeScore">
        BEE Team Score
      </label>
      <input
        class="text-input"
        id="${prefix}_beeScore"
        name="${prefix}_beeScore"
        type="number"
        min="0"
        placeholder="Score"
      >

      <label class="field-label" for="${prefix}_beeFeedback">
        BEE Feedback
      </label>
      <textarea
        id="${prefix}_beeFeedback"
        name="${prefix}_beeFeedback"
        placeholder="BEE Team comments..."
      ></textarea>
    </details>
  `;
}

function makeAnswerCard(prefix, title, description) {
  return `
    <article class="answer-card">
      <div class="card-kicker">${title}</div>

      <label class="field-label" for="${prefix}_answer">
        ${description}
      </label>
      <textarea
        id="${prefix}_answer"
        name="${prefix}_answer"
        placeholder="Write your answer here..."
      ></textarea>

      <label class="field-label" for="${prefix}_document">
        Supporting Document (optional)
      </label>
      <input
        id="${prefix}_document"
        name="${prefix}_document"
        type="file"
        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.xlsx,.xls"
      >
      <span class="file-name" id="${prefix}_fileName">
        No document selected
      </span>

      <label class="field-label" for="${prefix}_feedback">
        Your Feedback (optional)
      </label>
      <textarea
        id="${prefix}_feedback"
        name="${prefix}_feedback"
        placeholder="Your comments..."
      ></textarea>

      ${makeReviewFields(prefix)}
    </article>
  `;
}

/* SECTION 1: IRB CHECK */

$("irbCheckList").innerHTML = irbItems.map((item, index) => {
  const prefix = `irbCheck${index + 1}`;

  return makeAnswerCard(
    prefix,
    item[0],
    item[1]
  );
}).join("");

/* SECTION 2: USAGE OF IRB */

$("usageOptions").innerHTML = usageChannels.map((channel, index) => {
  const id = `usage_${index + 1}`;

  return `
    <label class="check-option">
      <input
        type="checkbox"
        id="${id}"
        name="usageChannels"
        value="${channel}"
      >
      <span>${channel}</span>
    </label>
  `;
}).join("");

/* SECTION 3: IDEAL CUSTOMER IDENTIFICATION */

$("customerProfiles").innerHTML = [1, 2, 3].map((profileNumber) => {
  const prefix = `customer${profileNumber}`;

  const questions = customerQuestions.map((question, index) => {
    const id = `${prefix}_${question[0]}`;
    const wideClass = index === 0 || index === 3 || index === 6
      ? "wide"
      : "";

    return `
      <div class="${wideClass}">
        <label class="field-label" for="${id}">
          ${index + 1}. ${question[1]}
        </label>
        <textarea
          id="${id}"
          name="${id}"
          placeholder="Describe your ideal customer..."
        ></textarea>
      </div>
    `;
  }).join("");

  return `
    <article class="profile-card">
      <h3>IDEAL CUSTOMER ${profileNumber}</h3>
      <div class="profile-prompts">
        ${questions}
      </div>

      <label class="field-label" for="${prefix}_feedback">
        Your Feedback / Notes
      </label>
      <textarea
        id="${prefix}_feedback"
        name="${prefix}_feedback"
        placeholder="Additional observations..."
      ></textarea>

      ${makeReviewFields(prefix)}
    </article>
  `;
}).join("");

/* SECTION 4: IRB BANK */

$("irbBankList").innerHTML = bankCategories.map((category, index) => {
  const items = category.items.map((item, itemIndex) => {
    const prefix = `bank_${index + 1}_${itemIndex + 1}`;

    return `
      <div class="bank-item">
        <label for="${prefix}_answer">${item}</label>
        <textarea
          id="${prefix}_answer"
          name="${prefix}_answer"
          placeholder="Write an original, attention-grabbing IRB..."
        ></textarea>

        <label class="field-label" for="${prefix}_feedback">
          Your Feedback (optional)
        </label>
        <textarea
          id="${prefix}_feedback"
          name="${prefix}_feedback"
          placeholder="Notes or improvements..."
        ></textarea>

        ${makeReviewFields(prefix)}
      </div>
    `;
  }).join("");

  return `
    <article class="bank-category">
      <h3>${category.title}</h3>
      <p>${category.subtitle}</p>
      <div class="bank-items">
        ${items}
      </div>
    </article>
  `;
}).join("");

/* AUTO-SAVE */

function collectAnswers() {
  const data = {};

  form.querySelectorAll("input:not([type='file']), textarea, select")
    .forEach((element) => {
      if (!element.name) return;

      if (element.type === "checkbox") {
        if (!data[element.name]) data[element.name] = [];
        if (element.checked) data[element.name].push(element.value);
      } else if (element.type === "radio") {
        if (element.checked) data[element.name] = element.value;
      } else {
        data[element.name] = element.value;
      }
    });

  return data;
}

function saveProgress(showMessage = true) {
  try {
    const data = collectAnswers();

    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      answers: data,
      completed: false,
      updatedAt: new Date().toISOString()
    }));

    if (showMessage) {
      saveStatus.textContent = "✓ Progress saved successfully on this device.";
    }

    updateProgress();
    return true;
  } catch (error) {
    saveStatus.textContent =
      "Could not save progress. Check your browser storage settings.";
    return false;
  }
}

function restoreProgress() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return;

    const parsed = JSON.parse(stored);
    const data = parsed.answers || {};

    Object.entries(data).forEach(([name, value]) => {
      const elements = form.querySelectorAll(`[name="${CSS.escape(name)}"]`);

      elements.forEach((element) => {
        if (element.type === "checkbox") {
          element.checked = Array.isArray(value) && value.includes(element.value);
        } else if (element.type === "radio") {
          element.checked = value === element.value;
        } else if (element.type !== "file") {
          element.value = value ?? "";
        }
      });
    });

    if (parsed.completed) {
      saveStatus.textContent = "✓ Your previous submission is marked complete.";
    } else {
      saveStatus.textContent = "✓ Your previous progress has been restored.";
    }
  } catch (error) {
    saveStatus.textContent = "A previous save could not be restored.";
  }
}

/* PROGRESS BAR */

function updateProgress() {
  const allAnswerFields = [
    ...form.querySelectorAll(
      "textarea, input:not([type='file']):not([type='radio']):not([type='checkbox']), input[type='radio']"
    )
  ];

  const answerFields = allAnswerFields.filter((element) => {
    return !element.name.includes("captainScore") &&
      !element.name.includes("captainFeedback") &&
      !element.name.includes("beeScore") &&
      !element.name.includes("beeFeedback");
  });

  const filled = answerFields.filter((element) => {
    if (element.type === "radio") {
      return element.checked;
    }
    return element.value.trim() !== "";
  }).length;

  const checkedCount = form.querySelectorAll(
    'input[type="checkbox"][name="usageChannels"]:checked'
  ).length;

  const total = answerFields.length + 1;
  const percent = Math.min(
    100,
    Math.round(((filled + (checkedCount > 0 ? 1 : 0)) / total) * 100)
  );

  $("progressPercent").textContent = percent;
  $("progressBar").style.width = `${percent}%`;

  if (percent === 100) {
    $("progressText").textContent = "All answer fields are filled. Review before submitting!";
  } else {
    $("progressText").textContent =
      `${filled} answer fields filled. Keep going, agent!`;
  }
}

form.addEventListener("input", () => {
  updateProgress();
  saveProgress(false);
});

form.addEventListener("change", (event) => {
  updateProgress();
  saveProgress(false);

  if (event.target.type === "file") {
    const nameElement = $(`${event.target.id}Name`);

    if (nameElement) {
      nameElement.textContent = event.target.files?.[0]?.name ||
        "No document selected";
    }

    saveStatus.textContent =
      "Document selected. Note: file contents are not saved in browser storage.";
  }
});

$("saveBtn").addEventListener("click", () => {
  saveProgress(true);
});

/* DOWNLOAD ANSWERS */

$("exportBtn").addEventListener("click", () => {
  const data = collectAnswers();

  const exportData = {
    mission: "Mission 4 - Inside Intel",
    exportedAt: new Date().toISOString(),
    answers: data,
    selectedDocuments: [...form.querySelectorAll('input[type="file"]')]
      .filter((input) => input.files && input.files.length > 0)
      .map((input) => ({
        field: input.name,
        fileName: input.files[0].name
      }))
  };

  const blob = new Blob(
    [JSON.stringify(exportData, null, 2)],
    { type: "application/json" }
  );

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = "Mission4_Inside_Intel_Answers.json";

  document.body.appendChild(link);
  link.click();
  link.remove();

  URL.revokeObjectURL(url);
  saveStatus.textContent = "✓ Answers downloaded as a JSON file.";
});

/* MISSION COMPLETION */

function launchCelebration() {
  const layer = $("confettiLayer");
  layer.innerHTML = "";

  const colors = [
    "#38f6ff",
    "#ff4ecb",
    "#a78bfa",
    "#ffe66d",
    "#5dffb0",
    "#ffffff"
  ];

  for (let i = 0; i < 110; i++) {
    const piece = document.createElement("span");

    piece.className = "confetti";
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.background = colors[
      Math.floor(Math.random() * colors.length)
    ];
    piece.style.animationDuration = `${2 + Math.random() * 4}s`;
    piece.style.animationDelay = `${Math.random() * 1.8}s`;
    piece.style.transform = `rotate(${Math.random() * 360}deg)`;

    layer.appendChild(piece);
  }

  $("celebration").classList.remove("hidden");
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const data = collectAnswers();

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      answers: data,
      completed: true,
      updatedAt: new Date().toISOString()
    }));

    saveStatus.textContent = "✓ Mission completed and saved!";
    launchCelebration();
  } catch (error) {
    saveStatus.textContent =
      "Unable to save the final submission. Please use Download Answers.";
  }
});

$("closeCelebration").addEventListener("click", () => {
  $("celebration").classList.add("hidden");
});

$("continueBtn").addEventListener("click", () => {
  window.location.href = "index.html";
});

/* MUSIC TOGGLE — GENERATED BACKGROUND TUNE */

let audioContext = null;
let masterGain = null;
let musicTimer = null;
let musicOn = false;
let noteIndex = 0;

const melody = [
  220, 261.63, 329.63, 392,
  329.63, 293.66, 261.63, 196
];

function playNote() {
  if (!audioContext || !masterGain || !musicOn) return;

  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();

  oscillator.type = "sine";
  oscillator.frequency.value = melody[noteIndex % melody.length];

  gain.gain.setValueAtTime(0.0001, audioContext.currentTime);
  gain.gain.exponentialRampToValueAtTime(
    0.045,
    audioContext.currentTime + 0.04
  );
  gain.gain.exponentialRampToValueAtTime(
    0.0001,
    audioContext.currentTime + 0.32
  );

  oscillator.connect(gain);
  gain.connect(masterGain);

  oscillator.start();
  oscillator.stop(audioContext.currentTime + 0.34);

  noteIndex++;
}

async function toggleMusic() {
  const button = $("musicToggle");

  if (musicOn) {
    musicOn = false;
    clearInterval(musicTimer);

    if (masterGain && audioContext) {
      masterGain.gain.setTargetAtTime(
        0,
        audioContext.currentTime,
        0.05
      );
    }

    button.textContent = "♫ Music: OFF";
    return;
  }

  try {
    const AudioContextClass =
      window.AudioContext || window.webkitAudioContext;

    if (!AudioContextClass) {
      button.textContent = "Music unavailable";
      return;
    }

    if (!audioContext) {
      audioContext = new AudioContextClass();
      masterGain = audioContext.createGain();
      masterGain.gain.value = 0.65;
      masterGain.connect(audioContext.destination);
    }

    await audioContext.resume();

    musicOn = true;
    masterGain.gain.setTargetAtTime(
      0.65,
      audioContext.currentTime,
      0.1
    );

    playNote();
    musicTimer = setInterval(playNote, 380);

    button.textContent = "♫ Music: ON";
  } catch (error) {
    button.textContent = "♫ Music: OFF";
    musicOn = false;
  }
}

$("musicToggle").addEventListener("click", toggleMusic);

/* STARTUP */

restoreProgress();
updateProgress();