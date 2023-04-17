const express = require("express")
const app = express()
const jwt= require("jsonwebtoken")
const cors = require("cors")
const { DefaultDeserializer } = require("v8")

const DEV_PORT = 5000

app.use(cors())
app.use(express.json())

const users = [
    {
      id: "1",
      username: "john",
      password: "John0908",
      isAdmin: true,
    },
    {
      id: "2",
      username: "jane",
      password: "Jane0908",
      isAdmin: false,
    },
  ];

  const refreshTokens = []
  app.post("/api/refresh",(req,res)=>{
    const refreshoken = req.body.token

    if(!refreshoken){
        return res.status(401).json({msg:"Token expired"})
    }
    if(!refreshTokens.includes(refreshoken)){
        return res.status(403).json({msg:"Refresh token is not valid"})
    }
    jwt.sign(refreshoken,"myRefreshSecretKey",(err,user)=>{
        err && console.log(err)
        refreshTokens = refreshTokens.filter(token=> token !==refreshoken)

        const newAccessToken = generateAccessToken(user)
        const newRefreshToken = generateRefreshToken(user)
    
        refreshTokens.push(newRefreshToken)
    
        res.status(200).json({
            accessToken:newAccessToken,
            refreshoken : newRefreshToken
        })
    })

  })

  const generateAccessToken = (user)=>{
    return jwt.sign({
        id: user.id,
        isAdmin: user.isAdmin
    },"mySecretKey",
    {expiresIn:"15m"})

  }

  const generateRefreshToken = (user)=>{
    return jwt.sign({
        id: user.id,
        isAdmin: user.isAdmin
    },"myRefreshSecretKey",
    {expiresIn:"15m"})

  }

app.post("/api/login",(req,res)=>{
    try{
        const {username,password} = req.body

        const user = users.find(user=>{
            return user.username===username &&
            user.password === password
        })

        if(user){

            const accessToken= generateAccessToken(user)
            const refreshToken= generateRefreshToken(user)
            refreshTokens.push(refreshToken)
            
            res.json({
                username:user.username,
                isAdmin:user.isAdmin,
                accessToken})

        }else{
            throw new Error("User dont exits")
        }

    }catch(err){
        res.json({error:err?.message})
    }
})



const verifiyToken = (req,res,next)=>{
    const authHeader = req.headers.authorization

    if(authHeader){
        const token =  authHeader.split(" ")[1]

        jwt.verify(token,"mySecretKey",(err,user)=>{
            if(err){
                res.status(401).json({error:"Token is not valid"})
            }

            req.user = user
            next()

        })
    }else{
        res.status(401).json({error:"No authorization"})
    }
}
app.post("/login/logout",verifiyToken,(req,res)=>{
    const refreshoken = req.body.refreshToken
    refreshTokens = refreshTokens.filter(token!==refreshoken)
    res.status(200),json({msg:"You logged out successfully"})
})

app.delete("/api/users/:userId",verifiyToken,(req,res)=>{
    if(req.user.id === req.params.userId || req.user.isAdmin){
        res.status(200).json({msg:"User sucessfully deleted"})
    }else{
        res.status(200).json({error:"You are not allowed to delete"})
    }

})


app.listen(DEV_PORT,()=>{
    console.log("Listening on "+DEV_PORT+" port")
})