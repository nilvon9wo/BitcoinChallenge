import {createElement} from 'lwc';
import BitcoinEuroPrice from 'c/bitcoinEuroPrice';

const priceUnderTest = createElement('c-bitcoinEuroPrice', {
    is: BitcoinEuroPrice
});

describe('c-bitcoinEuroPrice', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('fetches price and sets the value', async () => {
        // Arrange
        jest.useFakeTimers();
        const testAmount = '8448.947391885';
        fetch = global.fetch = mockFetch({
            'data': {
                'base': 'BTC',
                'currency': 'EUR',
                'amount': testAmount
            }
        });

        // Act
        priceUnderTest.refreshRateInSeconds = 10;
        document.body.appendChild(priceUnderTest);

        // Assert
        await flushPromises();

        expect(global.fetch).toHaveBeenCalledTimes(1);
        expect(global.fetch).toHaveBeenCalledWith('https://api.coinbase.com/v2/prices/spot?currency=EUR');

        const displayPrice = priceUnderTest.shadowRoot.querySelector('lightning-formatted-number');
        expect(displayPrice.value).toEqual(testAmount);

        jest.advanceTimersByTime(30000);
        expect(global.fetch).toHaveBeenCalledTimes(4);
    });
});

function mockFetch(mockApiResponse) {
    return jest
        .fn()
        .mockImplementation(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve(mockApiResponse),
                jsonResponse: mockApiResponse
            })
        );
}

function flushPromises() {
    return new Promise(setImmediate);
}
