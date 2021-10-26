const View = require('../view/view.class')
const Store = require('../model/store.class')

class Controller {
    constructor() {
        this.store = new Store(1)
        this.view = new View()
    }

    addProductToStore(formData) {
        let product = {}
        if (document.getElementById("formBtn").textContent != "Cambiar") {
            try {
                product = this.store.addProduct(formData)
                this.view.renderNewProduct(product)
                this.view.renderStoreImport(this.store.totalImport())

            } catch (error) {
                this.view.renderErrorMessage(error)
            }

        }

        if (product.id) {


            document.getElementById("prod-" + product.id).querySelector('.up')
                .addEventListener('click', () => {
                    this.changeProductStock(product.id, 1)

                })

            document.getElementById("prod-" + product.id).querySelector('.down')
                .addEventListener('click', () => {
                    this.changeProductStock(product.id, -1)
                })

            document.getElementById("prod-" + product.id).querySelector('.delete')
                .addEventListener('click', () => {
                    this.deleteProductFromStore(product.id)
                })

            document.getElementById("prod-" + product.id).querySelector('.edit')
                .addEventListener('click', () => {
                    let newProdTittle = document.getElementById("new-prod").getElementsByTagName("legend")[0]
                    newProdTittle.textContent = "Cambiar producto"

                    document.getElementById("idForm").innerHTML = (`
            <label>Id:</label>
            <input type="text" class="form-control" disabled id="newprod-id" value="${product.id}">
            `)

                    document.getElementById("unitsForm").innerHTML = (`
            <label>Units:</label>
            <input type="number" class="form-control"  id="newprod-units" value="${product.units}">
            `)

                    document.getElementById("newprod-name").defaultValue = product.name
                    document.getElementById("newprod-price").defaultValue = product.price
                    document.getElementById("formBtn").textContent = ("Cambiar")

                })
            document.getElementById("formBtn").addEventListener('click', () => {
                let formId = document.getElementById("newprod-id").value
                let formName = document.getElementById("newprod-name").value
                let formUnits = document.getElementById("newprod-units").value
                let formPrice = document.getElementById("newprod-price").value
                let editProduct = { 
                    id: formId,
                    name: formName, 
                    units: formUnits, 
                    price: formPrice ,
                }
                //try {
                    this.view.renderEditProduct(editProduct)
                    this.store.changeProduct(editProduct)
                   
                //} catch (error) {
                    this.view.renderErrorMessage(error)

                //}

                document.getElementById("new-prod").innerHTML = `
                    <fieldset>
                    <legend>Nuevo producto</legend>
                    <div class="form-group" id="idForm">
                      
                    </div>
                    <div class="form-group">
                      <label for="newprod-name">Nombre:</label>
                      <input type="text" class="form-control" id="newprod-name" required>
                    </div>
                    <div class="form-group" id="unitsForm">
                      
                    </div>
                    <div class="form-group">
                      <label for="newprod-price">Precio/u.:</label>
                      <input type="number" class="form-control" id="newprod-price" required>
                    </div>
                    <button type="submit" id="formBtn" class="btn btn-default btn-primary">Añadir</button>
                    <button type="reset" class="btn btn-danger">Reset</button>
                  </fieldset>
                  `
            })
        }
    }

    deleteProductFromStore(prodId) {
        let product = {}
        product = this.store.findProduct(Number(prodId))
        if (!product) {
            this.view.renderErrorMessage('No hay ningun producto con id ' + prodId)
        }

        if (confirm(`Deseas borrar el producto ${product.name}, que tiene la id ${product.id}?`)) {
            if (product.units) {
                if (confirm(`Ese producto aun tiene ${product.units} unidades, estas seguro que quieres eliminarlo?`)) {


                    try {
                        product = this.store.changeProductUnits({
                            id: product.id,
                            units: -product.units,
                        })
                    } catch (error) {
                        this.view.renderErrorMessage(error)
                    }
                }
            }

            try {
                product = this.store.delProduct(prodId)
                this.view.renderDelProduct(product.id)
                this.view.renderStoreImport(this.store.totalImport())

            } catch (error) {
                this.view.renderErrorMessage(error)
            }

        }
    }

    changeProductInStore(formData) {
        try {
            var prodModified = this.store.changeProduct(formData)
        } catch (err) {
            this.view.renderErrorMessage(err)
            return
        }
        this.view.renderEditProduct(prodModified)
        this.view.renderStoreImport(this.store.totalImport())
    }


    changeProductStock(id, units) {
        let newProd = {}
        try {
            newProd = this.store.changeProductUnits({
                id: id,
                units: Number(units),
            })
            this.view.renderEditProduct(newProd)
            this.view.renderStoreImport(this.store.totalImport())

        } catch (error) {
            this.view.renderErrorMessage(error)

        }
    }
}

module.exports = Controller
