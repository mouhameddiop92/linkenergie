/**
 * LINK ENERGY — Script Principal
 * Gestion de la navigation, sliders, marquee, filtres, modales devis & vidéo
 */

document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initHeroSlider();
    initRealisationsMarquee();
    initRealisationsPage();
    initProduitsPage();
    initDevisModal();
    initVideoModal();
    initContactForm();
    initCounterAnimation();
    initScrollAnimations();
    initBackToTop();
    initSmoothScroll();
    initActiveNavLink();
});

/* ---- Navbar : Effet au défilement et fermeture mobile ---- */
function initNavbar() {
    const navbar = document.getElementById('mainNavbar');
    if (!navbar) return;

    const toggleScrolled = () => {
        navbar.classList.toggle('scrolled', window.scrollY > 40);
    };

    toggleScrolled();
    window.addEventListener('scroll', toggleScrolled, { passive: true });

    const navCollapse = document.getElementById('navbarNav');
    if (navCollapse) {
        navCollapse.querySelectorAll('.nav-link:not(.dropdown-toggle)').forEach(link => {
            link.addEventListener('click', () => {
                const bsCollapse = bootstrap.Collapse.getInstance(navCollapse);
                if (bsCollapse && navCollapse.classList.contains('show')) {
                    bsCollapse.hide();
                }
            });
        });
    }
}

/* ---- Hero Section : Injection des slides depuis SITE_DATA + initialisation Bootstrap Carousel ---- */
function initHeroSlider() {
    const heroCarouselEl = document.getElementById('heroCarousel');
    const heroBgCarouselEl = document.getElementById('heroBgCarousel');
    const heroInner = document.getElementById('heroCarouselInner');
    const heroBgInner = document.getElementById('heroBgInner');
    const heroIndicators = document.getElementById('heroIndicators');

    // Vérification : données disponibles et éléments présents
    if (!heroCarouselEl || typeof SITE_DATA === 'undefined' || !SITE_DATA.heroSlides?.length) return;

    const badgeColors = [
        'bg-danger', 'bg-primary', 'bg-warning text-dark', 'bg-success', 'bg-info text-dark'
    ];

    // ---- Injection dans le carousel principal (carte avec overlay texte) ----
    if (heroInner) {
        heroInner.innerHTML = SITE_DATA.heroSlides.map((slide, i) => `
            <div class="carousel-item ${i === 0 ? 'active' : ''}">
                <img src="${slide.src}" alt="${escapeHtml(slide.alt)}" loading="${i === 0 ? 'eager' : 'lazy'}"
                     onerror="this.src='assets/images/3.jpeg'">
                <div class="hero-slider-overlay-text">
                    <span class="badge ${badgeColors[i % badgeColors.length]} mb-2">${escapeHtml(slide.badge)}</span>
                    <h5>${escapeHtml(slide.title)}</h5>
                    <p>${escapeHtml(slide.caption)}</p>
                </div>
            </div>
        `).join('');
    }

    // ---- Injection dans le fond d'écran (bg carousel) ----
    if (heroBgCarouselEl && heroBgInner) {
        heroBgInner.innerHTML = SITE_DATA.heroSlides.map((slide, i) => `
            <div class="carousel-item ${i === 0 ? 'active' : ''}">
                <img src="${slide.src}" class="hero-slider-img" alt="${escapeHtml(slide.alt)}" 
                     loading="${i === 0 ? 'eager' : 'lazy'}" onerror="this.src='assets/images/3.jpeg'">
            </div>
        `).join('');
    }

    // ---- Injection des indicateurs (boutons de navigation) ----
    if (heroIndicators) {
        heroIndicators.innerHTML = SITE_DATA.heroSlides.map((_, i) => `
            <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="${i}"
                    ${i === 0 ? 'class="active" aria-current="true"' : ''}
                    aria-label="Slide ${i + 1}"></button>
        `).join('');
    }

    // ---- Initialisation Bootstrap Carousel sur le carousel principal ----
    if (typeof bootstrap !== 'undefined') {
        const carouselInstance = new bootstrap.Carousel(heroCarouselEl, {
            interval: 5000,
            pause: 'hover',
            ride: 'carousel',
            wrap: true
        });

        // Synchroniser le fond avec le carousel principal
        if (heroBgCarouselEl) {
            const bgInstance = new bootstrap.Carousel(heroBgCarouselEl, {
                interval: false, // Contrôlé par synchronisation
                wrap: true
            });

            heroCarouselEl.addEventListener('slide.bs.carousel', (e) => {
                bgInstance.to(e.to);
            });
        }
    }
}

