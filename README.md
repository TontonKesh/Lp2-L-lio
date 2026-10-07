# Lélio · Aufstieg

Landing de préparation après réservation, en français, adaptée au brief « Sheet Lp2 Lélio » : trois étapes sur un fond beige pierre. HTML sémantique, CSS et JavaScript léger ; Vite assure le développement et la compilation. Sur Vercel, la page est accessible à `/call-booke` et la racine `/` redirige vers ce chemin.

## Publier sur GitHub et Vercel

Le dépôt est préparé pour la branche `main`. Publier ce dossier sur GitHub (dépôt privé pour la livraison client), puis importer le dépôt dans Vercel. Le fichier `vercel.json` définit les réglages :

| Réglage | Valeur |
| --- | --- |
| Framework | Vite |
| Dossier racine | `.` (ce dossier) |
| Installation | `npm ci` |
| Compilation | `npm run build` |
| Sortie | `dist` |
| Node.js | `22.x` |
| Variables d’environnement | Aucune requise actuellement |

Choisir le nom du projet Vercel pour obtenir le sous-domaine souhaité, sous réserve de disponibilité. Exemple : le nom `nnnn` vise `https://nnnn.vercel.app/call-booke`. Le domaine définitif est celui affiché par Vercel après le déploiement ; `nnnn` est un exemple, pas un domaine réservé.

La réécriture sert la landing à `/call-booke` sans changer l’adresse affichée. `/` redirige vers `/call-booke`, et la barre finale est retirée. Les ressources restent servies à `/assets/` et `/fonts/`. Configuration conforme à la [documentation Vercel](https://vercel.com/docs/project-configuration/vercel-json).

Dans iClosed, utiliser l’URL définitive avec `/call-booke` comme redirection après réservation et conserver les paramètres fournis par iClosed. Le widget de récapitulatif reste facultatif tant que son URL n’est pas renseignée dans `integrations.config.js`.

Après déploiement, vérifier l’accès direct et le rechargement de `/call-booke`, la redirection depuis `/`, les images, les polices et la lecture des sept vidéos Vimeo sans connexion. Si Vimeo limite les domaines d’intégration, ajouter le domaine Vercel définitif. L’accès au dépôt GitHub privé et l’accès public au site sont deux réglages distincts.

`node_modules/`, `dist/`, les fichiers `.env*` et `.vercel/` sont exclus de Git. Ne pas téléverser `dist/` sur GitHub : Vercel le compile à partir des sources. GitHub Actions exécute les tests, la validation des intégrations et la compilation sur les pull requests et les envois sur `main`.

## Développement local

Utiliser Node.js 22.12 ou plus récent dans la branche 22 (voir `.nvmrc`).

```sh
npm ci
npm run dev
```

Développement : http://127.0.0.1:5186/

```sh
npm run build
npm run preview
```

Prévisualisation de production : http://127.0.0.1:4186/call-booke. Le dossier `dist/` contient le site statique. Vite sert également la page à ce chemin en local ; les redirections de `vercel.json` sont appliquées par Vercel.

```sh
npm run validate
```

## Intégrations vidéo et iClosed

La méthode Aufstieg et les six réponses FAQ sont configurées avec les sept vidéos Vimeo fournies, dans `media.config.js`. Les titres et l’ordre des réponses correspondent aux vidéos. Les deux anciennes sections de bienvenue et de présentation ont été retirées. Les sept lecteurs officiels sont affichés dès le chargement, avec leur aperçu à l’arrêt et sans lecture automatique. La lecture utilise uniquement les commandes natives Vimeo, sans bouton superposé par le site ni chargement du SDK. Vimeo est configuré pour mettre la vidéo précédente en pause quand une autre démarre. Les six cartes restent visibles en grille. Pour ajouter une vidéo, utiliser `type: 'vimeo'` ou `type: 'wistia'` et renseigner `src` avec un identifiant ou une URL officielle.

`integrations.config.js` contient la couleur du lecteur, le réglage de suivi Wistia et l’URL du widget de confirmation iClosed. Le récapitulatif iClosed est masqué par défaut. La redirection après réservation se configure dans le compte iClosed, une fois le domaine public disponible.

Le [guide d’intégration](docs/integrations.md) décrit les champs à remplir, la récupération du code iClosed et les vérifications finales. Aucune clé API requise.

```sh
npm run check:integrations
npm test
```

L’étape 3 affiche le logo WhatsApp, la consigne d’écrire dans son propre groupe et un exemple de message sélectionnable. Le bouton « Copier le message » utilise le presse-papiers ; si le navigateur refuse, le texte est sélectionné pour une copie manuelle. Le visiteur colle et envoie lui-même le message dans son groupe. Trois flèches centrales de 44 px guident la lecture depuis le hero, avec une marge identique de 16 px avant et après chaque flèche. La checklist rappelle le message, une heure disponible et un endroit calme ; elle ne confirme pas une réservation.

Les deux lignes du hero utilisent Cormorant à la même taille : de 44 à 60 px sur téléphone, de 64 à 92 px sur ordinateur. « réservé » et « confirmé » partagent le même italique bleu. Les titres de réponse utilisent aussi Cormorant, à 24–25 px ; les consignes utilisent DM Sans à 15–16 px. Les trois étapes sont explicitement numérotées 01 / 03, 02 / 03 et 03 / 03.

## Ajouter les transformations

Le tableau `transformations` de `media.config.js` attend de vraies paires de photos autorisées : `{ before: "/assets/avant.jpg", after: "/assets/apres.jpg", caption: "…" }`. Il est vide par défaut : la section est masquée jusqu’à l’ajout d’au moins une paire valide. Aucun exemple client inventé.

## Éditer

- Texte et structure : `index.html`.
- Palette, typographie et responsive : `style.css`.
- Menu mobile, checklist et galerie : `main.js`.
- Lecteurs Vimeo et Wistia, widget iClosed et validation des URL : `integrations/`.
- Configuration : `media.config.js` et `integrations.config.js`.
- Entrées légères au défilement : `motion.js` ; effets CSS de scroll desktop et micro-interactions : `motion.css`.
- Storyboard et contrats du système de mouvement : `docs/motion-system.md`.
- Images locales : `public/assets/`.
- Brief LP2 et décisions : `docs/lp2-direction.md`.
- Sources, direction et limites : `docs/art-direction.md`.
- Prompts des deux images originales générées avec imagegen : `docs/image-prompts.md`.

Le texte, les six cartes vidéo et les ancres restent accessibles sans JavaScript ; les sept vidéos fournies proposent alors un lien de lecture direct. Les polices sont auto-hébergées. Aucun fournisseur externe n’est chargé avec les champs vides. Une fois les intégrations renseignées, leur fonctionnement est décrit dans `docs/integrations.md`. `noindex` est volontaire pour cette page après réservation.

## Validation

Build Vite, huit tests et vérification Chromium / WebKit avec profil iPhone ; huit largeurs de 320 à 1440 px, entrées au défilement, ancres, mouvement réduit, version sans JavaScript, menu, navigation clavier et checklist. La barre intermédiaire des cinq étapes a été supprimée. Voir `docs/verification.md` pour les résultats et les limites de l’émulation.
