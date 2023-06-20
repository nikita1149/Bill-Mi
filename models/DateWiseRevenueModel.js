import mongoose, {model,models} from "mongoose";

const dateWiseRevenueSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
    },
    revenue: {
        type: Number,
        required: true,
    },
});

export default models.DateWiseRevenue || model('DateWiseRevenue', dateWiseRevenueSchema);
