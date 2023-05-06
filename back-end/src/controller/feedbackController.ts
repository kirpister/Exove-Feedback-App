import { NextFunction, RequestHandler } from 'express';
import { Schema } from 'mongoose';
import FeedbackModel from '../model/feedBackModel';
import UserModel from '../model/userModel';
import { createErrMessage, createSuccessMessage } from '../utils/message';
import { StatusCode_Success, StatusCode_Err } from '../utils/statusCode';
import UserRequestListModel from '../model/userListModel';
import { UserDetailsType } from '../model/types/answer';

export const getFeedbackController: RequestHandler = async (req, res, next) => {
  const feedbackId = req.query.feedbackId;
  try {
    let feedBack;
    if (feedbackId) {
      feedBack = await FeedbackModel.findOne({ _id: feedbackId })
        .populate('answers.user', { personalDetail: 1 })
        .populate('createdBy', { personalDetail: { username: 1, email: 1, role: 1, department: 1 } });
    } else {
      feedBack = await FeedbackModel.find()
        .populate('answers.user', { personalDetail: 1 })
        .populate('createdBy', { personalDetail: { username: 1, email: 1, role: 1, department: 1 } });
    }
    if (!feedBack) {
      return createErrMessage({ msg: `feedback Id not found ${feedbackId}`, status: StatusCode_Err.RESOURCE_NOT_FOUND }, next);
    }
    // return res.status(200).json({feedBack})
    return createSuccessMessage({ msg: 'success', status: StatusCode_Success.REQUEST_CREATED }, res, feedBack);
  } catch (error) {
    next(error);
  }
};

export const createFeedbackController: RequestHandler = async (req, res, next) => {
  const { details, userList, requestedListBy, userDetails } = req.body;
  const { employeeNumber: createdBy, roles } = userDetails as UserDetailsType;
  // 1. get user token

  // 2. create new feedback:
  try {
    const newFeedback = new FeedbackModel({
      requestedListBy,
      details,
      createdBy,
      userList,
    });
    // 2.1 check that requestList user exist ?
    let requestUserList;
    if (requestedListBy) {
      requestUserList = await UserRequestListModel.findOne({ _id: requestedListBy });
      if (!requestUserList) {
        return createErrMessage({ msg: `request list not found ${requestedListBy} not found`, status: StatusCode_Err.RESOURCE_NOT_FOUND }, next);
      }
      if (requestUserList.createFeedbackId) {
        return createErrMessage(
          { msg: `this user list request with Id ${requestedListBy} have been created feedback`, status: StatusCode_Err.BAD_REQUEST_INVALID_SYNTAX },
          next
        );
      }
    }
    // 2.2 create check that new feedback is created ?
    if (!newFeedback) {
      return createErrMessage({ msg: 'fail to create new feedback', status: StatusCode_Err.BAD_REQUEST_INVALID_SYNTAX }, next);
    }
    const feedbackId = newFeedback.id;
    // 2.3 check userlist exist ?
    for (const userId of userList) {
      const user = await UserModel.findOne({ _id: userId });
      if (!user) return createErrMessage({ msg: `User with ID ${userId} not found`, status: StatusCode_Err.RESOURCE_NOT_FOUND }, next);
    }
    // 2.5 save new feedback
    await newFeedback.save();
    // 2.4 send feedback form to each user from the list which made by ADMIN
    for (const userId of userList) {
      const user = await UserModel.findOne({ _id: userId });
      if (!user) return createErrMessage({ msg: `User with ID ${userId} not found`, status: StatusCode_Err.RESOURCE_NOT_FOUND }, next);
      user.feedBack.push({ feedbackId });
      await user.save();
    }
    // 2.6 update request list user
    if (requestUserList) {
      requestUserList.opened = true;
      requestUserList.createFeedbackId = newFeedback.id;
      await requestUserList.save();
    }

    return createSuccessMessage({ msg: 'success', status: StatusCode_Success.NEW_DATA_CREATED }, res, newFeedback);
  } catch (error) {
    return next(error);
  }
};

export const deleteFeedbackController: RequestHandler = async (req, res, next) => {
  const feedbackId = req.query.feedbackId;
  try {
    const feedback = await FeedbackModel.findOne({ _id: feedbackId });
    if (!feedback) {
      return createErrMessage({ msg: `feedback ${feedbackId} not found`, status: StatusCode_Err.RESOURCE_NOT_FOUND }, next);
    }
    // update request user list
    if (feedback.requestedListBy) {
      const requestedUserList = await UserRequestListModel.findOne({ _id: feedback.requestedListBy });
      if (requestedUserList) {
        requestedUserList.createFeedbackId = null;
        requestedUserList.opened = false;
        await requestedUserList.save();
      } else {
        return createErrMessage(
          { msg: `feedback request user list can not find with id ${feedback.requestedListBy}`, status: StatusCode_Err.RESOURCE_NOT_FOUND },
          next
        );
      }
    }
    const userListAsString = feedback.userList.map((id) => id.toString());
    // remove feedback request to each users
    await removeFeedbackFromUsers(feedback.id, userListAsString, next);
    // remove feedback request
    await feedback.deleteOne();
    if (feedback) return createSuccessMessage({ msg: 'success delete', status: StatusCode_Success.REQUEST_CREATED }, res);
  } catch (error) {
    next(error);
  }
};

export const getFeedbackRequestController: RequestHandler = async (req, res, next) => {
  try {
    const requestFeedBackList = await UserRequestListModel.find();
    // .populate('requestUserId',{personalDetail:1})
    // .populate('userList',{personalDetail:3})
    return createSuccessMessage({ msg: 'success', status: StatusCode_Success.REQUEST_CREATED }, res, requestFeedBackList);
  } catch (error) {
    next(error);
  }
};

async function removeFeedbackFromUsers(feedbackId: Schema.Types.ObjectId, userList: string[], next: NextFunction) {
  // Loop through each user and remove the feedback from their list
  for (const userId of userList) {
    const user = await UserModel.findOne({ _id: userId });
    if (!user) {
      return createErrMessage({ msg: `User with ID ${userId} not found`, status: StatusCode_Err.RESOURCE_NOT_FOUND }, next);
    }
    user.feedBack = user.feedBack.filter((i) => i.feedbackId !== feedbackId);
    await user.save();
  }
}
