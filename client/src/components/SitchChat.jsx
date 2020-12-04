import React, { useState } from 'react';
import PubNub from 'pubnub';
import { PubNubProvider, PubNubConsumer } from 'pubnub-react';
import keys from '../../../pubnubKeys';

const pubnub = new PubNub({
  publishKey: keys.publishKey,
  subscribeKey: keys.subscribeKey,
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
              margin: 'auto',
            }}
          >
            <div style={{
              backgroundColor: '#e8e7e6',
              alignItems: 'center',
              textAlign: 'center',
              borderBottom: '3px dotted darkgreen'
            }}>Sitchat</div>
            <div
              style={{
                backgroundColor: '#f2f4f5',
                height: '260px',
                overflow: 'scroll',
              }}
            >
              {messages.map((message, messageIndex) => {
                return (
                  <div
                    key={`message-${messageIndex}`}
                    style={{
                      display: 'block',
                      backgroundColor: '#eee',
                      borderStyle: 'outset',
                      color: 'black',
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
                  fontSize: '15px',
                }}
                placeholder="Talk Sitch Smack Here"
                value={message}
                onChange={e => setMessage(e.target.value)}
              />
              <button
                style={{
                  backgroundColor: '#fce2b6',
                  color: 'darkGray',
                  borderRadius: '5px',
                  fontSize: '13px',
                }}
                onClick={e => {
                  e.preventDefault();
                  sendMessage(message);
                }}
              >
                Send Smack
              </button>
            </div>
          </div>
        </header>
      </div>
    </PubNubProvider>
  );
};

export default SitchChat;
