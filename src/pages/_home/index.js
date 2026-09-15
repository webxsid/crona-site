const revealSections = [...document.querySelectorAll(".home-reveal")];
if (revealSections.length) {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (reducedMotion.matches || !("IntersectionObserver" in window)) {
    revealSections.forEach((section) => section.classList.add("is-visible"));
  } else {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12 },
    );
    revealSections.forEach((section) => revealObserver.observe(section));
  }
}

const demoVideo = document.querySelector("[data-demo-video]");

if (demoVideo) {
  const demoStatus = document.querySelector("[data-demo-status]");
  const demoPlay = document.querySelector("[data-demo-play]");
  const demoFlows = [...document.querySelectorAll("[data-demo-flow]")];
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const videoFrame = demoVideo.closest(".home-video-frame");
  const controls = document.querySelector("[data-demo-controls]");
  const toggleButton = controls?.querySelector("[data-demo-toggle]");
  const muteButton = controls?.querySelector("[data-demo-mute]");
  const seekInput = controls?.querySelector("[data-demo-seek]");
  const currentTime = controls?.querySelector("[data-demo-current]");
  const durationTime = controls?.querySelector("[data-demo-duration]");
  const sources = {
    open: {
      label: "Open TUI · recorded workflow",
      webm: demoVideo.querySelector("[data-demo-webm]").src,
      mp4: demoVideo.querySelector("[data-demo-mp4]").src,
    },
    timer: {
      label: "Start a timer · recorded workflow",
      webm: demoVideo.dataset.timerWebm,
      mp4: demoVideo.dataset.timerMp4,
    },
    pomodoro: {
      label: "Run Pomodoro · recorded workflow",
      webm: demoVideo.dataset.pomodoroWebm,
      mp4: demoVideo.dataset.pomodoroMp4,
    },
  };

  const selectDemo = (key) => {
    const source = sources[key] ?? sources.open;
    const webm = demoVideo.querySelector("[data-demo-webm]");
    const mp4 = demoVideo.querySelector("[data-demo-mp4]");
    webm.src = source.webm;
    mp4.src = source.mp4;
    demoVideo.load();
    demoVideo.play().catch(() => {});
    videoFrame?.classList.remove("is-ended");
    demoStatus.textContent = source.label;
    demoFlows.forEach((button) => {
      const active = button.dataset.demoFlow === key;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
      button.style.setProperty("--demo-progress", "0%");
    });
  };

  demoFlows.forEach((button) =>
    button.addEventListener("click", () => selectDemo(button.dataset.demoFlow)),
  );
  document.addEventListener("keydown", (event) => {
    if (event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return;
    if (
      event.target instanceof HTMLElement &&
      ["INPUT", "TEXTAREA", "SELECT"].includes(event.target.tagName)
    )
      return;
    const flowIndex = Number(event.key) - 1;
    if (flowIndex < 0 || flowIndex >= demoFlows.length) return;
    event.preventDefault();
    demoFlows[flowIndex].click();
  });
  demoPlay?.addEventListener("click", () => {
    demoVideo.currentTime = 0;
    demoVideo.play().catch(() => {});
    videoFrame?.classList.remove("is-ended");
  });
  const formatTime = (seconds) => {
    if (!Number.isFinite(seconds) || seconds < 0) return "00:00";
    const minutes = Math.floor(seconds / 60);
    const remainder = Math.floor(seconds % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes.toString().padStart(2, "0")}:${remainder}`;
  };
  const syncPlayState = () => {
    const isPlaying = !demoVideo.paused && !demoVideo.ended;
    if (toggleButton) {
      toggleButton.textContent = isPlaying ? "pause" : "play";
      toggleButton.setAttribute("aria-label", isPlaying ? "Pause video" : "Play video");
    }
    videoFrame?.classList.toggle("is-playing", isPlaying);
  };
  const syncVolumeState = () => {
    if (!muteButton) return;
    const muted = demoVideo.muted || demoVideo.volume === 0;
    muteButton.textContent = muted ? "sound off" : "sound on";
    muteButton.setAttribute("aria-label", muted ? "Unmute video" : "Mute video");
    muteButton.setAttribute("aria-pressed", String(!muted));
  };
  const syncTimeState = () => {
    const progress =
      Number.isFinite(demoVideo.duration) && demoVideo.duration > 0
        ? (demoVideo.currentTime / demoVideo.duration) * 100
        : 0;
    if (seekInput) seekInput.value = String(progress);
    if (currentTime) currentTime.textContent = formatTime(demoVideo.currentTime);
    if (durationTime) durationTime.textContent = formatTime(demoVideo.duration);
  };
  toggleButton?.addEventListener("click", () => {
    if (demoVideo.paused || demoVideo.ended) {
      if (demoVideo.ended) demoVideo.currentTime = 0;
      demoVideo.play().catch(() => {});
      videoFrame?.classList.remove("is-ended");
    } else {
      demoVideo.pause();
    }
  });
  muteButton?.addEventListener("click", () => {
    demoVideo.muted = !demoVideo.muted;
    if (!demoVideo.muted && demoVideo.volume === 0) demoVideo.volume = 1;
    syncVolumeState();
  });
  seekInput?.addEventListener("input", () => {
    if (!Number.isFinite(demoVideo.duration) || demoVideo.duration <= 0) return;
    demoVideo.currentTime = (Number(seekInput.value) / 100) * demoVideo.duration;
  });
  ["play", "pause", "loadedmetadata", "durationchange", "volumechange"].forEach((eventName) => {
    demoVideo.addEventListener(eventName, () => {
      syncPlayState();
      syncVolumeState();
      syncTimeState();
    });
  });
  demoVideo.addEventListener("timeupdate", () => {
    if (!Number.isFinite(demoVideo.duration) || demoVideo.duration <= 0) return;
    const progress = `${Math.min(100, (demoVideo.currentTime / demoVideo.duration) * 100)}%`;
    syncTimeState();
    const active = demoFlows.find((button) => button.classList.contains("is-active"));
    active?.style.setProperty("--demo-progress", progress);
  });
  demoVideo.addEventListener("ended", () => {
    const active = demoFlows.find((button) => button.classList.contains("is-active"));
    active?.style.setProperty("--demo-progress", "0%");
    videoFrame?.classList.add("is-ended");
    syncPlayState();
  });

  controls?.classList.add("is-ready");
  demoVideo.removeAttribute("controls");
  syncPlayState();
  syncVolumeState();
  syncTimeState();
  if (!reducedMotion.matches) demoVideo.play().catch(() => {});
}
