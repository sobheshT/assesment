const product = require('../dbs/product');
class Product_service
{
    constructor()
    {
        this.product=product
    }
    all(){

        return this.product;

    }
    search(id){
        return this.users.find((u)=>{

            return u.id == id;
            });

    }
    
    
}
module.exports.Product_service=Product_service;