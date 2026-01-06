// Smooth scrolling
document.querySelectorAll('.smooth-scroll').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Mobile menu toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-nav a');

mobileMenuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
});

mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Countdown timer
function updateCountdown() {
    const countdownDate = new Date();
    countdownDate.setHours(countdownDate.getHours() + 24);
    
    const timer = setInterval(() => {
        const now = new Date().getTime();
        const distance = countdownDate - now;
        
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
        
        if (distance < 0) {
            clearInterval(timer);
            updateCountdown();
        }
    }, 1000);
}

updateCountdown();

// Number counter animation
function animateNumbers() {
    const numbers = document.querySelectorAll('.stat-number');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };
    
    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const dataTarget = target.getAttribute('data-target');
                
                // Handle different number formats
                let finalValue, suffix = '';
                
                if (dataTarget.includes('+')) {
                    finalValue = parseInt(dataTarget.replace('+', ''));
                    suffix = '+';
                } else if (dataTarget.includes('%')) {
                    finalValue = parseInt(dataTarget.replace('%', ''));
                    suffix = '%';
                } else {
                    finalValue = parseInt(dataTarget);
                }
                
                const duration = 2000;
                const step = finalValue / (duration / 16);
                let current = 0;
                
                const updateNumber = () => {
                    current += step;
                    if (current < finalValue) {
                        target.textContent = Math.floor(current).toLocaleString() + suffix;
                        requestAnimationFrame(updateNumber);
                    } else {
                        target.textContent = finalValue.toLocaleString() + suffix;
                    }
                };
                
                updateNumber();
                observer.unobserve(target);
            }
        });
    };
    
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    numbers.forEach(number => observer.observe(number));
}

// Intersection Observer for animations
const animatedElements = document.querySelectorAll('.about-card, .feature-item, .bonus-card, .testimonial-card');

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '0';
            entry.target.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                entry.target.style.transition = 'all 0.6s ease';
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, 100);
            
            fadeInObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px'
});

animatedElements.forEach(el => fadeInObserver.observe(el));

// Initialize number animation
animateNumbers();

// Parallax effect for floating cards
window.addEventListener('mousemove', (e) => {
    const cards = document.querySelectorAll('.floating-cards .card');
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    cards.forEach((card, index) => {
        const speed = (index + 1) * 10;
        const xOffset = (x - 0.5) * speed;
        const yOffset = (y - 0.5) * speed;
        
        card.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
    });
});

// Add hover effect to cards
document.querySelectorAll('.about-card, .bonus-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// CTA button click handlers with ripple effect
document.querySelectorAll('.btn-primary').forEach(button => {
    button.addEventListener('click', (e) => {
        // Don't prevent default - let the link work
        // Add ripple effect
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        button.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
        
        // Let the browser follow the href link
        console.log('CTA clicked, following link...');
    });
});

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);