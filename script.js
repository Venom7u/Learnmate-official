// Course data - sab courses ka information
const coursesData = {
    'web-development': {
        title: 'Web Development Master Course',
        price: 'Free',
        description: 'Complete web development course covering HTML, CSS, JavaScript from basics to advanced level.',
        modules: [
            'HTML5 & Semantic HTML',
            'CSS3 & Responsive Design', 
            'JavaScript ES6+',
            'DOM Manipulation',
            'API Integration',
            'Real Projects'
        ],
        duration: '8 Weeks',
        level: 'Beginner'
    },
    'python': {
        title: 'Python Programming',
        price: '₹499',
        description: 'Learn Python from scratch to advanced level with practical projects.',
        modules: [
            'Python Basics & Syntax',
            'Data Structures',
            'OOP Concepts',
            'File Handling',
            'Web Scraping',
            'Django Framework'
        ],
        duration: '6 Weeks',
        level: 'Beginner'
    },
    'digital-marketing': {
        title: 'Digital Marketing',
        price: '₹799',
        description: 'Master SEO, Social Media Marketing, Google Ads and more.',
        modules: [
            'SEO Fundamentals',
            'Social Media Marketing',
            'Google Ads & Analytics',
            'Content Marketing',
            'Email Marketing',
            'Marketing Strategy'
        ],
        duration: '4 Weeks',
        level: 'Intermediate'
    },
    'mathematics': {
        title: 'Mathematics Class 10',
        price: '₹299',
        description: 'Complete CBSE syllabus with expert teachers and practice problems.',
        modules: [
            'Real Numbers',
            'Polynomials',
            'Pair of Linear Equations',
            'Quadratic Equations',
            'Trigonometry',
            'Statistics & Probability'
        ],
        duration: '12 Weeks',
        level: 'Class 10'
    },
    'english-speaking': {
        title: 'English Speaking',
        price: '₹599',
        description: 'Fluency in 30 days with daily practice sessions.',
        modules: [
            'Basic Grammar',
            'Vocabulary Building',
            'Pronunciation',
            'Conversation Practice',
            'Public Speaking',
            'Accent Training'
        ],
        duration: '4 Weeks',
        level: 'Beginner'
    },
    'science-experiments': {
        title: 'Science Experiments',
        price: 'Free',
        description: 'Fun learning with practical experiments and demonstrations.',
        modules: [
            'Physics Experiments',
            'Chemistry Labs',
            'Biology Practicals',
            'Science Projects',
            'Safety Measures',
            'Report Writing'
        ],
        duration: '6 Weeks',
        level: 'All Levels'
    },
    'graphic-design': {
        title: 'Graphic Design',
        price: '₹699',
        description: 'Learn Photoshop, Canva and design principles.',
        modules: [
            'Design Principles',
            'Adobe Photoshop',
            'Canva Mastery',
            'Logo Design',
            'Social Media Graphics',
            'Portfolio Building'
        ],
        duration: '5 Weeks',
        level: 'Beginner'
    },
    'mobile-app-development': {
        title: 'Mobile App Development',
        price: '₹899',
        description: 'Build Android & iOS apps with Flutter framework.',
        modules: [
            'Flutter Basics',
            'Dart Programming',
            'UI/UX Design',
            'API Integration',
            'App Publishing',
            'Monetization'
        ],
        duration: '7 Weeks',
        level: 'Intermediate'
    },
    'data-science': {
        title: 'Data Science',
        price: '₹999',
        description: 'Python, Machine Learning, Data analysis complete course.',
        modules: [
            'Python for Data Science',
            'Data Analysis with Pandas',
            'Data Visualization',
            'Machine Learning Basics',
            'Statistical Analysis',
            'Real-world Projects'
        ],
        duration: '10 Weeks',
        level: 'Advanced'
    }
};

// Course details show karne ka function
function showCourseDetails(courseId) {
    const course = coursesData[courseId];
    
    const popupHTML = `
        <div class="course-popup-overlay">
            <div class="course-popup">
                <div class="popup-header">
                    <h2>${course.title}</h2>
                    <span class="close-btn" onclick="closeCoursePopup()">×</span>
                </div>
                <div class="popup-content">
                    <div class="course-info">
                        <p class="course-price-popup">${course.price}</p>
                        <p><strong>Duration:</strong> ${course.duration}</p>
                        <p><strong>Level:</strong> ${course.level}</p>
                    </div>
                    
                    <div class="course-description">
                        <h3>Course Description</h3>
                        <p>${course.description}</p>
                    </div>
                    
                    <div class="course-modules">
                        <h3>What You'll Learn</h3>
                        <ul>
                            ${course.modules.map(module => `<li>✅ ${module}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div class="popup-actions">
                        <button class="enroll-btn-popup" onclick="enrollInCourse('${courseId}')">
                            Enroll Now - ${course.price}
                        </button>
                        <button class="close-btn-popup" onclick="closeCoursePopup()">Close</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', popupHTML);
}

function closeCoursePopup() {
    const popup = document.querySelector('.course-popup-overlay');
    if (popup) {
        popup.remove();
    }
}

function enrollInCourse(courseId) {
    const course = coursesData[courseId];
    alert(`Enrolling in: ${course.title}\nPrice: ${course.price}\n\nWe will contact you soon!`);
    closeCoursePopup();
}

// Contact form handling
document.addEventListener('DOMContentLoaded', function() {
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
