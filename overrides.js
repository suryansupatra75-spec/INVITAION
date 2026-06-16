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

        // Open doors function
        function openDoors() {
            if (overlay.classList.contains('open')) return;
            overlay.classList.add('open');
            setTimeout(() => {
                overlay.classList.add('hidden');
            }, 1600); // 1.6s matches CSS transition duration
        }

        // Click to open immediately
        seal.addEventListener('click', openDoors);

        // Auto-open doors automatically after 2.5 seconds to prevent guests from getting stuck/waiting
        setTimeout(openDoors, 2500);
    }

    let isCleaning = false;

    // 2. Clean DOM of branding, watermarks, and customize event details
    function cleanDOM() {
        if (isCleaning) return;
        isCleaning = true;

        try {
            // Map Link Updates
            document.querySelectorAll('a').forEach(el => {
                if (el.textContent.includes('See the route') || el.textContent.includes('Click to open the map')) {
                    if (el.href !== 'https://maps.app.goo.gl/SwNNkBX6KJgExP536') {
                        el.href = 'https://maps.app.goo.gl/SwNNkBX6KJgExP536';
                        el.target = '_blank';
                        el.rel = 'noopener noreferrer';
                    }
                }
            });

            // Query text containers to safely inspect their text nodes
            document.querySelectorAll('p, span, a, h1, h2, h3, h4, h5, h6, li, button, [class*="framer-text"]').forEach(el => {
                // Skip elements inside the door overlay
                if (el.closest('#door-overlay')) return;

                el.childNodes.forEach(node => {
                    if (node.nodeType === Node.TEXT_NODE) {
                        let text = node.nodeValue;
                        let changed = false;

                        // Remove Missing Piece branding
                        if (text.includes('© Missing Piece')) {
                            const newText = text.replace(/© Missing Piece \d{4}/g, '© Sanjit & Nirupama 2026');
                            if (text !== newText) { text = newText; changed = true; }
                        }
                        if (text.includes('Missing Piece')) {
                            const newText = text.replace(/Missing Piece/g, 'Sanjit & Nirupama');
                            if (text !== newText) { text = newText; changed = true; }
                        }

                        // Groom Replacements
                        if (text.trim() === 'ABHISHEK') {
                            text = 'SANJIT';
                            changed = true;
                        } else if (text.includes('Abhishek')) {
                            const newText = text.replace(/Abhishek/g, 'Sanjit');
                            if (text !== newText) { text = newText; changed = true; }
                        }

                        // Bride Replacements
                        if (text.trim() === 'KANIKA') {
                            text = 'NIRUPAMA';
                            changed = true;
                        } else if (text.includes('Kanika')) {
                            const newText = text.replace(/Kanika/g, 'Nirupama');
                            if (text !== newText) { text = newText; changed = true; }
                        }

                        // Groom Parents
                        if (text.includes('Mrs. Reena & Mr. Rajiv Kapoor')) {
                            const newText = text.replace('Mrs. Reena & Mr. Rajiv Kapoor', 'Mrs. Reena Patra & Mr. Bijay Kumar Patra');
                            if (text !== newText) { text = newText; changed = true; }
                        }

                        // Bride Parents
                        if (text.includes('Mrs. Shalini & Mr. Aakash Mittal')) {
                            const newText = text.replace('Mrs. Shalini & Mr. Aakash Mittal', 'Mrs. Parbati Jena & Mr. Babaji Ch. Jena');
                            if (text !== newText) { text = newText; changed = true; }
                        }

                        // Grandparents / Blessings (Hide them since they are not provided)
                        if (text.includes('Smt. Lata Devi & Sm. Kamal Kapoor')) {
                            text = '';
                            changed = true;
                        }
                        if (text.trim() === '——') {
                            text = '';
                            changed = true;
                        }

                        // Monograms
                        if (text.trim() === 'A & K') {
                            text = 'S & N';
                            changed = true;
                        }

                        // Hashtag
                        if (text.includes('#abkan')) {
                            const newText = text.replace('#abkan', '#SanjitWedsNirupama');
                            if (text !== newText) { text = newText; changed = true; }
                        }

                        // --- EVENT DATES UPDATES ---
                        // Mehendi: June 18th
                        if (text.trim() === 'Friday, March 9th 2026') {
                            text = 'Thursday, June 18th 2026';
                            changed = true;
                        }
                        // Haldi: June 18th
                        if (text.trim() === 'Friday, March 10th 2026') {
                            text = 'Thursday, June 18th 2026';
                            changed = true;
                        }
                        // Engagement: June 18th
                        if (text.trim() === 'Friday, March 11th 2026') {
                            text = 'Thursday, June 18th 2026';
                            changed = true;
                        }
                        // Shaadi: June 19th
                        if (text.trim() === 'Friday, March 12th 2026') {
                            text = 'Friday, June 19th 2026';
                            changed = true;
                        }
                        // Reception: June 20th
                        if (text.trim() === 'Friday, March 17th 2026') {
                            text = 'Saturday, June 20th 2026';
                            changed = true;
                        }

                        // Override Countdown Timer Value
                        if (/^\d{2}:\d{2}:\d{2}:\d{2}$/.test(text.trim())) {
                            const newTimerText = getCountdownText();
                            if (text !== newTimerText) {
                                text = newTimerText;
                                changed = true;
                            }
                            // Make it visible in case Framer hid it
                            if (el.style.visibility === 'hidden') {
                                el.style.visibility = 'visible';
                            }
                        }

                        if (changed && node.nodeValue !== text) {
                            node.nodeValue = text;
                        }
                    }
                });
            });
        } catch (e) {
            console.error("Error in cleanDOM: ", e);
        } finally {
            isCleaning = false;
        }
    }

    // Initialize door events
    if (document.readyState === 'loading') {
        window.addEventListener('DOMContentLoaded', setupDoorEvents);
    } else {
        setupDoorEvents();
    }
    
    // Setup MutationObserver for dynamic branding cleaning and text replacement
    const observer = new MutationObserver(() => {
        observer.disconnect();
        cleanDOM();
        if (document.body) {
            observer.observe(document.body, { childList: true, subtree: true });
        }
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
        observer.disconnect();
        cleanDOM();
        if (document.body) {
            observer.observe(document.body, { childList: true, subtree: true });
        }
    }, 1000);
})();
