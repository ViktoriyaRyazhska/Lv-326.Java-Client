export class List {
  id: number;
  name: string;
  createTime: string;
  updateTime: string;
  sequenceNumber: number;
  boardId: number;

  // dont ask why
  isEditListNameInProgress = false;

  constructor() {
  }

}
