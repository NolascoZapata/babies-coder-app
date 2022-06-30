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
const deleteUser = (id) =>{
    const options = {
        method: 'DELETE'
    }
    return fetch(`/api/user/${id}`, options)
    .then(()=>{
        swal('User Deleted',{
            icon: "success",
            button : false
        })
        location.reload()
    })
    
}
const addToCart = (id) =>{
    const options = {
        method: 'get'
    }
    return fetch(`/api/cart/addItem/${id}`, options)
    .then(()=>{
        location.reload()
    })
    
}
const deleteProdFromCart = (id) =>{
    const options = {
        method: 'DELETE'
    }
    return fetch(`/api/cart/item/${id}`, options)
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
        email:document.getElementById('email-ingresado').value,
        date: dateOutput,
        text: document.getElementById('mensaje-ingresado').value

    }
    socket.emit('incomingMessage', mje)
    document.getElementById('mensaje-ingresado').value = ''
}


socket.on('chat', mjes => {
    const texto = mjes.map(mensaje => {
        return (
            `<div>
                    <strong style="color: blue;">${mensaje.email}<span style="color: brown;">${mensaje.date}<span></strong>
                    <em style="color: green;">${mensaje.text}</em>
                    
                </div>`)
    }).join('')
    
    let boxMensajes = document.getElementById('box-mensajes')
    boxMensajes.innerHTML = texto
})




