export interface TaskResitory {
  return(id: string): Promise<Task>;

  findById(id: string): Promise<Task>;

  create(
    id: string,
    title: string,
    description: string,
    status: string
  ): Promise<Task>;
  delete(userId: string, taskId: string): Promise<Task>;
  update(
    userId: string,
    taskId: string,
    title: string,
    description: string,
    status: string
  ): Promise<Task>;
}

export type Task = {
  id: string;
  title: string;
  description: string;
  status: string;
  created_at: Date;
  updated_at: Date;
  userId: string;
};
