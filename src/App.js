import React, {Component} from 'react';
import './App.scss';

import Header from './pages/Header';
import Footer from './pages/Footer';

class App extends Component {
    render() {
        return (
            <div className="App">
                <Header/>
                <div id="main">
                    <h1>Main</h1>
                    <p>The main</p>
                </div>
                <Footer/>
            </div>
        );
    }
}

export default App;
