import { LightningElement } from "lwc";
import { showToastEvent } from 'lightning/platformShowToastEvent';

import CASE_OBJECT from '@salesforce/schema/Case';
import SUBJECT from '@salesforce/schema/Case.Subject';
import DESCRIPTION from '@salesforce/schema/Case.Description';
import PRODUCT from '@salesforce/schema/Case.Product__c';
import PRIORITY from '@salesforce/schema/Case.Priority';
import CASE_CATEGORY from '@salesforce/schema/Case.Case_category__c';
import REASON from '@salesforce/schema/Case.Reason';

const TITLE_SUCESS = 'Case Created';
const MESSAGE_SUCESS = ' You have successfully created a Case';

export default class CreateCase extends LightningElement{
    caseObject = CASE_OBJECT;
    subjectField = SUBJECT;
    productField =  PRODUCT;
    descriptionField = DESCRIPTION;
    priorityField = PRIORITY;
    reasonField = REASON;
    categoryField = CASE_CATEGORY;

    handleCaseCreated(){

        const evt = new showToastEvent({
            title: TITLE_SUCESS,
            message: MESSAGE_SUCESS,
            variant: 'success'
        });
        this.dispatchEvent(evt);

        const refreshEvt = new CustomerEvent('refresh');
        this.dispatchEvent(refreshEvt);
    }


}