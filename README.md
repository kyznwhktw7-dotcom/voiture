# To‑Do List (localStorage)

Cette application minimale permet de créer, éditer, marquer comme terminée et supprimer des tâches. Les tâches sont sauvegardées localement dans votre navigateur via localStorage.

Fichiers ajoutés:

- `index.html` — page principale de l'application.
- `style.css` — styles simples.
- `script.js` — logique (localStorage, rendu, édition).

Installation & utilisation locale:

1. Clonez le dépôt et basculez sur la branche `123`:

```bash
git fetch origin
git checkout 123
```

2. Ouvrez `index.html` dans votre navigateur (double-cliquez sur le fichier ou utilisez un petit serveur HTTP):

```bash
# Python 3
python -m http.server 8000
# puis ouvrez http://localhost:8000
```

3. Les tâches sont automatiquements sauvegardées dans localStorage.

Déploiement GitHub Pages:

- J'ai créé la branche `123` contenant ces fichiers.
- Si vous voulez que le site soit publié, je peux créer une branche `gh-pages` avec la même version ; vous pouvez ensuite activer GitHub Pages dans les paramètres du dépôt (Settings → Pages) et choisir la branche `gh-pages`.

Notes:

- Le fichier `index.json` présent dans le dépôt n'est pas modifié par cette opération.
- Si vous voulez des améliorations (tri, filtres, synchronisation multi‑utilisateurs, backend), dites‑le et je vous proposerai la suite.
