import mongoose from "mongoose";

const Schema = mongoose.Schema;

const pedalboardSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "Profile" },
    pedals: [{ type: mongoose.Schema.Types.ObjectId, ref: "Pedal" }],
  },
  {
    timestamps: true,
  }
);

const Pedalboard = mongoose.model("Pedalboard", pedalboardSchema);

export { Pedalboard };