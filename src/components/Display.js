import React from "react";
import "./Display.css";

const Display = ({ formula, input, onHistory, isShowHistory, onBackspace }) => {
  const onTextareaChanged = () => {
    // No onchange action
  };
  return (
    <div className="display-toolbar">
      <form className="display">
        <textarea
          className="display-formula"
          onChange={onTextareaChanged}
          value={formula.join("")}
        ></textarea>
        <textarea
          className="display-input"
          id="display"
          rows="1"
          onChange={onTextareaChanged}
          value={input}
        ></textarea>
      </form>
      <div className="toolbar">
        <div className="toolbar-item" id="view-history" onClick={onHistory}>
          {isShowHistory ? "Keypad" : "History"}
        </div>
        <div>
          <span className="toolbar-item" onClick={onBackspace} id="backspace">
            <i className="fas fa-backspace"></i>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Display;
