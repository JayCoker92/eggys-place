import mongoose from "mongoose";
const Schema = mongoose.Schema;



 const orderSchema = new Schema({
    orderedItems:[
        {
            title:{
                type:String,
                required:true, 
            },
            description:{
                type:String,
                required:true,
            },
            image:{
                type:String,
                required:true,   
            },
            category:{
                type:String,
                required:true,    
            },
            price:{
                type:String,
                required:true,
            },
            duration:{
                type:String,
                required:true,
            },
            rating:{
                type:String,
                required:true,
        
            },
        },
    ],
    recipientInfo:{
        fullName:{type:String,required:[true,"fullname is required"]},
        email:{type:String,required:[true,"email is required"]},
        phoneNumber:{type:String,required:[true,"phone number is required"]},
        maxlength:{type:String,required:[true,"maximum phone number length must be 11"]},
    },
    deliveryAddress:{
        address:{type:String,required:[true,"address is required"]},
        state:{type:String,required:[true,"state is required"]},
        city:{type:String,required:[true,"city is required"]},
    },
    paymentMethod:{
        type:String, default:"paystack"
    },
    isPaid:{type:Boolean, default:false},
    paymentRef:{type:String,required:true},
    totalPrice:{type:Number,required:true,default:0.0},
    user:{
        type:mongoose.Types.ObjectId,
        ref:"user",
        required:true
    }

 },{timestamps:true});

 const ORDER = mongoose.model("order",orderSchema);
 export default ORDER;
