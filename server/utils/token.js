import jwt from "jsonwebtoken";

export const genrateToken = (id) => {
    return jwt.sign({id},process.env.jwtsecret,{
        expiresIn:"30d"
    })
} 