import React from 'react';
import Highlight from "react-highlight";

import * as Constants from "../config.js"

import '../style/Display.css'

class Display extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { hash } = this.props.match.params;

        if (hash.length < 8) { // reject short-hashes which are more likely to collide
          this.props.history.push('/');
        } else {
            fetch(`http://${Constants.HOST}:8080/paste/${hash}`)
                .then(res => {
                    if (res.ok) return res.text();
                    else return Promise.reject();
                })
                .then(uri => fetch(uri))
                .then(res => res.text())
                .then(text => this.props.setText(text))
                .catch(() => this.props.history.push('/'));
        }
    }

    render() {
        return (
            <div className="Display">
                <Highlight>
                    {this.props.text}
                </Highlight>
            </div>
        )
    }
}

export default Display;