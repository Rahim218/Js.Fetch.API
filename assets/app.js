let ProductList = [];
let deleteCount = 8

const GetProduct = async function () {
   await fetch('https://fakestoreapi.com/products')
        .then(response => response.json())
        .then(data => {

            ProductList = data.slice(0, data.length);

            let htmlElement = '';

            ProductList.slice(0, deleteCount).forEach(element => {
                let shortDescription = element.description.slice(0, 20) + '...';
                let shortPrName = element.title.slice(0, 10) + '...';
                htmlElement += `
          <div class="col-lg-3">
            <div class="card">
              <div class="image">
                <img src=${element.image} class="card-img-top" alt="...">
              </div>
              <div class="card-body">
                <h5 class="card-title">${shortPrName}</h5>
                <p class="card-text">${shortDescription}</p>
                <p class="price">Qiymət: ${element.price} </p>
                <a href="#" class="btn btn-success">Səbətə əlavə et</a>
              </div>
            </div>
          </div>
        `;
            });

            document.querySelector('.rowlist').innerHTML = htmlElement;



        });
};

GetProduct();

let load = document.querySelector('.text p');

load.addEventListener('click', function () {
    let lastIndex = deleteCount + 8
    if (lastIndex <= ProductList.length) {
        deleteCount = lastIndex

    }
    else {
        deleteCount = ProductList.length
        document.querySelector('.load').style.display='none'
    }
    GetProduct();
});

let dropDownLi = document.querySelector('.category')

dropDownLi.addEventListener("mouseenter", async function () {

    await fetch("https://fakestoreapi.com/products/categories")
        .then(response => response.json())
        .then(category => {
            let x = '';

            category.forEach(item => {

                x += `
            <li class="pr" ><a href="/category.html">${item}</a></li>
            `
            })

            document.querySelector('.drop').innerHTML = x
            document.querySelector('.drop').style.display = 'block'


        })

    GetFilter();

})

dropDownLi.addEventListener('mouseleave', function () {
    document.querySelector('.drop').style.display = 'none'
})


function GetFilter() {
    let dropLi = document.querySelectorAll('.pr a')


    let filterList = [];

    dropLi.forEach(item => {
        item.addEventListener('click', function () {
            let category = this.innerHTML
            localStorage.setItem('key', category)

            fetch('https://fakestoreapi.com/products')
                .then(response => response.json())
                .then(data => {
                    filterList = data.filter(prCat => prCat.category === category)
                })


        })
    })

}

let searchInput = document.querySelector('#form input')

console.log(ProductList);
searchInput.addEventListener('keyup', function () {
    let prName = searchInput.value
    let x = '';
    let filterPr = ProductList.filter(x => x.title.toLowerCase().includes(prName.toLowerCase()))

    filterPr.forEach(element => {
        let shortDescription = element.description.slice(0, 20) + '...';
        let shortPrName = element.title.slice(0, 10) + '...'

        x += `
    
    <div class="col-lg-3">
    <div class="card">
    <div class="image">
    <img src=${element.image} class="card-img-top" alt="...">
    </div>
    <div class="card-body">
      <h5 class="card-title">${shortPrName}</h5>
      <p class="card-text">${shortDescription}</p>
      <p class="price" > Price : ${element.price} </p>
      <a href="#" class="btn btn-success">Add basket</a>
    </div>
  </div>
    </div>
    
    `
    });

    document.querySelector('.rowlist').innerHTML = x;


})








