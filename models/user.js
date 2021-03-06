var mongoose   = require('mongoose');
var bcrypt     = require('bcryptjs');
var crypto     = require('crypto');
var Schema     = mongoose.Schema;

var UserSchema = Schema({
    username: { type: String, index: true },
    password: { type: String },
    email:    { type: String }
});

var User = module.exports = mongoose.model('User', UserSchema);

module.exports.createUser = (newUser,callback)=>{
  bcrypt.genSalt(10,(err,salt)=>{
    if(err) throw err;
    bcrypt.hash(newUser.password,salt, (err,hash)=>{
      newUser.password = hash;
      newUser.save(callback);
    });
  });
};

module.exports.comparePassword = (candidatePassword, hash, callback)=>{
  bcrypt.compare(candidatePassword, hash, callback);
};

module.exports.getUserByUsername = (username, callback)=>{
  User.findOne(username,callback);
};

module.exports.getUserById = (id,callback)=>{
  User.findById(id,callback);
};

