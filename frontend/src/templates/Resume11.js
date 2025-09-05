// Resume11.js (updated)
// - Adds drag-and-drop reordering of sections (per column, HTML5 DnD)
// - Adds ClassicTemplate-style customization via customizations prop (global + per-section)
// - Safe spacing helpers to avoid NaN in inline styles (supports numbers and CSS lengths)
// - Preserves original two-column layout and classNames

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import "../templatesstyle/resume11.css";

// Helpers (aligned with ClassicTemplate)
const ensureArray = (value) => {
  if (Array.isArray(value)) return value;
  if (typeof value === "string") {
    return value.split("\n").map((line) => line.trim()).filter(Boolean);
  }
  return [];
};

const applyStyles = (c) => {
  if (!c) return {};
  return {
    fontSize: c.fontSize,
    fontFamily: c.fontStyle,
    color: c.fontColor,
    fontWeight: c.bold ? "bold" : "normal",
    fontStyle: c.italic ? "italic" : "normal",
    textDecoration: c.underline ? "underline" : "none",
    textAlign: c.align,
    lineHeight: c.lineHeight ? c.lineHeight : "1.1",
  };
};

// Spacing helpers
const toSpacing = (val, fallback = 6) => {
  if (typeof val === "number" && Number.isFinite(val)) return val;
  if (typeof val === "string") {
    const s = val.trim();
    if (/^[0-9]+(\.[0-9]+)?$/.test(s)) return parseFloat(s);
    return s; // keep '8px', '1.2rem'
  }
  return fallback;
};
const multiplySpacing = (val, factor = 2) => {
  if (typeof val === "number" && Number.isFinite(val)) return val * factor;
  if (typeof val === "string" && val) return `calc(${val} * ${factor})`;
  return val;
};

