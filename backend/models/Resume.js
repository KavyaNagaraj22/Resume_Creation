import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema({
    userId: { type: String, required: true }, // Firebase UID
    title: String,
    content: Object, // All sections: profile, education, etc.
    templateId: String,
    sections: [String],
    // 🆕 Add the customization field back
    customization: mongoose.Schema.Types.Mixed
}, { timestamps: true });

const Resume = mongoose.model("Resume", resumeSchema);
export default Resume;

