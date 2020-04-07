import React, { Component } from 'react'
import './css/sort.stylus'
import {categoryL1List,categoryL2List} from '../../api'
import BScroll from 'better-scroll'

export default class Sort extends Component {

  state={
    categoryL1List:[],
    leftNav:0,
    categoryL2List:[],
    isCategoryL2List:false
  }

  getCategoryL1List=async ()=>{
    let result = await categoryL1List()
    if(result.code === 200){
      this.setState({
        categoryL1List:result.data.categoryL1List
      })
    }
    this.leftScroll()
    this.getCategoryL2List(this.state.categoryL1List[0].id)
  }

  getCategoryL2List=async(id)=>{
    let result = await categoryL2List(id)
    if(result.code === 200){
      this.setState({
        categoryL2List:result.data.categoryList || result.data.subCateList,
        isCategoryL2List:true
      })
    }
    this.rightScroll()
  }

  componentDidMount(){
    this.getCategoryL1List()
  }
  //左侧滑动
  leftScroll=()=>{
    new BScroll(this.leftWrap,{
       scrolly: true,
       probeType: 3,
       click:true
     })
   }
   //右侧滑动
   rightScroll=()=>{
    new BScroll(this.rightContainer,{
      scrolly: true,
      probeType: 3,
      click:true
    })
  }
   //左侧选中
   changeLeft=(index,id)=>{
     this.setState({
      leftNav:index,
      isCategoryL2List:false
     })
     this.getCategoryL2List(id)
   }

  render() {
    const {categoryL1List,leftNav,categoryL2List,isCategoryL2List} = this.state
    return (
      <div className="sortContainer">
        <div className="sortHeader">
          <div className="search">
            <i className="iconfont icon-sousuo1"></i>
            搜索商品,共35937件好物
            </div>
        </div>

        <div className="sortFooter">
          <div className="left" ref={(div)=>{this.leftWrap=div}}>
            <ul className="leftList">
              {
                categoryL1List.length && categoryL1List.map((item,index)=>{
                  return <li className={`listItem ${index === leftNav ?'active':''}`} key={index} onClick={()=>{this.changeLeft(index,item.id)}}>{item.name}</li>
                })
              }
            </ul>
          </div>
          
          <div className="sortRight">
            <div className="rightContainer" ref={(div)=>{this.rightContainer=div}}>
              <div className="container">
                <div className="img">
                  <img src={isCategoryL2List ? categoryL2List[0].wapBannerUrl:''} alt=""/>
                </div>
                <div className="imgList">
                  {
                    categoryL2List.map((item,index)=>{
                      return(
                        <div className="imgItem" key={index}>
                          <img src={item.bannerUrl || item.wapBannerUrl }alt=""/>
                          <span>{item.name}</span>
                        </div>
                      )
                    })
                  }
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    )
  }
}
