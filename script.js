// Debounce helper
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ===== Optimized Parallax Scroll Effect =====
function initParallax() {
    const parallaxElements = document.querySelectorAll('[data-parallax="true"]');
    
    if (parallaxElements.length === 0) return;
    
    let ticking = false;
    let lastScrollPosition = 0;
    
    const updateParallax = () => {
        parallaxElements.forEach(element => {
            const scrollPosition = window.pageYOffset;
            const elementOffset = element.offsetTop;
            const distance = scrollPosition - elementOffset;
            const speed = parseFloat(element.dataset.speed || 0.5);
            const translateY = distance * speed;
            
            // Use GPU-accelerated transform
            element.style.transform = `translate3d(0, ${translateY}px, 0)`;
        });
        
        ticking = false;
    };
    
    const onScroll = () => {
        lastScrollPosition = window.pageYOffset;
        
        if (!ticking) {
            window.requestAnimationFrame(updateParallax);
            ticking = true;
        }
    };
    
    // Use passive event listener for better scroll performance
    window.addEventListener('scroll', onScroll, { passive: true });
}

// Initialize parallax on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initParallax);
} else {
    initParallax();
}

// ===== Smooth Scroll Behavior =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

// ===== Active Navigation Link =====
function setActiveNavLink() {
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        link.classList.remove('active');
    });

    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    links.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// Call on page load
setActiveNavLink();

// ===== Project Filter Functionality =====
const filterButtons = document.querySelectorAll('.filter-btn');
const projectItems = document.querySelectorAll('.project-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');

        // Filter projects
        const filterValue = button.getAttribute('data-filter');
        projectItems.forEach(item => {
            if (filterValue === 'all') {
                item.style.display = 'grid';
                // Fade in animation
                item.style.opacity = '0';
                setTimeout(() => {
                    item.style.transition = 'opacity 0.3s ease';
                    item.style.opacity = '1';
                }, 0);
            } else {
                const category = item.getAttribute('data-category');
                if (category === filterValue) {
                    item.style.display = 'grid';
                    item.style.opacity = '0';
                    setTimeout(() => {
                        item.style.transition = 'opacity 0.3s ease';
                        item.style.opacity = '1';
                    }, 0);
                } else {
                    item.style.display = 'none';
                }
            }
        });
    });
});

// ===== Scroll Animation for Elements =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe skill cards and project cards
document.querySelectorAll('.skill-card, .project-card, .interest-card, .competency-card, .tool-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
});

// Observe text elements
document.querySelectorAll('.about-main-content, .section-title, .about-main-text, .contact-info, .contact-form, .section-subtitle').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ===== Mobile Menu Toggle (for future enhancement) =====
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    if (navLinks) {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    }
}

// ===== Copy Contact Info to Clipboard =====
document.querySelectorAll('.contact-link').forEach(link => {
    link.addEventListener('click', (e) => {
        // Allow normal link behavior for email and phone
        // This is just a placeholder for future enhancement
    });
});

// ===== Add Scroll Effect to Navbar (optimized with requestAnimationFrame) =====
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');
if (navbar) {
    let navbarTick = false;
    function updateNavbarShadow() {
        const scrollTop = lastScrollTop;
        if (scrollTop > 50) {
            navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
        }
        navbarTick = false;
    }

    window.addEventListener('scroll', () => {
        lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (!navbarTick) {
            window.requestAnimationFrame(updateNavbarShadow);
            navbarTick = true;
        }
    }, { passive: true });
}

// ===== Page Load Animation =====
window.addEventListener('load', () => {
    const elements = document.querySelectorAll('.hero-content, .hero-image');
    elements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 200);
    });
});

// Theme Toggle (accessible) with Persistence
const themeToggleBtn = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;

function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    htmlElement.setAttribute('data-theme', savedTheme);
    if (themeToggleBtn) {
        const isLight = savedTheme === 'light';
        themeToggleBtn.setAttribute('aria-pressed', isLight ? 'true' : 'false');
    }
}

if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
        const current = htmlElement.getAttribute('data-theme') || 'dark';
        const next = current === 'dark' ? 'light' : 'dark';
        htmlElement.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
        themeToggleBtn.setAttribute('aria-pressed', next === 'light' ? 'true' : 'false');
    });
}

initTheme();

// Set current year in footer
const yearEl = document.getElementById('year');
if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
}

// Magnetic Button Effect (throttled with requestAnimationFrame per button)
document.querySelectorAll('.magnetic-btn').forEach(btn => {
    let mouseX = 0, mouseY = 0, ticking = false;

    function updateBtnTransform() {
        btn.style.setProperty('--mouse-x', (mouseX * 0.2) + 'px');
        btn.style.setProperty('--mouse-y', (mouseY * 0.2) + 'px');
        btn.style.transform = `translate(var(--mouse-x), var(--mouse-y))`;
        ticking = false;
    }

    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        mouseX = e.clientX - rect.left - rect.width / 2;
        mouseY = e.clientY - rect.top - rect.height / 2;
        if (!ticking) {
            window.requestAnimationFrame(updateBtnTransform);
            ticking = true;
        }
    });

    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0, 0)';
    });
});

// Form Submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        console.log('Form submitted:', Object.fromEntries(formData));
        
        alert('Thank you! Your message has been sent successfully.');
        contactForm.reset();
    });
}

// ===== Initialize Page =====
document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfolio website loaded successfully!');
});

// Add fadeIn animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(style);

// Performance: Lazy Load Images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[loading="lazy"]').forEach(img => {
        imageObserver.observe(img);
    });
}
