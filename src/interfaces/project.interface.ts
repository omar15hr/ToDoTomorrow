export type ProjectId = string;

export interface Project {
  name: string;
  todos: Todo[];
}

export interface ProjectWithId extends Project {
  id: ProjectId;
}

export type TodoId = string;

export interface Todo {
  id: TodoId;
  title: string;
  description: string;
  completed: boolean;
  projectId: ProjectId;
}