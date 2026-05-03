const scriptLinks = {
  macos: "https://github.com/webxsid/crona/releases/latest/download/install-crona-tui.sh",
  linux: "https://github.com/webxsid/crona/releases/latest/download/install-crona-tui.sh",
  windows: "https://github.com/webxsid/crona/releases/latest/download/install-crona-tui.ps1",
};

document.querySelectorAll("[data-install-tabs]").forEach((root) => {
  const tabs = [...root.querySelectorAll("[data-install-tab]")];
  const panels = [...root.querySelectorAll("[data-install-panel]")];
  const copyButton = root.querySelector("[data-copy-command]");
  const scriptLink = root.querySelector("[data-script-link]");

  const setActive = (target) => {
    tabs.forEach((tab) => {
      tab.setAttribute("aria-selected", String(tab.dataset.installTab === target));
    });

    panels.forEach((panel) => {
      panel.hidden = panel.dataset.installPanel !== target;
    });

    if (copyButton) {
      copyButton.textContent = "[ copy ]";
    }

    if (target && scriptLink) {
      scriptLink.href = scriptLinks[target];
    }
  };

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => setActive(tab.dataset.installTab));
  });

  copyButton?.addEventListener("click", async () => {
    const activePanel = panels.find((panel) => !panel.hidden);
    const command = activePanel?.querySelector("code")?.textContent?.trim();

    if (!command || !navigator.clipboard) {
      return;
    }

    try {
      await navigator.clipboard.writeText(command);
      copyButton.textContent = "[ copied ]";
      window.setTimeout(() => {
        copyButton.textContent = "[ copy ]";
      }, 1600);
    } catch {
      copyButton.textContent = "[ copy ]";
    }
  });
});
