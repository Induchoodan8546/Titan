# Titan - Immersive 3D Luxury Real Estate Showcase

Titan is a high-fidelity, single-page WebGL application showcasing ultra-luxury residential towers. Built with **Next.js**, **React Three Fiber (R3F)**, and **Tailwind CSS v4**, it blends scroll-driven cinematic 3D animations with interactive 3D scale model floorplans.

---

## 🌟 Key Features

### 1. Cinematic Scroll-Driven Skyscraper
*   The background features a fully procedural 3D skyscraper that rotates, scales, and moves dynamically.
*   A custom camera controller maps the page's scroll progress (`0.0` to `1.0`) to frame lower levels, mid-tier suites, and the penthouse apex in sync with the editorial text.

### 2. Full-Screen 3D Blueprint Schema Modal
*   Clicking **"Examine 3D Blueprint Schema"** opens a dedicated WebGL canvas showcasing a 3D architectural model of the selected suite layout (Sky Mansions, Duplex Penthouses, or The Titan Crown).
*   Equipped with `OrbitControls` for manual rotation, zooming, and panning.

### 3. Precision Camera Snapping (Anti-Vibration)
*   Integrates linear interpolation (`lerp`) to pan camera focus directly to selected rooms.
*   Applies a precision distance-snapping algorithm (`dist < 0.005`) to lock coordinates once the destination is reached, preventing float-precision rendering jitter (vibration).

### 4. Implicit Room Spotlight Highlights
*   Instead of a moving spotlight teleporting through walls, each room has its own local, stationary pointLight and a gold floor ring.
*   Lights activate/fade implicitly *only* when the corresponding room is active, creating a clean architectural diagram lighting model.

### 5. Architectural Scale Model Rendering
*   **Solid Plaster Walls**: Uses solid cream plaster material instead of transparent glass for internal room divisions to catch realistic shadows.
*   **Glass Glazing**: Renders outer window walls with cyan physical glass refraction.
*   **Aesthetic Accents**: Replaced aviation helipads with custom-modeled luxury elements like the **Sky Spa Glass Jacuzzi**.

---

## 🛠️ Technology Stack

*   **Framework**: Next.js 16 (React 19)
*   **WebGL Rendering**: Three.js
*   **React Canvas**: [React Three Fiber (@react-three/fiber)](https://github.com/pmndrs/react-three-fiber)
*   **3D Helpers**: [Drei (@react-three/drei)](https://github.com/pmndrs/drei)
*   **Styling**: Tailwind CSS v4
*   **Transitions**: Framer Motion
*   **Icons**: Lucide React
*   **Compiling Engine**: Next.js Turbopack compiler

---

## 🚀 Getting Started

### Prerequisites
*   Node.js (v18.x or higher)
*   npm (v9.x or higher)

### Installation

1.  Clone the repository and navigate to the project directory:
    ```bash
    git clone <repository-url>
    cd Titan
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  *Note for Windows users:* If the native Next.js compiler binary gets corrupted, force install the matching build target:
    ```bash
    npm install --force @next/swc-win32-x64-msvc
    ```

### Development Server

Run the local development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## 📂 Project Structure

```text
Titan/
├── public/                 # Static assets (images, logos, textures)
│   └── images/             # High-resolution interior rendering assets
├── src/
│   ├── app/                # Next.js App router (layout.tsx, page.tsx)
│   ├── components/         # React Components
│   │   ├── BuildingModel/  # Background 3D canvas (Scene.tsx, ProceduralBuilding.tsx)
│   │   ├── Projects/       # Interactive showcase (Projects.tsx, FloorplanModel3D.tsx)
│   │   └── ui/             # Reusable UI elements (CustomLoader.tsx)
│   └── index.css           # Global CSS variables & Tailwind directives
├── package.json            # Scripts & project dependencies
└── tsconfig.json           # TypeScript configuration
```

---

## 📦 Production Build

Compile the application into static optimized assets:
```bash
npm run build
```
The compiled build output will be stored in the `.next` directory. The statically pre-rendered routes are fully optimized and ready for zero-latency hosting on CDNs like Vercel.

---

## 📖 Additional Documentation
*   **Detailed Working & Tech History**: Check the local [website_development_report.md](file:///C:/Users/induc/.gemini/antigravity-ide/brain/9caf2e54-5aad-404e-9ae8-b5bfe2cc4033/website_development_report.md) for bundler corrections, layout coordinates, and materials specs.
*   **Walkthrough Details**: Check [walkthrough.md](file:///C:/Users/induc/.gemini/antigravity-ide/brain/9caf2e54-5aad-404e-9ae8-b5bfe2cc4033/walkthrough.md) for the development checklist and compilation results.
