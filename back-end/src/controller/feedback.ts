import { RequestHandler } from 'express';
import { Schema } from 'mongoose';
import FeedbackModel from '../model/feedBack';
import { AnswerType } from '../model/types/feedback';
import { Question, QuestionType, Range } from '../model/types/question';
import UserModel from '../model/user';

const createdBy = '641eeaf0c608c18d17a0f28a';


export const getFeedbackController :RequestHandler = async(req,res, next)=> { 
  const feedbackId = req.query.feedbackId;
  try {
    const feedBack = await FeedbackModel.findOne({_id:feedbackId})
      .populate('answers.user',{personalDetail:{username:1,email:1,role:1,department:1}})
      .populate('createdBy',{personalDetail:{username:1,email:1,role:1,department:1}})
    if (feedBack ) { 
      return res.status(200).json({feedBack})
    }
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
    const feedbackId = newFeedback.id as Schema.Types.ObjectId 
    for (const userId of userList) {
      const user = await UserModel.findOne({ _id: userId },);
      if (!user) throw new Error(`User with ID ${userId} not found`);
      //   user.feedBack.concat(feedbackId,finished:true)
      user.feedBack.push({feedbackId})
      await user.save()
      await newFeedback.save()

    }
    return res.status(201).json({msg:'created', newFeedback}) 
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
      return next(new Error('not found'));
    }
    const userListAsString = feedback.userList.map(id => id.toString());

    await removeFeedbackFromUsers(feedback.id , userListAsString);
    await feedback.deleteOne()
    console.log(
      await FeedbackModel.findById({_id:feedbackId})
    )
    if (feedback) return res.status(201).json({msg:'delete',feedback})
  } catch (error) {
    next(error)
  }
}


async function removeFeedbackFromUsers(feedbackId:Schema.Types.ObjectId, userList: string[]) {
  // Loop through each user and remove the feedback from their list
  for (const userId of userList) {
    const user = await UserModel.findOne({ _id: userId });
    if (!user) {
      console.error(`User with ID ${userId} not found`);
      continue;
    }
    console.log(user.feedBack)
    user.feedBack = user.feedBack.filter(i => i.feedbackId !== feedbackId);
    await user.save();
  }
}