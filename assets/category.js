let cat=localStorage.getItem('key')


const FilterPr = function(){
    fetch(`https://fakestoreapi.com/products/category/${cat}`)
    .then(res => res.json())
    .then(product => {

        let x = "";

        product.forEach(element => {
            let shortDescription = element.description.slice(0, 20) + '...';
            let shortPrName = element.title.slice(0, 10) + '...'

            x+=`
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
        document.querySelector('.categoryList').innerHTML=x
    })
}
FilterPr();



