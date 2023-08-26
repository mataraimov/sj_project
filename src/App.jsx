import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import LayoutWrapper from './components/layout/Layout/Layout';
import Admin from './pages/Admin/Admin';
import CreateDeveloper from './pages/Admin/CreateDeveloper/CreateDeveloper';
import CreateInvestor from './pages/Admin/CreateInvestor/CreateInvestor';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import DeveloperList from './pages/UsersList/DeveloperList/DeveloperList';
import InvestorList from './pages/UsersList/InvestorList/InvestorList';

function App() {
  const access_token = localStorage.getItem('access_token');

  return (
    <BrowserRouter>
      <Routes>
        {access_token ? (
          <>
            <Route path='/' element={<LayoutWrapper><Home /></LayoutWrapper>} />
            <Route path='/admin' element={<LayoutWrapper><Admin /></LayoutWrapper>} />
            <Route path='/admin/create-investor' element={<LayoutWrapper><CreateInvestor /></LayoutWrapper>} />
            <Route path='/admin/create-developer' element={<LayoutWrapper><CreateDeveloper /></LayoutWrapper>} />
            <Route path='/developer-list' element={<LayoutWrapper><DeveloperList /></LayoutWrapper>} />
            <Route path='/investor-list' element={<LayoutWrapper><InvestorList /></LayoutWrapper>} />
            <Route path='*' element={<Navigate to="/" />} />
          </>
        ) : (
          <>
            <Route path='/login' element={<Login />} />
            <Route path='*' element={<Navigate to="/login" />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
