import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {jwtDecode} from 'jwt-decode'
import authService from '../services/authService'
import axios from 'axios'
import FlightCard from '../components/FlightCard'



const Home = () => {
  const [flights, setFlights] = useState([])
  const [username, setUsername] = useState('Usuário autenticado com sucesso')
  const navigate = useNavigate()

  useEffect(() => {
    const token = authService.getToken()
    if (token) {
      try {
        const decoded_token = jwtDecode(token)
        if (decoded_token && decoded_token.name) {
          setUsername(decoded_token.name)
        }
      } catch (err) {
        console.error('Erro ao decodificar o token jwt:', err)
      }
    }
  }, [])

  useEffect(() => {
    const fetchFlights = async () => {
      const token = authService.getToken()
      if (token) {
        try {
          const response = await axios.get('http://localhost:3008/flightManager/flights', {
            headers: { Authorization: `Bearer ${token}` },
          });
          setFlights(response.data);
        } catch (err) {
          console.error('Erro ao buscar os vôos disponíveis.');
        }
      }
    }
    fetchFlights()
  }, [])

  const handleDeleteFlight = (flightId) => {
    setFlights((prevFlights) => prevFlights.filter((flight) => flight.id !== flightId))
  }

  const handleCreateFlight = () => {
    navigate('/novo')
  }

  return (
    <div className="container-fluid mt-1" style={{ 
        backgroundImage: "url('https://wallpapers.com/images/hd/minimalist-aero-airplanes-utiaoigq834k5nsp.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        padding: '20px'
    }}>
    <div className="d-flex justify-content-between text-white align-items-center">
            <h1 className="mt-3">Olá {username}, seja bem-vindo</h1>
          <div className="d-flex gap-2">
              <button className="btn btn-outline-success" onClick={handleCreateFlight}>
                   Cadastrar Novo Vôo no Sistema
              </button>
           <a href="/" className="btn btn-outline-danger text-decoration-none text-white">
            Sair
        </a>
    </div>
</div>


        <hr className="text-white" />
        <h1 className="text-center text-white mb-5 mt-2">Programação do dia</h1>
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            {flights.map((flight) => (
                <FlightCard key={flight.id} flight={flight} onDelete={handleDeleteFlight} />
            ))}
        </div>
    </div>
  )
}

export default Home