import { all } from "redux-saga/effects";

import maincategorySaga from "./MaincategorySagas";
import subcategorySaga from "./SubcategorySagas";
import brandSaga from "./BrandSagas";
import productSaga from "./ProductSagas";
import cartSaga from "./CartSagas";
import wishlistSaga from "./WishlistSagas";
import checkoutSaga from "./CheckoutSagas";
import contactSaga from "./ContactSagas";
import newslatterSaga from "./NewslatterSagas";

export default function* RootSaga() {
    yield all([
        maincategorySaga(),
        subcategorySaga(),
        brandSaga(),
        productSaga(),
        cartSaga(),
        wishlistSaga(),
        checkoutSaga(),
        contactSaga(),
        newslatterSaga()
    ])
}