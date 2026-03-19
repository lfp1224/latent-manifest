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

    // Screenshot lightbox with lazy loading
    document.querySelectorAll('.screenshot-img').forEach(img => {
        img.addEventListener('click', () => {
            const fullSrc = img.dataset.full;
            const overlay = document.createElement('div');
            overlay.className = 'lightbox-overlay';
            overlay.style.cssText = `
                position:fixed;inset:0;z-index:10000;
                background:rgba(0,0,0,0.92);
                display:flex;align-items:center;justify-content:center;
                cursor:pointer;animation:fadeIn 0.25s ease;
            `;

            // Loading spinner
            const loader = document.createElement('div');
            loader.className = 'lightbox-loader';
            loader.innerHTML = `
                <div class="loader-ring"></div>
                <span class="loader-text">Loading...</span>
            `;
            loader.style.cssText = `
                display:flex;flex-direction:column;align-items:center;gap:12px;
            `;
            overlay.appendChild(loader);

            const fullImg = new Image();
            fullImg.className = 'lightbox-full-img';
            fullImg.style.cssText = 'max-width:90vw;max-height:90vh;border-radius:12px;object-fit:contain;opacity:0;transition:opacity 0.3s ease;';

            fullImg.onload = () => {
                loader.remove();
                overlay.appendChild(fullImg);
                requestAnimationFrame(() => fullImg.style.opacity = '1');
            };

            fullImg.src = fullSrc;
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
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        .loader-ring {
            width: 32px;
            height: 32px;
            border: 2px solid rgba(255,255,255,0.1);
            border-top-color: rgba(255,255,255,0.8);
            border-radius: 50%;
            animation: spin 0.8s linear infinite;
        }
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
        .loader-text {
            font-family: "SF Mono", Monaco, Consolas, monospace;
            font-size: 11px;
            color: rgba(255,255,255,0.5);
            letter-spacing: 1px;
        }
    `;
    document.head.appendChild(style);

    console.log('%c LATENT & MANIFEST ', 'background:#0a0a0a;color:#f5f5f5;font-size:14px;padding:6px 12px;');
});
