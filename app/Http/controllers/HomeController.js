import UserModel from '../../models/UserModel'
class HomeController {

    async index({Request:req,Response:res}){
       const user = await UserModel.where('username','valodik').get()
        console.log(user);
        res.send('valodik');
    }
    secound({Request:req,Response:res}){

        res.render('index', { title: 'req.title', });
    }
    secounds({Request:req,Response:res}){

        res.send({tst:'aaaa'});
    }

}


export default HomeController
