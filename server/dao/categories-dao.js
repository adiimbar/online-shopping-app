let connection = require("./connection-wrapper");


//get all the categorys
async function getAllCategories() {
    let sql = "SELECT * FROM categories"
    let categories = await connection.execute(sql);
    return categories
}

// create new categorys
async function addCategory(category) {
    let sql = "INSERT INTO categories (category_name) VALUES (?) "
    let parameters = [category.categoryName];
    await connection.executeWithParameters(sql, parameters);
}

// update the categorys
async function updateCategory(category) {
    let sql = "UPDATE categories SET  category_name=? WHERE category_id=?";
    let parameters = [category.categoryName, category.id];
    await connection.executeWithParameters(sql, parameters);
}

//get  the products name from a singal categoryand the category name
async function getAllCategoryProducts(categoryId) {
    let sql = "SELECT p.product_id, p.product_name, p.price, p.image_path " +
                "FROM categories c JOIN products p " +
                "ON p.category_id = c.category_id " +
                "WHERE c.category_id = ?"
    let parameters = [categoryId];
    let categories = await connection.executeWithParameters(sql, parameters);
    return categories
}


// only by admin
async function deleteCategory(categoryId) {
    let parameters = [categoryId];
    let sql1 = "DELETE c " + 
                "FROM cart_items c JOIN products p " +
                "ON p.product_id = c.product_id " +
                "WHERE category_id=?";
    await connection.executeWithParameters(sql1, parameters);

    let sql2 = "DELETE FROM products WHERE category_id=?";
    await connection.executeWithParameters(sql2, parameters);

    let sql3 = "DELETE FROM categories WHERE category_id=?";
    let deleteResponce = await connection.executeWithParameters(sql3, parameters);
    return deleteResponce
}


module.exports = {
    getAllCategories,
    addCategory,
    updateCategory,
    getAllCategoryProducts,
    deleteCategory
};


// getAllCategoryProducts(1);
