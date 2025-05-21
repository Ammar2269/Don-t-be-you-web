// Sample book data - Moved to the top of the file
const books = {
    '1': { 
        titleEn: 'The Silent Patient', 
        titleAr: 'المريض الصامت', 
        price: 12.99,
        category: 'fiction'
    },
    '2': { 
        titleEn: 'Atomic Habits', 
        titleAr: 'العادات الذرية', 
        price: 14.99,
        category: 'non-fiction'
    },
    '3': { 
        titleEn: 'Educated', 
        titleAr: 'متعلمة', 
        price: 13.99,
        category: 'non-fiction'
    },
    '4': { 
        titleEn: 'The Midnight Library', 
        titleAr: 'مكتبة منتصف الليل', 
        price: 11.99,
        category: 'fiction'
    },
    '5': { 
        titleEn: 'The Alchemist', 
        titleAr: 'الخيميائي', 
        price: 10.99,
        category: 'fiction'
    },
    '6': { 
        titleEn: 'Sapiens', 
        titleAr: 'سابينز', 
        price: 15.99,
        category: 'non-fiction'
    },
    '7': { 
        titleEn: 'The Great Gatsby', 
        titleAr: 'غاتسبي العظيم', 
        price: 9.99,
        category: 'fiction'
    },
    '8': { 
        titleEn: 'Thinking, Fast and Slow', 
        titleAr: 'التفكير، بسرعة وببطء', 
        price: 12.99,
        category: 'non-fiction'
    }
};

// Language Toggle
const langToggle = document.getElementById('lang-toggle');
const langText = document.getElementById('lang-text');
let currentLang = 'en';

langToggle.addEventListener('click', () => {
    currentLang = currentLang === 'en' ? 'ar' : 'en';
    langText.textContent = currentLang === 'en' ? 'EN' : 'AR';
    document.body.classList.toggle('rtl');
    updateTexts();
});

function updateTexts() {
    document.querySelectorAll('[data-en], [data-ar]').forEach(element => {
        if (element.dataset[currentLang]) {
            if (element.tagName === 'INPUT' && element.placeholder) {
                element.placeholder = element.dataset[currentLang];
            } else {
                element.textContent = element.dataset[currentLang];
            }
        }
    });
}

// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle.querySelector('i');
let currentTheme = 'dark';

themeToggle.addEventListener('click', () => {
    currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    if (currentTheme === 'dark') {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    } else {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }
    
    localStorage.setItem('theme', currentTheme);
});

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    currentTheme = savedTheme;
    document.documentElement.setAttribute('data-theme', currentTheme);
    if (currentTheme === 'light') {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }
}

// User Authentication
const userAvatar = document.getElementById('user-avatar');
const userMenu = document.getElementById('user-menu');
const profileLink = document.getElementById('profile-link');
const logoutLink = document.getElementById('logout-link');
const loginPage = document.getElementById('login-page');
const registerPage = document.getElementById('register-page');
const showRegister = document.getElementById('show-register');
const showLogin = document.getElementById('show-login');
const loginBtn = document.getElementById('login-btn');
const registerBtn = document.getElementById('register-btn');
const profilePage = document.getElementById('profile-page');
    
let isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;

// Toggle user menu
userAvatar.addEventListener('click', (e) => {
    e.stopPropagation();
    if (isLoggedIn) {
        userMenu.classList.toggle('show');
    } else {
        showPage('login');
    }
});

// Close user menu when clicking outside
document.addEventListener('click', (e) => {
    if (!userMenu.contains(e.target) && e.target !== userAvatar) {
        userMenu.classList.remove('show');
    }
});

// Profile link
profileLink.addEventListener('click', (e) => {
    e.preventDefault();
    userMenu.classList.remove('show');
    showPage('profile');
});

// Logout
logoutLink.addEventListener('click', (e) => {
    e.preventDefault();
    isLoggedIn = false;
    currentUser = null;
    localStorage.setItem('isLoggedIn', 'false');
    localStorage.removeItem('currentUser');
    userMenu.classList.remove('show');
    showPage('home');
});

// Show register form
showRegister.addEventListener('click', (e) => {
    e.preventDefault();
    showPage('register');
});

// Show login form
showLogin.addEventListener('click', (e) => {
    e.preventDefault();
    showPage('login');
});

// Login function
loginBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    // Simple validation
    if (email && password) {
        isLoggedIn = true;
        currentUser = {
            name: "John Doe",
            email: email,
            joinDate: "January 2023"
        };
        
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        
        showPage('home');
    } else {
        alert(currentLang === 'en' ? 'Please enter both email and password' : 'الرجاء إدخال البريد الإلكتروني وكلمة المرور');
    }
});

