# Shopping List Application

> **⚠️ This project is currently in active development. Features and APIs may change without notice.**

A modern web application for managing shared shopping lists with user authentication and real-time data synchronization.

## 📋 Features

- **User Authentication**: Secure login system with user accounts
- **Shopping List Management**: Create, update, and manage shopping items
- **Real-time Sync**: Keep your shopping list synchronized across devices
- **Modern UI**: Built with React for a responsive user experience

## 🚀 Technology Stack

- **Frontend**: React 19 + Vite
- **Backend**: PocketBase (self-hosted backend)
- **Styling**: CSS
- **Package Manager**: npm
- **Containerization**: Docker & Docker Compose

## 📦 Prerequisites

- Node.js (v18 or higher)
- Docker & Docker Compose (for running the backend)
- npm

## 🛠️ Installation

### 1. Clone the repository

```bash
git clone <repository-url>
cd listaPublic
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the backend (PocketBase)

```bash
docker-compose up -d
```

The PocketBase backend will be available at `http://localhost:1234` unless changed with .env variables.

### 4. Start the development server

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or another port shown in the terminal)

## � Mobile Installation

To use the application on your mobile device (phone or tablet):

### Requirements

- Mobile device (iOS or Android)
- Web browser installed on the device
- Connection to the same network as the development computer (or accessible server)

### Steps

1. **Find your computer's IP address** on the local network:
   - **Windows**: Open PowerShell and run `ipconfig`. Look for "IPv4 Address" under your network adapter (e.g., `192.168.x.x`)
   - **macOS/Linux**: Open Terminal and run `ifconfig` or `ip addr`

2. **Update the backend URL** (if using a local machine):
   - Edit `src/services/api.js`
   - Replace `localhost:1234` with your computer's IP address: `http://192.168.x.x:1234`
   - Also update the frontend URL reference if needed

3. **Access on mobile**:
   - Open a web browser on your mobile device
   - Navigate to: `http://<your-computer-ip>:5173`
   - Example: `http://192.168.1.100:5173`

4. **Login**:
   - Use the credentials created in the PocketBase Admin Dashboard
   - The app will work like a progressive web app (PWA)

### Optional: Add to Home Screen

To make it easier to access the app:

- **iOS**: Tap the Share button → Add to Home Screen
- **Android**: Tap the menu button (three dots) → Install app or Add to Home Screen

### Notes

- Ensure your mobile device and computer are on the same WiFi network
- The application works best on modern browsers (Chrome, Firefox, Safari, Edge)
- For better performance, build the production version: `npm run build`
## 🌐 Using Outside Your Local Network

To access the application from outside your local WiFi network, you need to deploy it to a server and use your own domain.

### Requirements

- A domain name (e.g., `myshoppinglist.com`)
- A server or hosting service (VPS, cloud provider, etc.)
- SSL certificate (HTTPS) - recommended for production

### Configuration Changes

1. **Update the backend URL**:
   - Edit `src/services/api.js`
   - Replace the local IP address with your domain:
     ```javascript
     // Before (local)
     const API_URL = 'http://192.168.1.100:1234';
     
     // After (production)
     const API_URL = 'https://api.myshoppinglist.com';
     ```

2. **Update PocketBase configuration**:
   - Ensure PocketBase is running on your server
   - Configure your domain to point to your server's IP address
   - Set up SSL/TLS certificates (use Let's Encrypt for free certificates)
   - Update Docker Compose or your deployment configuration to serve over HTTPS

3. **Build for production**:
   ```bash
   npm run build
   ```
   - This creates an optimized production build in the `dist/` folder

4. **Deploy the frontend**:
   - Upload the contents of the `dist/` folder to your server
   - Configure a web server (Nginx, Apache, etc.) to serve the files
   - Ensure the server supports HTTPS

5. **Environment variables** (optional):
   - Create a `.env` file with your production URLs:
     ```
     VITE_API_URL=https://api.myshoppinglist.com
     ```
   - Update `src/services/api.js` to use this variable

### Deployment Services

Some recommended hosting options:

- **Frontend**: Vercel, Netlify, GitHub Pages, AWS S3 + CloudFront
- **Backend (PocketBase)**: Heroku (with Docker), Railway, Fly.io, DigitalOcean, AWS EC2

### Security Notes

⚠️ **Important for production:**
- Always use HTTPS (SSL/TLS)
- Change default PocketBase admin credentials
- Use strong passwords for user accounts
- Keep your server and dependencies updated
- Consider using environment variables for sensitive configuration
## �📁 Project Structure

```
.
├── public/              # Static files
├── src/
│   ├── components/      # React components (Item, Login)
│   ├── hooks/           # Custom React hooks
│   ├── services/        # API and backend services
│   ├── assets/          # Images and other assets
│   ├── App.jsx          # Main application component
│   ├── main.jsx         # Application entry point
│   ├── index.css        # Global styles
│   └── App.css          # App component styles
├── docker-compose.yml   # Docker configuration for PocketBase
├── vite.config.js       # Vite configuration
├── package.json         # Project dependencies
└── pb_schema.json       # PocketBase database schema
```

## 📝 Available Scripts

- **`npm run dev`** - Start the development server with hot module replacement (HMR)
- **`npm run build`** - Build the project for production
- **`npm run preview`** - Preview the production build locally
- **`npm run lint`** - Run ESLint to check code quality

## 🐳 Docker

The project includes Docker Compose configuration to run PocketBase backend:

```bash
docker-compose up -d      # Start backend in the background
docker-compose down       # Stop the backend
```

PocketBase Admin Dashboard: `http://localhost:1234/_/`

### 5. Create Application Users

**⚠️ For now, users must be created manually through the PocketBase Admin Dashboard.**

To create users for the application:

1. Open the PocketBase Admin Dashboard at `http://localhost:1234/_/`
2. Log in with default credentials (admin/admin) - change these in production!
3. Navigate to the **Collections** section
4. Select the **users** collection
5. Click **New Record** to create a new user
6. Fill in the required fields:
   - **Email**: User's email address (as of now, must end in '@familia.com, but users should log in only with the usernames)
   - **Password**: User's password (as of now, hardcoded to be '12345678')
   - **Password Confirm**: Repeat the password
7. Click **Save** to create the user

The created users can now log in to the Shopping List application using their email and password.

**Future Enhancement**: User registration through the application UI is planned for future versions.

## 🔌 API Integration

The application uses PocketBase as the backend service. API calls are handled through the `src/services/api.js` module.

## ⚙️ Configuration

- **Backend URL**: Configure the PocketBase connection in `src/services/api.js`
- **Database Schema**: Edit `pb_schema.json` to modify the data structure

## 🚧 Development Status

This project is **in active development**. The following areas may still be work in progress:

- Additional features and functionality
- Comprehensive error handling
- Automated testing
- Production optimization

## 📄 License

This project is licensed under the MIT License - see below for details.

```
MIT License

Copyright (c) 2026

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## 🤝 Contributing

This is a personal project in development. Contributions may be considered in the future.

---

**Last Updated**: January 2026
