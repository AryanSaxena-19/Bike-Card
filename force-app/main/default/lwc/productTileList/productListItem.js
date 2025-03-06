import { LightningElement, api, wire } from "lwc";

// Lightning Message Service and Message channels
import {publish, subscribe, MessageContext } from 'lightning/messageService';
import PRODUCTS_FILTERED_MESSAGE from '@salesforce/messageChannel/ProductsFiltered__c';
import Product__SELECTED_MESSAGE from '@salesforce/messageChannel/ProductSelected__c';

//  getProducts() method in ProductController Apex class
import getProducts from '@salesforce/apex/ProductController.getProducts';

/**
 * Container component that loads and displays a list of Product__c records.
 */
export default class ProductTileList extends LightningElement {
    /**
     * Whether to display the search bar.
     */
    @api searchBarIsVisible = false;

    /**
     * Whether the product tiles are draggable
     */
    @api tilesAreDraggable = false;

    /** Current page in the product list. */
    pageNumber = 1;

    /** The number of items on a page. */
    pageSize;

    /** Load context for Lightning Messaging Service */
    @wire(MessageContext) MessageContext;

    /** Subscription for ProductsFiltered Lightning message */
    productFilterSubscription;

    /** Subscription for ProductsFiltered Lightning message */
    productFilterSubscription;

    /**
     * Load the list of available products.
     */
    @wire(getProducts, { filters: '$filters', pageNumber: '$pageNumber' })
    products;

    connectedCallback() {
        // Subscribe to ProductsFiltered message
        this.productFilterSubscription = subscribe(
            this.MessageContext,
            PRODUCTS_FILTERED_MESSAGE,
        (message) => this.handleFilterChange(message)
        );
    }

    handleProductSelected(event) {
        // Published ProductSelected message
        publish(this.MessageContext, Product__SELECTED_MESSAGE, {
            productId: event.detail
        });
    }

    handleSearchKeyChange(event) {
        this.filters = {
            searchKey: event.target.value.toLowerCase()
        };
        this.pageNumber = 1;
    }

    handleFilterChange(message) {
        this.filters = { ...message.filters };
        this.pageNumber = 1;
    }

    handlePreviousPage() {
        this.pageNumber = this.pageNumber - 1;
    }

    handleNextPage() {
        this.pageNumber = this.pageNumber + 1;
    }
}