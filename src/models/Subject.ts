import mongoose from "mongoose";

const PriorityTopicSchema = new mongoose.Schema({
    title: String,
    type: String, // "read", "video", "practice", "interactive"
    duration: String,
    difficulty: String, // "LOW", "MEDIUM", "HIGH", "HARD"
    locked: { type: Boolean, default: false }
}, { _id: false });

const SubjectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    semester: { type: Number, required: true },
    modules: { type: Number, required: true },
    topics: { type: Number, required: true },
    progress: { type: Number, default: 0 },
    status: { type: String, default: "active" },
    icon: { type: String, required: true },
    href: { type: String, required: true },
    priorityTopics: [PriorityTopicSchema],
    isFeatured: { type: Boolean, default: false },
    featuredDescription: { type: String }
}, { timestamps: true });

export default mongoose.models.Subject || mongoose.model("Subject", SubjectSchema);
