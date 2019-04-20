import React from 'react';

class Header extends React.Component{
    render(){
        return(
            <nav className="navbar navbar-dark bg-primary justify-content-between">
                <a className="navbar-brand" href="#!"><i className="fa fa-bolt"></i></a>
                <form className="form-inline">
                    <input className="form-control mr-sm-2" type="search" placeholder="Search Products" aria-label="Search" />
                    <button className="btn btn-light my-2 my-sm-0" type="submit"><i className="fa fa-search"></i> Search</button>
                </form>
            </nav>
        );
    }
}

export default Header;