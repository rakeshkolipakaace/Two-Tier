document.addEventListener('DOMContentLoaded', () => {
    const trigger = document.getElementById('trigger-deploy');
    const pods = document.querySelectorAll('.pod');
    const pv = document.querySelector('.pv-tag');
    const templates = document.querySelectorAll('.file-tag');
    const valuesPanel = document.getElementById('values-panel');
    const helmLogo = document.querySelector('.helm-logo');
    
    // Initial state setup
    gsap.set('.pod, .pv-tag', { opacity: 0.1, x: 20 });
    gsap.set(templates, { opacity: 0.3 });

    trigger.addEventListener('click', () => {
        trigger.disabled = true;
        trigger.textContent = 'DEPLOYING...';
        
        const tl = gsap.timeline({
            onComplete: () => {
                trigger.textContent = 'DEPLOYMENT SUCCESSFUL';
                trigger.style.borderColor = '#39ff14';
                trigger.style.color = '#39ff14';
                setTimeout(() => {
                    trigger.disabled = false;
                    trigger.textContent = 'TRIGGER HELM INSTALL';
                    trigger.style.borderColor = '#00f3ff';
                    trigger.style.color = '#00f3ff';
                }, 3000);
            }
        });

        // 1. Particle flow from values to Helm
        tl.to(valuesPanel, { scale: 1.05, borderColor: '#00f3ff', duration: 0.3, yoyo: true, repeat: 1 });
        
        // Spawn particles
        for (let i = 0; i < 8; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            document.querySelector('.container').appendChild(particle);
            
            const startX = valuesPanel.offsetLeft + valuesPanel.offsetWidth - 20;
            const startY = valuesPanel.offsetTop + 100 + (Math.random() * 200);
            
            gsap.set(particle, { left: startX, top: startY });
            
            tl.to(particle, {
                x: 180 + Math.random() * 40,
                y: (helmLogo.parentElement.offsetTop + 100) - startY,
                opacity: 0,
                duration: 0.8 + Math.random(),
                ease: 'power2.in',
                onComplete: () => particle.remove()
            }, i * 0.1);
        }

        // 2. Helm Processing
        tl.to(helmLogo, { rotation: '+=720', duration: 1.5, ease: 'back.inOut(1.7)' }, '-=0.5');
        tl.to(helmLogo, { scale: 1.2, filter: 'drop-shadow(0 0 25px #00f3ff)', duration: 0.3, yoyo: true, repeat: 1 }, '-=0.5');

        // 3. Templates Activation
        tl.to(templates, {
            opacity: 1,
            borderColor: '#00f3ff',
            boxShadow: '0 0 10px rgba(0, 243, 255, 0.3)',
            stagger: 0.2,
            duration: 0.4
        }, '-=0.5');

        // 4. Manifest generation particles to Cluster
        for (let i = 0; i < 10; i++) {
            const mParticle = document.createElement('div');
            mParticle.className = 'particle';
            mParticle.style.background = '#ff00ff';
            mParticle.style.boxShadow = '0 0 10px #ff00ff';
            document.querySelector('.container').appendChild(mParticle);
            
            const startX = 600;
            const startY = 300 + (Math.random() * 200);
            
            gsap.set(mParticle, { left: startX, top: startY });
            
            tl.to(mParticle, {
                x: 250 + Math.random() * 50,
                y: -50 + Math.random() * 100,
                opacity: 0,
                duration: 1 + Math.random(),
                ease: 'power1.out',
                onComplete: () => mParticle.remove()
            }, 1.5 + (i * 0.1));
        }

        // 5. Database Deployment
        tl.to('.db-pod', { opacity: 1, x: 0, duration: 0.8, ease: 'back.out(1.7)' }, '+=0.2');
        tl.to(pv, { opacity: 1, x: 0, duration: 0.5 }, '-=0.3');

        // 6. Web App Deployment
        tl.to('.web-pod', { 
            opacity: 1, 
            x: 0, 
            stagger: 0.3, 
            duration: 1, 
            ease: 'elastic.out(1, 0.5)' 
        }, '-=0.5');

        // Final Glow on Running status
        tl.fromTo('.pod-status.running', 
            { filter: 'brightness(1)' }, 
            { filter: 'brightness(2)', duration: 0.5, repeat: 5, yoyo: true },
            '+=0.2'
        );
    });
});
