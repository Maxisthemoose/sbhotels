"use-strict"

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// import App from './App';
import { HashRouter, Route, RouterProvider, Routes, createBrowserRouter, createHashRouter } from 'react-router-dom';
import Nav from './components/Nav/Nav';
import DirectionsMap from './routes/DirectionsMap';
import Root from './routes/Root';
import LandingPage from './routes/LandingPage';
import Brisas from './routes/Brisas';
import Harbor from './routes/Harbor';
import Lavender from './routes/Lavender';

const router = createHashRouter(
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
);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  // <React.StrictMode>
  <HashRouter basename='/'>
    <Nav />
    <Routes>
      <Route exact path="/" element={<LandingPage />} />
      <Route path="/maps" element={<DirectionsMap />} />
      <Route path="/brisas" element={<Brisas />} />
      <Route path="/harbor" element={<Harbor />} />
      <Route path="/lavender" element={<Lavender />} />
    </Routes>
    {/* <RouterProvider router={router} /> */}
  </HashRouter>
  // <RouterProvider router={router} />
  // </React.StrictMode>
);