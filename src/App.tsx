import React, { useEffect, useState } from 'react';
import { Table, Modal, Input, Button, Tooltip } from 'antd';
import { useAppDispatch } from './hook/useAppDispatch';
import { fetchDataSource, updateMark, deleteMark, addMark } from './slices/gradesSlice'; // Импортируйте необходимые редьюсеры
import { useAppSelector } from './hook/useAppSelector';
import { EditOutlined, PlusOutlined, ExclamationCircleOutlined, StopOutlined, QuestionOutlined } from '@ant-design/icons';
import { IMark, IParentData, IStudent } from './types/data';
import { ColumnGroupType, ColumnType } from 'antd/es/table';

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const { data, columns } = useAppSelector(state => state.dataSource);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedMarks, setSelectedMarks] = useState<IMark[] | boolean | null>(null);
  const [inputValue, setInputValue] = useState<number | null>(null);
  const [actionType, setActionType] = useState<IParentData | null>(null);
  const [recordId, setRecordId] = useState<number | null>(null);
  const [fio, setFio] = useState('')

  useEffect(() => {
    dispatch(fetchDataSource());
  }, [dispatch]);

  const showModal = (parentData: IParentData) => {
    setSelectedMarks(parentData.marks);
    setActionType(parentData);
    setIsModalVisible(true);
    setInputValue(null);
    setRecordId(parentData.id);
    setFio(parentData.fio);
    console.log(123, parentData)
  };


  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = Number(e.target.value)
    if (value >= 0 && value <= 100) {
      setInputValue(value);
    }
  };

  const handleDelete = () => {
    if (Array.isArray(selectedMarks) && selectedMarks.length > 0) {
      const markKey = selectedMarks[0]?.key;
      if (markKey) {
        dispatch(deleteMark({ id: recordId, dateKey: actionType?.dateKey, markKey }));
      }
      setIsModalVisible(false);
    }
  };


  const handleAdd = () => {
    if (inputValue && recordId) {
      const newMark = inputValue
      dispatch(addMark({ id: recordId, dateKey: actionType?.dateKey, newMark }));
      setIsModalVisible(false)
    }
  };

  const handleUpdate = () => {
    if (inputValue !== null && Array.isArray(selectedMarks) && selectedMarks.length > 0) {
      const markKey = selectedMarks[0]?.key;
      if (markKey) {
        const newMark = { key: markKey, mark: inputValue };
        dispatch(updateMark({ id: recordId, dateKey: actionType?.dateKey, newMark }));
      }
      setIsModalVisible(false);
    }
  };

  const renderColumns = (): (ColumnGroupType<IStudent> | ColumnType<IStudent>)[] =>  {
    return columns.map((column) => {
      if (column.children) {
        return {
          ...column,
          children: column.children.map((child, index) => ({
            ...child,
            align: 'center',
            width: 100,
            title: index % 2 === 0 ? 'День' : 'Ночь',
            render: (text:any, record: any) => {
              const cellData = record[child.dataIndex];
              if (!cellData) {
                return (<Tooltip title="Ученик отсутствовал">
                  <StopOutlined />
                </Tooltip>)
              }
              if (cellData && cellData.marks) {
                return cellData.marks[0]?.isEdit ? (
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                    <Button
                      icon={<EditOutlined />}
                      onClick={() => showModal({ ...cellData, id: record.id, dateKey: child.dataIndex, fio: record.fio })}
                      style={{ cursor: 'pointer' }}
                    >
                      {cellData.marks[0]?.mark}
                    </Button>
                  </div>
                ) : !cellData?.isAdd
                  ?
                  (
                    <div style={{ display: 'flex', alignItems: 'center', color: 'red' }}>
                      <ExclamationCircleOutlined style={{ marginRight: '8px', fontSize: '16px' }} />
                      Удалено
                    </div>
                  )
                  :
                  (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                      <Button
                        icon={<PlusOutlined />}
                        onClick={() => showModal({ ...cellData, id: record.id, dateKey: child.dataIndex, fio: record.fio })}
                        style={{ cursor: 'pointer' }}
                      />
                    </div>
                  )
              }
              return (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                  <Button
                    icon={<PlusOutlined />}
                    onClick={() => showModal({ ...cellData, id: record.id, dateKey: child.dataIndex, fio: record.fio })}
                    style={{ cursor: 'pointer' }}
                  />
                </div>
              )
            },
          })),
        };
      }

      return {
        ...column,
        align: 'center',
        minWidth: 100,
        render: (text:any, record: any) => {
          if (column.dataIndex === 'fio' || column.dataIndex === 'number') {
            return <div>{text}</div>;
          }
          const cellData = text;
          if (!cellData) {
            return (<Tooltip title="Ученик отсутствовал">
              <StopOutlined />
            </Tooltip>)
          }
          if (cellData?.marks) {
            return (
              <Tooltip title={cellData.marks[0]?.mark}>
                <div>
                  {cellData.marks[0]?.mark}
                </div>
              </Tooltip>
            );
          }
          else
            return (
              (<Tooltip title="Оценка недоступна">
                <QuestionOutlined />
              </Tooltip>)
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
        dataSource={data}
        rowKey="id"
        pagination={false}
        size='small'
      />

      <Modal
        title="Оценка"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        {Array.isArray(selectedMarks) && selectedMarks.length > 0 ? (
          selectedMarks.map((mark, index) => (
            <div key={index}>Текущая оценка - {mark.mark}</div>
          ))
        ) : (
          <div>Нет оценок</div>
        )}

        {actionType && Array.isArray(actionType.marks) && actionType.marks.length > 0 && actionType.marks[0].isEdit && (
          <>
            <div>Редактирование оценки - {fio}</div>
            <Input
              type="number"
              placeholder="Введите новую оценку"
              value={inputValue||''}
              onChange={handleInputChange}
              style={{ marginTop: 16 }}
            />
            <Button type="primary" style={{ marginTop: 8 }} onClick={handleUpdate}>
              Сохранить
            </Button>
          </>
        )}

        {actionType && Array.isArray(actionType.marks) && actionType.marks.length > 0 && actionType.marks[0].isDelete && (
          <Button onClick={handleDelete} style={{ marginTop: 16, marginLeft:10 }}>
            Удалить
          </Button>
        )}

        {(!actionType?.marks || !Array.isArray(actionType.marks) || actionType.marks.length === 0) && actionType?.isAdd && (
          <>
            <div>Выставление оценки - {fio}</div>
            <Input
              placeholder="Введите оценку"
              value={inputValue||''}
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