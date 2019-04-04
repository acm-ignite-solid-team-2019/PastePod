import React from 'react';
import sha1 from 'js-sha1'
import auth from 'solid-auth-client'
import { parse } from 'uri-js'
import Encrypt from './Encrypt'

import Header from './components/Header'
import Input from './components/Input'
import Display from './components/Display'

import './style/App.css'

class App extends React.Component {

    constructor(props) {
        super(props);
        this.encrypter = new Encrypt();
    }
    state = {
        isSaved: false,
        text: "",
        lang: "java",
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
            console.log(text);
            this.setText(text);
            this.setState({isSaved: true});

        })
    };

    setText = text => {
        this.setState({
            text: text
        })
    };

    render() {
        return (
            <div className="App">
                <Header onSave={this.savePaste} onLoad={this.loadPaste}/>

                {this.state.isSaved
                    ? <Display text={this.state.text} lang={this.state.lang}/>
                    : <Input text={this.state.text} setText={this.setText}/>}
            </div>

        );
    }
}

export default App;