// Register function
registerBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const name = document.getElementById('register-name').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('register-confirm').value;
    
    // Simple validation
    if (name && email && password && confirmPassword) {
        if (password === confirmPassword) {
            isLoggedIn = true;
            currentUser = {
                name: name,
                email: email,
                joinDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
            };
            
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            
            showPage('home');
        } else {
            alert(currentLang === 'en' ? 'Passwords do not match' : 'كلمات المرور غير متطابقة');
        }
    } else {
        alert(currentLang === 'en' ? 'Please fill in all fields' : 'الرجاء ملء جميع الحقول');
    }
});

// Navigation between pages
const pages = {
    'home': document.getElementById('home-page'),
    'books': document.getElementById('books-page'),
    'faq': document.getElementById('faq-page'),
    'contact': document.getElementById('contact-page'),
    'profile': profilePage,
    'login': loginPage,
    'register': registerPage,
    'payment': document.getElementById('payment')
};

const homeLink = document.getElementById('home-link');
const homeNavLink = document.getElementById('home-nav-link');
const booksNavLink = document.getElementById('books-nav-link');
const faqNavLink = document.getElementById('faq-nav-link');
const contactNavLink = document.getElementById('contact-nav-link');
const footerContactLink = document.getElementById('footer-contact-link');
const footerFaqLink = document.getElementById('footer-faq-link');
const browseBooksBtn = document.getElementById('browse-books-btn');
const browseAllBtn = document.getElementById('browse-all-btn');
const backToCartBtn = document.getElementById('back-to-cart');
    
function showPage(page) {
    // Hide all pages
    Object.values(pages).forEach(pageElement => {
        pageElement.style.display = 'none';
    });
    
    // Show the requested page
    if (pages[page]) {
        pages[page].style.display = 'block';
    }
    
    // Scroll to top
    window.scrollTo(0, 0);
    
    // Close user menu
    userMenu.classList.remove('show');
}
    
homeLink.addEventListener('click', (e) => {
    e.preventDefault();
    showPage('home');
});
    
homeNavLink.addEventListener('click', (e) => {
    e.preventDefault();
    showPage('home');
});
    
booksNavLink.addEventListener('click', (e) => {
    e.preventDefault();
    showPage('books');
});
    
faqNavLink.addEventListener('click', (e) => {
    e.preventDefault();
    showPage('faq');
});
    
contactNavLink.addEventListener('click', (e) => {
    e.preventDefault();
    showPage('contact');
});
    
footerContactLink.addEventListener('click', (e) => {
    e.preventDefault();
    showPage('contact');
});
    
footerFaqLink.addEventListener('click', (e) => {
    e.preventDefault();
    showPage('faq');
});
    
browseBooksBtn.addEventListener('click', (e) => {
    e.preventDefault();
    showPage('books');
});
    
browseAllBtn.addEventListener('click', (e) => {
    e.preventDefault();
    showPage('books');
});

backToCartBtn.addEventListener('click', (e) => {
    e.preventDefault();
    showPage('home');
    cartModal.classList.add('show');
});

// FAQ Accordion
const faqQuestions = document.querySelectorAll('.faq-question');
faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const answer = question.nextElementSibling;
        const isOpen = answer.style.display === 'block';
        
        // Close all answers
        document.querySelectorAll('.faq-answer').forEach(ans => {
            ans.style.display = 'none';
            ans.previousElementSibling.querySelector('i').className = 'fas fa-chevron-down';
        });
        
        // Open clicked answer if it was closed
        if (!isOpen) {
            answer.style.display = 'block';
            question.querySelector('i').className = 'fas fa-chevron-up';
        }
    });
});

// Book Selection Functionality
const bookCards = document.querySelectorAll('.book-card, .book-card-grid');
const bookDetails = document.querySelectorAll('.book-detail');
const defaultBook = document.getElementById('default-book');
const recentlyViewedList = document.getElementById('recently-viewed-list');
let recentlyViewed = JSON.parse(localStorage.getItem('recentlyViewed')) || [];

