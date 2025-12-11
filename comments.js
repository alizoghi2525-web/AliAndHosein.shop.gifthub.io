// سیستم نظرات و دیدگاه‌ها
document.addEventListener('DOMContentLoaded', function() {
    initializeComments();
});

function initializeComments() {
    // مطمئن شویم نظرات در localStorage وجود دارند
    if (!localStorage.getItem('comments')) {
        // ایجاد نظرات اولیه
        const initialComments = [
            {
                id: 1,
                productId: 1,
                author: "محمد",
                rating: 5,
                text: "کنسول فوق‌العاده‌ای است! گرافیک ۴K واقعاً باورنکردنی است.",
                date: "2023-10-15T10:30:00Z",
                isAdmin: false
            },
            {
                id: 2,
                productId: 1,
                author: "سارا",
                rating: 4,
                text: "کیفیت ساخت عالی ولی بدون درایو دیسک کمی محدود کننده است.",
                date: "2023-10-20T14:45:00Z",
                isAdmin: false
            },
            {
                id: 3,
                productId: 8,
                author: "علی (ادمین)",
                rating: 5,
                text: "بهترین گوشی بازار از نظر دوربین و عملکرد. توصیه می‌کنم.",
                date: "2023-10-25T09:15:00Z",
                isAdmin: true
            },
            {
                id: 4,
                productId: 15,
                author: "رضا",
                rating: 5,
                text: "نویزکنسلینگ این هدفون واقعاً عالی است. برای مسافرت‌های طولانی عالی است.",
                date: "2023-11-01T16:20:00Z",
                isAdmin: false
            },
            {
                id: 5,
                productId: 22,
                author: "حسین (ادمین)",
                rating: 5,
                text: "کتاب بسیار جامعی است. برای توسعه‌دهندگان وب حتماً مفید خواهد بود.",
                date: "2023-11-05T11:10:00Z",
                isAdmin: true
            }
        ];
        
        localStorage.setItem('comments', JSON.stringify(initialComments));
    }
}

// دریافت نظرات یک محصول
function getProductComments(productId) {
    const comments = JSON.parse(localStorage.getItem('comments')) || [];
    return comments.filter(comment => comment.productId === productId);
}

// محاسبه میانگین امتیاز یک محصول
function getProductAverageRating(productId) {
    const comments = getProductComments(productId);
    
    if (comments.length === 0) {
        return 0;
    }
    
    const totalRating = comments.reduce((sum, comment) => sum + comment.rating, 0);
    return (totalRating / comments.length).toFixed(1);
}

// افزودن نظر جدید
function addComment(productId, author, rating, text) {
    const comments = JSON.parse(localStorage.getItem('comments')) || [];
    
    const newComment = {
        id: Date.now(),
        productId: productId,
        author: author,
        rating: rating,
        text: text,
        date: new Date().toISOString(),
        isAdmin: false
    };
    
    comments.push(newComment);
    localStorage.setItem('comments', JSON.stringify(comments));
    
    return newComment;
}

// حذف نظر
function deleteComment(commentId) {
    let comments = JSON.parse(localStorage.getItem('comments')) || [];
    comments = comments.filter(comment => comment.id !== commentId);
    localStorage.setItem('comments', JSON.stringify(comments));
}

// دریافت تعداد نظرات یک محصول
function getCommentCount(productId) {
    const comments = getProductComments(productId);
    return comments.length;
}

// صادر کردن توابع
window.getProductComments = getProductComments;
window.getProductAverageRating = getProductAverageRating;
window.addComment = addComment;
window.deleteComment = deleteComment;
window.getCommentCount = getCommentCount;