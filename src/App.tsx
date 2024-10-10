//@ts-nocheck
import React, { useEffect, useState } from 'react';
import { Table, Modal, Input, Button } from 'antd';
import { useAppDispatch } from './hook/useAppDispatch';
import { fetchDataSource, updateMark, deleteMark, addMark } from './slices/gradesSlice'; // Импортируйте необходимые редьюсеры
import { useAppSelector } from './hook/useAppSelector';
import { EditOutlined, DeleteOutlined, PlusOutlined, EyeOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector(state => state.dataSource.data);
  const columns = data?.columns || [];

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedMarks, setSelectedMarks] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [actionType, setActionType] = useState(null);
  const [recordId, setRecordId] = useState(null);
  const [fio, setFio] = useState('')

  useEffect(() => {
    dispatch(fetchDataSource());
  }, [dispatch]);

  const showModal = (marks, parentData) => {
    setSelectedMarks(marks);
    setActionType(parentData);
    setIsModalVisible(true);
    setInputValue('');
    setRecordId(parentData.id);
    setFio(parentData.fio)
  };

  const handleInputChange = (e) => {
    const { value } = e.target;
    const numericValue = value.replace(/[^0-9]/g, '');
    if (numericValue === '' || (numericValue >= 0 && numericValue <= 100)) {
      setInputValue(numericValue);
    }
  };

  const handleDelete = () => {
    if (selectedMarks) {
      const markKey = selectedMarks[0]?.key;
      if (markKey) {
        dispatch(deleteMark({ id: recordId, dateKey: actionType.dateKey, markKey }));
      }
      setIsModalVisible(false);
    }
  };


  const handleAdd = () => {
    if (inputValue && recordId) {
      const newMark = inputValue
      dispatch(addMark({ id: recordId, dateKey: actionType.dateKey, newMark }));
      setIsModalVisible(false)
    }
  };

  const handleUpdate = () => {
    if (inputValue && selectedMarks) {
      const markKey = selectedMarks[0]?.key;
      if (markKey) {
        const newMark = { key: markKey, mark: inputValue };
        dispatch(updateMark({ id: recordId, dateKey: actionType.dateKey, newMark }));
      }
      setIsModalVisible(false);
    }
  };

  const renderColumns = () => {
    return columns.map((column) => {
      if (column.children) {
        return {
          ...column,
          children: column.children.map((child) => ({
            ...child,
            align: 'center',
            width: 100,
            render: (text, record) => {
              const cellData = record[child.dataIndex];
              if (!cellData) {
                return (<div>н</div>)
              }
              if (cellData && cellData.marks && cellData.marks.length > 0) {
                return (
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                    <Button
                      icon={cellData.marks[0]?.isEdit && 
                        (<EditOutlined /> ) 
                      }
                      onClick={() => showModal(cellData.marks, { ...cellData, id: record.id, dateKey: child.dataIndex, fio: record.fio })}
                      style={{ cursor: 'pointer' }}
                    >
                      {cellData.marks[0]?.mark}
                    </Button>
                  </div>
                );
              }
              if (cellData?.marks && !cellData?.isAdd) {
                return (
                  <div style={{ display: 'flex', alignItems: 'center', color: 'red' }}>
                    <ExclamationCircleOutlined style={{ marginRight: '8px', fontSize: '16px' }} /> 
                    Удалено 
                  </div> 
                );
              }
              return (
                <Button
                  icon={<PlusOutlined />}
                  onClick={() => showModal(cellData.marks, { ...cellData, id: record.id, dateKey: child.dataIndex, fio: record.fio })}
                  style={{ cursor: 'pointer' }}
                >
                  {cellData.marks[0]?.mark}
                </Button>
              );
            },
          })),
        };
      }

      return {
        ...column,
        align: 'center',
        minWidth: 100,
        render: (text, record) => {
          if (column.dataIndex === 'fio' || column.dataIndex === 'number') {
            return <div>{text}</div>;
          }
          const cellData = text;
          if (!cellData) {
            return (<div>н</div>)
          }
          if (cellData?.marks && cellData.marks.length > 0) {
            return (
              <div
                onClick={() => showModal(cellData.marks, { ...cellData, id: record.id, dateKey: column.dataIndex, fio: record.fio })} 
                style={{ cursor: 'pointer' }}
              >
                {cellData.marks[0]?.mark}
              </div>
            );
          }

          return (
            <div
              onClick={() => showModal(cellData.marks, { ...cellData, id: record.id, dateKey: column.dataIndex, fio: record.fio })}
              style={{ cursor: 'pointer' }}
            >
              -
            </div>
          );
        },
      };
    });
  };

  return (
    <div>
      <h1>Оценки</h1>
      <Table
        columns={renderColumns()}
        dataSource={data.data}
        rowKey="id"
        pagination={false}
        size='small'
      />

      <Modal
        title="Оценки"
        visible={isModalVisible}
        onCancel={()=>{setIsModalVisible(false)}}
        footer={null}
      >
        {selectedMarks && selectedMarks.length > 0 ? (
          selectedMarks.map((mark, index) => (
            <div key={index}>{mark.mark}</div>
          ))
        ) : (
          <div>Нет оценок</div>
        )}

{actionType?.marks?.[0]?.isEdit && (
  <>
    <div>Редактирование оценки - {fio}</div>
    <Input
      placeholder="Введите новую оценку"
      value={inputValue}
      onChange={handleInputChange}
      style={{ marginTop: 16 }}
    />
    <Button type="primary" style={{ marginTop: 8 }} onClick={handleUpdate}>
      Сохранить
    </Button>
  </>
)}

{actionType?.marks?.[0]?.isDelete && (
  <Button type="danger" onClick={handleDelete} style={{ marginTop: 16 }}>
    Удалить
  </Button>
)}

{(!actionType?.marks || actionType?.marks?.length === 0) && actionType?.isAdd && (
  <>
    <div>Выставление оценки - {fio}</div>
    <Input
      placeholder="Введите оценку"
      value={inputValue}
      onChange={handleInputChange}
      style={{ marginTop: 16 }}
    />
    <Button type="primary" style={{ marginTop: 8 }} onClick={handleAdd}>
      Добавить
    </Button>
  </>
)}
      </Modal>
    </div>
  );
};

export default App;