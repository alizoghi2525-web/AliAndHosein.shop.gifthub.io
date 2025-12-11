// سیستم مدیریت سبد خرید
document.addEventListener('DOMContentLoaded', function() {
    initializeCart();
});

function initializeCart() {
    // بارگذاری سبد خرید
    loadCart();
    
    // تنظیم رویدادها
    setupCartEvents();
}

function loadCart() {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    displayCartItems(cartItems);
    updateCartTotal(cartItems);
}

function setupCartEvents() {
    // باز کردن مودال سبد خرید
    const cartBtn = document.getElementById('cart-btn');
    const cartModal = document.getElementById('cart-modal');
    
    if (!cartBtn || !cartModal) return;
    
    cartBtn.addEventListener('click', function() {
        cartModal.style.display = 'block';
        loadCart();
    });
    
    // بستن مودال
    const closeBtn = cartModal.querySelector('.close');
    closeBtn.addEventListener('click', function() {
        cartModal.style.display = 'none';
    });
    
    // بستن مودال با کلیک خارج
    window.addEventListener('click', function(event) {
        if (event.target === cartModal) {
            cartModal.style.display = 'none';
        }
    });
    
    // پاک کردن سبد خرید
    const clearCartBtn = document.getElementById('clear-cart');
    if (clearCartBtn) {
        clearCartBtn.addEventListener('click', function() {
            if (confirm('آیا از پاک کردن تمامی آیتم‌های سبد خرید مطمئن هستید؟')) {
                clearCart();
            }
        });
    }
    
    // تکمیل خرید
    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', checkout);
    }
}

function displayCartItems(cartItems) {
    const cartContainer = document.getElementById('cart-items');
    
    if (!cartContainer) return;
    
    if (cartItems.length === 0) {
        cartContainer.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <h3>سبد خرید شما خالی است</h3>
                <p>می‌توانید از محصولات فروشگاه دیدن کنید و کالاهای مورد نظر خود را به سبد اضافه کنید.</p>
                <button class="btn-continue-shopping">
                    <i class="fas fa-shopping-bag"></i> ادامه خرید
                </button>
            </div>
        `;
        
        // رویداد ادامه خرید
        const continueBtn = cartContainer.querySelector('.btn-continue-shopping');
        if (continueBtn) {
            continueBtn.addEventListener('click', function() {
                document.getElementById('cart-modal').style.display = 'none';
                document.querySelector('#products-section').scrollIntoView({
                    behavior: 'smooth'
                });
            });
        }
        
        return;
    }
    
    let cartHTML = '<div class="cart-items-list">';
    
    cartItems.forEach(item => {
        const product = products.find(p => p.id === item.id);
        if (!product) return;
        
        const itemTotal = item.price * item.quantity;
        
        cartHTML += `
            <div class="cart-item" data-id="${item.id}">
                <div class="cart-item-image">
                    <img src="${product.image}" 
                         alt="${product.name}"
                         loading="lazy"
                         onerror="this.src='https://images.unsplash.com/photo-1556656793-08538906a9f8?w=150&h=150&fit=crop'">
                </div>
                
                <div class="cart-item-info">
                    <h4 class="cart-item-title">${product.name}</h4>
                    <p class="cart-item-price">${formatPrice(item.price)}</p>
                    
                    <div class="cart-item-quantity">
                        <button class="quantity-btn decrease" data-id="${item.id}" title="کاهش">
                            <i class="fas fa-minus"></i>
                        </button>
                        
                        <input type="number" 
                               class="quantity-input" 
                               value="${item.quantity}" 
                               min="1" 
                               max="10"
                               data-id="${item.id}"
                               readonly>
                        
                        <button class="quantity-btn increase" data-id="${item.id}" title="افزایش">
                            <i class="fas fa-plus"></i>
                        </button>
                    </div>
                </div>
                
                <div class="cart-item-actions">
                    <div class="cart-item-total">
                        ${formatPrice(itemTotal)}
                    </div>
                    
                    <button class="btn-remove-item" data-id="${item.id}" title="حذف">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
    });
    
    cartHTML += '</div>';
    cartContainer.innerHTML = cartHTML;
    
    // تنظیم رویدادها برای آیتم‌های سبد خرید
    setupCartItemEvents();
}

