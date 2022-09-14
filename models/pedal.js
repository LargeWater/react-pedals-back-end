import mongoose from 'mongoose'

const Schema = mongoose.Schema

const pedalSchema = new Schema({
  name: {type: String, required: true},
  type: {type: String, required: true},
  description: {type: String},
  owner: {type: mongoose.Schema.Types.ObjectId, ref: "Profile"},
}, {
  timestamps: true
})

const Pedal = mongoose.model('Pedal', pedalSchema)

export {
  Pedal
}