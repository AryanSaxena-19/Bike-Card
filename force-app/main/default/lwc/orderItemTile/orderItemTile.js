import { LightningElement, api } from 'lwc';

export default class OrderItemTile extends LightningElement {
    /** Order_Item__c SObject to display */
    @api orderItem;

    /** Whether the component has unsaved changes */
    isModified = false;

    /** Mutated/unsaved Order_Item__c values */
    form = {};

    /** Handles form input */
    handleFormChange(evt) {
        this.isModified = true;
        const field = evt.target.dataset.fieldName;
        let value = parseInt(evt.detail.value.trim(), 10);
        if (!Number.isInteger(value)) {
            value = 0;
        }
        this.form[field] = value;
    }

    /** Fires event to update the Order_Item__c SObject */

    saveOrderItem() {
        const event = new CustomEvent('orderitemchange', {
            detail: Object.assign({}, { Id: this.orderItem.Id }, this.form)
        });
        this.dispatchEvent(event);
        this.isModified = false;
    }

    /** Fires event to delte the Order_Item__c SObject */
    deleteOrderItem() {
        const event = new CustomEvent('orderitemdlete', {
            detail: { id: this.orderItem.Id }
        });
        this.dispatchEvent(event);
    }
}