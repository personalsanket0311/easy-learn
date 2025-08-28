"use client";
import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import "./style.css";

const modules =[
  {
    title: "Module 1: Introduction to JavaScript",
    content: [
      "Overview of JavaScript and Its Role in Web Development",
      "Setting Up Your Development Environment",
      "Understanding the Document Object Model (DOM)",
      "Hands–On Exercise: Writing Your First JavaScript Program",
    ],
  },
  {
    title: "Module 2: JavaScript Fundamentals",
    content: [
      "Variables: var, let, const",
      "Data Types and Type Conversion",
      "Operators and Expressions",
      "Control Flow: if, else, switch",
      "Loops: for, while, do...while",
    ],
  },
  {
    title: "Module 3: Functions and Scope",
    content: [
      "Function Declarations vs Expressions",
      "Arrow Functions",
      "Function Parameters and Return Values",
      "Understanding Scope and Scope Chain",
      "Closures and Their Use Cases",
    ],
  },
  {
    title: "Module 4: Objects and Arrays",
    content: [
      "Creating and Accessing Objects",
      "Working with Arrays and Array Methods",
      "Nested Objects and Arrays",
      "Destructuring Assignment",
      "Spread and Rest Operators",
    ],
  },
  {
    title: "Module 5: DOM Manipulation",
    content: [
      "Selecting Elements with DOM API",
      "Changing Text and HTML Content",
      "Creating, Removing, and Cloning Elements",
      "Handling Events and Event Delegation",
      "Building Dynamic UI with JavaScript",
    ],
  },
  {
    title: "Module 6: Asynchronous JavaScript",
    content: [
      "Understanding Synchronous vs Asynchronous Code",
      "Callbacks and Callback Hell",
      "Using Promises for Async Tasks",
      "Async/Await Syntax and Error Handling",
      "Making API Calls using Fetch",
    ],
  },
  {
    title: "Module 7: JavaScript ES6 and Beyond",
    content: [
      "New Variable Declarations: let and const",
      "Template Literals and String Methods",
      "Default Parameters and Destructuring",
      "Modules: Import and Export",
      "New Features in ES2020+ (Optional Chaining, Nullish Coalescing, etc.)",
    ],
  },
];

interface Module {
  title: string;
  content?: string[];
}

const Curriculum = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleAccordion = (index: number): void => {
    setOpenIndex(index === openIndex ? -1 : index);
  };

  return (
    <div className="container py-3">
      <div className="curriculum-grid">
        <div className="curriculum-box">
          <div className="curriculum-header">
            <h3>The Curriculum</h3>
            {modules.map((mod, index) => (
              <div
                key={index}
                className="module-card"
                onClick={() => toggleAccordion(index)}
              >
                <div className="module-header">
                  <span>{mod.title}</span>
                  {openIndex === index ? <ChevronUp /> : <ChevronDown />}
                </div>
                {openIndex === index && mod.content && (
                  <div className="module-content">
                    <ul>
                      {mod.content.map((item, i) => (
                        <li key={i}>
                          {/* <span>•</span> */}
                          <span>•  {item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Curriculum;
