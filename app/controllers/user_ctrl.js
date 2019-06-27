const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const UserModel = require('../models/user_model');

class UserController {
    constructor() {
        this.userModel = new UserModel();
    }
    async loginPost(req,res){
        const rs = await this.userModel.get({username: req.body.Username});
        if(!rs.length){
            return res.json({
                success: false,
                message: "Tài khoản chưa được đăng ký hoặc đã bị khoá"
            });
        }
        const match = await bcrypt.compare(req.body.Password,rs[0].password);
        if(match){
            const token = jwt.sign({ user: req.body.Username }, 'tundip', { expiresIn: 60*60*24*30 });
            res.json({
                success: true,
                token: token,
                user: req.body.Username
            })
        }
        else{
            res.json({
                success: false,
                message: "Mật khẩu không chính xác"
            });
        }
    }
    async signupPost(req,res){
        try{
            req.body.Password = await bcrypt.hash(req.body.Password, 13);
            await this.userModel.add({username: req.body.Username, password: req.body.Password});
            const token = jwt.sign({ user: req.body.Username }, 'tundip', { expiresIn: 60*60*24*30 });
            res.json({
                success: true,
                token: token,
                user: req.body.Username
            });
        } catch(e) {
            res.json({
                success: false,
                message: "Tên tài khoản đã được sử dụng"
            });
        }
    }
    checkAuth(req,res){
        let token = req.query.token;
        if(token){
            jwt.verify(token, 'tundip', (err, decoded) => {
                typeof decoded === "undefined" ? 
                  res.json({              
                    success: false, 
                    message: 'Token expired !' })
                : res.json({
                    success: true, 
                    data: decoded
                });
            });
        }
        else {
            return res.json({ 
              success: false, 
              message: 'No token provided !' 
            });
        }
    }
}
module.exports = UserController;