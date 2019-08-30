import express from 'express';
// import auth from '../middlewares/auth';
import Users from '../controllers/users';
import Order from '../controllers/orders';
import Menu from '../controllers/menu';


// defining middleware routes
const router = express.Router();

// Users routes
router.post('/api/auth/signup', Users.signup);
router.post('/api/auth/signin', Users.login);
router.get('/api/users', Users.getAllUsers);
router.delete('/api/users', Users.delete);
router.post('/api/order', Order.create);
router.get('/api/order', Order.getAll);
router.get('/api/order', Order.getOne);
router.post('/api/menu', Menu.create);
router.get('/api/menu', Menu.getAll);
router.get('/api/menu', Menu.getOne);
router.delete('/api/menu', Menu.delete);

export default router;