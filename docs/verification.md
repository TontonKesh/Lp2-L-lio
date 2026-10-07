# Vérifications

## 6 octobre 2026 · préparation GitHub et Vercel

- Installation reproductible avec `npm ci`, Node.js 22.23.1.
- `npm run validate` réussi : huit tests réussis, sept vidéos Vimeo configurées, zéro URL invalide et compilation Vite réussie. L’URL facultative du widget iClosed reste vide.
- Compilation de production servie temporairement sur `http://127.0.0.1:4197/call-booke?source=deployment-check` : HTTP 200, contenu de la landing présent.
- Seize ressources contrôlées en HTTP : JavaScript et CSS compilés, favicon, trois polices, hero, portrait, WhatsApp et sept couvertures vidéo. HTTP 200 pour chaque ressource, sans réponse HTML à la place d’un fichier.
- `dist/` ne contient ni `docs/` ni `tests/`. `node_modules/`, `dist/`, `.env*` et `.vercel/` sont exclus de Git.
- `vercel.json` configure `/call-booke` vers `/index.html`, la redirection de `/` vers `/call-booke` et la suppression de la barre finale, selon la documentation Vercel. Les règles ont été relues ; Vite preview n’exécute pas les redirections Vercel.
- Publication GitHub, exécution GitHub Actions et déploiement Vercel non effectués pendant cette préparation. Le domaine public et les redirections doivent être vérifiés après import. Aucun nouveau contrôle de lecture Vimeo ou de réservation iClosed effectué pendant cette passe.

## Historique · 22 septembre 2026 · adaptation LP2

Contrôles effectués sur la compilation de production, servie à `http://127.0.0.1:4186/`, dans le navigateur intégré de Codex. Le brief Word a été extrait et rendu sur deux pages avant l’adaptation.

## Parcours et contenu

- Une seule page, cinq sections numérotées : bienvenue, présentation, méthode, questions, confirmation.
- Les trois vidéos principales affichent les formats prévus du brief : 1 minute, environ 4 minutes et environ 20 minutes. Six emplacements FAQ complètent les neuf entrées configurables.
- Fond beige pierre, texte gris foncé, bleu dans les images et les accents. Hero et principaux titres centrés.
- Logo WhatsApp local, vérifié dans le DOM : aucun ancêtre lien ou bouton. La consigne indique d’écrire dans son groupe et de prévoir une heure dans un endroit calme.
- Bonus transformations présent, avec une mention explicite d’attente. Aucun faux résultat ni photographie de client générée.

## Responsive et composition

| Format CSS | Débordement horizontal | Écart à l’axe central* | Espace signature / flèche |
| --- | --- | --- | --- |
| 320 × 740 | 0 px | 0 px | 74 px |
| 390 × 844 | 0 px | 0 px | 75 px |
| 768 × 1024 | 0 px | 0 px | 41 px |
| 848 × 900 | 0 px | 0 px | 41 px |
| 1024 × 768 | 0 px | 0 px | 59 px |
| 1280 × 720 | 0 px | 0 px | 41 px |
| 1470 × 835 | 0 px | 0 px | 41 px |

*Hero, introduction de bienvenue, présentation, méthode et invitation WhatsApp. Valeurs arrondies au pixel. H1 sur deux lignes, trois cadres au ratio 16:9 (ratio mesuré 1,7778), cinq cellules de navigation sans dépassement. Captures inspectées sur ordinateur, mobile 390 px et petit mobile 320 px.

Le hero possède une hauteur de contenu naturelle : la flèche ne chevauche plus la signature sur les grands titres. La sculpture se fond progressivement dans le beige, y compris sur téléphone. La ponctuation interrogative reste attachée au dernier mot dans la FAQ.

## Mouvement et navigation

- Ancres natives testées ; chapitre actif observé sur les étapes 01, 02, 03 et 05.
- Navigation sticky à partir de 700 px, en flux normal sur téléphone. Quand la ligne de lecture dépasse la cinquième étape, la barre se retire ; un scroll inverse la réaffiche sur l’étape 05.
- Saut rapide jusqu’en bas : zéro bloc restant dans l’état d’attente, zéro animation active après stabilisation, aucune image cassée.
- Les quatre motifs de transition sont des apparitions uniques. La profondeur de sculpture et le scale du paysage restent gérés par le système existant, avec positions mesurées hors du défilement et une frame partagée par événement.
- Mouvement réduit activé en direct puis au rechargement : zéro bloc invisible, zéro animation active, `scroll-behavior: auto`, paysage sans transform.
- La suspension quand l’onglet devient masqué est conservée dans le code. La transition réelle de visibilité d’onglet n’a pas été retestée pendant cette adaptation.

