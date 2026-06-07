document.addEventListener('DOMContentLoaded', () => {
  
  // --- Shopping Cart Drawer ---
  let cart = [];
  const cartDrawer = document.getElementById('cartDrawer');
  const cartOverlay = document.getElementById('cartOverlay');
  const cartIconBtn = document.getElementById('cartIconBtn');
  const closeCartBtn = document.getElementById('closeCart');
  const cartItemsList = document.getElementById('cartItemsList');
  const cartBadge = document.getElementById('cartBadge');
  const cartTotalPrice = document.getElementById('cartTotalPrice');
  const checkoutBtn = document.getElementById('checkoutBtn');

  function toggleCart() {
    cartDrawer.classList.toggle('active');
    cartOverlay.classList.toggle('active');
  }

  if (cartIconBtn) {
    cartIconBtn.addEventListener('click', toggleCart);
  }
  if (closeCartBtn) {
    closeCartBtn.addEventListener('click', toggleCart);
  }
  if (cartOverlay) {
    cartOverlay.addEventListener('click', toggleCart);
  }

  // Global add-to-cart
  window.addToCart = function(name, price, img) {
    const existing = cart.find(item => item.name === name);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ name, price: parseFloat(price), img, quantity: 1 });
    }
    updateCartUI();
    
    // Automatically slide drawer open
    if (!cartDrawer.classList.contains('active')) {
      toggleCart();
    }
  };

  window.changeQty = function(name, delta) {
    const item = cart.find(item => item.name === name);
    if (item) {
      item.quantity += delta;
      if (item.quantity <= 0) {
        cart = cart.filter(i => i.name !== name);
      }
      updateCartUI();
    }
  };

  window.removeItem = function(name) {
    cart = cart.filter(item => item.name !== name);
    updateCartUI();
  };

  function updateCartUI() {
    const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (cartBadge) {
      cartBadge.textContent = totalQty;
    }
    
    if (cart.length === 0) {
      cartItemsList.innerHTML = `
        <div class="cart-empty-msg">
          <p>Your cart is empty.</p>
        </div>
      `;
      cartTotalPrice.textContent = '$0.00';
      checkoutBtn.disabled = true;
      checkoutBtn.style.opacity = '0.5';
    } else {
      cartItemsList.innerHTML = cart.map(item => `
        <div class="cart-item">
          <img src="${item.img}" alt="${item.name}" class="cart-item-img">
          <div class="cart-item-info">
            <h4 class="cart-item-title">${item.name}</h4>
            <div class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
            <div class="cart-item-qty">
              <button class="qty-btn" onclick="changeQty('${item.name}', -1)">-</button>
              <span>${item.quantity}</span>
              <button class="qty-btn" onclick="changeQty('${item.name}', 1)">+</button>
            </div>
          </div>
          <button class="remove-cart-item" onclick="removeItem('${item.name}')">✕</button>
        </div>
      `).join('');
      
      const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      cartTotalPrice.textContent = `$${totalPrice.toFixed(2)}`;
      checkoutBtn.disabled = false;
      checkoutBtn.style.opacity = '1';
    }
  }

  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      alert('Checkout successful! Thank you for ordering from PizzaBite.');
      cart = [];
      updateCartUI();
      toggleCart();
    });
  }

  // --- Customer Reviews Switcher Logic ---
  const chefQuotes = {
    'MARIO SIMSON': {
      quote: '"V<span class="special-o">o</span>luptatem ea rerum nisi. Ullam debitis <span class="special-o">o</span>pti<span class="special-o">o</span>. Quae <span class="special-o">o</span>di<span class="special-o">o</span> quasi"',
      author: 'MARI<span class="special-o">O</span> SIMS<span class="special-o">O</span>N<br>&ndash; C<span class="special-o">O</span><span class="special-o">O</span>KB<span class="special-o">O</span><span class="special-o">O</span>K AUTH<span class="special-o">O</span>R',
      avatar: 'assets/chef_marcello.png'
    },
    'SOFIA POTTER': {
      quote: '"We c<span class="special-o">o</span>me here every Sunday. The w<span class="special-o">o</span><span class="special-o">o</span>d-fired s<span class="special-o">o</span>urdough crust is light, crispy, and absolutely delicious. Best pizza in t<span class="special-o">o</span>wn!"',
      author: 'S<span class="special-o">o</span>fia P<span class="special-o">o</span>tter<br>&ndash; Pizza Enthusiast',
      avatar: 'assets/chef_sofia.png'
    },
    'STACY NINOV': {
      quote: '"Y<span class="special-o">o</span>u can taste the quality <span class="special-o">o</span>f the fresh ingredients. The San Marzan<span class="special-o">o</span> t<span class="special-o">o</span>mat<span class="special-o">o</span>es are sweet and the m<span class="special-o">o</span>zzarella is dynamic."',
      author: 'Stacy Nin<span class="special-o">o</span>v<br>&ndash; G<span class="special-o">o</span>urmet Bl<span class="special-o">o</span>gger',
      avatar: 'assets/chef_stacy.png'
    },
    'TRAVIS LORDEN': {
      quote: '"Fast and incredibly fresh! Their delivery package keeps the pizza piping h<span class="special-o">o</span>t and the crust crispy right t<span class="special-o">o</span> my d<span class="special-o">o</span><span class="special-o">o</span>r."',
      author: 'Travis L<span class="special-o">o</span>rden<br>&ndash; Local Customer',
      avatar: 'assets/chef_travis.png'
    },
    'LEONOLA JOHNSON': {
      quote: '"Simply amazing. The slice melts in y<span class="special-o">o</span>ur m<span class="special-o">o</span>uth. Authentic Neap<span class="special-o">o</span>litan flav<span class="special-o">o</span>rs right here in the city."',
      author: 'Le<span class="special-o">o</span>n<span class="special-o">o</span>la J<span class="special-o">o</span>hns<span class="special-o">o</span>n<br>&ndash; Regular Dine-in',
      avatar: 'assets/chef_leonola.png'
    },
    'LIZZIE FISHER': {
      quote: '"Make sure t<span class="special-o">o</span> save r<span class="special-o">o</span><span class="special-o">o</span>m f<span class="special-o">o</span>r dessert as well! The tiramisu is incredibly rich with the perfect blend <span class="special-o">o</span>f espress<span class="special-o">o</span>."',
      author: 'Lizzie Fisher<br>&ndash; Pastry Lover',
      avatar: 'assets/chef_lizzie.png'
    }
  };

  const chefTabs = document.querySelectorAll('.chef-tab');
  const quoteEl = document.getElementById('chefQuoteText');
  const authorEl = document.getElementById('chefAuthorText');
  const avatarEl = document.getElementById('chefAvatarImg');

  // Preload reviewer images for instant, flicker-free hover transitions
  Object.values(chefQuotes).forEach(data => {
    const img = new Image();
    img.src = data.avatar;
  });

  let hoverTimeout = null;

  function activateTab(tab) {
    if (tab.classList.contains('active')) return;
    
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
    }

    chefTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    
    const chefKey = tab.getAttribute('data-chef');
    const data = chefQuotes[chefKey];
    
    if (data) {
      // Trigger fade out and slide/scale shifts instantly
      quoteEl.style.opacity = '0';
      quoteEl.style.transform = 'translateY(12px)';
      authorEl.style.opacity = '0';
      authorEl.style.transform = 'translateY(12px)';
      if (avatarEl) {
        avatarEl.style.opacity = '0';
        avatarEl.style.transform = 'rotate(6deg) scale(0.95)';
      }
      
      hoverTimeout = setTimeout(() => {
        quoteEl.innerHTML = data.quote;
        authorEl.innerHTML = data.author;
        if (avatarEl) {
          avatarEl.src = data.avatar;
          avatarEl.style.opacity = '1';
          avatarEl.style.transform = 'rotate(6deg) scale(1)';
        }
        quoteEl.style.opacity = '1';
        quoteEl.style.transform = 'translateY(0)';
        authorEl.style.opacity = '1';
        authorEl.style.transform = 'translateY(0)';
      }, 200);
    }
  }

  chefTabs.forEach(tab => {
    tab.addEventListener('mouseenter', () => activateTab(tab));
    tab.addEventListener('click', () => activateTab(tab));
  });

  // --- Slider Carousel ---
  const sliderTrack = document.getElementById('sliderTrack');
  const prevBtn = document.getElementById('prevSlide');
  const nextBtn = document.getElementById('nextSlide');
  let currentOffset = 0;

  function getSlideWidth() {
    const items = document.querySelectorAll('.slider-item');
    if (items.length === 0) return 0;
    const track = document.getElementById('sliderTrack');
    let gap = 0;
    if (track) {
      const trackStyle = window.getComputedStyle(track);
      gap = parseFloat(trackStyle.columnGap) || parseFloat(trackStyle.gap) || 0;
    }
    return items[0].offsetWidth + gap;
  }

  if (nextBtn && sliderTrack) {
    nextBtn.addEventListener('click', () => {
      const slideWidth = getSlideWidth();
      const trackWidth = sliderTrack.scrollWidth;
      const containerWidth = sliderTrack.parentElement.offsetWidth;
      const maxOffset = trackWidth - containerWidth;
      
      currentOffset += slideWidth;
      if (currentOffset > maxOffset) {
        currentOffset = maxOffset;
      }
      sliderTrack.style.transform = `translateX(-${currentOffset}px)`;
    });
  }

  if (prevBtn && sliderTrack) {
    prevBtn.addEventListener('click', () => {
      const slideWidth = getSlideWidth();
      currentOffset -= slideWidth;
      if (currentOffset < 0) {
        currentOffset = 0;
      }
      sliderTrack.style.transform = `translateX(-${currentOffset}px)`;
    });
  }

  window.addEventListener('resize', () => {
    currentOffset = 0;
    if (sliderTrack) {
      sliderTrack.style.transform = `translateX(0px)`;
    }
  });

  // --- Booking Form Validation ---
  const bookingForm = document.getElementById('bookingForm');
  const successModalOverlay = document.getElementById('successModalOverlay');
  const closeModalBtn = document.getElementById('closeModalBtn');

  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('fullName').value.trim();
      const address = document.getElementById('address').value.trim();
      const phone = document.getElementById('phone').value.trim();
      const date = document.getElementById('bookingDate').value;

      if (!name || !address || !phone || !date) {
        alert('Please fill out all fields.');
        return;
      }

      if (successModalOverlay) {
        successModalOverlay.classList.add('active');
      }
      bookingForm.reset();
    });
  }

  if (closeModalBtn && successModalOverlay) {
    closeModalBtn.addEventListener('click', () => {
      successModalOverlay.classList.remove('active');
    });
  }

  // --- Mobile Menu Toggle ---
  const menuToggle = document.getElementById('menuToggle');
  const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
  const mobileMenuClose = document.getElementById('mobileMenuClose');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a');

  function toggleMobileMenu() {
    mobileMenuOverlay.classList.toggle('active');
  }

  if (menuToggle) {
    menuToggle.addEventListener('click', toggleMobileMenu);
  }
  if (mobileMenuClose) {
    mobileMenuClose.addEventListener('click', toggleMobileMenu);
  }
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', toggleMobileMenu);
  });

  // --- Scroll-linked Writing/Typing Effect for "Since 2026" watermark ---
  const watermark = document.querySelector('.cursive-watermark');
  if (watermark) {
    const originalText = watermark.textContent.trim();
    // Wrap each character in a span with initial opacity 0 and slow, smooth transition (0.6s)
    watermark.innerHTML = originalText.split('').map(char => {
      if (char === ' ') {
        return `<span style="opacity: 0; display: inline-block; transition: opacity 0.6s ease-out;">&nbsp;</span>`;
      }
      return `<span style="opacity: 0; display: inline-block; transition: opacity 0.6s ease-out;">${char}</span>`;
    }).join('');

    const spans = watermark.querySelectorAll('span');

    function handleScrollWatermark() {
      const rect = watermark.getBoundingClientRect();
      const viewHeight = window.innerHeight;

      // Start revealing when element is 90% from the top of the viewport, finish when it is 10% from the top
      // This spreads the typing reveal over almost the entire viewport scroll height for a slower, wow-effect reveal.
      const startThreshold = viewHeight * 0.9;
      const endThreshold = viewHeight * 0.1;
      const totalDist = startThreshold - endThreshold;

      const currentProgress = (startThreshold - rect.top) / totalDist;
      const progress = Math.max(0, Math.min(1, currentProgress));

      // Calculate how many characters to reveal based on scroll progress
      const visibleCount = Math.round(progress * spans.length);

      spans.forEach((span, index) => {
        if (index < visibleCount) {
          span.style.opacity = '1';
        } else {
          span.style.opacity = '0';
        }
      });

      // Subtle horizontal shift for parallax depth
      const translateX = (progress - 0.5) * 50; // moves from -25px to +25px
      watermark.style.transform = `translate3d(${translateX}px, 0, 0) rotate(-10deg)`;
    }

    window.addEventListener('scroll', handleScrollWatermark);
    handleScrollWatermark(); // Run initially to set correct state on load
  }

  // --- Scroll-linked Flourish Path Drawing ---
  const flourishPath = document.getElementById('flourishPath');
  if (flourishPath) {
    const pathLength = flourishPath.getTotalLength();
    
    // Set up dash array and offset to start hidden
    flourishPath.style.strokeDasharray = pathLength;
    flourishPath.style.strokeDashoffset = pathLength;

    function handleScrollFlourish() {
      const rect = flourishPath.getBoundingClientRect();
      const viewHeight = window.innerHeight;

      // Start drawing when the flourish line enters the viewport (e.g. 95% from the top)
      // and finish drawing when it reaches 50% of the viewport
      const startThreshold = viewHeight * 0.95;
      const endThreshold = viewHeight * 0.5;
      const totalDist = startThreshold - endThreshold;

      const currentProgress = (startThreshold - rect.top) / totalDist;
      const progress = Math.max(0, Math.min(1, currentProgress));

      // Map progress to dash offset (1 -> 0 offset meaning fully drawn, 0 -> pathLength offset meaning hidden)
      flourishPath.style.strokeDashoffset = pathLength * (1 - progress);
    }

    window.addEventListener('scroll', handleScrollFlourish);
    handleScrollFlourish(); // Run initially to set correct state on load
  }
});

