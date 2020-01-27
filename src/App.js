import React, { Component } from 'react'
import axios from 'axios';
import './App.css';

import { connect } from 'react-redux';
import { auth } from './redux/actions';

import Header from './components/Header';
import Footer from './components/Footer';
import PageRoutes from './components/PageRoutes';

class App extends Component {
    auth = (user) => {
        this.props.auth(user);
    }

    constructor(props) {
        super(props)
        this.state = {
            user: null,
        }
    }
    componentDidMount() {
        axios.get('/user').then(response => {
            if (response.data.user !== null && response.data.user !== this.props.user) {
                this.auth(response.data.user)
            } else {
                this.auth(null)
            }
        })
    }
    handleLogout = () => {
        window.location = '/'
        axios.post('/logout').then(response => {
            this.auth(null)
        }).catch(error => {
            window.location = '/login'
        })
    }
    render() {
        return (
            <div className="App">
                <Header onLogout={this.handleLogout} />
                <PageRoutes />
                <Footer />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user
    };
};

const mapDispatchToProps = {
    auth
};

export default connect(mapStateToProps, mapDispatchToProps)(App)