## Interactions et version statique

- Menu mobile : cinq liens, ouverture, Échap avec retour de focus, fermeture après sélection du chapitre Questions.
- FAQ native : ouverture avec Entrée, ouverture de la deuxième au clic et fermeture automatique de la première.
- Checklist : trois cases cochées et statut « 3 sur 3 · Ta préparation est terminée. » affiché. Aucun envoi ni validation externe de réservation.
- JavaScript désactivé via émulation navigateur : cinq sections visibles, zéro bloc masqué, menu amélioré retiré, statut « Les trois points à préparer. ». Ancre et ouverture d’une FAQ testées par interaction native.
- Préférences temporaires et dimensions restaurées après les contrôles.

## Compilation et ressources

- `node --check main.js`, `node --check motion.js`, `node --check media.config.js` : réussis.
- `npm run build` : réussi ; JavaScript 7,98 kB (3,13 kB gzip), CSS 32,88 kB (7,26 kB gzip).
- Onze ressources de production contrôlées : HTTP 200, types MIME corrects, dont les trois polices locales et le SVG WhatsApp.
- Console : aucune erreur ni alerte capturée sur la dernière compilation.

## Contenu restant à fournir

Les neuf vidéos et les véritables photos avant / après ne sont pas disponibles. Les lecteurs réels et les médias de résultat ne peuvent donc pas encore être validés. Leur configuration est préparée dans `media.config.js` ; la page affiche les états d’attente correspondants. Aucun lien de groupe n’est attendu : l’utilisateur a demandé uniquement le logo WhatsApp et une instruction.


## Passe suivante : préparation Wistia et iClosed

- `media.config.js` contient neuf entrées Wistia avec `src` vide. `integrations.config.js` prépare la couleur, le réglage de suivi et l’URL du récapitulatif iClosed.
- `npm test` : cinq groupes de tests réussis, couvrant les formats Wistia, les URL trompeuses, les protocoles et identifiants invalides, la suppression des paramètres personnels dans les liens vidéo et l’hôte iClosed autorisé.
- `npm run check:integrations` : dix champs en attente, zéro valeur invalide. Le mode `--require-complete` échoue volontairement tant que ces champs manquent.
- Production avec configuration vide : zéro iframe, zéro script de fournisseur, aucun faux bouton de lecture, récapitulatif iClosed masqué. Le reste de la LP reste inchangé.
- Fixture de développement séparée : zéro requête de fournisseur avant interaction ; clic vidéo = création d’une iframe Wistia officielle avec un titre accessible et `referrerPolicy: no-referrer`. Ratio mesuré 1,7778.
- FAQ : une iframe après le clic ; aucune iframe ni lien de secours après fermeture, bouton restauré. Retirer l’iframe arrête le contexte de lecture.
- Limite réelle du test Wistia : le navigateur intégré bloque la requête `fast.wistia.net` avec `net::ERR_BLOCKED_BY_CLIENT`. La lecture du média n’a donc pas été validée. Le message de secours apparaît après le délai prévu ; le lien d’ouverture directe reste disponible.
- Panne iClosed simulée par blocage temporaire de son script dans les outils développeur : texte d’indisponibilité affiché, zone vide retirée, bouton Réessayer fonctionnel et aucun script en double. Ce test ne crée aucun rendez-vous.
- Format 390 × 844 : lecteur à 16:9, zéro débordement, message de secours lisible. Les dimensions et le blocage réseau temporaire sont restaurés après les essais.
- La vidéo publique de démonstration et l’URL fictive de la fixture sont exclues de `dist/`. Le widget réel et le retour de réservation attendent le code du compte iClosed et le domaine public.


## 24 septembre 2026 · questions en cartes vidéo

La demande remplace les accordéons par la grille de six réponses de la capture Thibaut. La page conserve les couleurs pierre/bleu, les questions Laelius dans le même ordre, les cinq étapes et le logo WhatsApp sans CTA individuel. Les cartes remplacent les textes de réponse provisoires.

