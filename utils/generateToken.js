import jwt from 'jsonwebtoken';
// Only for in template, this should import Sequelize Models
import models from './db.js';
/**
 * @description This function generates accessToken and refreshToken, return both tokens and store new refreshToken in the database after removing the old one
 * @param payload 
 * @example 
 * {
 *   username: "Vo viet Long"
 *   password: "password"
 * }
 */
const generateToken = async (payload) => {
    try {
        const {userId, username, password} = payload
        const accessToken = jwt.sign(payload,
            process.env.JWT_SECRET,
            {expiresIn: `${process.env.ACCESS_TOKEN_SECRET}`}
        )
        const refreshToken = jwt.sign(payload,
            process.env.JWT_SECRET,
            {expiresIn: `${process.env.REFRESH_TOKEN_SECRET}`}
        )
        
        // 1. Find in the database if there is a refresh token record of userID
        // 2. Remove the stored refresh token
        // 3. Store new refresh token in the database
        // Change logic when using this template in exam
        const userOldToken = await models.refresh_tokens.findOne({
            where:{
                user_id: userId
            }
        })
        if (userOldToken) {
            await userOldToken.destroy();  
        }
        const newToken = models.refresh_tokens.build({user_id: userId, token: refreshToken})
        await newToken.save();
        // Keep this
        return Promise.resolve({accessToken, refreshToken})
    } catch (error) {
        return Promise.reject(error)   
    }
}

export default generateToken