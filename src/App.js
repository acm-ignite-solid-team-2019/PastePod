import React from 'react';
import Header from './components/Header'
import Input from './components/Input'
import Display from './components/Display';

import './style/App.css'

const auth = require('solid-auth-client')
class Home extends React.Component {
   render() {
      return (
         <div>
            <h1>Home...</h1>
         </div>
      )
   }
}
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
    loadPaste = () => {
        const loc =  document.getElementById("loadBox").value;
        let textValue = ""
        let self = this
        auth.fetch(loc).then(response => response.text()).then(text=>{
          console.log(text);
          self.setText(text);
          self.savePaste();

        })


    }

    setText = text => {
        this.setState({
            text: text
        })
    };

    render() {
        return (
            <div className="App">
                <Header onSave={this.savePaste} onLoad={this.loadPaste}/>

                {this.state.isSaved
                 ? <Display id = "test1" text={this.state.text} lang={this.state.lang}/>
                 : <Input text={this.state.text} setText={this.setText}/>}
            </div>

        );
    }
}

export default App;
