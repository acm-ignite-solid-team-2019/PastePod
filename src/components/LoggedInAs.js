import React from 'react'
import {withWebId} from "@inrupt/solid-react-components";

const LoggedInAs = withWebId(props => (
    <p>You are logged in as <b>{props.webId}</b></p>
));

export default LoggedInAs;