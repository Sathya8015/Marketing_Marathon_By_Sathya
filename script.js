

const crews = [
  { name: "The Masterminds", motto: "Plan Smart. Play Big", leader: "Ratha Krishna" },
  { name: "The Codebreakers", motto: "Every challenge has a Code", leader: "Pravin" },
  { name: "The Vault Hunters", motto: "Find the Opportunity. Unlock the Vault", leader: "Ganesh Kumar" },
  { name: "The Keyholders", motto: "Action is the Key", leader: "Ramesh T" },
  { name: "The Insiders", motto: "Know More. Move Smarter", leader: "Sathish Kumar" },
  { name: "The Red Masks", motto: "One Crew. One Commitment", leader: "Santhosh V" },
  { name: "The Silent Operators", motto: "Let the Results make the Noise", leader: "Alageswari" },
  { name: "The Royal Mint", motto: "Create Value. Make it Count", leader: "Joel" },
  { name: "The Lock Breakers", motto: "Break Barriers. Build Momentum", leader: "Karthick DK" }
];

const missions = [
  {
    title: "The Master Plan",
    subtitle: "Clarity & Target Setting",
    icon: "♜",
    description: "Build clarity around your routines, business numbers, network, thoughts and learning habits.",
    tasks: [
      "Routines — identify three routines to change and the benefits.",
      "Numbers — record the previous month's business and marketing metrics.",
      "Network — identify contacts across business and personal areas.",
      "Thoughts — reflect on thinking patterns and mindful activities.",
      "Learning — review learning time and watch a BEE success story."
    ]
  },
  {
    title: "Crack the Code",
    subtitle: "Change in Formula",
    icon: "⌘",
    description: "Review your product, delivery process, customer market and marketing formula.",
    tasks: [
      "Product or Service — uniqueness, hidden demand and improvements.",
      "Delivery Process — simplify delivery and improve customer experience.",
      "Customer or Market — identify ideal and premium customers.",
      "Marketing — review messaging, systems and customer objections.",
      "Final Action Points — list changes to implement in five weeks."
    ]
  },
  {
    title: "Activate the Crew",
    subtitle: "Traffic Activation",
    icon: "♧",
    description: "Audit your existing contacts, uncover traffic opportunities and build relationships.",
    tasks: [
      "Reality Check — review contacts, enquiries and follow-ups.",
      "Traffic Audit — analyse owned, earned and paid traffic.",
      "Relationship Scorecard — rate relationship-building practices.",
      "21 Days SIT Plan — plan daily relationship-building activities.",
      "Learning from Achievers — watch a success story and record takeaways."
    ]
  },
  {
    title: "Inside Intel",
    subtitle: "Ideal Customer Identification & IRB Creation",
    icon: "◎",
    description: "Define your ideal customers and create a bank of 25 IRBs.",
    tasks: [
      "IRB Check — observe five IRBs and the associated brands.",
      "IRB Usage — review where you currently use IRBs.",
      "Ideal Customer — develop up to three customer profiles.",
      "IRB Bank — create 25 ideas across five content categories.",
      "Learning from Achievers — record your learning and share takeaways."
    ]
  },
  {
    title: "Unlock the Vault",
    subtitle: "4C Sales in Action",
    icon: "♢",
    description: "Prepare your 4C sales conversation, from customer understanding to closing.",
    tasks: [
      "Understand your Customer — problems, desired outcomes and objections.",
      "C1 — Create Authority through stories, proof and credibility.",
      "C2 — Cultivate Value with concepts and examples.",
      "C3 — Connect C2 & C4 using momentum and objection-handling questions.",
      "C4 — Closing with an offer, bonuses, support and a sales script."
    ]
  }
];

const $ = (id) => document.getElementById(id);

const welcomePage = $("welcomePage");
const dashboardPage = $("dashboardPage");
const detailPage = $("detailPage");
const detailContent = $("detailContent");

function loadCrews() {
  const select = $("crewSelect");
  if (!select) return;

  if (select.options.length <= 1) {
    crews.forEach((crew) => {
      const option = document.createElement("option");
      option.value = crew.name;
      option.textContent = crew.name;
      select.appendChild(option);
    });
  }
}

function updateCrewLeader() {
  const select = $("crewSelect");
  const leaderInput = $("crewLeader");

  if (!select || !leaderInput) return;

  const selectedCrew = crews.find(
    (crew) => crew.name === select.value
  );

  leaderInput.value = selectedCrew ? selectedCrew.leader : "";
}

function renderMissions() {
  const grid = $("missionGrid");
  if (!grid) return;

  grid.innerHTML = missions.map((mission, index) => `
    <button class="mission-card" type="button" data-mission="${index}">
      <span class="mission-number">MISSION 0${index + 1}</span>
      <span class="mission-icon">${mission.icon}</span>
      <h3>${mission.title}</h3>
      <p>${mission.subtitle}</p>
      <span class="open-link">OPEN MISSION ↗</span>
    </button>
  `).join("");
}

