import { Pedal } from '../models/pedal.js'

function create(req, res) {
  req.body.owner = req.user.profile
  Pedal.create(req.body)
  .then(pedal => {
    Pedal.findById(pedal._id)
    .populate('owner')
    .then(populatedPedal => {
      res.json(populatedPedal)
    })
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({err: err.errmsg})
  })
}

export {
  create
}