import { Pedalboard } from "../models/pedalboard";

function create(req, res) {
  req.body.owner = req.user.profile;
  Pedalboard.create(req.body)
    .then((pedalboard) => {
      Pedalboard.findById(pedalboard._id)
        .populate("owner")
        .then((populatedPedalboard) => {
          res.json(populatedPedalboard);
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ err: err.errmsg });
    });
}

function index(req, res) {
  Pedalboard.find({})
    .populate("owner")
    .then((pedalboards) => {
      res.json(pedalboards);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ err: err.errmsg });
    });
}

function update(req, res) {
  Pedalboard.findById(req.params.id)
    .then((pedalboard) => {
      if (pedalboard.owner._id.equals(req.user.profile)) {
        Pedalboard.findByIdAndUpdate(req.params.id, req.body, { new: true })
          .then((updatedPedalboard) => {
            res.json(updatedPedalboard);
          });
      } else {
        res.status(401).json({ msg: "Not Authorized" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ err: err.errmsg });
    });
}

function deleteOne(req, res) {
  Pedalboard.findById(req.params.id)
    .then((pedalboard) => {
      if (pedalboard.owner._id.equals(req.user.profile)) {
        Pedalboard.findByIdAndDelete(pedalboard._id)
          .then((deletedPedalboard) => {
            res.json(deletedPedalboard);
          });
      } else {
        res.status(401).json({ msg: "Not Authorized" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ err: err.errmsg });
    });
}

export {
  create,
  index,
  update,
  deleteOne as delete,
};



