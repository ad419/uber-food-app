import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    sendNotification: (state, action) => {
      state.items = [...state.items, action.payload];
    },
    clearNotifications: (state, action) => {
      state.items = [];
    },
    removeNotification: (state, action) => {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id
      );

      let newNotification = [...state.items];

      if (index >= 0) {
        newNotification.splice(index, 1);
      } else {
        console.warn(
          `cant remove product id: ${action.payload.id} is not in the wishlist`
        );
      }

      state.items = newNotification;
    },
  },
});

// Action creators are generated for each case reducer function
export const { sendNotification, clearNotifications, removeNotification } =
  notificationSlice.actions;

export const selectNotificationItems = (state) => {
  const result = state.notification.items;
  return result;
};
export const selectNotificationItemsWsingId = (state, id) =>
  state.notifications?.items.filter((item) => item.id === id);

export default notificationSlice.reducer;
