import React from 'react';
import sha1 from 'js-sha1'
import auth from 'solid-auth-client'
import { parse } from 'uri-js'
import Encrypt from './Encrypt'

import Header from './components/Header'
import Input from './components/Input'
import Display from './components/Display'

import './style/App.css'

const fileClient = require('solid-file-client');
class App extends React.Component {

    constructor(props) {
        super(props);
        this.encrypter = new Encrypt();
        this.files = ""
    }
    state = {
        isSaved: false,
        text: "",
        lang: "java",
        search: false,
    };

    encryptPaste = () => {
        this.encrypter.encrypt(this.state.text);
    };

    loadEncrypted = (loc, password) => {
        this.encrypter.decrypt(loc, password);
    };

    savePaste = (webId) => {
        let parsed = parse(webId);
        let loc = (name) => `${parsed.scheme}://${parsed.host}/public/solid-paste/${name}`;

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
        const loc = document.getElementById("loadBox").value;
        auth.fetch(loc).then(response => response.text()).then(text => {
            this.setText(text);
            this.setState({isSaved: true});

        })
    };

    setText = text => {
        this.setState({
            text: text
        })
    };
    getFiles1 = async (folder = 'https://evansun.solid.community') => {
    let files = [];
    const folderContents = await fileClient.readFolder(folder);
    for (let j of folderContents.files){files.push(j)};
      for (let subFolder of folderContents.folders){
      const folderContents = await this.getFiles1(subFolder.url);
      for(let j of folderContents.value){files.push(j)}
    }
    //console.log(files)
    return Promise.resolve({value:files, done:true});
  };
    getFiles = async (webId) =>{
      let parsed = parse(webId);
      console.log(parsed['host'])
      this.files  = await this.getFiles1(('https://' + parsed['host']));
      console.log(this.files)
      let listOfFiles = []
      let i = 0;
      for(i = 0; i < this.files['value'].length; i ++){
        console.log(this.files['value'][i]['type'].substring(0, 4))
        if(this.files['value'][i]['type'].substring(0, 4) == "text"){
        listOfFiles.push(this.files['value'][i]['url'])
      }
      }
      console.log(listOfFiles)
      this.setText(listOfFiles.join('\n'));
    }
    render() {
        return (
            <div className="App">
                <Header getFiles = {this.getFiles} onSave={this.savePaste} onLoad={this.loadPaste}/>
                {this.state.isSaved
                    ? <Display text={this.state.text} lang={this.state.lang}/>
                    : <Input text={this.state.text} setText={this.setText}/>}

            </div>

        );
    }
}

export default App;
