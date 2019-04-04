import React from 'react';
import sha1 from 'js-sha1'
import auth from 'solid-auth-client'
import { parse } from 'uri-js'
import Header from './components/Header'
import Input from './components/Input'
import Display from './components/Display'

import './style/App.css'
const Cryptr = require('cryptr');
const auth = require('solid-auth-client')
const randomstring = require("randomstring");
class App extends React.Component {
      constructor(props) {
        super(props)
        this.password = "password"
        this.nextpassword = ""
        this.pods = ['https://evansun.solid.community/public/','https://evansun.solid.community/public/','https://evansun.solid.community/public/', 'https://evansun.solid.community/public/']
      };
    state = {
        isSaved: false,
        text: "",
        lang: "java",
    };
    encrypt = (json) =>{
        let cryptr = new Cryptr(this.password)
        return cryptr.encrypt(JSON.stringify(json))
    }
    decrypt = (json, password) =>{
        let decryptr = new Cryptr(password)
        return JSON.parse(decryptr.decrypt(json))
    }
    encryptPaste = () => {
        let text = String(this.state.text)
        let i = 0
        const splits = 4
        let data = []
        let length = text.length
        this.nextpassword = randomstring.generate(10)
        for(i = 0; i < splits; i ++){
          if(i != splits -1){
          data.push(this.encrypt({'data': text.substring(i*Math.floor(length / splits),(i+1)*Math.floor(length / splits)), "location": this.pods[i], "password": this.nextpassword.substr(this.nextpassword.length - 10)}))
          console.log(this.nextpassword)
          console.log(this.nextpassword.substr(this.nextpassword.length-10))
          this.nextpassword += randomstring.generate(10)
        }
        else{
            data.push(this.encrypt({'data': text.substring(i*Math.floor(length / splits),(i+1)*Math.floor(length / splits)), "location": "EOF", "password": "EOF"}))
        }
        }
        return data
    }
    loadEncrypted = (loc, password) => {
      let self = this
      let data = []
      auth.fetch(loc).then(response => response.text()).then(text=>{
          data.push(self.decrypt(text, password))
          let newLoc = data.slice(-1)[0].location
          let newPass = data.slice(-1)[0].password
          while(newLoc!= "EOF"){
            auth.fetch(newLoc).then(response => response.text()).then(text=>{
              data.push(self.decrypt(text,newPass))
            })
            newLoc = data.slice(-1)[0].location
            newPass += data.slice(-1)[0].password
          }
            })
          }


    savePaste = (webId) => {
        let parsed = parse(webId);
        let loc = (name) => `${parsed.scheme}://${parsed.host}/public/solid-paste/${name}`;

        console.log("savePaste");
        this.setState({
            isSaved: true
        });

        let key = sha1(webId + this.state.text);
        auth.fetch(loc(key), {
            method: "PUT",
            force: true,
            headers: {
                "content-type": "text/plain",
                "credentials": "include"
            },
            body: this.state.text
        });
    };
    loadPaste = () => {
        const loc =  document.getElementById("loadBox").value;
        let self = this
        auth.fetch(loc).then(response => response.text()).then(text=>{
          console.log(text);
          self.setText(text);
          self.setState({isSaved:true});

        })
    }
    setText = text => {
        this.setState({
            text: text
        })
    };

    render() {
        return (
            <div className="App">
                <Header onSave={this.encryptPaste} onLoad={this.loadPaste}/>

                {this.state.isSaved
                 ? <Display text={this.state.text} lang={this.state.lang}/>
                 : <Input text={this.state.text} setText={this.setText}/>}
            </div>

        );
    }
}

export default App;
