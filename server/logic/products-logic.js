let productsDao = require("../dao/products-dao");
const validation = require("../validation/validation");


async function addProduct(product) {
    await validation.addProductValidation(product);

    await productsDao.addProduct(product);
}

// Only by admin
async function updateProduct(product) {
    await validation.updateProductValidation(product);

    await productsDao.updateProduct(product);
}

async function getAllProducts() {
    // Validations
    let products = await productsDao.getAllProducts();
    return products;
}

async function getAllProductsByCategoryId(categoryId) {
    let products = await productsDao.getAllProductsByCategoryId(categoryId);
    // console.log(products);
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
    getAllProductsByCategoryId,
    getProduct
    // deleteProduct
};

