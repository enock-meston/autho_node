const jwt  =  require('jsonwebtoken');


const requireAuth = (req, res, next)=>{
    const token = req.cookies.jwt;

    // check json wweb token exists and is verified
    if(token){
        //verify token
        jwt.verify(token,'secret enock',(err,decodedToken)=>{
            if (err) {
                console.log(err.message);
                res.redirect('/login');
            }else{
                console.log(decodedToken);
                next();
            }
        })
    }else{
        // redirect to login page
        res.redirect('/login');
    }

}

module.exports = {requireAuth};