const server=require('express').Router()
const mailclient=require('../services/mailservice')
const mailer=new mailclient()
const mongoclient=require('mongodb').MongoClient


server.post('/send',(req,res)=>{

  
    if(req.body.uname!=undefined && req.body.uemail!=undefined){
   
        var currentdate = new Date(); 
        var date = currentdate.getDate()
        var month = currentdate.getMonth()
        var year = currentdate.getFullYear() 
        var hours = currentdate.getHours()  
        var minutes = currentdate.getMinutes() 
        var sec = currentdate.getSeconds();
        time=date+"/"+month+"/"+year+"-"+hours+":"+minutes+":"+sec
        data={
            id:1,
            name:req.body.uname,
            email:req.body.uemail,
            otp:req.body.otp,
            time:time

        }
       
        mongoclient.connect("mongodb://localhost:27017",(error,connection)=>{
        connection.db("ibm_training").collection("registration").insert(data,(err,res)=>{
                if(err){
                   console.log("registration failed") 
                }
                else{
                    console.log("data-saved")
                    
                }
            })
        })
    mailbody={
        to:req.body.uemail,
        from:'ibmtechtraining007@gmail.com',
        subject:"One Time Password",
        body:`<div>Dear ${req.body.uname},</div>
              <div>To complete your registration, your One time Password is,</div>
              <div>${req.body.otp}</div>
              <div> <a href=".html">
              click here</a> to complete your registration process.</div> `
    }
    res.end(JSON.stringify({
        message:mailer.email(mailbody)
    }))
    }
    else{
        console.log("3")
        res.end(JSON.stringify({
            message:"please enter name and email"
        }))
    }

})

server.get('/verify',(req,res)=>{
    console.log("verifyyyyy");
    mongoclient.connect("mongodb://localhost:27017",{ useNewUrlParser: true },(error,connection)=>{
            connection.db("ibm_training").collection("registration").find({}).toArray((err,data)=>{
                if(err){
                   console.log("registration failed") 
                }
                else{
                    console.log("data-saved")
                     res.end(JSON.stringify({
                         data:data
                     }))
                }
            })
        })
})

server.get('/update/:email/:pass',(req,res)=>{
    console.log(req.params.email)
    console.log(req.params.pass)
    mongoclient.connect("mongodb://localhost:27017",{ useNewUrlParser: true },(error,connection)=>{
            connection.db("ibm_training").collection("registration").update({email:req.params.email},{$set: {pass:req.params.pass}},{upsert:true})
})
})

module.exports=server