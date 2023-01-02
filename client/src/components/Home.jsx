import React from 'react';
import { Link } from 'react-router-dom';

//Redux
import { selectSessionToken } from '../features/auth/authSlice';
import { useSelector } from 'react-redux';

import '../App.css'

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };
    }

    render () {
        return (
            <div className="page">
               <h1>Home Page</h1>
           </div>
        );
    }
};

export default Home