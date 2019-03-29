import React from 'react';

import Header from './components/Header'
import Input from './components/Input'
import Display from './components/Display';

import './style/App.css'

class App extends React.Component {
    state = {
        isSaved: false,
        text: "",
        lang: "java"
    };

    savePaste = () => {
        this.setState({
            isSaved: true
        })
    };

    setText = text => {
        this.setState({
            text: text
        })
    };

    render() {
        return (
            <div className="App">
                <Header onSave={this.savePaste}/>

                {this.state.isSaved
                 ? <Display text={this.state.text} lang={this.state.lang}/>
                 : <Input text={this.state.text} setText={this.setText}/>}
            </div>
        );
    }
}

export default App;
