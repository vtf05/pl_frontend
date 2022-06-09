// component
import { Component } from "react";
import "./profile.css";
import { useLocation } from "react-router-dom";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Typography,
  IconButton,
  TextField,
  Stack,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper";

//import custom
import Table from "./transaction";

// icon
import ProfilePic from "../../assets/profile2.jpg";
import { FaPhone } from "react-icons/fa";
import MailIcon from "@mui/icons-material/Mail";
import CallIcon from "@mui/icons-material/Call";
import AddCardIcon from "@mui/icons-material/AddCard";

// import apis
import Plapi from "../../plapi";

const styles = {
  paperContainer: {
    backgroundImage: `url(${Image})`,
  },
};

const label = { inputProps: { "aria-label": "Checkbox demo" } };
const Input = styled("input")({
  display: "none",
});


class OrderPay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wallet_bal: 0,
      order_price: 0,
      checked: false,
      name: "",
      cart_id : '',
    };
    this.loadData = this.loadData.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handlePay = this.handlePay.bind(this);
    

  }
  async componentDidMount() {
    await this.loadData();
  }

  render() {
    const { wallet_bal, order_price, checked } = this.state;

    return (
      <Container sx={{ paddingTop: "10rem", height: "700px" }}>
        <Paper style={styles.paperContainer} className="main-card">
          <CardContent>
            <Grid item xs={12}>
              <Typography variant="h6">Enter Your Details</Typography>
            </Grid>
            <Grid container spacing={1} justifyContent="start">
              <Grid item xs={12}>
                <TextField
                  id="standard-size-normal"
                  label="your name"
                  variant="standard"
                  onChange={this.handleNameChange}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="button">
                  {`Total Ammount to pay ₹ ${order_price}`}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Stack direction="row" alignItems="center">
                  <Checkbox
                    {...label}
                    checked={checked}
                    onChange={this.handleChange}
                  />
                  <Typography variant="caption">
                    {`Do you want to use your wallet balance ₹ ${wallet_bal}`}
                  </Typography>
                </Stack>
              </Grid>
            </Grid>
            <Button
              sx={{
                backgroundColor: "rgb(4 4 4)!important",
                borderRadius: "20px",
              }}
              disableRipple
              fullWidth
              variant="contained"
              type="submit"
              onClick={this.handlePay}
            >
              PAY
            </Button>
          </CardContent>
        </Paper>
      </Container>
    );
  }

  handleChange(event) {
    this.setState({ checked: event.target.checked });
  }
  handleNameChange(event) {     
    this.setState({ name: event.target.value });
  }

  async loadData() {
    console.log("order_price", this.props)
    const wb = window.sessionStorage.getItem("wb");
    this.setState({
      wallet_bal: wb,
      order_price: this.props.order_price,
      cart_id : this.props.cart_id,
    });
  }


  handlePay(){
    const { checked, order_price, wallet_bal } = this.state;
    //  this will redirect to razorpay page
    if (checked) {
    this.setState({ order_price: order_price - wallet_bal });
    }
    console.log("hey this is called ")
    this.showRazorpay();
  }


  loadScript() {
    //  this will load the rajorpay script
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    document.body.appendChild(script);
  }

  async showRazorpay() {
    
    const res = await this.loadScript();
    

    const obj = { ammount: this.state.order_price, user: this.state.name ,payment_type:'cart'};
    // we will pass the amount and product name to the backend using form data

    const data = await Plapi.Wallet.makePayment(obj, res);

    var options = {
      key_id: process.env.REACT_APP_PUBLIC_KEY,
      key_secret: process.env.REACT_APP_SECRET_KEY,
      amount: data.payment.amount,
      currency: "INR",
      name: "Org. Name",
      description: "Test teansaction",
      image: "", // add image url
      order_id: data.payment.id,
      handler: function (response) {
        // we will handle success by calling handlePaymentSuccess method and
        // will pass the response that we've got from razorpay
         Plapi.Wallet.handlePaymentSuccess(response);
      },
      prefill: {
        name: "User's name",
        email: "User's email",
        contact: "User's phone",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#000000",
      },
    };

    var rzp1 = new window.Razorpay(options);
    rzp1.open();
    // this.handleSuccess();
    //  after the successfull payment we need to redirect to the wallet page
  }
  async handleSuccess(){
      const {cart_id} = this.state ;
      const obj = { paid: true, proccessed :true};
      const res = await Plapi.Cart.update(cart_id,obj);
      if (!res.error){
          console.log("success")
      }
  }
}

export default function Orderpay(props){
  const location = useLocation();
  const {order_price , cart_id} = location.state ;
  return <OrderPay order_price={order_price}  cart_id ={cart_id} {...props}/>;
};
