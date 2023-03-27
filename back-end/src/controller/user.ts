import { NextFunction, RequestHandler } from 'express';
import FeedbackModel from '../model/feedBack';
import { feedBackModel } from '../model/types/feedback';
import { QuestionType, Range } from '../model/types/question';
import { userModel } from '../model/types/user';
import UserModel from '../model/user';


export const getUser:RequestHandler  =async (req,res,next) => {
  // const userIdToken = req.body.userId
  // if ( userIdToken !== req.body.userId ) { 
  // return next(new Error())
  // }
  const userId ='6420950f17ceb74d959d6ab0'
  try {
    const user  = await UserModel.findOne({_id:userId})
    return res.status(200).json({user})
  } catch (error) {
    next(error)
  }
    
}


export const updateUserInfo:RequestHandler =async (req,res,next) => {
  const personalDetail = req.body 
  const id = '6420950f17ceb74d959d6ab0'
  // const userIdToken = req.body.userId
  // if ( userIdToken !== req.body.userId ) { 
  // return next(new Error())
  // }

  try {
    const user = await UserModel.findOne({_id :id})
    if ( !user ){
      return 
    }else if ( user as userModel){
      user.personalDetail.name = 'test'
    }
    await user?.save()
    return res.status(201).send('update success')
        
  } catch (error) {
    next(error)
  }
    
}

interface Answer {
   order: number;
   answer: string[];
}

interface ListAnswer {
   answers: Answer[];
}

export const updateUserFeedback: RequestHandler = async (req, res, next) => {
  const feedbackId = req.query.feedbackId;
  const userId = '641eea147069537347727491';
  const { answers } = req.body as ListAnswer;

  try {
    // 1. find the feedback
    const feedback = await FeedbackModel.findById(feedbackId);
    if (!feedback) {
      return next('No feedback found');
    }
    // 2. find user's place to answer
    const userIndex = feedback.userList.findIndex((i) => i.toString() === userId);
    if (userIndex === -1) {
      return next('User not found in the feedbacks list');
    }
    // 3. check both lenght of answer is correct
    const userAnswerLength = answers.length;
    const feedbackLength = feedback.details.questions.length;
    if (userAnswerLength !== feedbackLength) {
      return next('all answers must be found');
    }
    // 4. update answer from feedback
    for (const userAnswer of answers) {
      const questionIndex = feedback.answers[userIndex].details.findIndex(
        (q) => q.question.order === userAnswer.order
      );

      if (questionIndex === -1) {
        return res.status(400).json({ error: `Invalid answer order: ${userAnswer.order}` });
      }

      const { question } = feedback.answers[userIndex].details[questionIndex];
      switch (question.type) {
      case QuestionType.selection:
        if (question.result !== undefined) {
          const result = userAnswer.answer.every((element) => (question.result ?? []).includes(element));
          if (!result) {
            return next('result does not belong to the result list');
          } else {
            feedback.answers[userIndex].details[questionIndex].answer = userAnswer.answer
          }
        }
        break;
      case QuestionType.range:
        if (userAnswer.answer.length === 1) {
          if (userAnswer.answer[0] in Range) {
            feedback.answers[userIndex].details[questionIndex].answer= userAnswer.answer
          } else {
            return next('value should contain 1 value from 1 - 5');
          }
        }
        break;
      case QuestionType.freeString:
        feedback.answers[userIndex].details[questionIndex].answer =  userAnswer.answer
        // feedback.answers[userIndex].details[questionIndex]
        await feedback.save()
        break;
      default:
        return next(`Unknown question type: ${question.type}`);
      }
    }
    feedback.answers[userIndex].finished = true;
    // 5. find user and update feedback
    const user = await UserModel.findOne({ _id: userId });
    if (!user) return next('can not find user');
    for (const i of user.feedBack) {
      if (i.feedbackId.toString() === feedbackId) {
        i.finished = true;
      }
    }
    //6. update user vs feeedback
    await user.save();
    await feedback.updateOne(feedback)
    return res.status(200).json({ msg: 'Answer updated successfully' });
  } catch (error) {
    next(error);
  }
};
