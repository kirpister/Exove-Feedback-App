export interface UserAnswerType {
  order: number;
  answer: string[];
}

export interface UserDetailsType {
  employeeNumber: string;
  roles: string[];
}

export interface ListAnswerType {
  answers: UserAnswerType[];
  userDetails: UserDetailsType;
}


