var User = require('../model/User.model');
var Sensor = require('../model/Sensor.model');

const querystring = require('querystring');


class UserController {
    createUser(req,res){
        if (!req.body.location || !req.body.personsInHouse || !req.body.houseSize) {
            res.json({success: false, msg: 'Informations manquantes pour enregistrer un user'});
        }else {
            var newUser = new User({
                location: req.body.location,
                personsInHouse: req.body.personsInHouse,
                houseSize: req.body.houseSize
            });
           
            newUser.save((err) => {
                if (err) {
                    console.log(err);
                    return res.json({success: false});
                }
                
                res.json({success: true, msg: 'User créé avec succès'});
                
            });
        }
    }
    
    async readCurrentUser(req,res){
        if (!req.body.userId) {
            res.json({success: false, msg: 'Il manque l id du user'});
        }else{
            try{
                let user = await User.findById(req.body.userId).lean().exec();
                return res.json(user); 
             
            }
            catch(err){
                return res.json(err);
            } 
        }
    }
    
    async readAllUsers(req,res){
        try{
            let users = await User.find().lean().exec();
            return res.json(users); 
         
        }
        catch(err){
            return next(err);
        }    
    }
    
    async readSensorsNumber(req,res){
        if (!req.query.userId) {
            res.json({success: false, msg: 'Il manque l id du user'});
        }else{
            try{
                let sensors = await Sensor.find({userID: req.query.userId}).countDocuments().lean().exec();
                return res.json({nb_sensors: sensors})
            }
            catch(err){
                return next(err);
            } 
        }
    }
  
    
}

module.exports = new UserController; 
