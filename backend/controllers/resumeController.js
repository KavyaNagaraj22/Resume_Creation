// resumeController.js
import Resume from "../models/Resume.js";
import { Op } from "sequelize";

// CREATE
export const createResume = async (req, res) => {
  try {
    const { userId, title, content, templateId, sections, customization } = req.body;
    const resume = await Resume.create({
      userId,
      title,
      content,
      sections,
      templateId,
      customization,
    });
    res.status(201).json(resume);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET ALL
export const getAllResumes = async (req, res) => {
  try {
    const { uid } = req.query;
    // Correctly fetch all resumes by userId
    const resumes = await Resume.findAll({ where: { userId: uid } });
    res.status(200).json(resumes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET BY ID
export const getResumeById = async (req, res) => {
  try {
    const resume = await Resume.findByPk(req.params.id);
    if (!resume) return res.status(404).json({ message: "Resume not found" });
    res.status(200).json(resume);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE
export const updateResume = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, title, content, templateId, sections, customization } = req.body;

    // Use Sequelize's update method
    const [updated] = await Resume.update(
      {
        userId,
        title,
        content,
        templateId,
        sections,
        customization,
      },
      {
        where: { id },
      }
    );

    if (updated) {
      const updatedResume = await Resume.findByPk(id);
      res.status(200).json(updatedResume);
    } else {
      res.status(404).json({ message: "Resume not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE
export const deleteResume = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Resume.destroy({ where: { id } });

    if (deleted) {
      res.status(200).json({ message: "Resume deleted" });
    } else {
      res.status(404).json({ message: "Resume not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};