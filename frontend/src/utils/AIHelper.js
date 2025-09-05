// components/AIHelper.js
import { useState } from "react";
import axios from "axios";

// Predefined roles with summary & skills
const aiRoleTemplates = [
  {
    role: "Frontend Developer",
    summary:
      "Creative and detail-oriented frontend developer with a passion for crafting responsive and user-friendly web interfaces using modern frameworks.",
    skills: [
      "HTML", "CSS", "JavaScript", "React", "Tailwind CSS", "Redux",
      "TypeScript", "REST APIs", "Git", "Figma"
    ]
  },
  {
    role: "Backend Developer",
    summary:
      "Experienced backend developer skilled in designing robust RESTful APIs and managing scalable server-side applications.",
    skills: [
      "Node.js", "Express.js", "MongoDB", "MySQL", "PostgreSQL", "JWT",
      "Docker", "Redis", "Git", "REST"
    ]
  },
  {
    role: "Full Stack Developer",
    summary:
      "Versatile full stack developer with hands-on experience in building complete web solutions using modern technologies across frontend and backend.",
    skills: [
      "React", "Node.js", "Express", "MongoDB", "TypeScript", "GitHub",
      "GraphQL", "Docker", "Nginx"
    ]
  },
  {
    role: "Data Analyst",
    summary:
      "Analytical and detail-driven data analyst with expertise in transforming raw data into actionable insights to support decision-making.",
    skills: [
      "SQL", "Python", "Pandas", "Excel", "Power BI", "Tableau",
      "Data Visualization", "NumPy", "Statistics"
    ]
  },
  {
    role: "UI/UX Designer",
    summary:
      "User-focused UI/UX designer with a knack for creating engaging, intuitive, and visually appealing digital experiences.",
    skills: [
      "Figma", "Adobe XD", "Sketch", "Prototyping", "Wireframing",
      "Usability Testing", "Design Systems"
    ]
  },
  {
    role: "Machine Learning Engineer",
    summary:
      "Result-oriented ML engineer skilled in building and deploying machine learning models to solve real-world business problems.",
    skills: [
      "Python", "Scikit-learn", "TensorFlow", "PyTorch", "Pandas",
      "NumPy", "Data Preprocessing", "Model Evaluation"
    ]
  },
  {
    role: "DevOps Engineer",
    summary:
      "Proactive DevOps engineer experienced in streamlining CI/CD pipelines and automating infrastructure for efficient software delivery.",
    skills: [
      "Jenkins", "Docker", "Kubernetes", "Terraform", "AWS",
      "Bash", "Git", "Ansible", "Monitoring Tools"
    ]
  },
  {
    role: "Android App Developer",
    summary:
      "Dedicated Android developer with a strong grasp of Kotlin and Java, creating reliable and intuitive mobile apps.",
    skills: [
      "Java", "Kotlin", "Android Studio", "XML", "Firebase",
      "Retrofit", "SQLite", "Material Design"
    ]
  },
  {
    role: "Cybersecurity Analyst",
    summary:
      "Security-conscious analyst skilled in identifying vulnerabilities and securing digital environments against potential threats.",
    skills: [
      "Network Security", "Vulnerability Assessment", "SIEM Tools",
      "Firewalls", "Ethical Hacking", "Kali Linux"
    ]
  },
  {
    role: "Cloud Engineer",
    summary:
      "Certified cloud engineer with experience in deploying and managing scalable cloud solutions across AWS and Azure.",
    skills: [
      "AWS", "Azure", "GCP", "Terraform", "Docker",
      "Kubernetes", "Linux", "CI/CD", "CloudFormation"
    ]
  }
];

const AIHelper = ({ jobTitle, skills = [], experience = "", onGenerate, onTemplateApply }) => {
  const [loading, setLoading] = useState(false);

  const generateSummary = async () => {
    if (!jobTitle || skills.length === 0 || !experience) {
      alert("Please fill role, experience, and at least one skill.");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/ai/generate-summary`, {
        jobTitle,
        skills,
        experience,
      });

      if (onGenerate) {
        onGenerate(res.data.summary);
      }
    } catch (err) {
      console.error("Error generating summary:", err);
      alert("Failed to generate AI summary.");
    } finally {
      setLoading(false);
    }
  };

  const handleTemplateSelect = (e) => {
    const selectedRole = e.target.value;
    const template = aiRoleTemplates.find((item) => item.role === selectedRole);
    if (template && onTemplateApply) {
      onTemplateApply(template); // send { role, summary, skills } back to parent
    }
  };

  return (
    <div>
      <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
        <select defaultValue="" onChange={handleTemplateSelect}>
          <option value="" disabled>
            Select Role Template
          </option>
          {aiRoleTemplates.map((item) => (
            <option key={item.role} value={item.role}>
              {item.role}
            </option>
          ))}
        </select>

        <button onClick={generateSummary} disabled={loading}>
          {loading ? "Generating..." : "✨ AI Generate Summary"}
        </button>
      </div>
    </div>
  );
};

export default AIHelper;
export { aiRoleTemplates }; // 👈 Add this line to export the template list
