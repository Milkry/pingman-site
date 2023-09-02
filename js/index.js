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