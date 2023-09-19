import { Request, Response,NextFunction } from "express";
import { User } from "../../user/user.model";
import { GroupModel, IGroup, IMessage } from "./group.model";


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