- Grille centrée, largeur maximale 1 080 px ; trois colonnes à partir de 1 024 px, deux entre 640 et 1 023 px, une en dessous de 640 px.
- Vérification navigateur à 320, 390, 768, 848, 1 024 et 1 440 px : six cartes, aucune balise `details`, aucun débordement horizontal, titres contenus, cadres alignés et ratio 16:9.
- Captures relues : section sur téléphone et page complète sur ordinateur. Les six cartes restent visibles sans JavaScript ; mouvement réduit vérifié, aucune image cassée constatée.
- La page de test séparée utilise la vidéo publique de la documentation Wistia : lecture affichée dans Chrome, passage entre deux cartes au clic puis avec Entrée, une seule iframe FAQ présente. La couverture et le bouton de la carte précédente sont restaurés, son lecteur et son lien de secours retirés.
- Les vrais identifiants Laelius restent vides. La démonstration ne valide pas ces futures vidéos ni une réservation iClosed réelle.
- Les cinq tests de validation des URL et le contrôle de configuration passent. La section conserve six états « réponse vidéo à venir » tant que les liens ne sont pas fournis.

Les observations d’accordéons dans les passes du 22 septembre ci-dessus décrivent la version précédente ; elles sont remplacées par cette vérification de la grille.

## 24 septembre 2026 · barre supprimée et mouvement simplifié

La barre des cinq étapes montrée dans la capture a été retirée du HTML, avec ses styles et son suivi JavaScript. Les cinq sections et les liens du menu restent en place. Les observations précédentes sur la navigation sticky décrivent l’ancienne version.

- Défilement JavaScript remplacé par un `IntersectionObserver` pour les entrées uniques. Titres et cartes : 16 px / 560 ms sur ordinateur, 8 px / 380 ms sur tactile ; cartes décalées de 55 ms sur ordinateur seulement. Les petits traits des colonnes se dessinent à leur arrivée.
- Effets continus via CSS natif sur ordinateur uniquement : lignes de section, sculpture et paysage. Dans Chromium, le paysage a été mesuré à `scale(.983435)` puis `scale(1)` pendant le scroll. Dans le profil iPhone WebKit, il reste sans transformation aux deux positions.
- Compilation Vite réussie : JS 12,30 kB (4,64 kB gzip), CSS 31,86 kB (7,20 kB gzip). Les cinq tests existants passent.
- Contrôles sur le serveur local `http://127.0.0.1:5186/` avec Chromium et WebKit, profil iPhone 13. Absence de débordement à 320, 375, 390, 430, 768, 1024 et 1440 px.
- État intermédiaire d’une entrée réellement capturé dans les deux moteurs, puis opacité finale 1 ; aucun redémarrage lors du second passage. Scroll rapide jusqu’à la confirmation puis remontée et parcours complet : aucun bloc restant masqué après lecture.
- CTA de démarrage, ancre directe méthode, ouverture/fermeture du menu mobile et trois cases de checklist vérifiés. Le focus clavier montre immédiatement la checklist, sans animation en attente.
- Mouvement réduit activé en direct puis au rechargement : aucun bloc en attente, aucune animation active. Sans JavaScript : tous les blocs de lecture visibles.
- Aucune erreur JavaScript capturée. Captures relues sur ordinateur (bienvenue) et iPhone (hero, méthode, questions).
- Limite : émulation WebKit, pas de mesure de fluidité sur un iPhone physique. Aucun déploiement ni nouvelle validation des fournisseurs vidéo ou de réservation.

## 24 septembre 2026 · parcours orienté confirmation

