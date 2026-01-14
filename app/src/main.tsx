import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.tsx";
import Layout from "./layout/index.tsx";
import PublicModelCards from "./pages/PublicModelCards.tsx";
import EntityList from "./components/entities/EntityList.tsx";
import Authentication from "./pages/Authentication.tsx";
import ModelCardCreator from "./pages/ModelCardCreator.tsx";
import ModelCardContentCreator from "./pages/ModelCardContentCreator.tsx";
import ModelCardOdrlConverter from "./pages/ModelCardOdrlConverter.tsx";
import Logout from "./pages/Logout.tsx";

export const router = createBrowserRouter([
  {
    Component: App,
    children: [
      {
        path: "/",
        Component: Layout,
        children: [
          {
            path: "public-model-cards",
            Component: PublicModelCards,
          },
          {
            path: "entities",
            Component: EntityList,
          },
          {
            path: "auth",
            Component: Authentication,
          },
          {
            path: "model-card-creator",
            children: [
              {
                path: "base",
                Component: ModelCardCreator,
              },
              {
                path: "content",
                Component: ModelCardContentCreator,
              },
              {
                path: "odrl",
                Component: ModelCardOdrlConverter,
              },
            ],
          },
          { path: "logout", Component: Logout },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
