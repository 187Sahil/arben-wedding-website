/**
 * main.js
 * Contains intersection observer for scroll animations, 
 * smooth scrolling, and a countdown timer.
 */

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. SMOOTH SCROLLING FOR ANCHOR LINKS
       ========================================================================== */
    const smoothScrollLinks = document.querySelectorAll('.smooth-scroll');
    
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId && targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    /* ==========================================================================
       2. SCROLL ANIMATIONS (FADE IN UP)
       ========================================================================== */
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Trigger when 15% of element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: stop observing once animated
                // observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    // Select all elements with the class 'fade-in-up'
    const fadeElements = document.querySelectorAll('.fade-in-up');
    fadeElements.forEach(el => observer.observe(el));

    /* ==========================================================================
       3. COUNTDOWN TIMER
       ========================================================================== */
    // Target date: September 12, 2026 (assuming next logical year)
    // You can edit the date string below to match the exact year.
    const weddingDate = new Date('September 12, 2026 15:00:00').getTime();

    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    if (daysEl && hoursEl && minutesEl && secondsEl) {
        const updateCountdown = setInterval(() => {
            const now = new Date().getTime();
            const distance = weddingDate - now;

            if (distance < 0) {
                clearInterval(updateCountdown);
                document.querySelector('.countdown-container').innerHTML = "<span class='countdown-label' style='font-size: 2rem;'>Today is the day!</span>";
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            // Format numbers to always be 2 digits (e.g. 05 instead of 5)
            daysEl.innerText = days < 10 ? '0' + days : days;
            hoursEl.innerText = hours < 10 ? '0' + hours : hours;
            minutesEl.innerText = minutes < 10 ? '0' + minutes : minutes;
            secondsEl.innerText = seconds < 10 ? '0' + seconds : seconds;
        }, 1000);
    }

    /* ==========================================================================
       4. FORM SUBMISSION HANDLING
       ========================================================================== */
    // Note: Since you'll map this to Formspree, Formspree handles the actual sending.
    // In a real environment with JS, you might intercept the 'submit' event to 
    // prevent default, send via fetch API, and then show the success message without full page reload.

    const rsvpForm = document.getElementById('rsvp-form');
    if (rsvpForm) {
        rsvpForm.addEventListener('submit', function(e) {
            // Uncomment the lines below if you are using fetch() to send the form via Formspree AJAX
            /*
            e.preventDefault();
            const formData = new FormData(rsvpForm);
            fetch(rsvpForm.action, {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            }).then(response => {
                if(response.ok) {
                    rsvpForm.style.display = 'none';
                    document.getElementById('rsvp-success').classList.remove('hidden');
                } else {
                    alert('Submission failed. Please try again.');
                }
            });
            */
        });
    }

    // Optional: Handle file upload UI update
    const fileInput = document.getElementById('memory-file');
    const fileLabel = document.querySelector('.file-upload-label');
    
    if (fileInput && fileLabel) {
        fileInput.addEventListener('change', function(e) {
            if (this.files && this.files.length > 0) {
                const fileName = this.files[0].name;
                fileLabel.innerHTML = `<span class="upload-icon">✔️</span> ${fileName}`;
            }
        });
    }
});
