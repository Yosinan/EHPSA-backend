import {CreateGroup,AddMember, RemoveUser, SendMessage,updateMessage,deleteMessage} from './group.controller'
import  Router  from 'express'
import { respond } from '../../../utils/respond'

const GroupRouter = Router()

GroupRouter.post('/groups', CreateGroup, respond)
GroupRouter.post('/groups/:groupId/members', AddMember, respond)
GroupRouter.post('/groups/:groupId', SendMessage,respond)
GroupRouter.delete('/groups/:groupId/members', RemoveUser, respond)
GroupRouter.delete('/groups/:groupId/messages/:messageId',deleteMessage, respond)
GroupRouter.put('/groups/:groupId/messages/:messageId',updateMessage, respond)

export default GroupRouter