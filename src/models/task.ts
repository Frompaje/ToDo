import { TaskRow } from "@/types/index.js";
import { pool } from "../config/db";

interface iTask {
  id: string;
  title: string;
  description: string;
  status: string;
}

export class Tasks {
  async findAll() {
    const [tasks] = await pool.query<TaskRow[]>(
      "SELECT * FROM task ORDER BY created_at ASC"
    );

    return tasks;
  }
  async createTask(input: iTask) {
    if (input.title == "" && input.description == "") {
      return;
      console.log("não foi possivel criar sua tesk");
    }
    if (input.title.length > 36 && input.description.length > 36) {
      return;
    }
    const createTaskResult = await pool.query(
      "INSERT INTO task (id,title,description,status) VALUES (?,?,?,?)",
      [input.id, input.title, input.description, input.status]
    );
    console.log("task criada com sucesso!");
    return createTaskResult;
  }
  async deleteTask(id: string) {
    const deleteTaskResult = await pool.query("DELETE FROM task WHERE id = ?", [
      id,
    ]);
    return deleteTaskResult;
  }
  async updateTask(input: iTask) {
    const query = await pool.query(
      "UPDATE task SET title =  ?, description = ?, status = ? WHERE id =?",
      [input.title, input.description, input.status, input.id]
    );
    return query;
  }
}
