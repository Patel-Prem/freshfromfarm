import { createSlice } from "@reduxjs/toolkit";

const produceSlice = createSlice({
    name: "produce",
    initialState: {
        produceList: []
    },
    reducers: {
        addProduce: (state, action) => {

        },
        getAllProduces: (state, action) => {
            state.produceList = action.payload.produceList;
        },
        getProduce: (state, action) => {

        },
        updateProduce: (id) => {

        },
        deleteProduce: (id) => {

        },
    },
});

export const { getAllProduces } = authSlice.actions;
export default produceSlice.reducer;

export const selectProduceList = (state) => state.produce.produceList;