import mongoose from "mongoose";

const ApartmentSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    price: Number,
    location: String,
    image: {
      type: String,
      required: true, // URL тул зайлшгүй шаардлагатай байлгаж болно
    },
  },
  { timestamps: true }
);

export default mongoose.models.Apartment ||
  mongoose.model("Apartment", ApartmentSchema);
