# 📖 KNORA: AI-Powered Learning Engine

[![Next.js](https://img.shields.io/badge/Next.js-15.x-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-7.x-47A248?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

**KNORA** is a premium, state-of-the-art AI-powered learning engine and examination platform designed to guide students through mastering complex computer science concepts, with a special focus on **Java**, **C++**, and **Database Management Systems (DBMS)**. 

By utilizing adaptive AI capabilities, KNORA dynamically decodes student thinking styles, tracks learning progress, customizes study tracks, and delivers interactive, bite-sized, and highly detailed revision guides.

---

## 🌟 Key Features

### 🧠 Adaptive Concept Explorer
Deep-dive into core paradigms across multiple subjects:
*   **Java Mastery:** Interactive modules covering classes, collection framework, exception handling, inheritance, lambda expressions, multi-threading, NIO, and string manipulation.
*   **DBMS Architectures:** Thorough explorations of indexing, concurrency control, database normalization, NoSQL, relational algebra, database security, and SQL mystery tasks.
*   **Interactive Simulation Engines:** Live execution visualization tools like the XOR gate interactive explorer and custom Python dashboards.

### 📝 Dynamic Practice Arenas
Tailored mock tests and automated AI-driven review structures:
*   Dynamic question generation aligned with targeted weak points.
*   Smart evaluation with automated grading feedback.

### 📅 Intelligent Revision Planner
An advanced calendar and topic scheduler that:
*   Builds custom calendars based on upcoming exam dates.
*   Tracks preparation progress dynamically.
*   Distributes study load evenly across key modules.

---

## 🛠️ Technology Stack

KNORA is engineered using modern, robust frameworks for visual speed, premium aesthetics, and responsive performance:

*   **Frontend Framework:** [Next.js 15 (App Router)](https://nextjs.org/) with React 18.
*   **Styling & Design System:** [Tailwind CSS](https://tailwindcss.com/) with custom neo-brutalist and glassmorphic micro-animations.
*   **Database & ODM:** [MongoDB](https://www.mongodb.com/) & [Mongoose](https://mongoosejs.com/) for fast, structured document querying and state preservation.
*   **Artificial Intelligence:** [Google Generative AI SDK (`@google/generative-ai`)](https://ai.google.dev/) for real-time concept explanation and feedback loops.
*   **Authentication:** [NextAuth.js](https://next-auth.js.org/) for secure Google OAuth integration.
*   **Document Generation:** [jsPDF](https://github.com/parallax/jsPDF) & [jsPDF-AutoTable](https://github.com/simonbengtsson/jsPDF-AutoTable) for dynamic, down-loadable review materials.

---

## 🚀 Getting Started

Follow these instructions to set up and run the KNORA project locally on your system.

### Prerequisites
*   **Node.js** (v18.x or higher recommended)
*   **npm** or **yarn** / **pnpm**
*   **MongoDB Instance** (Local community edition or MongoDB Atlas cloud cluster)

### Installation

1.  **Clone the Repository:**
    ```bash
    git clone https://github.com/your-username/knora.git
    cd knora
    ```

2.  **Install Dependencies:**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables:**
    Create a `.env` file in the root directory and specify the following variables (refer to `.env.example`):
    ```env
    # Database
    MONGODB_URI=mongodb://localhost:27017/knora

    # NextAuth Config
    NEXTAUTH_URL=http://localhost:3000
    NEXTAUTH_SECRET=your_nextauth_jwt_secret

    # OAuth Providers
    GOOGLE_CLIENT_ID=your_google_oauth_client_id
    GOOGLE_CLIENT_SECRET=your_google_oauth_client_secret

    # AI API Keys
    GEMINI_API_KEY=your_gemini_api_key
    ```

4.  **Run in Development Mode:**
    ```bash
    npm run dev
    ```
    The application will be accessible at [http://localhost:3000](http://localhost:3000).

5.  **Build for Production:**
    ```bash
    npm run build
    npm run start
    ```

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
