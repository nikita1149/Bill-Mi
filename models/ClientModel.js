import mongoose, {model, models} from "mongoose";

const clientSchema = new mongoose.Schema({
    phone: {
        type: String,
        required: true,
        unique: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
    },
    address: {
        type: String,
    },
    modeOfDelivery: {
        type: String,
    },
    modeOfPayment: {
        type: String,
    },
    invoices: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Invoice',
        }
    ]

})

export default models.Client || model('Client', clientSchema)