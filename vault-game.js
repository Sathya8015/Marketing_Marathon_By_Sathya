
(() => {
  const $ = (id) => document.getElementById(id);

  const vaultGame = $("vaultGame");
  const gameVault = $("gameVault");
  const keyhole = $("vaultKeyhole");
  const keyCursor = $("goldenKeyCursor");
  const message = $("vaultGameMessage");
  const instruction = $("vaultInstruction");
  const victory = $("vaultVictory");
  const exitButton = $("vaultExitButton");
  const victoryButton = $("vaultVictoryButton");

  if (
    !vaultGame ||
    !gameVault ||
    !keyhole ||
    !keyCursor ||
    !message ||
    !instruction ||
    !victory
  ) {
    console.error("Vault game: Required HTML elements are missing.");
    return;
  }

  let gameActive = false;
  let keyInserting = false;
  let vaultUnlocked = false;
  let lastTrailTime = 0;

  // Start the vault game without saving anything.
  function showVaultGame() {
    gameActive = true;
    keyInserting = false;
    vaultUnlocked = false;

    vaultGame.classList.remove("hidden");
    vaultGame.classList.remove("victory-mode");
    gameVault.classList.remove("unlocked");
    victory.classList.add("hidden");

    document.body.classList.add("golden-key-active");

    keyCursor.style.display = "block";
    keyCursor.style.opacity = "1";
    keyCursor.style.transition = "";
    keyCursor.style.transform =
      "translate(-50%, -50%) rotate(-35deg)";

    keyCursor.style.left = `${window.innerWidth / 2}px`;
    keyCursor.style.top = `${window.innerHeight / 2}px`;

    message.textContent =
      "Mission 5 completed! Use your golden key to unlock the vault.";

    instruction.textContent = "INSERT THE GOLDEN KEY";

    if (victoryButton) {
      victoryButton.disabled = false;
      victoryButton.textContent = "CLAIM YOUR VICTORY ✦";
    }

    console.log("Golden Key Vault Game started!");
  }

  // Golden sparkle trail.
  function createTrail(x, y) {
    const particle = document.createElement("span");

    particle.className = "key-trail-particle";
    particle.style.left =
      `${x + (Math.random() * 18 - 9)}px`;
    particle.style.top =
      `${y + (Math.random() * 18 - 9)}px`;

    document.body.appendChild(particle);

    setTimeout(() => particle.remove(), 800);
  }

  // Golden key follows the mouse.
  document.addEventListener("mousemove", (event) => {
    if (!gameActive || vaultUnlocked || keyInserting) return;

    keyCursor.style.left = `${event.clientX}px`;
    keyCursor.style.top = `${event.clientY}px`;

    const now = performance.now();

    if (now - lastTrailTime > 45) {
      createTrail(event.clientX, event.clientY);
      lastTrailTime = now;
    }
  });

  // Touchscreen support.
  document.addEventListener("touchmove", (event) => {
    if (!gameActive || vaultUnlocked || keyInserting) return;

    const touch = event.touches[0];
    if (!touch) return;

    keyCursor.style.left = `${touch.clientX}px`;
    keyCursor.style.top = `${touch.clientY}px`;
  }, { passive: true });

  // Click the vault keyhole to unlock.
  keyhole.addEventListener("click", () => {
    if (!gameActive || vaultUnlocked || keyInserting) return;

    keyInserting = true;

    const rect = keyhole.getBoundingClientRect();
    const targetX = rect.left + rect.width / 2;
    const targetY = rect.top + rect.height / 2;

    message.textContent = "Golden key detected... unlocking vault!";
    instruction.textContent = "KEY ACCEPTED";

    keyCursor.style.transition =
      "left .5s ease, top .5s ease, transform .5s ease, opacity .3s ease";

    keyCursor.style.left = `${targetX}px`;
    keyCursor.style.top = `${targetY}px`;
    keyCursor.style.transform =
      "translate(-50%, -50%) rotate(0deg) scale(.45)";

    setTimeout(() => {
  keyCursor.style.opacity = "0";

  // Restore the normal mouse cursor when the vault opens.
  document.body.classList.remove("golden-key-active");

  gameVault.classList.add("unlocked");

      message.textContent =
        "ACCESS GRANTED — THE VAULT IS OPEN!";
      instruction.textContent = "VAULT UNLOCKED";

      setTimeout(() => {
        vaultUnlocked = true;

        vaultGame.classList.add("victory-mode");
        victory.classList.remove("hidden");

        message.textContent =
          "Congratulations! You completed the Golden Key Challenge.";

        launchVaultCelebration();
      }, 1700);
    }, 520);
  });

  // Celebration particles.
  function launchVaultCelebration() {
    for (let i = 0; i < 120; i++) {
      const particle = document.createElement("span");

      particle.className = "key-trail-particle";
      particle.style.left =
        `${Math.random() * window.innerWidth}px`;
      particle.style.top =
        `${Math.random() * window.innerHeight}px`;

      const size = 3 + Math.random() * 6;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.animationDuration =
        `${1 + Math.random() * 2}s`;

      vaultGame.appendChild(particle);

      setTimeout(() => particle.remove(), 3000);
    }
  }

  // Return to the dashboard.
  exitButton?.addEventListener("click", () => {
    vaultGame.classList.add("hidden");
    document.body.classList.remove("golden-key-active");

    keyCursor.style.display = "none";
    keyCursor.style.opacity = "1";
    keyCursor.style.transition = "";
    keyCursor.style.transform =
      "translate(-50%, -50%) rotate(-35deg)";

    gameActive = false;
    keyInserting = false;
    vaultUnlocked = false;

    gameVault.classList.remove("unlocked");
    vaultGame.classList.remove("victory-mode");
    victory.classList.add("hidden");
  });

  // Claim victory.
  victoryButton?.addEventListener("click", () => {
    message.textContent =
      "YOUR JOURNEY IS COMPLETE. YOU ARE A TRUE VAULT HUNTER!";

    victoryButton.textContent = "VICTORY CLAIMED ✓";
    victoryButton.disabled = true;
  });

  // Allow Mission 5 to start the game.
  window.startVaultGame = showVaultGame;

})();
