# Brawl Stars Proxy Server

Un serveur proxy Node.js qui permet d'accéder à l'API Brawl Stars sans restrictions d'IP.

## 🚀 Fonctionnalités

- ✅ Proxy pour tous les endpoints de l'API Brawl Stars
- ✅ Gestion automatique de la clé API
- ✅ Support CORS pour les applications mobiles
- ✅ Facile à déployer sur Render

## 📋 Installation locale

```bash
# Cloner le repo
git clone https://github.com/votre-username/brawlstars-proxy-server.git
cd brawlstars-proxy-server

# Installer les dépendances
npm install

# Créer un fichier .env
cp .env.example .env
# Éditer .env et ajouter votre clé API Brawl Stars
```

## 🔧 Configuration

Créez un fichier `.env` à la racine du projet :

```env
BRAWL_STARS_API_KEY=votre_clé_api_ici
PORT=3000
```

## ▶️ Démarrage

```bash
# Mode développement (avec rechargement automatique)
npm run dev

# Mode production
npm start
```

Le serveur démarre sur `http://localhost:3000`

## 📡 Utilisation

### Health Check
```bash
curl http://localhost:3000/health
```

### Exemples d'utilisation

**Récupérer les données d'un joueur :**
```bash
curl http://localhost:3000/api/players/%23R28QCRYY
```

**Récupérer le classement France :**
```bash
curl http://localhost:3000/api/rankings/fr/players
```

**Récupérer le classement mondial :**
```bash
curl http://localhost:3000/api/rankings/players
```

## 🌐 Déploiement sur Render

### Étapes :

1. **Créer un compte Render** : https://render.com
2. **Connecter GitHub** à Render
3. **Créer un nouveau Web Service** :
   - Sélectionner ce repo
   - Runtime: Node
   - Build command: `npm install`
   - Start command: `npm start`
4. **Ajouter les variables d'environnement** :
   - `BRAWL_STARS_API_KEY` : Votre clé API Brawl Stars
5. **Déployer** : Cliquer sur "Deploy"

Une fois déployé, vous recevrez une URL publique (ex: `https://brawlstars-proxy-xxxxx.onrender.com`)

## 📱 Utilisation dans l'app mobile

Dans l'application Trophy Tracker BS, remplacez l'URL de base de l'API :

```javascript
// Au lieu de :
const BASE_URL = 'https://api.brawlstars.com/v1';

// Utilisez :
const BASE_URL = 'https://votre-proxy-url.onrender.com/api';
```

## 🔐 Sécurité

- ⚠️ **Ne jamais** committer votre clé API dans le repo
- Utilisez toujours un fichier `.env` local
- Utilisez les variables d'environnement sur Render (dans les paramètres du service)

## 📝 Licence

MIT
