import List from "../models/List.js";
import * as date from "../utils/date.js";
import _ from "lodash";

// Placeholder controller functions related to lists
const getCustomList = async (req, res) => {
    try {
        const customListName = _.capitalize(req.params.customList);
        const foundItems = await List.findOne({ name: customListName });

        if (!foundItems) {
            const list = new List({
                name: customListName,
                items: []
            });

            await list.save();
            res.redirect("/" + customListName);
        } else {
            res.render("main", { today: date.getDate(), listTitle: foundItems.name, items: foundItems.items });
        }
    } catch (error) {
        console.error(error);
    }
};

export default {
    getCustomList
};
