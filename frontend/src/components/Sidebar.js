import React from 'react'
import ReactSidebar from 'react-sidebar'
import {LoggedIn, AuthButton, Value} from "@solid/react";

import '../style/Sidebar.css'
import Save from "./Save";
import {Route} from "react-router-dom";

class Sidebar extends React.Component {

    render() {
        let content = (
            <div className="Sidebar-Content">
                <div className="top">
                    <h2>Solid Paste</h2>
                </div>
                <div className="middle">
                    <Route exact={true} path="/" render={() => <Save onSave={this.props.onSave} canSave={this.props.canSave}/>}/>
                </div>
                <div className="bottom">
                    <LoggedIn>
                        <p>Logged in as <b><Value src="user.name"/></b></p>
                    </LoggedIn>
                    <AuthButton popup="popup.html" login="Login" logout="Logout"/>
                </div>
            </div>
        );
        return (
            <ReactSidebar
                sidebar={content}
                open={this.props.isOpen}
                onSetOpen={this.props.setOpen}
                pullRight={true}
                docked={true}
                styles={{
                    sidebar: {
                        backgroundColor: "#2b2b2b",
                        color: "#bababa",
                        padding: 5
                    }
                }}
            >
                {this.props.children}
            </ReactSidebar>
        );
    }
}

export default Sidebar;