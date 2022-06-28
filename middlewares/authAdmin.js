//Admin
const authAdmin =(req,res,next)=>{
  if (req.session && req.session.admin) {
      return next()
  }
  return res.status(401).send('No Autorizado')
}

//Client
const auth2 =(req,res,next)=>{
  if (req.session && req.session.user) {
      return next()
  }
  return res.status(401).send('No Autorizado')
}

module.exports={
  authAdmin,
  auth2
}