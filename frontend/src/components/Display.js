import React from 'react';
import '../style/Display.css'

class Display extends React.Component {

    state = {
        text: null
    };

    componentDidMount() {
        const { hash } = this.props.match.params;

        fetch(`http://localhost:8080/paste/${hash}`)
            .then(res => {
                if (res.ok) return res.text();
                else return Promise.reject();
            })
            .then(uri => fetch(uri))
            .then(res => res.text())
            .then(text => this.setState({ fetched: true, text: text }))
            .catch(err => this.props.history.push('/'));
    }

    render() {
        return (
            <div className="Display">
                {this.state.text}
            </div>
        )
    }
}

export default Display;