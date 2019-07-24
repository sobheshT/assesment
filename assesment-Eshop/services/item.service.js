const product = require('../dbs/product');
const addcart =require('../dbs/add');
const Email = require('./emailservice').Email;

const emailService = new Email();
class Product_service
{
    constructor()
    {
        this.product=product
        this.addcart=addcart
    }
    all(){

        return this.product;
    }
    all1()
    {
        return this.addcart;
    }
    search(id){
        this.product.forEach((u)=>{
            if(u.id == id)
            { 
            this.addcart.push(u)
            console.log(addcart)
            }
       })
       
    }
    modify(name,quantity)
      {
        
        this.product.forEach((u)=>{
            if(u.name==name)
            {
                u.quantity=parseInt(u.quantity)-parseInt(quantity)
                console.log(u.quantity)
            }
            
        })

    }
    email(data)
    {
        let userObj ={

            subject : "INVOICE GENERATION",

            body : `<div>Dear <b>user</b></div>

                    <div>Thank you for registering</div>`,

            from : null,

            to : "sobheshbarun@gmail.com"

        }

        emailService.emailWithAttachment(userObj,data);

    }
    
}
module.exports.Product_service=Product_service;