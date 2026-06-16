// JS overrides to clean up text, branding, and implement the door opening animation
(function() {
    // Target date for countdown: June 19, 2026, 6 PM (18:00)
    const targetDate = new Date('2026-06-19T18:00:00');

    function getCountdownText() {
        const now = new Date();
        const diff = targetDate - now;
        if (diff <= 0) {
            return '00:00:00:00';
        }
        const days = Math.floor(diff / (1000 * 60 * 60 * 24)).toString().padStart(2, '0');
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0');
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
        const seconds = Math.floor((diff % (1000 * 60)) / 1000).toString().padStart(2, '0');
        return `${days}:${hours}:${minutes}:${seconds}`;
    }

    // 1. Setup the opening click event for the statically injected doors
    function setupDoorEvents() {
        const overlay = document.getElementById('door-overlay');
        if (!overlay) return;

        const seal = overlay.querySelector('.door-seal');
        if (!seal) return;

        seal.addEventListener('click', () => {
            overlay.classList.add('open');
            // After animation ends, hide completely from layout
            setTimeout(() => {
                overlay.classList.add('hidden');
            }, 1600); // 1.6s matches CSS transition duration
        });
    }

    // 2. Clean DOM of branding, watermarks, and customize event details
    function cleanDOM() {
        // Map Link Updates
        document.querySelectorAll('a').forEach(el => {
            if (el.textContent.includes('See the route') || el.textContent.includes('Click to open the map')) {
                el.href = 'https://maps.app.goo.gl/SwNNkBX6KJgExP536';
                el.target = '_blank';
                el.rel = 'noopener noreferrer';
            }
        });

        document.querySelectorAll('*').forEach(el => {
            if (el.children.length === 0 && el.textContent) {
                // Remove Missing Piece branding
                if (el.textContent.includes('© Missing Piece')) {
                    el.textContent = el.textContent.replace(/© Missing Piece \d{4}/g, '© Sanjit & Nirupama 2026');
                }
                if (el.textContent.includes('Missing Piece')) {
                    el.textContent = el.textContent.replace(/Missing Piece/g, 'Sanjit & Nirupama');
                }

                // Groom Replacements
                if (el.textContent === 'ABHISHEK') {
                    el.textContent = 'SANJIT';
                }
                if (el.textContent.includes('Abhishek')) {
                    el.textContent = el.textContent.replace(/Abhishek/g, 'Sanjit');
                }

                // Bride Replacements
                if (el.textContent === 'KANIKA') {
                    el.textContent = 'NIRUPAMA';
                }
                if (el.textContent.includes('Kanika')) {
                    el.textContent = el.textContent.replace(/Kanika/g, 'Nirupama');
                }

                // Groom Parents
                if (el.textContent.includes('Mrs. Reena & Mr. Rajiv Kapoor')) {
                    el.textContent = el.textContent.replace('Mrs. Reena & Mr. Rajiv Kapoor', 'Mrs. Reena Patra & Mr. Bijay Kumar Patra');
                }

                // Bride Parents
                if (el.textContent.includes('Mrs. Shalini & Mr. Aakash Mittal')) {
                    el.textContent = el.textContent.replace('Mrs. Shalini & Mr. Aakash Mittal', 'Mrs. Parbati Jena & Mr. Babaji Ch. Jena');
                }

                // Grandparents / Blessings (Hide them since they are not provided)
                if (el.textContent.includes('Smt. Lata Devi & Sm. Kamal Kapoor')) {
                    el.textContent = '';
                }
                if (el.textContent.trim() === '——') {
                    el.textContent = '';
                }

                // Monograms
                if (el.textContent === 'A & K') {
                    el.textContent = 'S & N';
                }

                // Hashtag
                if (el.textContent.includes('#abkan')) {
                    el.textContent = el.textContent.replace('#abkan', '#SanjitWedsNirupama');
                }

                // --- EVENT DATES UPDATES ---
                // Mehendi: June 18th
                if (el.textContent === 'Friday, March 9th 2026') {
                    el.textContent = 'Thursday, June 18th 2026';
                }
                // Haldi: June 18th
                if (el.textContent === 'Friday, March 10th 2026') {
                    el.textContent = 'Thursday, June 18th 2026';
                }
                // Engagement: June 18th
                if (el.textContent === 'Friday, March 11th 2026') {
                    el.textContent = 'Thursday, June 18th 2026';
                }
                // Shaadi: June 19th
                if (el.textContent === 'Friday, March 12th 2026') {
                    el.textContent = 'Friday, June 19th 2026';
                }
                // Reception: June 20th
                if (el.textContent === 'Friday, March 17th 2026') {
                    el.textContent = 'Saturday, June 20th 2026';
                }

                // Override Countdown Timer Value
                if (/^\d{2}:\d{2}:\d{2}:\d{2}$/.test(el.textContent)) {
                    el.textContent = getCountdownText();
                    // Make it visible in case Framer hid it
                    if (el.style.visibility === 'hidden') {
                        el.style.visibility = 'visible';
                    }
                }
            }
        });
    }

    // Initialize
    if (document.readyState === 'loading') {
        window.addEventListener('DOMContentLoaded', setupDoorEvents);
    } else {
        setupDoorEvents();
    }
    
    // Setup MutationObserver for dynamic branding cleaning and text replacement
    const observer = new MutationObserver(() => {
        cleanDOM();
    });

    if (document.body) {
        cleanDOM();
        observer.observe(document.body, { childList: true, subtree: true });
    } else {
        window.addEventListener('DOMContentLoaded', () => {
            cleanDOM();
            observer.observe(document.body, { childList: true, subtree: true });
        });
    }

    // Run countdown update loop
    setInterval(() => {
        cleanDOM();
    }, 1000);
})();
