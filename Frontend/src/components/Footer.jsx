import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

const Footer = () => {
  const [dateTime, setDateTime] = useState(new Date().toLocaleString());

  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(new Date().toLocaleString())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <footer className="bg-dark text-light border-top border-5 border-white py-3 mt-auto">
      <div className="container text-start">
        <small>desenvolvido por Rafael</small>
        <div><span>Data e Hora Atuais: </span>{dateTime}</div>
      </div>
      
    </footer>
  )
}

export default Footer
