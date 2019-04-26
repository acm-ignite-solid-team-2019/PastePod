import React from 'react';
import {Route, Switch, withRouter} from 'react-router-dom'
import { parse } from 'uri-js'
import auth from 'solid-auth-client'
import crypto from 'crypto'
import Modal from 'react-modal'

import Sidebar from "./components/Sidebar"
import Input from "./components/Input";
import Display from './components/Display'

import './style/App.css'
import ModalContent from "./components/ModalContent";

import * as Constants from "./config.js"

Modal.setAppElement("#root");

class App extends React.Component {

    state = {
        text: "",
        isSidebarOpen: false,
        modalOpen: false
    };

    setSidebarOpen = isOpen =>
        this.setState({ isSidebarOpen: isOpen });

    setText = text =>
        this.setState({ text: text });

    setModalOpen = isOpen =>
        this.setState({ modalOpen: isOpen });

    savePaste = webId => {
        let parsed = parse(webId);
        let loc = name => `${parsed.scheme}://${parsed.host}/public/solid-paste/${name}.txt`;

        let key = crypto.randomBytes(20).toString('hex');
        auth.fetch(loc(key), {
            method: "PUT",
            headers: { "content-type": "text/plain" },
            body: this.state.text
        })
            .then(() => fetch(`http://${Constants.HOST}:8080/paste/${key}`, { method: "PUT", body: loc(key) }))
            .then(() => this.setState({ text: "" }))
            .then(() => this.props.history.push(`/${key.slice(0, 8)}`))
    };

    load = file => {
        this.setModalOpen(false);
        this.setState({ text: "" });
        this.props.history.push(`/${file.slice(0, 8)}`);
        // window.location.reload();
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

    onBrowse = () => {
        this.setModalOpen(!this.state.modalOpen);
    };

    getMainElement = () =>
        document.querySelector('.Main');

    render() {
        return (
            <Sidebar
                isOpen={this.state.isSidebarOpen}
                setOpen={this.setSidebarOpen}
                onSave={this.savePaste}
                canSave={this.state.text.length > 0}
                onEdit={this.onEdit}
                onNew={this.onNew}
                onBrowse={this.onBrowse}
            >
                <div className="Main">
                    <Switch>
                        <Route exact={true} path="/" render={props =>
                            <Input {...props} text={this.state.text} setText={this.setText}/>}/>
                        <Route path="/:hash" render={props =>
                            <Display {...props} text={this.state.text} setText={this.setText}/>}/>
                    </Switch>

                    <Modal
                        isOpen={this.state.modalOpen}
                        onRequestClose={() => this.setModalOpen(false)}
                        contentLabel="Example Modal"
                        parentSelector={this.getMainElement}
                        className="ReactModalContent"
                        overlayClassName="ReactModalOverlay"
                    >
                        <ModalContent load={file => this.load(file)}/>
                    </Modal>
                </div>
            </Sidebar>
        );
    }
}

export default withRouter(App);
