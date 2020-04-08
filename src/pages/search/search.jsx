import React, { Component } from 'react'
import './css/search.stylus'
import {searchList,searchData} from '../../api'
import {Link} from 'react-router-dom'

export default class search extends Component {
  state={
    searchList:[],
    kwd:"",
    searchData:[],
    isSearch:false
  }

  getSearch=async()=>{
    let result = await searchList()
    if(result.code === '200'){
      this.setState({
        searchList:result.data.hotKeywordVOList
      })
    }
  }

  getKwd=()=>{
    const {isSearch} = this.state
    let newSearch
    let kwd = this.input.value
    this.setState({
      kwd
    })
    if(!kwd){
      newSearch = !isSearch
      return
    } 
    this.timeId && clearTimeout(this.timeId)
    this.timeId = setTimeout(async()=>{
      let result = await searchData(kwd)
      newSearch = !isSearch
      if(result.code === '200'){
        this.setState({
          searchData:result.data,
          isSearch:newSearch
        })
      }
    },300)
  }

  componentDidMount(){
    this.getSearch()
  }

  render() {
    const {searchList,searchData,isSearch,kwd} = this.state
    return (
      <div className="searchContainer">
        <div className="searchHeader">
          <i className="iconfont icon-sousuo1"></i>
          <input type="text" ref={(input)=>{this.input = input}} onKeyUp={this.getKwd} placeholder="全品类8折券，周年庆放肆购"/>
          <span><Link to="/">取消</Link></span>
        </div>
        <div className="searchFooter" style={{display:`${!isSearch || !kwd?'block':'none'}`}}>
          <h3>热门搜索</h3>
          <ul>
            {
              searchList.map((item,index)=>{
                return <li key={index}>{item.keyword}</li>
              })
            }
          </ul>
        </div>
          {
            searchData.map((item,index)=>{
              return(
                <div className="searchData" key={index} style={{display:`${!isSearch || !kwd?'none':'block'}`}}>
                  <span>{item}</span>
                  <div className="xian"></div>
                </div> 
              )
            })
          } 
      </div>
    )
  }
}
