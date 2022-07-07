import React, { Component } from "react";
import { Navigate } from "react-router";
import AppBar from "@mui/material/AppBar";
import Badge from "@mui/material/Badge";
import { styled, alpha } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import { Divider, Stack, Tooltip } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

//  import icons
import PixIcon from "@mui/icons-material/Pix";
import WidgetsIcon from "@mui/icons-material/Widgets";
import MenuIcon from "@mui/icons-material/Menu";
import { Note, Create, MailOutline } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

//import css
import "./header.css";
// api
import Plapi from "../../plapi";


const options = [
  { name: "LOGIN", url: "/login" },
  { name: "LOGOUT", url: "/logout" },
  { name: "PROFILE", url: "/profile" },
];


class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      cartLen:0 
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.getCart = this.getCart.bind(this);
  }
   componentDidMount(){
     this.getCart();
  }
  
  render() {
    const { anchorEl,cartLen } = this.state;
    const open = Boolean(anchorEl);
    return (
      <Box sx={{ flexGrow: 1, md: 6 }}>
        <AppBar position="static" className="header">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={(event) => {
                this.handleClick(event);
              }}
            >
              <WidgetsIcon className="header-Icon" fontSize="medium" />
            </IconButton>
            <Menu
              size="small"
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={this.handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <Stack textAlign="left">
                <Button
                  className="menu-buttons"
                  size="small"
                  href="/home"
                  onClick={this.handleClose}
                >
                  Home
                </Button>
                <Divider />
                <Button
                  className="menu-buttons"
                  size="small"
                  href="/orders"
                  onClick={this.handleClose}
                >
                  Orders
                </Button>
                <Divider />
                <Button
                  className="menu-buttons"
                  size="small"
                  href="/items"
                  onClick={this.handleClose}
                >
                  Items
                </Button>
                <Divider />
                <Button
                  className="menu-buttons"
                  size="small"
                  href="/profile"
                  onClick={this.handleClose}
                >
                  Profile
                </Button>
              </Stack>
            </Menu>
            <div className="util-icon">
              <Tooltip title="Cart">
                <IconButton aria-label="create" size="3x" href="/cart">
                  <Badge
                    badgeContent={cartLen}
                    color="secondary"
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "right",
                    }}
                    fontSize="small"
                    
                  >
                    <ShoppingCartIcon color="inherit" className="header-Icon" />
                  </Badge>
                </IconButton>
              </Tooltip>
              <Tooltip title="Account">
                <IconButton aria-label="Account" size="3x" href="/profile">
                  <AccountCircleIcon color="inherit" className="header-Icon" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Logout">
                <IconButton
                  aria-label="Logout"
                  size="3x"
                  onClick={this.handleLogout}
                  href="/"
                >
                  <LogoutIcon color="inherit" className="header-Icon" />
                </IconButton>
              </Tooltip>
            </div>
          </Toolbar>
        </AppBar>
      </Box>
    );
  }

  /**
   * Helper to handle logout
   */
  // async _logout() {
  //   const res = await ZcAppAPI.User.logout();
  //   if (res.status === 200) {
  //     // I think this could be moved to User's logout function
  //     // remove the pl_access_token from the local storage
  //     localStorage.removeItem("pl_access_token");
  //     // redirect to login page or a logout page in case we create one.
  //   }
  // }
  handleClose() {
    this.setState({ anchorEl: null });
    console.log(this.state);
  }
  handleClick(event) {
    this.setState({ anchorEl: event.currentTarget });
  }
  handleLogout() {
    console.log("hey i am called ");
    window.localStorage.removeItem("pl_access_token");
    window.localStorage.removeItem("userId");
    window.localStorage.removeItem("number");
  }
  async getCart(){
    const res = await Plapi.Cart.getFilterList();
    if (!res.error) {
      this.setState({ cartLen: res[0].items.length });
      this.setState({ loaded: true });
    }
  }
}

export default Header;
