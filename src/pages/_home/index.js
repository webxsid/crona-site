const modal = document.querySelector("[data-install-modal]");
const openButton = document.querySelector("[data-install-open]");

if (modal && openButton) {
  const dialog = modal.querySelector("[role=dialog]");
  const closeButtons = [...modal.querySelectorAll("[data-install-close]")];
  const tabs = [...modal.querySelectorAll("[data-install-platform]")];
  const panels = [...modal.querySelectorAll("[data-install-panel]")];
  const copyButtons = [...modal.querySelectorAll("[data-install-copy]")];
  const installLinks = [...document.querySelectorAll('a[href="/#install"]')];
  const validPlatforms = new Set(["macos", "linux", "windows", "go"]);
  let returnFocus = openButton;

  const detectedPlatform = () => {
    const platform = navigator.platform.toLowerCase();
    const userAgent = navigator.userAgent.toLowerCase();
    if (platform.includes("win") || userAgent.includes("windows")) return "windows";
    if (platform.includes("linux") || userAgent.includes("linux")) return "linux";
    return "macos";
  };

  const platformFromHash = () => {
    const value = window.location.hash.replace(/^#install-?/, "").toLowerCase();
    return validPlatforms.has(value) ? value : detectedPlatform();
  };

  const setPlatform = (platform) => {
    const next = validPlatforms.has(platform) ? platform : detectedPlatform();
    tabs.forEach((tab) => {
      const active = tab.dataset.installPlatform === next;
      tab.setAttribute("aria-selected", String(active));
      tab.tabIndex = active ? 0 : -1;
    });
    panels.forEach((panel) => { panel.hidden = panel.dataset.installPanel !== next; });
  };

  const openModal = (platform = platformFromHash(), shouldUpdateHash = true) => {
    returnFocus = document.activeElement instanceof HTMLElement ? document.activeElement : openButton;
    setPlatform(platform);
    modal.hidden = false;
    document.body.classList.add("has-install-modal");
    dialog?.focus();
    if (shouldUpdateHash) window.history.replaceState(null, "", `#install-${platform}`);
  };

  const closeModal = (shouldClearHash = true) => {
    modal.hidden = true;
    document.body.classList.remove("has-install-modal");
    returnFocus?.focus();
    if (shouldClearHash && window.location.hash.startsWith("#install")) window.history.replaceState(null, "", window.location.pathname + window.location.search);
  };

  openButton.addEventListener("click", () => openModal());
  installLinks.forEach((link) => link.addEventListener("click", (event) => { event.preventDefault(); openModal(); }));
  closeButtons.forEach((button) => button.addEventListener("click", () => closeModal()));
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => openModal(tab.dataset.installPlatform));
    tab.addEventListener("keydown", (event) => {
      if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
      event.preventDefault();
      const current = tabs.indexOf(tab);
      const next = event.key === "ArrowRight" ? (current + 1) % tabs.length : (current - 1 + tabs.length) % tabs.length;
      tabs[next].focus();
      openModal(tabs[next].dataset.installPlatform);
    });
  });
  copyButtons.forEach((button) => {
    button.addEventListener("click", async () => {
      const command = button.closest(".install-modal__command")?.querySelector("code")?.textContent?.trim() ?? "";
      if (!command || !navigator.clipboard) return;
      try {
        await navigator.clipboard.writeText(command);
        button.textContent = "[ copied ]";
        window.setTimeout(() => { button.textContent = "[ copy ]"; }, 1600);
      } catch { button.textContent = "[ copy ]"; }
    });
  });
  document.addEventListener("keydown", (event) => { if (event.key === "Escape" && !modal.hidden) closeModal(); });
  window.addEventListener("hashchange", () => {
    if (window.location.hash.startsWith("#install")) openModal(platformFromHash(), false);
    else if (!modal.hidden) closeModal(false);
  });
  if (window.location.hash.startsWith("#install")) openModal(platformFromHash(), false);
}

const demoVideo = document.querySelector("[data-demo-video]");

if (demoVideo) {
  const demoStatus = document.querySelector("[data-demo-status]");
  const demoFlows = [...document.querySelectorAll("[data-demo-flow]")];
  const sources = {
    open: { label: "Open TUI · recorded workflow", webm: demoVideo.querySelector("[data-demo-webm]").src, mp4: demoVideo.querySelector("[data-demo-mp4]").src },
    timer: { label: "Start a timer · recorded workflow", webm: demoVideo.dataset.timerWebm, mp4: demoVideo.dataset.timerMp4 },
    pomodoro: { label: "Run Pomodoro · recorded workflow", webm: demoVideo.dataset.pomodoroWebm, mp4: demoVideo.dataset.pomodoroMp4 }
  };

  const selectDemo = (key) => {
    const source = sources[key] ?? sources.open;
    const webm = demoVideo.querySelector("[data-demo-webm]");
    const mp4 = demoVideo.querySelector("[data-demo-mp4]");
    webm.src = source.webm;
    mp4.src = source.mp4;
    demoVideo.load();
    demoVideo.play().catch(() => {});
    demoStatus.textContent = source.label;
    demoFlows.forEach((button) => {
      const active = button.dataset.demoFlow === key;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
      button.style.setProperty("--demo-progress", "0%");
    });
  };

  demoFlows.forEach((button) => button.addEventListener("click", () => selectDemo(button.dataset.demoFlow)));
  demoVideo.addEventListener("timeupdate", () => {
    if (!Number.isFinite(demoVideo.duration) || demoVideo.duration <= 0) return;
    const progress = `${Math.min(100, (demoVideo.currentTime / demoVideo.duration) * 100)}%`;
    const active = demoFlows.find((button) => button.classList.contains("is-active"));
    active?.style.setProperty("--demo-progress", progress);
  });
  demoVideo.addEventListener("ended", () => {
    const active = demoFlows.find((button) => button.classList.contains("is-active"));
    active?.style.setProperty("--demo-progress", "0%");
  });
}
