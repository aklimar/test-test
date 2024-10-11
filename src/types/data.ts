import { ColumnType } from "antd/es/table";

interface IData{
    columns?:IColumn[];
    data:IStudent[];
}

interface IColumn extends ColumnType<IStudent>{
    key:string;
    title:string|number;
    dataIndex:string|number;
    children?:IColumn[];
}


interface IStudent{
    number:number;
    id:number;
    fio:string;
    [key: string]: any;
}

interface IMark{
    id?:number;
    key?:number;
    mark?:number|null;
    isEdit?:boolean;
    isDelete?:boolean;
}

interface IParentData{
    marks:IMark[]|boolean|null;
    isAdd:boolean;
    dateKey:string|number;
    fio:string;
    id:number;
}

export type { IData, IColumn, IStudent, IMark,IParentData };