const { Bearer, Basic } = require('permit')
const JWT = require('jsonwebtoken')

const jwtSecret = '.]y#rg9C43evhEsy'
const jwtAlgorithm = 'HS256'
const jwtExpiresIn = '7 days'

const login = (req, res, next) => {
    const permit = new Basic({
        query: ['username', 'password']
    })
    const credentials = permit.check(req)
    
    if(!credentials) {
        permit.fail(res)
        throw new Error('Authentication required!')
    }

    const [ username, password ] = credentials

    if(password !== 'elephant') {
        permit.fail(res)
        throw new Error('Authentication required!')
    }

    // create a jwt token
    const jwtPayload = {
        user_id: 1
    }
    const token = JWT.sign(
        jwtPayload,
        jwtSecret,
        {
            expiresIn: jwtExpiresIn,
            algorithm: jwtAlgorithm
        }
    )

    req.token = token

    next()
    
}

const authenticate = (req, res, next) => {

    const permit = new Bearer()

    const token = permit.check(req)

    if(!token) {
        permit.fail(res)
        throw new Error(`Authentication required!`)
    }

    // decoded jwt
    try {
        const decoded = JWT.verify(token, jwtSecret)
        req.user = {user_id: decoded.user_id}
        next()
    } catch(err) {
        permit.fail(res)
        throw new Error(`Authentication failed!`)
    }

}

module.exports = {
    authenticate,
    login
}