/* ---- Marquee Réalisations Accueil (Défilement continu de GAUCHE À DROITE) ---- */
function initRealisationsMarquee() {
    const track = document.getElementById('realisationsMarquee');
    if (!track || typeof SITE_DATA === 'undefined' || !SITE_DATA.realisations) return;

    const cardsHTML = SITE_DATA.realisations.map(real => {
        const isVideo = real.type === 'video' && real.video;
        const iconBadge = isVideo ? '<i class="bi bi-play-circle-fill"></i> Vidéo' : '<i class="bi bi-image"></i> Chantier';
        const playBtn = isVideo 
            ? `<div class="marquee-card-play" data-video-src="${real.video}" data-video-title="${escapeHtml(real.title)}"><i class="bi bi-play-fill"></i></div>` 
            : '';

        return `
            <div class="marquee-card" data-id="${real.id}">
                <div class="marquee-card-thumb">
                    <img src="${real.thumbnail}" alt="${escapeHtml(real.title)}" loading="lazy"
                         onerror="this.src='assets/images/paneau solaire.jpeg'">
                    <span class="marquee-card-cat">${SITE_DATA.categoryLabels[real.category] || real.category}</span>
                    <span class="marquee-card-type-badge">${iconBadge}</span>
                    ${playBtn}
                </div>
                <div class="marquee-card-body">
                    <h6>${real.title}</h6>
                    <p>${real.description}</p>
                </div>
            </div>
        `;
    }).join('');

    // Doubler le contenu pour une boucle fluide infinie sans rupture
    track.innerHTML = cardsHTML + cardsHTML;

    // Clic sur une carte du marquee : si vidéo, ouvrir la modal vidéo, sinon aller vers realisations.html
    track.querySelectorAll('.marquee-card').forEach(card => {
        card.addEventListener('click', (e) => {
            const playTrigger = e.target.closest('[data-video-src]');
            const videoSrc = playTrigger ? playTrigger.dataset.videoSrc : card.querySelector('[data-video-src]')?.dataset.videoSrc;
            const videoTitle = playTrigger ? playTrigger.dataset.videoTitle : card.querySelector('h6')?.textContent;

            if (videoSrc) {
                openVideoModal(videoSrc, videoTitle);
            } else {
                window.location.href = `realisations.html#real-${card.dataset.id}`;
            }
        });
    });
}

