export const calculateTotalCost = (items, type, numberOfPeople = 1) => {
    return items.reduce((total, item) => {
      if (type === "meals" && item.selected) {
        return total + item.cost * numberOfPeople;
      } else if (item.quantity > 0) {
        return total + item.cost * item.quantity;
      }
      return total;
    }, 0);
  };