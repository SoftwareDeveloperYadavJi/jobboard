import mongoose, { Schema} from "mongoose";


const jobSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    company: { type: String, required: true },
    location: { type: String, required: true },
    salary: { type: Number, required: true },
    type: { type: String, required: true },
    datePosted: { type: Date, default: Date.now },
    isRemote: { type: Boolean, default: false },
    companyWebsite: { type: String, required: true },
    companyEmail: { type: String, required: true },
    companyPhone: { type: String, required: true },
    companyDescription: { type: String, required: true },
    companySize: { type: String, required: true },
    companyIndustry: { type: String, required: true },
    companyFounded: { type: Date, required: true },
    companyLinkedIn: { type: String, required: true },
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin',
        required: true
    }
}, { timestamps: true });



const Job = mongoose.model('Job', jobSchema);
export default Job;

