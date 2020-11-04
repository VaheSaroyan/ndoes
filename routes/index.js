import Route from '@nlr/router';

Route.get("/",'HomeController@index');
Route.get("/user",'HomeController@secound');
Route.delete("/user",'HomeController@secounds');

export default Route.router
