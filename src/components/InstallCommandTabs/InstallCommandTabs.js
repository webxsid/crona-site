document.querySelectorAll("[data-install-tabs]").forEach((root) => {
  const tabs = [...root.querySelectorAll("[data-install-tab]")];
  const panels = [...root.querySelectorAll("[data-install-panel]")];
  const copyButtons = [...root.querySelectorAll("[data-copy-command]")];

  const setActive = (target) => {
    tabs.forEach((tab) => {
      tab.setAttribute("aria-selected", String(tab.dataset.installTab === target));
    });

    panels.forEach((panel) => {
      panel.hidden = panel.dataset.installPanel !== target;
    });

    copyButtons.forEach((button) => {
      button.textContent = "[ copy ]";
    });
  };

  tabs.filter((tab) => !tab.disabled).forEach((tab) => {
    tab.addEventListener("click", () => setActive(tab.dataset.installTab));
  });

  copyButtons.forEach((button) => {
    button.addEventListener("click", async () => {
      const block = button.closest("[data-copy-block]") ?? button.closest(".install-tabs__block");
      const code = block?.querySelector("code");
      const command = code?.textContent?.trim() ?? "";

      if (!command || !navigator.clipboard) {
        return;
      }

      try {
        await navigator.clipboard.writeText(command);
        button.textContent = "[ copied ]";
        window.setTimeout(() => {
          button.textContent = "[ copy ]";
        }, 1600);
      } catch {
        button.textContent = "[ copy ]";
      }
    });
  });
});
