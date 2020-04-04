let productsDao = require("../dao/products-dao");

async function addProduct(product) {
    // Validations
    await productsDao.addProduct(product);
}

// Only by admin
async function updateProduct(product) {
    // Validations
    // await (userValidation(user))
    await productsDao.updateProduct(product);
}

async function getAllProducts() {
    // Validations
    let products = await productsDao.getAllProducts();
    return products;
}

async function getProduct(id) {
    let product = await productsDao.getProduct(id);
    // console.log(product);
    return product;
}

// async function deleteProduct(id) {
//     await usersDao.deleteProduct(id);
// }


module.exports = {
    addProduct,
    updateProduct,
    getAllProducts,
    getProduct
    // deleteProduct
};

