import React, { useState } from 'react';
import PubNub from 'pubnub';
import { PubNubProvider, PubNubConsumer } from 'pubnub-react';
// import './App.css';
import keys from '../../../pubnubKeys';

const pubnub = new PubNub({
  publishKey: keys.publishKey,
  subscribeKey: keys.subscribeKey,
  // uuid: '<UUID>'
});
const channels = ['Public Sitch Chat'];

const SitchChat = () => {
  const [messages, addMessage] = useState([]);
  const [message, setMessage] = useState('');

  const sendMessage = message => {
    pubnub.publish(
      {
        channel: channels[0],
        message,
      },
      () => setMessage('')
    );
  };

  return (
    <PubNubProvider client={pubnub}>
      <div className="Chat">
        <header className="Chat-header">
          <PubNubConsumer>
            {client => {
              client.addListener({
                message: messageEvent => {
                  addMessage([...messages, messageEvent.message]);
                },
              });

              client.subscribe({ channels });
            }}
          </PubNubConsumer>
          <div
            style={{
              width: '500px',
              height: '300px',
              border: '1px solid black',
            }}
          >
            <div style={{ backgroundColor: 'grey' }}>React Chat Example</div>
            <div
              style={{
                backgroundColor: 'white',
                height: '260px',
                overflow: 'scroll',
              }}
            >
              {messages.map((message, messageIndex) => {
                return (
                  <div
                    key={`message-${messageIndex}`}
                    style={{
                      display: 'inline-block',
                      float: 'left',
                      backgroundColor: '#eee',
                      color: 'black',
                      borderRadius: '20px',
                      margin: '5px',
                      padding: '8px 15px',
                    }}
                  >
                    {message}
                  </div>
                );
              })}
            </div>
            <div
              style={{
                display: 'flex',
                height: '40px',
                backgroundColor: 'lightgrey',
              }}
            >
              <input
                type="text"
                style={{
                  borderRadius: '5px',
                  flexGrow: 1,
                  fontSize: '18px',
                }}
                placeholder="Type your message"
                value={message}
                onChange={e => setMessage(e.target.value)}
              />
              <button
                style={{
                  backgroundColor: 'blue',
                  color: 'white',
                  borderRadius: '5px',
                  fontSize: '16px',
                }}
                onClick={e => {
                  e.preventDefault();
                  sendMessage(message);
                }}
              >
                Send Message
              </button>
            </div>
          </div>
        </header>
      </div>
    </PubNubProvider>
  );
};

export default SitchChat;
