export const getItemsFromTotalCost = (venueItems, avItems, mealsItems, numberOfPeople) => {
    const items = [];
  
    venueItems.forEach(item => {
      if (item.quantity > 0) {
        items.push({ ...item, type: "venue" });
      }
    });
  
    avItems.forEach(item => {
      if (item.quantity > 0) {
        items.push({ ...item, type: "av" });
      }
    });
  
    mealsItems.forEach(item => {
      if (item.selected) {
        const itemForDisplay = { ...item, type: "meals" };
        if (item.numberOfPeople) {
          itemForDisplay.numberOfPeople = numberOfPeople;
        }
        items.push(itemForDisplay);
      }
    });
  
    return items;
  };