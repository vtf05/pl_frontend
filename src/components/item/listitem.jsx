import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Popper from "@mui/material/Popper";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

// images
import image from "../../assets/paella.jpg";
import "./item.css";

// icons
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { Avatar, CardActions, Container, Divider } from "@mui/material";
import Plapi from "../../plapi";
import { Close } from "@mui/icons-material";

export function Item(props) {
  const theme = useTheme();
  const { ItemObj } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget); 
    setOpen(true);
   
  };

  const handleCallback = (cart_id) => {
    // console.log(ItemObj)
    const item_id = ItemObj.id;
    handleAddItem(cart_id, item_id);
    setOpen(false) ;
  };


  const handleAddItem = async (cart_id,item_id) => {
    const res = await Plapi.Cart.add_item(cart_id, item_id);
  };

  return (
    <Container className="item-card">
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
              {props.order ? null : (
                <>
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
                    onClick={handleClick}
                  >
                    ADD +
                  </Button>
                  <Popper
                    open={open}
                    anchorEl={anchorEl}
                    placement="bottom-start"
                    sx={{ borderRadius: "20px" }}
                  >
                    <Card className="main-card">
                      <CardActions
                        sx={{ justifyContent: "right", padding: "0" }}
                      >
                        <IconButton
                          onClick={() => {
                            setOpen(false);
                          }}
                          sx={{ justifyContent: "right", padding: "1" }}
                        >
                          <Close></Close>
                        </IconButton>
                      </CardActions>
                      <CartList parentCallback={handleCallback}></CartList>
                   
                        <Button
                          id="new-cart"
                          sx={{
                            fontSize: "0.80rem",
                            color: "#000000",
                          }}
                          onClick={() => {
                            handleCallback(null);
                          }}
                        >
                          ADD to New Cart
                        </Button>
      
                    </Card>
                  </Popper>
                </>
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

class CartList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      anchorEl: null,
      carts : []
    };
    this.handleClick = this.handleClick.bind(this);
  }
  async componentDidMount(){
    await this.loadData();
  }  
  render() {
    const {carts} = this.state ;
    return (
      <Paper style={{ maxHeight: 200, overflow: "auto" }} >
        <List>
          {carts.map((cart) => {
            const labelId = `checkbox-list-secondary-label-${cart?.id}`;
            const cart_id = cart.id
            return (
              <>
                <ListItem key={cart?.id} disablePadding className="cart-item">
                  <ListItemButton
                    onClick={() => {
                      this.handleClick(cart_id);
                    }}
                    value={cart?.id}
                  >
                    <IconButton aria-label="cart" sx={{ marginRight: 1 }}>
                      <StyledBadge
                        badgeContent={(cart?.items).length}
                        color="secondary"
                      >
                        <ShoppingCartIcon className="header-Icon" />
                      </StyledBadge>
                    </IconButton>
                    <ListItemText primary={cart?.price}></ListItemText>
                  </ListItemButton>
                </ListItem>
              </>
            );
          })}
        </List>
      </Paper>
    );
  }
  handleClick(cart_id) {
    this.props.parentCallback(cart_id);
  }

  async loadData(){
    const res = await  Plapi.Cart.getFilterList();
    if (!res.error){
      this.setState({carts : res})
      console.log("cart loaded response" )
    }
  }
}

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
