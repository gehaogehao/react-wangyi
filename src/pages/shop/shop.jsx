import React, { Component } from 'react'
import './css/shop.stylus'
import logo from '../../static/shop/logo.png'
import beijing from '../../static/shop/beijing.png'
import Swiper from 'swiper'
import 'swiper/css/swiper.min.css'
import {navList,resultList} from '../../api'
import _ from "lodash"
import BScroll from "better-scroll"

export default class Shop extends Component {

  state={
    navList:[],
    resultList:[],
    page:0,
    computedArr2:[]
  }

  getNavList=async()=>{
    let result = await navList()
    if(result.code === "200"){
      this.setState({
        navList:_.chunk(result.data.navList,2)
      })
    }
    new Swiper('.swiper-container', {
      pagination: {
        el: '.swiper-pagination',
      },
      slidesPerView: 4,
   })
  }

  getResult=async()=>{
    let page = this.state.page
    let result = await resultList(++page)
    if(!this.computedArr1){
      this.computedArr1 = []
    }
    if(!this.state.computedArr2.length){
      if(result.code === '200'){
        this.setState({
          computedArr2 : result.data.result
        })
        this.state.computedArr2.forEach(item => {
          item.topics && item.topics.forEach(Item => { this.computedArr1.push(Item)});
        });
        this.getNewArr(this.computedArr1,page)
      }
    }else{
      this.state.computedArr2.forEach(item => {
        item.topics && item.topics.forEach(Item => { this.computedArr1.push(Item)});
      });
      this.getNewArr(this.computedArr1,page)
    }
  }

  getNewArr=(computedArr,page)=>{
    let arr1 = [];
    let arr2 = [];
      computedArr.forEach((item, index) => {
        if (index % 2 === 0) arr1.push(item);
        else arr2.push(item);
      });
      this.setState({
        resultList:[arr1, arr2],
        page
      })
    this.navScroll()
  }
  navScroll=()=>{
    const {computedArr2,page} = this.state
    let newPage = page
    if (this.scroll) {
      return
    }
    this.scroll = new BScroll(this.mainContainer, {
      scrolly: true,
      probeType: 3,
      click: true
    });
    this.scroll.on("scroll", pos => {
      if (pos.y <= this.scroll.maxScrollY) {
        this.timer && clearTimeout(this.timer);
        this.timer = setTimeout(async () => {
          let result = await resultList(++newPage)
          
          this.setState({
            computedArr2 : computedArr2.concat(result.data.result),
            page:newPage
          })
          this.getResult()
        }, 300);
      }
    });
  }

  componentDidMount(){
    this.getNavList()
    this.getResult()
  }

  render() {
    const {navList,resultList} = this.state
    return (
      <div className="shopContainer">
        <div className="shopHeader">
          <i className="iconfont icon-fangzi"></i>
          <span>值得买</span>
          <div className="iconRight">
            <i className="iconfont icon-sousuo1"></i>
            <i className="iconfont icon-gouwuche"></i>
          </div>
        </div>
        <div className="mainContainer" ref={(div)=>{this.mainContainer=div}}>
          <div className="mainItem">
            <div className="img">
              <img src={logo} alt='' className="logo" />
              <span>严选好物&nbsp;用心生活</span>
              <img src={beijing} alt='' className="bg" />
            </div>
          

            <div className="shopNav swiper-container">
              <div ref={(div)=>{this.mySwiper=div}} className="swiperList swiper-wrapper">
                  {
                    navList.map((item,index)=>{
                      return(
                        <div className="swiperItem swiper-slide" key={index}>
                          {
                            item.map((item,index)=>{
                              return(
                                <div key={index} className="item">
                                  <img src={item.picUrl} alt="" />
                                  <span className="title">{item.mainTitle}</span>
                                  <span className="name">{item.viceTitle}</span>
                                </div>
                              )
                            })
                          }
                        </div>
                      )
                    })
                  }
                  {/* <div className="swiper-pagination"></div> */}
              </div>
            </div>

            <div className="container">
              {
                resultList.map((item,index)=>{
                  return(
                    <div key={index}>
                      {
                        item.map((item,index)=>{
                          return(
                            <div className="containerItem" key={item.readCount+index}>
                              <div className="containerImg">
                                <img src={item.picUrl} alt='' />
                              </div>
                              <span className="title">{item.title}</span>
                              <div className="containerFooter">
                                <img src={item.avatar} alt="" className="avatar" />
                                <span className="nickName">{item.nickname}</span>
                                <div className="footerRight">
                                  <i className="iconfont icon-yanjing"></i>
                                  <span>{Math.floor(item.readCount / 1000)}k</span>
                                </div>
                              </div>
                            </div>
                          )
                        })
                      }
                    </div>
                  )
                })
              }
            </div>

          </div>
        </div>
      </div>
    )
  }
}
