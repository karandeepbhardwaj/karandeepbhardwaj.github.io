// ========== CURSOR GLOW EFFECT ==========
const cursorGlow = document.getElementById('cursorGlow');
let mouseX = 0, mouseY = 0;
let glowX = 0, glowY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorGlow.classList.add('active');
});

document.addEventListener('mouseleave', () => {
    cursorGlow.classList.remove('active');
});

// Smooth cursor follow
const animateCursor = () => {
    glowX += (mouseX - glowX) * 0.1;
    glowY += (mouseY - glowY) * 0.1;
    cursorGlow.style.left = glowX + 'px';
    cursorGlow.style.top = glowY + 'px';
    requestAnimationFrame(animateCursor);
};
animateCursor();

// ========== SCROLL PROGRESS ==========
const scrollProgress = document.getElementById('scrollProgress');

const updateScrollProgress = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    scrollProgress.style.width = scrollPercent + '%';
};

window.addEventListener('scroll', updateScrollProgress);

// ========== TEXT REVEAL ON SCROLL ==========
const textRevealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.text-reveal').forEach(el => {
    textRevealObserver.observe(el);
});

// Navigation scroll effect
const nav = document.querySelector('.nav');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Mobile hamburger menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
const navOverlay = document.getElementById('navOverlay');

const toggleMobileMenu = () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
    navOverlay.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
};

const closeMobileMenu = () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('active');
    navOverlay.classList.remove('active');
    document.body.style.overflow = '';
};

hamburger.addEventListener('click', toggleMobileMenu);
navOverlay.addEventListener('click', closeMobileMenu);

// Close mobile menu when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMobileMenu);
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

