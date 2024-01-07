import React, { useContext } from "react";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import { CartContext } from "../App";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { v4 as uuidv4 } from "uuid";

export default function Cart() {
  const [cart, setCart] = useContext(CartContext);
  console.log(cart, " ei tuka da vidim");

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const removeFromCart = (itemId, size, color) => {
    setCart((currentCart) => {
      // filter out the selected item
      const updatedCart = currentCart.filter(
        (item) =>
          !(
            item.itemId === itemId &&
            item.size === size &&
            item.color === color
          )
      );

      localStorage.setItem("cart", JSON.stringify(updatedCart));

      return updatedCart;
    });
  };

  const isCartEmpty = cart.length === 0;

  const sendOrder = () => {
    const sessionId = Cookies.get("sessionId");
    console.log(sessionId, " the session id ");
    // Prepare the items in the format expected by the backend
    const items = cart.map((item) => ({
      products: item.itemId,
      quantity: item.quantity,
      selectedSize: item.size,
      selectedColor: item.color,
    }));

    const orderDetails = {
      sessionId: sessionId,
      items: items,
    };

    fetch(`http://localhost:3001/cart/${sessionId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderDetails),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Order successfully sent:", data);
        // clear the session id and the cart
        // Cookies.remove("sessionId");
        // setCart([]);
        // localStorage.removeItem("cart");

        console.log(sessionId, " the session id after the order is sent")
      })
      .catch((error) => {
        console.error("Error sending order:", error);
      });
  };

  return (
    <Container>
      {isCartEmpty ? (
        <Row>
          <Col xs={12} className="text-center">
            <h5>Your cart is empty</h5>
          </Col>
          <Col xs={12} className="text-center">
            <h6>Browse our products and add something to it:</h6>
          </Col>
          <Col xs={12} className="text-center">
            <Link to="/items">
              <Button variant="outline-secondary">Browse</Button>
            </Link>
          </Col>
        </Row>
      ) : (
        <>
          <Row>
            <Col>
              <h3>Shopping Cart : </h3>
            </Col>
          </Row>
          {cart.map((item, index) => (
            <Row
              key={index}
              className="my-3"
              style={{ borderBottom: "1px solid grey" }}
            >
              <Col md={1}>
                <Image src={item.imageUrl} fluid />
              </Col>
              <Col md={3}>
                <h5>{item.productName}</h5>
                {/* <p>{item.description}</p> */}
              </Col>
              <Col>
                <p>Quantity: {item.quantity}</p>
              </Col>
              <Col md={3}>
                <p>Size: {item.size}</p>
                <p>Color: {item.color}</p>
              </Col>
              <Col md={2}>
                <p>Price: ${item.price * item.quantity}</p>
              </Col>
              <Col md={1}>
                <button
                  className="btn btn-outline-secondary"
                  onClick={() =>
                    removeFromCart(item.itemId, item.size, item.color)
                  }
                >
                  Remove
                </button>
              </Col>
            </Row>
          ))}
          <Row>
            <Col
              xs={6}
              sm={6}
              md={6}
              lg={10}
              className="text-right d-flex justify-content-end"
            >
              <h4>Total: ${totalPrice.toFixed(2)}</h4>
            </Col>
            <Col>
              <Link to="/checkout">
                <Button variant="outline-info" onClick={sendOrder}>
                  Checkout
                </Button>
              </Link>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
}
