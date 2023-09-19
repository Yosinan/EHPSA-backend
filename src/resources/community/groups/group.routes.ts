import {CreateGroup,AddMember, RemoveUser} from './group.controller'
import  Router  from 'express'
import { respond } from '../../../utils/respond'

const GroupRouter = Router()

GroupRouter.post('/groups', CreateGroup, respond)
GroupRouter.post('/groups/:groupId/members', AddMember, respond)
GroupRouter.delete('/groups/:groupId/members', RemoveUser, respond)

export default GroupRouter