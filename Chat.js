function Chat(id){
  var messages=[];
  var chatID=id;
  return {
    getChatId: () => chatID ,
    pushMessage: (msg)=>messages.push(msg),
    getMessages: () => [...messages],
  } 
}
function Message(userName, msg){
  return {
    id: Date.now() + Math.random(),
    userName,
    msg,
    time: Date.now() // Unix timestamp in milliseconds
  }
}
module.exports = {
  Chat,
  Message,
};