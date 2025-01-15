import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "./app/Home/Home";
import Books from "./app/routes/Books/Books";
import Book from "./app/routes/Book/Book";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    // errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/books",
        element: <Books />,
      },
      {
        path: "/books/:id",
        element: <Book />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
