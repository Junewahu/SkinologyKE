// shop.js: Loads products from Firestore (pseudo-code)

document.addEventListener('DOMContentLoaded', async function() {
  const shopDiv = document.getElementById('product-list');
  shopDiv.textContent = 'Loading products...';

  // TODO: Replace with actual Firestore fetch
  // Example static products
  const products = [
    { name: 'Cerave Cleanser', price: 1200, skin_type: 'Oily' },
    { name: 'Beauty of Joseon Serum', price: 1800, skin_type: 'All' },
    { name: 'Avene Moisturizer', price: 1500, skin_type: 'Dry' }
  ];

  shopDiv.innerHTML = products.map(p => `<div class='product-card'><h3>${p.name}</h3><p>Price: KES ${p.price}</p><p>Skin type: ${p.skin_type}</p></div>`).join('');
});
