export class ScrollEffects {
  private navbar: HTMLElement;
  private heroSection: HTMLElement | null;
  private heroImage: HTMLElement | null;
  private cookieHero: HTMLElement | null;
  private initialHeroHeight: number;
  private scrollThreshold: number;
  private maxScale: number = 1.2;

  constructor() {
    this.navbar = document.querySelector('.navbar') as HTMLElement;
    this.heroSection = document.querySelector('.hero');
    this.heroImage = document.querySelector('.hero-image');
    this.cookieHero = document.querySelector('.cookie-hero');
    
    // Set initial hero height based on which hero section exists
    if (this.heroSection) {
      this.initialHeroHeight = this.heroSection.offsetHeight;
    } else if (this.cookieHero) {
      this.initialHeroHeight = this.cookieHero.offsetHeight;
    } else {
      this.initialHeroHeight = 0;
    }
    
    this.scrollThreshold = this.initialHeroHeight;
    
    this.initEventListeners();
  }

  private initEventListeners(): void {
    window.addEventListener('scroll', this.handleScroll.bind(this));
    window.addEventListener('resize', this.handleResize.bind(this));
  }

  private handleScroll(): void {
    const scrollPosition = window.scrollY;
    
    // Handle navbar transparency
    if (scrollPosition > this.scrollThreshold) {
      this.navbar.classList.add('scrolled');
    } else {
      this.navbar.classList.remove('scrolled');
    }
    
    // Handle hero image scaling if it exists
    if (this.heroImage && this.heroSection && scrollPosition <= this.initialHeroHeight) {
      const scrollPercentage = scrollPosition / this.initialHeroHeight;
      const scale = 1 + (scrollPercentage * (this.maxScale - 1));
      this.heroImage.style.transform = `scale(${scale})`;
    }
  }

  private handleResize(): void {
    if (this.heroSection) {
      this.initialHeroHeight = this.heroSection.offsetHeight;
    } else if (this.cookieHero) {
      this.initialHeroHeight = this.cookieHero.offsetHeight;
    }
    this.scrollThreshold = this.initialHeroHeight;
  }
}
