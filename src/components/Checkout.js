import { Col, Container, Row } from "react-bootstrap";
import Cookies from "js-cookie";
import { CartContext } from "../App";
import { useEffect, useState, useContext } from "react";

export default function Checkout() {
  const [cart, setCart] = useContext(CartContext);
  const [orderNumber, setOrderNumber] = useState("");
  const sessionId = Cookies.get("sessionId");

  useEffect(() => {
    if (sessionId) {
      fetch(`http://localhost:3001/cart/${sessionId}`)
        .then((response) => response.json())
        .then((data) => setOrderNumber(data.orderNumber))
        .catch((error) =>
          console.log(`No connection to the database: `, error.message)
        );
    }

    Cookies.remove("sessionId");
    setCart([]);
    localStorage.removeItem("cart");
  }, []);

  console.log(orderNumber, " order number");
  return (
    <Container>
      <Row>
        <Col className="text-center">
          <h2>Checkout</h2>
        </Col>
      </Row>
      <Row>
        <Col className="text-center">
          <h3>Thank you for your order!</h3>
        </Col>
      </Row>
      <Row>
        <Col className="text-center">
          <h3>Your order number is: 123456</h3>
        </Col>
      </Row>
    </Container>
  );
}
