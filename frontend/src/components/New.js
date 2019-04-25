import React from 'react'

class New extends React.Component {
    render() {
        return (
            <button className="New-Button" onClick={this.props.onNew}>New Paste</button>
        );
    }
}

export default New;