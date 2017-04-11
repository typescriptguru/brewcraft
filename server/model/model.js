var mongoose = require('mongoose');
var findOrCreate = require('mongoose-findorcreate');

var ObjectID = mongoose.SchemaTypes.ObjectId;

var accountSchema = new mongoose.Schema({
    username: String,
    password: String,
    firstname: String,
    secondname: String,
    photo: String,
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    created_at: {
        type: Date,
        default: Date.now
    }
});

var imageSchema = new mongoose.Schema({
    caption: String,
    path: String,
    owner: ObjectID,
    created_at: {
        type: Date,
        default: Date.now
    }
});

accountSchema.plugin(findOrCreate);


mongoose.model('Account', accountSchema);
mongoose.model('Image', imageSchema);

module.exports = {
    accountSchema: accountSchema,
    imageSchema: imageSchema
};