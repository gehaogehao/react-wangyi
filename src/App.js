import React, { Component } from 'react'
import {Route,Switch,Redirect} from 'react-router-dom'
import index from './pages/index/index'
import sort from './pages/sort/sort'
import shop from './pages/shop/shop'
import car from './pages/car/car'
import personal from './pages/personal/personal'
import Footer from './components/footer/footer'
import './App.stylus'
export default class App extends Component {
  render() {
    return (
      <div className='app'>
        <Switch>
          <Route path="/index" component={index}></Route>
          <Route path="/sort" component={sort}></Route>
          <Route path="/shop" component={shop}></Route>
          <Route path="/car" component={car}></Route>
          <Route path="/personal" component={personal}></Route>
          <Redirect to="/index" />
        </Switch>
        <Footer></Footer>
      </div>
    )
  }
}

