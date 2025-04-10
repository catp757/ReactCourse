import React from "react";
import "../styles/ConferenceEvent.css";

const VenueSelection = ({ venueItems, remainingAuditoriumQuantity, onAdd, onRemove, totalCost }) => {
  return (
    <div id="venue" className="venue_container container_main">
      <div className="text">
        <h1>Venue Room Selection</h1>
      </div>
      <div className="venue_selection">
        {venueItems.map((item, index) => (
          <div className="venue_main" key={index}>
            <div className="img">
              <img src={item.img} alt={item.name} />
            </div>
            <div className="text">{item.name}</div>
            <div>${item.cost}</div>
            <div className="button_container">
              {item.name === "Auditorium Hall (Capacity:200)" ? (
                <>
                  <button
                    className={item.quantity === 0 ? "btn-warning btn-disabled" : "btn-minus btn-warning"}
                    onClick={() => onRemove(index)}
                  >
                    &#8211;
                  </button>
                  <span className="selected_count">{item.quantity > 0 ? ` ${item.quantity}` : "0"}</span>
                  <button
                    className={remainingAuditoriumQuantity === 0 ? "btn-success btn-disabled" : "btn-success btn-plus"}
                    onClick={() => onAdd(index)}
                  >
                    &#43;
                  </button>
                </>
              ) : (
                <>
                  <button
                    className={item.quantity === 0 ? "btn-warning btn-disabled" : "btn-warning btn-plus"}
                    onClick={() => onRemove(index)}
                  >
                    &#8211;
                  </button>
                  <span className="selected_count">{item.quantity > 0 ? ` ${item.quantity}` : "0"}</span>
                  <button
                    className={item.quantity === 10 ? "btn-success btn-disabled" : "btn-success btn-plus"}
                    onClick={() => onAdd(index)}
                  >
                    &#43;
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="total_cost">Total Cost: ${totalCost}</div>
    </div>
  );
};

export default VenueSelection;