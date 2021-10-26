const divMessagesUI = document.getElementById('messages');
const tableTotalImportUI = document.getElementById('total')

class View {
    renderNewProduct(product) {
        let productBody = document.querySelector('#almacen tbody')
        let productRow = document.createElement('tr')
        productRow.id = 'prod-' + product.id

        productRow.innerHTML =
            `<td>${product.id}</td>
             <td>${product.name}</td>
             <td>${product.units}</td>
             <td>${product.price}</td>
             <td>${product.productImport().toFixed(2)} €</td>
             <td><button class="up btn btn-secondary">
             <span class="material-icons">expand_less</span>
             </button>
             
             <button class="down btn btn-secondary">
             <span class="material-icons disabled">expand_more</span>
             </button>
             
             <button class="edit btn btn-secondary">
             <span class="material-icons">edit</span>
             </button>

             <button class="delete btn btn-secondary">
             <span class="material-icons">delete</span>
             </button></td>`

        productBody.appendChild(productRow)
    }


    renderEditProduct(product) {
        let buscaProd = document.getElementById('prod-' + product.id)
        buscaProd.children[1].textContent = product.name
        buscaProd.children[2].textContent = product.units
        buscaProd.children[3].textContent = product.price
        buscaProd.children[4].textContent = product.productImport().toFixed(2)
    }


    renderDelProduct(id) {
        let buscaProd = document.getElementById('prod-' + id)
        if (buscaProd) {
            buscaProd.parentElement.removeChild(buscaProd)
        }
    }

    renderStoreImport(total) {
        tableTotalImportUI.innerHTML = total.toFixed(2);

    }

    renderErrorMessage(message) {
        const newMessageDiv = document.createElement('div')
        newMessageDiv.className = "col-sm-12 alert alert-danger alert-dismissible fade show"
        newMessageDiv.innerHTML = `
            <span><strong>ATENCIÓN: </strong>${message}</span>
            <button type="button" class="btn-close" data-bs-dismiss="alert" onclick="this.parentElement.remove()"></button>`

        divMessagesUI.appendChild(newMessageDiv)
    }
}

module.exports = View;
