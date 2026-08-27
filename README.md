Markdown

# Furniro All| Compass UOL Challenge 3

<div align="center">

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-%23443E38.svg?style=for-the-badge&logo=react&logoColor=white)
![React Hook Form](https://img.shields.io/badge/React%20Hook%20Form-%23EC5990.svg?style=for-the-badge&logo=reacthookform&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)

<br/>

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![TypeORM](https://img.shields.io/badge/TypeORM-%23FE0803.svg?style=for-the-badge&logo=typeorm&logoColor=white)
![SQLite](https://img.shields.io/badge/sqlite-%2307405e.svg?style=for-the-badge&logo=sqlite&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)

</div>

---

## About The Project

This project was developed as part of **Challenge 3** for the Compass UOL Fellowship Program. It is the solo continuation of the Furniro E-Commerce platform built during Challenge 2. 

In this phase, the application evolved from a static interface into a fully secure and interactive platform. The focus was on implementing user authentication, protecting private routes, adding robust form validations, consuming external APIs for address autofill, and executing a pixel-perfect UI/UX polish across the entire application.

---

## What's New in Challenge 3

- **Secure Authentication with JWT & bcrypt:** Complete Login and Registration flow. Passwords are encrypted before database insertion, and sessions are securely managed via JSON Web Tokens.
- **Protected Routes:** Pages like `Checkout` and `Contact` are strictly protected. Unauthenticated users are redirected to the Login page and seamlessly returned to their intended destination after authenticating.
- **Advanced Form Validation:** Implemented `react-hook-form` and `zod` for strict client-side validation, including email formatting and required fields on the Checkout and Contact pages.
- **Smart Address Autofill:** Integrated with the **ViaCEP API** to automatically populate city, state, and street address fields based on the user's ZIP Code during checkout.
- **UI/UX Polishing:** UI/UX matching the Figma design, including dynamic online status indicators, responsive alignments, sticky headers, and custom toast notifications for user actions.
- **Global Error Handling Refactor:** Modernized the backend exception architecture to provide clear, predictable error messages to the frontend.

*(Includes all previous features: Dynamic Product Listing, Zustand Shopping Cart, SQLite Database Seeding, and fully responsive Mobile-first design).*

---

## Architecture & Technologies

### Front-end
- React.js (via Vite) & TypeScript
- Tailwind CSS
- React Router DOM
- Zustand
- React Hook Form & Zod
- React Hot Toast
- Splide.js

### Back-end
- Node.js & Express.js & TypeScript
- TypeORM & SQLite
- JSON Web Token JWT & bcrypt
- Swagger

---

## Getting Started

Follow these instructions to set up and run the project locally.

### Prerequisites

Make sure you have **Node.js v18 or higher** and **npm** installed on your machine.

### 1. Clone the Repository

```bash
git clone https://github.com/Lucas-Folharini/Furniro-All---Desafio-3-Sprint-5---Compass-2026-FullStack.git
```

### 2. Running the Back-end

The backend utilizes an SQLite database. When starting the server in development mode, it will automatically seed the database with initial products.

Run the following commands:
```bash
cd back-end 
```
```bash
npm install
```
```bash
npm run dev
```
The API will be available at http://localhost:3000.

### 3. Running the Front-end

Open a new terminal window in the project root and run:
```bash
cd front-end
```
```bash
npm install
```
```bash
npm run dev
```

The application will be available at http://localhost:5173.

### API Documentation

The backend API is documented using Swagger UI. Once the backend server is running, it can be accessed interactively at:

```bash
http://localhost:3000/docs
```

### Project Structure/Key Additions

The monorepo structure was maintained, with critical security and validation layers added:
```plaintext

back-end
┣ src
┃ ┣ controllers # Added auth.controller.ts
┃ ┣ entities    # Added user.entity.ts
┃ ┣ routes      # Added auth.routes.ts
┃ ┣ services    # Added auth.service.ts with bcrypt & JWT logic
┃ ┗ shared      # Refactored http-exceptions and error-handler

front-end
┣ src
┃ ┣ api         # Added ViaCEP API integration
┃ ┣ components  # Polished UI components and ProtectedRoutes
┃ ┣ pages       # Added Login/Register, refactored Checkout/Contact
┃ ┗ store       # Added useAuthStore.ts for JWT state management
```

#### Developer

This solo continuation was developed by **Lucas Folharini** as part of the Compass UOL Fellowship Program.
#### Acknowledgements

Developed with dedication for the Compass UOL Fellowship Program.