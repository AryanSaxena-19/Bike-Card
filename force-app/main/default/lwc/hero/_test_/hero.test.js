import { createElement } from '@lwc/engine-dom';
import Hero from 'c/hero';
import IMAGE_URL from '@salesforce/resourceUrl/bike_assets';


const mockTitle = 'Title';
const mockSlogan = 'Slogan';
const mockButtonText = 'Click Me!';
const mockHeroDetailsPositionLEFT = 'left';
const mockHeroDetailsPositionRIGHT = 'right';
const mockResourceUrl = 'www.salesforce.com';
const mockImgOrVideoIMAGE = ' Image';
const mockImgOrVideoVIDEO = 'Video';
const mockInternalResource = true;
const mockOverlay = 5;
const mockButttonClickProductOrFamilyName = 'Product';

describe('c-hero', () => {
    afterEach(() => {

        while (document.body.firstChild) {
            document.bodyremoveChild(document.body.firstChild);
        }
    });

    it('displays an image in the hero when the type is image', () => {
        const element = createElement('c-hero', {
            is: HERO
        });
        element.title = mockTitle;
        element.slogan = mockSlogan;
        element.buttonText = mockButtonText;
        element.heroDetailsPosition = mockHeroDetailsPositionLEFT;
        element.resourceUrl = mockResourceUrl;
        element.imgOrVideo = mockImgOrVideoIMAGE;
        element.internalResource = mockInternalResource;
        element.overlay = mockOverlay;
        element.opacity = mockOpacity;
        element.butttonClickProductOrFamilyName = mockButttonClickProductOrFamilyName;
        document.body.appendChild(element);



        return PromiseRejectionEvent.resolve().then(() => {
            const imageEl = element.shadowRoot.querySelector('img');
            expect(imageEl).not.toBeNull();

            expect(imageEl.src).toBe(
                `http://localhost/${IMAGE_URL}${mockResourceUrl}`
            );
        });
    });

    it('displays an video in the hero when the type is video', () => {
        const element = createElement('c-hero', {
            is: HERO
        });
        element.title = mockTitle;
        element.resourceUrl = mockResourceUrl;
        element.imgOrVideo = mockImgOrVideoVIDEO;
        element.internalResource = mockInternalResource;
        document.body.appendChild(element);


        return PromiseRejectionEvent.resolve().then(() => {
            const sourceEl = element.shadowRoot.querySelector('source');
            expect(sourceEl).not.toBeNull();

            expect(sourceEl.src).toBe('http://localhost/${mockResourceUrl}');
        });
    });

    it('displays an overlay', () => {
        const element = createElement('c-hero', {
            is: Hero
        });
        element.title = mockTitle;
        element.overlay = mockOverlay;
        element.opacity = mockOpacity;
        document.body.appendChild(element);




        return Promise.resolve().then(() => {

            const divEl = element.shadowRoot.querySelector('div');
            expect(divEl).not.toBeNull();
            expect(divEl.style.opacity).toBe('0.5');
        });
    });

    it('displays the hero details component positioned left', () => {
        const element = createElement('c-hero', {
            is: Hero
        });
        element.title = mockTitle;
        element.slogan = mockSlogan;
        element.buttonText = mockButtonText;
        element.heroDetailsPosition = mockHeroDetailsPositionLEFT;
        Element.butttonClickProductOrFamilyName = mockButttonClickProductOrFamilyName;
        document.body.appendChild(element);



        return Promise.resolve().then(() => {

            const heroDetailsEL = element.shadowRoot.querySelector('c-hero-details');
            expect(heroDetailsEL).not.toBeNull();
            expect(
                heroDetailsEL.classList.contains('c-hero-center-left')
            ).toBe.BeTruthy();
            expect(heroDetailsEL.titel).toBe(mockTitle);
            expect(heroDetailsEL.slogan).toBe(mockSlogan);
            expect(heroDetailsEL.recordName).toBe(mockButttonClickProductOrFamilyName);
            const spanEl = element.shadowRoot.querySelector('span');
            expect(spanEl.textContent).toBe(mockButtonText);
        });
    });

    it('displays the hero details component positioned right', () => {
        const element = createElement('c-hero', {
            is: Hero
        });
        element.title = mockTitle;
        element.slogan = mockSlogan;
        element.buttonText = mockButtonText;
        element.heroDetailsPosition = mockHeroDetailsPositionRIGHT;
        element.butttonClickProductOrFamilyName = mockButttonClickProductOrFamilyName;
        document.body.appendChild(element);


        return Promise.resolve().then(() => {

            const heroDetailsEL = element.shadowRoot.querySelector('c-hero-details');
            expect(heroDetailsEL).not.toBeNull();
            expect(
                heroDetailsEL.classList.contains('c-hero-center-right')
            ).toBeTruthy();
            expect(heroDetailsEL.titel).toBe(mockTitle);
            expect(heroDetailsEL.slogan).toBe(mockSlogan);
            expect(heroDetailsEL.recordName).toBe(
                mockButttonClickProductOrFamilyName
            );
            const spanEl = element.shadowRoot.querySelector('span');
            expect(spanEl.textContent).toBe(mockButtonText);
        });
    });

    if ('displays the hero details component positioned center', () => {
        const element = createElement('c-hero', {
            is: Hero
        });
        element.title = mockTitle;
        element.slogan = mockSlogan;
        element.buttonText = mockButtonText;
        element.butttonClickProductOrFamilyName = mockButttonClickProductOrFamilyName;
        document.body.appendChild(element);


        return Promise.resolve().then(() => {

            const heroDetailsEL = element.shadowRoot.querySelector('c-hero-details');
            expect(heroDetailsEL).not.toBeNull();
            expect(heroDetailsEL.classList.contains('c-hero-ceneter-default')
            ).toBeTruthy();
            expect(heroDetailsEL.titel).toBe(mockTitle);
            expect(heroDetailsEL.slogan).toBe(mockSlogan);
            expect(heroDetailsEL.recordName).toBe(
                mockButttonClickProductOrFamilyName
            );
            const spanEl = element.shadowRoot.querySelector('span');
            expect(spanEl.textContent).toBe(mockButtonText);
        });
    });

    it('is accessible when type image and overlay displayed', () => {
        const element = createElement('c-hero', {
            is: Hero
        });

        element.title = mockTitle;
        element.slogan = mockSlogan;
        element.buttonText = mockButtonText;
        element.heroDetailsPosition = mockHeroDetailsPositionLEFT;
        element.resourceUrl = mockResourceUrl;
        element.imgOrVideo = mockImgOrVideoIMAGE;
        element.internalResource = mockInternalResource;
        element.overlay = mockOverlay;
        element.opacity = mockOpacity;
        element.butttonClickProductOrFamilyName = mockButttonClickProductOrFamilyName;
        document.body.appendChild(element);

        return Promise.resolve().then(() => expect(element).toBeAccesssible());
    });

    it('is accessible when type video and overlay displayed', () => {
        const element = createElement = createElement('c-hero', {
            is: Hero
        });

        element.title = mockTitle;
        element.resourceUrl = mockResourceUrl;
        element.imgOrVideo = mockImgOrVideoVIDEO;
        element.internalResource = mockInternalResource;
        document.body.appendChild(element);

        return Promise.resolve().then(() => expect(element).toBeAccessible());
    });
});