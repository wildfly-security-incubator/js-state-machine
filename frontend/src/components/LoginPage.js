import React, { Component } from 'react';
import axios from 'axios';

export default class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            defaultInput: '',
            nextElements: '',
            defaultLabel: '',
            defaultType: '',
            ENDPOINT: "http://localhost:8080/js-state-machine-api/rest"
        };
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
    }

    componentDidMount() {
        let ENDPOINT = this.state.ENDPOINT;
        axios.get(ENDPOINT + "/default/").then(response => {
            console.log(response.data)
            this.setState({
                defaultLabel: response.data.name,
                defaultType: response.data.type
            })
        }).catch(error => {
            alert("Config file is not configured correctly");
        });
    }

    onContinue = (e) => {
        e.preventDefault();
        const defaultInput = this.state.defaultInput;
        this.setState({defaultInput: defaultInput,
            nextStage: true
        });
        let ENDPOINT = this.state.ENDPOINT;
        axios.get(ENDPOINT + "/username/" + defaultInput).then(response => {
            let fields = (response.data).sort((a, b) => a.order - b.order)
            let nextFields = [];
            fields.forEach(element => {
                nextFields.push(
                    <>
                        <label htmlFor={element.name}>{element.name}: </label>
                        <input id={element.name} type={element.type} required/>
                        <br/>
                    </>
                )
            });
            nextFields.push(<button onClick={this.onRestart}>Restart</button>)
            nextFields.push(<button type="submit">Submit</button>)  
            this.setState({
                nextElements: nextFields
            })
        }).catch(error => {
            if(error.response.status === 400) {
                this.setState({
                    mode: "invalid",
                    password_elements: <div>
                        <label htmlFor="password">Password: </label>
                        <input id="password" type="password" required/>
                        <br/>
                        <button onClick={this.onRestart}>Restart</button>
                        <button type="submit">Submit</button>
                    </div>
                })

            }
        });
    }

    onRestart = (e) => {
        e.preventDefault();
        this.setState({
            nextElements: '',
            nextStage: false,
            defaultInput: ''
        });
    }

    onSubmit = (e) => {
        e.preventDefault();
        alert("Not Configured Yet")
    }

    handleUsernameChange(event) {
        this.setState({defaultInput: event.target.value});
      }

    render() {
        return (
          <div className="App">
                <h1>WildFly Admin Console Login</h1>
                <form onSubmit={this.onSubmit}>
                    <label htmlFor="username">{this.state.defaultLabel}: </label>
                    <input id="username" type={this.state.defaultType} placeholder={this.state.defaultLabel} value={this.state.defaultInput} onChange={this.handleUsernameChange} disabled={this.state.nextStage} required/>
                    <br/>
                    <button id="continue" type="submit" onClick={this.onContinue} hidden={this.state.nextStage}>Continue</button>
                    {this.state.nextElements}
                </form>
            </div>
          );
    
    }
}