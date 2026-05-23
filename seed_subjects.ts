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

const Subject = mongoose.models.Subject || mongoose.model("Subject", SubjectSchema);
const MONGODB_URI = "mongodb+srv://<credentials>@cluster0.pquuilc.mongodb.net/knora";

const subjects = [
    {
        title: "Java Programming",
        semester: 3,
        modules: 10,
        topics: 56,
        progress: 65,
        status: "active",
        icon: "coffee",
        href: "/concept/java-intro",
        priorityTopics: [
            { title: "JVM Architecture", type: "read", duration: "15 MIN READ", difficulty: "HIGH" },
            { title: "Class Fundamentals", type: "read", duration: "18 MIN READ", difficulty: "MEDIUM" },
            { title: "String Immutability", type: "read", duration: "14 MIN READ", difficulty: "MEDIUM" }
        ],
        isFeatured: false
    },
    {
        title: "C++ Programming",
        semester: 3,
        modules: 6,
        topics: 45,
        progress: 25,
        status: "active",
        icon: "terminal",
        href: "/concept/xor-gate",
        priorityTopics: [
            { title: "Pointers & Memory", type: "read", duration: "18 MIN READ", difficulty: "HARD" },
            { title: "STL Containers", type: "video", duration: "25 MIN", difficulty: "MEDIUM" },
            { title: "Move Semantics", type: "practice", duration: "PRACTICE SET", difficulty: "HARD", locked: true }
        ],
        isFeatured: true,
        featuredDescription: "Master C++ memory management. Deep dive into raw pointers, smart pointers, and move semantics, which appear in 80% of advanced interviews."
    },
    {
        title: "Database Management Systems",
        semester: 4,
        modules: 7,
        topics: 34,
        progress: 0,
        status: "active",
        icon: "database",
        href: "/concept/dbms-intro",
        priorityTopics: [
            { title: "The ER Startup Architect", type: "practice", duration: "INTERACTIVE", difficulty: "MEDIUM" },
            { title: "SQL Murder Mystery", type: "practice", duration: "INTERACTIVE", difficulty: "HARD" },
            { title: "The Normalization Kitchen", type: "read", duration: "VISUAL", difficulty: "MEDIUM" }
        ],
        isFeatured: true,
        featuredDescription: "Design, build, and query robust databases. Master SQL, Normalization, and ACID properties."
    },
    {
        title: "Operating Systems",
        semester: 4,
        modules: 8,
        topics: 40,
        progress: 15,
        status: "active",
        icon: "memory",
        href: "#",
        priorityTopics: [
            { title: "Process Scheduling", type: "read", duration: "20 MIN READ", difficulty: "HIGH" },
            { title: "Deadlock Avoidance", type: "video", duration: "30 MIN", difficulty: "HARD" },
            { title: "Paging & Segmentation", type: "practice", duration: "INTERACTIVE", difficulty: "MEDIUM" }
        ],
        isFeatured: false
    }
];

async function seed() {
    try {
        await mongoose.connect(MONGODB_URI as string);
        console.log("Connected to DB. Clearing old subjects...");
        await Subject.deleteMany({});
        
        console.log("Inserting new subjects...");
        await Subject.insertMany(subjects);
        console.log("Done!");
    } catch (e) {
        console.error(e);
    } finally {
        mongoose.disconnect();
    }
}

seed();
