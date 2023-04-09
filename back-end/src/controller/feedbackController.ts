import { NextFunction, RequestHandler } from 'express';
import { Schema } from 'mongoose';
import FeedbackModel from '../model/feedBackModel';
import UserModel from '../model/userModel';
import { createErrMessage, createSuccessMessage } from '../utils/message';
import { StatusCode_Success,StatusCode_Err } from '../utils/statusCode';
import userRequestListModel from '../model/userListModel'; 
const createdBy = '641eeaf0c608c18d17a0f28a';


export const getFeedbackController :RequestHandler = async(req,res, next)=> { 
  const feedbackId = req.query.feedbackId;
  try {
    const feedBack = await FeedbackModel.findOne({_id:feedbackId})
      .populate('answers.user',{personalDetail:{username:1,email:1,role:1,department:1}})
      .populate('createdBy',{personalDetail:{username:1,email:1,role:1,department:1}})
    if (!feedBack ) { 
      return  createErrMessage({msg:`feedback Id not found ${feedbackId}`,status:StatusCode_Err.RESOURCE_NOT_FOUND},next)
    }
    // return res.status(200).json({feedBack})
    return createSuccessMessage({msg:'success',status:StatusCode_Success.REQUEST_CREATED},res,feedBack)
  } catch (error) {
    next(error)
  }
}

export const createFeedbackController :RequestHandler = async(req,res,next)=> { 
  const {details , userList}  = req.body
  // 1. get user token 
  // const userIdToken = req.body.userId
  // if ( userIdToken !== req.body.userId ) { 
  // return next(new Error())
  // }
  // const createBy = userId

  // 2. create new feedback:
  try {
    const newFeedback = new FeedbackModel({
      // details : {title,questions},
      details,
      createdBy,
      userList 
    })
    if ( !newFeedback) { 
      return createErrMessage({msg:'fail to create new feedback',status:StatusCode_Err.BAD_REQUEST_INVALID_SYNTAX},next)
    }
    const feedbackId = newFeedback.id 
    for (const userId of userList) {
      const user = await UserModel.findOne({ _id: userId },);
      if (!user)  return  createErrMessage({msg:`User with ID ${userId} not found`,status:StatusCode_Err.RESOURCE_NOT_FOUND},next)
      user.feedBack.push({feedbackId,finished:false})
      await user.save()
      await newFeedback.save()
    }
    // return res.status(201).json({msg:'created', newFeedback}) 
    return createSuccessMessage({msg:'success',status:StatusCode_Success.REQUEST_CREATED},res,newFeedback)
  } catch (error) {
    return next(error)
  }
}


export const deleteFeedbackController :RequestHandler = async(req,res,next)=> { 
  const feedbackId = req.query.feedbackId;
  //   const id = '123'
  try {
    const feedback = await FeedbackModel.findOne({_id : feedbackId})
    if (!feedback) {
      return createErrMessage({msg:`feedback ${feedbackId} not found`,status:StatusCode_Err.RESOURCE_NOT_FOUND},next)
    }
    const userListAsString = feedback.userList.map(id => id.toString());

    await removeFeedbackFromUsers(feedback.id , userListAsString,next);
    await feedback.deleteOne()
    // if (feedback) return res.status(201).json({msg:'delete',feedback})
    if (feedback) return  createSuccessMessage({msg:'success delete',status:StatusCode_Success.REQUEST_CREATED_NO_CONTENT},res,)
  } catch (error) {
    next(error)
  }
}


export const getFeedbackRequestController : RequestHandler = async (req,res,next)=> { 
  try {
    const requestFeedBackList = await userRequestListModel.find()
    return createSuccessMessage({msg:'success',status:StatusCode_Success.REQUEST_CREATED},res,requestFeedBackList)
  } catch (error) {
    next(error)
  }
}

async function removeFeedbackFromUsers(feedbackId:Schema.Types.ObjectId, userList: string[],next:NextFunction) {
  // Loop through each user and remove the feedback from their list
  for (const userId of userList) {
    const user = await UserModel.findOne({ _id: userId });
    if (!user) {
      return createErrMessage({msg:`User with ID ${userId} not found`,status:StatusCode_Err.RESOURCE_NOT_FOUND},next)
    }
    user.feedBack = user.feedBack.filter(i => i.feedbackId !== feedbackId);
    await user.save();
  }
}