bookCards.forEach(card => {
    card.addEventListener('click', (e) => {
        // Don't trigger if clicking on the add to cart button or wishlist button
        if (e.target.classList.contains('add-to-cart') || 
            e.target.classList.contains('add-to-cart-grid') || 
            e.target.classList.contains('wishlist-btn') || 
            e.target.closest('.wishlist-btn')) return;
        
        const bookId = card.dataset.id;
        
        // Add to recently viewed
        if (!recentlyViewed.includes(bookId)) {
            recentlyViewed.unshift(bookId);
            if (recentlyViewed.length > 3) {
                recentlyViewed = recentlyViewed.slice(0, 3);
            }
            localStorage.setItem('recentlyViewed', JSON.stringify(recentlyViewed));
            updateRecentlyViewed();
        }
        
        // Hide all book details
        bookDetails.forEach(detail => {
            detail.classList.remove('active');
        });
        
        // Hide default message
        defaultBook.classList.remove('active');
        
        // Show selected book detail with animation
        const selectedBook = document.getElementById(`book-${bookId}`);
        if (selectedBook) {
            selectedBook.classList.add('active');
            selectedBook.style.animation = 'bookExpand 0.5s ease';
            
            // Scroll to top of content area
            document.querySelector('.content-area').scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    });
});

// Update recently viewed books
function updateRecentlyViewed() {
    recentlyViewedList.innerHTML = '';
    
    if (recentlyViewed.length === 0) {
        recentlyViewedList.innerHTML = `<p data-en="No recently viewed books" data-ar="لا توجد كتب شوهدت مؤخراً">No recently viewed books</p>`;
    } else {
        recentlyViewed.forEach(bookId => {
            const book = books[bookId];
            if (book) {
                const bookCard = document.createElement('div');
                bookCard.className = 'book-card';
                bookCard.dataset.id = bookId;
                
                const title = currentLang === 'en' ? book.titleEn : book.titleAr;
                
                bookCard.innerHTML = `
                    <div class="book-cover">
                        <img src="https://picsum.photos/70/100?random=${bookId}" alt="${title}">
                    </div>
                    <div class="book-info">
                        <h3 class="book-title">${title}</h3>
                        <div class="book-price">
                            <span class="price">$${book.price}</span>
                        </div>
                    </div>
                `;
                
                recentlyViewedList.appendChild(bookCard);
            }
        });
    }
}

// Initialize recently viewed
updateRecentlyViewed();

// Cart Functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
const cartBtn = document.getElementById('cart-btn');
const wishlistBtn = document.getElementById('wishlist-btn');
const cartModal = document.getElementById('cart-modal');
const wishlistModal = document.getElementById('wishlist-modal');
const closeModal = document.querySelectorAll('.close-modal');
const cartItemsContainer = document.getElementById('cart-items');
const wishlistItemsContainer = document.getElementById('wishlist-items');
const cartCount = document.getElementById('cart-count');
const cartTotal = document.getElementById('cart-total');
const checkoutBtn = document.getElementById('checkout-btn');
const addToCartBtns = document.querySelectorAll('.add-to-cart, .add-to-cart-grid');
const addToCartDetailBtns = document.querySelectorAll('.add-to-cart-detail');
const wishlistBtns = document.querySelectorAll('.wishlist-btn');
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const categoryBtns = document.querySelectorAll('.category-btn');
const loader = document.getElementById('loader');

// Initialize the page
function initPage() {
    updateCart();
    updateWishlist();
    updateWishlistButtons();
    showPage('home');
}

// Add to cart function
function addToCart(bookId) {
    const book = books[bookId];
    
    // Check if book already in cart
    const existingItem = cart.find(item => item.id === bookId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: bookId,
            titleEn: book.titleEn,
            titleAr: book.titleAr,
            price: book.price,
            quantity: 1
        });
    }
    
    updateCart();
    showCartNotification();
    saveCartToLocalStorage();
}

// Remove from cart function
function removeFromCart(bookId) {
    const index = cart.findIndex(item => item.id === bookId);
    if (index !== -1) {
        if (cart[index].quantity > 1) {
            cart[index].quantity -= 1;
        } else {
            cart.splice(index, 1);
        }
        updateCart();
        saveCartToLocalStorage();
    }
}

// Update cart display
function updateCart() {
    // Update cart count
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = `(${totalItems})`;
    
    // Update cart modal
    cartItemsContainer.innerHTML = '';
    let total = 0;
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `<p data-en="Your cart is empty" data-ar="سلة التسوق فارغة">Your cart is empty</p>`;
    } else {
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            
            const title = currentLang === 'en' ? item.titleEn : item.titleAr;
            const price = (item.price * item.quantity).toFixed(2);
            
            cartItem.innerHTML = `
                <div class="cart-item-info">
                    <div class="cart-item-title">${title}</div>
                    <div class="cart-item-price">$${item.price} x ${item.quantity}</div>
                </div>
                <div class="cart-item-total">$${price}</div>
                <button class="cart-item-remove" data-id="${item.id}">
                    <i class="fas fa-trash"></i>
                </button>
            `;
            
            cartItemsContainer.appendChild(cartItem);
            total += item.price * item.quantity;
        });
    }
    
    cartTotal.textContent = `$${total.toFixed(2)}`;
}

