const $products = document.querySelector("#products");
const $titleFilter = document.querySelector("#title-filter");
const $categoryFilter = document.querySelector("#category-filter");

async function getProducts(title, category) {
  let url = "https://fakestoreapi.com/products";

  if (title || category) {
    url += "?";
    if (title) {
      url += `title=${title}&`;
    }
    if (category) {
      url += `category=${category}`;
    }
  }

  const response = await fetch(url);
  const data = await response.json();
  return data;
}

async function displayProducts(title, category) {
  const products = await getProducts(title, category);

  $products.innerHTML = "";

  products.map((product) => {
    const card = document.createElement("div");
    card.classList.add("product-card");

    card.innerHTML = `
      <img src="${product.image}" />
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
  console.log($titleFilter.value);
});

// Event listener para cambios en el filtro de categoría
$categoryFilter.addEventListener("change", () => {
  displayProducts($titleFilter.value, $categoryFilter.value);
  console.log($categoryFilter.value);
});

// Iniciar la visualización de productos al cargar la página
displayProducts();
