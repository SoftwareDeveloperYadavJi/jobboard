import { z} from "zod";


export const adminSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    phone: z.string().min(1, "Phone number is required"),
    role: z.enum(["admin", "superadmin"]).default("admin"),
    dateJoined: z.date().default(() => new Date()),
    isActive: z.boolean().default(true),
});


export const userSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    resume: z.string().min(1, "Resume is required"),
    phone: z.string().min(1, "Phone number is required"),
    linkedin: z.string().url("Invalid LinkedIn URL"),
    github: z.string().url("Invalid GitHub URL"),
    website: z.string().optional(),
});


export const jobSchema = z.object({
    title: z.string().min(1, "Job title is required"),
    description: z.string().min(1, "Job description is required"),
    company: z.string().min(1, "Company name is required"),
    location: z.string().min(1, "Location is required"),
    salary: z.number().positive("Salary must be a positive number"),
    type: z.enum(["full-time", "part-time", "contract", "internship"]),
    datePosted: z.date().default(() => new Date()),
    isRemote: z.boolean().default(false),
    companyWebsite: z.string().url("Invalid company website URL"),
    companyEmail: z.string().email("Invalid company email address"),
    companyPhone: z.string().optional(),
    companyDescription: z.string().optional(),
    companySize: z.string().optional(),
    companyIndustry: z.string().optional(),
    companyFounded: z.date().optional(),
    companyLinkedIn: z.string().url("Invalid company LinkedIn URL").optional(),
});

export const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
});




