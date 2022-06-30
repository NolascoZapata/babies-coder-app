//Admin
const authAdmin =(req,res,next)=>{
  if (req.session && req.user.isAdmin) {
      return next()
  }
  return res.status(401).send('No Autorizado')
}


module.exports = authAdmin
