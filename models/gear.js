import mongoose from 'mongoose'

const Schema = mongoose.Schema

const gearSchema = new Schema({
  name: {type: String, required: true},
  type: {type: String, required: true},
  description: {type: String},
  owner: {type: mongoose.Schema.Types.ObjectId, ref: "Profile"},
}, {
  timestamps: true
})

const Gear = mongoose.model('Gear', gearSchema)

export {
  Gear
}