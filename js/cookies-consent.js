export class CookiesConsent {
    constructor() {
        this.init();
    }

    init() {
        if (!localStorage.getItem('cookiesAccepted') && !localStorage.getItem('cookiesRejected')) {
            this.showConsentBanner();
        }
    }

    showConsentBanner() {
        const banner = document.createElement('div');
        banner.className = 'cookies-banner';
        banner.innerHTML = `
            <p>This website uses cookies to improve your experience. 
               <button class="accept-cookies">Accept</button>
               <button class="reject-cookies">Reject</button>
            </p>
        `;

        document.body.appendChild(banner);

        banner.querySelector('.accept-cookies').addEventListener('click', () => {
            localStorage.setItem('cookiesAccepted', 'true');
            import('./analytics.js').then(module => {
                module.initAnalytics();
            });
            banner.remove();
        });

        banner.querySelector('.reject-cookies').addEventListener('click', () => {
            localStorage.setItem('cookiesRejected', 'true');
            banner.remove();
        });
    }
}