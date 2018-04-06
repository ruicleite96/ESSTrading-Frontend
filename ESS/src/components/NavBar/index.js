import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { auth } from '../../firebase';
import AuthUserContext from '../../contexts/AuthUserContext';
import * as routes from '../../constants/routes';

const NavBarNonAuth = () =>
	<nav className="navbar navbar-expand-lg navbar-light bg-light" style={{ backgroundColor: "rgb(93, 109, 172)" }}>
		<Link to={routes.HOME} className="navbar-brand">ESS Trading</Link>
		<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
			<span className="navbar-toggler-icon"></span>
		</button>
		<div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
			<ul className="nav navbar-nav navbar-right">
				<li>
					<input className="form-control mr-sm-2" id="search" placeholder="procurar" aria-label="Search" />
				</li>
				<li className="nav-item " style={{ margin: "0 5px" }}>
					<Link to={routes.SOBRE}>
						<button type="button" className="btn btn-light">Sobre</button>
					</Link>
				</li>
				<li className="nav-item " style={{ margin: "0 5px" }}>
					<Link to={routes.LOGIN}>
						<button type="button" className="btn btn-light">Login</button>
					</Link>
				</li>
				<li className="nav-item " style={{ margin: "0 5px" }}>
					<Link to={routes.REGISTAR}>
						<button type="button" className="btn btn-outline-success">Registar</button>
					</Link>
				</li>
			</ul>
		</div>
	</nav>

const NavBarAuth = () =>
	<nav className="navbar navbar-expand-lg navbar-light bg-light" style={{ backgroundColor: "rgb(93, 109, 172)" }}>
		<Link to={routes.WATCHLIST} className="navbar-brand">ESS Trading</Link>
		<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
			<span className="navbar-toggler-icon"></span>
		</button>
		<div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
			<ul className="nav navbar-nav navbar-right">
				<li>
					<input className="form-control mr-sm-2" id="search" placeholder="procurar" aria-label="Search" />
				</li>
				<li className="nav-item " style={{ margin: "0 5px" }}>
					<Link to={routes.SOBRE}>
						<button type="button" className="btn btn-light">Sobre</button>
					</Link>
				</li>
				<li className="nav-item">
					<button type="button" className="btn btn-outline-danger" onClick={auth.doSignOut}>
						Logout
            		</button>
				</li>
			</ul>
		</div>
	</nav>
class NavBar extends Component {

	render() {
		return (
			<AuthUserContext.Consumer>
				{authUser => authUser
					? <NavBarAuth />
					: <NavBarNonAuth />
				}
			</AuthUserContext.Consumer>
		);
	}
}


export default NavBar;
