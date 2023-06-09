import { answerFeedback } from "../../features/answerFeedbackSlicer";
import { requestFeedback } from "../../features/requestFeedback";

export interface personalDetailType extends answerFeedback,requestFeedback {
  [x: string]: any;
  id: string;
  personalDetail: {
    id: string;
    personalDetail: {
      id: string;
      username: string;
      firstName: string;
      surName: string;
      email: string;
      phone: string;
      password: string;
    };
    personal: {
      horrific: string;
      birthDate: string;
      gender: string;
      avatar: string;
      hobbies: Array<string>;
    };
    work: {
      departments: Array<string>;
      roles: Array<string>;
      startDate: string;
      projects: Array<string>;
    };
    selfFeedbackRequests: Array<any>;
    username: string;
    firstName: string;
    surName: string;
    email: string;
    phone: string;
    password: string;
  };
  personal: {
    horrific: string;
    birthDate: string;
    gender: string;
    avatar: string;
    hobbies: Array<string>;
  };
  work: {
    departments: Array<string>;
    roles: Array<string>;
    startDate: string;
    projects: Array<string>;
  };
  selfFeedbackRequests: any;
  feedBack:Array<any>
}

export interface DataType {
    data: {
      msg: string;
      data: personalDetailType[];
    };
    status: number;
  }
  
 export interface CheckedUser {
    id: number;
    personalDetail?: {
      firstName?: string;
      surName?: string;
    };
  }
