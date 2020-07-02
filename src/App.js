import React from 'react';
import { Chat, Channel, ChannelList, Window } from 'stream-chat-react';
import { ChannelHeader, MessageList } from 'stream-chat-react';
import { MessageInput, Thread } from 'stream-chat-react';
import { StreamChat } from 'stream-chat';

import 'stream-chat-react/dist/css/index.css';

const chatClient = new StreamChat('ym9yv7tys5dh');
const userToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoic2hpdmFuZyJ9.vzN6Cq6GYZQaIKqXqIYvOaLUDYhWd0RCsdp69xSXBRU';

chatClient.setUser(
  {
    id: 'shivang',
    name: 'shivang'
  },
  userToken,
);
// const conversation = chatClient.channel('messaging', 'ashish', {
//   name: 'ashish',
//   image: 'http://bit.ly/2O35mws',
//   members: ['shivang', 'mark42a'],
// });

// async function f(){
//   await conversation.create();  
// }
// f();

const filters = { type: 'messaging', members: { $in: ['shivang'] } };
const sort = { last_message_at: -1 };
const channels = chatClient.queryChannels(filters, sort);

const App = () => (
  <Chat client={chatClient} theme={'messaging light'}>
    <ChannelList
      filters={filters}
      sort={sort}
    />
    <Channel>
      <Window>
        <ChannelHeader />
        <MessageList />
        <MessageInput />
      </Window>
      <Thread />
    </Channel>
  </Chat>
);

export default App; 