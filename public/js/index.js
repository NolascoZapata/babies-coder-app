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
const deleteProdFromCart = (id) =>{
    const options = {
        method: 'GET'
    }
    return fetch(`/api/cart/item/${id}`, options)
    .then(()=>{
        location.reload()
    })
    
}
const saveOrder= ()=>{
    const options = {
        method: 'GET'
    }
    return fetch(`/api/orders/addOrder`, options)
    .then(()=>{
        swal('Order Created',{
            icon: "success",
            button : false
        })
        window.location.href = '/home'
    })
    .catch(error =>console.log(error.message))
}
const deleteOrder= (id) =>{
    const options = {
        method: 'DELETE'
    }
    return fetch(`/api/orders/deleteOrder/${id}`, options)
    .then(()=>{
        swal('Order Deleted',{
            icon: "success",
            button : false
        })
        location.reload()
    })
}

const checkPassword = ()=>{
    let pass1 = document.getElementById('password').value
    let pass2 = document.getElementById('password2').value
    if (pass1 == pass2)
    null
    else
    swal(`Passwords dont match ! Please check them`,{
        icon: "error",
        button : true,
    })
}





