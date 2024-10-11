import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { IColumn, IData, IMark, IStudent } from '../types/data';



export const fetchDataSource = createAsyncThunk<IData>(
  'dataSource/fetchData',
  async () => {
    const response: AxiosResponse<IData> = await axios.get<IData>('https://api.bilimal.kz/handbook/v1/test');
    return response.data
  }
);

interface IState{
  columns:IColumn[],
  data:IStudent[],
  loading:boolean,
  error: string | null | undefined;
}

const initialState:IState={
  columns:[],
  data:[],
  loading:false,
  error:'',
}

const dataSourceSlice = createSlice({
  name: 'dataSource',
  initialState,
  reducers: {
    updateMark: (state, action) => {
      const { id, dateKey, newMark } = action.payload;

      const record = state.data.find((item:any) => item.id === id);
      if (record && record[dateKey]) {
        record[dateKey].marks = record[dateKey].marks.map((mark:IMark) =>
          mark.key === newMark.key ? { ...mark, mark: newMark.mark } : mark
        );
      }
    },
    addMark: (state, action) => {
        const { id, dateKey, newMark } = action.payload;
        const record = state.data.find(item => item.id === id);
      
        if (record && record[dateKey]) {
          if (!Array.isArray(record[dateKey].marks)) {
            record[dateKey].marks = [];
          }
          if (record[dateKey].marks.length > 0) {
            record[dateKey].marks = record[dateKey].marks.map((markItem:IMark) => ({
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
      
        const record = state.data.find(item => item.id === id);
        if (record && record[dateKey]) {
          record[dateKey].marks = record[dateKey].marks.filter((mark:IMark) => mark.key !== markKey);
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
        state.data = action.payload.data || [];
        state.columns = action.payload.columns || [];
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