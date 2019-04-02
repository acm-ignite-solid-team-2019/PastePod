import React from 'react';
import sha1 from 'js-sha1'
import auth from 'solid-auth-client'
import { parse } from 'uri-js'

import Header from './components/Header'
import Input from './components/Input'
import Display from './components/Display'

import './style/App.css'

class App extends React.Component {
    state = {
        isSaved: false,
        text: "",
        lang: "java"
    };

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

    setText = text => {
        this.setState({
            text: text
        })
    };

    render() {
        return (
            <div className="App">
                <Header onSave={this.savePaste}/>

                {this.state.isSaved
                 ? <Display text={this.state.text} lang={this.state.lang}/>
                 : <Input text={this.state.text} setText={this.setText}/>}
            </div>
        );
    }
}

export default App;
