// سیستم احراز هویت
document.addEventListener('DOMContentLoaded', function() {
    initializeAuth();
});

function initializeAuth() {
    const loginBtn = document.getElementById('login-btn');
    const loginModal = document.getElementById('login-modal');
    const loginForm = document.getElementById('login-form');
    
    if (!loginBtn || !loginModal || !loginForm) return;
    
    // اطلاعات ادمین‌ها
    const adminUsers = {
        'ali': {
            password: 'ali123',
            name: 'علی',
            isAdmin: true
        },
        'hossein': {
            password: 'hossein123',
            name: 'حسین',
            isAdmin: true
        }
    };
    
    // باز کردن مودال ورود
    loginBtn.addEventListener('click', function() {
        loginModal.style.display = 'block';
        updateLoginButton();
    });
    
    // بستن مودال
    const closeBtn = loginModal.querySelector('.close');
    closeBtn.addEventListener('click', function() {
        loginModal.style.display = 'none';
    });
    
    // بستن مودال با کلیک خارج
    window.addEventListener('click', function(event) {
        if (event.target === loginModal) {
            loginModal.style.display = 'none';
        }
    });
    
    // مدیریت فرم ورود
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();
        
        if (!username || !password) {
            if (typeof showNotification === 'function') {
                showNotification('لطفا همه فیلدها را پر کنید', 'error');
            }
            return;
        }
        
        // بررسی ادمین
        if (adminUsers[username] && adminUsers[username].password === password) {
            // ورود ادمین موفقیت‌آمیز
            const userData = {
                username: username,
                name: adminUsers[username].name,
                isAdmin: true,
                loggedIn: true
            };
            
            localStorage.setItem('currentUser', JSON.stringify(userData));
            loginModal.style.display = 'none';
            
            if (typeof showNotification === 'function') {
                showNotification(`خوش آمدید ${adminUsers[username].name} عزیز!`, 'success');
            }
            
            updateLoginButton();
            showAdminFeatures();
            
        } else {
            // کاربر معمولی
            const userData = {
                username: username,
                name: username,
                isAdmin: false,
                loggedIn: true
            };
            
            localStorage.setItem('currentUser', JSON.stringify(userData));
            loginModal.style.display = 'none';
            
            if (typeof showNotification === 'function') {
                showNotification(`خوش آمدید ${username} عزیز!`, 'success');
            }
            
            updateLoginButton();
        }
        
        // پاک کردن فرم
        document.getElementById('username').value = '';
        document.getElementById('password').value = '';
    });
    
    // لینک ثبت نام
    const registerLink = document.getElementById('register-link');
    if (registerLink) {
        registerLink.addEventListener('click', function(e) {
            e.preventDefault();
            showRegistrationForm();
        });
    }
    
    // بررسی وضعیت ورود کاربر
    checkLoginStatus();
}

// بررسی وضعیت ورود کاربر
function checkLoginStatus() {
    const userData = JSON.parse(localStorage.getItem('currentUser'));
    
    if (userData && userData.loggedIn) {
        updateLoginButton();
        if (userData.isAdmin) {
            showAdminFeatures();
        }
    }
}

// به‌روزرسانی دکمه ورود
function updateLoginButton() {
    const loginBtn = document.getElementById('login-btn');
    const userData = JSON.parse(localStorage.getItem('currentUser'));
    
    if (!loginBtn) return;
    
    if (userData && userData.loggedIn) {
        loginBtn.innerHTML = `
            <i class="fas fa-user-check"></i>
            <span class="btn-text">${userData.name} ${userData.isAdmin ? '(ادمین)' : ''}</span>
        `;
        
        // اضافه کردن دکمه خروج
        if (!document.getElementById('logout-btn')) {
            const logoutBtn = document.createElement('button');
            logoutBtn.id = 'logout-btn';
            logoutBtn.className = 'btn-logout';
            logoutBtn.innerHTML = '<i class="fas fa-sign-out-alt"></i>';
            logoutBtn.title = 'خروج';
            
            logoutBtn.addEventListener('click', logout);
            
            const userSection = document.querySelector('.user-section');
            if (userSection) {
                userSection.appendChild(logoutBtn);
            }
        }
    } else {
        loginBtn.innerHTML = `
            <i class="fas fa-user"></i>
            <span class="btn-text">ورود</span>
        `;
        
        // حذف دکمه خروج
        const logoutBtn = document.getElementById('logout-btn');
        if (logoutBtn) {
            logoutBtn.remove();
        }
    }
}

// خروج کاربر
function logout() {
    localStorage.removeItem('currentUser');
    
    if (typeof showNotification === 'function') {
        showNotification('با موفقیت خارج شدید', 'info');
    }
    
    updateLoginButton();
    hideAdminFeatures();
}

