import { useState } from 'react'
import './App.css'
import { Header } from './components/Header'
import Footer from './components/Footer';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='min-h-screen bg-gray-100 font-display'>
        <Header />
        <main className='min-h-screen py-6 px-3 max-w-5xl mx-auto mb-10'>
          <div className='rounded-md overflow-hidden shadow-xl'>
            <div className='bg-linear-to-r from-primary-green to-primary-green-light p-4 md:p-6 border-b border-primary-yellow'>
              <h1 className='font-bold text-white text-xl md:text-2xl'>Calculate your GWA</h1>
              <p className='text-white text-xs md:text-sm'>Enter your courses, corresponding units, grades, and calculate your GWA.</p>
            </div>
            <div className='min-h-screen p-4 md:p-6'>
              <h1 className='font-bold text-primary-green text-xl md:text-2xl'>Enter your courses:</h1>
            </div>
          </div>
        </main>
        <Footer/>
      </div>
    </>
  )
}

export default App
