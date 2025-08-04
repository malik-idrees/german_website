document.addEventListener('DOMContentLoaded', function() {
    // --- Element Selections ---
    const header = document.querySelector('.main-header');
    const heroSection = document.querySelector('.hero-section');
    const scrollToTopBtn = document.querySelector('.scroll-to-top');
    const slides = document.querySelectorAll('.slide');
    const dotsContainer = document.querySelector('.slider-dots');
    const sliderContainer = document.querySelector('.slider-container');
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('mainNav');

    // --- Header & Scroll-to-Top Button Logic ---
    function adjustHeaderAndScrollElements() {
        if (header) {
            if (window.scrollY > 0) {
                header.classList.add('scrolled');
                if (heroSection) {
                    heroSection.style.marginTop = header.offsetHeight + 'px';
                }
            } else {
                header.classList.remove('scrolled');
                if (heroSection) {
                    heroSection.style.marginTop = '0';
                }
            }
        }
        if (scrollToTopBtn) {
            if (window.scrollY > 300) {
                scrollToTopBtn.classList.add('show');
            } else {
                scrollToTopBtn.classList.remove('show');
            }
        }
    }

    window.addEventListener('scroll', adjustHeaderAndScrollElements);
    adjustHeaderAndScrollElements();

    if (scrollToTopBtn) {
        scrollToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // --- Slider Functionality ---
    let currentSlide = 0;
    let slideInterval;

    if (slides.length > 0 && dotsContainer) {
        function showSlide(index) {
            slides.forEach((slide, i) => {
                slide.classList.remove('active');
                if (dotsContainer.children[i]) {
                    dotsContainer.children[i].classList.remove('active');
                }
            });
            slides[index].classList.add('active');
            if (dotsContainer.children[index]) {
                dotsContainer.children[index].classList.add('active');
            }
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }

        function startSlider() {
            stopSlider();
            slideInterval = setInterval(nextSlide, 5000);
        }

        function stopSlider() {
            clearInterval(slideInterval);
        }

        dotsContainer.innerHTML = '';
        slides.forEach((_, i) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            dot.setAttribute('data-slide-index', i);
            dot.addEventListener('click', () => {
                stopSlider();
                currentSlide = i;
                showSlide(currentSlide);
                startSlider();
            });
            dotsContainer.appendChild(dot);
        });

        showSlide(currentSlide);
        startSlider();

        if (sliderContainer) {
            sliderContainer.addEventListener('mouseenter', stopSlider);
            sliderContainer.addEventListener('mouseleave', startSlider);
        }
    } else {
        console.warn('Slider elements (.slide or .slider-dots) not found. Slider functionality skipped.');
    }

    // --- Hamburger Menu Functionality ---
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }

    // --- (Optional) Other DOMContentLoaded logic ---
    console.log('Process flow section loaded!');
});





