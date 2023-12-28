import { Dropdown, DropdownButton, Container, Row, Col} from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import stockFoto from "../images/sportstore1.png";
import footballFoto from "../images/football.png";
import tennisFoto from "../images/tennis.png";
import swimmingFoto from "../images/swimming.png";
import basketballFoto from "../images/basketball.png";
import cyclingFoto from "../images/cycling.png";

import { useContext, useState, useEffect } from "react";
import { DataContext } from "../App";
import { Link } from "react-router-dom";
import { FiRefreshCcw } from "react-icons/fi";

const categoryImages = {
  Football: footballFoto,
  Tennis: tennisFoto,
  Swimming: swimmingFoto,
  Basketball: basketballFoto,
  Cycling: cyclingFoto
};

export default function Items() {
    
  const data = useContext(DataContext);
    const [filteredData, setFilteredData] = useState(data)
    const [activeCategory, setActiveCategory] = useState("");

 


    useEffect(() => {
      setFilteredData(data);
    }, [data]);

  const filterTheData = category => {
    console.log(category)
    setActiveCategory(category)
    const filteredData = data.filter(item => item.category === category)
    setFilteredData(filteredData)
  }

  const refreshFilters = () => {
    setFilteredData(data)
    setActiveCategory("")
  }


    return <div style={{padding: "20px"}}>
        <div style={{display: 'flex', alignItems: 'center', paddingTop: '10px', paddingBottom: '10px'}}>
            <h5 className="p-1">All Filter</h5>
            
            <DropdownButton id="dropdown-basic-button" title="Categories" className="p-1" variant="secondary">
                <Dropdown.Item onClick={() => filterTheData("Football")} active={activeCategory === "Football"}>Football</Dropdown.Item>
                <Dropdown.Item onClick={() => filterTheData("Tennis")} active={activeCategory === "Tennis"}>Tennis</Dropdown.Item>
                <Dropdown.Item onClick={() => filterTheData("Swimming")} active={activeCategory === "Swimming"}>Swimming</Dropdown.Item>
                <Dropdown.Item onClick={() => filterTheData("Basketball")} active={activeCategory === "Basketball"}>Basketball</Dropdown.Item>
                <Dropdown.Item onClick={() => filterTheData("Cycling")} active={activeCategory === "Cycling"}>Cycling</Dropdown.Item>
            </DropdownButton>
            
            <DropdownButton id="dropdown-basic-button" title="Sizes" className="p-1" variant="secondary">
                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
            </DropdownButton>
            
            <DropdownButton id="dropdown-basic-button" title="Price" className="p-1" variant="secondary">
                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
            </DropdownButton>
  <span onClick={() => refreshFilters()} className="refresh-icon">
            <FiRefreshCcw style={{paddingLeft: '10px', fontSize: '28px'}}  />
            {/* Refresh Filters */}
            </span></div>
        <Container>
        <Row >
            {
            filteredData?.map((item, index) => (
               
                    <Col xs={12} sm={6} md={4} lg={3} key={index}>
                        <Link className="nav-link" to={`/items/${item._id}`}>
        <Card style={{ marginBottom: '2rem', maxWidth: "275px"}}>
      <Card.Img variant="top" src={categoryImages[item.category]} style={{maxHeight: "225px", maxWidth: "325px"}} />
      <Card.Body>
        <Card.Text style={{fontSize: "16px", height: "", overflow: "hidden"}}>{item.productName}</Card.Text>
        <Card.Text style={{fontSize: "16px", overflow: "hidden", color: "red"}}>{item.price} euro</Card.Text>
        
      </Card.Body>
    </Card>
    </Link>
    </Col>
   
    ))} </Row>
        </Container>
        </div>;
}