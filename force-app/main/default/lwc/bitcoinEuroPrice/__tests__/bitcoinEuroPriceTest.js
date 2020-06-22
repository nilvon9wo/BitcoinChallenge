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
        fetch = global.fetch = mockFetch(createMockApiResponse(testAmount));

        // Act
        priceUnderTest.refreshRateInSeconds = 10;
        document.body.appendChild(priceUnderTest);

        // Assert
        await flushPromises();

        expect(global.fetch).toHaveBeenCalledTimes(1);
        expect(global.fetch).toHaveBeenCalledWith('https://api.coinbase.com/v2/prices/spot?currency=EUR');
        assertPrice(testAmount);

        jest.advanceTimersByTime(30000);
        expect(global.fetch).toHaveBeenCalledTimes(4);
    });
});

function createMockApiResponse(testAmount) {
    return {
        data: {
            base: 'BTC',
            currency: 'EUR',
            amount: testAmount
        }
    };
}

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

function assertPrice(expectedPrice) {
    const displayPrice = priceUnderTest.shadowRoot.querySelector('lightning-formatted-number');
    expect(displayPrice.value).toEqual(expectedPrice);
}