- Objectif conservé : préparation après réservation puis message de présence dans le groupe WhatsApp. Aucune nouvelle réservation ni transmission depuis cette page.
- Hero plus court, action principale « Préparer mon appel », raccourci vers la consigne WhatsApp, quatre liens vers l’étape suivante. Les cinq sections et les six cartes FAQ sont conservées. Texte, espacements et introductions desktop resserrés.
- Consigne finale explicite et exemple de message sélectionnable, sans bouton d’envoi ni lien de groupe. Le bloc transformations reste masqué tant qu’aucune paire valide n’est configurée.
- Mesures sur les mêmes profils avant/après : hauteur totale desktop 1440 × 900 de 7 210 à 5 241 px (−27,3 %) ; profil iPhone 13 de 6 640 à 5 767 px (−13,1 %). Hero : 830 → 717 px sur ordinateur, 690 → 577 px sur iPhone. Ces mesures décrivent le parcours, pas une hausse de conversion.
- Chromium et WebKit avec profil iPhone : tous les liens internes trouvent leur cible ; CTA principal, raccourci de confirmation, quatre liens de suite, menu mobile et checklist vérifiés par interaction.
- Largeurs 320, 375, 390, 430, 768, 900, 1024 et 1440 px : zéro débordement horizontal, aucune image cassée, bouton principal entièrement au-dessus du pli. À 320 × 568, bas du bouton à 427 px.
- Scroll complet : aucune entrée restant masquée après lecture. Ancre directe de confirmation, mouvement réduit activé en direct puis au rechargement et lecture sans JavaScript vérifiés. Aucune erreur JavaScript capturée.
- Galerie conditionnelle vérifiée avec une paire de photos locale injectée uniquement dans le navigateur de test : la section s’affiche ; configuration réelle vide dans un contexte propre : elle reste masquée. Aucune photographie de test ajoutée au site.
- Captures relues sur ordinateur et iPhone : hero, bienvenue, confirmation. Émulation uniquement, aucun test matériel iPhone.
- Build Vite réussi, cinq tests existants réussis. JS 12,10 kB (4,57 kB gzip), CSS 36,02 kB (7,92 kB gzip).
- Les neuf sources vidéo et le widget iClosed restent vides. Aucun gain de conversion, message WhatsApp reçu ou taux de présence ne peut être déduit de ces contrôles locaux.

## 24 septembre 2026 · nuances de soleil

- Fond doré continu ajouté en CSS, alternant gauche / centre / droite jusqu’au footer. Captures relues dans Chromium et WebKit avec profil iPhone : hero, méthode, questions, confirmation et vue d’ensemble desktop.
- Les gradients sont effectivement rendus dans les deux moteurs. Les fonds des sections laissent passer la lumière sans conteneur supplémentaire ni superposition interceptant les clics.
- Hauteurs inchangées : 5 241 px sur desktop 1440 × 900 et 5 767 px dans le profil iPhone 13. Zéro débordement aux largeurs 320, 390, 430, 768, 1024 et 1440 px.
- Raccourci de confirmation et menu mobile vérifiés. Mouvement réduit : lumière toujours visible, aucune animation active. Aucune erreur JavaScript capturée.
- Texte secondaire foncé : contraste théorique au centre le plus coloré de 4,56:1 sur desktop et 4,73:1 sur mobile, calculé pour l’or à son opacité maximale sur le fond crème. Ce calcul ne constitue pas un audit complet de tous les éléments.
- Build Vite réussi. CSS 37,34 kB (8,25 kB gzip), JavaScript inchangé à 12,10 kB (4,57 kB gzip). Aucun fichier image ni bibliothèque ajouté.

## 24 septembre 2026 · continuité de la lumière

Cette passe remplace les cycles de lumière décrits ci-dessus par une composition non répétée sur la hauteur totale du document.

- Chromium desktop et WebKit avec profil iPhone : rendu confirmé avec `background-repeat: no-repeat` et `background-size: 100% 100%` sur toutes les couches. Lavis de tailles et d’intensités différentes, raccord du hero adouci et fonds de confirmation / footer transparents.
- Captures desktop et iPhone relues : vue d’ensemble, hero, questions. Les autres sections ont également été capturées pendant le parcours complet.
- Hauteurs conservées (5 241 / 5 767 px), aucun débordement aux largeurs 320, 390, 430, 768, 1024 et 1440 px. Raccourci de confirmation, menu mobile et mouvement réduit vérifiés. Aucune erreur JavaScript.
- Build réussi ; CSS 37,34 kB (8,36 kB gzip), JavaScript inchangé. Aucun test matériel iPhone.


## 5 octobre 2026 · vidéos Vimeo fournies

