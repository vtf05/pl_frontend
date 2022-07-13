import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import Alert from "@mui/material/Alert";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

// custom
import { Item } from "./../item/listitem";

// images
import image from "../../assets/paella.jpg";
import "./cart.css";

// icons
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { Avatar, CardActions, Container, Divider, Stack } from "@mui/material";
import { Close } from "@mui/icons-material";

import Plapi from "../../plapi";

function Cartl2(props) {
  const cartObj = props.cartObj;
  const items = cartObj.items;
  const cart_id = cartObj.id;
  const order_price = cartObj.price;
  const navigate = useNavigate();

  const handleNavigate = (price,cart_id) => {
    // console.log("order_price", price);
    navigate("/order_payment", {
      state: { order_price: price, cart_id:cart_id },
    });
  };
  return (
    <Container sx={{ paddingTop: "4rem", height: "700px" }}>
      {[...items].map((item) => (
        <Grid
          item
          xs={12}
          md={4}
          marginTop={1}
          sx={{
            boxShadow:
              "rgb(0 0 0 / 24%) 0px 2px 2px 0px, rgb(0 0 0 / 24%) 0px 0px 1px 0px",
            borderRadius: "20px",
          }}
        >
          <Item
            ItemObj={item.item}
            cart_id={cart_id}
            cart={true}
            count={item.count}
          />
        </Grid>
      ))}
      <Card className="order-pay">
        <Stack>
          <Button
            sx={{
              backgroundColor: "rgb(4 4 4)!important",
              borderRadius: "20px",
              float: "right",
            }}
            disableRipple
            variant="contained"
            type="submit"
            onClick={() => {
              handleNavigate(order_price, cart_id);
            }}
          >
            {`Proceed to pay ₹ ${order_price}`}
          </Button>
        </Stack>
      </Card>
    </Container>
  );
}

export default class CartL extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cartObj: {},
      loaded: false,
    };
  }
  componentDidMount() {
    this.loadData();
  }
  render() {
    const { cartObj, loaded } = this.state;
    return <>{loaded ? <Cartl2 cartObj={cartObj}></Cartl2> : null}</>;
  }
  async loadData() {
    const res = await Plapi.Cart.getFilterList();
    if (!res.error) {
      this.setState({ cartObj: res[0] });
      this.setState({ loaded: true });
    }
  }
}
