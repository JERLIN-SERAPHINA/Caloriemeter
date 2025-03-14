const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    userId: { 
        type: Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId(),
        unique: true 
    },
    name: { type: String, required: true },
    email:    { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    userPermissionBitmask: { type: Number, default: 0 } // Default to no permissions
});

module.exports = mongoose.model('User', UserSchema);