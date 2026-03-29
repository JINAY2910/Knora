import mongoose from "mongoose";

const QuestionResultSchema = new mongoose.Schema({
    questionId: { type: Number, required: true },
    question: { type: String },
    topic: { type: String },
    tags: [{ type: String }],
    userAnswer: { type: String, default: "" },
    correctAnswer: { type: String, default: "" },
    score: { type: Number, default: 0 },
    maxScore: { type: Number, default: 10 },
    status: {
        type: String,
        enum: ["correct", "partial", "wrong", "unanswered"],
        default: "unanswered",
    },
    aiFeedback: { type: String, default: "" },
    isTheory: { type: Boolean, default: false },
});

const TestResultSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        userEmail: { type: String, required: true },
        subject: { type: String, required: true },
        testId: { type: String, required: true },
        testName: { type: String, required: true },
        submittedAt: { type: Date, default: Date.now },

        totalScore: { type: Number, default: 0 },
        maxScore: { type: Number, default: 0 },
        percentage: { type: Number, default: 0 },
        grade: { type: String, default: "F" },

        questionResults: [QuestionResultSchema],

        // Topics where average score < 60%
        weakTopics: [
            {
                topic: String,
                score: Number,
                maxScore: Number,
                percentage: Number,
                priority: { type: String, enum: ["high", "medium", "low"] },
            },
        ],
        // Topics where average score >= 80%
        strongTopics: [{ topic: String, percentage: Number }],

        aiSuggestions: { type: String, default: "" },
    },
    { timestamps: true }
);

export default mongoose.models.TestResult ||
    mongoose.model("TestResult", TestResultSchema);
