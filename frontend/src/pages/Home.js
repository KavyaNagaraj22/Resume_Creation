import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import "../styles/Home.css";

const templates = [
  {
    id: "modern",
    name: "Modern",
    description: "Clean, minimalist layout with bold headers",
    image: "https://prod.flowcvassets.com/resume-templates/wk78myowij2vvh1gy8l-s/480.webp",
  },
  {
    id: "classic",
    name: "Classic",
    description: "Traditional design with strong emphasis on text",
    image: "https://prod.flowcvassets.com/resume-templates/gs_qryrzly3kldmqhxqsb/480.webp",
  },
  {
    id: "creative",
    name: "Creative",
    description: "Colorful, stylish design perfect for designers",
    image: "https://prod.flowcvassets.com/resume-templates/cjy7ca_q8xpaocheef8v1/480.webp",
  },
  {
    id: "red",
    name: "Red Accent",
    description: "A bold and modern design with striking red accents.",
    image: "https://prod.flowcvassets.com/resume-templates/bp-s_rae24mq1_4bq_pqm/480.webp",
  },
];

const Home = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const [faqOpen, setFaqOpen] = useState(null);

  const handleTemplateClick = (templateId) => {
    const user = auth.currentUser;
    if (user) {
      navigate(`/resume-form?template=${templateId}`);
    } else {
      localStorage.setItem("pendingTemplate", templateId);
      navigate("/register");
    }
  };

  const toggleFAQ = (index) => {
    setFaqOpen(faqOpen === index ? null : index);
  };

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h2>Build a Job-Winning Resume in Minutes 🚀</h2>
          <p>
            Free, professional templates with AI suggestions. Create, design, and
            download resumes that get you hired.
          </p>
          <div className="hero-buttons">
            <button onClick={() => navigate("/register")} className="btn-primary">
              Get Started Free
            </button>
            <button onClick={() => navigate("/templates")} className="btn-secondary">
              Browse Templates
            </button>
          </div>
        </div>
        <div className="hero-image">
          <imgprofessional
            src="professional-resume-template.png"
            alt="Resume Preview"
          />
        </div>
      </section>
      {/* Features Section */}
      <section className="features">
        <div>
          <h3>✨ Custom Templates</h3>
          <p>Modern, Classic, and Creative styles</p>
        </div>
        <div>
          <h3>🔐 Secure & Private</h3>
          <p>Your data is safe with Firebase Auth</p>
        </div>
        <div>
          <h3>🤖 AI Assistant</h3>
          <p>Smart suggestions for summaries and skills</p>
        </div>
      </section>

      <h2 className="section-title">How It Works</h2>

{/* Flow Section */}
<section className="flow-section">
  <div className="flow-card">
    <div className="step-number">1</div>
    <h3>Add Content</h3>
    <p>Build your resume – we'll guide you every step of the way to ensure it's professional and polished.</p>
    <img src="/resume-form-interface.png" alt="Add Content" />
  </div>

  <div className="flow-card">
    <div className="step-number">2</div>
    <h3>Design Effortlessly</h3>
    <p>Choose from over 50 templates and customize every detail to suit your style and career.</p>
    <img src="/resume-template-selection.png" alt="Design Templates" />
  </div>

  <div className="flow-card">
    <div className="step-number">3</div>
    <h3>Download & Share</h3>
    <p>Download your resume as a PDF or share it online with your unique link.</p>
    <img src="/download-resume-pdf.png" alt="Download Resume" />
  </div>
</section>

          
      {/* Stats Section */}
      {/* <section className="stats">
        <div>
          <h3>10,000+</h3>
          <p>Resumes Created</p>
        </div>
        <div>
          <h3>500+</h3>
          <p>Templates Used</p>
        </div>
        <div>
          <h3>95%</h3>
          <p>Success Rate</p>
        </div>
      </section> */}



      {/* Template Gallery */}
      <section className="templates">
        <h2>Choose a Template</h2>
        <div className="template-gallery">
          {templates.map((template) => (
            <div key={template.id} className="template-card">
              <img
                src={template.image}
                alt={template.name}
                className="template-image"
              />
              <h4>{template.name}</h4>
              <p>{template.description}</p>
              <button
                onClick={() => handleTemplateClick(template.id)}
                className="use-template-btn"
              >
                Use this Template
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials
      <section className="testimonials">
        <h2>What Our Users Say</h2>
        <div className="testimonial-cards">
          <div className="card">
            <p>“This resume builder helped me land my first job interview in 2 weeks!”</p>
            <span>- Kavya</span>
          </div>
          <div className="card">
            <p>“I loved the templates. Very professional and easy to use.”</p>
            <span>- Usha</span>
          </div>
        </div>
      </section> */}

      {/* FAQ Section */}
      <section className="faq">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-item">
          <h4 onClick={() => toggleFAQ(1)}>
            Is it free to use? <span>{faqOpen === 1 ? "−" : "+"}</span>
          </h4>
          {faqOpen === 1 && <p>Yes! You can create and download resumes for free.</p>}
        </div>
        <div className="faq-item">
          <h4 onClick={() => toggleFAQ(2)}>
            Is my data safe? <span>{faqOpen === 2 ? "−" : "+"}</span>
          </h4>
          {faqOpen === 2 && <p>We use Firebase Auth to secure your account and data.</p>}
        </div>
        <div className="faq-item">
          <h4 onClick={() => toggleFAQ(3)}>
            Are resumes ATS-friendly? <span>{faqOpen === 3 ? "−" : "+"}</span>
          </h4>
          {faqOpen === 3 && <p>Yes, our templates are designed to pass ATS scans.</p>}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <h2>Ready to Build Your Resume?</h2>
        <p>Join thousands of users who landed jobs with professional resumes.</p>
        <button onClick={() => navigate("/register")} className="btn-primary">
          Start Now - It’s Free
        </button>
      </section>
    </div>
  );
};

export default Home;
