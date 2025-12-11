// متغیرهای سراسری
let currentProducts = [...products];
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// تابع اصلی هنگام بارگذاری صفحه
document.addEventListener('DOMContentLoaded', function() {
    initializeApplication();
});

// تابع مقداردهی اولیه
function initializeApplication() {
    displayProducts(currentProducts);
    setupEventListeners();
    updateCartCount();
    setupNavigation();
    setupCategoryCards();
}

// نمایش محصولات
function displayProducts(productsToShow) {
    const container = document.getElementById('products-container');
    
    if (!container) {
        console.error('محصول‌ها یافت نشد!');
        return;
    }
    
    if (productsToShow.length === 0) {
        container.innerHTML = `
            <div class="no-products">
                <i class="fas fa-search"></i>
                <h3>محصولی یافت نشد</h3>
                <p>متأسفانه هیچ محصولی با جستجوی شما مطابقت ندارد.</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = '';
    
    productsToShow.forEach(product => {
        const productCard = createProductCard(product);
        container.appendChild(productCard);
    });
}

// ایجاد کارت محصول
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    // محاسبه تخفیف
    const discountPercent = Math.round((1 - product.finalPrice / product.originalPrice) * 100);
    
    // نام دسته‌بندی فارسی
    const categoryNames = {
        gaming: "گیمینگ",
        mobile: "موبایل",
        gadgets: "گجت و صدا",
        ebooks: "کتاب دیجیتال",
        electric: "کالای برقی"
    };
    
    card.innerHTML = `
        ${discountPercent > 0 ? `
            <div class="product-badge">
                ${discountPercent}% تخفیف
            </div>
        ` : ''}
        
        <img src="${product.image}"
             alt="${product.name}" 
             class="product-image"
             loading="lazy"
             onerror="this.src='https://images.unsplash.com/photo-1556656793-08538906a9f8?w=600&h=400&fit=crop'">
        
        <div class="product-info">
            <h3 class="product-title">${product.name}</h3>
            
            <div class="product-meta">
                <span class="product-category">
                    <i class="fas fa-tag"></i> ${categoryNames[product.category]}
                </span>
                <div class="rating">
                    ${generateStarRating(product.rating)}
                    <span class="rating-text">(${product.rating})</span>
                </div>
            </div>
            
            <p class="product-description">${product.description}</p>
            
            <div class="price-container">
                ${product.finalPrice < product.originalPrice ? `
                    <span class="original-price">
                        ${formatPrice(product.originalPrice)}
                    </span>
                ` : ''}
                <span class="final-price">
                    ${formatPrice(product.finalPrice)}
                </span>
            </div>
            
            <div class="product-actions">
                <button class="btn-add-cart" data-id="${product.id}" title="افزودن به سبد خرید">
                    <i class="fas fa-cart-plus"></i>
                    <span>افزودن به سبد</span>
                </button>
                
                <button class="btn-details" data-id="${product.id}" title="مشاهده جزئیات">
                    <i class="fas fa-info-circle"></i>
                </button>
                
                <button class="btn-comments" data-id="${product.id}" title="مشاهده نظرات">
                    <i class="fas fa-comments"></i>
                </button>
            </div>
        </div>
    `;
    
    return card;
}

// تنظیم رویدادها
function setupEventListeners() {
    // فیلتر محصولات
    document.querySelectorAll('.filter-btn').forEach(button => {
        button.addEventListener('click', function() {
            // حذف کلاس active از همه دکمه‌ها
            document.querySelectorAll('.filter-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            
            // اضافه کردن کلاس active به دکمه کلیک شده
            this.classList.add('active');
            
            const category = this.getAttribute('data-category');
            filterProducts(category);
        });
    });
    
    // دکمه مشاهده محصولات در هیرو
    const exploreBtn = document.getElementById('explore-products');
    if (exploreBtn) {
        exploreBtn.addEventListener('click', function() {
            document.querySelector('#products-section').scrollIntoView({
                behavior: 'smooth'
            });
        });
    }
    
    // رویداد کلیک روی محصولات
    document.addEventListener('click', function(e) {
        // افزودن به سبد خرید
        if (e.target.closest('.btn-add-cart')) {
            const productId = parseInt(e.target.closest('.btn-add-cart').getAttribute('data-id'));
            addToCart(productId);
        }
        
        // مشاهده جزئیات
        if (e.target.closest('.btn-details')) {
            const productId = parseInt(e.target.closest('.btn-details').getAttribute('data-id'));
            showProductDetails(productId);
        }
        
        // مشاهده نظرات
        if (e.target.closest('.btn-comments')) {
            const productId = parseInt(e.target.closest('.btn-comments').getAttribute('data-id'));
            showCommentsModal(productId);
        }
    });
    
    // رویداد برای کارت‌های دسته‌بندی
    setupCategoryCards();
}

// فیلتر محصولات
function filterProducts(category) {
    if (category === 'all') {
        currentProducts = [...products];
    } else {
        currentProducts = products.filter(product => product.category === category);
    }
    
    displayProducts(currentProducts);
    
    // اسکرول به بخش محصولات
    document.querySelector('#products-section').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

// تنظیم کارت‌های دسته‌بندی
function setupCategoryCards() {
    document.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // به‌روزرسانی دکمه‌های فیلتر
            document.querySelectorAll('.filter-btn').forEach(btn => {
                btn.classList.remove('active');
                if (btn.getAttribute('data-category') === category) {
                    btn.classList.add('active');
                }
            });
            
            // فیلتر محصولات
            filterProducts(category);
        });
    });
}

// تنظیم نویگیشن
function setupNavigation() {
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', function(e) {
            const section = this.getAttribute('data-section');
            
            if (section === 'home') {
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            } else if (section && section !== '#') {
                e.preventDefault();
                
                // به‌روزرسانی لینک فعال
                document.querySelectorAll('nav a').forEach(a => a.classList.remove('active'));
                this.classList.add('active');
                
                // اسکرول به بخش مورد نظر
                const targetSection = document.querySelector(`#${section}`);
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

// نمایش جزئیات محصول
function showProductDetails(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) {
        showNotification('محصول یافت نشد!', 'error');
        return;
    }
    
    // محاسبه تخفیف
    const discountPercent = Math.round((1 - product.finalPrice / product.originalPrice) * 100);
    
    // نام دسته‌بندی فارسی
    const categoryNames = {
        gaming: "گیمینگ",
        mobile: "موبایل",
        gadgets: "گجت و صدا",
        ebooks: "کتاب دیجیتال",
        electric: "کالای برقی"
    };
    
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content product-detail-modal">
            <span class="close">&times;</span>
            
            <div class="product-detail-header">
                <div class="product-detail-image-container">

                <img src="${product.image2}" 
                         alt="${product.name}" 
                         class"product-detail-image"
                         loading="lazy">
                
                    ${discountPercent > 0 ? `
                        <div class="detail-badge">
                            ${discountPercent}% تخفیف
                        </div>
                    ` : ''}
                </div>

                <div class="product-detail-info">
                    <h2>${product.name}</h2>
                    
                    <div class="product-meta-detail">
                        <span class="product-category-detail">
                            <i class="fas fa-folder"></i> ${categoryNames[product.category]}
                        </span>
                        
                        <div class="rating-detail">
                            ${generateStarRating(product.rating)}
                            <span>(${product.rating} از 5)</span>
                        </div>
                    </div>
                    
                    <div class="price-detail">
                        ${product.finalPrice < product.originalPrice ? `
                            <span class="original-price-detail">
                                ${formatPrice(product.originalPrice)}
                            </span>
                        ` : ''}
                        
                        <span class="final-price-detail">
                            ${formatPrice(product.finalPrice)}
                        </span>
                    </div>
                    
                    <p class="product-description-detail">
                        ${product.description}
                    </p>
                    
                    <div class="detail-specs">
                        <h3><i class="fas fa-list"></i> مشخصات فنی</h3>
                        <ul>
                            <li><strong>شناسه محصول:</strong> #${product.id}</li>
                            <li><strong>دسته‌بندی:</strong> ${categoryNames[product.category]}</li>
                            <li><strong>امتیاز:</strong> ${product.rating} از 5 ستاره</li>
                            <li><strong>قیمت اصلی:</strong> ${formatPrice(product.originalPrice)}</li>
                            ${discountPercent > 0 ? `
                                <li><strong>درصد تخفیف:</strong> ${discountPercent}%</li>
                            ` : ''}
                            <li><strong>قیمت نهایی:</strong> ${formatPrice(product.finalPrice)}</li>
                        </ul>
                    </div>
                    
                    <div class="detail-actions">
                        <button class="btn-add-cart-detail" data-id="${product.id}">
                            <i class="fas fa-cart-plus"></i>
                            افزودن به سبد خرید
                        </button>
                        
                        <button class="btn-wishlist" data-id="${product.id}">
                            <i class="far fa-heart"></i>
                            افزودن به علاقه‌مندی‌ها
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    modal.style.display = 'block';
    
    // رویداد بستن مودال
    const closeBtn = modal.querySelector('.close');
    closeBtn.addEventListener('click', function() {
        document.body.removeChild(modal);
    });
    
    // بستن مودال با کلیک خارج
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            document.body.removeChild(modal);
        }
    });
    
    // رویداد افزودن به سبد خرید
    const addToCartBtn = modal.querySelector('.btn-add-cart-detail');
    addToCartBtn.addEventListener('click', function() {
        addToCart(productId);
        showNotification(`${product.name} به سبد خرید اضافه شد!`, 'success');
    });
    
    // رویداد افزودن به علاقه‌مندی‌ها
    const wishlistBtn = modal.querySelector('.btn-wishlist');
    wishlistBtn.addEventListener('click', function() {
        const icon = this.querySelector('i');
        if (icon.classList.contains('far')) {
            icon.classList.remove('far');
            icon.classList.add('fas');
            this.innerHTML = '<i class="fas fa-heart"></i> در لیست علاقه‌مندی‌ها';
            addToWishlist(productId);
        } else {
            icon.classList.remove('fas');
            icon.classList.add('far');
            this.innerHTML = '<i class="far fa-heart"></i> افزودن به علاقه‌مندی‌ها';
            removeFromWishlist(productId);
        }
    });
}

