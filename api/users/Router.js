const app = require('express')
const router = app.Router()

const { Dummy, login, signup, allUsers, getUserbyEmail, userbyEmail } = require('./Controller')

router.post('/users', Dummy)
router.post('/signup', signup)
router.post('/login', login)
router.get('/getallusers', allUsers)
router.get('/userbyemail/:email', getUserbyEmail)
router.get('/getuserbyemail', userbyEmail) // this is done using query params

module.exports = router
