document.addEventListener('DOMContentLoaded', function() {
    // Initialize Hero Swiper
    try {
        const heroSwiper = new Swiper('.hero-swiper', {
            loop: true,
            effect: 'fade',
            speed: 1000,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            on: {
                init: function() {
                    const activeSlide = this.slides[this.activeIndex];
                    if (activeSlide) {
                        activeSlide.querySelector('.text-center').style.opacity = '1';
                        activeSlide.querySelector('.text-center').style.transform = 'translateY(0)';
                    }
                },
                slideChange: function() {
                    // Reset all slides
                    this.slides.forEach(slide => {
                        const textCenter = slide.querySelector('.text-center');
                        if (textCenter) {
                            textCenter.style.opacity = '0';
                            textCenter.style.transform = 'translateY(20px)';
                        }
                    });

                    // Animate active slide
                    setTimeout(() => {
                        const activeSlide = this.slides[this.activeIndex];
                        if (activeSlide) {
                            const textCenter = activeSlide.querySelector('.text-center');
                            if (textCenter) {
                                textCenter.style.opacity = '1';
                                textCenter.style.transform = 'translateY(0)';
                            }
                        }
                    }, 300);
                }
            }
        });
    } catch (error) {
        console.error('Error initializing hero swiper:', error);
    }

    // Initialize Bikes Swiper
    const bikesSwiper = new Swiper('.bikes-swiper', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            640: {
                slidesPerView: 2,
            },
            768: {
                slidesPerView: 3,
            },
            1024: {
                slidesPerView: 4,
            },
        },
    });

    // Mobile Menu Toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            const isOpen = !mobileMenu.classList.contains('hidden');
            
            // Change icon based on menu state
            const icon = mobileMenuButton.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-bars', 'fa-times');
                icon.classList.add(isOpen ? 'fa-times' : 'fa-bars');
            }
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', (event) => {
        if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
            const isClickInside = mobileMenu.contains(event.target) || 
                                mobileMenuButton.contains(event.target);
            
            if (!isClickInside) {
                mobileMenu.classList.add('hidden');
                const icon = mobileMenuButton.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        }
    });

    // Handle image loading errors
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('error', function() {
            this.src = 'https://via.placeholder.com/400x300?text=Image+Not+Found';
            this.alt = 'Image not found';
        });
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Close mobile menu if open
                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                    const icon = mobileMenuButton.querySelector('i');
                    if (icon) {
                        icon.classList.remove('fa-times');
                        icon.classList.add('fa-bars');
                    }
                }
            }
        });
    });
});
