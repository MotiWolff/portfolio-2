export const encryptData = (data) => {
    try {
        const jsonString = JSON.stringify(data);
        return btoa(encodeURIComponent(jsonString));
    } catch (e) {
        console.error('Encryption error:', e);
        return null;
    }
};

export const decryptData = (encrypted) => {
    try {
        const decoded = decodeURIComponent(atob(encrypted));
        return JSON.parse(decoded);
    } catch (e) {
        console.error('Decryption error:', e);
        return null;
    }
};

export const debounce = (func, wait = 100) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

export const RateLimit = {
    attempts: {},
    
    check(key, maxAttempts = 3, timeWindow = 60000) {
        const now = Date.now();
        const attempts = this.attempts[key] || [];
        
        // Remove old attempts
        const validAttempts = attempts.filter(time => now - time < timeWindow);
        
        if (validAttempts.length >= maxAttempts) {
            return false;
        }
        
        validAttempts.push(now);
        this.attempts[key] = validAttempts;
        return true;
    }
};