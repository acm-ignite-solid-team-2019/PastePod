import React from 'react';

class Browse extends React.Component {
    render() {
        return <button className="Browse-Button" onClick={this.props.onBrowse}>Browse Pastes</button>
    }
}

export default Browse;