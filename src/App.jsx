import { Route, Routes, Navigate } from 'react-router-dom';
import LayoutWrapper from './components/layout/Layout/Layout';
import Admin from './pages/Admin/Admin';
import CreatePatient from './pages/Admin/CreatePatient/CreatePatient';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';

import InvestorDetails from './pages/UsersList/InvestorDetails/InvestorDetails';

import CreateUser from './pages/Admin/CreateUser/CreateUser';
import { useAuth } from './components/utils/context';

import PatientList from './pages/UsersList/PatientList/PatientList';
import PatientDetails from './pages/UsersList/PatientDetails';
import RecordsDetail from './pages/UsersList/PatientDetails/RecordsDetail';
import Doctors from './pages/UsersList/DoctorList';
import Doctor from './pages/Doctor';
import AddFiles from './pages/UsersList/PatientDetails/AddFiles';
import Diaries from './pages/UsersList/PatientDetails/Diaries';
import PsychologistNotes from './pages/UsersList/PatientDetails/Psychologist';
import Profile from './pages/Home/Profile';

function App() {
  const { authData } = useAuth();
  const { isAuth } = authData;

  return (
    <Routes>
      {isAuth ? (
        <>
          <Route
            path="/"
            element={
              <LayoutWrapper>
                <Home />
              </LayoutWrapper>
            }
          />
          <Route
            path="/admin"
            element={
              <LayoutWrapper>
                <Admin />
              </LayoutWrapper>
            }
          />
          <Route
            path="/doctor"
            element={
              <LayoutWrapper>
                <Doctor />
              </LayoutWrapper>
            }
          />

          <Route
            path="/admin/create-patient"
            element={
              <LayoutWrapper>
                <CreatePatient />
              </LayoutWrapper>
            }
          />
          <Route
            path="/admin/create-doctor"
            element={
              <LayoutWrapper>
                <CreateUser />
              </LayoutWrapper>
            }
          />
          <Route
            path="/patient-list"
            element={
              <LayoutWrapper>
                <PatientList />
              </LayoutWrapper>
            }
          />
          <Route
            path="/doctor-list"
            element={
              <LayoutWrapper>
                <Doctors />
              </LayoutWrapper>
            }
          />
          <Route
            path="/patient/:id"
            element={
              <LayoutWrapper>
                <PatientDetails />
              </LayoutWrapper>
            }
          />
          <Route
            path="/records/:id"
            element={
              <LayoutWrapper>
                <RecordsDetail />
              </LayoutWrapper>
            }
          />
          <Route
            path="/add-files/:id"
            element={
              <LayoutWrapper>
                <AddFiles />
              </LayoutWrapper>
            }
          />
          <Route
            path="/diaries/:id"
            element={
              <LayoutWrapper>
                <Diaries />
              </LayoutWrapper>
            }
          />
          <Route
            path="/psychologist-notes/:id"
            element={
              <LayoutWrapper>
                <PsychologistNotes />
              </LayoutWrapper>
            }
          />
          <Route
            path="/profile"
            element={
              <LayoutWrapper>
                <Profile />
              </LayoutWrapper>
            }
          />

          <Route
            path="/investor/:id"
            element={
              <LayoutWrapper>
                <InvestorDetails />
              </LayoutWrapper>
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </>
      ) : (
        <>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </>
      )}
    </Routes>
  );
}

export default App;
