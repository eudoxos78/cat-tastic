import { createBrowserRouter, RouterProvider } from "react-router";
import { Layout } from "../Layout";
import { Cats } from "../views/Cats";
import { Cat } from "../views/Cat";
import { Breeds } from "../views/Breeds";
import { Favourites } from "../views/Favourites";

const router = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: (
          <Cats
            header="Cats, cats and more cats!!!"
            loadingText={`"They are coming..."`}
          />
        ),
      },
      {
        path: "/breeds",
        element: <Breeds />,
      },
      {
        path: "/favorites",
        element: <Favourites />,
      },
      {
        path: "/favourites",
        element: <Favourites />,
      },
      {
        path: "/images/:catId",
        element: <Cat />,
      },
    ],
  },
]);

export const Router = () => <RouterProvider router={router} />;
