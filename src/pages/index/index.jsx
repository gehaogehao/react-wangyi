import React, { Component } from 'react'
import "./css/index.stylus"
import Logo from "../../static/index/logo.png"
import {indexCategory} from '../../api'
import BScroll from 'better-scroll'

export default class Index extends Component {
  state={
    indexCategoryList:[],
    navIndex:0,
    isBottom:true,
    isShow:0
  }
  //nav导航请求
  getIndexCategory = async ()=>{
    let result = await indexCategory()
    if(result.code === 200){
      this.setState({
        indexCategoryList:result.data
      })
    }
    this.navScroll()
  }
  //导航滑动
  navScroll = ()=>{
    new BScroll(this.headerNavScroll,{
      scrollX: true,
      probeType: 3,
      click:true
    })
  }
  //导航选中
  changeIndex=(index)=>{
    console.log('--')
    this.setState({
      navIndex:index
    })
  }
  //箭头选中
  changeJianTou=()=>{
    let isBottom = !this.state.isBottom
    this.setState({
      isBottom
    })
  }
  //mack显示
  changeShow=(index)=>{
    this.setState({
      isShow:index
    })
  }

  componentDidMount(){
    this.getIndexCategory()
  }
  render() {
    const {indexCategoryList,navIndex,isBottom,isShow} = this.state
    return (
      <div className="indexContainer">
        <div className="indexHeader">
          <div className="headerSearch">
            <img className="logo" src={Logo} alt="Logo"/>
              <div className="search">
                <i className="iconfont icon-sousuo1"></i>
                <span>搜索商品,共24851件好物</span>
              </div>
              <div className="loginBtn">登录</div>
          </div>
          <div className="headerNav" ref={(ul)=>{this.headerNavScroll = ul}}>
            <ul className="scroll" style={{display: `${isBottom?'inline-block':'none'}`}}>
              {
                indexCategoryList.map((item,index) =>
                  <li className={`item ${index === navIndex ?'active':''}`} key={item.id} onClick={()=>{this.changeIndex(index)}}>{item.name}</li>
                )
              }
            </ul>
            <div className="all">全部频道</div>
          </div>
          <div className="jiantou" onClick={this.changeJianTou}>
            <i className={`iconfont ${isBottom?'icon-jiantou-xia':'icon-jiantouxiangshang'}`}></i>
          </div>
        </div >
        <div className="mack" style={{display: `${isBottom?'none':'block'}`}}>
            {
              indexCategoryList.map((item,index)=>
                <div className={`mackItem ${index === isShow ?'active':''}`} key={item.id} onClick={()=>{this.changeShow(index)}}>{item.name}</div>
              )
            }
          </div>
      </div> 
    )
  }
}
