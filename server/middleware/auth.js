const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req,res,next){
    try {
        let token = req.headers.authorization;
        if(!token) return res.status(403).send(`Unauthorized!`);
        token = token.replace('Bearer ','');
        const decoded = jwt.verify(token,config.get('jwtPrivateKey'));
        if(!decoded) return res.status(403).send(`Unauthorized`);
        req.user = decoded._id;
        next();
    } catch (error) {
        console.log(error);
    }
}