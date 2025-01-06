/**
 * Command Palette Module
 * Keyboard-driven navigation and actions
 */

import { toggleTheme } from './theme.js';
import { scrollToElement } from './navigation.js';

const commandPalette = document.getElementById('commandPalette');
const commandOverlay = document.getElementById('commandPaletteOverlay');
const commandInput = document.getElementById('commandInput');
const commandItems = document.querySelectorAll('.command-item');

let activeCommandIndex = 0;

/**
 * Open command palette
 */
const openCommandPalette = () => {
    commandPalette?.classList.add('active');
    commandOverlay?.classList.add('active');
    if (commandInput) {
        commandInput.value = '';
        commandInput.focus();
    }
    filterCommands('');
    updateActiveCommand(0);
};

/**
 * Close command palette
 */
const closeCommandPalette = () => {
    commandPalette?.classList.remove('active');
    commandOverlay?.classList.remove('active');
};

/**
 * Filter commands based on search query
 */
const filterCommands = (query) => {
    const lowerQuery = query.toLowerCase();
    let visibleCount = 0;
    
    commandItems.forEach(item => {
        const label = item.querySelector('.command-label')?.textContent.toLowerCase() || '';
        const isVisible = label.includes(lowerQuery) || lowerQuery === '';
        item.classList.toggle('hidden', !isVisible);
        if (isVisible) visibleCount++;
    });
    
    if (visibleCount > 0) updateActiveCommand(0);
};

/**
 * Update active command highlight
 */
const updateActiveCommand = (index) => {
    const visibleItems = [...commandItems].filter(item => !item.classList.contains('hidden'));
    activeCommandIndex = Math.max(0, Math.min(index, visibleItems.length - 1));
    
    commandItems.forEach(item => item.classList.remove('active'));
    if (visibleItems[activeCommandIndex]) {
        visibleItems[activeCommandIndex].classList.add('active');
        visibleItems[activeCommandIndex].scrollIntoView({ block: 'nearest' });
    }
};

/**
 * Execute selected command
 */
const executeCommand = (item) => {
    const action = item.dataset.action;
    const target = item.dataset.target;
    
    closeCommandPalette();
    
    switch (action) {
        case 'navigate':
            if (target) scrollToElement(target);
            break;
        case 'download':
            window.open('Karandeep_Resume.pdf', '_blank');
            break;
        case 'theme':
            toggleTheme();
            break;
        case 'linkedin':
            window.open('https://linkedin.com/in/karandeepbhardwaj', '_blank');
            break;
        case 'github':
            window.open('https://github.com/karandeepbhardwaj', '_blank');
            break;
    }
};

/**
 * Handle keyboard navigation
 */
const handleKeyboard = (e) => {
    // Cmd/Ctrl + K to toggle command palette
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        commandPalette?.classList.contains('active') ? closeCommandPalette() : openCommandPalette();
        return;
    }
    
    // Only handle other keys if palette is open
    if (!commandPalette?.classList.contains('active')) return;
    
    const visibleItems = [...commandItems].filter(item => !item.classList.contains('hidden'));
    
    switch (e.key) {
        case 'Escape':
            closeCommandPalette();
            break;
        case 'ArrowDown':
            e.preventDefault();
            updateActiveCommand(activeCommandIndex + 1);
            break;
        case 'ArrowUp':
            e.preventDefault();
            updateActiveCommand(activeCommandIndex - 1);
            break;
        case 'Enter':
            e.preventDefault();
            if (visibleItems[activeCommandIndex]) {
                executeCommand(visibleItems[activeCommandIndex]);
            }
            break;
    }
};

/**
 * Initialize command palette
 */
export const initCommandPalette = () => {
    // Keyboard shortcuts
    document.addEventListener('keydown', handleKeyboard);
    
    // Input filtering
    commandInput?.addEventListener('input', (e) => filterCommands(e.target.value));
    
    // Click on command item
    commandItems.forEach(item => {
        item.addEventListener('click', () => executeCommand(item));
    });
    
    // Click overlay to close
    commandOverlay?.addEventListener('click', closeCommandPalette);
};