function setupCartItemEvents() {
    // افزایش تعداد
    document.querySelectorAll('.increase').forEach(btn => {
        btn.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            updateCartItemQuantity(productId, 1);
        });
    });
    
    // کاهش تعداد
    document.querySelectorAll('.decrease').forEach(btn => {
        btn.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            updateCartItemQuantity(productId, -1);
        });
    });
    
    // حذف آیتم
    document.querySelectorAll('.btn-remove-item').forEach(btn => {
        btn.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            removeFromCart(productId);
        });
    });
    
    // تغییر مستقیم تعداد
    document.querySelectorAll('.quantity-input').forEach(input => {
        input.addEventListener('change', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            const newQuantity = parseInt(this.value);
            
            if (newQuantity >= 1 && newQuantity <= 10) {
                updateCartItemQuantity(productId, 0, newQuantity);
            } else {
                this.value = 1;
                updateCartItemQuantity(productId, 0, 1);
            }
        });
    });
}

function updateCartItemQuantity(productId, change, newQuantity = null) {
    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const itemIndex = cartItems.findIndex(item => item.id === productId);
    
    if (itemIndex === -1) return;
    
    if (newQuantity !== null) {
        cartItems[itemIndex].quantity = newQuantity;
    } else {
        cartItems[itemIndex].quantity += change;
    }
    
    // حذف اگر تعداد صفر یا کمتر شد
    if (cartItems[itemIndex].quantity <= 0) {
        cartItems.splice(itemIndex, 1);
    }
    
    localStorage.setItem('cart', JSON.stringify(cartItems));
    
    // به‌روزرسانی نمایش
    displayCartItems(cartItems);
    updateCartTotal(cartItems);
    
    // به‌روزرسانی تعداد در هدر
    if (typeof updateCartCount === 'function') {
        updateCartCount();
    }
    
    // نمایش نوتیفیکیشن
    const product = products.find(p => p.id === productId);
    if (product && typeof showNotification === 'function') {
        showNotification(`تعداد ${product.name} به‌روزرسانی شد`, 'success');
    }
}

function updateCartTotal(cartItems) {
    const totalElement = document.getElementById('cart-total-price');
    if (!totalElement) return;
    
    const total = cartItems.reduce((sum, item) => {
        return sum + (item.price * item.quantity);
    }, 0);
    
    totalElement.textContent = formatPrice(total);
}

function clearCart() {
    localStorage.removeItem('cart');
    
    // به‌روزرسانی نمایش
    displayCartItems([]);
    updateCartTotal([]);
    
    // به‌روزرسانی تعداد در هدر
    if (typeof updateCartCount === 'function') {
        updateCartCount();
    }
    
    // نمایش نوتیفیکیشن
    if (typeof showNotification === 'function') {
        showNotification('سبد خرید پاک شد', 'info');
    }
}

function checkout() {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    
    if (cartItems.length === 0) {
        if (typeof showNotification === 'function') {
            showNotification('سبد خرید شما خالی است', 'error');
        }
        return;
    }
    
    // بررسی ورود کاربر
    const userData = JSON.parse(localStorage.getItem('currentUser'));
    if (!userData || !userData.loggedIn) {
        if (typeof showNotification === 'function') {
            showNotification('برای تکمیل خرید باید وارد حساب کاربری خود شوید', 'error');
        }
        
        // بستن سبد خرید و باز کردن فرم ورود
        document.getElementById('cart-modal').style.display = 'none';
        setTimeout(() => {
            const loginModal = document.getElementById('login-modal');
            if (loginModal) {
                loginModal.style.display = 'block';
            }
        }, 300);
        
        return;
    }
    
    // محاسبه مجموع
    const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // ایجاد سفارش
    const order = {
        id: 'ORD-' + Date.now(),
        userId: userData.username,
        items: cartItems,
        total: total,
        date: new Date().toISOString(),
        status: 'pending'
    };
    
    // ذخیره سفارش
    let orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));
    
    // نمایش پیام موفقیت
    if (typeof showNotification === 'function') {
        showNotification(`سفارش شما با موفقیت ثبت شد! کد سفارش: ${order.id}`, 'success');
    }
    
    // نمایش رسید
    showReceipt(order);
    
    // پاک کردن سبد خرید
    clearCart();
    
    // بستن مودال سبد خرید
    document.getElementById('cart-modal').style.display = 'none';
}

