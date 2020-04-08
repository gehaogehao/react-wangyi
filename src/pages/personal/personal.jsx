import React, { Component } from 'react'
import "./css/personal.stylus"
import yanxuan from '../../static/personal/yanxuan.png'

export default class Personal extends Component {
  state={
    isLogin:true,
    isPhone:false,
    isEmail:false,
  }

  phoneChange=()=>{
    this.setState({
      isLogin:false,
      isPhone:true,
      isEmail:false,
    })
  }
  emailChange=()=>{
    this.setState({
      isLogin:false,
      isPhone:false,
      isEmail:true
    })
  }
  otherChange=()=>{
    this.setState({
      isLogin:true,
      isPhone:false,
      isEmail:false,
    })
  }

  render() {
    const {isLogin,isPhone,isEmail} = this.state
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
        <div className="loginMain"  style={{display: `${isLogin?'block':'none'}`}}>
          <div className="img">
            <img className="logo" src={yanxuan} alt=""/>
          </div>
          <div className="loginMethods">
            <div className="loginIphoneLogin" onClick={this.phoneChange}>
              <i className="iconfont icon-shouji"></i>
              <span>手机号快捷登录</span>
            </div>
            <div className="loginEmailLogin" onClick={this.emailChange}>
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

        <div className="iphoneContainer" style={{display: `${isPhone?'block':'none'}`}}>
          <div className="img">
            <img src={yanxuan} alt="" />
          </div>
          <div className="loginBox">
            <div className="phone">
              <input type="text" placeholder="请输入手机号"/>
            </div>
            <div className="code">
              <input type="text"  placeholder="请输入验证码"/>
              <div className="getCode">获取验证码</div><br/>
            </div>
            <div className="problem">
              <span>遇到问题？</span>
              <span className="text">使用密码验证登录</span>
            </div>
            <div className="login">登录</div>
            <div className="agree">
              <input type="checkbox"/>
              <div>我同意<span>《服务条款》</span>和<span>《网易隐私政策》</span></div>
            </div>
            <div className="otherLoginWay" onClick={this.otherChange}>其他方式登录></div>
          </div>
        </div>

        <div className="emailContainer" style={{display: `${isEmail?'block':'none'}`}}>
          <div className="img">
            <img src="./yanxuan.png" alt="" />
          </div>
          <div className="input-groups">
            <form action="">
                <div className="email">
                  <input type="text" placeholder="邮箱帐号"/>
                </div>
                <div className="password">
                  <input type="password" placeholder="密码" />
                </div>
                <div className="submit"><input type="submit" value="登录"/></div>
            </form>
          </div>
          <div className="emailFooter" onClick={this.otherChange}>
            <span>其他登录页面</span>
            <i className="iconfont icon-jiantou"></i>
          </div>
        </div>

      </div>
    )
  }
}
