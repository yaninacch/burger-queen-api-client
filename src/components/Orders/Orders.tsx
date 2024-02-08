import React, { useEffect } from "react";
import LogoImg from "../../img/logo-burger.png";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useState } from "react";
import { Card } from "react-bootstrap";

const getProducts = async () => {
  return fetch("http://localhost:8080/products", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  }).then((data) => data.json());
};

export const Orders = () => {
  const [formClient, SetFormClient] = useState({
    client: "",
  });

  const [products, setProducts] = useState([]);

  const [newOrder, setNewOrder] = useState<any>([]);

  const [total, setTotal] = useState(0);

  const handleChange = (event: any) => {
    const { value } = event.target;
    SetFormClient((prevState) => ({ ...prevState, client: value }));
  };


  const handleBreakfast = async (event: any) => {
    event.preventDefault();
    const response = await getProducts();
    console.log(response);
    setProducts(
      response.filter((product: any) => product.type === "Breakfast")
    );
  };

  const handleLunch = async (event: any) => {
    event.preventDefault();
    const response = await getProducts();
    console.log(response);
    setProducts(response.filter((product: any) => product.type === "Lunch"));
  };

  const handleBeverages = async (event: any) => {
    event.preventDefault();
    const response = await getProducts();
    console.log(response);
    setProducts(
      response.filter((product: any) => product.type === "Beverages")
    );
  };

  const addProduct = (productToAdd: any) => {
    const index = newOrder.findIndex(
      (item: any) => item.product.id === productToAdd.id
    );

    if (index === -1) {
      setNewOrder([...newOrder, { qty: 1, product: productToAdd }]);
    } else {
      const newOrderToModify = [...newOrder];
      newOrderToModify[index].qty++;
      setNewOrder(newOrderToModify);
    }

    setTotal(total + productToAdd.price);
  };

  const deleteProduct = (productToDelete: any) => {
    const index = newOrder.findIndex(
      (item: any) => item.product.id === productToDelete.id
    );
    if (index === -1) {
      console.warn("Product not found in order");
      return;
    }
    if (newOrder[index].qty === 1) {
      const newOrderWithoutProduct = newOrder.filter(
        (item: any, i: any) => i !== index
      );
      setNewOrder(newOrderWithoutProduct);
    } else {
      const newOrderToModify = [...newOrder];
      newOrderToModify[index].qty--;
      setNewOrder(newOrderToModify);
    }

    setTotal(total - productToDelete.price);
  };

  const handleSend = async (event: any) => {
    event.preventDefault();
    let date = new Date();
    let toDateEntry = `${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

    const requestBody = {
      products: newOrder,
      userId: localStorage.getItem("userId"),
      client: formClient.client,
      status: "pending",
      dateEntry: toDateEntry,
    };
    fetch("http://localhost:8080/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(requestBody),
    }).then((data) => data.json());
  };

  useEffect(() => {
    console.log(newOrder);
  }, [newOrder]);

  return (
    <>
      <div className="orders-div">
        <img className="logo-orders" src={LogoImg} alt="logo" />

        <h1 className="title-orders">ORDERS</h1>
      </div>
      <div className="orders-container">
        <Form id="customer-form">
          <Form.Group>
            <Form.Label className="customer-label">CLIENT</Form.Label>
            <Form.Control
              id="input-customer"
              type="name"
              placeholder="Enter name"
              name="customer-name"
              value={formClient.client}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
        <div className="btn-prod-ticket">
          <div className="btn-products">
            <div className="meal-btn">
              <Button
                className="meal"
                variant="danger"
                onClick={handleBreakfast}
              >
                Breakfast
              </Button>
              <Button className="meal" variant="danger" onClick={handleLunch}>
                Lunch
              </Button>
              <Button
                className="meal"
                variant="danger"
                onClick={handleBeverages}
              >
                Beverages
              </Button>
            </div>
            <ul id="ul-cards">
              {products.map((product: any) => {
                return (
                  <Card id="cards">
                    <Card.Img
                      id="cards-img"
                      variant="top"
                      src={product.image}
                    />
                    <Card.Body>
                      <Card.Title id="product-name">{product.name}</Card.Title>
                      <Card.Text>{product.price}</Card.Text>
                    </Card.Body>
                    <div className="add-btn">
                      <Button
                        variant="danger"
                        onClick={() => deleteProduct(product)}
                      >
                        -
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => addProduct(product)}
                      >
                        +
                      </Button>
                    </div>
                  </Card>
                );
              })}
            </ul>
          </div>
          <div className="list-container">
            <div className="list-title">
              <p className="product-column list-title-sty">Name: </p>
              <p className="product-column list-title-sty">Quantity: </p>
              <p className="product-column">Price: </p>
            </div>
            {newOrder.map((p: any) => (
              <>
                <div className="name-price">
                  <p className="product-column">{p.product.name} </p>
                  <p className="product-column">{p.qty}</p>
                  <p className="product-column">{p.product.price * p.qty}</p>
                </div>
              </>
            ))}
            <p className="total">Total:{total}</p>
            <Button
              variant="danger"
              className="kitchen-btn"
              onClick={handleSend}
            >
              Send to Kitchen
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
