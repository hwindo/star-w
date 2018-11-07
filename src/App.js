import React, {Component} from 'react';
import './App.scss';
import {Route, Switch} from "react-router-dom";

import Header from './pages/Header';
import Footer from './pages/Footer';
import Main from './pages/Main';
import Detail from './pages/Detail';
import Bookmark from "./pages/Bookmark";

class App extends Component {
    render() {
        return (
            <div className="App">
                <Header/>
                <Switch>
                    <Route exact path="/" component={Main} />
                    <Route exact path="/bookmark" component={Bookmark} />
                    <Route exact path="/:resource" component={Main} />
                    <Route exact path="/:resource/:id" component={Detail} />
                </Switch>
                <Footer/>
            </div>
        );
    }
}

export default App;
