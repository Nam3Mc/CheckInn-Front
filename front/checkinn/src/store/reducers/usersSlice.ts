import { PayloadAction, createSlice } from "@reduxjs/toolkit";
/* import { IUserState, IUser, Product } from "@/interfaces/interfaz"; */

const initialState: any = {
  data: [],
  userBox: [],
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    createUsers(state, action) {},
    readUsers(state, action: PayloadAction<any>) {
      state = action.payload;
    },
    updateUsers(state, action) {},
    deleteUsers(state, action) {},
    //reducers para caja del mes
    readUserBox(state, action: PayloadAction<any[]>) {
      state.userBox = state.userBox.concat(action.payload);
    },
    clearUserBox(state) {
      state.userBox = [];
    },
    /*   deleteUserBox(state, action: PayloadAction<string>) {
      state.userBox = state.userBox.filter(
        product => product.id !== action.payload
      );
    }, */
    //--------------------------
  },
});

export const {
  createUsers,
  readUsers,
  updateUsers,
  deleteUsers,
  readUserBox,
  clearUserBox,
  /*   deleteUserBox, */
} = usersSlice.actions;

export default usersSlice.reducer;
