import React from 'react';
import { inject } from 'mobx-react';

import { iex } from '../IEXClient';


let symbols = ['AMZN', 'AAPL', 'FB', 'GOOG', 'TSLA', 'EA', 'HPQ', 'IBM', 'MSFT', 'MSI', 'NOK', 'NVDA', 'ORCL', 'SNAP', 'TRIP'];
let _timeout = undefined;

const withAtivos = (Component) => {
    class WithAtivos extends React.Component {

        componentDidMount() {
            this.getLogos();
            this.updateAtivos();
            this.props.ativosStore.setDataLoad(true);
            _timeout = setInterval(this.updateAtivos, 3000);
        }

        componentWillUnmount() {
            clearTimeout(_timeout);
        }

        updateAtivos = () => {
            symbols.forEach(symbol => {
                iex.stockQuote(symbol)
                    .then(quote => {
                        this.props.ativosStore.setQuote(quote);
                    })
                    .catch(error => {
                        console.error(error);
                    });
            });
        }

        getLogos = () => {
            symbols.forEach(symbol => {
                iex.stockLogo(symbol)
                    .then(logo => {
                        this.props.ativosStore.setLogo(symbol, logo.url);
                    })
                    .catch(error => {
                        console.error(error);
                    });
            });
        }

        render() { 
            return (<Component {...this.props} />);
        }
    }

    return inject('ativosStore')(WithAtivos);
}

export default withAtivos;