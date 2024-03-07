import React from "react";
import InputField from "../components/InputField";

const TypeOfEmployment = ({ handleChange }) => {
  return (
    <div>
      <h3>Type Of Employment</h3>
      <div>
        <label className="sidebar-label-container">
          <input
            type="radio"
            name="test"
            id="test"
            value={""}
            onChange={handleChange}
          />
          <span className="checkmark"></span>All
        </label>
        <InputField
          handleChange={handleChange}
          value="full-time"
          title="Full-time"
          name="test"
        />
        <InputField
          handleChange={handleChange}
          value="Temporary"
          title="temporary"
          name="test"
        />
        <InputField
          handleChange={handleChange}
          value="part-time"
          title="Part-time"
          name="test"
        />
      </div>
    </div>
  );
};

export default TypeOfEmployment;
