export const initialState = {
  basket: [],
  user: null,
  search: [],
};

export const getBasketTotal = (basket) =>
  basket?.reduce((amount, item) => parseInt(item.price) + amount, 0);

export default function reducer(state, action) {
  switch (action.type) {
    case "SET_SEARCH":
      return { ...state, search: action.payload };

    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };

    case "ADD_TO_BASKET":
      return { ...state, basket: [...state.basket, action.item] };

    case "EMPTY_BASKET":
      return { ...state, basket: [] };
    case "REMOVE_FROM_BASKET":
      let newBasket = [...state.basket];
      const index = state.basket.findIndex(
        (basketItem) => basketItem.id === action.id
      );

      if (index >= 0) {
        newBasket.splice(index, 1);
      } else {
        console.warn("can not remove");
      }
      return { ...state, basket: newBasket };
    default:
      return state;
  }
}
