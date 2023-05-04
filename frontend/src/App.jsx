import {BrowserRouter,Route, Routes} from 'react-router-dom'
import Home from './pages/Home'
import CandidateLogin from './pages/CandidateLogin'
import AdministratorLogin from './pages/AdministratorLogin'
import ElectionResults from './pages/ElectionResults'

function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/CandidateLogin' element={<CandidateLogin />}/>
        <Route path='/AdministratorLogin' element={<AdministratorLogin />}/>
        <Route path='/Electionresults' element={<ElectionResults />}/>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App