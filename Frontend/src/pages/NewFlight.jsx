import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import {toast} from 'react-toastify'
import 'react-toastify/ReactToastify.css'

const NewFlight = () => {

    const navigate = useNavigate()

    const [flightData,setFlightData] = useState({
        flightNumber:'',
        airlineImage:'',
        origin:'',
        destination:'',
        arrivalTime:'',
        status:'',
        seatsAvaliable:'',
    })

    const [errors, setErrors] = useState({})

    const validate = () => {
        const errors = {}
        if (!flightData.flightNumber) errors.flightNumber = 'O Número do Vôo é Obrigatório'
        if (!flightData.airlineImage) errors.airlineImage = 'É necessário fornecer a companhia aérea que está operando o vôo'
        if (!flightData.origin) errors.origin = 'é preciso escolher uma origem'
        if (!flightData.destination) errors.destination = 'é preciso escolher o destino do vôo'
        if (!flightData.arrivalTime) errors.arrivalTime = 'forneça uma data e a hora de chegada'
        if (!flightData.status) errors.status = 'Forneça o atual estado do vôo'
        if(!flightData.seatsAvaliable || isNaN(flightData.seatsAvaliable) || flightData.seatsAvaliable < 0) errors.seatsAvaliable = 'Número de assentos deve ser válido'
        
        return errors
    }

    const handleChange = (e) => {
        const {name, value} = e.target
        setFlightData({
            ...flightData,
            [name]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const validationErrors = validate()
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors)
            return
        }

        try {
            await axios.post('http://localhost:3008/flightManager/flights/novo', flightData, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            })

            window.alert('Vôo Cadastrado com sucesso')

            setTimeout(() => navigate('/home'), 1000)
        } catch (err) {
            console.error('Erro ao cadastrar voo:', err)
        }
    }

    const handleBack = () => {
        navigate('/home')
    }

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light" 
     style={{ 
        backgroundImage: "url('https://www.airport-technology.com/wp-content/uploads/sites/14/2022/01/shutterstock_758602234-min-scaled-e1641297696653.jpg')", 
        backgroundSize: 'cover', 
        backgroundPosition: 'center', 
        backgroundAttachment: 'fixed'
     }}>
    <div className="card-shadow p-4 bg-light" 
         style={{ width: '400px', maxHeight: '90vh', overflow: 'auto' }}>
        <h2 className="text-center mb-4">Cadastrar Vôo</h2>
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label className="form-label">Número do vôo</label>
                <input type="text" className="form-control" name="flightNumber" value={flightData.flightNumber} onChange={handleChange} />
                {errors.flightNumber && <small className="text-danger">{errors.flightNumber}</small>}
            </div>
            <div className="mb-3">
                <label className="form-label">Companhia Aérea <span>(link)</span></label>
                <input type="text" className="form-control" name="airlineImage" value={flightData.airlineImage} onChange={handleChange} />
                {errors.airlineImage && <small className="text-danger">{errors.airlineImage}</small>}
            </div>
            <div className="mb-3">
                <label className="form-label">Origem</label>
                <input type="text" className="form-control" name="origin" value={flightData.origin} onChange={handleChange} />
                {errors.origin && <small className="text-danger">{errors.origin}</small>}
            </div>
            <div className="mb-3">
                <label className="form-label">Destino</label>
                <input type="text" className="form-control" name="destination" value={flightData.destination} onChange={handleChange} />
                {errors.destination && <small className="text-danger">{errors.destination}</small>}
            </div>
            <div className="mb-3">
                <label className="form-label">Data e Hora de Chegada</label>
                <input type="datetime-local" className="form-control" name="arrivalTime" value={flightData.arrivalTime} onChange={handleChange} />
                {errors.arrivalTime && <small className="text-danger">{errors.arrivalTime}</small>}
            </div>
            <div className="mb-3">
                <label className="form-label">Status</label>
                <select className="form-select" name="status" value={flightData.status} onChange={handleChange}>
                    <option value="">Selecione o Status</option>
                    <option value="PREVISTO">PREVISTO</option>
                    <option value="ATRASADO">ATRASADO</option>
                    <option value="CANCELADO">CANCELADO</option>
                    <option value="EMBARQUE INICIADO">EMBARQUE INICIADO</option>
                    <option value="ÚLTIMA CHAMADA">ÚLTIMA CHAMADA</option>
                    <option value="DESEMBARQUE INICIADO">DESEMBARQUE INICIADO</option>
                </select>
                {errors.status && <small className="text-danger">{errors.status}</small>}
            </div>
            <div className="mb-3">
                <label className="form-label">Assentos Disponíveis</label>
                <input type="number" className="form-control" name="seatsAvaliable" value={flightData.seatsAvaliable} onChange={handleChange} />
                {errors.seatsAvailable && <small className="text-danger">{errors.seatsAvailable}</small>}
            </div>
            <button type="submit" onClick={handleSubmit} className="btn btn-primary w-100">
                Cadastrar Voo
            </button>
        </form>
        <button 
        className="btn btn-secondary w-100 mt-3" 
        onClick={handleBack}
        >
             Voltar para a Página Principal
        </button>
    </div>
   </div>
  )
}

export default NewFlight