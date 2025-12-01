let items = JSON.parse(localStorage.getItem('items')) || [];
let totalPrice = 0;

// المسؤول فقط يحتاج كلمة مرور
function showAdminPassword() {
  document.getElementById('role-selection').classList.add('hidden');
  document.getElementById('password-screen').classList.remove('hidden');
}

function checkPassword() {
  const input = document.getElementById('password-input').value;
  if(input === '1234') {
    enterAdmin();
  } else {
    document.getElementById('password-error').innerText = 'كلمة المرور خاطئة!';
  }
}

// دخول المسؤول
function enterAdmin() {
  document.getElementById('password-screen').classList.add('hidden');
  document.getElementById('admin-panel').classList.remove('hidden');
  renderAdminItems();
  renderClientItems();
}

// دخول العميل مباشرة بدون كلمة مرور
function enterClient() {
  document.getElementById('role-selection').classList.add('hidden');
  document.getElementById('client-panel').classList.remove('hidden');
  renderClientItems();
}

// إضافة منتج أو خدمة
function addItem() {
  const name = document.getElementById('item-name').value;
  const desc = document.getElementById('item-desc').value;
  const price = parseFloat(document.getElementById('item-price').value);
  const phone = document.getElementById('item-phone').value || '0123456789';
  const img = document.getElementById('item-img').value || '';

  if(!name || !desc || !price) {
    alert('يرجى ملء الاسم والوصف والسعر');
    return;
  }

  items.push({name, desc, price, phone, img});
  localStorage.setItem('items', JSON.stringify(items));
  alert('تمت الإضافة بنجاح!');
  renderAdminItems();
  renderClientItems();
}

// عرض المنتجات في لوحة المسؤول
function renderAdminItems() {
  const container = document.getElementById('admin-items-container');
  container.innerHTML = '';
  items.forEach((item, index) => {
    const card = document.createElement('div');
    card.className = 'item-card';
    card.innerHTML = `
      ${item.img ? `<img src="${item.img}" alt="${item.name}">` : ''}
      <h3>${item.name}</h3>
      <p>${item.desc}</p>
      <p>السعر: ${item.price}</p>
      <button onclick="deleteItem(${index})">حذف</button>
    `;
    container.appendChild(card);
  });
}

// حذف منتج
function deleteItem(index) {
  items.splice(index, 1);
  localStorage.setItem('items', JSON.stringify(items));
  renderAdminItems();
  renderClientItems();
}

// عرض المنتجات للعميل
function renderClientItems() {
  const container = document.getElementById('client-items-container');
  container.innerHTML = '';
  items.forEach((item, index) => {
    const card = document.createElement('div');
    card.className = 'item-card';
    card.innerHTML = `
      ${item.img ? `<img src="${item.img}" alt="${item.name}">` : ''}
      <h3>${item.name}</h3>
      <p>${item.desc}</p>
      <p>السعر: ${item.price}</p>
      <button onclick="addToCart(${index})">إضافة للسلة</button>
      <button onclick="buyNow(${index})">شراء</button>
    `;
    container.appendChild(card);
  });
}

// إضافة للسلة وحساب المجموع
function addToCart(index) {
  totalPrice += items[index].price;
  document.getElementById('total-price').innerText = totalPrice;
}

// شراء مباشرة عبر WhatsApp
function buyNow(index) {
  const phone = items[index].phone;
  window.open(`https://wa.me/${phone}`, '_blank');
}
