function onLoad() {
    window.addEventListener("scroll", reveal);
    // Initial scroll position
    reveal();
}

function scrollToView(elementId) {
    document.getElementById(elementId).scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
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