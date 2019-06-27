const mongoose = require('./dbconnect');
const Users = new mongoose.Schema({
    username:{
        type: String,
        unique: true,
        required: true,
        lowercase: true
    },
    password:{
        type: String,
        required: true
    },
    created_at:{
        type: Number,
        default: Date.now
    }
})

class UserModel{
    constructor(){
        this.users = mongoose.model('Users',Users);
    }
    get(data) {
        return new Promise( (resolve, reject) => {
            this.users.find(data,(err,rs)=>{
                if(err) return reject(err);
                resolve(rs);
            })
        })
    }
    getAll() {
        return new Promise( (resolve, reject) => {
            this.users.find({},(err,rs)=>{
                if(err) return reject(err);
                resolve(rs);
            })
        })
    }
    add(data) {
        return new Promise( (resolve, reject) => {
            this.users.create(data,(err,rs)=>{
                if(err) return reject(err);
                resolve(rs);
            })
        })
    }
    update(data) {
        return new Promise( (resolve, reject) => {
            this.users.updateOne({_id:data.id}, data, (err, result) => {
                if(err) reject(err);
                resolve(result);
            })
        })
    }
    del(id) {
        return new Promise( (resolve, reject) => {
            this.users.deleteOne({_id:id}, (err, rs) => {
                if(err) return reject(err);
                resolve(rs);
            })
        })
    }
    count(data) {
        return new Promise( (resolve, reject) => {
            this.users.count(data, (err, rs) => {
                if(err) return reject(err);
                resolve(rs);
            })
        })
    }
}

module.exports = UserModel;
