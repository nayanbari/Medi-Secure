import jwt from "jsonwebtoken";

export const genrateToken = (id) => {
    return jwt.sign({id},'Dbzssp5iGpomY7r0',{
        expiresIn:"30d"
    })
} 