// افزودن به علاقه‌مندی‌ها
function addToWishlist(productId) {
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    
    if (!wishlist.includes(productId)) {
        wishlist.push(productId);
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        showNotification('به علاقه‌مندی‌ها اضافه شد!', 'success');
    }
}

// حذف از علاقه‌مندی‌ها
function removeFromWishlist(productId) {
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    wishlist = wishlist.filter(id => id !== productId);
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    showNotification('از علاقه‌مندی‌ها حذف شد!', 'info');
}

// نمایش مودال نظرات
function showCommentsModal(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    // بارگذاری نظرات از localStorage
    let comments = JSON.parse(localStorage.getItem('comments')) || [];
    const productComments = comments.filter(c => c.productId === productId);
    
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content comments-modal">
            <span class="close">&times;</span>
            
            <div class="comments-header">
                <h2><i class="fas fa-comments"></i> نظرات ${product.name}</h2>
                <div class="comments-stats">
                    <span><i class="fas fa-comment"></i> ${productComments.length} نظر</span>
                    <span><i class="fas fa-star"></i> ${product.rating}/5</span>
                </div>
            </div>
            
            <div class="comments-list">
                ${productComments.length > 0 ? productComments.map(comment => `
                    <div class="comment-item">
                        <div class="comment-header">
                            <div class="comment-author">
                                <i class="fas fa-user-circle"></i>
                                <strong>${comment.author}</strong>
                                ${comment.isAdmin ? '<span class="admin-badge"><i class="fas fa-user-shield"></i> ادمین</span>' : ''}
                            </div>
                            <div class="comment-date">
                                ${new Date(comment.date).toLocaleDateString('fa-IR')}
                            </div>
                        </div>
                        
                        <div class="comment-rating">
                            ${generateStarRating(comment.rating)}
                        </div>
                        
                        <div class="comment-text">
                            ${comment.text}
                        </div>
                    </div>
                `).join('') : `
                    <div class="no-comments">
                        <i class="far fa-comment-dots"></i>
                        <h3>هنوز نظری ثبت نشده است</h3>
                        <p>اولین نفری باشید که نظر می‌دهید!</p>
                    </div>
                `}
            </div>
            
            <div class="add-comment-form">
                <h3><i class="fas fa-edit"></i> ثبت نظر جدید</h3>
                
                <div class="form-group">
                    <label>امتیاز شما:</label>
                    <div class="star-rating">
                        ${[1,2,3,4,5].map(i => `
                            <i class="far fa-star" data-rating="${i}"></i>
                        `).join('')}
                    </div>
                    <input type="hidden" id="comment-rating" value="0">
                </div>
                
                <div class="form-group">
                    <label for="comment-text">نظر شما:</label>
                    <textarea id="comment-text" placeholder="نظر خود را بنویسید..." rows="4"></textarea>
                </div>
                
                <div class="form-group">
                    <label for="comment-author">نام شما:</label>
                    <input type="text" id="comment-author" placeholder="نام خود را وارد کنید">
                </div>
                
                <button class="btn-submit-comment" data-product-id="${productId}">
                    <i class="fas fa-paper-plane"></i> ثبت نظر
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    modal.style.display = 'block';
    
    // رویداد بستن مودال
    const closeBtn = modal.querySelector('.close');
    closeBtn.addEventListener('click', function() {
        document.body.removeChild(modal);
    });
    
    // بستن مودال با کلیک خارج
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            document.body.removeChild(modal);
        }
    });
    
    // تنظیم ستاره‌های امتیازدهی
    const stars = modal.querySelectorAll('.star-rating i');
    stars.forEach(star => {
        star.addEventListener('mouseover', function() {
            const rating = parseInt(this.getAttribute('data-rating'));
            highlightStars(stars, rating);
        });
        
        star.addEventListener('click', function() {
            const rating = parseInt(this.getAttribute('data-rating'));
            modal.querySelector('#comment-rating').value = rating;
            highlightStars(stars, rating, true);
        });
    });
    
    // رویداد ثبت نظر
    const submitBtn = modal.querySelector('.btn-submit-comment');
    submitBtn.addEventListener('click', function() {
        const rating = parseInt(modal.querySelector('#comment-rating').value);
        const text = modal.querySelector('#comment-text').value.trim();
        const author = modal.querySelector('#comment-author').value.trim();
        
        if (rating === 0) {
            showNotification('لطفا امتیاز دهید', 'error');
            return;
        }
        
        if (!text) {
            showNotification('لطفا متن نظر را وارد کنید', 'error');
            return;
        }
        
        if (!author) {
            showNotification('لطفا نام خود را وارد کنید', 'error');
            return;
        }
        
        // ایجاد نظر جدید
        const newComment = {
            id: Date.now(),
            productId: productId,
            author: author,
            rating: rating,
            text: text,
            date: new Date().toISOString(),
            isAdmin: false
        };
        
        // ذخیره نظر
        let allComments = JSON.parse(localStorage.getItem('comments')) || [];
        allComments.push(newComment);
        localStorage.setItem('comments', JSON.stringify(allComments));
        
        showNotification('نظر شما با موفقیت ثبت شد!', 'success');
        
        // بستن مودال
        document.body.removeChild(modal);
    });
}

