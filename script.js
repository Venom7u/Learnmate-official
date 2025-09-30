// Simple form validation and interactivity
document.addEventListener('DOMContentLoaded', function() {
    // Contact form handling
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const message = this.querySelector('textarea').value;
            
            if (name && email && message) {
                alert('Thank you for your message! We will contact you soon.');
                this.reset();
            } else {
                alert('Please fill all fields.');
            }
        });
    }

    // Login/Signup buttons
    document.querySelector('.login-btn')?.addEventListener('click', function() {
        alert('Login feature will be added soon!');
    });

    document.querySelector('.signup-btn')?.addEventListener('click', function() {
        alert('Signup feature will be added soon!');
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
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
});