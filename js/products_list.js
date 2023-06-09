// menu_btn
const snb_btn = document.querySelector('.menu_btn > i');
const snb = document.querySelector('.snb');
const snb_close_btn = document.querySelector('.snb > .close_btn > i');

snb_btn.addEventListener('click', () => {
  snb.style.right = '0px';
})
snb_close_btn.addEventListener('click', () => {
  snb.style.right = '-500px';
})

// json data load
function load_products () {
  return fetch("js/data.json")
    .then((response) => response.json())
    .then((json) => json.products);
}

// HTML data load
function display_products (products) {
  const container = document.querySelector(".row");

  container.innerHTML = products.map(product => products_HTML(product)).join("");
}

// products create HTML
function products_HTML (product) {
  return `
    <div class="col col-xxl-2 col-xl-3 col-lg-4 col-md-4 col-sm-6">
      <a href="#"><img src="${product.img}" alt="${product.ctg}"></a>
      <h4>${product.name}</h4>
      <p>&#8361; ${product.price}</p>
    </div>`;
}

// products filtering
function ctg_click (e, products) {
  const dataset = e.target.dataset;
  const key = dataset.key;
  const value = dataset.value;

  if(key == null || value == null) {return}
  display_products(products.filter(product => product[key] == value));
}

// title_change
function title_change (e) {
  const ctg_title = document.querySelector(".ctg_title");

  ctg_title.innerHTML = e.target.dataset.value;
  e.target.classList.add('active');
}

// ctg_btn active
function gnb_btn_active (e) {
  const gnb_btn = document.querySelectorAll(".gnb > li");

  gnb_btn.forEach(el => el.classList.remove('active'));
  e.target.classList.add('active');
}

// ctg_btn event
function event_listeners (products) {
  const btn = document.querySelectorAll(".gnb");
  const all_btn = document.querySelector(".all_btn");
  const new_btn = document.querySelector(".new_btn");
  const ctg_btn = document.querySelectorAll(".ctg_btn");

  btn.forEach(el => el.addEventListener('click', e => {
    gnb_btn_active (e)
    title_change(e);
  }));
  all_btn.addEventListener('click', () => display_products(products));
  new_btn.addEventListener('click', e => ctg_click(e, products));
  ctg_btn.forEach(el => el.addEventListener('click', e => ctg_click(e, products)));
}

// products load
load_products ()
  .then((products) => {
    display_products(products);
    event_listeners(products);
  })
  .catch(console.log);