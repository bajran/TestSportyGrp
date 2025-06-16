# 🏆 Sports League

This project is a **single-page React application** that fetches and displays sports leagues using TheSportsDB API. This project is setup using React | Vite | Typescript.

## ✅ Objective Coverage

| Requirement                     | Implemented? | Description                                                                                          |
| ------------------------------- | ------------ | ---------------------------------------------------------------------------------------------------- |
| Component-based architecture    | ✅           | Each unit (Card, Modal, Loader, NoData, IF, SearchBar, MultiSelectDropdown) is isolated and reusable |
| State management                | ✅           | Managed with React `useState`, `useEffect` — no Redux used due to scope                              |
| API integration                 | ✅           | `/all_leagues` and `/search_all_seasons` endpoints with caching                                      |
| Mobile-first, responsive layout | ✅           | CSS modules with `flex`, `grid` and `@media (min-width)`                                             |

---

## 🧠 Tools and Assistance Used

As permitted, I used the following tools to accelerate development:

- **ChatGPT**:

  - Generated responsive CSS using mobile-first best practices
  - Guided implementation of in-memory caching using TypeScript generics

## 💡 Notes

- The app uses `React.lazy()` to defer non-critical component loading.
- Caching is handled using a generic `fetchWithMemoryCache<T>()` utility that supports TTL and avoids redundant network calls.

## 🚀 How to Run This Project

```bash
# 1. Go to sporttest subdirectory
cd sporttest

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev

# 4. App will run at
 http://localhost:5173/
```
