import { useContext } from "react";
import { DataContext } from "../App";
import sportslogo from "../images/sportstore.png";
import { Image } from "react-bootstrap";

export default function Home() {
  const data = useContext(DataContext);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <h1 style={{ color: "#424874" }}>Welcome to SportStore</h1>
      <Image
        src={sportslogo}
        width="350"
        height="350"
        className="d-inline-block"
        alt="SportStore"
      />
      <p style={{ color: "#424874", fontSize: "24px" }}>
        We have more than {data.length} products for you to choose from. Feel
        free to browse around.
      </p>
    </div>
  );
}
