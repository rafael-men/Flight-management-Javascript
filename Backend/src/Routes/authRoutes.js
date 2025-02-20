const express = require('express')
const {check} = require('express-validator')
const {register,login} = require('../Controllers/authController')

const router = express.Router()

router.post(
    '/register',[
        check('name','o nome é obrigatório').not().isEmpty(),
        check('email','insira um email válido').not().isEmpty(),
        check('password','a senha deve ter 6 caracteres').isLength({min:6}),
    ],
    register
)

router.post('/login',login)

module.exports = router