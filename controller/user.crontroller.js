import User from '../model/User.model.js'
import crypto from 'crypto'
import nodemailer from 'nodemailer'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

const registerUser = async (req, res) => {
   // res.send('Starting to register');
    
    
    //get data
    const {name, email, password } = req.body;
    if(!name || !email || !password){
        return res.status(400).json({
            message:"All fields are required"
        })
    }
    //validate
    //check if already exists
    try{
        const existingUser = await User.findOne({email});
        
        if(existingUser){
            return res.status(400).json({
                message:"User already exists"
            })
        }

        //create a user in db
    
        const user = await User.create({
            name,
            email,
            password
        })

        console.log("user ",user);
        if(!user){
            return res.status(400).json({
                message:"User not registered"
            })
        }

        // generate token
        const token =  crypto.randomBytes(32).toString("hex");
        console.log(token);

        user.verificationToken = token
        await user.save();


        //send mail
        const transporter = nodemailer.createTransport({
            host: process.env.MAILTRAP_HOST,
            port: process.env.MAILTRAP_PORT,
            secure: false, // true for port 465, false for other ports
            auth: {
              user: process.env.MAILTRAP_USER,
              pass: process.env.MAILTRAP_PASSWORD,
            },
          });

          const mailOptions = {
                from: process.env.MAILTRAP_SENDEREMAIL, // sender address
                to: user.email, // list of receivers
                subject: "Verify your email", // Subject line
                text: "Hello world?", // plain text body
                html: `PLease click on the following link :
                ${process.env.BASE_URL}/api/v1/users/verify/${token}
                `, // html body
              };
          
             await transporter.sendMail(mailOptions);
              res.status(200).json({
                message:"User registered successfully",
                success: true
              })


    }catch(error){
        console.log("error ",error);
        return res.status(500).json({
            message:"User not registered",
            error:error,
            success: false
        })
    }
    
    // save token
    // send token as email to user
    // send success status to user




}



const login = async (req, res) => {
  
   
        const {name,email,password} = req.body;
        if(!name || !email || !password){
            return res.status(400).json({
                message:"All fields are required"
            })
        }
    
    try{
        const existingUser = await User.findOne({email});
        
        if(!existingUser){
            return res.status(400).json({
                message:"User does not exists"
            })
        }

     const isMatch = await bcrypt.compare(password,existingUser.password);
     if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      const token = jwt.sign({id:existingUser._id},'shhh',{
        expiresIn:'24h'
      })
      const cookieOptions = {
        httpOnly:true,
        secure:true,
        maxAge:24 *60*60*1000
      }
      res.cookie("test",token,cookieOptions);
      res.status(200).json({
        success:true,
        message:"Login Successful",
        user:{
            id:existingUser._id,
            email:existingUser.email,
            role:existingUser.role
        }
      })

    }catch(error){
        console.log("error ",error)
        res.status(500).json({
            message:"Error Logging in user",
            error,
            success:false
        })

    }


}


console.log("hi")



const verifyUser = async(req,res)=> {
// get token from url
try{
    const {token} = req.params; 
    //validate token
    console.log(token);
    if(!token){
        res.status(400).json({
        message:"Inccorect token",
        success:false
        });
        }

    //check in the database user based on token
    const user = await User.findOne({verificationToken:token});

    //userfound --- isverified true

    if(!user)if(!token){
        res.status(400).json({
        message:"Inccorect token",
        success:false
        });
        }

        user.isVerified = true;
        user.verificationToken = undefined;
        await user.save();
    //remove verification token


    //return response
        res.status(200).json({
            message:"User Verified",
            success:true
        });
    }catch(error){
        console.log("error ",error);
        return res.status(500).json({
            message:"User not registered",
            error:error,
            success: false
        })
    }



}


export {
    registerUser,
    login,
    verifyUser
}