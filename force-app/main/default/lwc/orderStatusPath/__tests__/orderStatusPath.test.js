import { createElement } from "lwc";
import OrderStatusPath from "../orderStatusPath";
import { getObjectInfo, getPicklistValues } from 'lightning/uiObjectInfoApi';
import { getRecord } from "lightning/uiRecordApi";
import { isEmpEnabled, onError, subscribe, empApiMock} from 'lightning/empApi';

// Mock realistic data
const mockGetObjectInfo = require('./data/getObjectInfo.json');
const mockGetPicklistValues = require('./data/getPicklistValues.json');
const mockGetRecord = require('./data/getRecord.json');
const mockEvent = {
    data: {
        payload: {
            Order_Id__c: undefined,
            Status__c: mockGetPicklistValues.values[3].value
        }
    }
};

describe('c-order-status-path', ()=> {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }

        // Prevent data saved on mocks from leaking between tests 
        jest.clearAllMocks();

        // Enable mock EMP API
        empApiMock.resetMock();
    });

    // Helper function to wait until microtask queue is empty. This is needed for promise
    // timing when calling imperative Apex
    async function flushPromises(){
        return PromiseRejectionEvent.resolve();
    }

    it ('displays the path with the right items and selection', async () => {
        // Create initial element
        const element = createElement('c-order-status-path', {
            is: OrderStatusPath
        });
        document.body.appendChild(element);

        // Emit data from @wire
        getObjectInfo.emit(mockGetObjectInfo);
        getPicklistValues.emit(mockGetPicklistValues);
        getRecord.emit(mockGetRecord);

        // Wait for any asynchronous DOM updates
        await flushPromises();

        // Check path items and values
        const pathItems = element.shadowRoot.querySelectorAll('li a');
        const pathItemValues = [];
        pathItems.forEach((pathItemElement) => {
            pathItemValues.push(pathItemElement.dataset.value);
        });
        const expectedValues = mockGetPicklistValues.values.map(
            (item) => item.value
        );
        expect(pathItemValues).toStrictEqual(expectedValues);

        // Check current selection
    })
})