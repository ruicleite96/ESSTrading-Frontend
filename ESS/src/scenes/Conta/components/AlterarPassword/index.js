import React, { Component } from 'react';
import { Row, Col, Alert, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, Input } from 'reactstrap';

import { auth } from '../../../../firebase';
import * as firebase from 'firebase';


class AlterarPassword extends Component {

	constructor(props) {
		super(props);
		this.state = {
			passOld: "",
			pass1: "",
			pass2: "",
			error: null,
		};
	}

	onSubmit = () => {
		let credential = firebase.auth.EmailAuthProvider.credential(auth.currentUser().email, this.state.passOld)
        auth.doReauthenticateWithCredential(credential)
            .then(() => {
				auth.doPasswordUpdate(this.state.pass1);
				this.props.toggle();
            })
            .catch(error => {
                this.setState({
                    'error': error
                })
            })
	}

	render() {
		const {
			pass1,
			pass2,
			passOld,
		} = this.state;

		const isInvalid =
			pass1 !== pass2 ||
			pass1.length < 6 ||
			pass1 === '' ||
			passOld === '';

		return (
			<Modal isOpen={this.props.modal} toggle={this.props.toggle}>
				<ModalHeader toggle={this.props.toggle}>Alterar password</ModalHeader>
				<ModalBody className="center-block">
					<Row className="ml-4 mr-4">

						<Col>
							<Form className="form-sign">
								<div className="form-label-group">
									<Input value={passOld} placeholder="Password antiga" type="password" className="form-control" id="inputPassOld"
										onChange={event => this.setState({
											'passOld': event.target.value
										})}
									/>
									<label htmlFor="inputPassOld">Password antiga</label>
								</div>

								<div className="form-label-group">
									<Input value={pass1} placeholder="Password" type="password" className="form-control" id="inputPass1"
										onChange={event => this.setState({
											'pass1': event.target.value
										})}
									/>
									<label htmlFor="inputPass1">Password</label>
								</div>

								<div className="form-label-group">
									<Input value={pass2} placeholder="Confirmar password" type="password" className="form-control" id="inputPass2"
										onChange={event => this.setState({
											'pass2': event.target.value
										})}
									/>
									<label htmlFor="inputPass2">Confirmar password</label>
								</div>
							</Form>
							<small>A password deverá ter no mínimo 6 caracteres.</small>
							{this.state.error && <Alert color="danger" className="mt-5">{this.state.error.message}</Alert>}
						</Col>
					</Row>
				</ModalBody>
				<ModalFooter>
					<Button outline color="primary" disabled={isInvalid} onClick={this.onSubmit}>Guardar</Button>
					<Button outline color="secondary" onClick={this.props.toggle}>Cancelar</Button>
				</ModalFooter>
			</Modal>


		);
	}
}

export default AlterarPassword;