/* ========================================
   LATENT & MANIFEST — 主交互脚本
   功能：滚动动画、视差效果、交互反馈
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
    // ========================================
    // 滚动动画 - Intersection Observer
    // ========================================

    const observerOptions = {
        root: null,
        rootMargin: '-10% 0px',
        threshold: 0.1
    };

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // 观察所有需要滚动动画的元素
    document.querySelectorAll('.workflow-step, .feature, .tech-card, .fade-in').forEach(el => {
        scrollObserver.observe(el);
    });

    // ========================================
    // 平滑滚动导航
    // ========================================

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);

            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ========================================
    // 鼠标悬停视差效果
    // ========================================

    const parallaxElements = document.querySelectorAll('.viewfinder-mockup, .darkroom-mockup');

    document.addEventListener('mousemove', (e) => {
        const mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        const mouseY = (e.clientY / window.innerHeight - 0.5) * 2;

        parallaxElements.forEach((el, index) => {
            const intensity = index % 2 === 0 ? 1 : -1;
            const x = mouseX * 10 * intensity;
            const y = mouseY * 10 * intensity;
            el.style.transform = `translate(${x}px, ${y}px)`;
        });
    });

    // ========================================
    // 取景器对焦框效果
    // ========================================

    const viewfinder = document.querySelector('.viewfinder-frame');

    if (viewfinder) {
        viewfinder.addEventListener('click', (e) => {
            const rect = viewfinder.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // 创建对焦框
            const focusBox = document.createElement('div');
            focusBox.className = 'focus-box';
            focusBox.style.cssText = `
                position: absolute;
                left: ${x - 30}px;
                top: ${y - 30}px;
                width: 60px;
                height: 60px;
                border: 2px solid rgba(255, 255, 255, 0.8);
                border-radius: 4px;
                pointer-events: none;
                animation: focusPulse 0.6s ease-out forwards;
            `;

            viewfinder.appendChild(focusBox);

            // 动画结束后移除
            setTimeout(() => {
                focusBox.remove();
            }, 600);
        });
    }

    // 注入对焦动画 CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes focusPulse {
            0% {
                opacity: 1;
                transform: scale(0.8);
            }
            100% {
                opacity: 0;
                transform: scale(1.2);
            }
        }

        .shutter-button:active {
            transform: translateX(-50%) scale(0.95);
        }

        .workflow-step {
            will-change: opacity, transform;
        }
    `;
    document.head.appendChild(style);

    // ========================================
    // 冲洗进度模拟动画
    // ========================================

    const timerCount = document.querySelector('.timer-count');
    const safelight = document.querySelector('.safelight');

    if (timerCount && safelight) {
        let frameCount = 0;
        const totalFrames = 12;

        // 模拟冲洗进度（仅视觉效果）
        const simulateDeveloping = () => {
            frameCount = (frameCount % totalFrames) + 1;
            timerCount.textContent = `${frameCount}/${totalFrames}`;

            // 安全灯亮度变化
            safelight.style.animation = 'none';
            safelight.offsetHeight; // 触发重绘
            safelight.style.animation = 'safelightPulse 0.8s ease-in-out infinite';
        };

        // 当用户滚动到暗房区域时启动模拟
        const darkroomObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // 模拟每帧冲洗的 800ms 间隔
                    setInterval(simulateDeveloping, 800);
                    darkroomObserver.disconnect();
                }
            });
        }, { threshold: 0.5 });

        darkroomObserver.observe(document.querySelector('.darkroom-mockup'));
    }

    // ========================================
    // 胶片颗粒滚动反馈
    // ========================================

    let lastScrollY = window.scrollY;
    const grainOverlay = document.querySelector('.hero-grain');

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        const scrollDelta = Math.abs(currentScrollY - lastScrollY);

        // 滚动时增强颗粒效果
        if (scrollDelta > 5 && grainOverlay) {
            grainOverlay.style.opacity = '0.08';
            setTimeout(() => {
                grainOverlay.style.opacity = '0.04';
            }, 150);
        }

        lastScrollY = currentScrollY;
    }, { passive: true });

    // ========================================
    // 特性列表依次淡入
    // ========================================

    const featureObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 150);
                featureObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    document.querySelectorAll('.feature').forEach(feature => {
        feature.classList.add('fade-in');
        featureObserver.observe(feature);
    });

    // ========================================
    // 技术卡片悬停效果增强
    // ========================================

    document.querySelectorAll('.tech-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // ========================================
    // 初始加载完成回调
    // ========================================

    console.log('%c LATENT & MANIFEST ', 'background: #0a0a0a; color: #f5f5f5; font-size: 16px; padding: 8px 16px;');
    console.log('%c 胶片摄影系统官网已加载 ', 'color: #888; font-size: 12px;');
});

// ========================================
// 移动端触摸反馈
// ========================================

document.addEventListener('touchstart', function(e) {
    if (e.target.classList.contains('btn') || e.target.classList.contains('download-btn')) {
        e.target.style.transform = 'scale(0.98)';
    }
}, { passive: true });

document.addEventListener('touchend', function(e) {
    if (e.target.classList.contains('btn') || e.target.classList.contains('download-btn')) {
        e.target.style.transform = 'scale(1)';
    }
});
