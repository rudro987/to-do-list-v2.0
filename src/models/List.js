import mongoose from "mongoose";

const itemsSchema = new mongoose.Schema({
    name: String
});

const listSchema = new mongoose.Schema({
    name: String,
    items: [itemsSchema]
});

const List = mongoose.model('List', listSchema);

export default List;