/* ---- Page Réalisations Complète (Grille, Filtres, Lecteurs Vidéos) ---- */
function initRealisationsPage() {
    const grid = document.getElementById('realisationsGrid');
    const filters = document.getElementById('realisationsFilters');
    if (!grid || typeof SITE_DATA === 'undefined' || !SITE_DATA.realisations) return;

    const renderGrid = (filter) => {
        let items = SITE_DATA.realisations;
        if (filter === 'video') {
            items = items.filter(r => r.type === 'video');
        } else if (filter !== 'all') {
            items = items.filter(r => r.category === filter);
        }

        grid.innerHTML = items.map(real => {
            const isVideo = real.type === 'video' && real.video;
            const mediaContent = isVideo ? `
                <div class="realisation-media-wrapper">
                    <video controls playsinline preload="metadata" poster="${real.thumbnail}">
                        <source src="${real.video}" type="video/mp4">
                        Votre navigateur ne supporte pas la lecture de vidéo.
                    </video>
                </div>
            ` : `
                <div class="realisation-media-wrapper">
                    <img src="${real.thumbnail}" alt="${escapeHtml(real.title)}" loading="lazy">
                </div>
            `;

            const actionBtn = isVideo ? `
                <button type="button" class="btn btn-sm btn-outline-primary-custom w-100 mt-2 btn-open-video"
                        data-video-src="${real.video}" data-video-title="${escapeHtml(real.title)}">
                    <i class="bi bi-arrows-fullscreen me-1"></i>Agrandir la vidéo
                </button>
            ` : '';

            return `
                <div class="col-md-6 col-lg-4 fade-in visible" id="real-${real.id}">
                    <div class="realisation-card">
                        ${mediaContent}
                        <div class="realisation-body">
                            <div>
                                <span class="realisation-cat-badge">
                                    <i class="bi bi-tag-fill me-1"></i>${SITE_DATA.categoryLabels[real.category] || real.category}
                                </span>
                            </div>
                            <h5>${real.title}</h5>
                            <p>${real.description}</p>
                            <div class="realisation-footer">
                                <span><i class="bi bi-geo-alt-fill text-accent me-1"></i>${real.location || 'Sénégal'}</span>
                                <span class="badge ${isVideo ? 'bg-danger' : 'bg-primary'}">${isVideo ? 'Vidéo HD' : 'Chantier'}</span>
                            </div>
                            ${actionBtn}
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        // Attacher les écouteurs pour la lightbox vidéo
        grid.querySelectorAll('.btn-open-video').forEach(btn => {
            btn.addEventListener('click', () => {
                openVideoModal(btn.dataset.videoSrc, btn.dataset.videoTitle);
            });
        });
    };

    renderGrid('all');

    if (filters) {
        filters.addEventListener('click', (e) => {
            const btn = e.target.closest('[data-filter]');
            if (!btn) return;
            filters.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderGrid(btn.dataset.filter);
        });
    }

    if (window.location.hash) {
        setTimeout(() => {
            const el = document.querySelector(window.location.hash);
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 400);
    }
}

/* ---- Page Produits (Catalogue, Spécifications & Boutons Devis préremplis) ---- */
function initProduitsPage() {
    const grid = document.getElementById('produitsGrid');
    const filters = document.getElementById('produitsFilters');
    if (!grid || typeof SITE_DATA === 'undefined' || !SITE_DATA.produits) return;

    const renderProducts = (filter) => {
        let items = SITE_DATA.produits;
        if (filter !== 'all') {
            items = items.filter(p => p.category === filter);
        }

        grid.innerHTML = items.map(prod => `
            <div class="col-md-6 col-lg-4 fade-in visible" id="prod-${prod.id}">
                <div class="product-card h-100">
                    <div class="product-img-wrapper">
                        <img src="${prod.image}" alt="${escapeHtml(prod.title)}" loading="lazy"
                             onerror="this.src='assets/images/paneau solaire.jpeg'">
                        <span class="product-badge">${prod.badge}</span>
                        <span class="product-cat-tag">${prod.categoryLabel}</span>
                    </div>
                    <div class="product-body">
                        <h5>${prod.title}</h5>
                        <div class="product-subtitle">${prod.subtitle}</div>
                        <p>${prod.description}</p>
                        <ul class="product-specs">
                            ${prod.specs.map(spec => `<li><i class="bi bi-check2-circle"></i><span>${spec}</span></li>`).join('')}
                        </ul>
                        <div class="product-footer">
                            <button type="button" class="btn btn-accent w-100 btn-quote-product" 
                                    data-product-id="${prod.id}"
                                    data-product-name="${escapeHtml(prod.title)}"
                                    data-product-cat="${prod.category}">
                                <i class="bi bi-file-earmark-text me-1"></i>Demander un devis pour ce produit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');

        // Clic sur bouton de devis produit : ouvrir la modal avec produit pré-sélectionné
        grid.querySelectorAll('.btn-quote-product').forEach(btn => {
            btn.addEventListener('click', () => {
                openDevisModalWithProduct(btn.dataset.productName, btn.dataset.productCat);
            });
        });
    };

    renderProducts('all');

    if (filters) {
        filters.addEventListener('click', (e) => {
            const btn = e.target.closest('[data-filter]');
            if (!btn) return;
            filters.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderProducts(btn.dataset.filter);
        });
    }

    if (window.location.hash) {
        setTimeout(() => {
            const el = document.querySelector(window.location.hash);
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 400);
    }
}

/* ---- Modale Devis Gratuit Dédiée (Email + WhatsApp Direct) ---- */
function initDevisModal() {
    const modalEl = document.getElementById('devisModal');
    const form = document.getElementById('devisForm');
    const successMsg = document.getElementById('devisFormSuccess');
    const whatsappBtn = document.getElementById('devisWhatsAppBtn');

    if (!form) return;

    // Gestion du clic sur le bouton WhatsApp
    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const nom = form.querySelector('#devisNom')?.value.trim() || '';
            const telephone = form.querySelector('#devisTelephone')?.value.trim() || '';
            const email = form.querySelector('#devisEmail')?.value.trim() || '';
            const projet = form.querySelector('#devisType')?.value || '';
            const client = form.querySelector('#devisClient')?.value || 'particulier';
            const localisation = form.querySelector('#devisLocalisation')?.value.trim() || '';
            const equipement = form.querySelector('#devisEquipement')?.value.trim() || '';
            const message = form.querySelector('#devisMessage')?.value.trim() || '';

            if (!nom || !telephone) {
                alert('Veuillez au moins renseigner votre nom et votre numéro de téléphone pour envoyer via WhatsApp.');
                form.querySelector('#devisNom')?.focus();
                return;
            }

            const projectLabels = {
                solaire: 'Centrale solaire photovoltaïque',
                pompage: 'Système de pompage solaire',
                electricite: 'Électricité générale / Câblage',
                materiel: 'Achat d\'équipements / Matériel',
                maintenance: 'Maintenance / SAV / Dépannage',
                autre: 'Autre projet énergétique'
            };

            let waText = `Bonjour LINK ENERGY,\n\nJe souhaite demander un *DEVIS GRATUIT* :\n`;
            waText += `👤 *Nom complet* : ${nom}\n`;
            waText += `📞 *Téléphone* : ${telephone}\n`;
            if (email) waText += `✉️ *Email* : ${email}\n`;
            waText += `🏷️ *Type de projet* : ${projectLabels[projet] || projet}\n`;
            if (equipement) waText += `📦 *Équipement concerné* : ${equipement}\n`;
            if (localisation) waText += `📍 *Localisation* : ${localisation}\n`;
            if (message) waText += `\n📝 *Détails du besoin* :\n${message}\n`;
            waText += `\nMerci de me recontacter !`;

            const phone = '221710487968'; // Numéro WhatsApp officiel Link Energy
            const url = `https://wa.me/${phone}?text=${encodeURIComponent(waText)}`;
            window.open(url, '_blank');
        });
    }

    // Gestion de la soumission standard par email
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const requiredFields = form.querySelectorAll('[required]');
        let isValid = true;

        requiredFields.forEach(field => {
            if (!field.checkValidity()) {
                field.classList.add('is-invalid');
                isValid = false;
            } else {
                field.classList.remove('is-invalid');
            }
        });

        if (!isValid) return;

        const nom = form.querySelector('#devisNom')?.value.trim() || '';
        const telephone = form.querySelector('#devisTelephone')?.value.trim() || '';
        const email = form.querySelector('#devisEmail')?.value.trim() || '';
        const client = form.querySelector('#devisClient')?.value || '';
        const projet = form.querySelector('#devisType')?.value || '';
        const localisation = form.querySelector('#devisLocalisation')?.value.trim() || 'Non précisée';
        const equipement = form.querySelector('#devisEquipement')?.value.trim() || 'Non précisé';
        const message = form.querySelector('#devisMessage')?.value.trim() || '';

        const projectLabels = {
            solaire: 'Installation solaire photovoltaïque',
            pompage: 'Pompage solaire',
            electricite: 'Électricité générale',
            materiel: 'Équipement & Matériel',
            maintenance: 'Maintenance / SAV',
            autre: 'Autre'
        };

        const subject = encodeURIComponent(`[DEMANDE DE DEVIS LINK ENERGY] ${projectLabels[projet] || projet} — ${nom}`);
        const bodyContent = 
            `=== DEMANDE DE DEVIS LINK ENERGY ===\n\n` +
            `Nom complet : ${nom}\n` +
            `Téléphone : ${telephone}\n` +
            `Email : ${email}\n` +
            `Type de client : ${client}\n` +
            `Type de projet : ${projectLabels[projet] || projet}\n` +
            `Équipement souhaité : ${equipement}\n` +
            `Localisation au Sénégal : ${localisation}\n\n` +
            `Description du besoin :\n${message}\n\n` +
            `Envoyé depuis le site Link Energy`;

        const mailtoUrl = `mailto:linkenergysenegal@gmail.com?subject=${subject}&body=${encodeURIComponent(bodyContent)}`;
        window.location.href = mailtoUrl;

        if (successMsg) {
            successMsg.classList.remove('d-none');
            setTimeout(() => successMsg.classList.add('d-none'), 6000);
        }

        form.reset();

        if (modalEl && typeof bootstrap !== 'undefined') {
            setTimeout(() => {
                const inst = bootstrap.Modal.getInstance(modalEl);
                if (inst) inst.hide();
            }, 2500);
        }
    });

    form.querySelectorAll('.form-control, .form-select').forEach(field => {
        field.addEventListener('input', () => field.classList.remove('is-invalid'));
    });
}

