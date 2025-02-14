const validateData = (req, res, next) => {
    const { flightNumber, origin, destination, arrivalTime, status, seatsAvaliable } = req.body;
  
    if (!flightNumber || !origin || !destination || !arrivalTime || !status || seatsAvaliable == null) {
      return res.status(400).json({ error: "Todos os campos são obrigatórios" })
    }
  
    if (!["PREVISTO", "ATRASADO", "CANCELADO", "EMBARQUE ENCERRADO", "DESEMBARQUE INICIADO"].includes(status)) {
      return res.status(400).json({ error: "Status inválido" })
    }
  
    next()
  }
  
  module.exports = validateData