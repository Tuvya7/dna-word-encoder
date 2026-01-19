/* ============================================
   DNA Word Encoder - Main JavaScript
   Theme toggle, cursor glow, navigation
   ============================================ */

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initCursorGlow();
  initNavigation();
});

// ============================================
// Theme Management
// ============================================

function initTheme() {
  const themeToggle = document.getElementById("themeToggle");
  const html = document.documentElement;

  // Check for saved theme preference or system preference
  const savedTheme = localStorage.getItem("dna-encoder-theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  if (savedTheme) {
    html.setAttribute("data-theme", savedTheme);
  } else if (prefersDark) {
    html.setAttribute("data-theme", "dark");
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", toggleTheme);
  }

  // Listen for system theme changes
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (e) => {
      if (!localStorage.getItem("dna-encoder-theme")) {
        html.setAttribute("data-theme", e.matches ? "dark" : "light");
      }
    });
}

function toggleTheme() {
  const html = document.documentElement;
  const currentTheme = html.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";

  // Add transition class for smooth theme change
  html.classList.add("theme-transitioning");
  html.setAttribute("data-theme", newTheme);
  localStorage.setItem("dna-encoder-theme", newTheme);

  // Remove transition class after animation
  setTimeout(() => {
    html.classList.remove("theme-transitioning");
  }, 500);
}

// ============================================
// Cursor Effect - Disabled (using default cursor)
// ============================================

function initCursorGlow() {
  // Cursor effects disabled - using default cursor
  const oldGlow = document.getElementById("cursorGlow");
  if (oldGlow) oldGlow.remove();
}

// ============================================
// Navigation
// ============================================

function initNavigation() {
  const nav = document.getElementById("mainNav");
  let lastScrollY = window.scrollY;

  if (!nav) return;

  window.addEventListener(
    "scroll",
    () => {
      const currentScrollY = window.scrollY;

      // Add shadow on scroll
      if (currentScrollY > 10) {
        nav.style.boxShadow = "var(--shadow-md)";
      } else {
        nav.style.boxShadow = "none";
      }

      lastScrollY = currentScrollY;
    },
    { passive: true },
  );
}

// ============================================
// Utility Functions
// ============================================

// Debounce function for performance
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Throttle function for performance
function throttle(func, limit) {
  let inThrottle;
  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Copy to clipboard
async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error("Failed to copy:", err);
    return false;
  }
}

// Show toast notification
function showToast(message, duration = 2000) {
  const existing = document.querySelector(".toast");
  if (existing) existing.remove();

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  toast.style.cssText = `
        position: fixed;
        bottom: 24px;
        left: 50%;
        transform: translateX(-50%) translateY(20px);
        background: var(--color-text);
        color: var(--color-bg);
        padding: 12px 24px;
        border-radius: 8px;
        font-size: 14px;
        opacity: 0;
        transition: opacity 0.3s ease, transform 0.3s ease;
        z-index: 10000;
    `;

  document.body.appendChild(toast);

  // Trigger animation
  requestAnimationFrame(() => {
    toast.style.opacity = "1";
    toast.style.transform = "translateX(-50%) translateY(0)";
  });

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(-50%) translateY(20px)";
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

// Export utilities for other scripts
window.DNAUtils = {
  debounce,
  throttle,
  copyToClipboard,
  showToast,
  toggleTheme,
};