/**
 * Ouvre la modal devis en préremplissant le produit
 */
function openDevisModalWithProduct(productName, productCategory) {
    const modalEl = document.getElementById('devisModal');
    if (!modalEl || typeof bootstrap === 'undefined') return;

    const equipementInput = modalEl.querySelector('#devisEquipement');
    const typeSelect = modalEl.querySelector('#devisType');
    const messageInput = modalEl.querySelector('#devisMessage');

    if (equipementInput) equipementInput.value = productName;
    if (typeSelect) {
        if (productCategory === 'solaire') typeSelect.value = 'solaire';
        else if (productCategory === 'pompage') typeSelect.value = 'pompage';
        else if (productCategory === 'controleurs') typeSelect.value = 'electricite';
    }
    if (messageInput && !messageInput.value) {
        messageInput.value = `Je souhaite obtenir un devis et les tarifs pour : ${productName}.`;
    }

    const modalInstance = bootstrap.Modal.getOrCreateInstance(modalEl);
    modalInstance.show();
}

/* ---- Modale Vidéo Lightbox ---- */
function initVideoModal() {
    const videoModal = document.getElementById('videoModal');
    if (!videoModal) return;

    videoModal.addEventListener('hidden.bs.modal', () => {
        const player = videoModal.querySelector('video');
        if (player) {
            player.pause();
            player.removeAttribute('src');
            player.load();
        }
    });
}

