// مدیریت حالت تاریک/روشن
document.addEventListener('DOMContentLoaded', function() {
    initializeTheme();
});

function initializeTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeStyle = document.getElementById('theme-style');
    
    // بررسی حالت ذخیره شده
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    
    // رویداد تغییر تم
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.body.classList.contains('light-mode') ? 'light' : 'dark';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    });
}

function setTheme(theme) {
    const themeToggle = document.getElementById('theme-toggle');
    const themeStyle = document.getElementById('theme-style');
    
    if (theme === 'light') {
        document.body.classList.add('light-mode');
        themeStyle.href = 'css/light-mode.css';
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        themeToggle.title = 'تغییر به حالت تاریک';
    } else {
        document.body.classList.remove('light-mode');
        themeStyle.href = 'css/dark-mode.css';
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        themeToggle.title = 'تغییر به حالت روشن';
    }
}