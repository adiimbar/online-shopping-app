let connection = require("./connection-wrapper");

// Only by admin
async function addProduct(product) {
    let sql = 'INSERT INTO products (product_name, category_id, price, image_path) values(?, ?, ?, ?)';
    let parameters = [product.product_name, product.category_id, product.price, product.image_path];
    await connection.executeWithParameters(sql, parameters);
}

// Only by admin
async function updateProduct(product) {
    let sql = "UPDATE products SET product_name = ?, price = ?, image_path = ? where product_id=? ";
    let parameters = [product.product_name, product.price, product.image_path, product.product_id];
    await connection.executeWithParameters(sql, parameters);
}

async function getProduct(id) {
    let sql = "select * from products where product_id=?";
    let parameters = [id];
    let user = await connection.executeWithParameters(sql, parameters);
    // console.log(user);
    return user;
}

// async function getAllProducts() {
//     let sql = "select * from products";
//     let products = await connection.execute(sql);
//     console.log(products);
// }

// // Only by admin
// async function deleteProduct(id) {
//     let sql = "delete from products where product_id=?";
//     let parameters = [id];
//     await connection.executeWithParameters(sql, parameters);    
// }


module.exports = {
    // deleteProduct,
    addProduct,
    updateProduct,
    getProduct
    // getAllProducts
};


let product = {
    product_name: 'Yogurt',
    category_id: 1,
    price: 42,
    image_path: 'yogurt.image',
    product_id: 3
};



// addProduct(product);

// updateProduct(product);

// getProduct(1);

// getAllProducts();

// deleteProduct(1)