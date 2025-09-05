import React, { useEffect, useRef, useState, forwardRef } from "react";
import "../styles/PaginatedPreview.css";
import { templates } from "../templates/templateList";

const PaginatedTemplate = forwardRef(
  ({ data, sections, customizations, templateId }, ref) => {
    const SelectedTemplate = templates.find((t) => t.id === templateId)?.component;
    if (!SelectedTemplate) return null;
    return (
      <div ref={ref}>
        <SelectedTemplate
          data={data}
          sections={sections}
          customizations={customizations}
        />
      </div>
    );
  }
);

const PAGE_HEIGHT = 1123; // A4 height in px @ ~96dpi

const PaginatedPreview = ({ data, sections, templateId, customizations }) => {
  const hiddenContentRef = useRef(null);
  const [pages, setPages] = useState([]);

  const rafRef = useRef(0);
  const observerRef = useRef(null);

  const calc = () => {
    const node = hiddenContentRef.current;
    if (!node) return;
    const children = Array.from(node.children);
    if (!children.length) {
      setPages([]);
      return;
    }

    const buckets = [[]];
    let acc = 0;

    // Measure direct children; ensure your template renders many sibling blocks
    children.forEach((child) => {
      const h = child.offsetHeight || child.scrollHeight || 0;
      if (acc + h > PAGE_HEIGHT && buckets[buckets.length - 1].length > 0) {
        buckets.push([]);
        acc = 0;
      }
      buckets[buckets.length - 1].push(child.outerHTML);
      acc += h;
    });

    setPages(buckets);
  };

  const scheduleCalc = () => {
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      Promise.resolve().then(calc);
    });
  };

  useEffect(() => {
    scheduleCalc();
  }, [data, sections, templateId, customizations]);

  useEffect(() => {
    const node = hiddenContentRef.current;
    if (!node) return;
    observerRef.current ||= new ResizeObserver(() => scheduleCalc());
    observerRef.current.observe(node);
    return () => {
      cancelAnimationFrame(rafRef.current);
      observerRef.current?.unobserve(node);
    };
  }, []);

  return (
    <>
      {/* Hidden measurement tree at A4 width */}
      <div style={{ position: "fixed", top: "-9999px", left: "-9999px", width: "794px" }}>
        <PaginatedTemplate
          ref={hiddenContentRef}
          data={data}
          sections={sections}
          customizations={customizations}
          templateId={templateId}
        />
      </div>

      {/* Visible paginated preview */}
      <div className="paginated-preview-container">
        {pages.map((page, i) => (
          <div key={i} className="document-page">
            <div className="page-content">
              {page.map((html, j) => (
                <div key={j} dangerouslySetInnerHTML={{ __html: html }} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default PaginatedPreview;