- Méthode Aufstieg et six réponses FAQ reliées aux sept identifiants fournis. Titres HTML, labels accessibles et configuration alignés sur la numérotation 1 à 6, y compris les nouvelles questions alimentation / connaissances.
- Lecteur chargé au clic ; aucune requête Vimeo ou Wistia avant interaction. Les permissions iframe et la politique de referrer Vimeo reprennent le code fourni. Les paramètres des liens de réservation ne sont pas transmis aux vidéos.
- Passage entre les six cartes vérifié dans Chromium : une seule iframe FAQ, cinq couvertures disponibles et un seul lien de secours. Passage par Entrée vérifié dans WebKit avec profil iPhone 13. Les lecteurs Vimeo et Wistia utilisent maintenant le même comportement de couverture et de remplacement.
- Chromium aux largeurs 320, 390, 768, 1024 et 1440 px : six cartes, grille de une / deux / trois colonnes, aucun débordement horizontal. Lecteurs au ratio 16:9, y compris sur mobile. WebKit avec profil iPhone 13 : aucun débordement avant et après ouverture d’un lecteur. Captures desktop, méthode et iPhone relues ; émulation uniquement.
- Sans JavaScript : sept liens Vimeo directs disponibles sur les couvertures, aucune iframe et aucune mention de réponse FAQ à venir.
- `npm test` : huit groupes réussis, dont les formats Vimeo, les hôtes trompeurs, les sources invalides et la conservation du hash vidéo sans paramètres personnels. `npm run check:integrations` : sept Vimeo configurés, trois champs en attente (bienvenue, présentation, iClosed), zéro valeur invalide.
- `npm run build` réussi : JS 13,43 kB (4,97 kB gzip), CSS 37,34 kB (8,36 kB gzip). Aperçu de production à `http://127.0.0.1:4186/#questions` contrôlé à 390 px : sept boutons de lecture, titres corrects, aucun débordement ni erreur JavaScript. Les essais Chromium / WebKit n’ont remonté aucune erreur JavaScript.

### Limite de lecture observée avant correction Vimeo

Le test réel, sans session Vimeo, à `http://127.0.0.1:5186/` ne permet pas de lire les médias : la méthode demande une connexion Vimeo et les six réponses indiquent une restriction de confidentialité. Les iframes sont bien créées avec les bons identifiants ; la lecture effective n’est donc pas validée.

