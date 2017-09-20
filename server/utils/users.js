
class Users {
    constructor () {
        this.users = [];
    }
    addUser(id, name, room) {
        var user = {id,name,room};
        this.users.push(user);
        return user;
    }
    removeUser (id) {
        var users = this.getUser(id);

        if (users) {
            this.users = this.users.filter((user) => user.id !== id);
        }

        return users;
    }
    getUser (id) {
        var user = this.users.filter((user) => user.id === id);
        return user[0];
    }
    getUserList (room) {
        var users = this.users.filter((user) => user.room === room);
        var namesArray = users.map((user) => user.name);
        return namesArray;
    }
}

module.exports = {Users};