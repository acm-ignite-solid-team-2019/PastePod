import React from 'react';
import {Route, Switch, withRouter} from 'react-router-dom'
import { parse } from 'uri-js'
import auth from 'solid-auth-client'
import crypto from 'crypto'

import Sidebar from "./components/Sidebar"
import Input from "./components/Input";
import Display from './components/Display'

import './style/App.css'

class App extends React.Component {

    state = {
        text: "",
        isSidebarOpen: false
    };

    setSidebarOpen = isOpen =>
        this.setState({ isSidebarOpen: isOpen });

    setText = text =>
        this.setState({ text: text });

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
            .then(() => this.props.history.push(`/${key.slice(0, 8)}`))
    };

    onEdit = () => {
        this.props.history.push('/');
    };

    onNew = () => {
        this.props.history.push('/');
        this.setState({
            text: ""
        })
    };

    render() {
        return (
            <Sidebar
                isOpen={this.state.isSidebarOpen}
                setOpen={this.setSidebarOpen}
                onSave={this.savePaste}
                canSave={this.state.text.length > 0}
                onEdit={this.onEdit}
                onNew={this.onNew}
            >
                <div className="Main">
                    <Switch>
                        <Route exact={true} path="/" render={props =>
                            <Input {...props} text={this.state.text} setText={this.setText}/>}/>
                        <Route path="/:hash" render={props =>
                            <Display {...props} text={this.state.text} setText={this.setText}/>}/>
                    </Switch>
                </div>
            </Sidebar>
        );
    }
}

export default withRouter(App);
