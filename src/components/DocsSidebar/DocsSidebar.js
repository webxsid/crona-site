const normalize = (value) =>
  (value || "")
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .replace(/[-_]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const isSubsequence = (needle, haystack) => {
  if (!needle) {
    return true;
  }

  let pointer = 0;

  for (const char of haystack) {
    if (char === needle[pointer]) {
      pointer += 1;
      if (pointer === needle.length) {
        return true;
      }
    }
  }

  return false;
};

const scoreEntry = (query, entry) => {
  const normalizedQuery = normalize(query);
  if (!normalizedQuery) {
    return 0;
  }

  const normalizedTitle = normalize(entry.title);
  const normalizedDescription = normalize(entry.description);
  const normalizedGroup = normalize(entry.groupTitle);
  const normalizedSearch = normalize(entry.searchText);
  const tokens = normalizedQuery.split(" ").filter(Boolean);

  let score = 0;

  if (normalizedTitle === normalizedQuery) {
    score += 300;
  }

  if (normalizedTitle.startsWith(normalizedQuery)) {
    score += 180;
  } else if (normalizedTitle.includes(normalizedQuery)) {
    score += 120;
  }

  if (normalizedDescription.includes(normalizedQuery)) {
    score += 45;
  }

  if (normalizedGroup.includes(normalizedQuery)) {
    score += 35;
  }

  for (const token of tokens) {
    if (normalizedTitle.includes(token)) {
      score += 40;
    } else if (normalizedDescription.includes(token)) {
      score += 18;
    } else if (normalizedGroup.includes(token)) {
      score += 14;
    } else if (normalizedSearch.includes(token)) {
      score += 10;
    } else if (isSubsequence(token, normalizedSearch)) {
      score += 6;
    } else {
      return 0;
    }
  }

  if (score === 0 && isSubsequence(normalizedQuery.replace(/\s+/g, ""), normalizedSearch.replace(/\s+/g, ""))) {
    score = 12;
  }

  return score;
};

document.querySelectorAll("[data-docs-sidebar]").forEach((root) => {
  const toggle = root.querySelector("[data-docs-sidebar-toggle]");
  const closeButton = root.querySelector("[data-docs-sidebar-close]");
  const backdrop = root.querySelector("[data-docs-sidebar-backdrop]");
  const panel = root.querySelector("[data-docs-sidebar-panel]");
  const input = root.querySelector("[data-docs-search-input]");
  const note = root.querySelector("[data-docs-search-note]");
  const results = root.querySelector("[data-docs-search-results]");
  const resultsList = root.querySelector("[data-docs-search-results-list]");
  const empty = root.querySelector("[data-docs-search-empty]");
  const nav = root.querySelector("[data-docs-sidebar-nav]");
  const indexNode = root.querySelector("[data-docs-search-index]");
  const activeLink = root.querySelector(".is-active");

  if (!toggle || !closeButton || !backdrop || !panel || !input || !results || !resultsList || !empty || !nav || !indexNode) {
    return;
  }

  const isEditableTarget = (target) =>
    target instanceof HTMLElement &&
    (target.isContentEditable ||
      ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName) ||
      target.closest("[contenteditable='true']"));

  let index = [];

  try {
    index = JSON.parse(indexNode.textContent || "[]");
  } catch {
    index = [];
  }

  const mobileMedia = window.matchMedia("(max-width: 1023px)");
  let lastTrigger = null;

  const isMobile = () => mobileMedia.matches;
  const isOpen = () => root.dataset.mobileOpen === "true";

  const syncMenuState = (open) => {
    root.dataset.mobileOpen = open ? "true" : "false";
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    panel.setAttribute("aria-hidden", open ? "false" : "true");
    backdrop.hidden = !open;
    backdrop.setAttribute("aria-hidden", open ? "false" : "true");

    if (open) {
      document.body.classList.add("docs-menu-open");
    } else {
      document.body.classList.remove("docs-menu-open");
    }
  };

  const closeMenu = ({ restoreFocus = true } = {}) => {
    if (!isOpen()) {
      return;
    }

    syncMenuState(false);

    if (restoreFocus && lastTrigger instanceof HTMLElement) {
      lastTrigger.focus();
    }
  };

  const openMenu = ({ focusSearch = false } = {}) => {
    if (!isMobile()) {
      if (focusSearch) {
        input.focus();
        input.select();
      }
      return;
    }

    syncMenuState(true);

    requestAnimationFrame(() => {
      if (focusSearch) {
        input.focus();
        input.select();
      } else {
        closeButton.focus();
      }
    });
  };

  const renderResults = (query) => {
    const normalizedQuery = normalize(query);

    if (!normalizedQuery) {
      results.hidden = true;
      empty.hidden = true;
      nav.hidden = false;
      resultsList.innerHTML = "";
      if (note) {
        note.textContent = "Search by page title, category, or topic.";
      }
      return;
    }

    const matches = index
      .map((entry) => ({ entry, score: scoreEntry(normalizedQuery, entry) }))
      .filter((item) => item.score > 0)
      .sort((left, right) => right.score - left.score || left.entry.title.localeCompare(right.entry.title))
      .slice(0, 8);

    nav.hidden = true;
    results.hidden = false;
    resultsList.innerHTML = "";

    if (matches.length === 0) {
      empty.hidden = false;
      if (note) {
        note.textContent = "Try a shorter phrase or a page title.";
      }
      return;
    }

    empty.hidden = true;
    if (note) {
      note.textContent = `${matches.length} result${matches.length === 1 ? "" : "s"} for “${query.trim()}”.`;
    }

    for (const { entry } of matches) {
      const li = document.createElement("li");
      const link = document.createElement("a");
      const meta = document.createElement("span");
      const title = document.createElement("strong");

      link.href = entry.href;
      link.className = "docs-sidebar__result";

      meta.className = "docs-sidebar__result-group";
      meta.textContent = entry.groupTitle;

      title.textContent = entry.title;

      link.append(meta, title);
      li.append(link);
      resultsList.append(li);
    }
  };

  const revealActiveLink = () => {
    if (!(activeLink instanceof HTMLElement) || nav.hidden) {
      return;
    }

    activeLink.scrollIntoView({
      block: "nearest",
      inline: "nearest",
    });
  };

  input.addEventListener("input", () => renderResults(input.value));
  input.addEventListener("search", () => renderResults(input.value));
  input.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") {
      return;
    }

    event.preventDefault();
    if (isMobile() && isOpen()) {
      closeMenu();
      return;
    }

    input.blur();
  });

  toggle.addEventListener("click", () => {
    lastTrigger = toggle;

    if (isOpen()) {
      closeMenu();
      return;
    }

    openMenu();
  });

  closeButton.addEventListener("click", () => closeMenu());
  backdrop.addEventListener("click", () => closeMenu());

  panel.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) {
      return;
    }

    const link = target.closest("a[href]");
    if (!link || !isMobile()) {
      return;
    }

    closeMenu({ restoreFocus: false });
  });

  document.addEventListener("keydown", (event) => {
    if (event.defaultPrevented) {
      return;
    }

    if (isEditableTarget(event.target)) {
      return;
    }

    const isSlashShortcut = event.key === "/" && !event.metaKey && !event.ctrlKey && !event.altKey;
    const isCommandKShortcut =
      event.key.toLowerCase() === "k" && event.metaKey && !event.ctrlKey && !event.altKey;

    if (!isSlashShortcut && !isCommandKShortcut) {
      if (event.key === "Escape" && isMobile() && isOpen()) {
        event.preventDefault();
        closeMenu();
      }
      return;
    }

    event.preventDefault();
    lastTrigger = toggle;
    openMenu({ focusSearch: true });
  });

  mobileMedia.addEventListener("change", () => {
    if (!isMobile()) {
      syncMenuState(false);
    }
  });

  syncMenuState(false);
  requestAnimationFrame(revealActiveLink);
});
