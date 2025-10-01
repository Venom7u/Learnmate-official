// Course data - sab courses ka information
const coursesData = {
    'web-development': {
        title: 'Web Development Master Course',
        price: 'Free',
        description: 'Complete web development course covering HTML, CSS, JavaScript from basics to advanced level. Build real-world projects and become a professional web developer.',
        modules: [
            {
                name: 'HTML5 & Semantic HTML',
                description: 'Learn modern HTML5 tags, semantic structure, forms, tables and SEO-friendly coding practices.',
                page: 'modules/html5.html'
            },
            {
                name: 'CSS3 & Responsive Design',
                description: 'Master CSS3 features, Flexbox, Grid, animations and create mobile-responsive websites.',
                page: 'modules/css3.html'
            },
            {
                name: 'JavaScript ES6+',
                description: 'Learn modern JavaScript ES6+ features, variables, functions, loops and advanced concepts.',
                page: 'modules/javascript.html'
            },
            {
                name: 'DOM Manipulation',
                description: 'Manipulate webpage content dynamically, handle events and create interactive web pages.',
                page: 'modules/dom.html'
            },
            {
                name: 'API Integration',
                description: 'Connect to external APIs, fetch data and create dynamic content from servers.',
                page: 'modules/api.html'
            },
            {
                name: 'Real Projects',
                description: 'Build 5+ real-world projects including Portfolio Website, E-commerce Site, Weather App, Todo App and Blog Platform.',
                page: 'modules/projects.html'
            }
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

// User authentication system
const authSystem = {
    currentUser: null,
    users: JSON.parse(localStorage.getItem('courseUsers')) || [],

    // Sign up function
    signUp: function(name, email, password) {
        // Check if user already exists
        const existingUser = this.users.find(user => user.email === email);
        if (existingUser) {
            return { success: false, message: 'User already exists with this email!' };
        }

        // Create new user
        const newUser = {
            id: Date.now().toString(),
            name: name,
            email: email,
            password: password,
            enrolledCourses: [],
            joinDate: new Date().toLocaleDateString()
        };

        this.users.push(newUser);
        this.saveUsers();
        this.currentUser = newUser;
        
        return { success: true, message: 'Account created successfully!', user: newUser };
    },

    // Login function
    login: function(email, password) {
        const user = this.users.find(user => user.email === email && user.password === password);
        if (user) {
            this.currentUser = user;
            return { success: true, message: 'Login successful!', user: user };
        } else {
            return { success: false, message: 'Invalid email or password!' };
        }
    },

    // Logout function
    logout: function() {
        this.currentUser = null;
        this.updateAuthUI();
    },

    // Enroll in course
    enrollInCourse: function(courseId) {
        if (!this.currentUser) {
            this.showAuthModal('login');
            return { success: false, message: 'Please login to enroll!' };
        }

        const course = coursesData[courseId];
        if (!course) {
            return { success: false, message: 'Course not found!' };
        }

        // Check if already enrolled
        if (this.currentUser.enrolledCourses.includes(courseId)) {
            return { success: false, message: 'You are already enrolled in this course!' };
        }

        // Enroll user
        this.currentUser.enrolledCourses.push(courseId);
        
        // Update in users array
        const userIndex = this.users.findIndex(user => user.id === this.currentUser.id);
        if (userIndex !== -1) {
            this.users[userIndex] = this.currentUser;
            this.saveUsers();
        }

        return { 
            success: true, 
            message: `Successfully enrolled in ${course.title}!` 
        };
    },

    // Save users to localStorage
    saveUsers: function() {
        localStorage.setItem('courseUsers', JSON.stringify(this.users));
    },

    // Update UI based on auth status
    updateAuthUI: function() {
        const authSection = document.getElementById('authSection');
        const userSection = document.getElementById('userSection');
        const userNameSpan = document.getElementById('userName');
        const enrolledCoursesSpan = document.getElementById('enrolledCoursesCount');

        if (this.currentUser) {
            // User is logged in
            if (authSection) authSection.style.display = 'none';
            if (userSection) userSection.style.display = 'block';
            if (userNameSpan) userNameSpan.textContent = this.currentUser.name;
            if (enrolledCoursesSpan) enrolledCoursesSpan.textContent = this.currentUser.enrolledCourses.length;
        } else {
            // User is not logged in
            if (authSection) authSection.style.display = 'block';
            if (userSection) userSection.style.display = 'none';
        }
    },

    // Show auth modal
    showAuthModal: function(type = 'login') {
        const modalHTML = `
            <div class="auth-modal-overlay">
                <div class="auth-modal">
                    <div class="auth-modal-header">
                        <h2>${type === 'login' ? 'Login' : 'Sign Up'}</h2>
                        <span class="close-auth-btn" onclick="closeAuthModal()">×</span>
                    </div>
                    <div class="auth-modal-content">
                        <form id="authForm" onsubmit="handleAuthSubmit(event)">
                            ${type === 'signup' ? `
                                <div class="form-group">
                                    <label>Full Name</label>
                                    <input type="text" id="authName" required placeholder="Enter your full name">
                                </div>
                            ` : ''}
                            
                            <div class="form-group">
                                <label>Email</label>
                                <input type="email" id="authEmail" required placeholder="Enter your email">
                            </div>
                            
                            <div class="form-group">
                                <label>Password</label>
                                <input type="password" id="authPassword" required placeholder="Enter your password">
                            </div>
                            
                            <button type="submit" class="auth-submit-btn">
                                ${type === 'login' ? 'Login' : 'Create Account'}
                            </button>
                        </form>
                        
                        <div class="auth-switch">
                            ${type === 'login' 
                                ? 'Don\'t have an account? <a href="#" onclick="switchAuthType(\'signup\')">Sign up</a>' 
                                : 'Already have an account? <a href="#" onclick="switchAuthType(\'login\')">Login</a>'
                            }
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', modalHTML);
    }
};

// Auth modal functions
function closeAuthModal() {
    const modal = document.querySelector('.auth-modal-overlay');
    if (modal) {
        modal.remove();
    }
}

function switchAuthType(type) {
    closeAuthModal();
    authSystem.showAuthModal(type);
}

function handleAuthSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const isLogin = form.querySelector('#authName') === null;
    
    const name = isLogin ? null : document.getElementById('authName').value;
    const email = document.getElementById('authEmail').value;
    const password = document.getElementById('authPassword').value;
    
    let result;
    if (isLogin) {
        result = authSystem.login(email, password);
    } else {
        result = authSystem.signUp(name, email, password);
    }
    
    if (result.success) {
        alert(result.message);
        closeAuthModal();
        authSystem.updateAuthUI();
        
        // Refresh page to update navigation
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    } else {
        alert(result.message);
    }
}

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
                            ${course.modules.map(module => {
                                // Check if module is object or string
                                if (typeof module === 'object') {
                                    return `<li>✅ ${module.name}</li>`;
                                } else {
                                    return `<li>✅ ${module}</li>`;
                                }
                            }).join('')}
                        </ul>
                    </div>
                    
                    <div class="popup-actions">
                        <button class="enroll-btn-popup" onclick="enrollInCourse('${courseId}')">
                            ${authSystem.currentUser && authSystem.currentUser.enrolledCourses.includes(courseId) 
                                ? 'Already Enrolled' 
                                : `Enroll Now - ${course.price}`
                            }
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
    const result = authSystem.enrollInCourse(courseId);
    if (result.success) {
        alert(result.message);
        closeCoursePopup();
        authSystem.updateAuthUI();
    } else {
        alert(result.message);
    }
}

// Contact form handling
document.addEventListener('DOMContentLoaded', function() {
    // Initialize auth UI
    authSystem.updateAuthUI();
    
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

// Logout function
function logout() {
    authSystem.logout();
    alert('Logged out successfully!');
    window.location.reload();
}
