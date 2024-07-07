import QRCode from 'react-qr-code'
import './App.css'
import { useState } from 'react'

function App() {
  const [search, setSearch] = useState("")
  return (
    <div className='flex items-center mt-6 flex-col justify-center'>
      <input 
      type="text"
      value={search}
      className='my-3 rounded outline-none border-none px-1 w-[30vw]'
      placeholder='generate qr'
      onChange={(e) => setSearch(e.target.value)}
      />

      <QRCode 
      size={256}
      style={
        {height: "30%", width: "30%", maxWidth: "100%"}
      }
      value={search}
      viewBox={`0 0 256 256`}
      />
    </div>
  )
}

export default App
