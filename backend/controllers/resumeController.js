// resumeController.js

import Resume from "../models/Resume.js";

// CREATE
export const createResume = async (req, res) => {
    try {
        // ✅ FIX: Destructure the new 'customization' field
        const { userId, title, content, templateId, sections, customizations } = req.body;

        // ✅ FIX: Include 'customizations' when creating the new Resume
        const resume = new Resume({ userId, title, content, sections, templateId, customization: customizations });
        await resume.save();
        res.status(201).json(resume);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// GET ALL
export const getAllResumes = async (req, res) => {
    try {
        const { uid } = req.query;
        const resumes = await Resume.find({ userId: uid });
        res.status(200).json(resumes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// GET BY ID
export const getResumeById = async (req, res) => {
  try {
      const resume = await Resume.findById(req.params.id).lean(); // Use .lean() for faster, plain JavaScript objects
      if (!resume) return res.status(404).json({ message: "Resume not found" });

      // ✅ FIX: Map the 'customization' field to 'customizations' for frontend compatibility
      const frontendResume = {
          ...resume,
          customizations: resume.customization // Assign the singular 'customization' to the plural 'customizations'
      };
      // Remove the old field to avoid confusion
      delete frontendResume.customization;

      res.status(200).json(frontendResume);
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
};

// UPDATE
export const updateResume = async (req, res) => {
    try {
        // ✅ FIX: Destructure the new 'customizations' field
        const { userId, title, content, templateId, sections, customizations } = req.body;

        const resume = await Resume.findByIdAndUpdate(
            req.params.id,
            // ✅ FIX: Pass the 'customizations' field to update the document
            { userId, title, content, templateId, sections, customization: customizations },
            { new: true }
        );
        if (!resume) return res.status(404).json({ message: "Resume not found" });
        res.status(200).json(resume);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// DELETE
export const deleteResume = async (req, res) => {
    try {
        const resume = await Resume.findByIdAndDelete(req.params.id);
        if (!resume) return res.status(404).json({ message: "Resume not found" });
        res.status(200).json({ message: "Resume deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

