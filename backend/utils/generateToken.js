
import jwt from"jsonwebtoken";
  
const   generateToken=(id,role)=>{
 return jwt.sign(
      {id,role},
      process.env.JWT_SECRET ||"secret123", // use .env for security
      { expiresIn:process.env.TOKEN_SECRET_EXPIRY}
    );
}
    export default generateToken;
