import {Router} from 'express';
import testController from '../controllers/test.controller.js';
const testRouter = Router();

testRouter.get('/', testController.getAll)
testRouter.get('/:id', testController.getOne)
testRouter.post('/', testController.postOne)
testRouter.put('/:id', testController.putOne)
testRouter.delete('/:id', testController.deleteOne)
export default testRouter;

