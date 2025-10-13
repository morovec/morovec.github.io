document.addEventListener('DOMContentLoaded', () => {
    const headerText = document.getElementById('header-text');
    const text = "MOROVEC";
    const typingSpeed = 150;
    const erasingSpeed = 100;
    const pauseBetween = 2000; // Pause after typing/erasing

    // Set cursor style
    const cursorColor = '#ff4136';
    headerText.style.borderRight = `0.15em solid ${cursorColor}`;
    setInterval(() => {
        headerText.style.borderRightColor = 
            headerText.style.borderRightColor === 'transparent' 
            ? cursorColor 
            : 'transparent';
    }, 500);

    let charIndex = 0;
    let isErasing = false;

    function typeErase() {
        const currentText = text.substring(0, charIndex);
        headerText.textContent = currentText || '\u00A0'; // Use non-breaking space when empty

        if (!isErasing) {
            // Typing
            if (charIndex < text.length) {
                charIndex++;
                setTimeout(typeErase, typingSpeed);
            } else {
                isErasing = true;
                setTimeout(typeErase, pauseBetween);
            }
        } else {
            // Erasing
            if (charIndex > 0) {
                charIndex--;
                setTimeout(typeErase, erasingSpeed);
            } else {
                isErasing = false;
                setTimeout(typeErase, pauseBetween / 2);
            }
        }
    }

    typeErase();

    const navLinks = document.querySelectorAll('nav a');
    const sections = document.querySelectorAll('main section');

    function showSection(hash) {
        sections.forEach(section => {
            if (`#${section.id}` === hash) {
                section.classList.add('active');
            } else {
                section.classList.remove('active');
            }
        });

        navLinks.forEach(link => {
            if (link.getAttribute('href') === hash) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    // Show section based on URL hash or default to #about
    const currentHash = window.location.hash || '#about';
    showSection(currentHash);
    
    navLinks.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            window.location.hash = targetId;
            showSection(targetId);
        });
    });

     window.addEventListener('hashchange', () => {
        showSection(window.location.hash);
    });
});
