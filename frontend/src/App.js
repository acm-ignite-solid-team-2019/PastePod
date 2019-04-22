import React from 'react';
import {Route, Switch, withRouter} from 'react-router-dom'
import { parse } from 'uri-js'
import auth from 'solid-auth-client'
import sha1 from 'js-sha1'

import Header from "./components/Header";
import Input from "./components/Input";
import Display from './components/Display'

import './style/App.css'

class App extends React.Component {

    state = {
        text: ""
    };

    setText = text =>
        this.setState({ text: text });

    savePaste = webId => {
        let parsed = parse(webId);
        let loc = name => `${parsed.scheme}://${parsed.host}/public/solid-paste/${name}.txt`;

        let key = sha1(webId + this.state.text);
        auth.fetch(loc(key), {
            method: "PUT",
            headers: { "content-type": "text/plain" },
            body: this.state.text
        })
            .then(() => fetch(`http://localhost:8080/paste/${key}`, { method: "PUT", body: loc(key) }))
            .then(() => this.setState({ text: "" }))
            .then(() => this.props.history.push(`/${key}`))
    };


    render() {
        return (
            <div className="App">
                <Header onSave={this.savePaste} canSave={this.state.text.length > 0}/>
                <Switch>
                    <Route exact={true} path="/" render={props => <Input {...props} text={this.state.text} setText={this.setText}/>}/>
                    <Route path="/:hash" component={Display}/>
                </Switch>
            </div>
        );
    }
}

export default withRouter(App);
