import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import VotingCenterSignup from './pages/VotingCenterSignup'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/voting-center/new-account' element={<VotingCenterSignup />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
