// js/analytics.js
import { config } from './config.js';

export class Analytics {
    constructor() {
        this.gaId = config.gaId;
        if (this.shouldLoadAnalytics()) {
            this.loadGoogleTag();
            this.initializeGTM();
        }
    }

    shouldLoadAnalytics() {
        return localStorage.getItem('cookiesAccepted') === 'true';
    }

    loadGoogleTag() {
        //יצירת תג סקריפט דינמי
        const script = document.createElement('script');
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${this.gaId}`;
        document.head.appendChild(script);
    }

    initializeGTM() {
        window.dataLayer = window.dataLayer || [];
        window.gtag = function() {
            window.dataLayer.push(arguments);
        };
        
        window.gtag('js', new Date());
        window.gtag('config', this.gaId, {
            'anonymize_ip': true,  // הגנה על פרטיות
            'cookie_flags': 'SameSite=Strict;Secure',  // אבטחת עוגיות
        });
    }
}

export const initAnalytics = () => {
    if (localStorage.getItem('cookiesAccepted') === 'true') {
        return new Analytics();
    }
    return null;
};