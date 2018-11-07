import React, {Component} from 'react';
import './App.scss';
import {Route, Switch} from "react-router-dom";

import Header from './pages/Header';
import Footer from './pages/Footer';
import Main from './pages/Main';
import Detail from './pages/Detail';
import Bookmark from "./pages/Bookmark";
import Search from './pages/Search';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSearchInput: false
        };
        this.handleSearchClick = this.handleSearchClick.bind(this);
    }

    handleSearchClick(e) {
        e.preventDefault();
        this.setState({
            showSearchInput: !this.state.showSearchInput
        });
    }
    render() {
        return (
            <div className="App">
                <Header handleSearchClick={this.handleSearchClick}/>
                <Switch>
                    <Route exact path="/" render={(props) => <Main {...props} showSearchInput={this.state.showSearchInput} />} />
                    <Route exact path="/bookmark" render={(props) => <Bookmark {...props} showSearchInput={this.state.showSearchInput} />} />
                    <Route exact path="/search/:text" render={(props) => <Search {...props} showSearchInput={this.state.showSearchInput} /> } />
                    <Route exact path="/:resource" render={(props) => <Main {...props} showSearchInput={this.state.showSearchInput} />} />
                    <Route exact path="/:resource/:id" render={(props) => <Detail {...props} showSearchInput={this.state.showSearchInput} /> } />
                </Switch>
                <Footer/>
            </div>
        );
    }
}

export default App;
