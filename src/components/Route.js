import React from 'react';
import Header from './Header';
import {Switch, Route, HashRouter as Router} from 'react-router-dom';
import Home from '../router/Home';
import Admin from '../router/Admin';
import Lda from '../router/Lda';
import Model from '../router/Model';

export default () => {

    return (
        <Router>
            <Header />
            <Switch>
                <Route path={"/"} exact component={Home}></Route>
                <Route path={"/lda"} exact component={Lda}></Route>
                <Route path={"/model"} exact component={Model}></Route>
                <Route path={"/admin"} exact component={Admin}></Route>                
            </Switch>
        </Router>
    );
};