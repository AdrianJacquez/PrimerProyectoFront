const productsEl = document.getElementById("products");
const titleFilterEl = document.getElementById("title-filter");
const categoryFilterEl = document.getElementById("category-filter");

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
  console.log(data);
  return data;
}

// la funcion que va a renderizar los elementos dentro del DOM

async function displayProducts(title, category) {
  // Obtener los productos filtrados
  const productos = await getProducts(title, category);

  productsEl.innerHTML = "";

  // mostrar los productos
  for (let product of productos) {
    const card = document.createElement("div");
    card.classList.add("product-card");

    card.innerHTML = `
            <img  src="${product.image}" />
            <h5> ${product.title} </h5>
            <p> Categoria: ${product.category} </p>
            <p> Precio: <strong>$${product.price}</strong> </p>
            <div>
            <a href="#" id="comprar" class=" btn btn-primary ">Comprar</a>
            <a href="#" id="carrito" class=" btn btn-primary ">Agregar a carrito</a>
            </div>

        `;

    productsEl.appendChild(card);
  }
}

/*filtros por categoria y nombre del producto*/
displayProducts();

titleFilterEl.addEventListener("input", () => {
  console.log("title-filter changed:", titleFilterEl.value);
  displayProducts(titleFilterEl.value, categoryFilterEl.value);
});

categoryFilterEl.addEventListener("change", () => {
  console.log("category-filter changed:", categoryFilterEl.value);
  displayProducts(titleFilterEl.value, categoryFilterEl.value);
});
