import { RowDataPacket } from "mysql2";

export interface ITask {
  id: string;
  title: string;
  describle: string;
  progress: string;
}

export interface TaskRow extends RowDataPacket, ITask {}
