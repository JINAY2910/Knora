import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please provide a name"],
        },
        email: {
            type: String,
            required: [true, "Please provide an email"],
            unique: true,
        },
        image: {
            type: String,
        },
        department: {
            type: String,
        },
        skills: {
            type: [String],
            default: []
        },
        // We can store a mock progress map here or user's courses
        progress: {
            type: Map,
            of: Number,
            default: {}
        },
        goals: [
            {
                title: String,
                date: String,
                month: String,
                type: { type: String, enum: ['PRACTICE', 'MOCK TEST', 'READING', 'VIDEO'] },
                duration: String,
            }
        ],
        learningVelocity: [
            {
                date: String,
                value: { type: Number, default: 0 },
            }
        ],
        role: {
            type: String,
            enum: ['student', 'admin'],
            default: 'student'
        }
    },
    {
        timestamps: true,
    }
);

// Prevent mongoose from recreating the model if it already exists
export default mongoose.models.User || mongoose.model("User", UserSchema);
