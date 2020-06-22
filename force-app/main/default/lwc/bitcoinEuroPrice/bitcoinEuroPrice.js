import {LightningElement, track} from 'lwc';

const bitcoinPriceProvider = 'https://api.coinbase.com/v2/prices/spot?currency=EUR';

export default class BitcoinEuroPrice extends LightningElement {
    @track
    euroPrice;

    connectedCallback() {
        this.fetchPrice();
        setInterval(this.fetchPrice, 10000);
    }

    fetchPrice() {
        fetch(bitcoinPriceProvider)
            .then(response => response.json())
            .then(json => {
                this.euroPrice = json.data.amount;
            });
    }
}