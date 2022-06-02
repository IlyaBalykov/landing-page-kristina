const User = require('./models/User');
const Role = require('./models/Role');

class authController {
    async registration(request, response) {
        try {

        } catch (e) {
            console.log(e);
        }
    }


    async login(request, response) {
        try {

        } catch (e) {
            console.log(e);
        }
    }

    async getUsers(request, response) {
        try {
            //make 2 users
            //const userRole = new Role();
            //const adminRole = new Role({ value: 'admin' }); // for userRole use default value === 'user
            //await userRole.save(); // save is mongo function for save data
            //await adminRole.save();

            response.json("server work");
        } catch (e) {
            console.log(e);
        }
    }
}

module.exports = new authController();