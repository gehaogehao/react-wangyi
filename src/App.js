import React, { Component } from 'react'
import {Route,Switch,Redirect,withRouter} from 'react-router-dom'
import index from './pages/index/index'
import sort from './pages/sort/sort'
import shop from './pages/shop/shop'
import car from './pages/car/car'
import personal from './pages/personal/personal'
import Footer from './components/footer/footer'
import Search from './pages/search/search'
import './App.stylus'


const App = class extends Component {

  render() {
    return (
      <div className='app'>
        <Switch>
          <Route path="/index" component={index}></Route>
          <Route path="/sort" component={sort}></Route>
          <Route path="/shop" component={shop}></Route>
          <Route path="/car" component={car}></Route>
          <Route path="/personal" component={personal}></Route>
          <Route path="/search" component={Search}></Route>
          <Redirect to="/index" />
        </Switch>
        <Footer></Footer>
      </div>
    )
  }
}

export default withRouter(App)
