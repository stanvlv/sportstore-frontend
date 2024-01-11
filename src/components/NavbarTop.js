import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { MdOutlineShoppingCart } from "react-icons/md";
import { Image, Badge } from "react-bootstrap";
import sportstoreLogo from "../images/sportstore.png";
import { useContext } from "react";
import { CartQuantityContext } from "../App";

export default function NavbarTop() {
  const { cartItemCount } = useContext(CartQuantityContext);

  return (
    <Navbar expand="md" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand>
          <Link className="nav-link" to="/">
            <Image
              src={sportstoreLogo}
              width="50"
              height="50"
              className="d-inline-block "
              alt="SportStore"
            />
            SportStore
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link>
              <Link className="nav-link" to="/items">
                Products
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link className="nav-link" to="/">
                Sale
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link className="nav-link" to="/">
                Favorites
              </Link>
            </Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link className="ms-auto">
              <Link className="nav-link" to="/cart">
                Cart
                <MdOutlineShoppingCart />
                {cartItemCount > 0 && (
                  <Badge pill bg="info" className="ms-1">
                    {cartItemCount}
                  </Badge>
                )}
              </Link>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
