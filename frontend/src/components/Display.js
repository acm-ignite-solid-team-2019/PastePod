import React from 'react';
import Highlight from "react-highlight";

import '../style/Display.css'

class Display extends React.Component {

    state = {
        text: null
    };

    componentDidMount() {
        const { hash } = this.props.match.params;

        if (hash.length < 8) { // reject short-hashes which are more likely to collide
          this.props.history.push('/');
        } else {
            fetch(`http://localhost:8080/paste/${hash}`)
                .then(res => {
                    if (res.ok) return res.text();
                    else return Promise.reject();
                })
                .then(uri => fetch(uri))
                .then(res => res.text())
                .then(text => this.setState({ fetched: true, text: text }))
                .catch(() => this.props.history.push('/'));
        }
    }

    render() {
        return (
            <div className="Display">
                <Highlight>
                    {this.state.text}
                </Highlight>
            </div>
        )
    }
}

export default Display;