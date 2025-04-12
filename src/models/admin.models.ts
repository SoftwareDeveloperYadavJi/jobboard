import mongoose , {Schema} from "mongoose";
import bcrypt from "bcrypt";



const adminSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    role: { type: String, enum: ['admin', 'superadmin'], default: 'admin' },
    dateJoined: { type: Date, default: Date.now },
    isActive: { type: Boolean, default: true }
});



adminSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});


const Admin = mongoose.model('Admin', adminSchema);
export default Admin;
