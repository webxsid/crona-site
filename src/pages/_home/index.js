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
    panels.forEach((panel) => {
      panel.hidden = panel.dataset.installPanel !== next;
    });
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
  installLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      openModal();
    });
  });
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
      } catch {
        button.textContent = "[ copy ]";
      }
    });
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !modal.hidden) closeModal();
  });
  window.addEventListener("hashchange", () => {
    if (window.location.hash.startsWith("#install")) openModal(platformFromHash(), false);
    else if (!modal.hidden) closeModal(false);
  });
  if (window.location.hash.startsWith("#install")) openModal(platformFromHash(), false);
}

const demoTerminal = document.querySelector("[data-demo-terminal]");

if (demoTerminal) {
  const demoFlows = [...document.querySelectorAll("[data-demo-flow]")];
  const demoNav = [...demoTerminal.querySelectorAll("[data-demo-nav]")];
  const demoTitle = demoTerminal.querySelector("[data-demo-title]");
  const demoMeta = demoTerminal.querySelector("[data-demo-meta]");
  const demoDate = demoTerminal.querySelector("[data-demo-date]");
  const demoAction = demoTerminal.querySelector("[data-demo-action]");
  const demoContent = demoTerminal.querySelector("[data-demo-content]");
  let sessionState = "idle";
  let elapsedSeconds = 0;
  let timerId;

  const demoStates = {
    daily: {
      title: "Daily Dashboard",
      meta: "focus: 2h 15m  ·  issues: 3/8 resolved  ·  habits: 4/5 done",
      action: "[f] start focus",
      content: '<section class="home-tui__pane home-tui__pane--wide"><h3>Daily Context <em>Active</em></h3><div class="home-tui__bars"><span style="--value: 78%"></span><span style="--value: 52%"></span><span style="--value: 64%"></span><span style="--value: 36%"></span><span style="--value: 86%"></span></div><p>Plan the day, focus on the next issue, keep the signal visible.</p></section><section class="home-tui__pane"><h3>Issues <em>3/8 resolved</em></h3><ul><li class="is-done">Refine daily view</li><li>Document local engine</li><li>Review companion flow</li></ul></section><section class="home-tui__pane"><h3>Habits <em>4/5 done</em></h3><ul><li class="is-done">Morning check-in</li><li class="is-done">Deep work block</li><li>Walk away from desk</li></ul></section>'
    },
    issues: {
      title: "Issues",
      meta: "workspace  ·  3 open  ·  8 total  ·  stream: Dev",
      action: "[a] create issue  ·  [f] start focus  ·  [e] edit",
      content: '<section class="home-tui__pane home-tui__pane--wide"><h3>Open Issues <em>3 active</em></h3><ul><li class="is-done">Refine daily view <em>45m</em></li><li>Document local engine <em>30m</em></li><li>Review companion flow <em>60m</em></li><li>Polish release notes <em>20m</em></li></ul></section><section class="home-tui__pane"><h3>Context</h3><p>repo: crona-site<br>stream: Dev</p></section>'
    },
    meta: {
      title: "Meta",
      meta: "workspace structure  ·  repos / streams / issues / habits",
      action: "[c] checkout  ·  [a] create  ·  [e] edit",
      content: '<section class="home-tui__pane"><h3>Repos <em>2</em></h3><ul><li class="is-done">crona-site</li><li>crona</li></ul></section><section class="home-tui__pane"><h3>Streams <em>3</em></h3><ul><li class="is-done">Dev</li><li>Product</li><li>Personal</li></ul></section><section class="home-tui__pane home-tui__pane--wide"><h3>Current context</h3><p>crona-site / Dev · issues and focus are scoped to this workspace.</p></section>'
    },
    session: {
      title: "Active Session",
      meta: "WORK  00:24:18  ·  issue: Refine daily view  ·  estimate: 45m",
      action: "[p] pause  ·  [x] end session",
      content: '<section class="home-tui__pane home-tui__pane--wide home-tui__pane--session"><h3>Focus Session <em data-demo-clock>00:24:18</em></h3><div class="home-tui__session-line"><span></span></div><p>One focused block. The terminal keeps the issue, timer, and next action together.</p></section><section class="home-tui__pane"><h3>Context</h3><ul><li>repo: crona-site</li><li>stream: Dev</li><li class="is-done">issue selected</li></ul></section><section class="home-tui__pane"><h3>Next</h3><ul><li>Complete current block</li><li>Review session notes</li></ul></section>'
    },
    summary: {
      title: "Summary",
      meta: "today  ·  local state  ·  current streak: 8d",
      action: "[↑/↓] scroll  ·  [,/.] date",
      content: '<section class="home-tui__pane"><h3>At a glance</h3><ul><li>Issues <em>3/8 resolved</em></li><li>Worked <em>2h 15m</em></li><li>Accountability <em>78%</em></li></ul></section><section class="home-tui__pane"><h3>Signals</h3><ul><li>Energy <em>4/5</em></li><li>Focus <em>steady</em></li><li>Momentum <em>8 day streak</em></li></ul></section><section class="home-tui__pane home-tui__pane--wide"><h3>Agenda</h3><p>3 issues planned · 5 habits in motion · 1 focus session complete</p></section>'
    },
    wellbeing: {
      title: "Wellbeing",
      meta: "today  ·  check-in recorded  ·  window: 7d",
      action: "[w] check-in  ·  [,/.] date",
      content: '<section class="home-tui__pane home-tui__pane--wide"><h3>Daily Check-in <em>Recorded</em></h3><div class="home-tui__signals"><span style="--signal: 80%">mood</span><span style="--signal: 65%">energy</span><span style="--signal: 72%">sleep</span></div><p>Small signals, kept next to the work instead of in another app.</p></section><section class="home-tui__pane"><h3>Today</h3><ul><li>mood <em>4/5</em></li><li>energy <em>3/5</em></li><li>stress <em>2/5</em></li></ul></section>'
    },
    momentum: {
      title: "Momentum",
      meta: "focus / wellbeing / habits  ·  window: 30d",
      action: "[↑/↓] select  ·  [enter] details",
      content: '<section class="home-tui__pane home-tui__pane--wide"><h3>Focus Momentum <em>8 day streak</em></h3><div class="home-tui__heatmap">▂ ▃ ▅ ▆ ▇ ▅ ▃ ▄ ▆ ▇ ▇ ▅ ▃ ▂ ▄ ▆ ▇</div><p>See the shape of the work over time, not just the task list.</p></section><section class="home-tui__pane"><h3>Signals</h3><ul><li>focus <em>steady</em></li><li>check-ins <em>6/7</em></li><li>habits <em>82%</em></li></ul></section>'
    }
  };

  const formatClock = (seconds) => `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;

  const setDemoState = (view) => {
    const state = demoStates[view] ?? demoStates.daily;
    demoFlows.forEach((button) => button.classList.toggle("is-active", button.dataset.demoFlow === view));
    demoNav.forEach((button) => button.classList.toggle("is-active", button.dataset.demoNav === view));
    demoTitle.textContent = state.title;
    demoMeta.textContent = sessionState === "running" && view === "session" ? `${state.meta.split("·")[0]}·  issue: Refine daily view  ·  estimate: 45m` : state.meta;
    demoAction.textContent = sessionState === "running" && view === "session" ? "[p] pause  ·  [x] end session" : state.action;
    demoContent.innerHTML = state.content;
    const clock = demoContent.querySelector("[data-demo-clock]");
    if (clock) clock.textContent = formatClock(1458 + elapsedSeconds);
  };

  const startTimer = () => {
    window.clearInterval(timerId);
    timerId = window.setInterval(() => {
      if (sessionState !== "running") return;
      elapsedSeconds += 1;
      if (demoTitle.textContent === "Active Session") setDemoState("session");
    }, 1000);
  };

  const selectFlow = (flow) => {
    if (flow === "session") {
      sessionState = sessionState === "running" ? "paused" : "running";
      if (sessionState === "running") startTimer();
      else window.clearInterval(timerId);
    } else if (flow === "daily") {
      sessionState = "idle";
      elapsedSeconds = 0;
      window.clearInterval(timerId);
    }
    setDemoState(flow);
  };

  demoFlows.forEach((button) => button.addEventListener("click", () => selectFlow(button.dataset.demoFlow)));
  demoNav.forEach((button) => button.addEventListener("click", () => selectFlow(button.dataset.demoNav)));
  setDemoState("daily");
}
