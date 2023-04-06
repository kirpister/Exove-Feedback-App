import {  RequestHandler } from 'express';
import FeedbackModel from '../model/feedBackModel';
import { ListAnswerType } from '../model/types/answer';
import { QuestionType, Range } from '../model/types/question';
import { userModel } from '../model/types/user';
import UserModel from '../model/userModel'
import { createErrMessage, createSuccessMessage } from '../utils/message';
import { StatusCode_Success,StatusCode_Err } from '../utils/statusCode';



export const getUser:RequestHandler  =async (req,res,next) => {
  const userId ='641eea147069537347727491'
  try {
    const user  = await UserModel.findOne({_id:userId})
    if ( !user) { 
      return  createErrMessage({
        msg: 'user fail', status: StatusCode_Err.RESOURCE_NOT_FOUND},next)
    }
    return createSuccessMessage({msg:`get user ${user.id} success`,status: StatusCode_Success.NEW_DATA_CREATED},res,user)
  } catch (error) {
    next(error)
  }
    
}


export const updateUserInfo:RequestHandler =async (req,res,next) => {
  // const personalDetail = req.body 
  const id = '6420950f17ceb74d959d6ab0'
  // const userIdToken = req.body.userId
  // if ( userIdToken !== req.body.userId ) { 
  // return next(new Error())
  // }

  try {
    const user = await UserModel.findOne({_id :id})
    if ( !user ){
      return createErrMessage({ msg: `no user with id: ${id}`, status: StatusCode_Err.RESOURCE_NOT_FOUND},next)   
    }
    else if ( user as userModel){
      user.personalDetail.name = 'test'
    }
    await user?.save()
    return createSuccessMessage({msg:`new user ${user.id} have been updated`,status:StatusCode_Success.NEW_DATA_CREATED},res)
  } catch (error) {
    next(error)
  }
    
}


export const updateUserFeedback: RequestHandler = async (req, res, next) => {
  const feedbackId = req.query.feedbackId;
  const userId = '641eea147069537347727491';
  const { answers } = req.body as ListAnswerType;

  try {
    // 1. find the feedback
    const feedback = await FeedbackModel.findById(feedbackId);
    if (!feedback) {
      return createErrMessage({
        msg: `feedback with Id: ${feedbackId} not found`, status: StatusCode_Err.RESOURCE_NOT_FOUND
      },next)
    }
    // 2. find user's place to answer
    const userIndex = feedback.userList.findIndex((i) => i.toString() === userId);
    if (userIndex === -1) {
      return createErrMessage({msg:`user ${userId} not found on feedback list`,status:StatusCode_Err.RESOURCE_NOT_FOUND},next)
    }
    // 3. check both lenght of answer is correct
    const userAnswerLength = answers.length;
    const feedbackLength = feedback.details.questions.length;
    if (userAnswerLength !== feedbackLength) {
      return createErrMessage({msg:'Answer not enough',status:StatusCode_Err.BAD_REQUEST_INVALID_SYNTAX},next) ;
    }
    // 4. update answer from feedback
    for (const userAnswer of answers) {
      const questionIndex = feedback.answers[userIndex].details.findIndex(
        (q) => q.question.order === userAnswer.order
      );

      if (questionIndex === -1) {
        // return res.status(400).json({ error: `Invalid answer order: ${userAnswer.order}` });
        return createErrMessage({msg:`Invalid answer order: ${userAnswer.order}`,status:StatusCode_Err.BAD_REQUEST_INVALID_SYNTAX},next)
      }

      const { question } = feedback.answers[userIndex].details[questionIndex];
      switch (question.type) {
      case QuestionType.selection:
        if (question.result !== undefined) {
          const result = userAnswer.answer.every((element) => (question.result ?? []).includes(element));
          if (!result) {
            // return next('result does not belong to the result list');
            return createErrMessage({msg:`result order ${userAnswer.order} does not belong to the result list`,status:StatusCode_Err.BAD_REQUEST_INVALID_SYNTAX},next)
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
            return createErrMessage({msg:'value should contain 1 value from 1 - 5',status:StatusCode_Err.BAD_REQUEST_INVALID_SYNTAX},next)
          }
        }
        break;
      case QuestionType.freeString:
        feedback.answers[userIndex].details[questionIndex].answer =  userAnswer.answer
        break;
      default:
        return createErrMessage({msg:`Unknown question type: ${question.type}`,status:StatusCode_Err.BAD_REQUEST_INVALID_SYNTAX},next)
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
    // return res.status(200).json({ msg: 'Answer updated successfully' });
    return createSuccessMessage({msg:'Answer updated successfully',status: StatusCode_Success.NEW_DATA_CREATED},res,feedback)

  } catch (error) {
    next(error);
  }
};
