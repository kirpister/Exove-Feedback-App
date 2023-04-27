import { RequestHandler } from 'express';
import FeedbackModel from '../model/feedBackModel';
import { ListAnswerType } from '../model/types/answer';
import { QuestionType, Range } from '../model/types/question';
import { userModel } from '../model/types/user';
import UserModel from '../model/userModel';
import { createErrMessage, createSuccessMessage } from '../utils/message';
import { StatusCode_Success, StatusCode_Err } from '../utils/statusCode';
import UserRequestListModel from '../model/userListModel';

export const getUser: RequestHandler = async (req, res, next) => {
  // const userId = '643354a954f04e2f37eb8fd7'
  // const  userId = req.query.userId
  try {
    const user = await UserModel.findOne({ _id: req.query.userId })
      .populate('selfFeedbackRequests.requestFeedbackId', { opened: 1 })
      .populate('feedBack.feedbackId', { details: 1 });
    if (!user) {
      return createErrMessage(
        {
          msg: 'user fail',
          status: StatusCode_Err.RESOURCE_NOT_FOUND,
        },
        next
      );
    }
    return createSuccessMessage({ msg: `get user ${user.id} success`, status: StatusCode_Success.NEW_DATA_CREATED }, res, user);
  } catch (error) {
    next(error);
  }
};

export const updateUserInfo: RequestHandler = async (req, res, next) => {
  // const personalDetail = req.body
  const userId = '64334d1a79983fbe5eff96cb';
  // const userIdToken = req.body.userId
  // if ( userIdToken !== req.body.userId ) {
  // return next(new Error())
  // }
  try {
    const user = await UserModel.findOne({ _id: userId });
    if (!user) {
      return createErrMessage({ msg: `no user with id: ${userId}`, status: StatusCode_Err.RESOURCE_NOT_FOUND }, next);
    } else if (user as userModel) {
      user.personalDetail.firstName = 'test';
    }
    await user?.save();
    return createSuccessMessage({ msg: `new user ${user.id} have been updated`, status: StatusCode_Success.NEW_DATA_CREATED }, res);
  } catch (error) {
    next(error);
  }
};

