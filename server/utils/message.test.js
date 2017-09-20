const expect = require('expect');
var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        var from = 'Someone';
        var text = 'some message';
        var message = generateMessage(from, text);
        
        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({from, text});
        
    });
});

describe('generateLocationMessage', () => {
    it('should generate current lcoation object', () => {
        var from = 'Someone';
        var latitude = 1;
        var longitude = 1;
        var url = 'https://www.google.com/maps?q1,1';
        var message = generateLocationMessage(from, latitude, longitude);
        
        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({from, url});
        
    });
});