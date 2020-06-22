import {LightningElement, track} from 'lwc';

const bitcoinPriceProvider = 'https://api.coinbase.com/v2/prices/spot?currency=EUR';

export default class BitcoinEuroPrice extends LightningElement {
    @track
    euroPrice;

    connectedCallback() {
        this.euroPrice = 5.42;
    }
}