import React, { Component, useState, useMemo } from 'react'
import Input from './Input';

const typeAction={
  CLIENT_CONNECT:'CLIENT_CONNECT',
  RECIVED_MESSAGE: 'RECIVED_MESSAGE',
  CLIENT_SEND_MESSAGE: 'CLIENT_SEND_MESSAGE',
  SET_ID_CONNECTION:'SET_ID_CONNECTION'
}

const Message=React.memo(({ userName, time, msg})=>{
  const displayTime=useMemo(() => {
    const t = new Date(time);
    return t.getHours()+':'+t.getMinutes()+':'+t.getSeconds()
  }, [ time ])

  return (
    <li style={{border: '1px solid #ddd', padding:'8px'}}>
      <p style={{display:'flex', justifyContent:'space-between', margin: '0 0 8px 0'}}>
        <span style={{fontWeight:600}}>{userName}</span>  
        <span>{displayTime}</span>  
      </p> 
      <p style={{margin:0}}>{msg}</p>
    </li>
  )
}, (p,n)=>p.id===n.id)

const NewUser = ({ callback }) => {
  const [ name, setName ] = useState('');
  return (
    <div className='chat'>
      <div 
        className='flex-container' 
        style={{justifyContent:'center', alignItems:'center', backgroundColor:'#dadaf', marginTop:32, padding:'0 8px'}}
      >
        <div className='col-lg-9'>
          <Input 
            withClear={false}
            style={{borderRadius:0}}
            onChange={(e)=>setName(e)}
            placeholder={'User Name...'}
          />
        </div>
        <button 
          className='send col-lg-3' 
          onClick={()=>callback(name)} 
          style={{backgroundColor:'#00af00', height:33, color:'#fff'}}
        >
          Connect
        </button>
      </div>
   </div>
  ) 
}

export default class Chat extends Component {
  constructor(props){
    super(props, null, null);
    this.state={
      messages: [],
      clientName: '',
      msg:''
    }
    this.WSocket = new WebSocket("ws://localhost:5000");
    this.WSocket.onopen = (e) =>{
      this.WSocket.send(JSON.stringify({
        action:typeAction.SET_ID_CONNECTION,
        data: {
          chatId:this.props.chatId,
        }
      }))
    }
    this.WSocket.onmessage = message => {
      console.log('Received:')
      const res = JSON.parse(message.data);
      switch (res.action) {
        case typeAction.RECIVED_MESSAGE:
          this.setState({messages: [...this.state.messages, res.data.message]});
          break;
      
        default:
          break;
      }
    };


  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.clientName !== this.state.clientName) {
      this.WSocket.send(JSON.stringify({
        action:typeAction.CLIENT_CONNECT,
        data: {
          chatId:this.props.chatId,
          clientName: this.state.clientName,
          hostingName: this.props.nameChat
        }
      }))
    }
  }
  componentWillUnmount() {
    if(this.WSocket && this.WSocket.readyState === WebSocket.OPEN)
      this.WSocket.close()
  }
  handleSendMesage=()=>{
    const { msg, clientName } = this.state;
    if(msg.length){
      this.WSocket.send( JSON.stringify({
        action:typeAction.CLIENT_SEND_MESSAGE,
        data: {
          chatId:this.props.chatId,
          clientName: clientName,
          msg: msg
        }
      }))
      this.setState({msg:'-1'});
    }
  }
  render() {
    const { clientName, messages, msg } = this.state;
    if(clientName.length)
    return(
      <div className='chat'>
        <h2>Chat</h2>
        <div className='messages'>
          <ul>
            {messages.map( m => (
              <Message
                key={m.id}
                id={m.id}
                userName={m.userName===clientName ? 'Me' : m.userName}
                time={m.time}
                msg={m.msg}
              />
            ) )}
          </ul>
          <div className='send'>
            <div className='col-lg-9_5'>
              <Input 
                withClear={false}
                style={{borderRadius:0}}
                value={msg}
                onChange={(e)=>this.setState({msg:e})}
                placeholder='Message...'
              />
            </div>
            <button className='send' onClick={this.handleSendMesage}>
              Send
            </button>
          </div>
        </div>
      </div>
    )
    return <NewUser callback={clientName=>this.setState({clientName})}/>
  }
}