function renderCrews() {
  const grid = $("crewGrid");
  if (!grid) return;

  grid.innerHTML = crews.map((crew, index) => `
    <button class="crew-card" type="button" data-crew="${index}">
      <span class="crew-number">${String(index + 1).padStart(2, "0")}</span>
      <span>
        <strong>${crew.name}</strong>
        <small>${crew.motto}</small>
        <small class="leader">LEADER · ${crew.leader}</small>
      </span>
    </button>
  `).join("");
}

function showDashboard(profile) {
  $("displayName").textContent = profile.name;
  $("displayCrew").textContent =
    `${profile.crew} · Crew Leader: ${profile.leader}`;

  welcomePage.classList.add("hidden");
  detailPage.classList.add("hidden");
  dashboardPage.classList.remove("hidden");

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function showMission(index) {
  const mission = missions[index];
  if (!mission) return;

  detailContent.innerHTML = `
    <p class="eyebrow">MISSION 0${index + 1} · BRIEFING</p>
    <h2>${mission.title}</h2>
    <p class="detail-subtitle">${mission.subtitle}</p>
    <p>${mission.description}</p>

    <div class="detail-grid">
      ${mission.tasks.map((task, taskIndex) => `
        <article class="detail-item">
          <strong>TASK 0${taskIndex + 1}</strong>
          <p>${task}</p>
        </article>
      `).join("")}
    </div>

    <article class="detail-item">
      <strong>MISSION CHECKLIST</strong>
      <p>Use this checklist to track your initial progress.</p>
      <label>
        <input type="checkbox">
        I have reviewed this mission's objectives.
      </label>
      <label>
        <input type="checkbox">
        I have completed the required workbook tasks.
      </label>
    </article>

    <p class="form-note">
      This is the initial mission overview. Answer saving, assignment
      uploads and Captain approval can be implemented separately.
    </p>
  `;

  openDetail();
}

function showCrew(index) {
  const crew = crews[index];
  if (!crew) return;

  detailContent.innerHTML = `
    <p class="eyebrow">CREW HEADQUARTERS · DOSSIER 0${index + 1}</p>
    <h2>${crew.name}</h2>
    <p class="detail-subtitle">${crew.motto}</p>

    <div class="detail-grid">
      <article class="detail-item">
        <strong>CREW LEADER</strong>
        <p>${crew.leader}</p>
      </article>
      <article class="detail-item">
        <strong>CREW MOTTO</strong>
        <p>${crew.motto}</p>
      </article>
    </div>

    <p>
      This crew profile is ready for future member details,
      team progress and leaderboard integration.
    </p>
  `;

  openDetail();
}

function openDetail() {
  dashboardPage.classList.add("hidden");
  welcomePage.classList.add("hidden");
  detailPage.classList.remove("hidden");

  detailPage.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}

function goBack() {
  detailPage.classList.add("hidden");
  dashboardPage.classList.remove("hidden");

  $("missionSection").scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}

// Crew selection
$("crewSelect").addEventListener("change", updateCrewLeader);

// Registration: keep profile only for this page session.
// Do not save it to localStorage.
$("registrationForm").addEventListener("submit", (event) => {
  event.preventDefault();

  const name = $("participantName").value.trim();
  const mobile = $("mobileNumber").value.trim();

  const crew = crews.find(
    (item) => item.name === $("crewSelect").value
  );

  if (!name || !mobile || !crew) {
    alert("Please complete all registration fields.");
    return;
  }

  if (!/^[0-9+\-()\s]{7,20}$/.test(mobile)) {
    alert("Please enter a valid mobile number.");
    return;
  }

  const profile = {
    name,
    mobile,
    crew: crew.name,
    leader: crew.leader
  };

  showDashboard(profile);
});

// Mission navigation
$("missionGrid").addEventListener("click", (event) => {
  const card = event.target.closest("[data-mission]");
  if (!card) return;

  const index = Number(card.dataset.mission);
  const mission = missions[index];

  if (!mission) return;

  const missionPages = {
    "The Master Plan": "mission1.html",
    "Crack the Code": "mission2.html",
    "Activate the Crew": "mission3.html",
    "Inside Intel": "mission4.html",
    "Unlock the Vault": "mission5.html"
  };

  const targetPage = missionPages[mission.title];

  if (targetPage) {
    window.location.href = targetPage;
    return;
  }

  showMission(index);
});

// Crew details
$("crewGrid").addEventListener("click", (event) => {
  const card = event.target.closest("[data-crew]");
  if (card) {
    showCrew(Number(card.dataset.crew));
  }
});

// Back button
$("backButton").addEventListener("click", goBack);

// Edit profile: return to blank registration form
$("editProfile").addEventListener("click", () => {
  $("registrationForm").reset();
  $("crewLeader").value = "";

  dashboardPage.classList.add("hidden");
  detailPage.classList.add("hidden");
  welcomePage.classList.remove("hidden");

  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Initialize the website
loadCrews();
renderMissions();
renderCrews();
