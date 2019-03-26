import React, {Component} from 'react';

import Header from './components/Header'
import Input from './components/Input'
import Display from "./components/Display";

import './style/App.css'

class App extends Component {
    state = {
        isSaved: false,
        text: null,
        lang: "java"
    };

    render() {
        let savePaste = () => {
            this.setState({
                isSaved: true
            })
        };

        let setText = text => {
            this.setState({
                text: text
            })
        };

        return (
            <div className="App">
                <Header onSave={savePaste}/>
                {this.state.isSaved
                 ? <Display text={this.state.text} lang={this.state.lang}/>
                 : <Input text={this.state.text} setText={(text) => setText(text)}/>}
            </div>
        );
    }
}

export default App;
