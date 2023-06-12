snb_btn_active ();
load_products ()
  .then((products) => {
    display_products(products);
    event_listeners(products);
    modal_event_listener ();
    info_btn_active ();
  })
  .catch(console.log);

// snb_btn active
function snb_btn_active () {
  const snb_btn = document.querySelector('.menu_btn > i');
  const snb = document.querySelector('.snb');
  const snb_close_btn = document.querySelector('.snb > .close_btn > i');

  snb_btn.addEventListener('click', () => {
    snb.style.right = '0px';
  })
  snb_close_btn.addEventListener('click', () => {
    snb.style.right = '-500px';
  })
};

// json data load
function load_products () {
  return fetch("js/data.json")
    .then((response) => response.json())
    .then((json) => json.products);
};

// products HTML load
function display_products (products) {
  const container = document.querySelector(".row");

  container.innerHTML = products.map(product => product_HTML(product)).join("");
  modal_event_listener (products);
};

// products create HTML
function product_HTML (product) {
  return `
    <div class="col col-xxl-2 col-xl-3 col-lg-4 col-md-4 col-sm-6">
      <img class="product_img" src="${product.img}" alt="${product.ctg}" data-color="${product.color}" data-size=${product.size} data-bs-toggle="modal" data-bs-target="#staticBackdrop">
      <h4 class="product_name">${product.name}</h4>
      <p class="product_price">&#8361; ${product.price}</p>
    </div>`;
};

// products filtering
function ctg_click (e, products) {
  const dataset = e.target.dataset;
  const key = dataset.key;
  const value = dataset.value;

  if(key == null || value == null) {return}
  display_products(products.filter(product => product[key] == value));
};

// ctg_title change
function title_change (e) {
  const ctg_title = document.querySelector(".ctg_title");

  ctg_title.innerHTML = e.target.dataset.value;
  e.target.classList.add('active');
};

// ctg_btn active
function gnb_btn_active (e) {
  const gnb_btn = document.querySelectorAll(".gnb > li");

  gnb_btn.forEach(el => el.classList.remove('active'));
  e.target.classList.add('active');
};

// snb event listeners
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
};

// modal data load
function modal_data (product) {
  const p_name = document.querySelector(".p_name");
  const product_name = product.querySelector(".product_name").innerText;
  const p_price = document.querySelector(".p_price");
  const product_price = product.querySelector(".product_price").innerText;
  const p_img = document.querySelector(".p_img");
  const p_img_1 = document.querySelector(".p_img_1");
  const product_src = product.querySelector(".product_img").src;
  const product_alt = product.querySelector(".product_img").alt;
  const p_color = document.querySelector(".p_option .color");
  const product_color = product.querySelector(".product_img").dataset.color;
  const color_input_create = document.createElement("input");
  const color_label_create = document.createElement("label");

  p_name.innerHTML = product_name;
  p_price.innerHTML = product_price;

  p_img.src = product_src;
  p_img.alt = product_alt;
  p_img_1.src = product_src + "_1.jpg";

  p_color.innerHTML ='';

  color_input_create.type = 'checkbox';
  color_input_create.name = 'color';
  color_input_create.id = product_color;
  color_input_create.value = product_color;
  color_label_create.htmlFor = product_color;
  color_label_create.innerHTML = product_color;

  p_color.appendChild(color_input_create);
  p_color.appendChild(color_label_create);

  size_option (product);
}

// products event listeners
function modal_event_listener () {
  const products_img = document.querySelectorAll(".col");

  products_img.forEach(product => product.addEventListener('click', () => modal_data (product)));
}

// product size option load
function size_option (product) {
  const p_size = document.querySelector(".p_option > .size");
  const product_size = product.querySelector(".product_img").dataset.size;
  p_size.innerHTML ='';

  for (var i = 0; i < product_size.length; i++) {
    const input_create = document.createElement("input");
    const label_create = document.createElement("label");

    input_create.type = 'checkbox';
    input_create.name = 'size';
    input_create.id = product_size[i];
    input_create.value = product_size[i];

    label_create.htmlFor = product_size[i];
    label_create.innerHTML = product_size[i];

    p_size.appendChild(input_create);
    p_size.appendChild(label_create);
  };
};

// info open btn
function info_btn_active () {
  const size_info_btn = document.querySelector(".size_info_btn");
  const product_info_btn = document.querySelector(".product_info_btn");
  const size_info = document.querySelector(".size_info");
  const product_info = document.querySelector(".product_info");

  size_info_btn.addEventListener('click', () => {
    size_info.classList.toggle("active");
  })
  product_info_btn.addEventListener('click', () => {
    product_info.classList.toggle("active");
  })
}

// modal_img scroll init
function modal_scroll_top () {
  const modal_img = document.querySelector(".modal_img");
  const modal_top = modal_img.getBoundingClientRect().top;

  modal_img.scrollTo({top: modal_top});
}