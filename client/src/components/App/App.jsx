

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from '../Header'
import Footer from '../Footer'
import IndexPage from '../../pages/IndexPage/IndexPage';
import { SessionProvider } from '../../context/SessionContext';


function App() {
  return (
    <SessionProvider>
       <Router>
        <IndexPage />
      </Router>
    </SessionProvider>
  )
}

export default App
