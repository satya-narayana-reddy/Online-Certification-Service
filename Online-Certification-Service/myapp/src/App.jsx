import Login from './Components/Authentication/Login';
import { app } from './firebase';
import { BrowserRouter, Routes,Route,Link } from 'react-router-dom';
import PrivateRouteLayout from './Components/Layouts/PrivateRouteLayout';
import Certificate from './Components/Dashboard/certificate';
import PrivateRouteStudent from './Components/Layouts/PrivateRouteStudent';
import Dashboard from './Components/Dashboard/dashboard';
import Signup from './Components/Authentication/Signup';
import ForgotPassword from './Components/Authentication/forgotpassword/ForgotPassword';
function App() {
  return (
    <BrowserRouter>
    <Routes>
      {/* public routes */}
      <Route path='/' element={<Login />} />
      <Route path='/signup' element={<Signup/>} />
      <Route path='/forgotpassword' element={<ForgotPassword/>} />

      {/* this is private route */}
      <Route element={<PrivateRouteLayout />}> 
      <Route path='/admin/dashboard' element={<Dashboard />} />
      </Route>
      <Route element={<PrivateRouteStudent />}>
        <Route path='/student/dashboard' element={<Certificate />} />
      </Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
