import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Snackbar from "@mui/material/Snackbar";

// images
import image from "../../assets/paella.jpg";
import "./item.css";

// icons
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { Avatar, CardActions, Container, Divider } from "@mui/material";
import { Close } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";

import Plapi from "../../plapi";

export function Item(props) {
  const theme = useTheme();
  const { ItemObj } = props;
  const [open, setOpen] = React.useState(false);
  const [alert, setAlert] = React.useState(false);
  const [message , setMessage] = React.useState("");

  const handleClick = (message) => {
    setOpen(true);
    setMessage(message);
  };

const handleClose = (event, reason) => {
  if (reason === "clickaway") {
    return;
  }

  setOpen(false);
};

  const handleCallback = (cart_id) => {
    // console.log(ItemObj)
    const item_id = ItemObj.id;
    handleAddItem(cart_id, item_id);
    setOpen(false);
  };

  const handleAddItem = async (item_id, message) => {
    
    const res = await Plapi.Cart.add_item(item_id);
    if (!res.error){
      setOpen(true)
      setMessage(message);

    }
  };


   const handleRemoveItem = async (item_id, message) => {
     setOpen(true);
     setMessage(message);
     const {cart_id} = props ;
     const res = await Plapi.Cart.remove_item(cart_id, item_id);
   };


  return (
    <Container className="item-card">
      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          {`Successfully ${message}`}
        </Alert>
      </Snackbar>

      <Grid container>
        <Grid item xs={4} md={6}>
          <Avatar
            src={ItemObj.image}
            variant="square"
            sx={{
              height: "90%",
              width: "90%",
              borderRadius: "20px",
              paddingTop: "6px",
              marginLeft: "-7px",
            }}
          ></Avatar>
          <IconButton></IconButton>
        </Grid>
        <Grid item xs={8} md={6}>
          <Grid container>
            <Grid item xs={12} sx={{ textAlign: "left" }}>
              <Typography
                variant="button"
                className="item-heading"
                sx={{ fontWeight: 550 }}
              >
                {ItemObj?.name}
              </Typography>
              <Typography variant="subtitle2" sx={{ fontSize: "0.75rem" }}>
                {ItemObj?.description}
              </Typography>
            </Grid>
            <Grid item xs={12} paddingTop={1}>
              <Button
                size="small"
                sx={{ float: "left", color: "#0abc58", fontWeight: "550" }}
              >
                {ItemObj?.price}
              </Button>
              {props.cart ? (
                <Button
                  size="small"
                  variant="outlined"
                  sx={{
                    fontSize: "0.7125rem",
                    color: "#000000",
                    minWidth: "50px",
                    border: "1px solid #000000",
                    borderRadius: "10px",
                  }}
                  onClick={() => {
                    handleRemoveItem(ItemObj.id,"removed item please reload");
                  }}
                >
                  REMOVE -
                </Button>
              ) : (
                <Button
                  size="small"
                  variant="outlined"
                  sx={{
                    fontSize: "0.7125rem",
                    color: "#000000",
                    minWidth: "50px",
                    border: "1px solid #000000",
                    borderRadius: "10px",
                  }}
                  onClick={() => {
                    handleAddItem(ItemObj.id,"added item");
                  }}
                >
                  ADD +
                </Button>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));


export class ItemList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };
  }

  async componentDidMount() {
    await this.loadData();
  }

  render() {
    const { items } = this.state;
  
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
            <Item ItemObj={item}></Item>
          </Grid>
        ))}
      </Container>
    );
  }

  async loadData() {
    const res = await Plapi.Item.getList();
    if (!res.error) {
      this.setState({ items: res });
    }
  }
}