// هایلایت ستاره‌های امتیاز
function highlightStars(stars, rating, permanent = false) {
    stars.forEach((star, index) => {
        star.classList.remove('fas', 'far');
        if (index < rating) {
            star.classList.add('fas');
            if (permanent) {
                star.classList.add('selected');
            }
        } else {
            star.classList.add('far');
            if (permanent) {
                star.classList.remove('selected');
            }
        }
    });
}

// نمایش نوتیفیکیشن
function showNotification(message, type = 'info') {
    // حذف نوتیفیکیشن قبلی
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // ایجاد نوتیفیکیشن جدید
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 
                        type === 'error' ? 'fa-exclamation-circle' : 
                        'fa-info-circle'}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    // نمایش با انیمیشن
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // حذف خودکار بعد از ۳ ثانیه
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 3000);
}

// قالب‌بندی قیمت
function formatPrice(price) {
    return new Intl.NumberFormat('fa-IR').format(price) + ' تومان';
}

// به‌روزرسانی تعداد سبد خرید
function updateCartCount() {
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        cartCountElement.textContent = cartCount;
    }
}

// افزودن به سبد خرید
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    // بررسی وجود محصول در سبد
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        // افزایش تعداد
        existingItem.quantity += 1;
    } else {
        // افزودن آیتم جدید
        cart.push({
            id: product.id,
            name: product.name,
            price: product.finalPrice,
            quantity: 1,
            image: product.image
        });
    }
    
    // ذخیره در localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // به‌روزرسانی تعداد
    updateCartCount();
    
    // نمایش نوتیفیکیشن
    showNotification(`${product.name} به سبد خرید اضافه شد!`, 'success');
}

// تابع‌های سراسری برای دسترسی از فایل‌های دیگر
window.products = products;
window.cart = cart;
window.addToCart = addToCart;
window.showNotification = showNotification;
window.updateCartCount = updateCartCount;
window.formatPrice = formatPrice;
window.generateStarRating = generateStarRating;