function openVideoModal(videoSrc, title) {
    const videoModal = document.getElementById('videoModal');
    if (!videoModal || typeof bootstrap === 'undefined') return;

    const modalTitle = videoModal.querySelector('.modal-title');
    const videoPlayer = videoModal.querySelector('video');

    if (modalTitle) modalTitle.textContent = title || 'Réalisation Vidéo — LINK ENERGY';
    if (videoPlayer) {
        videoPlayer.src = videoSrc;
        videoPlayer.load();
        videoPlayer.play().catch(() => {/* Autoplay policy handled */});
    }

    const instance = bootstrap.Modal.getOrCreateInstance(videoModal);
    instance.show();
}

/* ---- Formulaire de contact (Section contact sur accueil) ---- */
function initContactForm() {
    const form = document.getElementById('contactForm');
    const successMsg = document.getElementById('formSuccess');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const requiredFields = form.querySelectorAll('[required]');
        let isValid = true;

        requiredFields.forEach(field => {
            if (!field.checkValidity()) {
                field.classList.add('is-invalid');
                isValid = false;
            } else {
                field.classList.remove('is-invalid');
            }
        });

        if (!isValid) return;

        const nom = form.querySelector('#nom')?.value.trim() || '';
        const telephone = form.querySelector('#telephone')?.value.trim() || '';
        const email = form.querySelector('#email')?.value.trim() || '';
        const sujet = form.querySelector('#sujet')?.value || 'Contact';
        const message = form.querySelector('#message')?.value.trim() || '';

        const subject = encodeURIComponent(`[Contact Link Energy] ${sujet} — ${nom}`);
        const bodyContent = 
            `=== MESSAGE DE CONTACT LINK ENERGY ===\n\n` +
            `Nom complet : ${nom}\n` +
            `Téléphone : ${telephone}\n` +
            `Email : ${email}\n` +
            `Sujet : ${sujet}\n\n` +
            `Message :\n${message}`;

        window.location.href = `mailto:linkenergysenegal@gmail.com?subject=${subject}&body=${encodeURIComponent(bodyContent)}`;

        if (successMsg) {
            successMsg.classList.remove('d-none');
            setTimeout(() => successMsg.classList.add('d-none'), 5000);
        }

        form.reset();
    });

    form.querySelectorAll('.form-control, .form-select').forEach(field => {
        field.addEventListener('input', () => field.classList.remove('is-invalid'));
    });
}

