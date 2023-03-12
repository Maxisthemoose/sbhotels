"use-strict"

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// import App from './App';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
// import Nav from './components/Nav/Nav';
import DirectionsMap from './routes/DirectionsMap';
import Root from './routes/Root';
import LandingPage from './routes/LandingPage';
import Brisas from './routes/Brisas';
import Harbor from './routes/Harbor';
import Lavender from './routes/Lavender';
const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Root />,
      children: [
        {
          path: "/",
          element: <LandingPage />
        },
        {
          path: "/maps",
          element: <DirectionsMap />
        },
        {
          path: "/brisas",
          element: <Brisas />
        },
        {
          path: "/harbor",
          element: <Harbor />
        },
        {
          path: "/lavender",
          element: <Lavender />
        }
      ]
    },

  ]
)

root.render(
  // <React.StrictMode>
  <RouterProvider router={router} />
  // </React.StrictMode>
);