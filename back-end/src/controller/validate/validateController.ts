import { RequestHandler } from "express";
import { AuthRequest } from "../../common/types/Request";
import UserModel from "../../model/userModel";

export const validateController: RequestHandler = async (
  req: AuthRequest,
  res
) => {
  try {
    const userDetails = await UserModel.findOne({
      _id: req.employeeNumber,
    });

    if (!userDetails) {
      throw new Error("Missing user details in database");
    }

    const responseToReturn = {
      firstName: userDetails.personalDetail.firstName,
      surName: userDetails.personalDetail.surName,
      email: userDetails.personalDetail.email,
      roles: userDetails.work.roles,
    };

    return res.status(200).json(responseToReturn);
  } catch (error) {
    console.log("error message is ", error);
    res.sendStatus(401);
  }
};
