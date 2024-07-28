module.exports = (req,res)=>{
try{

    res.status(200).json({
      message: "Wellcome to our server.",
      date: Date.now(),
      success: true
    })
}catch(err){
  res.status(500).json({
    message: err.message || err,
    error: true
})
}
}
