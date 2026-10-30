const toolCards = document.querySelectorAll('.tool-card');
toolCards.forEach(card => {
    const url = card.getAttribute('href');
    if (url && url !== '#') {
        try {
            const domain = new URL(url).hostname;
            const icon = card.querySelector('.tool-icon2');
            if (icon) {
                icon.src = `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
            }
        } catch (e) {
            console.error("URL không hợp lệ:", url);
        }
    }
});

const themeToggleBtn = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const themeText = document.getElementById('themeText');

const storedTheme = localStorage.getItem('theme');
const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)');

const applyTheme = (theme) => {
    if (theme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeIcon.textContent = '☀️';
        themeText.textContent = 'Light Mode';
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        themeIcon.textContent = '🌙';
        themeText.textContent = 'Dark Mode';
    }
};

if (storedTheme) {
    applyTheme(storedTheme);
} else {
    applyTheme(systemPrefersDark.matches ? 'dark' : 'light');
}

themeToggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
    localStorage.setItem('theme', newTheme);
});

systemPrefersDark.addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
        applyTheme(e.matches ? 'dark' : 'light');
    }
});

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1 
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, index * 100); 
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

toolCards.forEach(card => {
    observer.observe(card);
});
// Đăng ký Service Worker cho PWA
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then((registration) => {
                console.log('Service Worker đã đăng ký thành công. Phạm vi:', registration.scope);
            })
            .catch((error) => {
                console.error('Đăng ký Service Worker thất bại:', error);
            });
    });
}
