const mongoose = require("mongoose");
const db = async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.MONGO_URL);
    console.log("db connected reisss");
  } catch (error) {
    console.log("konsol bağlantısında hata var");
  }
};

module.exports = { db };
