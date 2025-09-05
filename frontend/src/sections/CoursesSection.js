// 📚 CoursesSection.js
import React, { useEffect, useState } from "react";

const CoursesSection = ({ initialData, onDataChange }) => {
  const [courses, setCourses] = useState([{ name: "", provider: "", year: "" }]);

  useEffect(() => {
    if (initialData && JSON.stringify(initialData) !== JSON.stringify(courses)) {
      setCourses(initialData);
    }
  }, [initialData]);

  const handleChange = (index, field, value) => {
    const updated = [...courses];
    updated[index][field] = value;
    setCourses(updated);
    onDataChange?.(updated);
  };

  const addCourse = () => {
    const updated = [...courses, { name: "", provider: "", year: "" }];
    setCourses(updated);
    onDataChange?.(updated);
  };

  const removeCourse = (index) => {
    const updated = [...courses];
    updated.splice(index, 1);
    setCourses(updated);
    onDataChange?.(updated);
  };

  return (
    <div className="section">
      <h3>📚 Courses</h3>
      {courses.map((course, i) => (
        <div key={i} className="entry-item">
          <input placeholder="Course Name" value={course.name} onChange={(e) => handleChange(i, "name", e.target.value)} />
          <input placeholder="Provider" value={course.provider} onChange={(e) => handleChange(i, "provider", e.target.value)} />
          <input placeholder="Year" value={course.year} onChange={(e) => handleChange(i, "year", e.target.value)} />
          <button onClick={() => removeCourse(i)}>Remove</button>
        </div>
      ))}
      <button onClick={addCourse}>Add Course</button>
    </div>
  );
};

export default CoursesSection;