/* ---- Animation des compteurs du Hero ---- */
function initCounterAnimation() {
    const counters = document.querySelectorAll('[data-count]');
    if (!counters.length) return;

    const animateCounter = (el) => {
        const target = parseInt(el.getAttribute('data-count'), 10);
        const duration = 2000;
        const start = performance.now();

        const update = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.floor(eased * target);
            if (progress < 1) requestAnimationFrame(update);
        };

        requestAnimationFrame(update);
    };

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.5 }
    );

    counters.forEach(c => observer.observe(c));
}

/* ---- Révélation au scroll (Fade-in) ---- */
function initScrollAnimations() {
    const elements = document.querySelectorAll('.fade-in:not(.visible)');
    if (!elements.length) return;

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    elements.forEach(el => observer.observe(el));
}

/* ---- Bouton Retour en Haut ---- */
function initBackToTop() {
    const btn = document.getElementById('backToTop');
    if (!btn) return;

    window.addEventListener('scroll', () => {
        btn.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

/* ---- Défilement fluide pour ancres ---- */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const targetId = anchor.getAttribute('href');
            if (targetId === '#' || targetId.startsWith('#devis') || targetId.startsWith('#video')) return;

            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

/* ---- Lien actif dans la navbar au scroll ---- */
function initActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link[href^="#"]');

    if (!sections.length || !navLinks.length) return;

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    navLinks.forEach(link => {
                        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
                    });
                }
            });
        },
        { threshold: 0.3, rootMargin: '-80px 0px -50% 0px' }
    );

    sections.forEach(section => observer.observe(section));
}

/* ---- Utilitaires ---- */
function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/&/g, '&amp;')
              .replace(/</g, '&lt;')
              .replace(/>/g, '&gt;')
              .replace(/"/g, '&quot;')
              .replace(/'/g, '&#039;');
}
