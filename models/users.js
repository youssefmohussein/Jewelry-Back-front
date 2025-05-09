const mongoose = require('mongoose');
const usersManagementSchema = new mongoose.Schema({
name:{
    type:String,
    required:true,    
},
Id:{
        type: Number,
        required: false,
        unique: true,
        // uppercase: true
        
    },

    
    Email:{
        type:String,
        required:true,
        unique: true,
        lowercase: true,
        trim: true,
        validate: {
            validator: function(v) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: props => `${props.value} is not a valid email address!`
        }
    },

//     productSchema.(autoIncrement.plugin, {
//     model: 'Product', // name of the model
//     field: 'Id',
//     startAt: 1,
//     incrementBy: 1
// });

    password:{
        type:String,
        required:true,
        validate: {
    validator: function (v) {
        return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(v);
    },// lookahead
    message: props => `Password must contain at least one letter, one number, and be at least 8 characters long.`
}
    },


    
    gender:{
        type:String,
        enum:['male','female'],
        required:false
    },
    Role: {
    type: String,
    enum: ['admin', 'customer'],
    default: 'customer',
    required: false
    },

})
const users = mongoose.model('users', usersManagementSchema);
module.exports = users;