const reorder = (list, startIndex, endIndex) => {
  const result = list.slice();
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const Resume11 = ({
  data,
  customizations = {},       // { global, profile, experience, education, strengths, ... }
  sectionsLeft,              // optional initial left column order
  sectionsRight,             // optional initial right column order
  draggable = true,          // enable/disable DnD
  onSectionsChangeLeft,      // callback(newLeftOrder)
  onSectionsChangeRight,     // callback(newRightOrder)
}) => {
  const {
    profile = {},
    experience = [],
    education = [],
    skills = [],
    languages = [],
    strengths = [],
    awards = [],
    certificates = [],
    projects = [],
    organisations = [],
    courses = [],
    publications = [],
    references = [],
    declaration = "",
  } = data || {};

  const global = customizations.global || {};
  const spacing = toSpacing(global.spacing, 8);

  const templateStyle = useMemo(
    () => ({
      backgroundColor: global.templateColor || "transparent",
      ...applyStyles(global),
    }),
    [global]
  );

  // Default column assignment preserves original layout
  const defaultLeft = [
    "profileSection",  // header + summary
    "experience",
    "education",
    "strengths",
    "awards",
    "certificates",
  ];
  const defaultRight = [
    "skills",
    "languages",
    "projects",
    "organisations",
    "courses",
    "publications",
    "references",
  ];

  // Determine presence
  const present = {
    profileSection: Boolean(profile?.fullName || profile?.photo || profile?.summary || profile?.address || profile?.email || profile?.phone || profile?.linkedin),
    experience: experience.length > 0,
    education: education.length > 0,
    strengths: strengths.length > 0,
    awards: awards.length > 0,
    certificates: certificates.length > 0,
    skills: skills.length > 0,
    languages: languages.length > 0,
    projects: projects.length > 0,
    organisations: organisations.length > 0,
    courses: courses.length > 0,
    publications: publications.length > 0,
    references: references.length > 0,
  };

  // Initial orders filtered to present ones
  const initialLeft = useMemo(() => {
    const base = Array.isArray(sectionsLeft) && sectionsLeft.length ? sectionsLeft : defaultLeft;
    return base.filter((k) => present[k]);
  }, [sectionsLeft, present]);

  const initialRight = useMemo(() => {
    const base = Array.isArray(sectionsRight) && sectionsRight.length ? sectionsRight : defaultRight;
    return base.filter((k) => present[k]);
  }, [sectionsRight, present]);

  const [leftOrder, setLeftOrder] = useState(initialLeft);
  const [rightOrder, setRightOrder] = useState(initialRight);

  useEffect(() => setLeftOrder(initialLeft), [initialLeft]);
  useEffect(() => setRightOrder(initialRight), [initialRight]);

  // DnD per column
  const dragFromLeft = useRef(null);
  const dragFromRight = useRef(null);

  const onDragStartLeft = useCallback((e, index) => {
    if (!draggable) return;
    dragFromLeft.current = index;
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", String(index));
  }, [draggable]);

  const onDragStartRight = useCallback((e, index) => {
    if (!draggable) return;
    dragFromRight.current = index;
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", String(index));
  }, [draggable]);

  const onDragOver = useCallback((e) => {
    if (!draggable) return;
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  }, [draggable]);

  const onDropLeft = useCallback((e, dropIndex) => {
    if (!draggable) return;
    e.preventDefault();
    const from = dragFromLeft.current;
    if (from == null || from === dropIndex) return;
    const next = reorder(leftOrder, from, dropIndex);
    setLeftOrder(next);
    dragFromLeft.current = null;
    if (typeof onSectionsChangeLeft === "function") onSectionsChangeLeft(next);
  }, [draggable, leftOrder, onSectionsChangeLeft]);

  const onDropRight = useCallback((e, dropIndex) => {
    if (!draggable) return;
    e.preventDefault();
    const from = dragFromRight.current;
    if (from == null || from === dropIndex) return;
    const next = reorder(rightOrder, from, dropIndex);
    setRightOrder(next);
    dragFromRight.current = null;
    if (typeof onSectionsChangeRight === "function") onSectionsChangeRight(next);
  }, [draggable, rightOrder, onSectionsChangeRight]);

  // Section wrapper applying per-section styles
  const Section = ({ keyName, children }) => {
    const sc = customizations[keyName] || global;
    const style = applyStyles(sc);
    return (
      <div className="resume11-section" style={{ marginBottom: spacing }}>
        <div className="resume11-section-inner" style={style}>
          {children}
        </div>
      </div>
    );
  };

  // Renderers by key
  const renderers = {
    profileSection: () => {
      if (!present.profileSection) return null;
      return (
        <Section keyName="profile">
          {/* Header */}
          <div className="resume11-header" style={{ marginBottom: spacing }}>
            <div className="resume11-header-left">
              <h1 className="resume11-name">{profile.fullName || "Your Name"}</h1>
              <div className="resume11-contact-info">
                {profile.address && (
                  <p>
                    <i className="fa-solid fa-location-dot"></i>{" "}
                    {profile.address.length > 30 ? `${profile.address.substring(0, 30)}...` : profile.address}
                  </p>
                )}
                {profile.email && (
                  <p>
                    <i className="fa-solid fa-envelope"></i>{" "}
                    <a href={`mailto:${profile.email}`}>{profile.email}</a>
                  </p>
                )}
                {profile.phone && (
                  <p>
                    <i className="fa-solid fa-phone"></i> {profile.phone}
                  </p>
                )}
                {profile.linkedin && (
                  <p>
                    <i className="fa-brands fa-linkedin"></i>{" "}
                    <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                      {profile.linkedin.replace(/(^\w+:|^)\/\//, "").replace(/\/$/, "")}
                    </a>
                  </p>
                )}
              </div>
            </div>
            {profile.photo && (
              <div className="resume11-header-right">
                <img src={profile.photo} alt="Profile" className="resume11-photo" />
              </div>
            )}
          </div>
          {/* Summary */}
          {profile.summary && (
            <div className="resume11-section">
              <h2 className="resume11-section-title">Profile</h2>
              <p className="resume11-summary">{profile.summary}</p>
            </div>
          )}
        </Section>
      );
    },

    experience: () => {
      if (!experience.length) return null;
      return (
        <Section keyName="experience">
          <h2 className="resume11-section-title">Professional Experience</h2>
          {experience.map((exp, index) => (
            <div key={index} className="resume11-entry">
              <h3 className="resume11-entry-title">
                {exp.role || "Role"}, {exp.company || "Company"}
              </h3>
              <p className="resume11-entry-meta">
                {exp.startDate || ""} – {exp.endDate || "Present"} | {exp.location || "Location"}
              </p>
              {ensureArray(exp.details).length > 0 && (
                <ul>
                  {ensureArray(exp.details).map((detail, i) => (
                    <li key={i}>{detail}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </Section>
      );
    },

    education: () => {
      if (!education.length) return null;
      return (
        <Section keyName="education">
          <h2 className="resume11-section-title">Education</h2>
          {education.map((edu, index) => (
            <div key={index} className="resume11-entry">
              <h3 className="resume11-entry-title">{edu.degree || "Degree"}</h3>
              <p className="resume11-entry-meta">{edu.institution || "Institution"}</p>
              <p className="resume11-entry-meta resume11-edu-years">
                {edu.startYear || ""} – {edu.endYear || ""}
              </p>
            </div>
          ))}
        </Section>
      );
    },

    strengths: () => {
      if (!strengths.length) return null;
      return (
        <Section keyName="strengths">
          <h2 className="resume11-section-title">Strengths</h2>
          <ul className="resume11-list-bullets">
            {strengths.map((strength, index) => (
              <li key={index}>{strength}</li>
            ))}
          </ul>
        </Section>
      );
    },

    awards: () => {
      if (!awards.length) return null;
      return (
        <Section keyName="awards">
          <h2 className="resume11-section-title">Awards</h2>
          <ul className="resume11-list-bullets">
            {awards.map((award, index) => (
              <li key={index}>
                <strong>{award.title}</strong> — {award.issuer}, {award.year}
              </li>
            ))}
          </ul>
        </Section>
      );
    },

    certificates: () => {
      if (!certificates.length) return null;
      return (
        <Section keyName="certificates">
          <h2 className="resume11-section-title">Certificates</h2>
          <ul className="resume11-list-bullets">
            {certificates.map((cert, index) => (
              <li key={index}>
                <strong>{cert.name}</strong> ({cert.issuer}, {cert.year})
              </li>
            ))}
          </ul>
        </Section>
      );
    },

    skills: () => {
      if (!skills.length) return null;
      return (
        <Section keyName="skills">
          <h2 className="resume11-section-title">Skills</h2>
          <div className="resume11-skills-grid">
            {skills.map((skill, index) => (
              <p key={index} className="resume11-skill-item">
                <i className="fa-solid fa-check"></i> {skill}
              </p>
            ))}
          </div>
        </Section>
      );
    },

    languages: () => {
      if (!languages.length) return null;
      return (
        <Section keyName="languages">
          <h2 className="resume11-section-title">Languages</h2>
          <div className="resume11-languages-grid">
            {languages.map((lang, index) => (
              <div key={index} className="resume11-language-item">
                <p className="resume11-language-name">{lang.name || lang}</p>
                {typeof lang === "object" && lang.level && (
                  <p className="resume11-language-level">
                    {"●".repeat(lang.level) + "○".repeat(5 - lang.level)}
                  </p>
                )}
              </div>
            ))}
          </div>
        </Section>
      );
    },

    projects: () => {
      if (!projects.length) return null;
      return (
        <Section keyName="projects">
          <h2 className="resume11-section-title">Projects</h2>
          {projects.map((proj, index) => (
            <div key={index} className="resume11-entry">
              <h3 className="resume11-entry-title">{proj.title}</h3>
              <p className="resume11-project-description">{proj.description}</p>
              {proj.link && (
                <p className="resume11-entry-meta">
                  <a href={proj.link} target="_blank" rel="noopener noreferrer">
                    {proj.link.replace(/(^\w+:|^)\/\//, "")}
                  </a>
                </p>
              )}
            </div>
          ))}
        </Section>
      );
    },

    organisations: () => {
      if (!organisations.length) return null;
      return (
        <Section keyName="organisations">
          <h2 className="resume11-section-title">Organisations</h2>
          <ul className="resume11-list-bullets">
            {organisations.map((org, index) => (
              <li key={index}>
                <strong>{org.name}</strong> – {org.role}, {org.year}
              </li>
            ))}
          </ul>
        </Section>
      );
    },

    courses: () => {
      if (!courses.length) return null;
      return (
        <Section keyName="courses">
          <h2 className="resume11-section-title">Courses</h2>
          <ul className="resume11-list-bullets">
            {courses.map((course, index) => (
              <li key={index}>
                <strong>{course.name}</strong> — {course.provider}, {course.year}
              </li>
            ))}
          </ul>
        </Section>
      );
    },

    publications: () => {
      if (!publications.length) return null;
      return (
        <Section keyName="publications">
          <h2 className="resume11-section-title">Publications</h2>
          <ul className="resume11-list-bullets">
            {publications.map((pub, index) => (
              <li key={index}>
                <strong>{pub.title}</strong> — {pub.journal}, {pub.year}
              </li>
            ))}
          </ul>
        </Section>
      );
    },

    references: () => {
      if (!references.length) return null;
      return (
        <Section keyName="references">
          <h2 className="resume11-section-title">References</h2>
          <ul className="resume11-list-bullets">
            {references.map((ref, index) => (
              <li key={index}>
                <strong>{ref.name}</strong> ({ref.relation}) — {ref.contact}
              </li>
            ))}
          </ul>
        </Section>
      );
    },
  };

  return (
    <div className="resume11-template" style={templateStyle}>
      {/* Draggable sections per column */}
      <div className="resume11-content-area">
        <div className="resume11-left-column">
          {leftOrder.map((key, idx) => {
            const content = renderers[key]?.();
            if (!content) return null;
            return (
              <div
                key={`left-${key}-${idx}`}
                className={`resume11-draggable ${draggable ? "is-draggable" : ""}`}
                draggable={draggable}
                onDragStart={(e) => onDragStartLeft(e, idx)}
                onDragOver={onDragOver}
                onDrop={(e) => onDropLeft(e, idx)}
                data-section={key}
                style={{ marginBottom: multiplySpacing(spacing, 2) }}
                aria-label={`Drag to reorder ${key} section (left column)`}
              >
                {draggable && (
                  <div className="resume11-drag-handle" title="Drag to reorder" style={{ opacity: 0.5, fontSize: 14, marginBottom: 6, cursor: "grab" }}>
                    ⋮⋮
                  </div>
                )}
                {content}
              </div>
            );
          })}
        </div>

        <div className="resume11-right-column">
          {rightOrder.map((key, idx) => {
            const content = renderers[key]?.();
            if (!content) return null;
            return (
              <div
                key={`right-${key}-${idx}`}
                className={`resume11-draggable ${draggable ? "is-draggable" : ""}`}
                draggable={draggable}
                onDragStart={(e) => onDragStartRight(e, idx)}
                onDragOver={onDragOver}
                onDrop={(e) => onDropRight(e, idx)}
                data-section={key}
                style={{ marginBottom: multiplySpacing(spacing, 2) }}
                aria-label={`Drag to reorder ${key} section (right column)`}
              >
                {draggable && (
                  <div className="resume11-drag-handle" title="Drag to reorder" style={{ opacity: 0.5, fontSize: 14, marginBottom: 6, cursor: "grab" }}>
                    ⋮⋮
                  </div>
                )}
                {content}
              </div>
            );
          })}
        </div>
      </div>

      {/* Declaration stays full-width bottom as in original */}
      {declaration && (
        <div className="resume11-section resume11-declaration" style={{ marginTop: multiplySpacing(spacing, 2) }}>
          <h2 className="resume11-section-title">Declaration</h2>
          <p>{declaration}</p>
        </div>
      )}
    </div>
  );
};

export default Resume11;
