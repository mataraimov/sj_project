import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import LayoutWrapper from './components/layout/Layout/Layout';
import Admin from './pages/Admin/Admin';
import CreatePatient from './pages/Admin/CreatePatient/CreatePatient';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import DeveloperDetails from './pages/UsersList/DeveloperDetails/DeveloperDetail';
import DeveloperList from './pages/UsersList/DeveloperList/DeveloperList';
import InvestorDetails from './pages/UsersList/InvestorDetails/InvestorDetails';
import Projects from './pages/Projects/Projects';
import ProjectsDetails from './pages/Projects/ProjectsDetails';
import CreateUser from './pages/Admin/CreateUser/CreateUser';
import { useAuth } from './components/utils/context';
import PatientList from './pages/UsersList/PatientList/PatientList';
import Doctor from './pages/Doctor/Doctor';
import RecordsDetail from './pages/UsersList/DeveloperDetails/RecordsDetail';

function App() {
  const { authData } = useAuth();
  const { isAuth } = authData;

  return (
    <BrowserRouter>
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
              path="/projects"
              element={
                <LayoutWrapper>
                  <Projects />
                </LayoutWrapper>
              }
            />
            <Route
              path="/projects/id"
              element={
                <LayoutWrapper>
                  <ProjectsDetails />
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
              path="/developer-list"
              element={
                <LayoutWrapper>
                  <DeveloperList />
                </LayoutWrapper>
              }
            />
            <Route
              path="/investor-list"
              element={
                <LayoutWrapper>
                  <PatientList />
                </LayoutWrapper>
              }
            />
            <Route
              path="/patient/:id"
              element={
                <LayoutWrapper>
                  <DeveloperDetails />
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
    </BrowserRouter>
  );
}

export default App;
