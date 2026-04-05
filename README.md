# CCISTTA Chatbot

Application web de chatbot pour la CCISTTA, destinee a orienter les usagers sur les procedures administratives, les pieces a fournir, les delais, les tarifs et les conditions d'adhesion.

Le projet combine une interface conversationnelle, une base de procedures et une couche d'analyse simple pour mieux comprendre les demandes en francais ou en arabe.

## Apercu

Le chatbot permet de:

- poser une question libre sur une procedure
- consulter les procedures disponibles
- obtenir une reponse en francais ou en arabe
- demander une reponse classique ou une checklist
- continuer a repondre meme si le provider IA n'est pas disponible

## Fonctionnement

Le projet repose sur trois elements:

1. une interface web pour la recherche et la conversation
2. un backend Express qui analyse la demande
3. une base de procedures utilisee pour construire la reponse

Quand un token Hugging Face est configure, le backend peut utiliser un modele externe. Sinon, il genere une reponse locale a partir des donnees du projet.

## Technologies utilisees

- Node.js
- Express
- dotenv
- cors
- openai
- HTML / CSS / JavaScript

Le package `openai` est utilise comme client API vers Hugging Face Router.

## Structure du projet

```txt
CCISTTA_chatbot/
├── public/
│   ├── index.html
│   ├── script.js
│   ├── styles.css
│   └── logo.png
├── server.js
├── knowledge-base.js
├── nlp-examples.json
├── package.json
└── README.md
```

## Prerequis

Avant de lancer le projet, il faut installer:

- `Node.js`
- `npm`

`npm` est generalement installe automatiquement avec Node.js.

Pour verifier que les deux sont disponibles:

```bash
node -v
npm -v
```

Si Node.js n'est pas encore installe, il faut d'abord l'installer depuis le site officiel, puis relancer les commandes ci-dessus pour verifier l'installation.

## Dependances du projet

Les dependances principales utilisees sont:

- `express`: creation du serveur web et des routes API
- `cors`: gestion des autorisations d'acces entre frontend et backend
- `dotenv`: chargement des variables d'environnement depuis le fichier `.env`
- `openai`: client utilise ici pour communiquer avec Hugging Face Router
- `nodemon` en developpement: redemarrage automatique du serveur lors des modifications

## Installation

Installer les dependances:

```bash
npm install
```

Creer ensuite un fichier `.env` a la racine:

```env
PORT=3100
HF_TOKEN=your_huggingface_token_here
HF_MODEL=deepseek-ai/DeepSeek-R1:fastest
```

Remarques:

- si `PORT` n'est pas defini, l'application utilise `3000`
- si `HF_TOKEN` n'est pas renseigne, le fallback local reste disponible

## Lancement

Execution normale:

```bash
npm start
```

Mode developpement:

```bash
npm run dev
```

Ouvrir ensuite l'application dans le navigateur sur le port configure, par exemple:

```txt
http://localhost:3100
```

## API

### `GET /api/procedures`

Retourne la liste des procedures. La langue peut etre passee avec `?language=fr` ou `?language=ar`.

### `POST /api/chat`

Route principale utilisee par l'interface.

Exemple de requete:

```json
{
  "messages": [
    {
      "role": "user",
      "content": "Quels documents faut-il pour le certificat d'origine ?"
    }
  ],
  "language": "fr"
}
```

### `POST /api/nlp/analyze`

Retourne l'analyse NLP d'un message.

Exemple:

```json
{
  "text": "Je veux une checklist pour la carte d'adhesion",
  "language": "fr"
}
```

### `GET /api/status`

Retourne l'etat du backend:

- provider Hugging Face actif ou non
- fallback local disponible
- nombre de procedures chargees

## Couche NLP

Le backend contient une couche NLP simple basee sur des regles. Elle sert a:

- detecter la langue
- reperer le type de demande
- identifier la procedure la plus probable
- extraire certaines entites utiles
- choisir un format de reponse adapte

Exemple:

```txt
Quels documents faut-il pour le certificat d'origine ?
```

Dans ce cas, le backend peut reconnaitre qu'il s'agit d'une demande de documents liee a la procedure "Certificat d'Origine".

## Interface

L'interface contient:

- un espace de conversation
- une liste de procedures avec recherche
- des fiches rapides
- un changement de langue `fr/ar`
- un bouton de theme clair / sombre
- des actions rapides
- un selecteur de checklist


## Contexte

Projet realise autour d'un chatbot d'information administrative pour la CCISTTA.
