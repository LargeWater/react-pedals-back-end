import { Pedal } from '../models/pedal.js'
import { v2 as cloudinary } from 'cloudinary'

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

function index(req, res) {
  Pedal.find({})
  .populate('owner')
  .then(pedals => {
    res.json(pedals)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({err: err.errmsg})
  })
}

function update(req, res) {
  Pedal.findById(req.params.id)
  .then(pedal => {
    if (pedal.owner._id.equals(req.user.profile)) {
      Pedal.findByIdAndUpdate(req.params.id, req.body, {new: true})
      .then(updatedPedal => {
        res.json(updatedPedal)
      })
    } else {
      res.status(401).json({msg: 'Not Authorized'})
    }
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({err: err.errmsg})
  })
}

function deleteOne(req, res) {
  Pedal.findById(req.params.id)
  .then(pedal => {
    if (pedal.owner._id.equals(req.user.profile)) {
      Pedal.findByIdAndDelete(pedal._id)
      .then(deletedPedal => {
        res.json(deletedPedal)
      })
    } else {
      res.status(401).json({msg: 'Not Authorized'})
    }
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({err: err.errmsg})
  })
}

function addPhoto(req, res) {
  const imageFile = req.files.photo.path
  Pedal.findById(req.params.id)
  .then(pedal => {
    cloudinary.uploader.upload(imageFile, {tags: `${pedal.name}`})
    .then(image => {
      pedal.photo = image.url
      pedal.save()
      .then(pedal => {
        res.status(201).json(pedal.photo)
      })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json(err)
    })
  })
}

export {
  create,
  index,
  update,
  deleteOne as delete,
  addPhoto
}