//--------------------Products Client--------------------
const boxProd= document.getElementById('box-products-client')
fetch('http://localhost:8080/api/products/')
.then(response => response.json())
.then(data =>{
    let respArrHtml = data.map(product => 
                `<div class="col mb-4 card-prod-client">
                    <div class="card h-100">
                        <img src="${product.imgDir}" class="col-sm-6 col-lg-3 col-12" alt="${product.name} image">
                        <div class="card-body">
                            <h4 class="card-title">${product.name}</h4>
                            <p class="card-text">Size: ${product.size}</p>
                            <p class="card-text">Price: $${product.price}</p>
                                <button class="btn btn btn-secondary"><a class="text-decoration-none text-light" href="/products/${product._id}">Details</a></button>
                        </div>
                    </div>
                </div>`
    )

    let respStringAll = ''

    for (let i = 0; i < respArrHtml.length; i++) {
    respStringAll = respStringAll + respArrHtml[i]
    }

    boxProd.innerHTML = respStringAll
})

//--------------------Products admin--------------------
const tableProd= document.getElementById('table-products-admin')
fetch('http://localhost:8080/api/products/')
.then(response => response.json())
.then(data =>{
    let respArrHtml = data.map(product => 
                `
                <tr>
                    <td style="display: none">${product._id}</td>
                    <td scope="row">${product.name}</td>
                    <td>${product.price}</td>
                    <td>${product.size}</td>
                    <td>${product.stock}</td>
                    <td>${product.category}</td>
                    <td><img src="${product.imgDir}" width="100px" alt="${product.name} image"></td>
                    <td>
                        <button class="btn btn-secondary btnUpdate" data-bs-toggle="modal" data-bs-target="#updateProductModal" onClick="getProdData()">Update</button>
                        <button class="btn btn-light btn-outline-danger" onClick ="deleteProduct('${product._id}')"> Delete</button>
                    </td>
                </tr>
                `
    )
    
    if (respArrHtml.length === 0){
        let emptyTable = `<div class="text-danger">No products added</div>`
        tableProd.innerHTML = emptyTable
    }else{
        let respStringAll = ''
        for (let i = 0; i < respArrHtml.length; i++) {
        respStringAll = respStringAll + respArrHtml[i]
        }
        tableProd.innerHTML = respStringAll
    }
})


//--------------------All Users--------------------
const users= document.getElementById('users-list')
fetch('http://localhost:8080/api/user/')
.then(response => response.json())
.then(data =>{
    let respArrHtml = data.map(user => 
                `<div class="col mb-4 card-prod-client">
                    <div class="card h-100">
                        <img src="${user.userAvatar}" class="col-sm-6 col-lg-3 col-12" alt="imagen ${user.name}">
                        <div class="card-body">
                            <p class="card-text">Admin: ${user.isAdmin}</p>
                            <button class="btn btn-success">Details</button>
                        </div>
                        
                    </div>
                </div>`
    )
    let respStringAll = ''
    for (let i = 0; i < respArrHtml.length; i++) {
    respStringAll = respStringAll + respArrHtml[i]
    }
    users.innerHTML = respStringAll
})


const getProdData = () => {
    document.addEventListener('click',e=>
        { let row = e.target.closest('.btnUpdate').parentElement.parentElement
        update_ProdId.value = row.children[0].innerHTML
        update_ProdName.value = row.children[1].innerHTML
        update_ProdPrice.value = row.children[2].innerHTML
        update_ProdSize.value = row.children[3].innerHTML
        update_ProdStock.value = row.children[4].innerHTML
        update_ProdCategory.value = row.children[5].innerHTML
        update_ProdImgUrl.value = row.children[6].innerHTML
})
}

const deleteProduct = (id) =>{
    const options = {
        method: 'DELETE'
    }
    return fetch(`/api/products/${id}`, options)
    .then(()=>{
        location.reload()
    })
    
}


//--------------------Chat--------------------
//Socket.io 
const socket = io();
function enviarMensaje() {
    let date = new Date()
    let dateOutput = `${date.getHours()}:${date.getMinutes()} - ${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()} `
    const mje = {
        author: {
            id: document.getElementById('email-ingresado').value,
            nombre: document.getElementById('nombre-ingresado').value,
            apellido: document.getElementById('apellido-ingresado').value,
            edad: document.getElementById('edad-ingresado').value,
            alias: document.getElementById('alias-ingresado').value,
            avatar: document.getElementById('avatar-ingresado').value,
            date: dateOutput
        },
        text: document.getElementById('mensaje-ingresado').value

    }
    socket.emit('incomingMessage', mje)
    document.getElementById('mensaje-ingresado').value = ''
}


socket.on('chat', mjes => {
    const texto = mjes.map(mensaje => {
        return (
            `<div>
                    <strong style="color: blue;">${mensaje.author.id}<span style="color: brown;">${mensaje.author.date}<span><span><img src=${mensaje.author.avatar} width="30px" alt=""></span></strong>
                    <em style="color: green;">${mensaje.text}</em>
                    
                </div>`)
    }).join('')
    
    let boxMensajes = document.getElementById('box-mensajes')
    boxMensajes.innerHTML = texto
})




