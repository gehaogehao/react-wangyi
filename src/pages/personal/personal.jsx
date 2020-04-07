import React, { Component } from 'react'
import "./css/personal.stylus"
import yanxuan from '../../static/personal/yanxuan.png'

export default class Personal extends Component {
  render() {
    return (
      <div className="loginContainer">
         <div className="loginHeader">
          <i className="iconfont icon-fangzi"></i>
          <span>网易严选</span>
          <div className="iconRight">
            <i className="iconfont icon-sousuo1"></i>
            <i className="iconfont icon-gouwuche"></i>
          </div>
        </div>
        <div className="loginMain">
          <div className="img">
            <img className="logo" src={yanxuan} alt=""/>
          </div>
          <div className="loginMethods">
            <div className="loginIphoneLogin">
              <i className="iconfont icon-shouji"></i>
              <span>手机号快捷登录</span>
            </div>
            <div className="loginEmailLogin">
              <i className="iconfont icon-youxiang1"></i>
              <span>邮箱账号登录</span>
            </div>
          </div>
          <div className="loginFooter">
            <div className="wx">
              <i className="iconfont icon-weixin"></i>
              <span>微信</span>
            </div>
            <div className="qq">
              <i className="iconfont icon-qq1"></i>
              <span>QQ</span>
            </div>
            <div className="weibo">
              <i className="iconfont icon-xinlang1"></i>
              <span>微博</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