// ========== 3D F1 CAR ==========
const initF1Car = () => {
    const canvas = document.getElementById('f1Canvas');
    if (!canvas || typeof THREE === 'undefined') return;

    const container = canvas.parentElement;
    const scene = new THREE.Scene();
    
    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(5, 2, 5);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 10, 7);
    scene.add(directionalLight);

    const fillLight = new THREE.DirectionalLight(0x4444ff, 0.3);
    fillLight.position.set(-5, 0, -5);
    scene.add(fillLight);

    // Create a stylized F1 car shape using basic geometries
    const carGroup = new THREE.Group();

    // Red Bull Racing colors
    const darkBlue = new THREE.MeshStandardMaterial({ color: 0x1e3264, metalness: 0.8, roughness: 0.2 });
    const red = new THREE.MeshStandardMaterial({ color: 0xdc0000, metalness: 0.7, roughness: 0.3 });
    const yellow = new THREE.MeshStandardMaterial({ color: 0xffc906, metalness: 0.6, roughness: 0.4 });
    const black = new THREE.MeshStandardMaterial({ color: 0x111111, metalness: 0.9, roughness: 0.1 });

    // Main body (elongated low profile)
    const bodyGeometry = new THREE.BoxGeometry(3, 0.3, 0.8);
    const body = new THREE.Mesh(bodyGeometry, darkBlue);
    body.position.y = 0.2;
    carGroup.add(body);

    // Nose cone
    const noseGeometry = new THREE.ConeGeometry(0.3, 1.2, 4);
    noseGeometry.rotateZ(-Math.PI / 2);
    const nose = new THREE.Mesh(noseGeometry, darkBlue);
    nose.position.set(2, 0.2, 0);
    carGroup.add(nose);

    // Cockpit
    const cockpitGeometry = new THREE.BoxGeometry(0.6, 0.4, 0.5);
    const cockpit = new THREE.Mesh(cockpitGeometry, black);
    cockpit.position.set(0.3, 0.5, 0);
    carGroup.add(cockpit);

    // Halo
    const haloGeometry = new THREE.TorusGeometry(0.25, 0.03, 8, 16, Math.PI);
    const halo = new THREE.Mesh(haloGeometry, black);
    halo.rotation.x = Math.PI / 2;
    halo.rotation.z = Math.PI / 2;
    halo.position.set(0.3, 0.65, 0);
    carGroup.add(halo);

    // Rear wing
    const wingGeometry = new THREE.BoxGeometry(0.1, 0.4, 1.2);
    const rearWing = new THREE.Mesh(wingGeometry, red);
    rearWing.position.set(-1.4, 0.6, 0);
    carGroup.add(rearWing);

    // Wing endplates
    const endplateGeometry = new THREE.BoxGeometry(0.2, 0.5, 0.05);
    const endplate1 = new THREE.Mesh(endplateGeometry, yellow);
    endplate1.position.set(-1.4, 0.55, 0.6);
    carGroup.add(endplate1);
    const endplate2 = endplate1.clone();
    endplate2.position.z = -0.6;
    carGroup.add(endplate2);

    // Front wing
    const frontWingGeometry = new THREE.BoxGeometry(0.15, 0.1, 1.4);
    const frontWing = new THREE.Mesh(frontWingGeometry, red);
    frontWing.position.set(2.2, 0.05, 0);
    carGroup.add(frontWing);

    // Wheels
    const wheelGeometry = new THREE.CylinderGeometry(0.25, 0.25, 0.2, 16);
    wheelGeometry.rotateX(Math.PI / 2);
    
    const wheelPositions = [
        { x: 1.3, y: 0.1, z: 0.6 },   // Front right
        { x: 1.3, y: 0.1, z: -0.6 },  // Front left
        { x: -1, y: 0.1, z: 0.65 },   // Rear right
        { x: -1, y: 0.1, z: -0.65 }   // Rear left
    ];

    wheelPositions.forEach(pos => {
        const wheel = new THREE.Mesh(wheelGeometry, black);
        wheel.position.set(pos.x, pos.y, pos.z);
        carGroup.add(wheel);
    });

    // Engine cover / air intake
    const intakeGeometry = new THREE.BoxGeometry(0.8, 0.3, 0.4);
    const intake = new THREE.Mesh(intakeGeometry, yellow);
    intake.position.set(-0.3, 0.55, 0);
    carGroup.add(intake);

    scene.add(carGroup);

    // Interactive rotation
    let isDragging = false;
    let previousMouseX = 0;
    let previousMouseY = 0;
    let rotationY = 0;
    let rotationX = 0;
    let autoRotate = true;

    canvas.addEventListener('mousedown', (e) => {
        isDragging = true;
        autoRotate = false;
        previousMouseX = e.clientX;
        previousMouseY = e.clientY;
    });

    canvas.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        const deltaX = e.clientX - previousMouseX;
        const deltaY = e.clientY - previousMouseY;
        rotationY += deltaX * 0.01;
        rotationX += deltaY * 0.01;
        rotationX = Math.max(-0.5, Math.min(0.5, rotationX));
        previousMouseX = e.clientX;
        previousMouseY = e.clientY;
    });

    canvas.addEventListener('mouseup', () => { isDragging = false; });
    canvas.addEventListener('mouseleave', () => { isDragging = false; });

    // Touch support
    canvas.addEventListener('touchstart', (e) => {
        isDragging = true;
        autoRotate = false;
        previousMouseX = e.touches[0].clientX;
        previousMouseY = e.touches[0].clientY;
    });

    canvas.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        const deltaX = e.touches[0].clientX - previousMouseX;
        const deltaY = e.touches[0].clientY - previousMouseY;
        rotationY += deltaX * 0.01;
        rotationX += deltaY * 0.01;
        rotationX = Math.max(-0.5, Math.min(0.5, rotationX));
        previousMouseX = e.touches[0].clientX;
        previousMouseY = e.touches[0].clientY;
    });

    canvas.addEventListener('touchend', () => { isDragging = false; });

    // Zoom with scroll
    canvas.addEventListener('wheel', (e) => {
        e.preventDefault();
        camera.position.z += e.deltaY * 0.01;
        camera.position.z = Math.max(3, Math.min(10, camera.position.z));
        camera.position.x = camera.position.z;
    }, { passive: false });

    // Animation loop
    const animate = () => {
        requestAnimationFrame(animate);
        
        if (autoRotate) {
            rotationY += 0.005;
        }
        
        carGroup.rotation.y = rotationY;
        carGroup.rotation.x = rotationX;
        
        renderer.render(scene, camera);
    };
    animate();

    // Resize handler
    window.addEventListener('resize', () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });
};

// Initialize 3D car when Three.js is loaded
window.addEventListener('load', () => {
    setTimeout(initF1Car, 100);
});
