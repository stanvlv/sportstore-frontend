import React, { useContext } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import { CartContext } from "../App";

export default function Cart() {
  const cart = useContext(CartContext);
  console.log(cart, " ei tuka da vidim");

  const totalPrice = cart[0].reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <Container>
      {cart[0].map((item, index) => (
        <Row key={index} className="my-3">
          <Col md={2}>
            <Image src={item.imageUrl} fluid />
          </Col>
          <Col md={5}>
            <h5>{item.productName}</h5>
            {/* <p>{item.description}</p> */}
            <p></p>
          </Col>
          <Col md={3}>
            <p>Size: {item.size}</p>
          </Col>
          <Col md={2}>
            <p>${item.price}</p>
          </Col>
        </Row>
      ))}
      <Row >
        <Col className="text-right d-flex justify-content-end">
          <h4>Total: ${totalPrice.toFixed(2)}</h4>
        
          <button className="btn btn-primary">Checkout</button>
        </Col>
        
      </Row>
    </Container>
  );
}
