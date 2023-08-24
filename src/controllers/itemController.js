import Item from "../models/Item.js";
import List from "../models/List.js";
import * as date from "../utils/date.js";

// Placeholder controller functions related to items
const item1 = new Item({
    name: 'Add /anything at the end of browser url for a new list.'
});

const item2 = new Item({
    name: 'Example: localhost:port/newList'
});

const item3 = new Item({
    name: 'Hit the checkbox to remove a task'
});

const defaultItems = [item1, item2, item3];

const getIndex = async (req, res) => {
    try {
        const foundItems = await Item.find({});
        if(foundItems.length === 0){
            await Item.insertMany(defaultItems);
            res.redirect("/");
        }else{
            res.render("main", { today: date.getDate(), listTitle: "Daily", items: foundItems });
        }
    } catch (error) {
        console.error(error);
    }
};

const postItem = async (req, res) => {
    try {
        const task = req.body.newTask;
        const listTask = req.body.list;
        const item = new Item({
            name: task
        });

        if (listTask === "Daily") {
            await item.save();
            res.redirect("/");
        } else {
            const foundItems = await List.findOne({ name: listTask });
            foundItems.items.push(item);
            foundItems.save();
            res.redirect("/" + listTask);
        }
    } catch (error) {
        console.error(error);
    }
};

const deleteItem = async (req, res) => {
    try {
        const checkedItem = req.body.checkbox;
        const hidden = req.body.hidden;

        if (hidden === "Daily") {
            await Item.findByIdAndRemove(checkedItem);
            res.redirect("/");
        } else {
            await List.findOneAndUpdate({ name: hidden }, { $pull: { items: { _id: checkedItem } } });
            res.redirect("/" + hidden);
        }
    } catch (error) {
        console.error(error);
    }
};

export default {
    getIndex,
    postItem,
    deleteItem
};
