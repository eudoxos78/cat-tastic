import { createBrowserRouter, RouterProvider } from "react-router";
import { Cats } from "../views/Cats";
import { Breeds } from "../views/Breeds";
import { Favourites } from "../views/Favourites";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Cats header="Cats, cats and more cats!!!" />,
  },
  {
    path: "/breeds",
    element: <Breeds />,
  },
  {
    path: "/favourites",
    element: <Favourites />,
  },
  {
    path: "/favorites",
    element: <Favourites />,
  },
]);

export const Router = () => <RouterProvider router={router} />;
