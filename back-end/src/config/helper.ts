import { Question, QuestionType } from '../model/types/question';

interface Answer {
  order: number,
  type:QuestionType,
  answer: Range | string | Array<string>
}

