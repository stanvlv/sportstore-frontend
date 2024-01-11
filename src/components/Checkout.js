import { Col, Container, Row } from "react-bootstrap";
import Cookies from "js-cookie";
import { CartContext, CartQuantityContext } from "../App";
import { useEffect, useState, useContext } from "react";

export default function Checkout() {
  const { updateCartCount } = useContext(CartQuantityContext);
  const [cart, setCart] = useContext(CartContext);
  const [orderNumber, setOrderNumber] = useState(Cookies.get("sessionId"));
  const sessionId = Cookies.get("sessionId");

  useEffect(() => {
    if (sessionId) {
      fetch(`http://localhost:3001/cart/${sessionId}`)
        .then((response) => {
          // if (!response.ok) {
          //   throw new Error(
          //     "No connection to the database, something went wrong"
          //   );
          // }
          return response.json();
        })
        .then((data) => {
          setOrderNumber(sessionId);
          Cookies.remove("sessionId");
          setCart([]);
          localStorage.removeItem("cart");
          updateCartCount();
        })
        .catch((error) =>
          console.log(`No connection to the database: `, error.message)
        );
    }
  }, []);

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
          <h3>Your order number is: {orderNumber}</h3>
        </Col>
      </Row>
      <Row></Row>
    </Container>
  );
}
