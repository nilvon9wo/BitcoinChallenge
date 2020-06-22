import {LightningElement, api, track} from 'lwc';

const bitcoinPriceProvider = 'https://api.coinbase.com/v2/prices/spot?currency=EUR';
export default class BitcoinEuroPrice extends LightningElement {
    @api
    refreshRateInSeconds;

    @track
    euroPrice;

    connectedCallback() {
        this.fetchPrice();
        setInterval(this.fetchPrice, this.refreshRateInSeconds * 1000);
    }

    fetchPrice() {
        fetch(bitcoinPriceProvider)
            .then(response => response.json())
            .then(json => {
                this.euroPrice = json.data.amount;
            });
    }
}