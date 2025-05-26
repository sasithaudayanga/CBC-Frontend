import toast from "react-hot-toast";

export function getCart() {
    let cart = localStorage.getItem("cart")

    if (cart == null) {
        cart = [];
        localStorage.setItem("cart", JSON.stringify(cart));
    } else {
        cart = JSON.parse(cart);
    }
    return cart
}

export function removeFromCart(productId) {
    let cart = getCart()

    const newCart = cart.filter((item) => {
        return item.productId != productId;

    })
    localStorage.setItem("cart", JSON.stringify(newCart));
    toast.success("Product remove from the cart", { position: "top-center" })
}

export function addCart(product, qty) {
    let cart = getCart()

    let index = cart.findIndex((item) => { return item.productId == product.productId; });
    let wasAdded = false;

    if (index == -1) {
        cart[cart.length] = {
            productId: product.productId,
            name: product.productName,
            image: product.images[0],
            price: product.price,
            labelledPrice: product.labelledPrice,
            qty: qty
        }
        wasAdded = true;
        toast.success("Product add to cart", { position: "top-center" })
    } else {
        const newQty = cart[index].qty + qty;

        if (newQty <= 0) {
            removeFromCart(product.productId)
            return;
        } else {
            cart[index].qty = newQty;
            if (qty > 0) wasAdded = true;
        }
    }
    localStorage.setItem("cart", JSON.stringify(cart));

    if (wasAdded) {
        const previousQty = parseInt(localStorage.getItem("cart-added-qty") || "0");
        const newTotalQty = previousQty + qty;

        localStorage.setItem("cart-glow", "true");
        localStorage.setItem("cart-added-qty", newTotalQty);
        window.dispatchEvent(new Event("cart-updated"));
    }

}

export function getTotal() {
    let cart = getCart();
    let total = 0;

    for (let i = 0; i < cart.length; i++) {
        total += cart[i].price * cart[i].qty;
       
    }
    return total
}

