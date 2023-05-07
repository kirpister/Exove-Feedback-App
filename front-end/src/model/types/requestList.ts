export interface personalRequestListType {
  id: string;
  requestUserId: string;
  createFeedbackId: null| string;
  opened: boolean;
  userList: Array<string>
}
