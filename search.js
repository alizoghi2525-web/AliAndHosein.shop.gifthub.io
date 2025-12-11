// سیستم جستجوی پیشرفته
document.addEventListener('DOMContentLoaded', function() {
    initializeSearch();
});

function initializeSearch() {
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    
    if (!searchInput || !searchBtn) return;
    
    // جستجو با دکمه
    searchBtn.addEventListener('click', performSearch);
    
    // جستجو با کلید Enter
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
    
    // جستجوی خودکار با تاخیر
    let searchTimeout;
    searchInput.addEventListener('input', function() {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(performSearch, 500);
    });
}

function performSearch() {
    const searchInput = document.getElementById('search-input');
    const searchTerm = searchInput.value.trim().toLowerCase();
    
    if (!searchTerm) {
        // اگر جستجو خالی است، همه محصولات را نمایش بده
        if (typeof displayProducts === 'function') {
            displayProducts(products);
        }
        return;
    }
    
    // فیلتر کردن محصولات
    const searchResults = products.filter(product => {
        // جستجو در نام محصول
        if (product.name.toLowerCase().includes(searchTerm)) {
            return true;
        }
        
        // جستجو در توضیحات محصول
        if (product.description.toLowerCase().includes(searchTerm)) {
            return true;
        }
        
        // جستجو در دسته‌بندی
        const categoryNames = {
            gaming: "گیمینگ",
            mobile: "موبایل",
            gadgets: "گجت و صدا",
            ebooks: "کتاب دیجیتال",
            electric: "کالای برقی"
        };
        
        if (categoryNames[product.category]?.toLowerCase().includes(searchTerm)) {
            return true;
        }
        
        // جستجو در قیمت (اعداد)
        const priceTerm = searchTerm.replace(/[^0-9]/g, '');
        if (priceTerm) {
            const price = parseInt(priceTerm);
            if (product.finalPrice.toString().includes(priceTerm) || 
                product.originalPrice.toString().includes(priceTerm)) {
                return true;
            }
        }
        
        return false;
    });
    
    // نمایش نتایج
    if (typeof displayProducts === 'function') {
        if (searchResults.length > 0) {
            displayProducts(searchResults);
            
            // نمایش تعداد نتایج
            if (typeof showNotification === 'function') {
                showNotification(`${searchResults.length} محصول یافت شد`, 'success');
            }
        } else {
            displayProducts([]);
            
            // نمایش پیام عدم یافتن
            if (typeof showNotification === 'function') {
                showNotification('محصولی با این مشخصات یافت نشد', 'error');
            }
        }
    }
}

// جستجوی پیشرفته با پارامترهای مختلف
function advancedSearch(params) {
    let results = [...products];
    
    // فیلتر بر اساس دسته‌بندی
    if (params.category) {
        results = results.filter(product => product.category === params.category);
    }
    
    // فیلتر بر اساس محدوده قیمت
    if (params.minPrice) {
        results = results.filter(product => product.finalPrice >= params.minPrice);
    }
    
    if (params.maxPrice) {
        results = results.filter(product => product.finalPrice <= params.maxPrice);
    }
    
    // فیلتر بر اساس امتیاز
    if (params.minRating) {
        results = results.filter(product => product.rating >= params.minRating);
    }
    
    // فیلتر بر اساس تخفیف
    if (params.hasDiscount) {
        results = results.filter(product => product.finalPrice < product.originalPrice);
    }
    
    // مرتب‌سازی
    if (params.sortBy) {
        switch(params.sortBy) {
            case 'price-asc':
                results.sort((a, b) => a.finalPrice - b.finalPrice);
                break;
            case 'price-desc':
                results.sort((a, b) => b.finalPrice - a.finalPrice);
                break;
            case 'rating':
                results.sort((a, b) => b.rating - a.rating);
                break;
            case 'discount':
                results.sort((a, b) => {
                    const discountA = 1 - (a.finalPrice / a.originalPrice);
                    const discountB = 1 - (b.finalPrice / b.originalPrice);
                    return discountB - discountA;
                });
                break;
        }
    }
    
    return results;
}

// جستجوی سریع (برای لینک‌ها)
function quickSearch(keyword) {
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.value = keyword;
        performSearch();
    }
}

// صادر کردن توابع برای استفاده در سایر فایل‌ها
window.performSearch = performSearch;
window.advancedSearch = advancedSearch;
window.quickSearch = quickSearch;