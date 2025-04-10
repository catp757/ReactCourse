import React from "react";
import "../styles/ConferenceEvent.css";

const MealsSelection = ({ mealsItems, numberOfPeople, onPeopleChange, onToggle, totalCost }) => {
  return (
    <div id="meals" className="venue_container container_main">
      <div className="text">
        <h1>Meals Selection</h1>
      </div>

      <div className="input-container venue_selection">
        <label htmlFor="numberOfPeople">
          <h3>Number of People:</h3>
        </label>
        <input
          type="number"
          className="input_box5"
          id="numberOfPeople"
          value={numberOfPeople}
          onChange={(e) => onPeopleChange(parseInt(e.target.value))}
          min="1"
        />
      </div>

      <div className="meal_selection">
        {mealsItems.map((item, index) => (
          <div className="meal_item" key={index} style={{ padding: 15 }}>
            <div className="inner">
              <input
                type="checkbox"
                id={`meal_${index}`}
                checked={item.selected}
                onChange={() => onToggle(index)}
              />
              <label htmlFor={`meal_${index}`}>{item.name}</label>
            </div>
            <div className="meal_cost">${item.cost}</div>
          </div>
        ))}
      </div>

      <div className="total_cost">Total Cost: ${totalCost}</div>
    </div>
  );
};

export default MealsSelection;