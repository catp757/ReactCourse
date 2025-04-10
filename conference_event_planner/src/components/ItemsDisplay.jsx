import React from "react";
import "../styles/ConferenceEvent.css";

const ItemsDisplay = ({ items, numberOfPeople }) => {
  return (
    <div className="display_box1">
      {items.length === 0 && <p>No items selected</p>}
      {items.length > 0 && (
        <table className="table_item_data">
          <thead>
            <tr>
              <th>Name</th>
              <th>Unit Cost</th>
              <th>Quantity</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => {
              const isMeal = item.type === "meals" || item.numberOfPeople;
              const quantityLabel = isMeal ? `For ${numberOfPeople} people` : item.quantity;
              const subtotal = isMeal ? item.cost * numberOfPeople : item.cost * item.quantity;

              return (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>${item.cost}</td>
                  <td>{quantityLabel}</td>
                  <td>${subtotal}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ItemsDisplay;