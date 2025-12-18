# 🎬 Movie Streaming Application

![React](https://img.shields.io/badge/React-19.0-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?logo=typescript&logoColor=white)
![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-764ABC?logo=redux&logoColor=white)
![TanStack Query](https://img.shields.io/badge/TanStack_Query-FF4154?logo=react-query&logoColor=white)
![Material UI](https://img.shields.io/badge/Material_UI-007FFF?logo=mui&logoColor=white)

[![Live Demo](https://img.shields.io/badge/demo-online-green?logo=vercel&style=for-the-badge)](LINK_VERCEL_CUA_BAN)
A modern, responsive movie streaming web application that allows users to browse trending movies, watch trailers, and filter content using the TMDB API. Built with performance and code quality in mind.

## 🚀 Key Features

- **🔐 Authentication:** Secure Login/Register flow with JWT handling (Axios Interceptors).
- **⚡ Optimized Data Fetching:** Implements **TanStack Query** for server-state management, caching, and automatic background refetching.
- **🎥 Interactive UI:**
  - Watch trailers via Modal popups.
  - Browse movies by Trending, Popular, Top Rated.
  - Advanced filtering (Genre, Country, Year).
- **📱 Fully Responsive:** Adaptive layout using **Material UI Grid** and **Tailwind CSS**, optimized for Mobile, Tablet, and Desktop.
- **🎨 Theming:** Custom dark/light theme support via Material UI.

## 🛠 Tech Stack

### Core

- **Framework:** React 19 (Vite)
- **Language:** TypeScript
- **Routing:** TanStack Router & React Router DOM

### State Management & Data

- **Global State:** Redux Toolkit (Auth slice)
- **Server State:** TanStack Query (React Query)
- **API Client:** Axios (Modularized with Interceptors)

### UI & Styling

- **Component Library:** Material UI (MUI)
- **Styling Engine:** Tailwind CSS
- **Icons:** Lucide React / MUI Icons

### Quality Control (DX)

- **Linter:** ESLint
- **Formatter:** Prettier
- **Git Hooks:** Husky + Commitlint (Conventional Commits)

## 📸 Screenshots

|                            Home Page                             |                             Movie Details                              |
| :--------------------------------------------------------------: | :--------------------------------------------------------------------: |
| ![Home](https://via.placeholder.com/400x200?text=Home+Page+Demo) | ![Details](https://via.placeholder.com/400x200?text=Details+Page+Demo) |

## 🛠 Installation & Setup

1.  **Clone the repository**

    ```bash
    git clone [https://github.com/lat2509/Web-film.git](https://github.com/lat2509/Web-film.git)
    cd Web-film
    ```

2.  **Install dependencies**

    ```bash
    yarn install
    # or
    npm install
    ```

3.  **Environment Variables**
    Create a `.env` file in the root directory and add your TMDB API keys:

    ```env
    VITE_TMDB_API_KEY=your_tmdb_api_key_here
    VITE_BASE_URL=[https://api.themoviedb.org/3](https://api.themoviedb.org/3)
    ```

4.  **Run the development server**
    ```bash
    yarn dev
    ```

## 📂 Project Structure

```bash
src/
├── api/            # Axios client & API endpoints (moviesApi, authApi)
├── components/     # Reusable UI components (MediaCard, TrailerModal...)
├── features/       # Feature-specific logic
├── hooks/          # Custom Hooks (useAuth, useHomeData...)
├── pages/          # Page components (Home, Catalog, SearchResults)
├── router/         # Routing configuration
├── store/          # Redux slices & Store setup
├── types/          # TypeScript interfaces & types
└── utils/          # Helper functions & Constants
```
