import express from 'express';
// import auth from '../middlewares/auth';
import Users from '../controllers/users';


// defining middleware routes
const router = express.Router();

// Users routes
router.post('/api/auth/signup', Users.signup);
router.post('/api/auth/signin', Users.login);
router.get('/api/users', Users.getAllUsers);
router.delete('/api/users', Users.delete);

export default router;