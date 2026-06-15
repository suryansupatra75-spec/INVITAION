// JS overrides to clean up text, branding, and implement the door opening animation
(function() {
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

    // 2. Clean DOM of branding, watermarks, and customize groom/bride info
    function cleanDOM() {
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
                    // Hide parent-grandparent separator line
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
})();
