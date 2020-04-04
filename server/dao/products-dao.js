let connection = require("./connection-wrapper");

// Only by admin
async function addProduct(product) {
    let sql = 'INSERT INTO products (product_name, category_id, price, image_path) VALUES(?, ?, ?, ?)';
    let parameters = [product.product_name, product.category_id, product.price, product.image_path];
    await connection.executeWithParameters(sql, parameters);
}

// Only by admin
async function updateProduct(product) {
    let sql = "UPDATE products SET product_name = ?, price = ?, image_path = ? WHERE product_id=? ";
    let parameters = [product.product_name, product.price, product.image_path, product.product_id];
    await connection.executeWithParameters(sql, parameters);
}

// only by admin
async function getAllProducts() {
    let sql = "SELECT * FROM products";
    let products = await connection.execute(sql);
    return products;
}

async function getProduct(id) {
    let sql = "SELECT * FROM products WHERE product_id=?";
    let parameters = [id];
    let user = await connection.executeWithParameters(sql, parameters);
    // console.log(user);
    return user;
}


// // Only by admin
// async function deleteProduct(id) {
//     let sql = "DELETE FROM products WHERE product_id=?";
//     let parameters = [id];
//     await connection.executeWithParameters(sql, parameters);    
// }


module.exports = {
    addProduct,
    updateProduct,
    getAllProducts,
    getProduct
    
    // deleteProduct,
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