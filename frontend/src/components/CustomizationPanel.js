// frontend/src/components/CustomizationPanel.js

import React from "react";
import "../styles/CustomizationPanel.css";
import {
  FaBold, FaItalic, FaUnderline,
  FaAlignLeft, FaAlignCenter, FaAlignRight, FaAlignJustify,
} from "react-icons/fa";

const FONT_FAMILIES = [
  { label: "Arial", value: "Arial, sans-serif" },
  { label: "Times New Roman", value: "'Times New Roman', serif" },
  { label: "Courier New", value: "'Courier New', monospace" },
  { label: "Georgia", value: "Georgia, serif" },
  { label: "Calibri", value: "'Calibri', sans-serif" },
  { label: "Cambria", value: "'Cambria', serif" },
  { label: "Garamond", value: "'Garamond', serif" },
  { label: "Trebuchet MS", value: "'Trebuchet MS', sans-serif" },
  { label: "Verdana", value: "'Verdana', sans-serif" },
  { label: "Tahoma", value: "'Tahoma', sans-serif" },
  { label: "Lucida Sans", value: "'Lucida Sans', sans-serif" },
  { label: "Palatino Linotype", value: "'Palatino Linotype', serif" },
  { label: "Helvetica Neue", value: "'Helvetica Neue', sans-serif" },
  { label: "Open Sans", value: "'Open Sans', sans-serif" },
];
const FONT_SIZES = [8, 9, 10, 11, 12, 14, 16, 18, 20, 22, 24, 26, 28, 32, 36, 40, 48];
const LINE_HEIGHTS = [1, 1.05, 1.1, 1.15, 1.2, 1.25, 1.3, 1.35, 1.4, 1.5, 2];
const FONT_COLORS = [
  "#000000", "#333333", "#555555", "#795548", "#d32f2f", "#f44336", "#e91e63", "#ad1457",
  "#1976d2", "#2196f3", "#0288d1", "#0d47a1", "#388e3c", "#4caf50", "#2e7d32",
  "#f57c00", "#ff9800", "#ef6c00", "#7b1fa2", "#9c27b0", "#512da8"
];
const BG_COLORS = [
  "#ffffff", "#f5f5f5", "#eeeeee", "#e0e0e0",
  "#e3f2fd", "#bbdefb", "#c5cae9",
  "#fce4ec", "#f8bbd0", "#f3e5f5",
  "#fff3e0", "#ffe0b2", "#ffecb3",
  "#ede7f6", "#d1c4e9", "#e8f5e9", "#c8e6c9",
  "#f9fbe7", "#f0f4c3", "#d7ccc8"
];
const ALIGNMENTS = [
  { value: "left", icon: <FaAlignLeft /> },
  { value: "center", icon: <FaAlignCenter /> },
  { value: "right", icon: <FaAlignRight /> },
  { value: "justify", icon: <FaAlignJustify /> },
];

const CustomizationPanel = ({ customizations, onCustomizationChange }) => {
  // support both global and section modes
  const isGlobal = !!customizations.fontStyle;
  const custom = isGlobal ? customizations : customizations.global || {};

  return (
    <div className="customization-panel">
      <h3>Customization</h3>
      {/* Font Style, Size, and Line Height */}
      <div className="customization-group font-row">
        <div className="font-style-group">
          <label>Font Style</label>
          <select
            className="font-style-dropdown"
            value={custom.fontStyle}
            onChange={e => onCustomizationChange(
              isGlobal ? "fontStyle" : "global.fontStyle", e.target.value
            )}
          >
            {FONT_FAMILIES.map(({ label, value }) => (
              <option key={value} value={value} style={{ fontFamily: value }}>{label}</option>
            ))}
          </select>
        </div>
        <div className="font-size-group">
          <label>Font Size</label>
          <select
            className="font-size-dropdown"
            value={parseInt(custom.fontSize) || 16}
            onChange={e => onCustomizationChange(
              isGlobal ? "fontSize" : "global.fontSize", `${e.target.value}px`
            )}
          >
            {FONT_SIZES.map(size => (
              <option key={size} value={size}>{size}</option>
            ))}
          </select>
        </div>
        <div className="font-lineheight-group">
          <label>Line Spacing</label>
          <select
            className="font-lineheight-dropdown"
            value={parseFloat(custom.lineHeight) || 1.1}
            onChange={e => onCustomizationChange(
              isGlobal ? "lineHeight" : "global.lineHeight", e.target.value
            )}
          >
            {LINE_HEIGHTS.map(lh => (
              <option key={lh} value={lh}>{lh}</option>
            ))}
          </select>
        </div>
      </div>
      {/* Text Formatting */}
      <div className="customization-group">
        <label>Text Formatting</label>
        <div className="formatting-toolbar">
          <button
            className={custom.bold ? "active" : ""}
            onClick={() => onCustomizationChange(isGlobal ? "bold" : "global.bold", !custom.bold)}
            type="button"
          >
            <FaBold />
          </button>
          <button
            className={custom.italic ? "active" : ""}
            onClick={() => onCustomizationChange(isGlobal ? "italic" : "global.italic", !custom.italic)}
            type="button"
          >
            <FaItalic />
          </button>
          <button
            className={custom.underline ? "active" : ""}
            onClick={() => onCustomizationChange(isGlobal ? "underline" : "global.underline", !custom.underline)}
            type="button"
          >
            <FaUnderline />
          </button>
          {ALIGNMENTS.map(({ value, icon }) => (
            <button
              key={value}
              className={custom.align === value ? "active" : ""}
              onClick={() => onCustomizationChange(isGlobal ? "align" : "global.align", value)}
              type="button"
            >
              {icon}
            </button>
          ))}
        </div>
      </div>
      {/* Font Color */}
      <div className="customization-group">
        <label>Font Color</label>
        <div className="color-bubbles">
          {FONT_COLORS.map(color => (
            <span key={color}
              className={`color-bubble ${custom.fontColor === color ? "active" : ""}`}
              style={{ backgroundColor: color }}
              onClick={() => onCustomizationChange(isGlobal ? "fontColor" : "global.fontColor", color)}
            />
          ))}
          <label className="color-bubble custom-picker">
            <input
              type="color"
              value={custom.fontColor}
              onChange={e => onCustomizationChange(isGlobal ? "fontColor" : "global.fontColor", e.target.value)}
            />
            +
          </label>
        </div>
      </div>
      {/* Background Color */}
      <div className="customization-group">
        <label>Template Background Color</label>
        <div className="color-bubbles">
          {BG_COLORS.map(color => (
            <span key={color}
              className={`color-bubble ${custom.templateColor === color ? "active" : ""}`}
              style={{ backgroundColor: color }}
              onClick={() => onCustomizationChange(isGlobal ? "templateColor" : "global.templateColor", color)}
            />
          ))}
          <label className="color-bubble custom-picker">
            <input
              type="color"
              value={custom.templateColor}
              onChange={e => onCustomizationChange(isGlobal ? "templateColor" : "global.templateColor", e.target.value)}
            />
            +
          </label>
        </div>
      </div>
      {/* Layout */}
      <div className="customization-group">
        <label>Layout</label>
        <div className="layout-options">
          {["one-column", "two-column", "mixed"].map(layout => (
            <button
              key={layout}
              className={custom.layout === layout ? "active" : ""}
              onClick={() => onCustomizationChange(isGlobal ? "layout" : "global.layout", layout)}
              type="button"
            >
              {layout.replace("-", " ").replace(/\b\w/g, l => l.toUpperCase())}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomizationPanel;
