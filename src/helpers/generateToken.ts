import JWT from 'jsonwebtoken';

export const generateToken = (user: { _id: any; }) => {
    if (!process.env.ACCESS_TOKEN_SECRET) {
            throw new Error('ACCESS_TOKEN_SECRET is not defined');
        }
        
        return JWT.sign(
            {
            _id: user._id
            },
            process.env.ACCESS_TOKEN_SECRET 
        );
}
