// @ts-nocheck
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchDataSource = createAsyncThunk('dataSource/fetchData', async () => {
  const response = await axios.get('https://api.bilimal.kz/handbook/v1/test');
  return response; 
});

const dataSourceSlice = createSlice({
  name: 'dataSource',
  initialState: {
    data: []
  },
  reducers: {
    updateMark: (state, action) => {
      const { id, dateKey, newMark } = action.payload;

      const record = state.data.data.find((item:any) => item.id === id);
      if (record && record[dateKey]) {
        record[dateKey].marks = record[dateKey].marks.map(mark =>
          mark.key === newMark.key ? { ...mark, mark: newMark.mark } : mark
        );
      }
    },
    addMark: (state, action) => {
        const { id, dateKey, newMark } = action.payload;
        const record = state.data.data.find(item => item.id === id);
      
        if (record && record[dateKey]) {
          if (!Array.isArray(record[dateKey].marks)) {
            record[dateKey].marks = [];
          }
          if (record[dateKey].marks.length > 0) {
            record[dateKey].marks = record[dateKey].marks.map(markItem => ({
              ...markItem,
              mark: newMark
            }));
          } else {
            record[dateKey].marks.push({
              key: new Date().getTime(),
              mark: newMark,
              id: new Date().getTime(),
              percent: null,
              isEdit: true,
              isDelete: true, 
            });
          }
      
          console.log('Обновили marks:', record[dateKey].marks);
        }
      },
      deleteMark: (state, action) => {
        const { id, dateKey, markKey } = action.payload;
      
        const record = state.data.data.find(item => item.id === id);
        if (record && record[dateKey]) {
          record[dateKey].marks = record[dateKey].marks.filter(mark => mark.key !== markKey);
        }
      },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDataSource.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDataSource.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.loading = false;
      })
      .addCase(fetchDataSource.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});


export const { updateMark, addMark, deleteMark } = dataSourceSlice.actions;
export default dataSourceSlice.reducer;