import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./theme/themeProvider.tsx";
import BreedDetails from "./components/breedDetails.tsx";
import BreedProvider from "./context/breedProvider.tsx";
import NotFound from "./components/notFound.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/:breed",
        element: <BreedDetails />,
      },
    ],
    errorElement: <NotFound />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider>
      <BreedProvider>
        <RouterProvider router={router} />
      </BreedProvider>
    </ThemeProvider>
  </React.StrictMode>
);
