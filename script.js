// Navigation scroll effect
const nav = document.querySelector('.nav');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Dark mode toggle
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

// Check for saved theme preference or default to system preference
const getPreferredTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        return savedTheme;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

// Apply theme
const setTheme = (theme) => {
    html.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    
    // Update meta theme-color for mobile browsers
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
        metaThemeColor.setAttribute('content', theme === 'dark' ? '#0a0a0a' : '#ffffff');
    }
};

// Initialize theme
setTheme(getPreferredTheme());

// Toggle theme on button click
themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
});

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
        setTheme(e.matches ? 'dark' : 'light');
    }
});

// Typing Effect
const typingText = document.getElementById('typingText');
const name = 'Karandeep Bhardwaj';
let charIndex = 0;

const typeWriter = () => {
    if (charIndex < name.length) {
        typingText.textContent += name.charAt(charIndex);
        charIndex++;
        setTimeout(typeWriter, 100);
    }
};

// Start typing effect when page loads
setTimeout(typeWriter, 500);

// Command Palette
const commandPalette = document.getElementById('commandPalette');
const commandOverlay = document.getElementById('commandPaletteOverlay');
const commandInput = document.getElementById('commandInput');
const commandItems = document.querySelectorAll('.command-item');
let activeCommandIndex = 0;

const openCommandPalette = () => {
    commandPalette.classList.add('active');
    commandOverlay.classList.add('active');
    commandInput.value = '';
    commandInput.focus();
    filterCommands('');
    updateActiveCommand(0);
};

const closeCommandPalette = () => {
    commandPalette.classList.remove('active');
    commandOverlay.classList.remove('active');
};

const filterCommands = (query) => {
    const lowerQuery = query.toLowerCase();
    let visibleCount = 0;
    
    commandItems.forEach(item => {
        const label = item.querySelector('.command-label').textContent.toLowerCase();
        if (label.includes(lowerQuery) || lowerQuery === '') {
            item.classList.remove('hidden');
            visibleCount++;
        } else {
            item.classList.add('hidden');
        }
    });
    
    if (visibleCount > 0) {
        updateActiveCommand(0);
    }
};

const updateActiveCommand = (index) => {
    const visibleItems = [...commandItems].filter(item => !item.classList.contains('hidden'));
    activeCommandIndex = Math.max(0, Math.min(index, visibleItems.length - 1));
    
    commandItems.forEach(item => item.classList.remove('active'));
    if (visibleItems[activeCommandIndex]) {
        visibleItems[activeCommandIndex].classList.add('active');
        visibleItems[activeCommandIndex].scrollIntoView({ block: 'nearest' });
    }
};

const executeCommand = (item) => {
    const action = item.dataset.action;
    const target = item.dataset.target;
    
    closeCommandPalette();
    
    switch (action) {
        case 'navigate':
            const element = document.querySelector(target);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
            break;
        case 'download':
            window.open('Karandeep_Resume.pdf', '_blank');
            break;
        case 'theme':
            const currentTheme = html.getAttribute('data-theme');
            setTheme(currentTheme === 'dark' ? 'light' : 'dark');
            break;
        case 'linkedin':
            window.open('https://linkedin.com/in/karandeepbhardwaj', '_blank');
            break;
        case 'github':
            window.open('https://github.com/karandeepbhardwaj', '_blank');
            break;
    }
};

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Cmd/Ctrl + K to open command palette
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (commandPalette.classList.contains('active')) {
            closeCommandPalette();
        } else {
            openCommandPalette();
        }
    }
    
    // ESC to close
    if (e.key === 'Escape' && commandPalette.classList.contains('active')) {
        closeCommandPalette();
    }
    
    // Arrow navigation in command palette
    if (commandPalette.classList.contains('active')) {
        const visibleItems = [...commandItems].filter(item => !item.classList.contains('hidden'));
        
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            updateActiveCommand(activeCommandIndex + 1);
        }
        if (e.key === 'ArrowUp') {
            e.preventDefault();
            updateActiveCommand(activeCommandIndex - 1);
        }
        if (e.key === 'Enter') {
            e.preventDefault();
            if (visibleItems[activeCommandIndex]) {
                executeCommand(visibleItems[activeCommandIndex]);
            }
        }
    }
});

// Command palette input filtering
commandInput?.addEventListener('input', (e) => {
    filterCommands(e.target.value);
});

// Click on command item
commandItems.forEach(item => {
    item.addEventListener('click', () => executeCommand(item));
});

// Click overlay to close
commandOverlay?.addEventListener('click', closeCommandPalette);

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Add animation class and observe all section content elements
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.section-content').forEach(el => {
        el.classList.add('animate');
        observer.observe(el);
    });
});

// Register Service Worker for PWA
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js').catch(() => {
            // Service worker registration failed, but app still works
        });
    });
}
