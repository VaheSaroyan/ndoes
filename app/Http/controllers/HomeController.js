import UsersModel from '../../models/UsersModel'
import PricesModel from "../../models/PricesModel";

class HomeController {
   async index({Request:req,Response:res}){

       const user = await UsersModel.where('id','1').get()
       console.log(user);

       res.render('index', { title:user?.name, });
       //  const prices =  PricesModel.all()
       //  console.log({prices});

    }
    secound({Request:req,Response:res}){

        res.render('index', { title: 'req.title', });
    }
    secounds({Request:req,Response:res}){

        res.send({tst:'aaaa'});
    }

}


export default HomeController
