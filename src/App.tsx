import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
//import useRunOnce from './hooks/useRunOnce';
import CommentsPage from './pages/CommentsPage';

function App() {

  return (
    <>
      <Routes>
        <Route
          element={<MainLayout />}
        >

          {/* / */}
          <Route
            path='/'
            element={<HomePage />}
          >
          </Route>

          {/* GuestGuard */}
          {/* <Route
            element={<GuestGuard/>}
          >
          </Route> */}

          <Route
            path='/comments-section'
            element={<CommentsPage />}
          >
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
