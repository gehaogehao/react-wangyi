import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import "./css/footer.stylus"

export default class Footer extends Component {
  render() {
    return (
      <div className="footer">
        <ul className="footerUl">
          <Link to="/index" className="footerLi">
            <i className="iconfont icon-shouye"></i>
            <span>首页</span>
          </Link>
          <Link to="/sort" className="footerLi">
            <i className="iconfont icon-fenlei"></i>
            <span>分类</span>
          </Link>
          <Link to="/shop" className="footerLi">
            <i className="iconfont icon-maishui"></i>
            <span>值得买</span>
          </Link >
          <Link to="/car" className="footerLi">
            <i className="iconfont icon-gouwuche"></i>
            <span>购物车</span>
          </Link >
          <Link to="/personal" className="footerLi">
            <i className="iconfont icon-iconfontgerenzhongxin"></i>
            <span>个人</span>
          </Link >
        </ul>
      </div>
    )
  }
}
