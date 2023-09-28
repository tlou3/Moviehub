import { createSlice } from "@reduxjs/toolkit";

export const homeSlice = createSlice({
    name: "home",
    initialState: {
        url: {name:"fff"},//fill this from api call,init empt
        genres: {},
    },
    reducers: {
        getApiConfiguration: (state, action) => {//stat->initstat passing,acti->which we pass whil using
            state.url = action.payload;// new val saved in url
        },
        getGenres: (state, action) => {
            state.genres = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { getApiConfiguration, getGenres } = homeSlice.actions;

export default homeSlice.reducer;