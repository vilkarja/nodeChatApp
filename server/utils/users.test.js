const expect = require('expect');
var {Users} = require('./users');


describe('Users', () => {
    var users;
    beforeEach(() => {
        users = new Users;
        users.users = [{
         id: 1,
         name: 'Example person',
         room: 'Test room'   
        }, {
            id: 2,
            name: 'Example person two',
            room: 'Not the same room'   
        }, {
            id: 3,
            name: 'Example person three',
            room: 'Test room'   
        }]
    })

    it('should add new user', () => {
        var testUsers = new Users();
        var user = {
            id: 123,
            name: 'Example',
            room: 'test'
        };
        var resUser = testUsers.addUser(user.id, user.name, user.room);
        expect(testUsers.users).toEqual([user]);
    });
    it('should return names for test room', () => {
        var userList = users.getUserList('Test room');

        expect(userList).toEqual(['Example person', 'Example person three']);
    });
    it('should return name for spesific id', () => {
        var user = users.getUser(1);

        expect(user.id).toBe(1);
    });
    it('should not return name for spesific id', () => {
        var user = users.getUser(99);

        expect(user).toNotExist();
    });
    it('should remove a user', () => {
        var userID = 1;
        var user = users.removeUser(userID);

        expect(user.id).toBe(1);
        expect(users.users.length).toBe(2);
    });
    it('should not remove a user', () => {
        var userID = 99;
        var user = users.removeUser(userID);

        expect(user).toNotExist();
        expect(users.users.length).toBe(3);
    });
    
});