export const updateUserFeedback: RequestHandler = async (req, res, next) => {
  const feedbackId = req.query.feedbackId;
  // const userId = '643354a954f04e2f37eb8fdb';
  const { answers, userId } = req.body as ListAnswerType;
  try {
    // 1. find the feedback
    const feedback = await FeedbackModel.findById(feedbackId);
    if (!feedback) {
      return createErrMessage(
        {
          msg: `feedback with Id: ${feedbackId} not found`,
          status: StatusCode_Err.RESOURCE_NOT_FOUND,
        },
        next
      );
    }
    // 2. find user's place to answer
    const userIndex = feedback.userList.findIndex((i) => i.toString() === userId);
    if (userIndex === -1) {
      return createErrMessage({ msg: `user ${userId} not found on feedback list`, status: StatusCode_Err.RESOURCE_NOT_FOUND }, next);
    }
    // 3. check both lenght of answer is correct
    const userAnswerLength = answers.length;
    const feedbackLength = feedback.details.questions.length;
    if (userAnswerLength !== feedbackLength) {
      return createErrMessage({ msg: 'Answer not enough', status: StatusCode_Err.BAD_REQUEST_INVALID_SYNTAX }, next);
    }
    // 4. update answer from feedback
    for (const userAnswer of answers) {
      const questionIndex = feedback.answers[userIndex].details.findIndex((q) => q.question.order === userAnswer.order);
      if (questionIndex === -1) {
        // return res.status(400).json({ error: `Invalid answer order: ${userAnswer.order}` });
        return createErrMessage({ msg: `Invalid answer order: ${userAnswer.order}`, status: StatusCode_Err.BAD_REQUEST_INVALID_SYNTAX }, next);
      }

      const { question } = feedback.answers[userIndex].details[questionIndex];
      switch (question.type) {
      case QuestionType.selection:
        if (question.result !== undefined) {
          const result = userAnswer.answer.every((element) => (question.result ?? []).includes(element));
          if (!result) {
            // return next('result does not belong to the result list');
            return createErrMessage(
              { msg: `result order ${userAnswer.order} does not belong to the result list`, status: StatusCode_Err.BAD_REQUEST_INVALID_SYNTAX },
              next
            );
          } else {
            feedback.answers[userIndex].details[questionIndex].answer = userAnswer.answer;
          }
        }
        break;
      case QuestionType.range:
        if (userAnswer.answer.length === 1) {
          if (userAnswer.answer[0] in Range) {
            if (userAnswer.answer.length > 1) {
              return createErrMessage({ msg: 'Range answer must have 1 answer ', status: StatusCode_Err.BAD_REQUEST_INVALID_SYNTAX }, next);
            }
            feedback.answers[userIndex].details[questionIndex].answer = userAnswer.answer;
          } else {
            return createErrMessage({ msg: 'value should contain 1 value from 1 - 5', status: StatusCode_Err.BAD_REQUEST_INVALID_SYNTAX }, next);
          }
        }
        break;
      case QuestionType.freeString:
        feedback.answers[userIndex].details[questionIndex].answer = userAnswer.answer;
        break;
      default:
        return createErrMessage({ msg: `Unknown question type: ${question.type}`, status: StatusCode_Err.BAD_REQUEST_INVALID_SYNTAX }, next);
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
    await feedback.updateOne(feedback);
    // return res.status(200).json({ msg: 'Answer updated successfully' });
    return createSuccessMessage({ msg: 'Answer updated successfully', status: StatusCode_Success.NEW_DATA_CREATED }, res);
  } catch (error) {
    next(error);
  }
};
export const createFeedbackUserList: RequestHandler = async (req, res, next) => {
  console.log('call create new feedback user')
  console.log(req.body)
  // const {userId:requestUserId,userListId} = req.body
  const { userListId, userDetails } = req.body;
  const {employeeNumber} = userDetails;
  // 1. check that user can not suggest to give feedback for themself
  if (checkArrayString(userListId) && typeof employeeNumber === 'string') {
    const index = userListId.findIndex((e: string) => e === employeeNumber);
    if (index !== -1) {
      console.log('go here');
      return createErrMessage(
        { msg: 'user can not suggest request feedback list for yourself', status: StatusCode_Err.BAD_REQUEST_INVALID_SYNTAX },
        next
      );
    }
  }
  try {
    // 1. check user id is correct
    const user = await UserModel.findOne({ _id: employeeNumber });
    if (!user) return createErrMessage({ msg: `user id ${employeeNumber} not found`, status: StatusCode_Err.RESOURCE_NOT_FOUND }, next);
    // 2. check is all user from list exist ?
    for (const userId of userListId) {
      const user = await UserModel.findOne({ _id: userId });
      if (!user) return createErrMessage({ msg: `user id ${userId} not found`, status: StatusCode_Err.RESOURCE_NOT_FOUND }, next);
    }
    // 3. add new feedback request to user
    const newRequest = { requestUserId:employeeNumber, userList: userListId };
    const newRequestFeedbackUser = await UserRequestListModel.create({ ...newRequest });
    newRequestFeedbackUser.save();
    user.selfFeedbackRequests.push({ requestFeedbackId: newRequestFeedbackUser.id });
    user.save();
    return createSuccessMessage({ msg: 'success', status: StatusCode_Success.NEW_DATA_CREATED }, res, newRequestFeedbackUser);
  } catch (error) {
    console.error(error);
    next(error);
  }
};
export const deleteFeedbackRequest: RequestHandler = async (req, res, next) => {
  const userId = '643354a954f04e2f37eb8fe7';
  if (!req.query.requestListId) {
    return createErrMessage({ msg: 'send requestListId', status: StatusCode_Err.RESOURCE_NOT_FOUND }, next);
  }
  try {
    const requestedUserList = await UserRequestListModel.findOne({ _id: req.query.requestListId });
    if (!requestedUserList) {
      return createErrMessage({ msg: `can not find requestListId ${req.body.requestListId}`, status: StatusCode_Err.RESOURCE_NOT_FOUND }, next);
    }
    const user = await UserModel.findOne({ _id: userId });
    if (!user) {
      return createErrMessage({ msg: 'can not find user', status: StatusCode_Err.RESOURCE_NOT_FOUND }, next);
    }
    if (user.selfFeedbackRequests.length >= 0) {
      const index = user.selfFeedbackRequests.findIndex((e) => e.requestFeedbackId.toString() === req.query.requestListId?.toString());
      if (index === -1) {
        return createErrMessage(
          { msg: `can not found correct requestListId ${req.query.requestListId} `, status: StatusCode_Err.RESOURCE_NOT_FOUND },
          next
        );
      }
      user.selfFeedbackRequests.splice(index, 1);
      await user.save();
      await requestedUserList.deleteOne();
      return createSuccessMessage(
        { msg: `request list Id ${req.query.requestListId} have been deleted`, status: StatusCode_Success.REQUEST_CREATED },
        res
      );
    }
  } catch (error) {
    next(error);
  }
};

export const getAllUser: RequestHandler = async (req, res, next) => {
  console.log(req.body);
  try {
    const user = await UserModel.find({}, 'personalDetail personal work');
    return createSuccessMessage({ msg: 'success', status: StatusCode_Success.REQUEST_CREATED }, res, user);
  } catch (error) {
    next(error);
  }
};

const checkArrayString = (list: any): boolean => {
  if (Array.isArray(list)) {
    list.every((e) => {
      if (typeof e !== 'string') {
        return false;
      }
    });
    return true;
  }
  return false;
};
