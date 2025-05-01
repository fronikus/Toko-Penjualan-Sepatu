let cart = [];

window.addEventListener('DOMContentLoaded', () => {
  const savedCart = localStorage.getItem('cart');
  if (savedCart) {
    cart = JSON.parse(savedCart);
    updateCartUI();
  }
});

const updateCartUI = () => {
  const cartItemsList = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');
  const cartCount = document.getElementById('cart-count');

  cartItemsList.innerHTML = '';
  let total = 0;

  cart.forEach((item, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      ${item.name} - Rp${item.price.toLocaleString()} 
      <button class="remove-btn" data-index="${index}">Hapus</button>
    `;
    cartItemsList.appendChild(li);
    total += item.price;
  });

  cartTotal.textContent = total.toLocaleString();
  cartCount.textContent = cart.length;

  localStorage.setItem('cart', JSON.stringify(cart));

  document.querySelectorAll('.remove-btn').forEach(button => {
    button.addEventListener('click', () => {
      const index = button.getAttribute('data-index');
      cart.splice(index, 1);
      updateCartUI();
    });
  });
};

document.querySelectorAll('.add-to-cart').forEach(button => {
  button.addEventListener('click', (e) => {
    const product = e.target.closest('.product');
    const name = product.getAttribute('data-name');
    const price = parseInt(product.getAttribute('data-price'));

    cart.push({ name, price });
    updateCartUI();
  });
});

document.getElementById('checkout-form').addEventListener('submit', function (e) {
  e.preventDefault();

  if (cart.length === 0) {
    alert("Keranjang kosong!");
    return;
  }

  const name = document.getElementById('name').value;
  const address = document.getElementById('address').value;
  const paymentMethod = document.getElementById('payment-method').value;

  // Membuat objek order
  const order = {
    name,
    address,
    paymentMethod,
    items: cart,
    total: cart.reduce((sum, item) => sum + item.price, 0),
  };

  // Menampilkan data pesanan dalam alert
  let itemsList = order.items.map(item => `${item.name} - Rp${item.price.toLocaleString()}`).join("\n");

  alert(`
    Pesanan diterima!
    Nama: ${order.name}
    Alamat: ${order.address}
    Metode Pembayaran: ${order.paymentMethod}
    Total: Rp${order.total.toLocaleString()}
    
    Daftar Produk:
    ${itemsList}
  `);

  // Debugging data pesanan
  console.log("Data Pesanan:", order);

  // Reset form dan cart
  document.getElementById('checkout-form').reset();
  cart = [];
  updateCartUI();
  localStorage.removeItem('cart');
});

document.getElementById('search-input').addEventListener('input', function() {
  const query = this.value.toLowerCase(); 
  const products = document.querySelectorAll('.product');  

  products.forEach(product => {
    const name = product.dataset.name.toLowerCase();
    if (name.includes(query)) { 
      product.style.display = 'block';
    } else {
      product.style.display = 'none';
    }
  });
});

const welcomeMessage = document.getElementById('welcome-message');
const currentTime = new Date().getHours();

if (currentTime < 12) {
  welcomeMessage.innerHTML = 'Selamat Pagi, Selamat Berbelanja!';
} else if (currentTime < 18) {
  welcomeMessage.innerHTML = 'Selamat Siang, Temukan Produk Favoritmu!';
} else {
  welcomeMessage.innerHTML = 'Selamat Malam, Nikmati Belanja Sepatu Kamu!';
}

const loginForm = document.getElementById('login-form');
const loginSection = document.getElementById('login-section');
const loginMessage = document.getElementById('login-message');

const USERNAME = 'user';
const PASSWORD = '1234';

loginForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const username = document.getElementById('login-username').value;
  const password = document.getElementById('login-password').value;


  const usedPassword = localStorage.getItem('usedPassword') === 'true';

  if (usedPassword) {
    loginMessage.textContent = 'Password sudah tidak bisa digunakan lagi.';
    return;
  }

  if (username === USERNAME && password === PASSWORD) {
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('usedPassword', 'true'); // Tandai password sebagai sudah dipakai

    loginSection.style.display = 'none';
    document.querySelector('main').style.display = 'flex';
    document.getElementById('cart-section').style.display = 'block';
    document.getElementById('checkout-section').style.display = 'block';
  } else {
    loginMessage.textContent = 'Username atau password salah!';
  }
});

window.addEventListener('DOMContentLoaded', () => {
  const loggedIn = localStorage.getItem('isLoggedIn') === 'true';

  if (loggedIn) {
    loginSection.style.display = 'none';
    document.querySelector('main').style.display = 'flex';
    document.getElementById('cart-section').style.display = 'block';
    document.getElementById('checkout-section').style.display = 'block';
  } else {
    document.querySelector('main').style.display = 'none';
    document.getElementById('cart-section').style.display = 'none';
    document.getElementById('checkout-section').style.display = 'none';
  }
});
