// ===== Scroll Animations (Intersection Observer) =====
document.addEventListener('DOMContentLoaded', () => {

    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                // Stagger animation for cards
                const siblings = entry.target.parentElement.querySelectorAll('[data-feature], [data-animate]');
                const index = Array.from(siblings).indexOf(entry.target);
                entry.target.style.transitionDelay = `${index * 0.08}s`;
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.feature-card, .workflow-step, .tip-card').forEach(el => {
        observer.observe(el);
    });

    // ===== Feature Card Toggle =====
    document.querySelectorAll('[data-feature]').forEach(card => {
        card.addEventListener('click', () => {
            const details = card.querySelector('[data-details]');
            const toggleText = card.querySelector('[data-toggle-text]');
            const toggleIcon = card.querySelector('[data-toggle-icon]');
            const isOpen = details.classList.contains('open');

            // Close all other cards
            document.querySelectorAll('[data-details]').forEach(d => {
                d.classList.remove('open');
            });
            document.querySelectorAll('[data-toggle-text]').forEach(t => {
                t.textContent = '詳細を見る';
            });
            document.querySelectorAll('[data-toggle-icon]').forEach(i => {
                i.classList.remove('rotated');
            });

            if (!isOpen) {
                details.classList.add('open');
                toggleText.textContent = '閉じる';
                toggleIcon.classList.add('rotated');
            }
        });
    });

    // ===== Prompt Tabs =====
    const tabs = document.querySelectorAll('[data-tab]');
    const promptCards = document.querySelectorAll('.prompt-card');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Update active tab
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const category = tab.dataset.tab;

            promptCards.forEach(card => {
                if (category === 'all' || card.dataset.category === category) {
                    card.classList.add('visible');
                } else {
                    card.classList.remove('visible');
                }
            });
        });
    });

    // ===== Copy to Clipboard =====
    document.querySelectorAll('[data-copy]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const card = btn.closest('.prompt-card');
            const text = card.querySelector('.prompt-card__text').textContent.trim();

            navigator.clipboard.writeText(text).then(() => {
                btn.textContent = '✅ コピーしました！';
                btn.classList.add('copied');
                setTimeout(() => {
                    btn.textContent = '📋 コピー';
                    btn.classList.remove('copied');
                }, 2000);
            }).catch(() => {
                // Fallback
                const textarea = document.createElement('textarea');
                textarea.value = text;
                textarea.style.position = 'fixed';
                textarea.style.opacity = '0';
                document.body.appendChild(textarea);
                textarea.select();
                document.execCommand('copy');
                document.body.removeChild(textarea);
                btn.textContent = '✅ コピーしました！';
                btn.classList.add('copied');
                setTimeout(() => {
                    btn.textContent = '📋 コピー';
                    btn.classList.remove('copied');
                }, 2000);
            });
        });
    });

    // ===== Scroll to Top =====
    const scrollTopBtn = document.getElementById('scrollTop');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ===== Smooth scroll for nav links =====
    document.querySelectorAll('.nav__link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
});
