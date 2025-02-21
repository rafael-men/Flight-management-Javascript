const express = require('express')
const {check} = require('express-validator')
const {register,login} = require('../Controllers/authController')

const router = express.Router()


/**
 * @swagger
 * /register:
 *   post:
 *     summary: Registra um novo usuário
 *     tags: [Autenticação]
 *     security: [] 
 */
router.post(
    '/register',[
        check('name','o nome é obrigatório').not().isEmpty(),
        check('email','insira um email válido').not().isEmpty(),
        check('password','a senha deve ter 6 caracteres').isLength({min:6}),
    ],
    register
)

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Autentica um usuário e retorna um token JWT
 *     tags: [Autenticação]
 *     security: [] 
 */
router.post('/login',login)

module.exports = router