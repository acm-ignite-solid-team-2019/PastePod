import React from 'react';
import {Route, Switch, withRouter} from 'react-router-dom'
import { parse } from 'uri-js'
import auth from 'solid-auth-client'
import crypto from 'crypto'
import Header from "./components/Header";
import Input from "./components/Input";
import Display from './components/Display'

import './style/App.css'

const fileClient = require('solid-file-client');
class App extends React.Component {

    constructor(props) {
        super(props);
        this.files = ""
    }
    state = {
        isSaved: false,
        text: "",
        lang: "java",
        search: false,
      }
    setText = text => {
        this.setState({ text: text });
      }
    savePaste = webId => {
        let parsed = parse(webId);
        let loc = name => `${parsed.scheme}://${parsed.host}/public/solid-paste/${name}.txt`;

        let key = crypto.randomBytes(20).toString('hex');
        auth.fetch(loc(key), {
            method: "PUT",
            headers: { "content-type": "text/plain" },
            body: this.state.text
        })
        .then(() => fetch(`http://localhost:8080/paste/${key}`, { method: "PUT", body: loc(key) }))
        .then(() => this.setState({ text: "" }))
        .then(() => this.props.history.push(`/${key.slice(0, 8)}`));
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
    getFiles1 = async (folder) => {
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
                <Header onSave={this.savePaste} onLoad ={this.loadPaste} getFiles = {this.getFiles} canSave={this.state.text.length > 0}/>
                <Switch>
                    <Route exact={true} path="/" render={props => <Input {...props} text={this.state.text} setText={this.setText}/>}/>
                    <Route path="/:hash" component={Display}/>
                </Switch>
            </div>
        );
    }
}

export default withRouter(App);
