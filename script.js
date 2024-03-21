const altImage = "./img/products/f6.jpg";
const products = document.querySelector(".pro-container");

fetch("https://api.escuelajs.co/api/v1/products")
    .then((res) => {
        if (!res.ok) {
            throw new Error("Network is not ok");
        }
        return res.json();
    })
    .then((data) => {
        for (let i = 0; i < 16; i++) {
            products.innerHTML += `
                <div class="pro">
                    <img src="${data[i]?.images[0] || altImage}" alt="" />
                    <div class="des">
                        <span>product</span>
                        <h5>${data[i]?.title.slice(0, 30)}</h5>
                        <div class="star">
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                        </div>
                        <h4>${data[i]?.price}$</h4>
                    </div>
                    <a href="#"><i class="bi bi-cart3 cart"></i></a>
                </div>`;
        }
    })
    .catch((error) => {
        console.error("Error fetching or parsing data:", error);

    });




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






// -----------------------------------------------------
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
// ------------------------------------------------

