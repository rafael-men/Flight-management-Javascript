import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import authService from '../services/authService'

const Register = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      alert('Por favor, insira um email válido.')
      return
    }
    if (password.length < 6) {
      alert('A senha deve ter pelo menos 6 caracteres.')
      return
    }

    try {
      await authService.register(name, email, password)
      navigate('/login')
    } catch (error) {
      console.error('Erro ao fazer registro:', error)
    }
  }

  return (
    <div
      className="d-flex justify-content-center align-items-center min-vh-100"
      style={{
        backgroundImage: "url('https://www.airport-technology.com/wp-content/uploads/sites/14/2022/01/shutterstock_758602234-min-scaled-e1641297696653.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="card w-100" style={{ maxWidth: '400px', opacity: '0.95' }}>
        <div className="card-body">
          <h2 className="card-title text-center mb-4">Criar Conta</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="text"
                placeholder="Nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="form-control"
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="form-control"
                minLength="6"
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Registrar
            </button>
          </form>
          <div className="text-center mt-3">
            <p>
              Já tem uma conta?{' '}
              <Link to="/login" className="text-decoration-none">
                Entre
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
