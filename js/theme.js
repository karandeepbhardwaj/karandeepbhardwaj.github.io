/**
 * Theme Module
 * Handles dark/light mode toggle with system preference detection
 */

const html = document.documentElement;
const themeToggle = document.getElementById('themeToggle');

/**
 * Get user's preferred theme from localStorage or system preference
 */
const getPreferredTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) return savedTheme;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

/**
 * Apply theme and update meta theme-color
 */
const setTheme = (theme) => {
    html.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
        metaThemeColor.setAttribute('content', theme === 'dark' ? '#0a0a0a' : '#ffffff');
    }
};

/**
 * Toggle between light and dark themes
 */
const toggleTheme = () => {
    const currentTheme = html.getAttribute('data-theme');
    setTheme(currentTheme === 'dark' ? 'light' : 'dark');
};

/**
 * Initialize theme module
 */
export const initTheme = () => {
    // Set initial theme
    setTheme(getPreferredTheme());
    
    // Toggle on button click
    themeToggle?.addEventListener('click', toggleTheme);
    
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            setTheme(e.matches ? 'dark' : 'light');
        }
    });
};

// Export for command palette
export { setTheme, toggleTheme };
