import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/header';
import Bird from './components/bird';
import Footer from './components/footer';
import Loadable from 'react-loadable';
import { BrowserRouter as Router, Route , Switch } from "react-router-dom";
import {connect} from 'react-redux';
import {checkAuth, logout} from './actions'
import {bindActionCreators} from 'redux';

const Loading = () => <img width="150" height="150" alt="Loading" className="loading" src="../img/loading.svg"/>;

const Home = Loadable({
  loader: () => import('./components/home'),
  loading: Loading,
});

const FormSignup = Loadable({
  loader: () => import('./components/formSignup'),
  loading: Loading,
});

const FormLogin = Loadable({
  loader: () => import('./components/formLogin'),
  loading: Loading,
});

const Code = Loadable({
  loader: () => import('./components/code'),
  loading: Loading  
})

const NoMatch = ({location}) =>{
  return (
    <h3 className="container">
        Cannot GET {location.pathname}
    </h3>
  );
}

class App extends React.Component{
  constructor(props){
    super(props);
    this.props.checkAuth();
  }
  render(){
    return(
        <Router>
          <Header />
          <Bird />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={FormLogin}/>
            <Route path="/signup" component={FormSignup}/>
            <Route path="/code" component={Code}/>
            <Route component = {NoMatch} />
          </Switch>
          <Route path="/logout" render = { () => {
            this.props.logout();
            window.location.href = "/";
          }} />
          <Footer />
        </Router>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return bindActionCreators({checkAuth, logout},dispatch);
}

export default connect (null,mapDispatchToProps)(App);
