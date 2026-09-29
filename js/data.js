/**
 * LINK ENERGY — Données du site (Équipements, Réalisations, Vidéos)
 * Basé sur les équipements et chantiers réels de Link Energy au Sénégal
 */

const SITE_DATA = {
    // Diapositives du Hero (récupérées automatiquement par main.js)
    heroSlides: [
        {
            src: 'assets/images/3.jpeg',
            alt: 'Centrale Solaire & Onduleurs Hybrides',
            badge: 'Solaire & Batteries Lithium',
            title: 'Centrale Solaire & Onduleurs Hybrides',
            caption: 'Installation complète avec parc de batteries lithium et onduleurs en parallèle'
        },
        {
            src: 'assets/images/1.jpeg',
            alt: 'Câblage Armoire Électrique Industrielle',
            badge: 'Distribution Électrique',
            title: 'Câblage d’Armoires Industrielles',
            caption: 'Raccordement de tableaux électriques basse tension et distribution sécurisée'
        },
        {
            src: 'assets/images/2.jpeg',
            alt: 'Travaux d’Électricité Générale',
            badge: 'Chantier & Rénovation',
            title: 'Travaux d’Électricité Générale',
            caption: 'Encastrement, passages de gaines et câblage certifié aux normes'
        },
        {
            src: 'assets/images/4.jpeg',
            alt: 'Raccordement Tableau Électrique',
            badge: 'Mise aux Normes',
            title: 'Raccordement & Tableaux Modulaires',
            caption: 'Techniciens qualifiés assurant l’équilibrage et la protection des circuits'
        },
        {
            src: 'assets/images/pompe.jpeg',
            alt: 'Motopompe Agricole Grand Débit',
            badge: 'Pompage Agricole',
            title: 'Solutions de Pompage & Irrigation',
            caption: 'Approvisionnement en eau autonome et haute capacité pour les cultures'
        }
    ],

    // Produits et équipements disponibles (pour la page produits.html et l'aperçu accueil)
    produits: [
        {
            id: 'panneau-550w',
            category: 'solaire',
            categoryLabel: 'Solaire',
            title: 'Panneau Solaire 550W Energie City',
            subtitle: 'Module Monocristallin Demi-Cellules',
            image: 'assets/images/paneau solaire.jpeg',
            badge: '550W Crête',
            specs: [
                'Puissance nominale : 550 Wc',
                'Technologie : Monocristallin demi-cellules haute sensibilité',
                'Rendement module : supérieur à 21.3%',
                'Tolérance de puissance : positive 0~+5W',
                'Garantie produit : 12 ans | Performance : 25 ans'
            ],
            description: 'Idéal pour les centrales résidentielles, commerciales et les stations de pompage nécessitant une production maximale même par faible luminosité.'
        },
        {
            id: 'pompe-submersible',
            category: 'pompage',
            categoryLabel: 'Pompage',
            title: 'Pompe Solaire Submersible Inox (Série 90QJD & 4PSC)',
            subtitle: 'Pompes Immergées Forage Profond',
            image: 'assets/images/pompe immergée.jpeg',
            badge: 'Inox 304 / IP68',
            specs: [
                'Modèles : 90QJD2-90-1.1 (1.5 HP) & 4PSC6.5-85-144-1100',
                'Hauteur Manométrique (HMT) : jusqu’à 90 mètres',
                'Débit maximal : jusqu’à 6.5 m³/h',
                'Corps entièrement en acier inoxydable anti-corrosion',
                'Moteur brushless CC ou CA haute performance'
            ],
            description: 'Solution idéale pour l’alimentation en eau potable des villages, l’abreuvement du bétail et l’irrigation maraîchère en zone rurale isolée.'
        },
        {
            id: 'controleur-likou',
            category: 'controleurs',
            categoryLabel: 'Contrôleurs & Coffrets',
            title: 'Contrôleur Solaire LIKOU DC 96V 1500W',
            subtitle: 'Régulateur MPPT avec Affichage Digital',
            image: 'assets/images/controller.jpeg',
            badge: 'MPPT 96V / 1500W',
            specs: [
                'Tension d’entrée max : 200V DC (compatible 8 panneaux 285W)',
                'Suivi du point de puissance maximale (MPPT automatique)',
                'Protection intégrée puits sec et cuve pleine (sondes)',
                'Disjoncteur de sécurité Schneider Electric inclus',
                'Écran LED pour suivi en temps réel : tension, courant, RPM'
            ],
            description: 'Assure un pilotage intelligent et automatique de votre pompe solaire en maximisant le débit dès les premières heures de soleil.'
        },
        {
            id: 'pompe-surface',
            category: 'pompage',
            categoryLabel: 'Pompage',
            title: 'Pompe Solaire de Surface avec Régulateur Intégré',
            subtitle: 'Pompe Centrifuge sur Châssis Métallique',
            image: 'assets/images/pompe solaire.jpeg',
            badge: 'Autonome & Mobile',
            specs: [
                'Variateur et contrôleur intégrés sur le châssis',
                'Alimentation directe par panneaux solaires sans batterie',
                'Refoulement haute pression avec raccord rapide',
                'Cadre tubulaire de protection et poignée de transport',
                'Rendement énergétique optimisé'
            ],
            description: 'Parfait pour le pompage depuis les bassins de rétention, fleuves ou puits peu profonds pour l’aspersion et le goutte-à-goutte.'
        },
        {
            id: 'motopompe-irrigation',
            category: 'pompage',
            categoryLabel: 'Pompage & Irrigation',
            title: 'Motopompe Agricole Grand Débit sur Roues',
            subtitle: 'Système Haute Capacité Tout-Terrain',
            image: 'assets/images/pompe.jpeg',
            badge: 'Grand Débit',
            specs: [
                'Montée sur châssis robuste avec roues tout-terrain',
                'Gros diamètre d’aspiration et de refoulement',
                'Système de relevage et amorçage manuel rapide',
                'Idéal pour inondation, canaux et périmètres rizicoles',
                'Moteur économique à forte endurance'
            ],
            description: 'Conçue pour les exploitations agricoles de grande envergure nécessitant un transfert d’eau massif et rapide.'
        },
        {
            id: 'armoire-coffret',
            category: 'controleurs',
            categoryLabel: 'Électricité & Protection',
            title: 'Tableaux Électriques & Coffrets DC/AC Legrand / Schneider',
            subtitle: 'Armoires de Distribution et Protection Conformes',
            image: 'assets/images/coffre.jpeg',
            badge: 'Norme NFC 15-100',
            specs: [
                'Composants de grandes marques : Legrand, Schneider Electric',
                'Parafoudres solaires DC et différentiels AC haute sensibilité',
                'Disjoncteurs calibrés selon la puissance de votre installation',
                'Câblage soigné avec repérage et répartiteurs modulaires',
                'Boîtiers étanches IP65 pour l’extérieur'
            ],
            description: 'Protection intégrale de vos appareils, de vos panneaux et onduleurs contre les variations de tension, la foudre et les courts-circuits.'
        }
    ],

    // Réalisations réelles (avec vidéos mp4 et photos de chantiers)
    realisations: [
        {
            id: 1,
            title: 'Chantier Pompage Solaire & Test Débit',
            category: 'pompage',
            type: 'video',
            description: 'Essai en direct du débit d’eau à pleine puissance sous rayonnement solaire pour un forage agricole.',
            video: 'assets/videos/WhatsApp Video 2026-09-22 at 17.27.13.mp4',
            thumbnail: 'assets/images/pompe immergée.jpeg',
            badge: 'Vidéo Chantier',
            location: 'Sénégal'
        },
        {
            id: 2,
            title: 'Installation Panneaux & Raccordement Onduleur',
            category: 'solaire',
            type: 'video',
            description: 'Montage sur structure et connexion électrique sécurisée des chaînes photovoltaïques.',
            video: 'assets/videos/WhatsApp Video 2026-09-22 at 17.27.17.mp4',
            thumbnail: 'assets/images/paneau solaire.jpeg',
            badge: 'Vidéo Chantier',
            location: 'Sénégal'
        },
        {
            id: 3,
            title: 'Vérification Contrôleur & Tableau Électrique',
            category: 'electricite',
            type: 'video',
            description: 'Contrôle des paramètres de tension, calibrage des disjoncteurs et réglage du boîtier de commande.',
            video: 'assets/videos/WhatsApp Video 2026-09-22 at 17.27.19.mp4',
            thumbnail: 'assets/images/controller.jpeg',
            badge: 'Vidéo Chantier',
            location: 'Sénégal'
        },
        {
            id: 4,
            title: 'Mise en Service Forage & Pompage Autonome',
            category: 'pompage',
            type: 'video',
            description: 'Immersion de la pompe 90QJD et première sortie d’eau continue sans groupe électrogène.',
            video: 'assets/videos/WhatsApp Video 2026-09-22 at 17.27.27.mp4',
            thumbnail: 'assets/images/pompe solaire.jpeg',
            badge: 'Vidéo Chantier',
            location: 'Sénégal'
        },
        {
            id: 5,
            title: 'Raccordement Armoire & Distribution Électrique',
            category: 'electricite',
            type: 'video',
            description: 'Câblage minutieux des disjoncteurs et répartiteurs Legrand dans un tableau basse tension.',
            video: 'assets/videos/WhatsApp Video 2026-09-22 at 17.27.35.mp4',
            thumbnail: 'assets/images/coffre.jpeg',
            badge: 'Vidéo Chantier',
            location: 'Sénégal'
        },
        {
            id: 6,
            title: 'Mesure & Contrôle Qualité Panneaux Solaires',
            category: 'solaire',
            type: 'video',
            description: 'Vérification de la tension à vide (Voc) et du courant de court-circuit (Isc) sur le champ solaire.',
            video: 'assets/videos/WhatsApp Video 2026-09-22 at 17.27.42.mp4',
            thumbnail: 'assets/images/paneau solaire.jpeg',
            badge: 'Vidéo Chantier',
            location: 'Sénégal'
        },
        {
            id: 7,
            title: 'Test d’Amorçage & Débit Motopompe',
            category: 'pompage',
            type: 'video',
            description: 'Démonstration de puissance et d’aspiration rapide pour le remplissage de bassin maraîcher.',
            video: 'assets/videos/WhatsApp Video 2026-09-22 at 17.27.47.mp4',
            thumbnail: 'assets/images/pompe.jpeg',
            badge: 'Vidéo Chantier',
            location: 'Sénégal'
        },
        {
            id: 8,
            title: 'Centrale Solaire & Batteries Lithium LiFePO4',
            category: 'solaire',
            type: 'image',
            description: 'Installation d’onduleurs hybrides multiples et stockage batteries lithium haute performance.',
            video: '',
            thumbnail: 'assets/images/3.jpeg',
            badge: 'Réalisation Pro',
            location: 'Sénégal'
        },
        {
            id: 9,
            title: 'Câblage d’Armoires Électriques de Distribution',
            category: 'electricite',
            type: 'image',
            description: 'Pose, cheminement et raccordement de gros câbles d’alimentation pour un site industriel.',
            video: '',
            thumbnail: 'assets/images/1.jpeg',
            badge: 'Chantier Réel',
            location: 'Sénégal'
        },
        {
            id: 10,
            title: 'Passages de Gaines & Câblage Mural en Bâtiment',
            category: 'electricite',
            type: 'image',
            description: 'Travaux de saignées, pose de conduits et distribution électrique intérieure par nos équipes.',
            video: '',
            thumbnail: 'assets/images/2.jpeg',
            badge: 'Chantier Réel',
            location: 'Sénégal'
        },
        {
            id: 11,
            title: 'Montage & Câblage Tableau Divisionnaire',
            category: 'electricite',
            type: 'image',
            description: 'Technicien LINK ENERGY effectuant le repérage et la connexion des disjoncteurs divisionnaires.',
            video: '',
            thumbnail: 'assets/images/4.jpeg',
            badge: 'Chantier Réel',
            location: 'Sénégal'
        },
        {
            id: 12,
            title: 'Armoire Électrique Modulaire Legrand',
            category: 'electricite',
            type: 'image',
            description: 'Conception et réalisation d’un coffret électrique conforme aux normes avec protection différentielle.',
            video: '',
            thumbnail: 'assets/images/coffre.jpeg',
            badge: 'Réalisation Pro',
            location: 'Sénégal'
        },
        {
            id: 13,
            title: 'Installation Contrôleur LIKOU & Sécurités',
            category: 'pompage',
            type: 'image',
            description: 'Boîtier de commande étanche avec disjoncteur Schneider pour la protection d’une pompe solaire.',
            video: '',
            thumbnail: 'assets/images/controller.jpeg',
            badge: 'Réalisation Pro',
            location: 'Sénégal'
        }
    ],

    // Labels des catégories
    categoryLabels: {
        all: 'Toutes les réalisations',
        solaire: 'Solaire Photovoltaïque',
        pompage: 'Pompage Solaire',
        electricite: 'Électricité & Coffrets',
        maintenance: 'Maintenance & Tests'
    },

    productCategoryLabels: {
        all: 'Tous les produits',
        solaire: 'Panneaux Solaires',
        pompage: 'Pompes & Forages',
        controleurs: 'Contrôleurs & Coffrets'
    }
};
