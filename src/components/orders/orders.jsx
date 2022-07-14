// component
import { React, Component , useState } from "react";
import {
  Avatar,
  Box,
  Button,
  CardActions,
  CardContent,
  Container,
  Divider,
  Typography,
} from "@mui/material";
import { useNavigate} from "react-router-dom" ;
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from "@mui/material/Paper";
import Popover from "@mui/material/Popover";

//import custom
import { Item} from "../item/listitem";

// css
import "./orders.css";

// icon
import MailIcon from "@mui/icons-material/Mail";
import CallIcon from "@mui/icons-material/Call";

//  import apis
import Plapi from "../../plapi";



const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "white",
    color: theme.palette.common.black,
    fontWeight : 550
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));
 


function OrderList(props) {
 const [anchorEl, setAnchorEl] = useState(null);
 const [anchorEl1, setAnchorEl1] = useState(null);

 const [otp, setOtp] = useState("");

 const handleClick = (event) => {
   setAnchorEl(event.currentTarget);
 };

 const handleClose = () => {
   setAnchorEl(null);
   setAnchorEl1(null);
 };
 const handleConfirm = (event, order_id) => {
   console.log("this has tp be done");
   setAnchorEl(null);
   setAnchorEl1(event.currentTarget);
    handleOtp(order_id);
 };

 const handleOtp = async (order_id) => {
   const res = await Plapi.Cart.getOtp(order_id);
   if (!res.error) {
     setOtp(res.otp);
     // setTimeout(()=>{setOtp(res.otp)},60000)
   } else {
     setOtp("please try again error occured");
   }
 };
 //  const navigate = useNavigate() ;

 //  const handleNavigate =(price,orderid) => {
 //     // console.log("order_price", price);
 //     navigate("/order_payment", { state: {order_price : price,cart_id : orderid}});
 //  }

 const open = Boolean(anchorEl);
 const id = open ? "simple-popover" : undefined;
 const open1 = Boolean(anchorEl1);
 const id1 = open1 ? "simple-popover" : undefined;
 //  task : dense the table  , add activate buttom  , 3 coulmns
 //  wallet integration with payement
 //  flipkart ,

 const { orders } = props;
 return (
   <TableContainer component={Paper}>
     <Table sx={{ minWidth: 450 }} size="small" aria-label="a dense table">
       <TableHead>
         <TableRow>
           {props.active ? (
             <StyledTableCell align="center">STATE</StyledTableCell>
           ) : null}

           <StyledTableCell align="center">ORDERID</StyledTableCell>
           <StyledTableCell align="center">AMOUNT</StyledTableCell>
           <StyledTableCell align="center">CASHBACK</StyledTableCell>
           <StyledTableCell align="center">OTP</StyledTableCell>
         </TableRow>
       </TableHead>
       <TableBody>
         {orders.map((order) => (
           <>
             <StyledTableRow key={order?.id}>
               {props.active ? (
                 <StyledTableCell align="center">
                   <Button
                     size="small"
                     variant="outlined"
                     sx={{
                       fontSize: "0.60rem",
                       color: "#2fb6ad",
                       minWidth: "50px",
                       float: "right",
                     }}
                     onClick={(event) => handleClick(event, order?.id)}
                   >
                     Activate
                   </Button>
                 </StyledTableCell>
               ) : null}

               <StyledTableCell align="center">{order?.id}</StyledTableCell>
               <StyledTableCell align="center">{order?.price}</StyledTableCell>

               <StyledTableCell align="center">
                 {order?.cashback}
               </StyledTableCell>
               <StyledTableCell align="center">{otp}</StyledTableCell>
             </StyledTableRow>
             <Popover
               id={id}
               open={open}
               anchorEl={anchorEl}
               onClose={handleClose}
               anchorOrigin={{
                 vertical: "center",
                 horizontal: "center",
               }}
               sx={{ borderRadius: "20px" }}
             >
               <Card>
                 <CardContent>
                   <Typography sx={{ mb: 1.5 }} color="text.secondary">
                     If you want to continue press ok
                   </Typography>
                 </CardContent>
                 <CardActions sx={{ justifyContent: "space-between !important"}}>
                   <Button size="small" onClick={handleClose}>
                     cancel
                   </Button>
                   <Button size="small" onClick={handleConfirm}>
                     ok
                   </Button>
                 </CardActions>
               </Card>
             </Popover>
             <Popover
               id={id1}
               open={open1}
               anchorEl={anchorEl1}
               onClose={handleClose}
               anchorOrigin={{
                 vertical: "center",
                 horizontal: "center",
               }}
               sx={{ borderRadius: "20px" }}
             >
               <Card>
                 <CardContent>
                   <Typography variant="h5" component="div">
                     {otp}
                   </Typography>
                   <Typography sx={{ mb: 1.5 }} color="text.secondary">
                     OTP is Generated Please Wait
                   </Typography>
                   <Typography variant="body2">
                     OTP will apear in 60 sec
                   </Typography>
                 </CardContent>
                 <CardActions>
                   <Button size="small" onClick={handleClose}>
                     close
                   </Button>
                 </CardActions>
               </Card>
             </Popover>
           </>
         ))}
       </TableBody>
     </Table>
   </TableContainer>
 );
}

export default class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      pastOrder: [],
      presentOrder: [],
    };
  }
  async componentDidMount() {
    await this.loadData();
  }

  render() {
   const { pastOrder , presentOrder}= this.state ;
    return (
      <Container sx={{ paddingTop: "4rem", height: "700px" }}>
        <Paper classDATE="main-card">
          <Grid item xs={8} className="info" marginTop={1}>
            <Typography variant="button" className="balance-info">
              Active Orders
            </Typography>
          </Grid>
          <CardContent>
            <Grid container>
              <OrderList orders={presentOrder} active={true} />
            </Grid>
          </CardContent>
        </Paper>
        <Paper classDATE="main-card1">
          <Grid item xs={8} className="info" marginTop={5}>
            <Typography variant="button" className="balance-info">
              {" "}
              Past Order
            </Typography>
          </Grid>
          <CardContent>
            <Grid container>
              <OrderList orders={pastOrder} active={false} />
            </Grid>
          </CardContent>
        </Paper>
      </Container>
    );
  }
  // _handleChange(event) {
  //   console.log(event.target.files[0].DATE, "image uploaded");
  //   if (event.target.files[0])
  //      { this._updateData(event.target.files[0]);  }
  //   console.log(this.state.image, "this is the url of image uploaded");
  // }
  // _handleUpdate() {
  //   this._updateData();
  // }
  check(item) {
    return item.proccessed;
  }
  check2(item) {
    return !item.proccessed;
  }
  async loadData() {
    const user = window.localStorage.getItem("userId");
    const res = await Plapi.Cart.getList(user);
    if (!res.error) {
      const past = res.filter(this.check);
      const newOrder = res.filter(this.check2);
      this.setState({ pastOrder:past , presentOrder:newOrder});
    }
  }
}
