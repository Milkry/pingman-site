function onLoad() {
    window.addEventListener("scroll", reveal);
    // Initial scroll position
    reveal();

    initNav();
    initScrollSpy();
    initLightbox();

    document.querySelectorAll("noscript").forEach((el) => {
        el.remove();
    })
}

function reveal() {
    var reveals = document.querySelectorAll(".reveal:not(.active)");
    var elementVisible = 30;

    for (const element of reveals) {
        var windowHeight = window.innerHeight;
        var elementTop = element.getBoundingClientRect().top;

        if (elementTop < windowHeight - elementVisible) {
            element.classList.add("active");
        }
    }
}

function initNav() {
    const toggle = document.querySelector(".nav-toggle");
    const menu = document.getElementById("nav-menu");
    if (!toggle || !menu) return;

    function setOpen(open) {
        menu.classList.toggle("open", open);
        toggle.setAttribute("aria-expanded", String(open));
    }

    toggle.addEventListener("click", () => {
        setOpen(!menu.classList.contains("open"));
    });

    for (const link of menu.querySelectorAll("a")) {
        link.addEventListener("click", () => setOpen(false));
    }

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") setOpen(false);
    });
}

function initScrollSpy() {
    const targets = [];

    for (const link of document.querySelectorAll('.nav-menu a[href^="#"]')) {
        const section = document.querySelector(link.getAttribute("href"));
        if (section) targets.push({ link, section });
    }

    if (!targets.length) return;

    function sync() {
        let active = null;

        for (const entry of targets) {
            // The last section whose top has passed under the nav wins
            if (entry.section.getBoundingClientRect().top <= 100) active = entry;
        }

        // The last section is too short to reach the top, so claim it at the page bottom
        const doc = document.documentElement;
        if (window.scrollY + window.innerHeight >= doc.scrollHeight - 2) {
            active = targets[targets.length - 1];
        }

        for (const entry of targets) {
            entry.link.classList.toggle("current", entry === active);
        }
    }

    window.addEventListener("scroll", sync);
    sync();
}

function initLightbox() {
    const box = document.getElementById("lightbox");
    if (!box) return;

    const view = document.getElementById("lightbox-img");
    const caption = document.getElementById("lightbox-cap");
    let lastFocused = null;

    function open(trigger) {
        const source = trigger.querySelector("img");
        lastFocused = trigger;

        view.src = source.currentSrc || source.src;
        view.alt = source.alt;
        caption.textContent = source.alt;

        box.hidden = false;
        document.body.style.overflow = "hidden";
        box.querySelector(".lightbox-close").focus();
    }

    function close() {
        if (box.hidden) return;

        box.hidden = true;
        view.src = "";
        document.body.style.overflow = "";

        if (lastFocused) lastFocused.focus();
    }

    for (const trigger of document.querySelectorAll(".frame .zoom")) {
        trigger.addEventListener("click", (event) => {
            // The href is the plain-image fallback for when JS is unavailable
            event.preventDefault();
            open(trigger);
        });
    }

    box.addEventListener("click", (event) => {
        if (!event.target.closest(".lightbox-inner")) close();
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") close();
    });
}
