import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { PrivateLayout } from './components/common';
import { AdminLayout } from './components/layouts';
import LoginPage from './features/auth/pages/loginPage';
import { Dashboard } from './features/dashboard/dashboard';
import AddEditPage from './features/student/pages/addEditPage';
import ListPage from './features/student/pages/listPage';
import { Student } from './features/student/student';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<PrivateLayout>{/* <AdminLayout /> */}</PrivateLayout>}>
          <Route path="admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="students" element={<Student />}>
              <Route index element={<ListPage />} />
              <Route path="add" element={<AddEditPage />} />
              <Route path=":studentId" element={<AddEditPage />} />
            </Route>
          </Route>
        </Route>
        <Route path="*" />
      </Routes>
      {/* <ToastContainer /> */}
    </div>
  );
}

export default App;
