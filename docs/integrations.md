# Brancher les vidéos et iClosed

La méthode Aufstieg et les six réponses sont reliées aux vidéos Vimeo fournies le 5 octobre 2026. Les anciennes sections de bienvenue et de présentation ont été retirées. Le widget iClosed optionnel et le domaine de mise en ligne restent à renseigner. Aucune clé API n’est nécessaire pour ces intégrations publiques.

## Configuration vidéo

Dans `media.config.js`, utiliser `type: 'vimeo'` ou `type: 'wistia'` et renseigner `src` avec un identifiant ou une URL officielle, pas le code HTML complet. Un champ vide ou invalide conserve la couverture d’attente.

| Entrée | Titre | Source actuelle |
| --- | --- | --- |
| `methode` | Méthode Aufstieg | Vimeo `1233122486` |
| `faq-1` | Et si ça marche pas pour moi ? | Vimeo `1233121796` |
| `faq-2` | Quand les premiers résultats ? | Vimeo `1233121858` |
| `faq-3` | Si je suis pas sportif ? | Vimeo `1233121962` |
| `faq-4` | Si je mange déjà bien ? | Vimeo `1233122014` |
| `faq-5` | Pourquoi pas juste des connaissances ? | Vimeo `1233122079` |
| `faq-6` | Je dois tout manger cru ? | Vimeo `1233122132` |

Les sept lecteurs Vimeo sont montés dès le chargement dans leur cadre 16:9. Ils affichent leur vignette et leurs contrôles officiels à l’arrêt ; la lecture démarre depuis le bouton du lecteur. Les six réponses restent visibles sur trois, deux ou une colonne. Le paramètre `autopause=1` demande à Vimeo de mettre en pause la vidéo précédente lorsqu’une autre démarre. Un lien de secours apparaît si le chargement tarde ; sans JavaScript, les sept couvertures conservent un lien direct. Le lecteur Wistia optionnel reste chargé au clic.

Les six réponses utilisent uniquement les contrôles natifs Vimeo. Aucun bouton de lecture supplémentaire n’est superposé par le site et le SDK Vimeo n’est pas chargé. Aucune vidéo n’est retirée de la grille pendant le passage à une autre réponse.

### Vimeo

Les sept couvertures locales dans `public/assets/video-posters/` reprennent les vignettes officielles des lecteurs Vimeo, affichées avant la lecture. Chaque carte utilise l’image de sa propre vidéo ; la méthode conserve toute sa première diapositive sans recadrage ni titre décoratif superposé. Les couvertures restent visibles pendant le chargement du lecteur et sans JavaScript.

Le parseur accepte les identifiants numériques, les liens `https://vimeo.com/…` et les URL `https://player.vimeo.com/video/…`. Les options d’affichage sont reprises avec `autoplay=0`, `autopause=1` et la couleur `1d6586`. Le hash `h` d’un lien privé est conservé lorsqu’il est présent. Les autres paramètres de la source, notamment les informations de réservation, sont retirés.

Les permissions et la politique `strict-origin-when-cross-origin` correspondent aux codes fournis. Les éventuelles restrictions de domaine d’une vidéo doivent autoriser le domaine où la page sera publiée.

### Wistia

Le parseur accepte les identifiants de dix caractères, les liens de partage `/medias/…`, les URL de lecteur `/embed/iframe/…` et les URL de script Aurora `/embed/….js`.

Les réglages Wistia sont dans `integrations.config.js` : couleur `playerColor: '1d6586'` et `doNotTrack: true`. Les paramètres personnels des liens collés ne sont pas repris ; ce lecteur utilise `no-referrer`.

Références : [intégration iframe officielle](https://docs.wistia.com/docs/player-embed-api), [options des lecteurs](https://docs.wistia.com/docs/embed-options-and-plugins), [construction des liens de lecteur](https://docs.wistia.com/docs/construct-a-wistia-embed-code).

## iClosed : après la réservation

Cette LP intervient après la prise de rendez-vous. Le raccordement préparé concerne donc le récapitulatif de l’appel ; aucun second calendrier n’est ajouté sur cette page.

1. Une fois la LP accessible sur son domaine public HTTPS, ouvrir iClosed → AI Scheduler → Events → l’événement concerné → Confirmation page.
2. Choisir **Redirect to an external URL**, puis renseigner l’adresse publique de cette LP. Le serveur local `127.0.0.1` ne convient pas à des visiteurs externes. La redirection est un réglage iClosed, elle ne se configure pas depuis le JavaScript du site.
3. Copier le code **Embed booking confirmation** généré par iClosed. Repérer la valeur de `data-url` du bloc `call-details-widget`.
4. Coller cette valeur dans `iClosed.confirmationWidgetUrl`, dans `integrations.config.js`. Ne pas utiliser le lien du calendrier ni inventer l’URL du récapitulatif. Si le code généré diffère de cette structure, vérifier l’intégration avant de l’activer.
5. Recompiler et publier la page. À l’issue d’une réservation de test autorisée, vérifier l’arrivée sur la LP, la date, l’heure, le fuseau et le lien de rendez-vous affichés par iClosed.

Le conteneur est préparé entre le hero et les trois étapes. Il charge le script officiel `https://app.iclosed.io/assets/widget.js` une fois. iClosed lit lui-même le contexte transmis par sa redirection et affiche les détails. Le widget peut rester invisible en accès direct, sans réservation réelle : c’est le comportement documenté par iClosed. Ne pas retirer les paramètres de redirection avant le chargement de son widget.

Le site masque aussi le conteneur quand le fournisseur le signale vide. Un script indisponible affiche un rappel de consulter l’e-mail de réservation et un bouton Réessayer. Aucun événement de lecture vidéo ni case cochée n’est traité comme une confirmation d’appel. L’étape WhatsApp garde uniquement son logo et sa consigne.

Le script iClosed peut reprendre les paramètres de la page et ses cookies d’attribution pour son propre widget, selon son fonctionnement officiel. Aucun de ces paramètres n’est transmis par notre code aux lecteurs vidéo.

Référence : [confirmation externe et widget iClosed](https://docs.iclosed.io/en/articles/9915264-embedding-the-scheduler-on-your-website). Structure `call-details-widget` / `data-url` vérifiée dans le script public officiel le 22 septembre 2026.

## Contrôler la configuration

```sh
npm run check:integrations
npm test
npm run build
```

Le premier contrôle distingue les champs vides, les URL configurées et les formats invalides, sans requête externe. Pour exiger tous les champs avant une livraison complète :

```sh
npm run check:integrations -- --require-complete
```

Un lien syntaxiquement valide n’est pas une preuve de disponibilité ou d’accès au bon événement. La disponibilité des vidéos doit être vérifiée sur le domaine publié. Le retour après une vraie réservation reste à tester une fois le widget renseigné.

## Vérification locale séparée

`tests/fixtures/integrations.html` est une page de développement dédiée ; elle n’est pas incluse dans `dist/`. Elle utilise une vidéo publique de la documentation Wistia, clairement identifiée comme démonstration, pour vérifier le clic, le ratio et le passage entre deux cartes FAQ. Le bouton de panne iClosed sert uniquement après blocage de son script dans les outils développeur ; son URL est fictive et ne correspond à aucun rendez-vous.
