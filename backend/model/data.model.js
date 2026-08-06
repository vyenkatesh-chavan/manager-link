import mongoose from "mongoose";

const linkSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    url: {
      type: String,
      required: true,
    },

    username: {
      type: String,
    },

    password: {
      type: String,
      required: true,
    },

    notes: {
      type: String,
      default: "",
    },
  },
  {
    _id: true,
  }
);

const dataSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    categoryName: {
      type: String,
      required: true,
    },

    links: [linkSchema],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Data", dataSchema);