import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import LayoutWrapper from './components/layout/Layout/Layout';
import Admin from './pages/Admin/Admin';
import CreateInvestor from './pages/Admin/CreateInvestor/CreateInvestor';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import DeveloperDetails from './pages/UsersList/DeveloperDetails/DeveloperDetail';
import DeveloperList from './pages/UsersList/DeveloperList/DeveloperList';
import InvestorDetails from './pages/UsersList/InvestorDetails/InvestorDetails';
import InvestorList from './pages/UsersList/InvestorList/InvestorList';
import Projects from './pages/Projects/Projects';
import ProjectsDetails from './pages/Projects/ProjectsDetails';
import CreateUser from './pages/Admin/CreateDeveloper/CreateDeveloper';

function App() {
  const access_token = localStorage.getItem('access_token');

  return (
    <BrowserRouter>
      <Routes>
        {access_token ? (
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
              path="/admin/create-investor"
              element={
                <LayoutWrapper>
                  <CreateInvestor />
                </LayoutWrapper>
              }
            />
            <Route
              path="/admin/create-developer"
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
                  <InvestorList />
                </LayoutWrapper>
              }
            />
            <Route
              path="/developer/:id"
              element={
                <LayoutWrapper>
                  <DeveloperDetails />
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
