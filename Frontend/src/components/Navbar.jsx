import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import image from '../../public/icon.png'

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand text-light" href="/">
          Gerenciamento de Vôos
          <img src={image} alt="logo" width='20' height='20' className='mx-2'/>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
      </div>
    </nav>
  )
}

export default Navbar
