document.addEventListener('DOMContentLoaded', () => {
    const noBtn = document.getElementById('noBtn');
    const yesBtn = document.getElementById('yesBtn');
    const catsContainer = document.querySelector('.flowers-container');
    const messageOverlay = document.querySelector('.message-overlay');

    // Function to move the No button randomly
    function moveButton() {
        const maxX = window.innerWidth - noBtn.offsetWidth;
        const maxY = window.innerHeight - noBtn.offsetHeight;
        
        const newX = Math.random() * maxX;
        const newY = Math.random() * maxY;
        
        noBtn.style.position = 'fixed';
        noBtn.style.left = newX + 'px';
        noBtn.style.top = newY + 'px';
    }

    // Move button on hover
    noBtn.addEventListener('mouseover', moveButton);

    // Create and animate cat
    function createCat(x, y) {
        const cat = document.createElement('div');
        cat.className = 'cat';
        cat.style.left = x + 'px';

        // Create cat head
        const head = document.createElement('div');
        head.className = 'cat-head';
        cat.appendChild(head);

        // Create ears
        const leftEar = document.createElement('div');
        leftEar.className = 'cat-ear left';
        const leftEarInner = document.createElement('div');
        leftEarInner.className = 'cat-ear-inner';
        leftEar.appendChild(leftEarInner);
        head.appendChild(leftEar);

        const rightEar = document.createElement('div');
        rightEar.className = 'cat-ear right';
        const rightEarInner = document.createElement('div');
        rightEarInner.className = 'cat-ear-inner';
        rightEar.appendChild(rightEarInner);
        head.appendChild(rightEar);

        // Create face
        const face = document.createElement('div');
        face.className = 'cat-face';
        head.appendChild(face);

        // Create eyes
        const leftEye = document.createElement('div');
        leftEye.className = 'cat-eye left';
        face.appendChild(leftEye);

        const rightEye = document.createElement('div');
        rightEye.className = 'cat-eye right';
        face.appendChild(rightEye);

        // Create nose
        const nose = document.createElement('div');
        nose.className = 'cat-nose';
        face.appendChild(nose);

        // Create mouth
        const mouth = document.createElement('div');
        mouth.className = 'cat-mouth';
        face.appendChild(mouth);

        // Create whiskers
        const whiskers = document.createElement('div');
        whiskers.className = 'cat-whiskers';
        
        // Left whiskers
        for (let i = 0; i < 3; i++) {
            const whisker = document.createElement('div');
            whisker.className = `whisker left ${['top', 'middle', 'bottom'][i]}`;
            whiskers.appendChild(whisker);
        }
        
        // Right whiskers
        for (let i = 0; i < 3; i++) {
            const whisker = document.createElement('div');
            whisker.className = `whisker right ${['top', 'middle', 'bottom'][i]}`;
            whiskers.appendChild(whisker);
        }
        
        face.appendChild(whiskers);
        catsContainer.appendChild(cat);

        // Make cat visible immediately
        cat.classList.add('visible');

        // Add click interaction
        cat.addEventListener('click', () => {
            // Remove any existing bounce animation
            cat.classList.remove('bounce');
            
            // Trigger reflow to restart animation
            void cat.offsetWidth;
            
            // Add bounce animation
            cat.classList.add('bounce');
            
            // Make a cute meow sound
            const meow = new Audio('https://www.soundjay.com/misc/sounds/cat-meow-1.mp3');
            meow.volume = 0.3;
            meow.play().catch(() => {
                // Ignore audio play errors
            });
        });

        return cat;
    }

    // Handle Yes button click
    yesBtn.addEventListener('click', () => {
        // Hide the letter but keep cats visible
        document.querySelector('.letter').style.opacity = '0';
        setTimeout(() => {
            document.querySelector('.letter').style.display = 'none';
            
            // Create cats in a row
            const catCount = 3;
            const spacing = window.innerWidth / (catCount + 1);
            
            for (let i = 0; i < catCount; i++) {
                const x = spacing * (i + 1) - 225;  // Center the cats (450px width / 2 = 225)
                createCat(x, 0);
            }

            // Show thank you message after cats appear
            setTimeout(() => {
                messageOverlay.classList.add('visible');
            }, 1000);
        }, 500);
    });
});
