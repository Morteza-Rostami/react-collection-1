import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
//import useRunOnce from './hooks/useRunOnce';
import CommentsPage from './pages/CommentsPage';
import StopWatchPage from './pages/StopWatchPage';

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

          <Route
            path='/stop-watch'
            element={<StopWatchPage/>}
          >
            stop-watch
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
