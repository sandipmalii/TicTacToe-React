import UserModel from "../models/User.js";

export const getUserProfile=async(req, res)=> {
    const userId = req.userId
    try {
      const user = await UserModel.findById(userId)
      if(!user){
        return res.status(404).json({success:false, message:"User not found"})
      }
      const {password, ...rest} = user._doc;
  
      res.status(200).json({ success: true , message:'Getting profile info', data:{ ...rest},})
    } catch (err) {
      console.log(err.message)
      res.status(500).json({ success: false, message: "Something went Wrong, cannot get"})
    }
  }

  export const updateUser = async(req,res)=>{
    const id = req.params.id;
    const { email } = req.body;

    try {
        // Check if email is being updated
        if (email) {
            // Check if the email already exists for a different user
            const existingUser = await UserModel.findOne({ email, _id: { $ne: id } });
            if (existingUser) {
                return res.status(400).json({ success: false, message: "Email already exists" });
            }
        }

        
        const updatedUser = await UserModel.findByIdAndUpdate(id,{$set:req.body} , {new:true}).select("-password")

        res.status(200).json({success:true , message:"Successfully Updated", data:updatedUser})
        } catch (error) {
        res.status(500).json({success:false , message:"Failed to Update User"})
        
    }
}
