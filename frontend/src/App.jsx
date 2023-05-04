import {BrowserRouter,Route, Routes} from 'react-router-dom'
import Home from './pages/Home'
import AdminDashboard from './pages/AdminDashboard'
import PoliticalParties from './pages/PoliticalParties';
import NewPoliticalParty from './pages/NewPoliticalParty';
import CandidateLogin from './pages/candidateLogin';
import AdministratorLogin from './pages/AdministratorLogin';
import InquiryForm from './pages/InquiryForm';

function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/admin-dashboard' element={<AdminDashboard />} />
        <Route path='/political-parties' element={<PoliticalParties />} />
        <Route path='/political-parties/new' element={<NewPoliticalParty />} />
        <Route path='/CandidateLogin' element={<CandidateLogin />}/>
        <Route path='/AdministratorLogin' element={<AdministratorLogin />}/>
        <Route path='/InquiryForm' element={<InquiryForm />}/>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
