import mongoose, {model, models} from "mongoose";

const userSchema = new mongoose.Schema({
    miId: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    has2FA: {
        type: Boolean,
        required: true,
        default: false,
    },
    secret2FA: {
        type: String,
        required: false,
    }
})

export default models.User || model('User', userSchema)
