export enum Priority {
  Low,
  Medium,
  High
}

export enum Status {
  Pending,
  InProgress,
  Completed,
  Archived
}

export class Task {
  public id: number = 0;
  public title: string = '';
  public description: string = '';
  public dueDate: Date = new Date();
  public status: Status = Status.Pending;
  public priority: Priority = Priority.Low;

  constructor(){}
}
