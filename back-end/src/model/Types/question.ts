export enum Range { 
one= 1,
two = 2,
three = 3, 
four = 4, 
five = 5
}

export enum QuestionType { 
    selection = 'selection',
    range= 'range',
    freeString = 'free'
}

export interface Question { 
order : number,
title:string,
type: QuestionType,
result?:  Array<string> // in case of selection 
required : boolean
}