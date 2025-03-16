import './style.css';
import { ScrollEffects } from './scroll-effects';

document.addEventListener('DOMContentLoaded', () => {
  // Initialize scroll effects
  new ScrollEffects();
  
  // Initialize cookie quantity selectors
  initQuantitySelectors();
  
  // Initialize add to cart buttons
  initAddToCartButtons();
  
  // Add placeholder images if needed
  const cookieImages = document.querySelectorAll('.cookie-image') as NodeListOf<HTMLImageElement>;
  if (cookieImages) {
    const placeholders = [
      "https://placehold.co/400x400?text=Birthday+Cookie",
      "https://placehold.co/400x400?text=Chocolate+Chunk+Cookie",
      "https://placehold.co/400x400?text=Smores+Cookie"
    ];
    
    cookieImages.forEach((img, index) => {
      if (!img.src || img.src.includes('/images/')) {
        img.src = placeholders[index % placeholders.length];
      }
    });
  }
  
  // Initialize bestsellers text animation
  initBestsellersAnimation();
});

function initQuantitySelectors(): void {
  const minusButtons = document.querySelectorAll('.quantity-btn.minus');
  const plusButtons = document.querySelectorAll('.quantity-btn.plus');
  
  minusButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const quantityElement = (button.parentNode as HTMLElement).querySelector('.quantity') as HTMLElement;
      let quantity = parseInt(quantityElement.textContent || '1');
      if (quantity > 1) {
        quantity--;
        quantityElement.textContent = quantity.toString();
      }
    });
  });
  
  plusButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const quantityElement = (button.parentNode as HTMLElement).querySelector('.quantity') as HTMLElement;
      let quantity = parseInt(quantityElement.textContent || '1');
      quantity++;
      quantityElement.textContent = quantity.toString();
    });
  });
}

function initAddToCartButtons(): void {
  const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
  
  addToCartButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const cookieItem = button.closest('.cookie-item') as HTMLElement;
      const cookieName = cookieItem.querySelector('.cookie-name')?.textContent;
      const quantity = cookieItem.querySelector('.quantity')?.textContent;
      
      // In a real application, you would add the item to the cart
      // For now, we'll just show an alert
      alert(`Added ${quantity} ${cookieName} to cart!`);
    });
  });
}

function initBestsellersAnimation(): void {
  // Create multiple bestsellers text elements for a continuous effect
  const bestsellersBackground = document.querySelector('.bestsellers-background') as HTMLElement;
  const textCount = 5;
  
  for (let i = 0; i < textCount; i++) {
    const textElement = document.createElement('div');
    textElement.className = 'bestsellers-text';
    textElement.textContent = 'BESTSELLERS';
    textElement.style.top = `${(i * 30) - 20}%`;
    textElement.style.left = `${(i * 20) - 20}%`;
    textElement.style.animationDelay = `${i * -4}s`;
    bestsellersBackground.appendChild(textElement);
  }
}
