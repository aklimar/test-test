// @ts-nocheck
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// interface Mark {
//     id?: number; // Поле может отсутствовать
//     key?: number; // Поле может отсутствовать
//     mark?: number | null; // Оценка может быть null
//     mark_types_value_id?: number | null; // Поле может отсутствовать
//     percent?: number; // Процент
//     isEdit?: boolean; // Поле может отсутствовать
//     isDelete?: boolean; // Поле может отсутствовать
//   }
  
//   interface DateRecord {
//     type: string; // Тип записи
//     date: string; // Дата в формате YYYY-MM-DD
//     theme: string | null; // Тематика, может быть null
//     marks: Mark[] | boolean | null; // Оценки могут быть массивом, false или null
//     isAdd: boolean; // Флаг добавления
//   }
  
//   interface DataItem {
//     number: number; // Поле с фиксированным типом
//     id: number; // Поле с фиксированным типом
//     fio: string; // Поле с фиксированным типом
//     [dateKey: string]: DateRecord | number | string; // Динамические ключи могут быть DateRecord, number или string
//   }

//   interface DataSourceState {
//     data: DataItem[]; // Массив объектов данных
//     loading: boolean; // Флаг загрузки
//     error: string | null; // Ошибка, если есть
//   }
// Создаем асинхронное действие для получения данных
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
      
        // Находим запись по id
        const record = state.data.data.find(item => item.id === id);
      
        if (record && record[dateKey]) {
          // Если 'marks' не является массивом или равно false, инициализируем его как пустой массив
          if (!Array.isArray(record[dateKey].marks)) {
            record[dateKey].marks = [];
          }
      
          // Проверяем, есть ли уже оценки
          if (record[dateKey].marks.length > 0) {
            // Обновляем существующие оценки
            record[dateKey].marks = record[dateKey].marks.map(markItem => ({
              ...markItem,
              mark: newMark // Обновляем поле 'mark'
            }));
          } else {
            // Если массив пуст, добавляем новую оценку
            record[dateKey].marks.push({
              key: new Date().getTime(), // Уникальный ключ для новой оценки
              mark: newMark,
              id: new Date().getTime(), // Можете поменять на свой идентификатор
              percent: null, // Значение процента, если нужно
              isEdit: true, // Флаг редактирования
              isDelete: true, // Флаг удаления
            });
          }
      
          console.log('Обновили marks:', record[dateKey].marks);
        }
      },
      deleteMark: (state, action) => {
        const { id, dateKey, markKey } = action.payload;
      
        const record = state.data.data.find(item => item.id === id);
        if (record && record[dateKey]) {
          console.log('Ключи для удаления:', markKey); // Лог для проверки
          console.log('Существующие оценки:', record[dateKey].marks); // Лог для проверки существующих оценок
      
          // Удаляем оценку по ключу
          record[dateKey].marks = record[dateKey].marks.filter(mark => mark.key !== markKey);
          console.log('Оценки после удаления:', record[dateKey].marks); // Лог для проверки
      
          
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
        state.data = action.payload.data; // Сохраняем данные в состояние
        state.loading = false;
      })
      .addCase(fetchDataSource.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message; // Обработка ошибок
      });
  },
});

// Экспортируем редьюсеры
export const { updateMark, addMark, deleteMark } = dataSourceSlice.actions;
export default dataSourceSlice.reducer;