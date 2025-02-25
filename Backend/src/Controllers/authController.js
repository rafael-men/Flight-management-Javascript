const bcrypt =  require('bcryptjs')
const jwt = require('jsonwebtoken')
const {validationResult} = require('express-validator')
const User = require('../Models/user')
require("dotenv").config()

const register = async (req,res) => {
    try {
        const errors = validationResult(req)
        if(!errors.isEmpty()) {
            return res.status(400).json({errors:errors.array()})
        }
        const {name,email,password} = req.body
        const hashedPassword = await bcrypt.hash(password,10)
        const user = await User.create({name,email,password: hashedPassword})
        res.status(201).json({message: 'Usuário Salvo'})
    }
    catch (err) {
        res.status(500).json({error: err.message})
    }
}


const login = async (req,res) => {
    try {
        const {email,password} = req.body
        const user = await User.findOne({where: {email}})
        if(!user) {
            return res.status(401).json({error: 'Credenciais Inválidas'})
        }
        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch) {
            return res.status(401).json({error: 'Dados Inválidos'})
        }
        const token = jwt.sign({id:user.id,name:user.name,email: user.email},process.env.JWT_SECRET,{
            expiresIn:'1h',
        })

        res.json({token})
    }
    catch(err) {
        res.status(500).json({error: err.message})
    }
}

module.exports = {register, login}