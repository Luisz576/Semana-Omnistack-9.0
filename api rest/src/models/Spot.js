const mongoose = require('mongoose')

const SpotSchema = new mongoose.Schema({
    thumbnail: String,
    company: String,
    price: Number,
    techs: [String],
    user: {
        type: mongoose.Schema.Types.ObjectId, //id gerado quando se crea um usuario
        ref: 'User'
    }
}, {
    toJSON: {
        virtuals: true,
    }
})

SpotSchema.virtual('thumbnail_url').get(function(){
    return encodeURI(`/files/${this.thumbnail}`)
})

module.exports = mongoose.model('Spot', SpotSchema)