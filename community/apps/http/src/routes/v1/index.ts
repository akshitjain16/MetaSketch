import { Router } from "express";
import { userRouter } from "./user";
import { adminRouter } from "./admin.";
import { spaceRouter } from "./space";

export const router =  Router();

router.post("/signup", (req,res)=>{
  res.json({
    message: "SignUp"
  })
})

router.post("/signin", (req,res)=>{
  res.json({
    message: "SignIn"
  })
})

router.get("/elements", (req,res)=>{

})

router.get("/avatars", (req,res)=>{
  
})

router.use("/user", userRouter)
router.use("/space", spaceRouter)
router.use("/admin", adminRouter)