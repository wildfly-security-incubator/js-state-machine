import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import LoginPage from './components/LoginPage'
import './App.css';

class App extends Component{
    render() {
        return (
            <Router basename={process.env.PUBLIC_URL}>
                {/* <Navbar fixed="top"/> */}
                <div className="container">
                    <Routes>
                        <Route path="/" exact element={<LoginPage/>}/>
                        <Route path="/login" element={<LoginPage/>}/>
                    </Routes>
                </div>
            </Router>
      );
    }
}


export default App;