Pour les réponses, la [documentation Vimeo sur les erreurs du lecteur](https://help.vimeo.com/hc/fr/articles/12425812280081-D%C3%A9panner-les-messages-d-erreur-du-player) associe ce refus aux restrictions d’intégration par domaine. Vérifier les réglages « Où cette vidéo peut-elle être intégrée ? » et retester sur le domaine de publication. Cette vérification locale ne démontre pas que le futur domaine public est refusé. Aucun réglage de confidentialité Vimeo ni déploiement n’a été effectué.


## 5 octobre 2026 · accès Vimeo corrigé et lecture réelle

La restriction décrite ci-dessus a été résolue dans le compte Vimeo connecté, à la demande de l’utilisateur. Les sept vidéos étaient en mode Privé. Elles sont maintenant en mode Public, intégrables n’importe où ; les téléchargements des fichiers originaux sont désactivés. Les modes Non répertorié et Intégrable uniquement nécessitent une mise à niveau sur cet abonnement ; aucun abonnement ni achat n’a été effectué.

La bibliothèque Vimeo confirme le statut Public des sept identifiants, après la modification groupée. Preuve : `docs/vimeo-public.jpg`.

Les sept lecteurs ont été ouverts sur l’aperçu de production `http://127.0.0.1:4186/`, dans le navigateur intégré sans session Vimeo. La méthode et toutes les réponses chargent un vrai élément vidéo, avec `readyState: 4`, une durée valide et une progression de lecture supérieure à zéro. La deuxième réponse était en pause au moment de la mesure après 5,83 secondes de lecture ; son contrôle Pause avait été observé pendant la lecture. Les autres mesures ont été prises pendant la lecture. Les valeurs sont conservées dans `docs/vimeo-playback.json` ; captures : `docs/vimeo-method-playing.jpg` et `docs/vimeo-faq-playing.jpg`.

Durées observées : méthode 9 min 09 ; FAQ 1 environ 26 s, FAQ 2 38 s, FAQ 3 19 s, FAQ 4 27 s, FAQ 5 26 s, FAQ 6 24 s. La durée affichée sous la méthode a été corrigée pour remplacer l’ancien format prévu de 20 minutes.

Cette passe confirme la lecture réelle des sept médias sur le site local. Elle ne constitue pas un déploiement sur un domaine public. Les vidéos de bienvenue et de présentation restent à fournir.


## 5 octobre 2026 · couvertures propres à chaque vidéo

Les sept images d’attente ont été remplacées par les vignettes officielles affichées au début des lecteurs Vimeo, récupérées depuis les lecteurs des sept médias. Elles sont auto-hébergées au format WebP dans `public/assets/video-posters/` : six images 1280 × 720 et la méthode 1280 × 680. La méthode montre sa première diapositive ; les titres décoratifs superposés ont été retirés et l’image entière est conservée avec `object-fit: contain`.

Le build Vite passe. Sur l’aperçu de production, les sept images ont été vérifiées comme chargées, avec une source différente pour chaque vidéo ; aucun débordement sur ordinateur ni à 390 × 844 px, où les six réponses restent sur une colonne. Captures relues : `docs/video-posters-desktop.jpg` et `docs/video-posters-mobile.jpg`. Les dimensions de test ont été restaurées.

## 5 octobre 2026 · textes et prénom Lélio

Les textes demandés ont été appliqués : « mais pas confirmé » dans le titre d’ouverture, découverte de la méthode et de l’histoire personnelle, origine de la méthode à travers le parcours, consigne de regarder toutes les vidéos, invitation à écrire dans le groupe WhatsApp et exemple « Yo Lélio, j’ai bien regardé les vidéos ». Les trois parties sont désormais « I. Mon histoire personnelle », « II. Ma méthode » et « III. L’accompagnement ».

Le prénom affiché, les métadonnées et les libellés accessibles des lecteurs sont remplacés par Lélio. Aucune occurrence de l’ancien prénom dans ces fichiers ni dans le build. « Aufstieg » et « réservé » ont la même couleur calculée `rgb(29, 101, 134)`.

Build Vite réussi. Aperçu local vérifié sur ordinateur et à 390 × 844 px : aucun débordement horizontal ; bouton principal entièrement visible sur mobile (bas à 463 px) ; aucun débordement dans les trois libellés de méthode ; les sept couvertures vidéo sont conservées. Captures relues : `docs/lelio-copy-desktop.jpg`, `docs/lelio-copy-mobile.jpg`, `docs/lelio-method-desktop.jpg` et `docs/lelio-method-mobile.jpg`. Les dimensions du navigateur ont été restaurées. Cette passe reste locale.

## 5 octobre 2026 · parcours resserré et lecteurs visibles à l’arrêt

Les deux sections montrées dans les captures (bienvenue et histoire personnelle) ont été retirées du HTML, du menu, des styles et de la configuration vidéo. Le parcours comprend désormais la méthode, les six réponses, puis la confirmation WhatsApp. L’identité crème `#f3eddf`, bleu `#1d6586`, Cormorant et DM Sans est conservée. Le titre principal et les trois titres de section tiennent sur une ligne à partir de 768 px ; le titre principal prend deux lignes sur téléphone. Trois flèches de 44 px, centrées, partagent une marge de 16 px de part et d’autre. Le début du lecteur principal apparaît dans le premier écran.

Les sept iframes Vimeo restent montées, y compris en pause, avec `autoplay=0` et `autopause=1`. Les six réponses disposent d’un bouton « Lire la vidéo » visible en pause. Le SDK officiel est chargé une fois ; les contrôles natifs restent utilisables en cas d’échec de ce script. Le passage à une autre vidéo conserve les sept lecteurs.

Contrôle de la version compilée aux largeurs 320, 390, 768, 848, 1024 et 1440 px : zéro débordement, sept cadres 16:9, flèches exactement centrées et grille FAQ 1 / 2 / 3 colonnes. Les six boutons tiennent entièrement dans leurs cadres aux six largeurs. Menu ouvert au clavier, Tab vers le premier lien, Escape avec retour du focus, clic hors menu et trois flèches vers leurs cibles vérifiés. La checklist passe à 3 sur 3 et a été réinitialisée.

Les sept médias ont une durée valide, `readyState: 4` et une progression positive après interaction. La méthode s’est mise en pause au lancement d’une réponse. Les boutons personnalisés ont été testés par Entrée puis par clic ; ils disparaissent pendant la lecture, reviennent en pause et suivent la pause automatique lors du passage à la réponse suivante. Aucun lecteur n’a été retiré. Aucune erreur JavaScript capturée.

Build réussi : CSS 21,74 kB (5,57 kB gzip), JS du site 15,32 kB (5,34 kB gzip), auxquels s’ajoutent les ressources externes Vimeo. Les huit tests URL passent ; sept vidéos configurées, zéro URL invalide, seul le widget iClosed optionnel reste à renseigner. Route racine et seize ressources locales : réponses 200, sans ancre ni label absent.

Preuves et captures de cette passe hors du projet : `/Users/aleksipontoizeau/.codex/visualizations/2026/10/05/01a10d67-831c-70b1-8af8-0d3058334ebe/laelius-polish/` (`responsive.json`, `controls.json`, `playback.json`, captures complètes et ouvertures ordinateur / téléphone). Les lecteurs ont été remis au début pour les captures finales. Les dimensions temporaires du navigateur sont restaurées à la fin. Les serveurs locaux déjà ouverts sont conservés pour l’aperçu ; aucun déploiement public effectué.

## 6 octobre 2026 · typographie et compréhension du parcours

Les deux lignes du hero partagent exactement la famille Cormorant, la taille, l’interligne et l’approche. « réservé » et « confirmé » reprennent le même italique bleu. Tailles calculées aux six largeurs : 44 / 46,8 / 64 / 64 / 65,536 / 92 px. Le hero prend trois lignes sur téléphone et deux sur ordinateur ; le premier lecteur commence entre 565 et 650 px du haut, selon la largeur. Les titres des réponses passent en Cormorant à 24–25 px. Les consignes sont en DM Sans à 15–16 px ; les petits textes, numéros, durées et checklist sont agrandis.

Le parcours reste méthode → six réponses → WhatsApp, avec les mêmes sept lecteurs et trois flèches. Les repères indiquent explicitement « ÉTAPE 01 / 03 », « ÉTAPE 02 / 03 » et « ÉTAPE 03 / 03 ». L’exemple de message précise la confirmation de présence. Un bouton permet de copier ce message et affiche une confirmation après résolution de l’API ; en cas de refus, il sélectionne le texte pour une copie manuelle. Le bouton a été cliqué et le retour visible vérifié. Le presse-papiers virtuel de l’outil de navigateur étant distinct de celui de la page, le collage effectif dans WhatsApp n’a pas été vérifié ; aucun message envoyé.

Contrôles sur `/call-booke` à 320, 390, 768, 848, 1024 et 1440 px : aucun débordement horizontal, polices et tailles des deux lignes identiques, sept iframes visibles au ratio 16:9, grille 1 / 2 / 3 colonnes, trois flèches de 44 px centrées sans décalage. Toutes les images locales sont chargées après parcours de la page. Les trois flèches et le menu mobile (Tab, Escape, retour du focus) sont vérifiés. Aucun nouveau message d’erreur JavaScript capturé. Captures complètes ordinateur et téléphone relues ; dimensions temporaires restaurées.

Build Vite réussi (CSS 22,07 kB / 5,58 kB gzip, JS 15,88 kB / 5,52 kB gzip). Huit tests existants passent. Sept Vimeo configurés, zéro URL invalide ; récapitulatif iClosed optionnel toujours en attente de son URL. Le serveur de développement déjà ouvert à `http://127.0.0.1:5186/call-booke` est conservé. Aucun serveur temporaire supplémentaire ni déploiement public. Captures et mesures hors du projet : `/Users/aleksipontoizeau/.codex/visualizations/2026/10/05/01a10d67-831c-70b1-8af8-0d3058334ebe/laelius-typography/`.

### Suppression du bouton de lecture superposé

À la demande de l’utilisateur, le bouton bleu « Lire la vidéo » ajouté par le site est supprimé des six réponses. Le code de création du bouton, ses styles et le chargement du SDK sont retirés. Les sept iframes restent affichées ; la lecture repose sur les commandes natives Vimeo.

Vérification ordinateur et 390 px : sept lecteurs, aucun bouton `.video-play`, aucun chargement du SDK depuis le site, aucun débordement ou message d’erreur JavaScript capturé. Lecture native de la deuxième réponse observée à 7,33 secondes avec `readyState: 4` ; la première réponse s’est mise en pause au lancement de la deuxième. Build réussi (CSS 21,50 kB / 5,48 kB gzip, JS 14,72 kB / 5,28 kB gzip), `git diff --check` sans erreur. Captures : `native-controls-desktop.png` et `native-controls-mobile.png`, dans le dossier de preuves de cette passe. Contrôle local, sans déploiement.
