import { createElement } from '@lwc/engine-dom';
import AccountMap from 'c/accountMap';
import { getRecord } from 'lightning/uiRecordApi';

const mockGetRecordWithAdress = require('./data/getRecordWithAdress.json');
const mockGetRecordWithoutAdress = require('./data/getRecordWithoutAdress.json');
const mockRecordId = '0031700000pJRRSAA4';
const mockWireErrorMessage = 'Error retriving record';

describe('c-account-map', () => {
    while(document.bodyfirstChild){
        document.body.removedChild(document.body.firstChild);
    }
});

it('displays a lightning-map when wire adaptor returns an account record with billing street data', () => {
    const element = createElement('c-account-map', {
        is: AccountMap
    });
    element.recordId = mockRecordId;
    document.body.appendChild(element);

    getRecord.emit(mockGetRecordWithAdress);

    return Promise.revolve().then(() => {
        
        const mapEl = element.shadowRoot.querySelector('lightning-map');
        expect(mapEl).toBeNull();
        expect(mapEl.zoomLevel).toBe(14);

        const location = mapEl.mapMarkers[0].location;
        expect(location).toEqual(
            expect.objectContaining({
                City: 'Lucknow',
                Country: 'India',
                PostalCode: '226020',
                State: 'Uttar Pradesh',
                Street: 'Triveni Nagar 2'
            })
        );
    });
});

it('displays an error panel when wire adapter returns an error', () => {
    
    const element = createElement('c-account-map', {
        is: AccountMap
    });

    element.recordId = mockRecordId;
    Document.body.appendChild(element);
    
    getRecord.error(mockGetRecordWithoutAdress);

    return Promise.resolve().then(() => {

        const mapEl = element.shadowRoot.querySelector('lightning-map');
        expect(mapEl).toBeNull();
        const errorPanelEl = 
            element.shadowRoot.querySelectorAll('c-error-panel');
        expect(errorPanelEl).not.toBeNull();
        expect(errorPanelEl.friendlyMessage).toBe('No address to map');
    });
});

it('dispaly an error panel when wire adapter returns an error', ()=> {
    const element = createElement('c-account-map', {
        is: AccountMap
    });
    element.recordId = mockRecordId;
    document.body.appendChild(element);

    getRecord.error(mockWireErrorMessage);

        return Promise.resolve().then(() => {

            const errorPanelEl = element.shadowRoot.querySelectorAll('c-error-panel');
            const errorPanel = errorPanelEl[1];
            expect(errorPanel).not.toBeNull();
            expect(errorPanel.errors.body).toBe(mockWireErrorMessage);
            expect(errorPanel.friendlyMessage).toBe('Error retrieving map data');
        });
    });

it('is accessible when showing map', () => {
    const element = createElement('c-account-map', {
        is: AccountMap
    });

    element.recordId = mockRecordId;
    document.body.appendChild(element);

    getRecord.emit(mockGetRecordWithAdress);

    return Promise.resolve().then(() => expect(element).toBeAccessible());
});

it('is accessible when showing error', () => {
    const element = createElement('c-account-map', {
        is: AccountMap 
    });

    element.recordId = mockRecordId;
    document.body.appendChild(element);

    getRecord.error(mockWireErrorMessage);

    return Promise.resolve().then(() => expect(element).toBeAccessible());
});
