import Helmet from 'react-helmet'
import { Route, Routes, useLocation } from 'react-router-dom'
import favicon from './assets/bm-11.webp'
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import Signup from './pages/signup/Signup'
import Error from './pages/Error/Error'
import Navigation from './components/Navigation'
import { AnimatePresence } from 'framer-motion'

function App() {
  const location = useLocation()
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <link rel="shortcut icon" href={favicon} type="image/x-icon" />
        <title>Bitmama - Buy And Sell Cryptocurrencies Easily With Trust</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <main>
        <Navigation />
        <AnimatePresence>
          <Routes location={location} key={location.key}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </AnimatePresence>
      </main>
    </>
  )
}

export default App
