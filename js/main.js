/* ========================================
   LATENT & MANIFEST — 交互脚本
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {

    // Scroll reveal
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => entry.target.classList.add('visible'), i * 80);
                observer.unobserve(entry.target);
            }
        });
    }, { rootMargin: '-8% 0px', threshold: 0.1 });

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            e.preventDefault();
            const target = document.querySelector(a.getAttribute('href'));
            if (target) {
                window.scrollTo({ top: target.offsetTop - 60, behavior: 'smooth' });
            }
        });
    });

    // Viewfinder focus effect
    const vf = document.querySelector('.viewfinder-frame');
    if (vf) {
        vf.addEventListener('click', e => {
            const rect = vf.getBoundingClientRect();
            const box = document.createElement('div');
            box.style.cssText = `
                position:absolute;
                left:${e.clientX - rect.left - 24}px;
                top:${e.clientY - rect.top - 24}px;
                width:48px;height:48px;
                border:1.5px solid rgba(255,255,255,0.7);
                border-radius:3px;
                pointer-events:none;
                animation:focusPulse 0.5s ease-out forwards;
            `;
            vf.appendChild(box);
            setTimeout(() => box.remove(), 500);
        });
    }

    // Developing timer simulation
    const timerEl = document.querySelector('.timer-count');
    if (timerEl) {
        let frame = 0;
        const total = 12;
        const darkroomObs = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                setInterval(() => {
                    frame = (frame % total) + 1;
                    timerEl.textContent = `${frame}/${total}`;
                }, 800);
                darkroomObs.disconnect();
            }
        }, { threshold: 0.4 });
        const mockup = document.querySelector('.darkroom-mockup');
        if (mockup) darkroomObs.observe(mockup);
    }

    // Screenshot lightbox
    document.querySelectorAll('.screenshot-img').forEach(img => {
        img.addEventListener('click', () => {
            const overlay = document.createElement('div');
            overlay.style.cssText = `
                position:fixed;inset:0;z-index:10000;
                background:rgba(0,0,0,0.92);
                display:flex;align-items:center;justify-content:center;
                cursor:pointer;animation:fadeIn 0.25s ease;
            `;
            const clone = img.cloneNode();
            clone.style.cssText = 'max-width:90vw;max-height:90vh;border-radius:12px;object-fit:contain;';
            overlay.appendChild(clone);
            overlay.addEventListener('click', () => overlay.remove());
            document.body.appendChild(overlay);
        });
    });

    // Inject keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes focusPulse {
            0% { opacity:1; transform:scale(0.7); }
            100% { opacity:0; transform:scale(1.3); }
        }
    `;
    document.head.appendChild(style);

    console.log('%c LATENT & MANIFEST ', 'background:#0a0a0a;color:#f5f5f5;font-size:14px;padding:6px 12px;');
});