function showReceipt(order) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content receipt-modal">
            <span class="close">&times;</span>
            
            <div class="receipt-header">
                <i class="fas fa-receipt"></i>
                <h2>رسید سفارش</h2>
                <p class="order-id">کد سفارش: ${order.id}</p>
            </div>
            
            <div class="receipt-info">
                <div class="receipt-user">
                    <h3><i class="fas fa-user"></i> اطلاعات مشتری</h3>
                    <p><strong>نام:</strong> ${order.userId}</p>
                    <p><strong>تاریخ:</strong> ${new Date(order.date).toLocaleDateString('fa-IR')}</p>
                    <p><strong>ساعت:</strong> ${new Date(order.date).toLocaleTimeString('fa-IR')}</p>
                </div>
                
                <div class="receipt-items">
                    <h3><i class="fas fa-shopping-bag"></i> آیتم‌های سفارش</h3>
                    <div class="items-list">
                        ${order.items.map(item => {
                            const product = products.find(p => p.id === item.id);
                            if (!product) return '';
                            
                            const itemTotal = item.price * item.quantity;
                            
                            return `
                                <div class="receipt-item">
                                    <span class="item-name">${product.name}</span>
                                    <span class="item-quantity">${item.quantity} × ${formatPrice(item.price)}</span>
                                    <span class="item-total">${formatPrice(itemTotal)}</span>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>
                
                <div class="receipt-summary">
                    <div class="summary-row">
                        <span>جمع کل:</span>
                        <span>${formatPrice(order.total)}</span>
                    </div>
                    
                    <div class="summary-row">
                        <span>تخفیف:</span>
                        <span>${formatPrice(0)}</span>
                    </div>
                    
                    <div class="summary-row total">
                        <span>مبلغ قابل پرداخت:</span>
                        <span>${formatPrice(order.total)}</span>
                    </div>
                </div>
            </div>
            
            <div class="receipt-footer">
                <p class="thank-you">
                    <i class="fas fa-heart"></i> از خرید شما متشکریم
                </p>
                <p class="delivery-info">
                    سفارش شما در طی ۲۴ ساعت آینده پردازش خواهد شد.
                </p>
                
                <div class="receipt-actions">
                    <button class="btn-print" onclick="window.print()">
                        <i class="fas fa-print"></i> چاپ رسید
                    </button>
                    <button class="btn-close-receipt">
                        <i class="fas fa-times"></i> بستن
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    modal.style.display = 'block';
    
    // رویداد بستن
    const closeBtn = modal.querySelector('.close');
    const closeReceiptBtn = modal.querySelector('.btn-close-receipt');
    
    closeBtn.addEventListener('click', function() {
        document.body.removeChild(modal);
    });
    
    closeReceiptBtn.addEventListener('click', function() {
        document.body.removeChild(modal);
    });
    
    // بستن با کلیک خارج
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            document.body.removeChild(modal);
        }
    });
}

function removeFromCart(productId) {
    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const itemIndex = cartItems.findIndex(item => item.id === productId);
    
    if (itemIndex === -1) return;
    
    const productName = cartItems[itemIndex].name;
    cartItems.splice(itemIndex, 1);
    
    localStorage.setItem('cart', JSON.stringify(cartItems));
    
    // به‌روزرسانی نمایش
    displayCartItems(cartItems);
    updateCartTotal(cartItems);
    
    // به‌روزرسانی تعداد در هدر
    if (typeof updateCartCount === 'function') {
        updateCartCount();
    }
    
    // نمایش نوتیفیکیشن
    if (typeof showNotification === 'function') {
        showNotification(`${productName} از سبد خرید حذف شد`, 'info');
    }
}

// قالب‌بندی قیمت
function formatPrice(price) {
    return new Intl.NumberFormat('fa-IR').format(price) + ' تومان';
}

// افزودن به سبد خرید (برای دسترسی از فایل main.js)
window.removeFromCart = removeFromCart;
window.updateCartItemQuantity = updateCartItemQuantity;