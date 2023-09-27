import  { Request, Response,NextFunction } from "express";
import { User } from "../../user/user.model";
import { GroupModel, IGroup, IMessage } from "./group.model";
import fileUpload from 'express-fileupload';
import path from 'path'
import { ObjectId } from "mongodb";
import mongoose from "mongoose";

export const CreateGroup =async (req:Request, res:Response, next:NextFunction) => {
    try{
        const { name, members} = req.body;
        const group = await GroupModel.create({name, members});
        return  res.status(201).json(group)

    }catch{
       return  res.status(500).json('could nt  create the group')
    }
}

export const AddMember = async (req: Request, res:Response) =>{
    try {
        const userId = req.body
        const groupId = req.params.groupId
        
        const group: Document & IGroup | null = await GroupModel.findById(groupId);
        if (!group){
            return res.status(404).json('Couldnt find the group')
        }
        if (group.members.includes(userId)){
            return res.status(400).json({error:'User already exsist in the group'})
        }
        group.members.push(userId)
        await group.save()
       return  res.status(200).json(group)
    }catch{
        return res.status(500).json({ error: 'Internal server error' });
    }
}

export const RemoveUser = async (req:Request, res:Response)=>{

    try{const userId = req.body
    const groupId = req.params.groupId

    const group: Document & IGroup | null = await GroupModel.findById(groupId);

  
    const user = User.findById(userId)

    if (!user){
        res.status(404).json('could not find the user')
    }
    if (!group){
       return  res.status(404).json('cound not find the group')
    }
    if (!group.members.includes(userId)){
        return res.status(404).json('user is not found in this group')
    }
    group.members = group.members.filter((member) => member.toString() !== userId);
    await group.save();

    return res.status(200).json(group)
}
    catch{
         return res.status(500).json('Cound not remove the user')
    }
}

export const SendMessage = async(req:Request, res:Response, next:NextFunction)=>{
    try {
        const { userId, messageText } = req.body;
        const groupId = req.params.groupId;
    
        const group = await GroupModel.findById(groupId);
        if (!group) {
          return res.status(404).json({ error: 'Group not found' });
        }
    
        if (!group.members.includes(userId)) {
          return res.status(400).json({ error: 'User is not a member of this group' });
        }
        const newMessage: IMessage = {
            userId,
            text: messageText,
            timestamp: new Date(),
            _id: new mongoose.Types.ObjectId(),
          };
    
        if (req.files && req.files.file) {
            const uploadedFile = req.files.file as fileUpload.UploadedFile;
      
            const fileName = `${Date.now()}_${uploadedFile.name}`;
      
            const filePath = path.join(__dirname, 'uploads', fileName); 
            uploadedFile.mv(filePath, (err) => {
              if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Failed to save the file' });
              }
      
              newMessage.imageUrl = `/uploads/${fileName}`;
      
              group.messages.push(newMessage);
              group.save()
                .then(() => {
                  res.status(201).json(newMessage);
                })
                .catch((saveError) => {
                  console.error(saveError);
                  res.status(500).json({ error: 'Failed to save the message' });
                });
            });
          } else {
            group.messages.push(newMessage);
            await group.save();
            res.status(201).json(newMessage);
          }
      
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      }
    };
    
export const updateMessage = async (req: Request, res: Response) => {
  try {
    const { userId, newText } = req.body;
    const groupId = req.params.groupId;
    const messageId = req.params.messageId;

    const group = await GroupModel.findById(groupId);
    if (!group) {
      return res.status(404).json({ error: 'Group not found' });
    }

    const message = group.messages.find((msg) => msg._id.toString() === messageId);
    if (!message) {
      return res.status(404).json({ error: 'Message not found' });
    }

    if (message.userId.toString() !== userId) {
      return res.status(403).json({ error: 'You do not have permission to edit this message' });
    }

    message.text = newText;
    await group.save();

    res.json(message);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteMessage = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;
    const groupId = req.params.groupId;
    const messageId = req.params.messageId;

    const group = await GroupModel.findById(groupId);
    if (!group) {
      return res.status(404).json({ error: 'Group not found' });
    }

    const messageIndex = group.messages.findIndex((msg) => msg._id.toString() === messageId);
    if (messageIndex === -1) {
      return res.status(404).json({ error: 'Message not found' });
    }

    if (group.messages[messageIndex].userId.toString() !== userId) {
      return res.status(403).json({ error: 'You do not have permission to delete this message' });
    }

    group.messages.splice(messageIndex, 1);
    await group.save();

    res.json({ message: 'Message deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
