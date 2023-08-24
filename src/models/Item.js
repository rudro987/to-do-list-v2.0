import mongoose from "mongoose";

const itemsSchema = new mongoose.Schema({
    name: String
});

const Item = mongoose.model('Item', itemsSchema);

export default Item;