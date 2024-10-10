// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Table, Modal, Button } from 'antd';

// interface Column {
//   title: string;
//   dataIndex: string;
//   key: string;
//   children?: Column[];
// }

// interface Mark {
//   id?: number;
//   key?: number;
//   mark?: number | null;
//   mark_types_value_id?: number | null;
//   percent?: number;
//   isEdit?: boolean;
//   isDelete?: boolean;
// }

// interface DateEntry {
//   type: string;
//   date: string;
//   theme: string | null;
//   marks: Mark[] | null | false;
//   isAdd: boolean;
// }

// interface ApiResponse {
//   columns: Column[];
//   data: DataItem[];
// }

// interface DataItem {
//   number: number;
//   id: number;
//   fio: string;
//   [key: string]: number | string | DateEntry | undefined;
// }

// interface RowData {
//   [key: string]: string | number | null;
// }

// const App: React.FC = () => {
//   const [modalVisible, setModalVisible] = useState(false);
//   const [selectedMark, setSelectedMark] = useState<string | null>(null);
//   const [columns, setColumns] = useState<Column[]>([]);
//   const [data, setData] = useState<DataItem[]>([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get<ApiResponse>('https://api.bilimal.kz/handbook/v1/test');
//         const { columns, data } = response.data;
//         setColumns(columns);
//         setData(data);
//       } catch (error) {
//         console.error('Ошибка при получении данных:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   const processColumn = (column: Column, item: DataItem, row: RowData) => {
//     if (column.children && column.children.length > 0) {
//       column.children.forEach((childColumn) => {
//         processColumn(childColumn, item, row);
//       });
//     } else {
//       const key = column.dataIndex;
//       const value = item[key];

//       if (key === 'number' || key === 'fio') {
//         row[key] = typeof value === 'number' || typeof value === 'string' ? value : null;
//       } else {
//         const dateData = item[key] as DateEntry | null;
//         row[key] = dateData?.marks ? dateData.marks[0]?.mark ?? null : null;
//       }
//     }
//   };

//   const tableData: RowData[] = data.map((item) => {
//     const row: RowData = {};
//     columns.forEach((column) => {
//       processColumn(column, item, row);
//     });
//     return row;
//   });

//   return (
//     <div>
//       <h1>Оценки</h1>
//       <Table 
//         dataSource={tableData} 
//         columns={columns} 
//         rowKey="id"
//         pagination={{ pageSize: 11, position: ['bottomCenter'] }}
//         size='small'
//       />
//       <Modal 
//         title="Детали оценки" 
//         visible={modalVisible} 
//         footer={[
//           <Button key="close" onClick={() => setModalVisible(false)}>
//             Закрыть
//           </Button>,
//         ]}
//       >
//         <p>Оценка: {selectedMark}</p>
//       </Modal>
//     </div>
//   );
// };

