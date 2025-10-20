import { useState } from 'react'
import '@flaticon/flaticon-uicons/css/all/all.css'
import Navbar from './components/navbar'
import Manager from './components/manager'
import Footer from './components/footer'
function App() {
  const [count, setCount] = useState(0)
  return (
    <>
    <Navbar/>
<div className='bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(252,205,238,.5)_100%)'> <Manager/></div>   
    <Footer/>
    </>
  )
}

export default App
