export class ErrorBoundary {
    constructor(fallbackElement) {
        this.fallbackElement = fallbackElement;
        this.errorState = false;
    }

    static wrap(element, fallback) {
        const boundary = new ErrorBoundary(fallback);
        try {
            return element;
        } catch (error) {
            console.error('Error caught by boundary:', error);
            return boundary.fallbackElement;
        }
    }
} 