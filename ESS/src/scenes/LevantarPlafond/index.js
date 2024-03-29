import React, { Component } from 'react';
import { Row, Col, Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import NumericInput from 'react-numeric-input';
import { inject, observer } from 'mobx-react';
import { compose } from 'recompose';
import { BarLoader } from 'react-spinners';
import axios from 'axios';

import { formatterPrice } from '../../constants/formatters';


class LevantarPlafond extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: 0,
        };
    }

    onChange = (valueAsNumber, valueAsString, input) => {
        this.setState({
            value: valueAsNumber,
        })
    }

    onSubmit = () => {
        const data = {
            valor: this.state.value
        }
        axios
            .put('http://essbackend.blurryface.pt/api/customers/levantarPlafond', { ...data }, {
                headers: { 'Authorization': 'Bearer ' + this.props.sessionStore.token }
            })
            .then(user => {
                this.props.sessionStore.setUser(user.data);
                this.props.toggle();
            })
            .catch(error => console.error(error));
    }

    render() {
        if (!this.props.sessionStore.user.saldo) {
            return (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '40px' }}>
                    <BarLoader height={7} width={200} color="white" />
                </div>
            );
        }

        let aLevantar = this.props.sessionStore.user.saldo - this.state.value;
        let mens = undefined;
        if (aLevantar > 0) {
            mens =
                <span>
                    Ainda pode levantar <span className="text-success">{formatterPrice.format(aLevantar)}</span>
                </span>
        } else if (aLevantar <= 0) {
            mens =
                <span>
                    Poderá levantar no máximo {formatterPrice.format(this.props.sessionStore.user.saldo)}
                </span>
        }
        return (
            <Modal isOpen={this.props.modal} toggle={this.props.toggle} centered>
                <ModalHeader>Levantar plafond</ModalHeader>
                <ModalBody>
                    <Row className="text-center mb-4">
                        <Col>
                            <span>Introduza o montante que pretende levantar</span>
                        </Col>
                    </Row>
                    <Row className="mb-4">
                        <Col sm={{ size: 6, offset: 3 }}>
                            <NumericInput mobile className="form-control"
                                min={0} max={this.props.sessionStore.user.saldo} precision={2}
                                value={this.state.value}
                                onChange={this.onChange} />
                        </Col>
                    </Row>
                    <Row className="text-center">
                        <Col>
                            {mens}
                        </Col>
                    </Row>
                </ModalBody>
                <ModalFooter>
                    <Button outline color="secondary" onClick={this.props.toggle}>Cancelar</Button>
                    <Button color="primary" disabled={aLevantar < 0 ? true : false} onClick={this.onSubmit}>Levantar</Button>
                </ModalFooter>
            </Modal>
        );
    }
}

export default compose(
    inject('sessionStore'),
    observer
)(LevantarPlafond);