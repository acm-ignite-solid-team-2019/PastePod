import React from 'react';
import { LoggedIn, AuthButton } from '@solid/react'
import Save from './Save'
import LoggedInAs from './LoggedInAs'
import Load from "./Load"
import LoadBox from "./LoadBox"
import FileSearch from "./FileSearch"
import '../style/Header.css'
import {Route, withRouter} from "react-router-dom";

const Header = props => (
    <div className="Header">
        <div className="Left-Section">
            <div className="Solid-Paste" onClick={() => props.history.push('/')}>
                <b>Solid Paste</b>
            </div>
        </div>

        <div className="Right-Section">
            <LoggedIn>
                <LoggedInAs className="LoggedInAs"/>
                <FileSearch getFiles = {props.getFiles}/>
                <LoadBox/>
                <Load onLoad={props.onLoad}/>
                <Route exact={true} path="/" render={() => <Save onSave={props.onSave} canSave={props.canSave}/>}/>
            </LoggedIn>
            <AuthButton popup="popup.html" login="Login" logout="Logout"/>
        </div>
    </div>
);

export default withRouter(Header);
