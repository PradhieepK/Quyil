import React from "react";
import downArrow from "../assests/down-arrow.svg";
import "../styles/TypeFilter.css";

const TypeFilter = ({ selectedTypes, setSelectedTypes, isOpen, setIsOpen }) => {
  const types = ["Album", "EP", "Single"];

  // Function to handle onChange event.
  const handleCheckboxChange = (type) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter((t) => t !== type));
    } else {
      setSelectedTypes([...selectedTypes, type]);
    }
  };

  // To display the number of checkboxes selected in typre dropdpwn filter.
  const getButtonLabel = () => {
    const count =
      selectedTypes.length == 0 ? "Type " : `Type (${selectedTypes.length})  `;
    return count;
  };

  return (
    <div className="type-dropdown-container">
      <button
        className={`type-dropdown-button ${
          selectedTypes.length > 0 ? "active" : ""
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {getButtonLabel()}
        <img src={downArrow} alt="▼"></img>
      </button>
      {isOpen && (
        <div className="type-dropdown-menu">
          {types.map((type) => (
            <label key={type} className="type-dropdown-item">
              <input
                className="type-dropdown-checkbox"
                type="checkbox"
                checked={selectedTypes.includes(type)}
                onChange={() => handleCheckboxChange(type)}
              />
              {type}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default TypeFilter;
