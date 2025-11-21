# 🌐 Anonymous Chat (AI-Powered)

![Project Status](https://img.shields.io/badge/Status-Live-success)
![Tech Stack](https://img.shields.io/badge/Stack-React_|_Firebase-blue)

> A modern, real-time messaging application featuring Glassmorphism UI and on-demand AI translation.

**[🔴 Live Demo](https://anonymous-chat-YOURNAME.web.app)** *(Replace this with your actual Firebase link)*

---

## 📖 About The Project

**Anonymous Chat** is a lightweight communication tool designed to break language barriers instantly. Unlike standard chat apps, it integrates an **AI Translation Layer** directly into the interface.

Users can communicate anonymously without sign-up. When a message arrives in a foreign language, the user simply clicks the **Globe Icon (🌐)** to reveal a "Glass Modal" menu, allowing them to translate that specific message into English, French, German, Japanese, Chinese, or Spanish instantly.

### Key Features
* ⚡ **Real-Time Sync:** Built on **Firebase Realtime Database** for sub-millisecond message delivery.
* 🧠 **On-Demand AI:** Integrated **MyMemory Translation API** to translate messages only when requested (saving bandwidth).
* 🎨 **Premium UI:** Custom **Glassmorphism** design system with frosted glass effects, mesh gradients, and smooth CSS animations.
* 📱 **Responsive:** Fully optimized for desktop and mobile devices.
* 🔒 **Privacy Focused:** No user accounts or personal data collection required.

---

## 🛠️ Tech Stack

| Component | Technology | Description |
| :--- | :--- | :--- |
| **Frontend** | React.js (Vite) | Component-based UI architecture. |
| **Backend** | Firebase Realtime DB | JSON-based NoSQL database for live syncing. |
| **Hosting** | Firebase Hosting | Global CDN deployment. |
| **Styling** | CSS3 | Custom Glassmorphism, Flexbox, and Animations. |
| **AI API** | MyMemory API | RESTful API for multilingual translation. |

---

## ⚙️ How It Works

1.  **Message Flow:**
    * When a user sends a message, it is pushed to the Firebase Database with a unique ID and timestamp.
    * All connected clients have an active *listener* (`onValue`) that instantly receives the new data and renders the bubble.

2.  **Translation Logic:**
    * To optimize performance, messages are **not** translated automatically.
    * When a user clicks the **Translate Icon**, a centered modal appears.
    * Upon selection, the app sends an asynchronous `fetch` request to the API.
    * The result is cached locally in React state (`translatedCache`), ensuring that switching back and forth between languages is instant and costs zero API calls.

---

## 🚀 Getting Started (Run Locally)

If you want to clone and run this project on your own machine:

### Prerequisites
* Node.js installed.

### Installation

1.  **Clone the repo**
    ```bash
    git clone [https://github.com/YOUR-USERNAME/anonymous-chat.git](https://github.com/YOUR-USERNAME/anonymous-chat.git)
    cd anonymous-chat
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Configure Firebase**
    * Create a `src/firebase.js` file.
    * Add your own Firebase configuration keys (API Key, Database URL, etc.).

4.  **Run the development server**
    ```bash
    npm run dev
    ```

---

## 📸 Project Screenshots

*(You can upload screenshots to your repo and link them here)*

| Chat Interface | Translation Modal |
| :---: | :---: |
| ![Chat UI](https://via.placeholder.com/300x500?text=Glass+UI) | ![Modal](https://via.placeholder.com/300x500?text=Translate+Menu) |

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

*Developed by Farhan Haikal
