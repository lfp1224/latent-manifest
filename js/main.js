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

    // Screenshot lightbox with navigation
    const screenshots = Array.from(document.querySelectorAll('.screenshot-img'));
    let currentIndex = 0;

    function openLightbox(index) {
        currentIndex = index;
        const img = screenshots[currentIndex];
        const fullSrc = img.dataset.full;

        const overlay = document.createElement('div');
        overlay.className = 'lightbox-overlay';
        overlay.style.cssText = `
            position:fixed;inset:0;z-index:10000;
            background:rgba(0,0,0,0.92);
            display:flex;align-items:center;justify-content:center;
            animation:fadeIn 0.25s ease;
        `;

        // Navigation buttons
        const prevBtn = document.createElement('button');
        prevBtn.className = 'lightbox-nav lightbox-prev';
        prevBtn.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>';
        prevBtn.style.cssText = `
            position:absolute;left:20px;top:50%;transform:translateY(-50%);
            width:48px;height:48px;border-radius:50%;
            background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.2);
            color:#fff;cursor:pointer;display:flex;align-items:center;justify-content:center;
            transition:all 0.2s ease;z-index:10001;
        `;
        prevBtn.onmouseenter = () => prevBtn.style.background = 'rgba(255,255,255,0.2)';
        prevBtn.onmouseleave = () => prevBtn.style.background = 'rgba(255,255,255,0.1)';

        const nextBtn = document.createElement('button');
        nextBtn.className = 'lightbox-nav lightbox-next';
        nextBtn.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>';
        nextBtn.style.cssText = `
            position:absolute;right:20px;top:50%;transform:translateY(-50%);
            width:48px;height:48px;border-radius:50%;
            background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.2);
            color:#fff;cursor:pointer;display:flex;align-items:center;justify-content:center;
            transition:all 0.2s ease;z-index:10001;
        `;
        nextBtn.onmouseenter = () => nextBtn.style.background = 'rgba(255,255,255,0.2)';
        nextBtn.onmouseleave = () => nextBtn.style.background = 'rgba(255,255,255,0.1)';

        // Counter
        const counter = document.createElement('div');
        counter.className = 'lightbox-counter';
        counter.style.cssText = `
            position:absolute;bottom:30px;left:50%;transform:translateX(-50%);
            font-family:"SF Mono",Monaco,Consolas,monospace;font-size:13px;
            color:rgba(255,255,255,0.6);letter-spacing:2px;z-index:10001;
        `;

        // Close button
        const closeBtn = document.createElement('button');
        closeBtn.className = 'lightbox-close';
        closeBtn.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';
        closeBtn.style.cssText = `
            position:absolute;top:20px;right:20px;
            width:48px;height:48px;border-radius:50%;
            background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.2);
            color:#fff;cursor:pointer;display:flex;align-items:center;justify-content:center;
            transition:all 0.2s ease;z-index:10001;
        `;
        closeBtn.onmouseenter = () => closeBtn.style.background = 'rgba(255,255,255,0.2)';
        closeBtn.onmouseleave = () => closeBtn.style.background = 'rgba(255,255,255,0.1)';

        // Image container
        const imgContainer = document.createElement('div');
        imgContainer.className = 'lightbox-img-container';
        imgContainer.style.cssText = 'position:relative;max-width:90vw;max-height:90vh;';

        const fullImg = new Image();
        fullImg.className = 'lightbox-full-img';
        fullImg.style.cssText = 'max-width:90vw;max-height:90vh;border-radius:12px;object-fit:contain;border:2px solid rgba(255,255,255,0.15);';
        fullImg.src = fullSrc;

        imgContainer.appendChild(fullImg);
        overlay.appendChild(prevBtn);
        overlay.appendChild(nextBtn);
        overlay.appendChild(closeBtn);
        overlay.appendChild(counter);
        overlay.appendChild(imgContainer);
        document.body.appendChild(overlay);

        function updateImage() {
            const newImg = screenshots[currentIndex];
            fullImg.src = newImg.dataset.full;
            counter.textContent = `${currentIndex + 1} / ${screenshots.length}`;
            prevBtn.style.opacity = currentIndex === 0 ? '0.3' : '1';
            prevBtn.style.pointerEvents = currentIndex === 0 ? 'none' : 'auto';
            nextBtn.style.opacity = currentIndex === screenshots.length - 1 ? '0.3' : '1';
            nextBtn.style.pointerEvents = currentIndex === screenshots.length - 1 ? 'none' : 'auto';
        }

        function navigate(direction) {
            const newIndex = currentIndex + direction;
            if (newIndex >= 0 && newIndex < screenshots.length) {
                currentIndex = newIndex;
                fullImg.style.opacity = '0.5';
                setTimeout(() => {
                    updateImage();
                    fullImg.onload = () => { fullImg.style.opacity = '1'; };
                }, 150);
            }
        }

        prevBtn.addEventListener('click', (e) => { e.stopPropagation(); navigate(-1); });
        nextBtn.addEventListener('click', (e) => { e.stopPropagation(); navigate(1); });
        closeBtn.addEventListener('click', () => overlay.remove());

        // Keyboard navigation
        function handleKey(e) {
            if (e.key === 'ArrowLeft') navigate(-1);
            if (e.key === 'ArrowRight') navigate(1);
            if (e.key === 'Escape') overlay.remove();
        }
        document.addEventListener('keydown', handleKey);

        // Close on background click
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) overlay.remove();
        });

        // Cleanup
        overlay.addEventListener('remove', () => {
            document.removeEventListener('keydown', handleKey);
        });

        updateImage();
    }

    screenshots.forEach((img, index) => {
        img.addEventListener('click', () => openLightbox(index));
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
