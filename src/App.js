import React, {Component} from 'react';
import './App.scss';
import {Route, Switch} from "react-router-dom";

import Header from './pages/Header';
import Footer from './pages/Footer';
import Main from './pages/Main';
import Detail from './pages/Detail';
import Bookmark from "./pages/Bookmark";
import Search from './pages/Search';
import AsideMenu from './components/AsideMenu';
import {scrollTop} from "./helper";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSearchInput: false,
            showAsideMenu: false
        };
        this.handleSearchClick = this.handleSearchClick.bind(this);
        this.handleBarClick = this.handleBarClick.bind(this);
        this.handleAsideMenuClick = this.handleAsideMenuClick.bind(this);
    }

    handleSearchClick(e) {
        e.preventDefault();
        this.setState({
            showSearchInput: !this.state.showSearchInput
        });
    }
    handleBarClick(e) {
        e.preventDefault();
        this.setState({
            showAsideMenu: !this.state.showAsideMenu
        }, () => {
            scrollTop(e);
        });
    }
    handleAsideMenuClick(e) {
        this.setState({
            showAsideMenu: !this.state.showAsideMenu
        });
    }
    render() {
        return (
            <div className="App">
                <Header
                    handleSearchClick={this.handleSearchClick}
                    handleBarClick={this.handleBarClick}
                    handleCancelClick={this.handleBarClick}
                />
                {this.state.showAsideMenu ? <AsideMenu handleAsideMenuClick={this.handleAsideMenuClick}/> : ''}
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
