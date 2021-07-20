const Booking = require('../models/Booking')

module.exports = {
    async store(req, res){
        const { booking_id } = req.params
        const { user_id } = req.headers
        const booking = await Booking.findById(booking_id).populate('spot')
        if(booking.spot.user._id == user_id){
            booking.approved = false
            await booking.save()
            const bookingUserSocket = req.connectedUsers[booking.user]
            if(bookingUserSocket) req.io.to(bookingUserSocket).emit('booking_response', booking)
            return res.json(booking)
        }
        return res.json({error: 'Permissão negada'})
    }
}