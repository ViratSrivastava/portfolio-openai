// Navbar scroll animation
window.addEventListener("scroll", () => {
    const navbar = document.getElementById("navbar");
    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});

// Fade-in effect on scroll
const fadeElements = document.querySelectorAll(".fade-in");

// Debounce function to improve scroll performance
const debounce = (func, wait = 20, immediate = true) => {
    let timeout;
    return function () {
        const context = this, args = arguments;
        const later = () => {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};

// Handle fade-in effect
const handleFadeIn = () => {
    fadeElements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        if (rect.top <= window.innerHeight - 100) {
            element.classList.add("show");
        }
    });
};

// Add event listeners for optimized performance
window.addEventListener("scroll", debounce(handleFadeIn));
window.addEventListener("load", handleFadeIn); // Trigger on load
