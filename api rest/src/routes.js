const uploadConfig = require('./config/upload')

const express = require('express')
const multer = require('multer')

const SessionController = require('./controllers/SessionController')
const SpotController = require('./controllers/SpotController')
const DashboardController = require('./controllers/DashboardController')
const BookingController = require('./controllers/BookingController')
const ApprovalController = require('./controllers/ApprovalController')
const RejectionController = require('./controllers/RejectionController')

const routes = express.Router()
const upload = multer(uploadConfig)

routes.post('/sessions', SessionController.store)

routes.get('/spots', SpotController.index)
routes.post('/spots', upload.single('thumbnail'), SpotController.store)

routes.get('/dashboard', DashboardController.show)

//                  :variavel
routes.post('/spots/:spot_id/bookings', BookingController.store)

routes.post('/bookings/:booking_id/approval', ApprovalController.store)
routes.post('/bookings/:booking_id/rejection', RejectionController.store)

module.exports = routes