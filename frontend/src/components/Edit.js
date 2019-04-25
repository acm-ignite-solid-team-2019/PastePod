import React from 'react'

class Edit extends React.Component {
    render() {
        return (
            <button className="Edit-Button" onClick={this.props.onEdit}>Edit</button>
        );
    }
}

export default Edit;