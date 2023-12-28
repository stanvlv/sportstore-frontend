import NavbarTop from "./NavbarTop";
import { Outlet } from "react-router-dom";
import { Container } from "react-bootstrap";

export default function Main() {
  return (
    <div>
      <NavbarTop />
      <Container  className="bg-body-subtle">
        <Outlet />
      </Container>
    </div>
  );
}

