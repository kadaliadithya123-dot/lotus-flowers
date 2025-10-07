// Config
const WHATSAPP_NUMBER = "9493280129"; // Business WhatsApp number

// Utility to open WhatsApp with encoded text
function openWhatsApp(message) {
  const encoded = encodeURIComponent(message);
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
  window.open(url, "_blank");
}

// Handle sticky header shadow
function initStickyHeader() {
  const header = document.querySelector(".site-header");
  if (!header) return;
  function onScroll() {
    if (window.scrollY > 4) header.classList.add("is-scrolled");
    else header.classList.remove("is-scrolled");
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

// Mobile menu toggle
function initMobileMenu() {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".primary-nav");
  if (!toggle || !nav) return;
  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });
  // Close nav when clicking a link
  nav.addEventListener("click", (e) => {
    const target = e.target;
    if (target && target.matches && target.matches("a")) {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });
}

// Reveal on scroll (IntersectionObserver)
function initRevealOnScroll() {
  const revealEls = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window) || revealEls.length === 0) {
    revealEls.forEach((el) => el.classList.add("is-visible"));
    return;
  }
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  revealEls.forEach((el) => observer.observe(el));
}

// WhatsApp Order buttons
function initOrderButtons() {
  const buttons = document.querySelectorAll(".order-btn");
  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const flower = btn.getAttribute("data-flower") || "your flowers";
      const message = `Hi, I’m interested in buying ${flower} from your Nature Farm. Please share details.`;
      openWhatsApp(message);
    });
  });
}

// WhatsApp Contact button
function initContactWhatsApp() {
  const btn = document.getElementById("whatsappContactBtn");
  if (!btn) return;
  btn.addEventListener("click", () => {
    const message = "Hi, I’d like to know more about your flowers and pricing.";
    openWhatsApp(message);
  });
}

// Init
document.addEventListener("DOMContentLoaded", () => {
  // Diagnostic: log loaded stylesheets to help debug why CSS may not be applied
  try {
    const sheets = Array.from(document.styleSheets).map(s => ({ href: s.href, disabled: s.disabled }));
    console.log("Loaded stylesheets:", sheets);
    const hasStyleCss = sheets.some(s => s.href && s.href.endsWith('style.css')) || sheets.some(s => !s.href && document.querySelector('link[rel="stylesheet"][href="style.css"]'));
    if (!hasStyleCss) {
      console.warn('style.css not found among document.styleSheets. Check link path, file name, and the Network tab in DevTools.');
    } else {
      console.log('style.css appears in document.styleSheets');
    }
  } catch (err) {
    console.warn('Could not enumerate document.styleSheets:', err);
  }
  initStickyHeader();
  initMobileMenu();
  initRevealOnScroll();
  initOrderButtons();
  initContactWhatsApp();
});
