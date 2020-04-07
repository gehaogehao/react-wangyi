import React, { Component } from 'react'
import "./css/car.stylus"
import car from '../../static/car/car.png'

export default class Car extends Component {
  render() {
    return (
      <div className="carContarner">
        <div className="carHeader">
          <span className="title">购物车</span>
          <span className="name">领劵</span>
        </div>
        <div className="carContent">
          <div className="carItem">
            <div></div>
            <span>30天无忧退货</span>
          </div>
          <div className="carItem">
            <div></div>
            <span>48小时快速退款</span>
          </div>
          <div className="carItem">
            <div></div>
            <span>满99元免邮费</span>
          </div>
        </div>
        <div className="carFooter">
          <img src={car} alt=""/>
          <div className="btn">登录</div>
        </div>
      </div>
    )
  }
}
