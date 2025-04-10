import React, { useState } from "react";
import "../styles/ConferenceEvent.css";
import TotalCost from "./TotalCost";
import ItemsDisplay from "./ItemsDisplay";
import VenueSelection from "./VenueSelection";
import AddonsSelection from "./AddonsSelection";
import MealsSelection from "./MealsSelection";
import Navbar from "./Navbar";

import { useSelector, useDispatch } from "react-redux";
import { toggleMealSelection } from "../redux/mealsSlice";
import { incrementAvQuantity, decrementAvQuantity } from "../redux/avSlice";
import { incrementQuantity, decrementQuantity } from "../redux/venueSlice";

import { calculateTotalCost } from "../utils/costCalculations";
import { getItemsFromTotalCost } from "../utils/itemUtils";

const ConferenceEvent = () => {
  const [showItems, setShowItems] = useState(false);
  const [numberOfPeople, setNumberOfPeople] = useState(1);

  const venueItems = useSelector((state) => state.venue);
  const avItems = useSelector((state) => state.av);
  const mealsItems = useSelector((state) => state.meals);

  const dispatch = useDispatch();

  const remainingAuditoriumQuantity = 3 - venueItems.find(item => item.name === "Auditorium Hall (Capacity:200)").quantity;

  const handleAddToCart = (index) => {
    const item = venueItems[index];
    if (item.name === "Auditorium Hall (Capacity:200)" && item.quantity >= 3) return;
    dispatch(incrementQuantity(index));
  };

  const handleRemoveFromCart = (index) => {
    if (venueItems[index].quantity > 0) {
      dispatch(decrementQuantity(index));
    }
  };

  const handleIncrementAvQuantity = (index) => dispatch(incrementAvQuantity(index));
  const handleDecrementAvQuantity = (index) => dispatch(decrementAvQuantity(index));

  const handleMealSelection = (index) => {
    const item = mealsItems[index];
    if (item.selected && item.type === "mealForPeople") {
      const newNumberOfPeople = item.selected ? numberOfPeople : 0;
      dispatch(toggleMealSelection(index, newNumberOfPeople));
    } else {
      dispatch(toggleMealSelection(index));
    }
  };

  const items = getItemsFromTotalCost(venueItems, avItems, mealsItems, numberOfPeople);

  const venueTotalCost = calculateTotalCost(venueItems, "venue");
  const avTotalCost = calculateTotalCost(avItems, "av");
  const mealsTotalCost = calculateTotalCost(mealsItems, "meals", numberOfPeople);

  const totalCosts = {
    venue: venueTotalCost,
    av: avTotalCost,
    meals: mealsTotalCost,
  };

  const navigateToProducts = (idType) => {
    if (["#venue", "#addons", "#meals"].includes(idType)) {
      if (!showItems) {
        setShowItems(true);
      }
    }
  };

  return (
    <>
      <Navbar
        showItems={showItems}
        toggleShowItems={() => setShowItems(!showItems)}
        onNavigate={navigateToProducts}
      />

      <div className="main_container">
        {!showItems ? (
          <div className="items-information">
            <VenueSelection
              venueItems={venueItems}
              remainingAuditoriumQuantity={remainingAuditoriumQuantity}
              onAdd={handleAddToCart}
              onRemove={handleRemoveFromCart}
              totalCost={venueTotalCost}
            />

            <AddonsSelection
              avItems={avItems}
              onAdd={handleIncrementAvQuantity}
              onRemove={handleDecrementAvQuantity}
              totalCost={avTotalCost}
            />

            <MealsSelection
              mealsItems={mealsItems}
              numberOfPeople={numberOfPeople}
              onPeopleChange={setNumberOfPeople}
              onToggle={handleMealSelection}
              totalCost={mealsTotalCost}
            />
          </div>
        ) : (
          <div className="total_amount_detail">
            <TotalCost totalCosts={totalCosts} ItemsDisplay={() => <ItemsDisplay items={items} numberOfPeople={numberOfPeople} />} />
          </div>
        )}
      </div>
    </>
  );
};

export default ConferenceEvent;