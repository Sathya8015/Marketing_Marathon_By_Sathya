
(() => {
  const vault = document.getElementById("sleepingVault");
  const character = document.getElementById("vaultCharacter");
  const status = document.getElementById("vaultStatus");
  const caption = document.getElementById("vaultCaption");

  if (!vault || !character || !status || !caption) return;

  let sleepTimer;

  function wakeVault() {
    vault.classList.add("awake");

    status.textContent = "✦ GOLDEN VAULT IS AWAKE ✦";
    caption.textContent =
      "I'm awake! Move your mouse and I'll follow you.";

    clearTimeout(sleepTimer);

    sleepTimer = setTimeout(() => {
      vault.classList.remove("awake");
      character.style.transform = "";

      status.textContent = "Zzz... VAULT IS SLEEPING";
      caption.textContent =
        "Shhh... the Golden Vault is sleeping. Move your mouse to wake it up!";
    }, 3500);
  }

  document.addEventListener("mousemove", (event) => {
    const rect = vault.getBoundingClientRect();

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const currentX = (event.clientX - centerX) / rect.width;
    const currentY = (event.clientY - centerY) / rect.height;

    const rotateY = Math.max(-14, Math.min(14, currentX * 25));
    const rotateX = Math.max(-10, Math.min(10, -currentY * 18));

    character.style.transform =
      `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

    vault.querySelectorAll(".eye-pupil").forEach((pupil) => {
      pupil.style.left = `${50 + currentX * 45}%`;
      pupil.style.top = `${12 + currentY * 5}px`;
    });

    wakeVault();
  });

  vault.addEventListener("click", wakeVault);

  vault.addEventListener("touchstart", wakeVault, {
    passive: true
  });

  vault.addEventListener("touchmove", wakeVault, {
    passive: true
  });
})();
