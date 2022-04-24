import {createSlice, createSelector} from "@reduxjs/toolkit";

export const makeCellRef = (sheetId, row, col) => ({sheetId, row, col});

export const boardSlice = createSlice({
  name: "board",

  initialState: {
    title: "Demo Board",
    sheets: {
      "iboiF2CaxeS9UbnNaW2yX": {
        size: {w: 3, h: 7},
        values: [],
      },
    },
  },

  reducers: {
    setCellValue(state, action) {
      const {cellRef: {sheetId, row, col}, value} = action.payload;
      const {values} = state.sheets[sheetId];
      values[row] ||= [];
      values[row][col] = value;
    },
  },
});

const selectSheets = state => state.board.sheets;
const selectSheetId = (state, id) => id;

const selectCellRefSheetId = (state, cellRef) => cellRef.sheetId;
const selectCellRefRow = (state, cellRef) => cellRef.row;
const selectCellRefCol = (state, cellRef) => cellRef.col;

export const selectSheetSize = createSelector(
  [selectSheets, selectSheetId],
  (sheets, sheetId) => sheets[sheetId].size,
);

export const selectCellValue = createSelector(
  [selectSheets, selectCellRefSheetId, selectCellRefRow, selectCellRefCol],
  (sheets, sheetId, row, col) => {
    const {values} = sheets[sheetId];
    return values[row] && values[row][col];
  },
);

export const {setCellValue} = boardSlice.actions;

export default boardSlice.reducer;
