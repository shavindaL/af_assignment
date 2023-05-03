import {BrowserRouter,Route, Routes} from 'react-router-dom'
import Home from './pages/Home'
import AdminDashboard from './pages/AdminDashboard'
import PoliticalParties from './pages/PoliticalParties';

function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/admin-dashboard' element={<AdminDashboard />} />
        <Route path='/political-parties' element={<PoliticalParties />} />
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