// Add to wishlist function
function toggleWishlist(bookId) {
    const index = wishlist.indexOf(bookId);
    if (index === -1) {
        wishlist.push(bookId);
    } else {
        wishlist.splice(index, 1);
    }
    
    updateWishlist();
    updateWishlistButtons();
    saveWishlistToLocalStorage();
}

// Update wishlist display
function updateWishlist() {
    wishlistItemsContainer.innerHTML = '';
    
    if (wishlist.length === 0) {
        wishlistItemsContainer.innerHTML = `<p data-en="Your wishlist is empty" data-ar="قائمة المفضلة فارغة">Your wishlist is empty</p>`;
    } else {
        wishlist.forEach(bookId => {
            const book = books[bookId];
            const wishlistItem = document.createElement('div');
            wishlistItem.className = 'wishlist-item';
            
            const title = currentLang === 'en' ? book.titleEn : book.titleAr;
            
            wishlistItem.innerHTML = `
                <div class="wishlist-item-cover">
                    <img src="https://picsum.photos/50/70?random=${bookId}" alt="${title}">
                </div>
                <div class="wishlist-item-info">
                    <div class="wishlist-item-title">${title}</div>
                    <div class="wishlist-item-price">$${book.price}</div>
                </div>
                <button class="wishlist-item-remove" data-id="${bookId}">
                    <i class="fas fa-times"></i>
                </button>
            `;
            
            wishlistItemsContainer.appendChild(wishlistItem);
        });
    }
}

// Update wishlist buttons state
function updateWishlistButtons() {
    wishlistBtns.forEach(btn => {
        const bookId = btn.dataset.id;
        if (wishlist.includes(bookId)) {
            btn.innerHTML = '<i class="fas fa-heart"></i>';
            btn.classList.add('active');
        } else {
            btn.innerHTML = '<i class="far fa-heart"></i>';
            btn.classList.remove('active');
        }
    });
}

// Show cart notification
function showCartNotification() {
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.textContent = currentLang === 'en' ? 'Item added to cart!' : 'تمت إضافة العنصر إلى السلة!';
    notification.style.position = 'fixed';
    notification.style.bottom = '20px';
    notification.style.right = '20px';
    notification.style.backgroundColor = 'var(--text-color)';
    notification.style.color = 'var(--bg-color)';
    notification.style.padding = '10px 20px';
    notification.style.borderRadius = '5px';
    notification.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
    notification.style.zIndex = '1000';
    notification.style.animation = 'fadeInUp 0.3s ease';
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'fadeOutDown 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 2000);
}

// Save cart to local storage
function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Save wishlist to local storage
function saveWishlistToLocalStorage() {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
}

// Search functionality
function searchBooks(query) {
    loader.style.display = 'block';
    
    // Simulate API call with timeout
    setTimeout(() => {
        const normalizedQuery = query.toLowerCase();
        bookCards.forEach(card => {
            const title = card.querySelector('.book-title, .book-title-grid').textContent.toLowerCase();
            const author = card.querySelector('.book-author, .book-author-grid').textContent.toLowerCase();
            
            if (title.includes(normalizedQuery) || author.includes(normalizedQuery)) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
        
        loader.style.display = 'none';
    }, 500);
}

// Filter by category
function filterByCategory(category) {
    bookCards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
}

// Event listeners
addToCartBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const bookId = btn.closest('.book-card, .book-card-grid').dataset.id;
        addToCart(bookId);
    });
});

addToCartDetailBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const bookId = btn.dataset.id;
        addToCart(bookId);
    });
});

wishlistBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const bookId = btn.dataset.id;
        toggleWishlist(bookId);
    });
});

// Remove from cart
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('cart-item-remove') || e.target.closest('.cart-item-remove')) {
        const btn = e.target.classList.contains('cart-item-remove') ? e.target : e.target.closest('.cart-item-remove');
        const bookId = btn.dataset.id;
        removeFromCart(bookId);
    }
});

// Remove from wishlist
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('wishlist-item-remove') || e.target.closest('.wishlist-item-remove')) {
        const btn = e.target.classList.contains('wishlist-item-remove') ? e.target : e.target.closest('.wishlist-item-remove');
        const bookId = btn.dataset.id;
        const index = wishlist.indexOf(bookId);
        if (index !== -1) {
            wishlist.splice(index, 1);
            updateWishlist();
            updateWishlistButtons();
            saveWishlistToLocalStorage();
        }
    }
});

