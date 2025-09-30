/**
 * Contact Page - Multi-step form with animations and validation
 */

class ContactPage {
    constructor() {
        this.currentStep = 1;
        this.totalSteps = 3;
        this.formData = {};
        this.isSubmitting = false;
        this.fileData = null;
        this.init();
    }
    
    init() {
        this.setupFormSteps();
        this.setupFormValidation();
        this.setupFileUpload();
        this.setupLocationMap();
        this.initFlyingElements();
        this.setupFormEffects();
    }
    
    setupFormSteps() {
        const nextButtons = document.querySelectorAll('.form-next-btn');
        const prevButtons = document.querySelectorAll('.form-prev-btn');
        const formSteps = document.querySelectorAll('.form-step');
        const progressSteps = document.querySelectorAll('.progress-step');
        
        nextButtons.forEach(button => {
            button.addEventListener('click', () => {
                const currentFormStep = button.closest('.form-step');
                
                if (this.validateStep(currentFormStep)) {
                    this.goToNextStep();
                } else {
                    this.showStepError(currentFormStep, 'Please fill in all required fields correctly.');
                }
            });
        });
        
        prevButtons.forEach(button => {
            button.addEventListener('click', () => {
                this.goToPrevStep();
            });
        });
        
        // Update progress steps
        const updateProgressBar = () => {
            progressSteps.forEach((step, index) => {
                if (index < this.currentStep) {
                    step.classList.add('active');
                } else {
                    step.classList.remove('active');
                }
            });
            
            // Update progress bar
            const progressBar = document.querySelector('.progress-bar');
            if (progressBar) {
                const percent = ((this.currentStep - 1) / (progressSteps.length - 1)) * 100;
                progressBar.style.width = `${percent}%`;
            }
        };
        
        // Show current step
        const showCurrentStep = () => {
            formSteps.forEach((step, index) => {
                if (index + 1 === this.currentStep) {
                    step.style.display = 'block';
                    setTimeout(() => {
                        step.style.opacity = '1';
                        step.style.transform = 'translateX(0)';
                    }, 10);
                } else {
                    step.style.opacity = '0';
                    step.style.transform = index + 1 < this.currentStep ? 'translateX(-100%)' : 'translateX(100%)';
                    setTimeout(() => {
                        step.style.display = 'none';
                    }, 300);
                }
            });
            
            updateProgressBar();
        };
        
        // Initialize event listeners for step navigation
        this.goToNextStep = () => {
            if (this.currentStep < this.totalSteps) {
                this.currentStep++;
                showCurrentStep();
            } else {
                this.submitForm();
            }
        };
        
        this.goToPrevStep = () => {
            if (this.currentStep > 1) {
                this.currentStep--;
                showCurrentStep();
            }
        };
        
        // Initialize with first step
        showCurrentStep();
        
        // Set up form submission
        const contactForm = document.getElementById('contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.submitForm();
            });
        }
    }
    
    validateStep(stepEl) {
        const requiredFields = stepEl.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            // Reset field validation state
            field.classList.remove('invalid');
            const errorEl = field.parentNode.querySelector('.field-error');
            if (errorEl) errorEl.textContent = '';
            
            if (field.type === 'email') {
                if (!this.isValidEmail(field.value)) {
                    this.showFieldError(field, 'Please enter a valid email address');
                    isValid = false;
                }
            } else if (field.value.trim() === '') {
                this.showFieldError(field, 'This field is required');
                isValid = false;
            }
        });
        
        return isValid;
    }
    
    showFieldError(field, message) {
        field.classList.add('invalid');
        
        let errorEl = field.parentNode.querySelector('.field-error');
        
        if (!errorEl) {
            errorEl = document.createElement('div');
            errorEl.className = 'field-error';
            field.parentNode.appendChild(errorEl);
        }
        
        errorEl.textContent = message;
        
        // Add shake animation to field
        field.style.animation = 'shake 0.5s ease';
        setTimeout(() => {
            field.style.animation = '';
        }, 500);
    }
    
    showStepError(stepEl, message) {
        let errorEl = stepEl.querySelector('.step-error');
        
        if (!errorEl) {
            errorEl = document.createElement('div');
            errorEl.className = 'step-error';
            stepEl.insertBefore(errorEl, stepEl.firstChild);
        }
        
        errorEl.textContent = message;
        errorEl.style.opacity = '0';
        errorEl.style.transform = 'translateY(-10px)';
        
        // Animate in
        requestAnimationFrame(() => {
            errorEl.style.transition = 'opacity 0.3s, transform 0.3s';
            errorEl.style.opacity = '1';
            errorEl.style.transform = 'translateY(0)';
        });
    }
    
    isValidEmail(email) {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return emailRegex.test(email);
    }
    
    setupFormValidation() {
        // Real-time validation
        const formFields = document.querySelectorAll('.form-control');
        
        formFields.forEach(field => {
            field.addEventListener('input', () => {
                // Reset validation state
                field.classList.remove('invalid');
                const errorEl = field.parentNode.querySelector('.field-error');
                if (errorEl) errorEl.textContent = '';
                
                // Add valid class for non-empty fields
                if (field.value.trim() !== '') {
                    field.classList.add('has-value');
                } else {
                    field.classList.remove('has-value');
                }
            });
            
            // Focus and blur effects
            field.addEventListener('focus', () => {
                field.parentNode.classList.add('focused');
            });
            
            field.addEventListener('blur', () => {
                field.parentNode.classList.remove('focused');
                
                // Validate on blur if field is required
                if (field.hasAttribute('required')) {
                    if (field.type === 'email') {
                        if (!this.isValidEmail(field.value) && field.value !== '') {
                            this.showFieldError(field, 'Please enter a valid email address');
                        }
                    } else if (field.value.trim() === '') {
                        this.showFieldError(field, 'This field is required');
                    }
                }
            });
        });
    }
    
    setupFileUpload() {
        const fileInput = document.getElementById('file-upload');
        const dropZone = document.querySelector('.file-upload-zone');
        
        if (!fileInput || !dropZone) return;
        
        // Setup file input change listener
        fileInput.addEventListener('change', () => {
            if (fileInput.files.length > 0) {
                this.handleFileSelected(fileInput.files[0]);
            }
        });
        
        // Setup drag and drop
        dropZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            dropZone.classList.add('drag-over');
        });
        
        dropZone.addEventListener('dragleave', () => {
            dropZone.classList.remove('drag-over');
        });
        
        dropZone.addEventListener('drop', (e) => {
            e.preventDefault();
            dropZone.classList.remove('drag-over');
            
            if (e.dataTransfer.files.length > 0) {
                fileInput.files = e.dataTransfer.files;
                this.handleFileSelected(e.dataTransfer.files[0]);
            }
        });
        
        // Click on drop zone to trigger file input
        dropZone.addEventListener('click', () => {
            fileInput.click();
        });
    }
    
    handleFileSelected(file) {
        const dropZone = document.querySelector('.file-upload-zone');
        const filePreview = document.createElement('div');
        filePreview.className = 'file-preview';
        
        this.fileData = file;
        
        // Check if it's an image
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                filePreview.innerHTML = `
                    <div class="preview-content">
                        <img src="${e.target.result}" alt="${file.name}">
                        <div class="file-info">
                            <span class="file-name">${file.name}</span>
                            <span class="file-size">${this.formatFileSize(file.size)}</span>
                        </div>
                        <button type="button" class="remove-file">×</button>
                    </div>
                `;
                
                this.setupFilePreviewEvents(filePreview, dropZone);
            };
            reader.readAsDataURL(file);
        } else {
            // Not an image, show generic file preview
            const fileExtension = file.name.split('.').pop().toUpperCase();
            filePreview.innerHTML = `
                <div class="preview-content">
                    <div class="file-icon">${fileExtension}</div>
                    <div class="file-info">
                        <span class="file-name">${file.name}</span>
                        <span class="file-size">${this.formatFileSize(file.size)}</span>
                    </div>
                    <button type="button" class="remove-file">×</button>
                </div>
            `;
            
            this.setupFilePreviewEvents(filePreview, dropZone);
        }
        
        // Update UI
        dropZone.innerHTML = '';
        dropZone.appendChild(filePreview);
    }
    
    setupFilePreviewEvents(filePreview, dropZone) {
        const removeButton = filePreview.querySelector('.remove-file');
        
        removeButton.addEventListener('click', (e) => {
            e.stopPropagation();
            
            // Reset the file input
            const fileInput = document.getElementById('file-upload');
            fileInput.value = '';
            this.fileData = null;
            
            // Restore original drop zone content
            dropZone.innerHTML = `
                <div class="upload-icon">
                    <i class="fas fa-cloud-upload-alt"></i>
                </div>
                <div class="upload-text">
                    <span>Drag and drop your file here</span>
                    <span>or click to browse</span>
                </div>
            `;
        });
    }
    
    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
    
    setupLocationMap() {
        const mapContainer = document.getElementById('contact-map');
        if (!mapContainer) return;
        
        // Create a simple canvas-based map
        const canvas = document.createElement('canvas');
        canvas.width = mapContainer.clientWidth;
        canvas.height = mapContainer.clientHeight;
        mapContainer.appendChild(canvas);
        
        const ctx = canvas.getContext('2d');
        
        // Draw simple map background
        ctx.fillStyle = '#f0f0f0';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw grid lines
        ctx.strokeStyle = '#ddd';
        ctx.lineWidth = 1;
        
        for (let i = 0; i < canvas.width; i += 20) {
            ctx.beginPath();
            ctx.moveTo(i, 0);
            ctx.lineTo(i, canvas.height);
            ctx.stroke();
        }
        
        for (let i = 0; i < canvas.height; i += 20) {
            ctx.beginPath();
            ctx.moveTo(0, i);
            ctx.lineTo(canvas.width, i);
            ctx.stroke();
        }
        
        // Draw "roads"
        ctx.strokeStyle = '#aaa';
        ctx.lineWidth = 3;
        
        // Horizontal main road
        ctx.beginPath();
        ctx.moveTo(0, canvas.height / 2);
        ctx.lineTo(canvas.width, canvas.height / 2);
        ctx.stroke();
        
        // Vertical main road
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2, 0);
        ctx.lineTo(canvas.width / 2, canvas.height);
        ctx.stroke();
        
        // Draw location marker
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        
        // Marker shadow
        ctx.beginPath();
        ctx.arc(centerX, centerY + 5, 10, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
        ctx.fill();
        
        // Marker pin
        ctx.beginPath();
        ctx.arc(centerX, centerY, 12, 0, Math.PI * 2);
        ctx.fillStyle = '#667eea';
        ctx.fill();
        
        ctx.beginPath();
        ctx.arc(centerX, centerY, 8, 0, Math.PI * 2);
        ctx.fillStyle = '#fff';
        ctx.fill();
        
        ctx.beginPath();
        ctx.arc(centerX, centerY, 4, 0, Math.PI * 2);
        ctx.fillStyle = '#667eea';
        ctx.fill();
        
        // Animate ping effect
        setInterval(() => {
            const ping = document.createElement('div');
            ping.className = 'map-ping';
            ping.style.left = '50%';
            ping.style.top = '50%';
            mapContainer.appendChild(ping);
            
            setTimeout(() => {
                ping.remove();
            }, 1500);
        }, 3000);
    }
    
    initFlyingElements() {
        const container = document.querySelector('.contact-page');
        if (!container) return;
        
        const shapes = [
            { type: 'circle', size: 15 },
            { type: 'square', size: 12 },
            { type: 'triangle', size: 18 },
            { type: 'plus', size: 16 },
            { type: 'circle', size: 10 },
            { type: 'square', size: 20 },
            { type: 'triangle', size: 14 },
            { type: 'plus', size: 12 }
        ];
        
        shapes.forEach(shape => {
            const el = document.createElement('div');
            el.className = `flying-element ${shape.type}`;
            el.style.width = `${shape.size}px`;
            el.style.height = `${shape.size}px`;
            
            // Random position
            el.style.left = `${Math.random() * 100}%`;
            el.style.top = `${Math.random() * 100}%`;
            
            // Random animation
            const duration = Math.random() * 10 + 15;
            const delay = Math.random() * 5;
            
            el.style.animation = `float ${duration}s ease-in-out ${delay}s infinite`;
            container.appendChild(el);
        });
    }
    
    setupFormEffects() {
        // Field focus effects
        const formGroups = document.querySelectorAll('.form-group');
        
        formGroups.forEach(group => {
            const input = group.querySelector('input, textarea, select');
            const label = group.querySelector('label');
            
            if (input && label) {
                // Check initial state
                if (input.value.trim() !== '') {
                    group.classList.add('has-value');
                }
                
                // Add ripple effect on focus
                input.addEventListener('focus', () => {
                    const ripple = document.createElement('div');
                    ripple.className = 'field-ripple';
                    group.appendChild(ripple);
                    
                    setTimeout(() => {
                        ripple.style.transform = 'scale(1)';
                        ripple.style.opacity = '1';
                    }, 10);
                    
                    setTimeout(() => {
                        ripple.style.opacity = '0';
                        setTimeout(() => ripple.remove(), 300);
                    }, 500);
                });
            }
        });
        
        // Animate contact info items
        const contactItems = document.querySelectorAll('.contact-info-item');
        contactItems.forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('animate-in');
            }, 200 * index);
        });
    }
    
    async submitForm() {
        if (this.isSubmitting) return;
        
        // Collect all form data
        const form = document.getElementById('contact-form');
        if (!form) return;
        
        // Validate entire form
        const allFormSteps = document.querySelectorAll('.form-step');
        let isValid = true;
        
        allFormSteps.forEach(step => {
            if (!this.validateStep(step)) {
                isValid = false;
            }
        });
        
        if (!isValid) {
            this.showStepError(allFormSteps[this.currentStep - 1], 'Please fill in all required fields correctly.');
            return;
        }
        
        this.isSubmitting = true;
        
        // Get all form inputs
        const formData = new FormData(form);
        const formValues = Object.fromEntries(formData.entries());
        
        // Add file if present
        if (this.fileData) {
            formValues.file = {
                name: this.fileData.name,
                size: this.fileData.size,
                type: this.fileData.type
            };
        }
        
        // Show loader
        this.showSubmitLoader();
        
        // Simulate API request
        try {
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Show success message
            this.showSuccessMessage();
            
            // Reset form after submission
            setTimeout(() => {
                form.reset();
                this.currentStep = 1;
                this.setupFormSteps(); // Re-initialize form steps
                this.isSubmitting = false;
            }, 3000);
        } catch (error) {
            // Show error message
            this.showErrorMessage();
            this.isSubmitting = false;
        }
    }
    
    showSubmitLoader() {
        const submitBtn = document.querySelector('.form-submit-btn');
        if (!submitBtn) return;
        
        const originalText = submitBtn.textContent;
        submitBtn.innerHTML = '<div class="submit-loader"></div>';
        submitBtn.disabled = true;
    }
    
    showSuccessMessage() {
        const formContainer = document.querySelector('.contact-form-container');
        const formSteps = document.querySelectorAll('.form-step');
        
        // Hide form steps
        formSteps.forEach(step => {
            step.style.display = 'none';
        });
        
        // Hide form progress
        const formProgress = document.querySelector('.form-progress');
        if (formProgress) {
            formProgress.style.display = 'none';
        }
        
        // Create and show success message
        const successMessage = document.createElement('div');
        successMessage.className = 'submission-success';
        successMessage.innerHTML = `
            <div class="success-icon">
                <i class="fas fa-check-circle"></i>
            </div>
            <h3>Thank You!</h3>
            <p>Your message has been sent successfully. We'll get back to you soon.</p>
        `;
        
        formContainer.appendChild(successMessage);
        
        // Animate success message
        setTimeout(() => {
            successMessage.classList.add('show');
        }, 10);
    }
    
    showErrorMessage() {
        const submitBtn = document.querySelector('.form-submit-btn');
        if (!submitBtn) return;
        
        submitBtn.innerHTML = 'Error. Try Again';
        submitBtn.disabled = false;
        submitBtn.classList.add('error');
        
        setTimeout(() => {
            submitBtn.textContent = 'Submit';
            submitBtn.classList.remove('error');
        }, 3000);
    }
}

// Export for use in router
window.ContactPage = ContactPage;