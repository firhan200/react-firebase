import React from 'react';
import { Link } from 'react-router-dom';

class Header extends React.Component{
    render(){
        return(
            <nav className="navbar navbar-dark bg-primary justify-content-between">
                <Link className="navbar-brand" to="/"><i className="fa fa-bolt"></i></Link>
                <form className="form-inline">
                    <input className="form-control mr-sm-2" type="search" placeholder="Search Products" aria-label="Search" />
                    <button className="btn btn-light my-2 my-sm-0" type="submit"><i className="fa fa-search"></i> Search</button>
                </form>
            </nav>
        );
    }
}

export default Header;