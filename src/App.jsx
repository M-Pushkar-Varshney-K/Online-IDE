import './App.css'
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Edit from './components/Edit'
import Output from './components/output'

function App() {

  return (
    <main>
    <section className='Editor'>
      <Edit/>
    </section>
    <aside className='Running'>
      <Output/>
    </aside>
    </main>
  )
}

export default App
