let ErrorType = {
    
    GENERAL_ERROR : {id: 1, httpCode: 600, message : "A big fuck up which we'll never tell you of had just happend. And now : A big fat lie....'A general error ....'", isShowStackTrace: true},
    USER_NAME_ALREADY_EXIST : {id: 2, httpCode: 601, message : "User name already exist", isShowStackTrace: false},
    UNAUTHORIZED : {id: 3, httpCode: 401, message : "Login failed, invalid user name or password", isShowStackTrace: false},
    GET_CART_BY_USER_ID_RETURNED_NULL : {id: 4, httpCode: 600, message : "getCartByUserId in dao, did not returned an answer", isShowStackTrace: false},
    EMAIL_ALREADY_REGISTERED : {id: 5, httpCode: 409, message : "This email is already registered", isShowStackTrace: false}


    // Duplicate entry user or email is in the sestem
}

module.exports = ErrorType;