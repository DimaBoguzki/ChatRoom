const express = require('express');
const WebSocketServer = require("websocket").server
const app = express();
const httpServer = require('http').createServer(app);
const ChatModel = require('./Chat')['Chat'];
const MessageModel = require('./Chat')['Message'];


const websocket = new WebSocketServer({
  "httpServer": httpServer
})

const typeAction={
  CLIENT_CONNECT:'CLIENT_CONNECT',
  RECIVED_MESSAGE: 'RECIVED_MESSAGE',
  CLIENT_SEND_MESSAGE: 'CLIENT_SEND_MESSAGE',
  SET_ID_CONNECTION:'SET_ID_CONNECTION'
}

const chats={};// all message og chat by chat id
const clients=[]; 

websocket.on("request", request => {
  connection = request.accept(null, request.origin);

  clients.push(connection);

  connection.on("message", message => {
    let newMsg=null;
    const res=JSON.parse(message.utf8Data);
    switch (res.action) {
      case typeAction.CLIENT_CONNECT:
        if( !chats[res.data.chatId] )
          chats[res.data.chatId]=ChatModel(res.data.chatId);
        newMsg=MessageModel( `${res.data.hostingName}`, `Hello ${res.data.clientName}`)
        chats[res.data.chatId].pushMessage(newMsg);
        break;
      case typeAction.CLIENT_SEND_MESSAGE:
        newMsg=MessageModel( res.data.clientName, res.data.msg );
        chats[res.data.chatId].pushMessage(newMsg);
        break;
      case typeAction.SET_ID_CONNECTION: // save chat id ( room )
        connection.ChatId=res.data.chatId;
        break;
      default:
        break;
    }
    if(newMsg){
      clients.forEach(function(client) {
        if(client.ChatId === res.data.chatId){
          client.send(JSON.stringify({
            action: typeAction.RECIVED_MESSAGE,
            data: {
              message: newMsg
            }
          }))
        }
      });
    }
  })
})
 

app.get('/fetch', async (req, res) => {
  const data = require('./data.json');
  res.header("Content-Type",'application/json');
  res.send(JSON.stringify(data));
})

const PORT = process.env.PORT || 5000;

httpServer.listen(PORT, () => console.log(`Lisening on port :${PORT}`))
