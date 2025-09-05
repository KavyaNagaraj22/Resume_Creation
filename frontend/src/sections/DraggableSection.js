import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";

// This component now supports dynamic font, color, and template styling
const DraggableSection = ({
  name,
  index,
  moveSection,
  fontStyle = "Arial",
  fontSize = "1rem",
  fontColor = "#333",
  templateColor = "#ffffff",
}) => {
  const ref = useRef(null);

  const [, drop] = useDrop({
    accept: "section",
    hover(item, monitor) {
      if (!ref.current) return;
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) return;

      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

      moveSection(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "section",
    item: { name, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;
  const boxShadow = isDragging
    ? "0px 8px 15px rgba(0, 0, 0, 0.2)"
    : "0px 4px 6px rgba(0, 0, 0, 0.1)";
  drag(drop(ref));

  // Function to render an SVG icon based on the section name
  const getSectionIcon = (sectionName) => {
    const svgProps = {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 512 512",
      fill: "currentColor",
    };

    switch (sectionName) {
      case "objective":
        return (
          <svg {...svgProps}>
            <path d="M416 208C387.5 208 360.2 195.8 340.2 175.8L256 91.6L171.8 175.8C151.8 195.8 124.5 208 96 208c-53 0-96-43-96-96s43-96 96-96c27.5 0 54.8 12.2 74.8 32.2L256 91.6l84.2-84.2c20-20 47.3-32.2 74.8-32.2c53 0 96 43 96 96s-43 96-96 96zM32.2 288.6C12.2 308.6 0 335.8 0 363.5V496c0 8.8 7.2 16 16 16h192V304H112v128h-32V304H16v192c0 8.8 7.2 16 16 16h448c8.8 0 16-7.2 16-16V288.6z" />
          </svg>
        );
      // ⚡ keep your other section SVGs here (education, certificates, skills, etc.)
      default:
        return null;
    }
  };

  return (
    <>
      <style>
        {`
        .reorder-item {
            display: flex;
            align-items: center;
            border-radius: 12px;
            padding: 16px 20px;
            margin-bottom: 12px;
            cursor: grab;
            transition: box-shadow 0.3s ease, transform 0.3s ease, opacity 0.3s ease;
            font-weight: 600;
            user-select: none;
        }

        .reorder-item:hover {
            box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.15);
            transform: translateY(-2px);
        }

        .reorder-handle {
            height: 20px;
            width: 6px;
            margin-right: 15px;
            background: linear-gradient(#ccc 2px, transparent 2px, transparent 4px);
            background-size: 100% 6px;
            opacity: 0.6;
        }

        .reorder-icon {
            margin-right: 15px;
            font-size: 1.25rem;
            color: #6a6a6a;
        }
        
        .reorder-icon svg {
          width: 1.25rem;
          height: 1.25rem;
        }
        
        
        .reorder-item h4 {
            font-weight: 600;
            margin: 0;
        }
        `}
      </style>
      <li
        ref={ref}
        className="reorder-item"
        style={{
          backgroundColor: templateColor,
          color: fontColor,
          fontFamily: fontStyle,
          fontSize: fontSize,
          boxShadow,
          opacity,
          border: "1px solid #e0e0e0",
        }}
      >
        <div className="reorder-handle"></div>
        <div className="reorder-icon">{getSectionIcon(name)}</div>
        <h4>{name.charAt(0).toUpperCase() + name.slice(1)}</h4>
      </li>
    </>
  );
};

export default DraggableSection;
