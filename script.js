const sections = document.querySelectorAll('section');
let currentSection = 0; 
let scrollThreshold = 50; // Pixels
let lastScrollY = 0;

window.addEventListener('wheel', (event) => {
    event.preventDefault();

    const currentScrollY = window.pageYOffset;
    const scrollDelta = currentScrollY - lastScrollY;

    if (Math.abs(scrollDelta) > scrollThreshold) {
        if (event.deltaY > 0) {
            if (currentSection < sections.length - 1) {
                currentSection++;
                scrollToSection(sections[currentSection]);
            }
        } else { 
            if (currentSection > 0) {
                currentSection--;
                scrollToSection(sections[currentSection]);
            }
        }
        lastScrollY = currentScrollY;  
    }
});

function scrollToSection(target) {
    const duration = 1200; 
    const easing = easeInOutCubic; 
    const start = window.pageYOffset;
    const startTime = performance.now();

    function animation(currentTime) {
        const elapsedTime = currentTime - startTime;
        const progress = easing(elapsedTime / duration);
        const targetY = start + (target.offsetTop - start) * progress;
        window.scrollTo({ top: targetY, behavior: 'auto' }); 

        if (elapsedTime < duration) {
            requestAnimationFrame(animation); 
        }
    }

    requestAnimationFrame(animation); 
}

function easeInOutCubic(t) {
    return t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1;
}
