import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Menu from './Pages/Menu/Menu'
import Container from './Pages/Container';
import Simulation from './Pages/Simulation/Simulation';
import { ConfigProvider } from 'antd';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Menu/>,
  },
  {
    path:'/new' , 
    element: <Simulation />
  },
  {
    path:'/simulation/:id',
    element: <Simulation />
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ConfigProvider
    theme={{
      token: {
        colorPrimary: '#1ebdb4',
      },
    }}
  >
    <Container>
     <RouterProvider router={router} /> 
    </Container>
  </ConfigProvider>
  </React.StrictMode>
);