// Search event listeners
searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    searchBooks(searchInput.value);
});

searchInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        searchBooks(searchInput.value);
    }
});

// Category filter
categoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        categoryBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        filterByCategory(btn.dataset.category);
    });
});

// Modal functionality
cartBtn.addEventListener('click', (e) => {
    e.preventDefault();
    cartModal.classList.add('show');
    updateCart();
});

wishlistBtn.addEventListener('click', (e) => {
    e.preventDefault();
    wishlistModal.classList.add('show');
    updateWishlist();
});

closeModal.forEach(btn => {
    btn.addEventListener('click', () => {
        cartModal.classList.remove('show');
        wishlistModal.classList.remove('show');
    });
});

window.addEventListener('click', (e) => {
    if (e.target === cartModal) {
        cartModal.classList.remove('show');
    }
    if (e.target === wishlistModal) {
        wishlistModal.classList.remove('show');
    }
});

// Checkout functionality
checkoutBtn.addEventListener('click', () => {
    if (!isLoggedIn) {
        alert(currentLang === 'en' ? 'Please login to proceed to checkout' : 'الرجاء تسجيل الدخول للمتابعة إلى الدفع');
        showPage('login');
    } else {
        cartModal.classList.remove('show');
        showPage('payment');
    }
});

// Payment form submission
const paymentForm = document.querySelector('.payment-form');
paymentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert(currentLang === 'en' 
        ? 'Payment successful! Thank you for your purchase.' 
        : 'تمت عملية الدفع بنجاح! شكراً لشرائك.');
    cart = [];
    updateCart();
    saveCartToLocalStorage();
    showPage('home');
});

// Add animation to elements when they come into view
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.book-card, .book-card-grid, .section-title, .payment-container, .contact-card, .faq-item');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Set initial styles for animated elements
document.querySelectorAll('.book-card, .book-card-grid, .section-title, .payment-container, .contact-card, .faq-item').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
});

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', () => {
    animateOnScroll();
    initPage();
});
// Mobile Menu Functionality
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenuClose = document.getElementById('mobile-menu-close');
const mobileMenu = document.getElementById('mobile-menu');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
const mobileThemeToggle = document.getElementById('mobile-theme-toggle');
const mobileLangToggle = document.getElementById('mobile-lang-toggle');
const mobileWishlistBtn = document.getElementById('mobile-wishlist-btn');
const mobileCartBtn = document.getElementById('mobile-cart-btn');
const mobileCartCount = document.getElementById('mobile-cart-count');

// Toggle mobile menu
mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.add('show');
    document.body.style.overflow = 'hidden';
});

mobileMenuClose.addEventListener('click', () => {
    mobileMenu.classList.remove('show');
    document.body.style.overflow = '';
});

// Close menu when clicking on a link
mobileNavLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const page = link.dataset.page;
        showPage(page);
        mobileMenu.classList.remove('show');
        document.body.style.overflow = '';
    });
});

// Mobile theme toggle
mobileThemeToggle.addEventListener('click', () => {
    themeToggle.click(); // Trigger the same function as desktop theme toggle
});

// Mobile language toggle
mobileLangToggle.addEventListener('click', () => {
    langToggle.click(); // Trigger the same function as desktop language toggle
});

// Mobile wishlist button
mobileWishlistBtn.addEventListener('click', () => {
    wishlistBtn.click(); // Trigger the same function as desktop wishlist button
    mobileMenu.classList.remove('show');
    document.body.style.overflow = '';
});

// Mobile cart button
mobileCartBtn.addEventListener('click', () => {
    cartBtn.click(); // Trigger the same function as desktop cart button
    mobileMenu.classList.remove('show');
    document.body.style.overflow = '';
});

// Update mobile cart count when cart changes
function updateCart() {
    // ... existing cart update code ...
    
    // Update mobile cart count
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    mobileCartCount.textContent = `(${totalItems})`;
}

// Learn More Button Functionality
const learnMoreBtn = document.getElementById('learn-more-btn');
const backFromLearnMore = document.getElementById('back-from-learn-more');
const learnMoreSection = document.getElementById('learn-more-section');
const homePage = document.getElementById('home-page');

learnMoreBtn.addEventListener('click', (e) => {
    e.preventDefault();
    homePage.style.display = 'none';
    learnMoreSection.style.display = 'block';
});

backFromLearnMore.addEventListener('click', (e) => {
    e.preventDefault();
    learnMoreSection.style.display = 'none';
    homePage.style.display = 'block';
});
