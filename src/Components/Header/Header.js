import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div>
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <div class="container-fluid">
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div class="navbar-nav">
                            <Link to='/home' class="nav-link active" aria-current="page">Home</Link>
                            <Link to='/events' class="nav-link active" aria-current="page">Events</Link>
                            <Link to='/blog' class="nav-link active" aria-current="page">Blog</Link>
                            <Link to='/register' class="nav-link active" aria-current="page">Register</Link>
                            <Link to='/login' class="nav-link active" aria-current="page">Login</Link>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Header;