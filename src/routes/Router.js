import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import Login from '../views/authentication/Login';
import CreateSchedule from '../views/dashboard/CreateSchedule';
import Schedules from '../views/dashboard/Schedules';
import Users from '../views/dashboard/Users';

/* ***Layouts**** */
const FullLayout = lazy(() => import('../layouts/full-layout/FullLayout'));
const BlankLayout = lazy(() => import('../layouts/blank-layout/BlankLayout'));
/* ***End Layouts**** */

const Error = lazy(() => import('../views/authentication/Error'));

/* ****Pages***** */
/* ****Routes***** */

const Router = [
  {
    path: '/',
    element: <FullLayout />,
    children: [
      { path: '/', element: <Navigate to="/schedules" /> },
      { path: '/:slug/users', exact: true, element: <Users /> },
      { path: '/schedules', exact: true, element: <Schedules /> },
      { path: '/schedule/create', exact: true, element: <CreateSchedule /> },
      { path: '/schedule/:slug/edit', exact: true, element: <CreateSchedule /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
  {
    path: '/auth',
    element: <BlankLayout />,
    children: [
      { path: '404', element: <Error /> },
      { path: 'login', element: <Login /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
];

export default Router;
