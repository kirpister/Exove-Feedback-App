export interface UserDetails {
  id: string;
  firstName: string;
  surName: string;
  email: string;
  roles: string[];
}

export interface FeedbackType {}
export interface PersonalType {
  avatar: string;
  birthDate: string;
}
export interface PersonalDetailType<T> {
  email: T;
  firstName: T;
  phone: T;
  surName: T;
}
export interface SelfFeedbackRequestsType {
  requestFeedbackId: { opened: boolean; id: string };
}
export interface WorkType<T> {
  departments: Array<T>;
  projects: Array<T>;
  roles:Array<T>;
  
}
export interface UserProfile {
  createdAt: string;
  feedBack: FeedbackType;
  personal: PersonalType;
  personalDetail: PersonalDetailType<string>;
  selfFeedbackRequests: Array<SelfFeedbackRequestsType>;
  updateAt: string;
  work: WorkType<string>;
}