// نمایش فرم ثبت نام
function showRegistrationForm() {
    const loginModal = document.getElementById('login-modal');
    const loginForm = document.getElementById('login-form');
    
    if (!loginModal || !loginForm) return;
    
    // تغییر فرم ورود به فرم ثبت نام
    loginForm.innerHTML = `
        <div class="form-group">
            <label for="register-username"><i class="fas fa-user"></i> نام کاربری:</label>
            <input type="text" id="register-username" placeholder="نام کاربری دلخواه" required>
        </div>
        
        <div class="form-group">
            <label for="register-password"><i class="fas fa-lock"></i> کلمه عبور:</label>
            <input type="password" id="register-password" placeholder="کلمه عبور قوی" required>
        </div>
        
        <div class="form-group">
            <label for="register-confirm-password"><i class="fas fa-lock"></i> تأیید کلمه عبور:</label>
            <input type="password" id="register-confirm-password" placeholder="تکرار کلمه عبور" required>
        </div>
        
        <div class="form-group">
            <label for="register-name"><i class="fas fa-id-card"></i> نام نمایشی:</label>
            <input type="text" id="register-name" placeholder="نامی که نمایش داده می‌شود" required>
        </div>
        
        <div class="form-group">
            <label for="register-email"><i class="fas fa-envelope"></i> ایمیل (اختیاری):</label>
            <input type="email" id="register-email" placeholder="example@email.com">
        </div>
        
        <button type="submit" class="btn-submit">
            <i class="fas fa-user-plus"></i> ثبت نام
        </button>
        
        <div class="form-footer">
            <p>حساب کاربری دارید؟ <a href="#" id="login-link">وارد شوید</a></p>
        </div>
    `;
    
    // رویداد بازگشت به فرم ورود
    const loginLink = document.getElementById('login-link');
    if (loginLink) {
        loginLink.addEventListener('click', function(e) {
            e.preventDefault();
            location.reload(); // بارگذاری مجدد برای نمایش فرم ورود
        });
    }
    
    // مدیریت فرم ثبت نام
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('register-username').value.trim();
        const password = document.getElementById('register-password').value.trim();
        const confirmPassword = document.getElementById('register-confirm-password').value.trim();
        const name = document.getElementById('register-name').value.trim();
        const email = document.getElementById('register-email').value.trim();
        
        // اعتبارسنجی
        if (!username || !password || !confirmPassword || !name) {
            if (typeof showNotification === 'function') {
                showNotification('لطفا فیلدهای ضروری را پر کنید', 'error');
            }
            return;
        }
        
        if (password !== confirmPassword) {
            if (typeof showNotification === 'function') {
                showNotification('کلمه‌های عبور مطابقت ندارند', 'error');
            }
            return;
        }
        
        if (password.length < 6) {
            if (typeof showNotification === 'function') {
                showNotification('کلمه عبور باید حداقل ۶ کاراکتر باشد', 'error');
            }
            return;
        }
        
        // ثبت کاربر جدید
        const userData = {
            username: username,
            name: name,
            email: email || null,
            isAdmin: false,
            registeredAt: new Date().toISOString()
        };
        
        // ذخیره کاربران در localStorage
        let users = JSON.parse(localStorage.getItem('users')) || [];
        
        // بررسی تکراری نبودن نام کاربری
        if (users.some(u => u.username === username)) {
            if (typeof showNotification === 'function') {
                showNotification('این نام کاربری قبلاً ثبت شده است', 'error');
            }
            return;
        }
        
        users.push(userData);
        localStorage.setItem('users', JSON.stringify(users));
        
        // ذخیره اطلاعات ورود (در واقعیت این کار را نباید انجام داد!)
        // این فقط برای دمو است
        const loginData = {
            username: username,
            password: password // در واقعیت هرگز رمز عبور را به این صورت ذخیره نکنید!
        };
        
        let logins = JSON.parse(localStorage.getItem('logins')) || [];
        logins.push(loginData);
        localStorage.setItem('logins', JSON.stringify(logins));
        
        // ورود خودکار
        localStorage.setItem('currentUser', JSON.stringify({
            username: username,
            name: name,
            isAdmin: false,
            loggedIn: true
        }));
        
        loginModal.style.display = 'none';
        
        if (typeof showNotification === 'function') {
            showNotification(`ثبت نام موفقیت‌آمیز بود! خوش آمدید ${name} عزیز`, 'success');
        }
        
        updateLoginButton();
    });
}

// نمایش ویژگی‌های ادمین
function showAdminFeatures() {
    // بررسی وجود منو
    const navMenu = document.querySelector('.nav-menu');
    if (!navMenu) return;
    
    // بررسی وجود لینک ادمین
    if (!document.getElementById('admin-link')) {
        const adminLi = document.createElement('li');
        adminLi.innerHTML = `
            <a href="admin/index.html" id="admin-link" target="_blank">
                <i class="fas fa-user-shield"></i> پنل مدیریت
            </a>
        `;
        navMenu.appendChild(adminLi);
    }
}

// پنهان کردن ویژگی‌های ادمین
function hideAdminFeatures() {
    const adminLink = document.getElementById('admin-link');
    if (adminLink) {
        adminLink.parentElement.remove();
    }
}

// بررسی دسترسی ادمین
function isAdmin() {
    const userData = JSON.parse(localStorage.getItem('currentUser'));
    return userData && userData.loggedIn && userData.isAdmin;
}

// دریافت اطلاعات کاربر جاری
function getCurrentUser() {
    return JSON.parse(localStorage.getItem('currentUser'));
}

// صادر کردن توابع
window.logout = logout;
window.isAdmin = isAdmin;
window.getCurrentUser = getCurrentUser;