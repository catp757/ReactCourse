import React from "react";
import "../styles/ConferenceEvent.css";

const Navbar = ({ onNavigate, toggleShowItems, showItems }) => {
  return (
    <navbar className="navbar_event_conference">
      <div className="company_logo">Conference Expense Planner</div>
      <div className="left_navbar">
        <div className="nav_links">
          <a href="#venue" onClick={() => navigateToProducts("#venue")}>Venue</a>
          <a href="#addons" onClick={() => navigateToProducts("#addons")}>Add-ons</a>
          <a href="#meals" onClick={() => navigateToProducts("#meals")}>Meals</a>
        </div>
        <button className="details_button" onClick={toggleShowItems}>
          {showItems ? "Hide Details" : "Show Details"}
        </button>
      </div>
    </navbar>
  );
};

export default Navbar;