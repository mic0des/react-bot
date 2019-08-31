import React, { Component } from 'react';
import axios from 'axios/index';
import Cookies from 'universal-cookie';
import {v4 as uuid} from 'uuid';
import Message from './Message';

const cookies = new Cookies();

class Chatbot extends Component {
  messagesEnd;
  constructor(props){
    super(props);

    this._handleInputKeyPress = this._handleInputKeyPress.bind(this);

    this.state = {
      messages: []
    }

    if (cookies.get('userID' === undefined)) {
      cookies.set('userID', uuid(), {path: '/'});
    }
  }

  async df_text_query(text) {
    let says = {
      speaks: 'me',
      msg: {
        text: {
          text: text
        }
      }
    };
    this.setState({messages: [...this.state.messages, says]});
    const res = await axios.post('/api/df_text_query', {text, userID: cookies.get('userID')});

    for (let msg of res.data.fulfillmentMessages) {
      console.log(JSON.stringify(msg));
      let says = {
        speaks: 'bot',
        msg: msg
      }
      this.setState({messages: [...this.state.messages, says]});
    }
  }

  async df_event_query(event) {
    const res = await axios.post('/api/df_event_query', {event, userID: cookies.get('userID')});

    for (let msg of res.data.fulfillmentMessages) {
      let says = {
        speaks: 'bot',
        msg: msg
      }
      this.setState({messages: [...this.state.messages, says]});
    }
  }

  componentDidMount(){
    this.df_event_query('Welcome');
  }

  componentDidUpdate(){
    this.messagesEnd.scrollIntoView({behavior: "smooth"});
  }

  renderOneMessage(message, i) {
    if (message.msg && message.msg.text && message.msg.text.text) {
      return <Message key={i} speaks={message.speaks} text={message.msg.text.text} />;
    } else {
      return <h2>Cards</h2>
    }
  }

  renderMessages(stateMessages) {
    if (stateMessages) {
      return stateMessages.map((message, i) => {
        return this.renderOneMessage(message, i);
      });
    } else {
      return null;
    }
  }

  _handleInputKeyPress(e){
    if (e.key === 'Enter') {
      this.df_text_query(e.target.value);
      e.target.value = '';
    }
  }

  render() {
    return (
      <div style={{height: 400, width: 400, float: 'right'}}>
        <div id="chatbot" style={{height: '100%', width: '100%', overflow: 'auto'}}>
          <h2>Chatbot</h2>
          {this.renderMessages(this.state.messages)}
          <div ref={(el) => {this.messagesEnd = el;}}/>
          <div style={{ float: 'left', clear: 'both'}}/>
          <input type='text' onKeyPress={this._handleInputKeyPress} />
        </div>
      </div>
    )
  }
};

export default Chatbot;