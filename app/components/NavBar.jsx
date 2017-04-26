import React, {Component} from 'react'
import { Link } from 'react-router'
import Login from './Login'
import WhoAmI from './WhoAmI'
// import Cart from '../components/Cart'
import {connect} from 'react-redux'
/* -----------------    COMPONENT     ------------------ */

class Navbar extends React.Component {
  constructor(props) {
    super(props)
    console.log(props, 'here are we testing the props')
  }

  render() {
    return (
      <nav className="navbar navbar-default navbar-fixed-top">
        <div className="container-fluid">

          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"/>
              <span className="icon-bar"/>
              <span className="icon-bar"/>
            </button>
            <a className="navbar-brand" href="#">YA BOOK SHOPPER</a>
          </div>

          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav">
              {this.props.user ? <WhoAmI/> : <Login/>}
            </ul>
            <ul className="nav navbar-nav navbar-right">
              <li className="dropdown">
                <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">
                  <span className="glyphicon glyphicon-shopping-cart"/> {this.props.cart.totalOrderItems} - Items<span className="caret"/></a>
                <ul className="dropdown-menu dropdown-cart" role="menu">
                  {
                    this.props.cart.orderItems && this.props.cart.orderItems.map((orderItem) => {
                      return (
                        <li key={orderItem.id}>
                          <span className="item">
                            <span className="item-left">
                                <img src={orderItem.book.photoUrl} alt="" />
                                <span className="item-info">
                                    <span>{orderItem.book.title}</span>
                                    <span>$ {orderItem.priceAtPurchase/100}</span>
                                  <span><input type="number" value={orderItem.quantity}/></span>
                                </span>
                            </span>
                            <span className="item-right">
                                <button className="btn btn-xs btn-danger pull-right">x</button>
                            </span>
                        </span>
                          <hr/>
                        </li>
                      )
                    })
                  }
                  <li className="divider"/>
                  <li><a className="text-center" href="">View Cart</a></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}

function mapStateToProps(state) {
  return {
    cart: state.cart
  }
}

const NavContainer = connect(
  mapStateToProps
)(Navbar)

export default NavContainer