// export default App;
const columns=[
  {
      "key": "number",
      "title": "#",
      "dataIndex": "number"
  },
  {
      "key": "fio",
      "title": "fio",
      "dataIndex": "fio"
  },
  {
      "title": "30.07",
      "key": "20240730118493_0",
      "children": [
          {
              "title": "",
              "dataIndex": "20240730118493",
              "key": "20240730118493",
              "lesson_id": 118493,
              "date_at": "2024-07-30 00:00:00",
              "theme": null,
              "background-color": "",
              "width": 1
          },
          {
              "title": "",
              "dataIndex": "20240730118493_2",
              "key": "20240730118493_2",
              "lesson_id": 118493,
              "date_at": "2024-07-30 00:00:00",
              "theme": null,
              "background-color": "",
              "width": 1
          }
      ]
  },
  {
      "title": "13.08",
      "key": "20240813125996_0",
      "children": [
          {
              "title": "",
              "dataIndex": "20240813125996",
              "key": "20240813125996",
              "lesson_id": 125996,
              "date_at": "2024-08-13 00:00:00",
              "theme": null,
              "background-color": "",
              "width": 1
          },
          {
              "title": "",
              "dataIndex": "20240813125996_2",
              "key": "20240813125996_2",
              "lesson_id": 125996,
              "date_at": "2024-08-13 00:00:00",
              "theme": null,
              "background-color": "",
              "width": 1
          }
      ]
  },
  {
      "title": "26.08",
      "key": "20240826118255_0",
      "children": [
          {
              "title": "",
              "dataIndex": "20240826118255",
              "key": "20240826118255",
              "lesson_id": 118255,
              "date_at": "2024-08-26 00:00:00",
              "theme": null,
              "background-color": "",
              "width": 1
          },
          {
              "title": "",
              "dataIndex": "20240826118255_2",
              "key": "20240826118255_2",
              "lesson_id": 118255,
              "date_at": "2024-08-26 00:00:00",
              "theme": null,
              "background-color": "",
              "width": 1
          }
      ]
  },
  {
      "title": "27.08",
      "key": "20240827118259_0",
      "children": [
          {
              "title": "",
              "dataIndex": "20240827118259",
              "key": "20240827118259",
              "lesson_id": 118259,
              "date_at": "2024-08-27 00:00:00",
              "theme": null,
              "background-color": "",
              "width": 1
          },
          {
              "title": "",
              "dataIndex": "20240827118259_2",
              "key": "20240827118259_2",
              "lesson_id": 118259,
              "date_at": "2024-08-27 00:00:00",
              "theme": null,
              "background-color": "",
              "width": 1
          }
      ]
  },
  {
      "title": "СР",
      "dataIndex": "20240827119588",
      "key": "20240827119588",
      "lesson_id": 119588,
      "date_at": "2024-08-27 00:00:00",
      "theme": null,
      "background-color": "rgb(204, 235, 254)",
      "column_type": 40,
      "width": 1,
      render: (text) => (
        <div>
            <p>{text.marks[0]?.mark}</p>
        </div>
    )
  },
  {
      "title": "Р1",
      "dataIndex": "20240925119589",
      "key": "20240925119589",
      "lesson_id": 119589,
      "date_at": "2024-09-25 12:11:00",
      "theme": null,
      "background-color": "rgb(243, 235, 248)",
      "column_type": 41,
      "width": 1
  },
  {
      "title": "Р1 (с учетом апелляции)",
      "dataIndex": "20241231119590",
      "key": "20241231119590",
      "lesson_id": 119590,
      "date_at": "2024-12-31 00:00:00",
      "theme": null,
      "background-color": "rgb(255, 252, 237)",
      "column_type": 42,
      "width": 1
  },
  {
      "title": "Р2",
      "dataIndex": "20241231119591",
      "key": "20241231119591",
      "lesson_id": 119591,
      "date_at": "2024-12-31 00:00:00",
      "theme": null,
      "background-color": "rgb(243, 235, 248)",
      "column_type": 43,
      "width": 1
  },
  {
      "title": "Р2 (с учетом апелляции)",
      "dataIndex": "20241231119592",
      "key": "20241231119592",
      "lesson_id": 119592,
      "date_at": "2024-12-31 00:00:00",
      "theme": null,
      "background-color": "rgb(255, 252, 237)",
      "column_type": 44,
      "width": 1
  },
  {
      "title": "Оценка рейтинга допуска",
      "dataIndex": "20241231119593",
      "key": "20241231119593",
      "lesson_id": 119593,
      "date_at": "2024-12-31 00:00:00",
      "theme": null,
      "background-color": "rgb(255, 240, 222)",
      "column_type": 45,
      "width": 1
  },
  {
      "title": "Экзамен",
      "dataIndex": "20241231119594",
      "key": "20241231119594",
      "lesson_id": 119594,
      "date_at": "2024-12-31 00:00:00",
      "theme": null,
      "background-color": "rgb(255, 227, 225)",
      "column_type": 46,
      "width": 1
  },
  {
      "title": "Экзамен (с учетом апелляции)",
      "dataIndex": "20241231119595",
      "key": "20241231119595",
      "lesson_id": 119595,
      "date_at": "2024-12-31 00:00:00",
      "theme": null,
      "background-color": "rgb(234, 254, 255)",
      "column_type": 47,
      "width": 1
  },
  {
      "title": "Итоговая оценка",
      "dataIndex": "20241231119596",
      "key": "20241231119596",
      "lesson_id": 119596,
      "date_at": "2024-12-31 00:00:00",
      "theme": null,
      "background-color": "rgb(238, 249, 232)",
      "column_type": 48,
      "width": 2
  }
]

const students=[
  {
      "number": 1,
      "id": 1641,
      "fio": "АХМЕТЖАНОВ ТИМУР АЙДОСОВИЧ",
      "20240730118493": {
          "type": "basic",
          "date": "2024-07-30",
          "theme": null,
          "marks": false,
          "isAdd": true
      },
      "20240813125996": {
          "type": "basic",
          "date": "2024-08-13",
          "theme": null,
          "marks": false,
          "isAdd": true
      },
      "20240826118255": {
          "type": "basic",
          "date": "2024-08-26",
          "theme": null,
          "marks": false,
          "isAdd": true
      },
      "20240827118259": {
          "type": "basic",
          "date": "2024-08-27",
          "theme": null,
          "marks": [
              {
                  "id": 24333,
                  "key": 24333,
                  "mark": 12,
                  "mark_types_value_id": null,
                  "percent": 12,
                  "isEdit": true,
                  "isDelete": true
              }
          ],
          "isAdd": false
      },
      "20240827118259_2": {
          "type": "basic",
          "date": "2024-08-27",
          "theme": null,
          "marks": false,
          "isAdd": true
      },
      "20240827119588": {
          "type": "basic",
          "date": "2024-08-27",
          "theme": null,
          "marks": [
              {
                  "mark": 12
              }
          ],
          "isAdd": false
      },
      "20240925119589": {
          "type": "basic",
          "date": "2024-09-25",
          "theme": null,
          "marks": null,
          "isAdd": false
      },
      "20241231119590": {
          "type": "basic",
          "date": "2024-12-31",
          "theme": null,
          "marks": null,
          "isAdd": false
      },
      "20241231119591": {
          "type": "basic",
          "date": "2024-12-31",
          "theme": null,
          "marks": null,
          "isAdd": false
      },
      "20241231119592": {
          "type": "basic",
          "date": "2024-12-31",
          "theme": null,
          "marks": null,
          "isAdd": false
      },
      "20241231119593": {
          "type": "system",
          "date": "2024-12-31",
          "theme": null,
          "marks": [
              {
                  "mark": null
              }
          ],
          "isAdd": false
      },
      "20241231119594": {
          "type": "main-system",
          "date": "2024-12-31",
          "theme": null,
          "marks": null,
          "isAdd": false
      },
      "20241231119595": {
          "type": "main-system",
          "date": "2024-12-31",
          "theme": null,
          "marks": null,
          "isAdd": false
      },
      "20241231119596": {
          "type": "main-system",
          "date": "2024-12-31",
          "theme": null,
          "marks": [
              {
                  "mark": null
              }
          ],
          "isAdd": false
      }
  }
]
