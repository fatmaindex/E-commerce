


document.addEventListener("DOMContentLoaded", () => {
    const altImage = "./img2/photo_10_2023-09-03_16-01-21.jpg";
    const products = document.querySelector(".pro-container");

    (async () => {
        try {
            const res = await fetch("https://api.escuelajs.co/api/v1/products");
            if (!res.ok) {
                throw new Error("Network Error");
            }
            const data = await res.json();

            for (let i = 0; i < 46; i++) {




                let img = data[i]?.images[0];
                let title = data[i]?.title;
                let price = data[i]?.price;

                const excludedItems = [7, 14, 9, 10];

                if (excludedItems.includes(data[i]?.id)) {
                    continue;
                }

                products.innerHTML += `
                    <div class="pro">
                        <img src="${img || altImage}" alt="pro-img" class="proImg" />
                        <div class="des">
                            <span>product</span>
                            <h5>${title.slice(0, 30)}</h5>
                            <div class="star">
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                            </div>
                            <h4>${price}$</h4>
                        </div>
                        <a href="#" class="cartLink" onclick="addToCart('${img}', '${title}', '${price}')"><i class="bi bi-cart3 cart"></i></a>

                    </div>`;

            };
            
            let currentPage = 1;
            let max = 16;
            let shop = document.querySelectorAll('.pro-container .pro');

            function showItems() {
                let beginItem = max * (currentPage - 1);
                let endItem = Math.min(max * currentPage - 1, shop.length - 1);
                shop.forEach((item, key) => {
                    if (key >= beginItem && key <= endItem) {
                        item.style.display = "block";
                    } else {
                        item.style.display = "none";
                    }
                });
            }

            showItems();

            function pageList() {
                let count = Math.ceil(shop.length / max);
                let paginationContainer = document.querySelector(".pageList");
                paginationContainer.innerHTML = "";

                if (currentPage > 1) {
                    let prev = document.createElement("li");
                    prev.innerHTML = '<i class="fa-solid fa-left-long"></i>';
                    prev.addEventListener('click', () => changePage(currentPage - 1)); 
                    paginationContainer.appendChild(prev);
                }

                for (let i = 1; i <= count; i++) {
                    let newPage = document.createElement("li");
                    newPage.innerText = i;
                    newPage.addEventListener('click', () => changePage(i)); 
                    paginationContainer.appendChild(newPage);
                }

                if (currentPage < count) {
                    let next = document.createElement("li");
                    next.innerHTML = '<i class="fa-solid fa-right-long"></i>';
                    next.addEventListener('click', () => changePage(currentPage + 1)); 
                    paginationContainer.appendChild(next);
                }
            }

            pageList();

            function changePage(i) {
                currentPage = i;
                showItems();
                pageList();
            }
        } catch (error) {
            console.error("Error fetching or parsing data:", error);
        }
    })();


});



function addToCart(img, title, price) {
    console.log(img);
    console.log(title);
    console.log(price);

    $("#cartContent").html(
        '<tr>' +
        '<td><a href=""><i class="fa-regular fa-circle-xmark"></i></a></td>' +
        '<td>' + title + '</td>' +
        '<td>' + price + '</td>' +
        '<td><input type="number"></td>' +
        '<td>$118.19</td>' +
        '</tr>'
    );
}


// // ------------------------------------------------------------------

const people = document.querySelector(".people");
fetch(" https://api.escuelajs.co/api/v1/users ")
    .then((res) => { return res.json(); })
    .then((users) => {
        for (let j = 0; j < 3; j++) {
            people.innerHTML += `
    
                <div>
                <img class="user" src="${users[j].avatar}" alt="">
                <p><span>${users[j].name}</span> Senior Marketing Manager <br>
                phone: + 000 123 000 77 88 <br>
              Email: ${users[j].email}</p>
    
            </div>
          
                `
        }
    });





// -----------------------NAVBAR------------------------------
const bar = document.getElementById('bar');
const nav = document.getElementById('navbar');
const close = document.getElementById('close');


if (bar) {
    bar.addEventListener('click', () => {
        nav.classList.add('active')
    })
}

if (close) {
    close.addEventListener('click', () => {
        nav.classList.remove('active')
    })
}




// ---------------------BLOG PAGENATION---------------------------
let thisPage = 1;
let limit = 6;
let list = document.querySelectorAll('.blog .blog-box');

function loadItem() {
    let beginItem = limit * (thisPage - 1);
    let endItem = limit * thisPage - 1;
    list.forEach((item, key) => {
        if (key >= beginItem && key <= endItem) {
            item.style.display = "block";
        } else {
            item.style.display = "none";
        }
    });
}

loadItem();

function listPage() {
    let count = Math.ceil(list.length / limit);
    let paginationContainer = document.querySelector(".listpage");
    paginationContainer.innerHTML = "";

    if (thisPage > 1) {
        let prev = document.createElement("li");
        prev.innerHTML = '<i class="fa-solid fa-left-long"></i></li> ';
        prev.setAttribute('onclick', "changePage(" + (thisPage - 1) + ")");
        paginationContainer.appendChild(prev);
    }

    for (let i = 1; i <= count; i++) {
        let newPage = document.createElement("li");
        newPage.innerText = i;
        if (i == thisPage) {
            newPage.classList.add('active');
        }
        newPage.setAttribute('onclick', "changePage(" + i + ")");
        paginationContainer.appendChild(newPage);
    }

    if (thisPage < count) {
        let next = document.createElement("li");
        next.innerHTML = '<i class="fa-solid fa-right-long"></i></li> ';
        next.setAttribute('onclick', "changePage(" + (thisPage + 1) + ")");
        paginationContainer.appendChild(next);
    }
}

listPage();

function changePage(i) {
    thisPage = i;
    loadItem();
    listPage();
}

