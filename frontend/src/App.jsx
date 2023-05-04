import {BrowserRouter,Route, Routes} from 'react-router-dom'
import Home from './pages/Home'
import AdminDashboard from './pages/AdminDashboard'
import PoliticalParties from './pages/PoliticalParties';
import NewPoliticalParty from './pages/NewPoliticalParty';

function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/admin-dashboard' element={<AdminDashboard />} />
        <Route path='/political-parties' element={<PoliticalParties />} />
        <Route path='/political-parties/new' element={<NewPoliticalParty />} />
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
