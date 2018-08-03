var expect = require('expect');

var {generateMessage} = require('./message')

describe('generateMessage', () => {
  it('should generate the correct message object', () => {
    var from = 'Peter';
    var text = 'Simple Message!';
    var message = generateMessage(from, text);

    //expect(message.timestamp).toBeA('number');
    expect(message).toMatchObject({from,text});
  });
});
