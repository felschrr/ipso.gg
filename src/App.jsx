import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { Layout } from "./components";
import { Home, Profile, Champion, Champions } from './pages';
import { PlayerProvider } from './context/playerContext'

const App = () => {
  const routes = [
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          element: <Home />,
          index: true,
        },
        {
          path: '/profile',
          element: <Profile/>
        },
        {
          path: '/champion/:championKey',
          element: <Champion />,
        },
        {
          path: '/champions',
          element: <Champions />,
        },
        {
          path: '/*',
          element: <Navigate to="/" />,
        },
      ],
    },
  ];

  return (
    <PlayerProvider>
      <RouterProvider router={createBrowserRouter(routes)} />
    </PlayerProvider>
  );
};

export default App;
