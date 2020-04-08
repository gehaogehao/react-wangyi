import React, { Component } from 'react'
import "./css/index.stylus"
import Logo from "../../static/index/logo.png"
import Hongbao from '../../static/index/hongbao.png'
import Bottoom from '../../static/index/bottom.png'
import {indexCategory,focusList} from '../../api'
import BScroll from 'better-scroll'
import Swiper from 'swiper'
import 'swiper/css/swiper.min.css'
import {Link} from 'react-router-dom'

export default class Index extends Component {
  state={
    indexCategoryList:[],
    navIndex:0,
    isBottom:true,
    isShow:0,
    focusList:[],
    policyDescList:[],
    kingKongList:[],
    floorList:[],
    floor:false,
    indexActivityModuleList:[],
    isIndex:false,
    categoryList:[],
    itemList:[],
    newItemList:[],
    sceneLightShoppingGuideModule:[]
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
    this.mainScroll()
  }
  //导航滑动
  navScroll = ()=>{
    new BScroll(this.headerNavScroll,{
      scrollX: true,
      probeType: 3,
      click:true
    })
  }
  //主体滑动
  mainScroll = ()=>{
    this.scroll = new BScroll(this.mainWayp,{
      scrolly: true,
      probeType: 3,
      click:true,
      mouseWheel:true
    })
  }
  //导航选中
  changeIndex=(index)=>{
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
  //轮播请求
  getFocusList=async ()=>{
    let result = await focusList()
    if(result.code === 200){
      this.setState({
        focusList:result.data.focusList,
        policyDescList:result.data.policyDescList,
        kingKongList:result.data.kingKongModule.kingKongList,
        floorList:result.data.bigPromotionModule.floorList,
        floor:true,
        indexActivityModuleList:result.data.indexActivityModule,
        isIndex:true,
        categoryList:result.data.categoryHotSellModule.categoryList,
        itemList:result.data.flashSaleModule.itemList,
        newItemList:result.data.newItemList.slice(0,6),
        sceneLightShoppingGuideModule:result.data.sceneLightShoppingGuideModule
      })
    }
    new Swiper('.swiper-container', {
      loop: true,
      pagination: {
        el: '.swiper-pagination',
      },
   })
  }
  //回到顶部
  goTop=()=>{
    this.scroll.scrollTo(0,0,1000)
  }
  //搜索
  changeSearch=()=>{
    this.setState({
      isSearch:true
    })
  }

  componentDidMount(){
    this.getIndexCategory()
    this.getFocusList()
    this.mainScroll()
  }
  render() {
    const {indexCategoryList,navIndex,isBottom,isShow,focusList,policyDescList,kingKongList,floorList,floor,
           indexActivityModuleList,isIndex,categoryList,itemList,newItemList,sceneLightShoppingGuideModule} = this.state
      return (
        <div className="indexContainer">
          <div className="indexHeader">
            <div className="headerSearch">
              <img className="logo" src={Logo} alt="Logo"/>
                <div className="search">
                  <Link to="/search">
                    <i className="iconfont icon-sousuo1"></i>
                    <span>搜索商品,共24851件好物</span>
                  </Link>
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
              <div className="all" style={{display: `${isBottom?'none':'block'}`}}>全部频道</div>
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
          <div className="mainContainer" ref={(div)=>{this.mainWayp = div}}>
            <div className="mainItem">
              <div className="swiper-container swiperContainer">
                  <div className="swiper-wrapper swiperContainer">
                    {
                      focusList.map(item=>{
                        return (
                          <div className="swiper-slide swiperItem" key={item.id}>
                            <img src={item.picUrl} alt=""/>
                          </div>
                        )
                      })
                    }
                  </div>
                  <div className="swiper-pagination"></div>
              </div>
              <div className="msgList">
                <ul className="msgUl">
                  {
                    policyDescList.map((item,index)=>{
                      return(
                        <li className="msgLi" key={index}>
                          <img className="icon" alt="" src={item.icon}/>
                          <span>{item.desc}</span>
                        </li>
                      )
                    })
                  }
                </ul>
              </div>
              <div className="kingKongList">
                <ul className="kingkongUl">
                  {
                    kingKongList.map((item,index)=>{
                      return(
                        <li className="kingkongLi" key={index}>
                          <img src={item.picUrl} alt="" />
                          <span>{item.text}</span>
                        </li>
                      )
                    })
                  }
                </ul>
              </div>    
              <div className="zhounianqing">
                <div className="itemContainer">
                  <img src={floor ? floorList[0].cells[0].picUrl :''} alt=""/>
                  <img className="zhongjianImg" src={floor ? floorList[2].cells[0].picUrl : ''} alt=""/>
                </div>
                <div className="zhongjian">
                  <img src={floor ? floorList[1].cells[0].picUrl : ''} alt=""/>
                </div>
                <div className="zhongjianBottom">
                  <div className="bottomItem">
                    <img src={floor ? floorList[2].cells[0].picUrl : ''} alt=""/>
                  </div>
                  <div className="bottomItem">
                    <img src={floor ? floorList[3].cells[0].picUrl : ''} alt=""/>
                  </div>
                  <div className="bottomItem">
                    <img src={floor ? floorList[3].cells[1].picUrl : ''} alt=""/>
                  </div>
                </div>
              </div>
              <div className="newPeople">
                <div className="newHeader">
                  <span>— 新人专享 —</span>
                </div>
                <div className="newFooter">
                  <div className="left">
                    <span>新人专享礼包</span>
                    <img src={Hongbao} alt=""/>
                  </div>
                  <div className="right">
                    <div className="top">
                      <div className="title">
                        <span>{isIndex ? indexActivityModuleList[0].title : ''}</span>
                        <span className="name">{isIndex ? indexActivityModuleList[0].subTitle : ''}</span>
                      </div>
                      <img src={isIndex ? indexActivityModuleList[0].picUrl : ''} alt=""/>
                    </div>
                    <div className="bottom">
                      <div className="title">
                        <span>{isIndex ? indexActivityModuleList[1].title : ''}</span>
                        <span className="name">{isIndex ? indexActivityModuleList[1].tag : ''}</span>
                      </div>
                      <img src={Bottoom} alt=""/>
                    </div>
                  </div>
                </div>
              </div>
              <div className="leimu">
                <div className="header">
                  <span>类目热销榜</span>
                </div>
                <div className="sellList">
                  {
                    categoryList.map((item,index)=>{
                      return (
                        <div className="sellItem" key={index}>
                          <p className="text">{item.categoryName}</p>
                          <img src={item.picUrl} alt=""/>
                        </div>
                      )
                    })
                  }
                </div>
              </div>
              <div className="shop">
                <div className="shopHeader">
                  <div className="shopLeft">
                    <span>限时购</span>
                    <div className="time">
                      <span>00</span>
                      <span className="dian">:</span>
                      <span>40</span>
                      <span className="dian">:</span>
                      <span>52</span>
                    </div>
                  </div>
                  <div className="shopRight">
                    <span>更多</span>
                    <i className="iconfont icon-jiantou"></i>
                  </div>
                </div>
                <div className="shopFooter">
                  {
                    itemList.map((item,index)=>{
                      return(
                        <div className="shopItem" key={index}>
                          <div className="img">
                            <img src={item.picUrl} alt=""/>
                          </div>
                          <div className="price">
                            <div className="newPrice">￥{item.activityPrice}</div>
                            <s className="oldPrice">￥{item.originPrice}</s>
                          </div>
                        </div>
                      )
                    })
                  }
                </div>
              </div>
              <div className="newShop">
                <div className="newShopHeader">
                  <div className="newShopLeft">
                    <span>新品首发</span>
                  </div>
                  <div className="newShopRight">
                    <span>更多</span>
                    <i className="iconfont icon-jiantou"></i>
                  </div>
                </div>
                <div className="newShopFooter">
                  {
                    newItemList.map((item,index)=>{
                      return(
                        <div className="newShopItem" key={index}>
                          <div className="img">
                            <img src={item.listPicUrl} alt=""/>
                          </div>
                          <p className="msg">{item.simpleDesc}</p>
                          <div className="jiage">￥{item.retailPrice}</div>
                          {/* <div className="shuoming">411狂欢价</div> */}
                        </div>
                      )
                    })
                  }
                </div>
              </div>
              <div className="market">
                {
                  sceneLightShoppingGuideModule.map((item,index)=>{
                    return(
                      <div className="marketItem" key={index}>
                        <span className="title">{item.styleItem.title}</span>
                        <span className="prom">{item.styleItem.desc}</span>
                        <img src={item.styleItem.picUrlList[0]} alt=""/>
                        <img src={item.styleItem.picUrlList[1]} alt=""/>
                      </div>
                    )
                  })
                }
              </div>
              <div className="footerWrap">
                <div className="db">
                  <div className="app">下载app</div>
                  <div className="computer">电脑版</div>
                </div>
                <div className="copyRight">
                  <span>网易公司版权所有  1997-2020</span>
                  <br/>
                  <span>食品经营许可证：JY13301080111719</span>
                </div>
              </div>
            </div>
          </div> 
          {/* <!-- 遮罩 --> */}
          <div className="mackBottom" style={{display: `${isBottom?'none':'block'}`}}></div>
          {/* <!-- 回到顶部 --> */}
          <div className="goTop">
            <i className="iconfont icon-jiantouxiangshang" onClick={this.goTop}></i>
          </div> 
        </div> 
      )
  }
}
