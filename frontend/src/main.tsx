import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

import {createBrowserRouter, RouterProvider} from 'react-router-dom';

// Páginas
import Home from './components/routes/Home.tsx';
import InfoPaciente from './components/routes/InfoPaciente.tsx';
import EditarPaciente from './components/routes/EditarPaciente.tsx';
import DiagnosticoPaciente from './components/routes/DiagnosticoPaciente.tsx';

// Complements

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/info',
        element: <InfoPaciente />
      },
      {
        path: '/edit',
        element: <EditarPaciente />
      },
      {
        path: '/diagnostic',
        element: <DiagnosticoPaciente />
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>
);

