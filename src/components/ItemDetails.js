import Cookies from "js-cookie";
import { useContext, useState, useEffect } from "react";
import { DataContext, CartContext } from "../App";
import { Link, useParams } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Image,
  Dropdown,
  DropdownButton,
  Button,
} from "react-bootstrap";

import footballFoto from "../images/football.png";
import tennisFoto from "../images/tennis.png";
import swimmingFoto from "../images/swimming.png";
import basketballFoto from "../images/basketball.png";
import cyclingFoto from "../images/cycling.png";

const categoryImages = {
  Football: footballFoto,
  Tennis: tennisFoto,
  Swimming: swimmingFoto,
  Basketball: basketballFoto,
  Cycling: cyclingFoto,
};

export default function ItemDetails() {
  const { id } = useParams();
  const data = useContext(DataContext);
  const [cart, setCart] = useContext(CartContext);
  const item = data.find((item) => item._id === id);
 console.log(item)

  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');

  

  useEffect(() => {
    if (item) {
      setSelectedSize(item.sizes ? item.sizes[0] : '');
      setSelectedColor(item.colors ? item.colors[0] : '');
    }
  }, [item]);

 if (!item) {
    return <div>Item not found</div>;
  }

  console.log(selectedSize, selectedColor, 'itemdetails - selectedsize and color')
 
  console.log("Current cart contents:", cart);
  const addToCart = () => {
    const sessionId = Cookies.get('sessionId');
    const newItem = {
      sessionId: sessionId,
      itemId: item._id,
      size: selectedSize,
      color: selectedColor,
      productName: item.productName,
      price: item.price,
      quantity: 1, 
    };
  
    setCart(currentCart => {
      // Find the index of the item if it exists
      const existingItemIndex = currentCart.findIndex(cartItem =>
        cartItem.itemId === newItem.itemId &&
        cartItem.size === newItem.size &&
        cartItem.color === newItem.color
      );
  
      // Copy the current cart to a new array
      let updatedCart = [...currentCart];
  
      if (existingItemIndex >= 0) {
        // If the item exists, increment its quantity
        updatedCart[existingItemIndex].quantity += newItem.quantity;
      } else {
        // If the item does not exist, add it to the cart
        updatedCart.push(newItem);
      }
  
      // Save the updated cart to local storage
      localStorage.setItem('cart', JSON.stringify(updatedCart));
  
      return updatedCart;
    });
  };
  
  
  
  return (
    <div>
      <Link to="/items" >
      <Button variant="outline-secondary" href="/items">go back</Button>
      </Link>
      <Container style={{padding: 5}}>
        <Row>
          <Col
            xs={12}
            sm={12}
            md={12}
            lg={6}
            xl={6}
            style={{
              display: "flex",           // Make this a flex container
              justifyContent: "center",  // Center content horizontally
              alignItems: "center",      // Center content vertically
              height: "100%"             // Set a height (adjust as needed)
            }}
          >
            <Image
              src={categoryImages[item.category]}
              fluid
              style={{ maxWidth: "75%", maxHeight: "75%" }}
            />
          </Col>
          <Col>
            {/* item Name and Price */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "20px",
              }}
            >
              <h3>{item.productName}</h3>
              <span style={{ fontSize: "2rem" }}>
                <strong>{item.price} euro</strong>
              </span>
            </div>

            {/* Available Sizes */}
            <div style={{ marginBottom: "20px" }}>
              <h5>Available Sizes :</h5>
              {item.sizes.map((size, index) => (
      <Button 
        key={index} 
        variant="outline-secondary" 
        style={{ margin: '5px' }}
        onClick={() => setSelectedSize(size)}
        active={selectedSize === size}
      >
        {size}
      </Button>
    ))}

              {/* <DropdownButton
                id="dropdown-sizes"
                title="Select Size"
                variant="secondary"
              >
                {item.sizes.map((size, index) => (
                  <Dropdown.Item key={index}>{size}</Dropdown.Item>
                ))}
              </DropdownButton> */}
            </div>

            {/* Available Colors */}
            <div style={{ marginBottom: "20px" }}>
              <h5>Available Colors :</h5>
              {item.colors.map((color, index) => (
      <Button 
        key={index} 
        variant="outline-secondary" 
        style={{ margin: '5px'}}
        onClick={() => setSelectedColor(color)}
        active={selectedColor === color}
      >
        {color}
      </Button>
    ))}

              {/* <DropdownButton
                id="dropdown-colors"
                title="Select Color"
                variant="secondary"
              >
                {item.colors.map((color, index) => (
                  <Dropdown.Item key={index}>{color}</Dropdown.Item>
                ))}
              </DropdownButton> */}
            </div>

            {/* item Description */}
            <div>
              <h5>Description</h5>
              <p>
                {item.description}
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </div>
            <Button variant="outline-info" onClick={() => addToCart()}>Add to the Shopping Cart</Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
