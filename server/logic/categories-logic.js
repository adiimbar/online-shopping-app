let categoriesDao = require("../dao/categories-dao");

async function getAllCategories() {
    // Validations
    let categories = await categoriesDao.getAllCategories();
    return categories;
}

async function addCategory(category) {
    // Validations
    await categoriesDao.addCategory(category);
}

async function updateCategory(category) {
    // Validations
    await categoriesDao.updateCategory(category);
}

async function getAllCategoryProducts(categoryId) {
    // Validations
    let products = await categoriesDao.getAllCategoryProducts(categoryId);
    return products;
}

async function deleteCategory(categoryId) {
    // Validations
    let deleteResponce = await categoriesDao.deleteCategory(categoryId);
    return deleteResponce;
}


module.exports = {
    getAllCategories,
    addCategory,
    updateCategory,
    getAllCategoryProducts,
    deleteCategory
};
