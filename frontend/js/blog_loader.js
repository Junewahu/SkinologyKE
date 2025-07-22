// blog_loader.js: Loads blog entries from Firestore (pseudo-code)

document.addEventListener('DOMContentLoaded', async function() {
  const blogDiv = document.getElementById('blog-entries');
  blogDiv.textContent = 'Loading blog posts...';

  // TODO: Replace with actual Firestore fetch
  // Example static posts
  const posts = [
    { title: 'Acne Tips', content: 'How to manage acne in Kenya...' },
    { title: 'Skin Lightening Risks', content: 'Dangers of skin lightening creams...' },
    { title: 'Eczema vs Fungal', content: 'How to tell eczema from fungal infections...' },
    { title: 'Pigmentation Facts', content: 'Understanding hyperpigmentation...' }
  ];

  blogDiv.innerHTML = posts.map(post => `<h3>${post.title}</h3><p>${post.content}</p>`).join('');
});
