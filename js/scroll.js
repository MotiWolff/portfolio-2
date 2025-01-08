// scroll.js
import { selectors } from './config.js';
import { debounce } from './utils.js';

class ScrollManager {
  constructor() {
    this.sections = document.querySelectorAll(selectors.sections);
    this.navLinks = document.querySelectorAll(selectors.navLinks);
    this.scrollProgress = document.querySelector('.scroll-progress');
    
    this.observerOptions = {
      rootMargin: '-20% 0px',
      threshold: 0.3
    };

    this.init();
  }

  init() {
    // אתחול צופה בחלקים
    this.initSectionObserver();
    
    // הגדרת אירוע גלילה עם debounce למניעת עומס
    window.addEventListener('scroll', 
      debounce(() => this.handleScroll(), 10)
    );
  }

  initSectionObserver() {
    const observer = new IntersectionObserver(
      (entries) => this.handleIntersection(entries),
      this.observerOptions
    );

    this.sections.forEach(section => {
      observer.observe(section);
    });
  }

  handleIntersection(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        this.updateActiveNavLink(id);
      }
    });
  }

  updateActiveNavLink(sectionId) {
    this.navLinks.forEach(link => {
      const href = link.getAttribute('href').substring(1); // הסרת ה-#
      link.classList.toggle('active', href === sectionId);
    });
  }

  handleScroll() {
    if (this.scrollProgress) {
      const scrollPercent = this.calculateScrollPercent();
      this.updateScrollProgress(scrollPercent);
    }
  }

  calculateScrollPercent() {
    const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = window.scrollY;
    return (scrolled / windowHeight) * 100;
  }

  updateScrollProgress(percent) {
    // הגבלה ל-70% כפי שהיה בקוד המקורי
    const limitedPosition = Math.min(Math.max(percent, 0), 70);
    this.scrollProgress.style.top = `${limitedPosition}%`;
  }
}

export const initScroll = () => new ScrollManager();