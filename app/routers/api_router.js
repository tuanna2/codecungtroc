const express = require('express');
const bodyParser =require('body-parser');
const UserController = require('../controllers/user_ctrl');

class ApiRouter{
    constructor(){
        this.router = express.Router();
        this.router.use(bodyParser.urlencoded({ extended: false }));
        this.router.use(bodyParser.json());
        this.config();
    }
    getRouter() {
        return this.router;
    }
    config(){
        const userCtrl = new UserController;
        this.router.post('/login',userCtrl.loginPost.bind(userCtrl));
        this.router.post('/signup',userCtrl.signupPost.bind(userCtrl));        
        this.router.get('/auth',userCtrl.checkAuth.bind(userCtrl));
    }
}

module.exports = ApiRouter;