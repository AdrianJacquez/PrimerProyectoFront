const $products = document.querySelector("#products");
const $titleFilter = document.querySelector("#title-filter");
const $categoryFilter = document.querySelector("#category-filter");

let cachedProducts = null;  // Cache para almacenar productos después de la primera llamada a la API

async function getProducts() {
  const url = "https://fakestoreapi.com/products";

  // Usa cache si está disponible
  if (cachedProducts) {
    return cachedProducts;
  }

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    cachedProducts = data;  // Almacenar los datos en la cache
    return data;
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return [];
  }
}

async function displayProducts(title, category) {
  let products = await getProducts();

  // Filtrar productos por título si se proporciona
  if (title) {
    products = products.filter(product => product.title.toLowerCase().includes(title.toLowerCase()));
  }

  // Filtrar productos por categoría si se proporciona
  if (category) {
    products = products.filter(product => product.category.toLowerCase() === category.toLowerCase());
  }

  $products.innerHTML = "";

  products.forEach((product) => {
    const card = document.createElement("div");
    card.classList.add("product-card");

    card.innerHTML = `
      <img src="${product.image}" alt="${product.title}" />
      <h5>${product.title}</h5>
      <p>Categoria: ${product.category}</p>
      <p>Precio: <strong>$${product.price}</strong></p>
      <div>
        <a href="#" id="comprar" class="btn btn-primary">Comprar</a>
        <a href="#" id="carrito" class="btn btn-primary">Agregar a carrito</a>
      </div>
    `;

    $products.appendChild(card);
  });
}

// Event listener para cambios en el filtro de título
$titleFilter.addEventListener("input", () => {
  displayProducts($titleFilter.value, $categoryFilter.value);
  console.log('Title filter changed:', $titleFilter.value);
});

// Event listener para cambios en el filtro de categoría
$categoryFilter.addEventListener("change", () => {
  displayProducts($titleFilter.value, $categoryFilter.value);
  console.log('Category filter changed:', $categoryFilter.value);
});

// Iniciar la visualización de productos al cargar la página
displayProducts();
