const adminOnly = (req,res,next)=>{
    if(req.user.role !== 'admin'){
        res.status(400)
        throw new Error('Admin access only')

    }
    next()
}

module.exports = adminOnly