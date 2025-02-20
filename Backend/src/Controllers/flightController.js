const {Flight} = require('../Models')
const validateData = require('../Middlewares/validateData')
// const cacheControl = require('../Cache/redisCacheConfiguration')


const getFlights = async (req,res) => {
    try {
        // const cacheKey = 'flights'
        // const cachedFlights = await cacheControl.get(cacheKey)
        // if(cachedFlights) {
            // console.log('dados recuperados do redis.')
            // return res.json(JSON.parse(cachedFlights))
        // }
        const flights = await Flight.findAll()
        // await cacheControl.setEx(cacheKey,3600,JSON.stringify(flights))
        // console.log('dados recuperados da base e armazenados no cache do redis com sucesso.')
        res.json(flights)
    }
    catch (err) {
        res.status(500).json({error: err.message})
    }
}

const getFlightById = async (req,res) => {
    try {
        const flightId = req.params.id.trim().replace(/\r?\n|\r/g, "")
        if (!/^[0-9a-fA-F-]{36}$/.test(flightId)) {
            return res.status(400).json({ error: "ID inválido para UUID" })
          }
        const flight = await Flight.findByPk(req.params.id)
        if (!flight) {
            return res.status(404).json({error: 'Vôo não encontrado no sistema.'})
        }
        res.json(flight)
    }
    catch (err) {
        res.status(500).json({error: err.message})
    }
}

const createFlight = async (req,res) => {
    try {
        validateData(req,res,async () => {
            const flight = await Flight.create(req.body)
            res.status(201).json(flight)
        })
    }
    catch(err) {
        res.status(400).json({error: err.message})
    }
}

const updateFlight = async (req,res) => {
    try {
        const flight = await Flight.findByPk(req.params.id)
        if(!flight) {
            throw new Error('Vôo não encontrado')
        }

        validateData(req,res,async () => {
            await flight.update(req.body)
            res.json(flight)
        })
    } catch(err) {
        console.error('Erro ao atualizar vôo')
        res.status(err.message == 'Vôo não cadastrado no sistema' ? 404 : 400).json({error: err.message})
    }
}

const deleteFlight = async (req,res) => {
    try {
        const flight = await Flight.findByPk(req.params.id)
        if(!flight) {
            throw new Error('Vôo não encontrado')
        }
        await flight.destroy()
        res.status(204).send()
    }
    catch(err) {
        console.log('Erro ao excluir vôo: ',err)
        res.status(err.message == 'Vôo não cadastrado no sistema' ? 404 : 500).json({error: err.message})
    }
}

const patchFlight = async (req,res) => {
    try {
        const flight = await Flight.findByPk(req.params.id)
        if(!flight) {
            throw new Error('Vôo não encontrado')
        }
        await flight.update(req.body,{fields: Object.keys(req.body)})
    }
    catch (err) {
        console.error('Erro ao atualizar parcialmente esse vôo')
        res.status(err.message === 'Vôo não encontrado' ? 404 : 400).json({error:err.message})
    }
}

module.exports = { getFlights, getFlightById,createFlight,updateFlight,deleteFlight,patchFlight}