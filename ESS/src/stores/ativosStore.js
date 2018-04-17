import { observable, action } from 'mobx';

class AtivosStore {
    @observable dataLoad = false;
    @observable quotes = new Map();
    @observable logos = new Map();
    
    constructor(rootStore) {
        this.rootStore = rootStore;
    }

    @action setDataLoad = (value) => {
        this.dataLoad = value;
    }

    @action setQuotes = quotes => {
        for (let quote in quotes) {
            this.quotes.set(quote.symbol, quote);
        }
    }

    @action setLogo = (symbol, logo) => {
        this.logos.set(symbol, logo);
    }

    @action setQuote = quote => {
        this.quotes.set(quote.symbol, quote);
    }
}

export default AtivosStore;