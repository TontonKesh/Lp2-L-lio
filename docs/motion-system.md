# Laelius · composition et mouvement

Défilement natif, amplitudes courtes et une seule entrée par contenu. La barre de navigation des cinq étapes a été supprimée ; les sections restent accessibles depuis le menu et les liens de la page. Les scènes méditerranéennes et la typographie restent au premier plan. La passe de conversion du 24 septembre remplace les grandes transitions décoratives par des liens vers la suite et exclut les sections masquées des animations d’entrée.

## Mouvement

| Élément | Comportement | Desktop | iPhone et écrans tactiles |
| --- | --- | --- | --- |
| Ouverture | Entrée unique du titre, texte, bouton et signature | 280–560 ms, décalages jusqu’à 270 ms | 380 ms maximum, décalages divisés par deux |
| Titres, médias et checklist | Apparition quand le haut du bloc atteint 95 % de l’écran | Opacité et translation de 16 px, 560 ms | 8 px, 380 ms |
| Questions et trois repères de méthode | Même entrée, légèrement décalée dans chaque rangée | 55 ms entre cartes, 110 ms maximum | Aucun décalage entre cartes |
| Liens vers l’étape suivante | Apparition unique avec les autres blocs ; flèche au survol | 16 px / 560 ms, survol 180 ms | 8 px / 380 ms, retour tactile |
| Lignes sous les en-têtes de section | S’allongent avec la progression du défilement | CSS natif, uniquement si supporté | Lignes statiques |
| Paysage Aufstieg | Se pose légèrement dans la page à son arrivée | Scale .98 → 1 et translation 12 → 0 px | Taille et position fixes |
| Sculpture | Décalage vertical pendant la sortie du hero | 0 → 20 px | Image statique |
| Boutons, liens et cases | Retour visuel au survol ou à la pression | 180 ms ; survol limité à une souris précise | Retour tactile uniquement |

Les entrées utilisent `cubic-bezier(.22,1,.36,1)`. Les effets directement liés au scroll sont linéaires pour suivre le geste. Aucun contenu n’est épinglé, aucun défilement n’est intercepté.

## Contrat technique

- `motion.js` utilise un seul `IntersectionObserver`. Chaque élément est désobservé après sa première entrée. Aucune boucle JavaScript ni gestionnaire de scroll ou de resize n’est nécessaire.
- Les entrées utilisent la Web Animations API, uniquement sur `opacity` et `transform`. Leur état final existe déjà dans le DOM ; les animations terminées sont annulées pour libérer leurs couches.
- `motion.css` gère les effets continus avec `animation-timeline` et `animation-range`, derrière un test `@supports`, uniquement à partir de 900 px avec un pointeur précis.
- Les navigateurs sans scroll timelines conservent les entrées simples et les éléments décoratifs statiques. Les écrans tactiles suivent ce même comportement léger.
- Le paysage utilise son wrapper extérieur ; le cadre enfant conserve son entrée indépendante.
- Les éléments déjà visibles au chargement ou au-dessus d’une ancre sont lisibles immédiatement. Le focus clavier révèle son contenu sans attendre.
- Les entrées en cours sont terminées lorsque l’onglet est masqué. `pagehide` affiche tous les éléments encore en attente pour une restauration sûre via le cache de navigation.
- La réduction de mouvement désactive les animations et le défilement animé, y compris lorsqu’elle est activée pendant la visite. Aucun effet d’entrée ne se rejoue au retour au mode normal.
- Sans JavaScript, tout le contenu reste visible. Aucune bibliothèque d’animation ni ressource distante supplémentaire.

Référence technique : [MDN — animation-timeline](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/animation-timeline) et [animation-range](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/animation-range).

## Vérification attendue

Contrôler l’état intermédiaire puis final des entrées, le second passage, le scroll rapide/inverse, les ancres, le menu mobile, la checklist, le focus clavier, la réduction de mouvement en direct et le rechargement sans JavaScript. Vérifier Chromium desktop et WebKit avec profil iPhone, ainsi que les largeurs 320, 375, 390, 430, 768, 1024 et 1440 px. L’émulation ne remplace pas une mesure de fluidité sur un iPhone physique.
