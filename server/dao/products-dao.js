let connection = require("./connection-wrapper");

// Only by admin
async function addProduct(product) {
    let sql = 'INSERT INTO products (product_name, category_id, price, image_path) values(?, ?, ?, ?)';
    let parameters = [product.product_name, product.category_id, product.price, product.image_path];
    await connection.executeWithParameters(sql, parameters);
}

// Only by admin
async function updateProductPrice(setPrice) {
    let sql = "UPDATE products SET price = ? where product_id=? ";
    let parameters = [setPrice.price, setPrice.product_id];
    await connection.executeWithParameters(sql, parameters);
}

async function getProduct(id) {
    let sql = "select * from products where product_id=?";
    let parameters = [id];
    let user = await connection.executeWithParameters(sql, parameters);
    console.log(user);
    return user;
}

async function getAllProducts() {
    let sql = "select * from products";
    let products = await connection.execute(sql);
    console.log(products);
}

// // Only by admin
// async function deleteProduct(id) {
//     let sql = "delete from products where product_id=?";
//     let parameters = [id];
//     await connection.executeWithParameters(sql, parameters);    
// }


module.exports = {
    // deleteProduct,
    addProduct,
    updateProductPrice,
    getProduct,
    getAllProducts
};


let product = {
    product_name: 'yogurt',
    category_id: 1,
    price: 4,
    image_path: 'qwe'
};

let setPrice = {
    product_id: 1,
    price: 7
}


// addProduct(product);

// updateProductPrice(setPrice);

// getProduct(1);

// getAllProducts();

// deleteProduct(1)