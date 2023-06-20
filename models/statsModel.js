import mongoose, {model, models} from "mongoose";

const statsSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
    },
    totalInvoices: {
        type: Number,
        required: true,
    },
    totalClients: {
        type: Number,
        required: true,
    },
    totalRevenue: {
        type: Number,
        required: true,
    },
    totalProductsSold: {
        type: Number,
        required: true,
    },

});

export default models.Stats || model('Stats', statsSchema);