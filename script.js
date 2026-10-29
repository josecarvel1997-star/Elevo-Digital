(() => {
  const config = window.ELEVO_CONFIG || {};
  const whatsapp = String(config.whatsappNumber || "").replace(/\D/g, "");
  const year = document.getElementById("current-year");
  if (year) year.textContent = new Date().getFullYear();

  // Canonical URL and organization data are emitted only after the official domain is configured.
  const configuredSiteUrl = String(config.siteUrl || "").trim();
  if (configuredSiteUrl) {
    try {
      const siteUrl = new URL(configuredSiteUrl);
      if (siteUrl.protocol === "https:") {
        siteUrl.hash = "";
        siteUrl.search = "";
        siteUrl.pathname = "/";
        const pagePath = window.location.pathname.replace(/\/index\.html$/i, "/");
        const canonicalUrl = new URL(pagePath, siteUrl);
        const canonical = document.querySelector('link[rel="canonical"]') || document.createElement("link");
        canonical.rel = "canonical";
        canonical.href = canonicalUrl.href;
        document.head.appendChild(canonical);

        const ogUrl = document.querySelector('meta[property="og:url"]') || document.createElement("meta");
        ogUrl.setAttribute("property", "og:url");
        ogUrl.content = canonicalUrl.href;
        document.head.appendChild(ogUrl);

        const organization = {
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Elevo Digital",
          url: siteUrl.href,
          description: document.querySelector('meta[name="description"]')?.content || "Soluções digitais para empresas.",
          knowsAbout: ["Criação de sites", "Landing pages", "Lojas virtuais", "Sistemas web sob medida", "Automação de processos", "Manutenção de sites", "Vídeos comerciais com IA"]
        };
        if (whatsapp) organization.contactPoint = { "@type": "ContactPoint", telephone: `+${whatsapp}`, contactType: "customer service", availableLanguage: "pt-BR" };
        const schema = document.createElement("script");
        schema.type = "application/ld+json";
        schema.textContent = JSON.stringify(organization);
        document.head.appendChild(schema);
      }
    } catch {
      // An invalid or placeholder domain must not produce misleading canonical metadata.
    }
  }

  const toast = document.getElementById("toast");
  let toastTimer;
  const notify = (message) => {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 3600);
  };
  const showQuote = (service) => {
    if (!whatsapp) {
      notify("O WhatsApp ainda não foi configurado. Consulte config.js para ativar os pedidos de orçamento.");
      return;
    }
    const message = `Olá! Tenho interesse em ${service}. Pode me passar mais informações?`;
    window.open(`https://wa.me/${whatsapp}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  };

  document.querySelectorAll("[data-quote]").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      showQuote(link.dataset.quote || "Orçamento geral");
    });
  });
  document.querySelectorAll('[data-contact="whatsapp"]').forEach((link) => {
    if (!whatsapp) link.classList.add("not-configured");
    link.addEventListener("click", (event) => {
      event.preventDefault();
      showQuote("conhecer as soluções da Elevo Digital");
    });
  });

  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".site-nav");
  if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
      const open = menuButton.getAttribute("aria-expanded") !== "true";
      menuButton.setAttribute("aria-expanded", String(open));
      menuButton.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
      nav.classList.toggle("open", open);
    });
    nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Abrir menu");
      nav.classList.remove("open");
    }));
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "Abrir menu");
        nav.classList.remove("open");
        menuButton.focus();
      }
    });
  }

  const tabs = [...document.querySelectorAll(".price-tab")];
  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => activateTab(tab));
    tab.addEventListener("keydown", (event) => {
      if (!["ArrowRight", "ArrowLeft", "Home", "End"].includes(event.key)) return;
      event.preventDefault();
      const next = event.key === "Home" ? 0 : event.key === "End" ? tabs.length - 1 : (index + (event.key === "ArrowRight" ? 1 : tabs.length - 1)) % tabs.length;
      activateTab(tabs[next]);
      tabs[next].focus();
    });
  });
  function activateTab(tab) {
    tabs.forEach((item) => {
      const active = item === tab;
      item.classList.toggle("active", active);
      item.setAttribute("aria-selected", String(active));
      item.tabIndex = active ? 0 : -1;
      const panel = document.getElementById(item.dataset.tab);
      if (panel) {
        panel.hidden = !active;
        panel.classList.toggle("active", active);
      }
    });
  }

  document.querySelectorAll("[data-tab-link]").forEach((link) => {
    link.addEventListener("click", () => {
      const targetTab = tabs.find((tab) => tab.dataset.tab === link.dataset.tabLink);
      if (targetTab) activateTab(targetTab);
    });
  });

  const contactHint = document.getElementById("contact-hint");
  if (contactHint && !whatsapp) contactHint.textContent = "Configure o número oficial de WhatsApp em config.js para habilitar o contato.";
})();
