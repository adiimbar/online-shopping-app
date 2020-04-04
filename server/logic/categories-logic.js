let categoriesDao = require("../dao/categories-dao");

async function getAllCategories() {
    // Validations
    await categoriesDao.getAllCategories();
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
    await categoriesDao.getAllCategoryProducts(categoryId);
}

async function deleteCategory(categoryId) {
    // Validations
    await categoriesDao.deleteCategory(categoryId);
}


module.exports = {
    getAllCategories,
    addCategory,
    updateCategory,
    getAllCategoryProducts,
    deleteCategory
};
