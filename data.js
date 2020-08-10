const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DataSchema = new Schema({
    eml: String,
    v:String,
    session : String,
    id: String,
    time: String
});

const DataModel = mongoose.model("DataIOT2", DataSchema, "data"); //data คือชื่อ collection ที่อยู่ใน atlas

module.exports = DataModel;