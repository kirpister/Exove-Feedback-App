import { RequestHandler } from 'express';
import FeedbackModel from '../model/feedBack';
import UserModel from '../model/user';


export const getUser:RequestHandler  =async (req,res,next) => {
  const id = '123'

  try {
    const user  = await UserModel.findOne({id})
    return res.status(200).json({user})
  } catch (error) {
    next(error)
  }
    
}


export const updateUserInfo:RequestHandler =async (req,res,next) => {
  const newUserInfor = req.body 
  const id = '123'
  try {
    const user = await UserModel.findByIdAndUpdate(
      id,
      {$set:{personalDetail : newUserInfor}},
      {new:true}
    )
    user?.save()
    return res.status(201).send('update success')
        
  } catch (error) {
    next(error)
  }
    
}

export const updateUserFeedback :RequestHandler = async(req,res,next)=>  { 
  const { userId, feedbackId } = req.params;
  const answer = req.body
  try {
    const feedback = await FeedbackModel.findOneAndUpdate(
      { _id: feedbackId, 'answers.user': userId },
      { $set: { 'answers.$[elem].details.$[detail].answer':answer } },
      { arrayFilters: [{ 'elem.user': userId }, { 'detail._id': req.body.details._id }], new: true }
    )
    // update user's feedback finished status
    const user = await UserModel.findByIdAndUpdate(
      userId,
      { $set: { 'feedBack.$[elem].finished': true } },
      { arrayFilters: [{ 'elem.feedbackId': feedbackId }], new: true }
    );
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }
  } catch (error) {
    next(error)
  }
}   