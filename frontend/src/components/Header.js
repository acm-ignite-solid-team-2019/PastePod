import React from 'react';
import { LoggedIn, AuthButton } from '@solid/react'
import Save from './Save'
import LoggedInAs from './LoggedInAs'
<<<<<<< HEAD
import Load from "./Load"
import LoadBox from "./LoadBox"
import FileSearch from "./FileSearch"
=======
>>>>>>> 2fa03e32310a9b7b5fc0c6c9c73db419ccbe199b

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
<<<<<<< HEAD
                <FileSearch getFiles = {props.getFiles}/>
                <LoadBox/>
                <Load onLoad={props.onLoad}/>
                <Save onSave={props.onSave}/>
                <Logout />
=======
                <Route exact={true} path="/" render={() => <Save onSave={props.onSave} canSave={props.canSave}/>}/>
>>>>>>> 2fa03e32310a9b7b5fc0c6c9c73db419ccbe199b
            </LoggedIn>
            <AuthButton popup="popup.html" login="Login" logout="Logout"/>
        </div>
    </div>
);

export default withRouter(Header);
