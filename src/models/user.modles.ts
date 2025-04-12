import mongoose , {Schema} from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    linkedin: { type: String, required: true },
    github: { type: String, required: true },
    website: { type: String},
    dateJoined: { type: Date, default: Date.now },
    isActive: { type: Boolean, default: true }
});


userSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

userSchema.methods.comparePassword = async function(password: string) {
    return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);
export default User;

