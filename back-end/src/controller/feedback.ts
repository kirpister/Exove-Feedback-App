import { RequestHandler } from 'express';
import { Schema } from 'mongoose';
import { finished } from 'stream';
import FeedbackModel from '../model/feedBack';
import { AnswerType } from '../model/types/feedback';
import { Question, QuestionType, Range } from '../model/types/question';
import UserModel from '../model/user';
import { feedBackRouter } from '../router/feedback';
const questionList: Question[] = [  
  {    
    order: 1,    
    title: 'What is your favorite color?',   
    type: QuestionType.selection,    
    result: ['Red', 'Green', 'Blue'],
    required: true
  },
  {
    order: 2,
    title: 'How often do you exercise?',
    type: QuestionType.range,
    // result: Range.one,
    required: true
  },
  {
    order: 3,
    title: 'What are your favorite hobbies?',
    type: QuestionType.freeString,
    required: true
  },
  {
    order: 4,
    title: 'What is your favorite book?',
    type: QuestionType.freeString,
    required: false
  }
];

const userList = ['641eea147069537347727491', ];

const createdBy = '641eeaf0c608c18d17a0f28a';


export const getFeedbackController :RequestHandler = async(req,res, next)=> { 
  const feedbackId = req.query.feedbackId;
  try {
    const feedBack = await FeedbackModel.findOne({_id:feedbackId})
    if (feedBack ) { 
      return res.status(200).json({feedBack})
    }
  } catch (error) {
    next(error)
  }
}

export const createFeedbackController :RequestHandler = async(req,res,next)=> { 
//   const {questionList,title , userList,createdBy}  = req.body
//   const answers : AnswerType =[]
  try {
    const newFeedback = new FeedbackModel({
      details : {title:'new',questions:questionList},
      createdBy,
      userList 
    })
    await newFeedback.save()
    const feedbackId = newFeedback.id as Schema.Types.ObjectId 
    for (const userId of userList) {
      const user = await UserModel.findOne({ _id: userId },);
      if (!user) throw new Error(`User with ID ${userId} not found`);
      //   user.feedBack.concat(feedbackId,finished:true)
      user.feedBack.push({feedbackId})
      await user.save()
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