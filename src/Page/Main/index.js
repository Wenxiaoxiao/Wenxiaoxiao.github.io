import React, { Component } from 'react';
import { Layout, Menu, Icon, Dropdown, Select, Input, Modal,Button,message } from 'antd';
import './main.less';
import './animate.less';
import {
  HashRouter as Router,//   BrowserRouter
  Route, Switch
} from 'react-router-dom';
import Controllers from '../../Base/Controllers';
import ReleaseModel from '../../Base/api';
// 图片资源
import home_logo from './images/home_logo.png';
import T_letter from "./images/T.png";
import H_letter from "./images/H.png";
import E_letter from "./images/E.png";
import img_logo from "./images/img_logo.png";
import CustomTips from '../../Base/CustomTips';
import down from './images/down.png';
import top from './images/top.png';
import down_1 from './images/down_1.png';
import top_1 from './images/top_1.png';
const { Header } = Layout;
const SubMenu = Menu.SubMenu;
const Option = Select.Option;
const LangConfig = {
  cn:{
    ShowTips:'没有上一个!',
    ShowTips1:'没有更多了!',
    BackToTop:'回顶部',
    NextPage:'下一页',
    PrevPage:'上一页',
    ShowTips3:'没有上一页了!',
    PrevOne:'上一个',
    NextOne:'下一个',
  },
  en:{
    ShowTips:'No Prev!',
    ShowTips1:'No More!',
    BackToTop:'BackToTop',
    NextPage:'Next Page',
    PrevPage:'Prev Page',
    ShowTips3:'No Prev!',
    PrevOne:'PrevOne',
    NextOne:'NextOne',
  }
}
class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showBackToTop:false,
      showBackToTop1:false,
      topMenuType:'cn',
      projectpage:0,
      eventpage:0,
      releaseType:'',
      loading: false,
      ProjectshowDetail:false,
      ContactshowDetail:false,
      EventNewsshowDetail:false,
      AboutUsshowDetail:false,
      ProjectList:[],
      ProjectListSmall:[],
      ProDetail:[],
      ProDetailDesc:"",
      ProjectShow:true,
      ContactShow:false,
      EventNewsShow:false,
      EventsList:[],
      EventsListSmall:[],
      AboutUsShow:false,
      ContactHtml:"",
      EventDeHtml:"",
      AboutUs_st:[],
      AboutUs_nd:"",
      PeopleList:[],
      SinglePerDetail:{
        intro:"",
        name:null,
        photo:""
      },
      showPeople:false,
      stopProjectScroll:false,
      stopEventScroll:false,
      ProDetailTitle:"",
      ProDetailDesc:"",
      ProPrevId:"",
      PronextId:"",
      EventPrevId:"",
      EventnextId:"",
    };
  }

  TitleClick = (name) => {
    console.log(name)
    let tmp = name+`Show`
    let tmpList = ['Project','Contact','EventNews','AboutUs']
    for(let i = 0;i<tmpList.length;i++){
      if(tmpList[i] === name){
        this.setState({[tmp]:true});
      }
      else{
        let tmp1 = tmpList[i]+`Show`
        this.setState({[tmp1]:false});
      }
      let showDetail = tmpList[i]+`showDetail`
      this.setState({[showDetail]:false})
    }
    if(name === 'AboutUs'){
      //this.setState({loading:true})
      Controllers.AboutUs(this.GetAboutUsMenu,'');
      const AboutUsTitleItem = document.getElementsByClassName('AboutUsTitleItem')
      for(let num = 0; num<this.state.AboutUs_st.length;num++){
        AboutUsTitleItem[num].classList.remove('chosed')
      }
    }
    if(name === 'EventNews'){
      //this.setState({loading:true})
      Controllers.EventNews(this.GetEventNewsList,this.state.eventpage);
    }
    if(name === 'Project'){
      //this.setState({loading:true})
      Controllers.ProjectList(this.GetProjectList,this.state.projectpage);//0代表页数，用来做瀑布流0=>第一页
    }
    if(name === 'Contact'){
      //this.setState({loading:true})
      Controllers.Contact(this.GetContact,'');
    }
  }

  _TypeMenu = (type) =>{
    const {AboutUsShow,EventNewsShow,ProjectShow,ContactShow} = this.state
    if(type==='cn'){
      const topMenu = (
        <div>
          <div className="clickItem" onClick={()=>this.TitleClick("AboutUs")} key="Main/AboutUs"style={{fontWeight:AboutUsShow?'bold':'normal'}}>关于我们</div>
          <div className="clickItem" onClick={()=>this.TitleClick("EventNews")} key="Main/EventNews" style={{fontWeight:EventNewsShow?'bold':'normal'}}>新闻动态</div>
          <div className="clickItem" onClick={()=>this.TitleClick("Project")} key="Main/Project" style={{fontWeight:ProjectShow?'bold':'normal'}}>设计作品</div>
          <div className="clickItem" onClick={()=>this.TitleClick("Contact")} key="Main/Contact" style={{fontWeight:ContactShow?'bold':'normal'}}>联络方法</div>
        </div>
      )
      return topMenu
    }
    else{
      const topMenu1 = (
        <div>
          <div className="clickItem" onClick={()=>this.TitleClick("AboutUs")} key="Main/AboutUs"style={{fontWeight:AboutUsShow?'bold':'normal'}}>ABOUT US</div>
          <div className="clickItem" onClick={()=>this.TitleClick("EventNews")} key="Main/EventNews" style={{fontWeight:EventNewsShow?'bold':'normal'}}>NEWS & EVENT</div>
          <div className="clickItem" onClick={()=>this.TitleClick("Project")} key="Main/Project" style={{fontWeight:ProjectShow?'bold':'normal'}}>PROJECTS</div>
          <div className="clickItem" onClick={()=>this.TitleClick("Contact")} key="Main/Contact" style={{fontWeight:ContactShow?'bold':'normal'}}>CONTACT</div>
        </div>
      )
      return topMenu1
    }
    
  }
  showMain = (type) =>{
    let logo = document.getElementsByClassName('logo')[0],
    home = document.getElementsByClassName('home')[0],
    mainTest = document.getElementsByClassName('mainTest')[0],
    clientWidth = document.getElementsByTagName('body')[0].offsetWidth;
    logo.classList.add('animated','fadeOut','logo1')
		mainTest.classList.remove('mainTest')
		mainTest.classList.add('animated','fadeIn','mainTest1')
		mainTest.classList.add('animated','fadeOut')
		//home.classList.remove('home')
		home.classList.add('animated','fadeIn','home1')
		// home.classList.remove('home1')
		let tmpLeft = clientWidth/2-54
		home.style.left = tmpLeft +'px';
		home.style.margin = 'auto 0';
		this.leftTHE(tmpLeft,2);
		if(type === 'en'){
      this.setState({topMenuType:'en'})
		}
		if(type === 'cn'){
      this.setState({topMenuType:'cn'})
		}
  }

  leftTHE = (long,time) =>{
    let home = document.getElementsByClassName('home')[0],
    clientHeight = document.getElementsByTagName('body')[0].offsetHeight;
    let THAT = this
    let timerOut = setTimeout(()=>{
			let tmpTime = time*100
			let tmp = parseInt(long/tmpTime)
			let timer = setInterval(()=>{
				long = parseInt(long - tmp)
				//console.log(long)
				if(long<68){
					long = 68
					clearInterval(timer);
					let tmpTop = clientHeight/2-25.5
					home.style.top = tmpTop +'px';
					home.style.margin = '0';
					THAT.TopTHE(tmpTop,2);
				}
				home.style.left = long +'px';
			},time)
		},2000)
  }

  TopTHE = (long,time) =>{
    let home = document.getElementsByClassName('home')[0],
    topMenu = document.getElementById('topMenu'),
    MainContent = document.getElementById('MainContent');
    let timerOut = setTimeout(()=>{
			let tmpTime = time*100
			let tmp = parseInt(long/tmpTime)
			let timer = setInterval(()=>{
				long = parseInt(long - tmp)
				//console.log(long)
				if(long<200){
					long = 200
					//主页显示出来
					MainContent.classList.remove('MainContent');
          MainContent.classList.add('MainContent1');
          //菜单展示出来
          topMenu.classList.remove('hide')
          clearInterval(timer);
          //this.setState({loading:true})
          Controllers.ProjectList(this.GetProjectList,this.state.projectpage);//0代表页数，用来做瀑布流0=>第一页
				}
				home.style.top = long +'px';
			},time)
		},2000)
  }

groupArray = (array, subGroupLength)=>{
    let index = 0;
    let newArray = [];
    while(index < array.length) {
        newArray.push(array.slice(index, index += subGroupLength));
    }
    return newArray;
}
  GetProjectList = (json) =>{
    this.setState({loading:false})
    //console.log('项目缩略图===================')
    //console.log(json)
    if(json.status === 0 && json.info === "success" && json.data.length>0){
      let tmp = this.state.ProjectList.concat(json.data)
      this.setState({ProjectList:tmp},()=>{
      let ProjectListSmall = this.groupArray(this.state.ProjectList,3);
      this.setState({ProjectListSmall:ProjectListSmall})
      })
    }
    else if(json.status === 0 && json.info === "success" && json.data.length===0){
      this.setState({stopProjectScroll:true,tipMessage:'加载完毕!'})
    }
  }
  GetEventNewsList = (json) =>{
    this.setState({loading:false})
    console.log('新闻缩略图==============')
    console.log(json)
    if(json.status === 0 && json.info === "success" && json.data.length>0){
      //let tmp = this.state.EventsList.concat(json.data)
      this.setState({EventsList:json.data},()=>{
        let EventsListSmall = this.groupArray(this.state.EventsList,3);
      this.setState({EventsListSmall:EventsListSmall})
      })
    }
    else if(json.status === 0 && json.info === "success" && json.data.length===0){
      this.setState({stopEventScroll:true,tipMessage1:'加载完毕!'})
    }
  }
  GoToProDetail = (id) =>{
    this.setState({loading:true},()=>{
      Controllers.ProjectDetail(this.GetProDetail,id)
    })
  }
  GoToEventDetail = (id) =>{
    this.setState({loading:true},()=>{
      Controllers.EventDetail(this.GetEventDetail,id)
    })
  }
  GoToDetail = (item,name) =>{
    let tmp = name+`showDetail`
    let tmpList = ['Project','Contact','EventNews','AboutUs']
    for(let i = 0;i<tmpList.length;i++){
      if(tmpList[i] === name){
        this.setState({[tmp]:true});
      }
      else{
        let tmp1 = tmpList[i]+`showDetail`
        this.setState({[tmp1]:false});
      }
    }
    //console.log(item);
    if(name === 'Project'){
      this.setState({loading:true},()=>{
        Controllers.ProjectDetail(this.GetProDetail,item.id)
      })
    }
    if(name === 'Contact'){

    }
    if(name === 'EventNews'){
      this.setState({loading:true})
      Controllers.EventDetail(this.GetEventDetail,item.id)
      // this.BackToTop('detailTarget1')
    }
    if(name === 'AboutUs'){
      //debugger
      const AboutUsTitleItem = document.getElementsByClassName('AboutUsTitleItem')
      for(let num = 1; num<this.state.AboutUs_st.length+1;num++){
        if(String(num) === item.id){
          AboutUsTitleItem[num-1].classList.add('chosed')
        }
        else{
          AboutUsTitleItem[num-1].classList.remove('chosed')
        }
      }
      
      this.setState({title_aboutus:false})
      if(item.id === '3'){
       // this.setState({loading:true})
        Controllers.AboutUslist(this.GetPeopleList,'')
        this.setState({showPeople:true})
      }
      else{
       // this.setState({loading:true})
        Controllers.AboutUsnd(this.GetAboutUs_nd,item.id)
        this.setState({showPeople:false})
      }
    }
    
  }

  GetAboutUs_nd = (json) =>{
    this.setState({loading:false})
    console.log(json)
    if(json.status === 0 && json.info === "success"){
      this.setState({AboutUs_nd:json.data.content})
    }
  }

  GetPeopleList = (json) =>{
    this.setState({loading:false})
    console.log(json)
    if(json.status === 0 && json.info === "success"){
      this.setState({
        PeopleList:json.data,
        SinglePerDetail:json.data[0]
      },()=>{
        const AboutUsPeopleItem = document.getElementsByClassName('AboutUsPeopleItem')
        for(let m = 0; m<AboutUsPeopleItem.length;m++){
          if(m === 0){
            AboutUsPeopleItem[m].classList.add('chosed')
          }
          else{
            AboutUsPeopleItem[m].classList.remove('chosed')
          }
        }
      })
    }
  }

  GetSinglePerson = (num) =>{
    //console.log(this.state.PeopleList[num])
    this.setState({SinglePerDetail:this.state.PeopleList[num],loading:false})
    const AboutUsPeopleItem = document.getElementsByClassName('AboutUsPeopleItem')
    for(let m = 0; m<AboutUsPeopleItem.length;m++){
      if(m === num){
        AboutUsPeopleItem[m].classList.add('chosed')
      }
      else{
        AboutUsPeopleItem[m].classList.remove('chosed')
      }
    }
  }

  GetProDetail = (json) =>{
    //console.log(json)
    if(json.status === 0 && json.info === "success"){
      this.setState({ProDetailTitle:json.data.title,
        ProDetail:json.data.items,
        ProDetailDesc:json.data.content,
        ProPrevId:json.data.prevId,
        PronextId:json.data.nextId},()=>{
          this.setState({loading:false},()=>{
            this.BackToTop('detailTarget')
          })
        })
    }
  }

  GetEventDetail = (json) =>{
    //console.log(json)
    // this.setState({loading:false})
    if(json.status === 0 && json.info === "success"){
      this.setState({
        EventDeHtml:json.data.content,
        EventPrevId:json.data.prevId,
        EventnextId:json.data.nextId},()=>{
          this.setState({loading:false},()=>{
            this.BackToTop('detailTarget1')
          })
        })
    }
  }

  GetContact = (json) =>{
    //console.log(json)
    this.setState({loading:false})
    if(json.status === 0 && json.info === "success"){
      this.setState({ContactHtml:json.data.content})
    }
  }

  GetAboutUsMenu = (json) =>{
    this.setState({loading:false})
    //console.log(json)
    if(json.status === 0 && json.info === "success"){
      this.setState({AboutUs_st:json.data})
    }
  }
  ScrollDetail = (ele) =>{
//监听滚动条事件
  let scrollHeight = document.getElementById(ele).scrollTop
  if(scrollHeight>500){
    this.setState({showBackToTop:true})
  }
  else{
    this.setState({showBackToTop:false})
  }
  }
  ScrollDetail1 = (ele) =>{
    //监听滚动条事件
  let scrollHeight = document.getElementById(ele).scrollTop
  if(scrollHeight>500){
    this.setState({showBackToTop1:true})
  }
  else{
    this.setState({showBackToTop1:false})
  }
  }
  componentDidMount(){
    let releaseType = ReleaseModel.ReleaseModel?ReleaseModel.Host_Formal.Inner:ReleaseModel.Host_Test.Inner
    // releaseType = '';
    this.setState({releaseType})
  }

  MouseOverImg = (num,name) =>{
    //console.log(num)
    const projectImgItem = document.getElementsByClassName('projectImgItem')
    const EventImgItem = document.getElementsByClassName('EventImgItem')
    if(name === 'projectImgItem'){
      if(projectImgItem[num].classList.contains('hideImgDetailByOut')){
        projectImgItem[num].classList.remove('hideImgDetailByOut')
        projectImgItem[num].classList.add('showImgDetailByHover')
      }
    }
    if(name === 'EventImgItem'){
      if(EventImgItem[num].classList.contains('hideImgDetailByOut')){
        EventImgItem[num].classList.remove('hideImgDetailByOut')
        EventImgItem[num].classList.add('showImgDetailByHover')
      }
    }
    
  }

  MouseOutImg = (num,name) =>{
    //console.log(num)
    const projectImgItem = document.getElementsByClassName('projectImgItem')
    const EventImgItem = document.getElementsByClassName('EventImgItem')
    if(name === 'projectImgItem'){
      if(projectImgItem[num].classList.contains('showImgDetailByHover')){
        projectImgItem[num].classList.remove('showImgDetailByHover')
        projectImgItem[num].classList.add('hideImgDetailByOut')
      }
    }
    if(name === 'EventImgItem'){
      if(EventImgItem[num].classList.contains('showImgDetailByHover')){
        EventImgItem[num].classList.remove('showImgDetailByHover')
        EventImgItem[num].classList.add('hideImgDetailByOut')
      }
    }
    
  }

  GoPrevPage = (name) =>{
    const {topMenuType} = this.state
    if(name === 'project'){
      let tmp = this.state.projectpage-1
      if(tmp<0){
        message.info(topMenuType==='cn'?LangConfig.cn.ShowTips3:LangConfig.en.ShowTips3);
      }
      else{
        this.setState({
          projectpage:this.state.projectpage-1
        },()=>{
          const groupList1 = document.getElementsByClassName('groupList')[0];
         this.TopGroupList(groupList1,(this.state.projectpage+1)*(-240),this.state.projectpage*(-240))
        })
      }
    }
    if(name === 'event'){
      let tmp = this.state.eventpage-1
      if(tmp<0){
        message.info(topMenuType==='cn'?LangConfig.cn.ShowTips3:LangConfig.en.ShowTips3);
      }
      else{
        this.setState({
          eventpage:this.state.eventpage-1
        },()=>{
          const eventList = document.getElementsByClassName('eventList')[0];
         this.TopGroupList(eventList,(this.state.eventpage+1)*(-240),this.state.eventpage*(-240))
        })
      }
    }
  }
  GoNextPage = (name) =>{
    const {topMenuType} = this.state
    if(name === 'project'){
      const totalLength = document.getElementsByClassName('groupList').length
      let tmp = this.state.projectpage+1
      if(tmp>=totalLength){
        message.info(topMenuType==='cn'?LangConfig.cn.ShowTips1:LangConfig.en.ShowTips1)
      }
      else{
        this.setState({
          projectpage:this.state.projectpage+1
        },()=>{
          //console.log(this.state.projectpage)
          const groupList1 = document.getElementsByClassName('groupList')[0];
          //console.log(groupList1);
          this.TopGroupList(groupList1,(this.state.projectpage-1)*(-240),this.state.projectpage*(-240))
        })
      }
    }
    if(name === 'event'){
      const totalLength = document.getElementsByClassName('eventList').length
      let tmp = this.state.eventpage+1
      if(tmp>=totalLength){
        message.info(topMenuType==='cn'?LangConfig.cn.ShowTips1:LangConfig.en.ShowTips1)
      }
      else{
        this.setState({
          eventpage:this.state.eventpage+1
        },()=>{
          const eventList1 = document.getElementsByClassName('eventList')[0];
          this.TopGroupList(eventList1,(this.state.eventpage-1)*(-240),this.state.eventpage*(-240))
        })
      }
    }
  }

  TopGroupList = (ele,start,end)=>{
    //ele.style.marginTop = start +'px'
    let tmp = start;
    let inter = (end - start)/10
    //console.log('inter=='+inter)
    let timer = setInterval(()=>{
      tmp = tmp + inter
      // console.log('tmp==='+tmp)
      // console.log('end==='+end)
      if(tmp===end){
        //console.log('清除')
        clearInterval(timer);
      }
      ele.style.marginTop = tmp +'px'
    },100)
  }
  BackToTop = (ele) =>{//detailTarget
    //debugger
    let scrollHeight = document.getElementById(ele).scrollHeight
    //console.log(scrollHeight)
    document.getElementById(ele).scrollTop = 0
  }
  ShowTips = (tip)=>{
    message.info(tip);
  }
  
  render() {
    const {ProjectList,ProDetail,ProjectShow,ContactShow,EventsList,EventNewsShow,AboutUsShow,
      ProjectshowDetail,ContactshowDetail,EventNewsshowDetail,AboutUsshowDetail,ContactHtml,EventDeHtml,
      AboutUs_st,AboutUs_nd,PeopleList,showPeople,SinglePerDetail,releaseType,
      ProDetailTitle,ProDetailDesc,ProPrevId,PronextId,EventPrevId,EventnextId,
      ProjectListSmall,EventsListSmall,topMenuType} =this.state
      //console.log(`releaseType=${releaseType}`)
      return (
      <div className="layout_box">
        <CustomTips loading={this.state.loading}/>
        <div className="box">
          <div className="animated fadeIn logo">
            <img src={home_logo}/>
            <div className="animated fadeIn1 title">
              <div className="clickItem" onClick={()=>this.showMain('en')}>ENGLISH </div>
              <div className="clickItem" onClick={()=>this.showMain('cn')}>中文</div>
            </div>
          </div>
          <div className="animated fadeIn mainTest">
            <div>
              <img src={T_letter} className="img1"/>
              <img src={H_letter} className="img2"/>
              <img src={E_letter} className="img3"/>
            </div>
          </div>
          <div className="animated fadeIn home">
            <img src={img_logo}/>
          </div>
          <div className="animated fadeIn MainContent" id="MainContent">
            <div id="topMenu" className="hide">
            {this.state.topMenuType === 'cn'?this._TypeMenu('cn'):this._TypeMenu('en')}
            </div>
            <div id="contentBox">
            <div className="Wrapper_Content" id="Wrapper_Content">
            {/* Projects */}
              <div id="projectImg" className="projectImg animated fadeIn2" style={{display:ProjectShow && !ProjectshowDetail ?'inline-block':'none'}}>
              {/* <CustomTips type="prev" prevMessage={this.state.prevMessage} GoToPrevPage = {()=>this.GoToPrevPage('project')}/> */}
              <div className="PrevBtn" title={topMenuType==='cn'?LangConfig.cn.PrevPage:LangConfig.en.PrevPage} onClick={()=>this.GoPrevPage('project')}>
              <img src={top_1}/>
              <div className="animated_bounce updownbounce infinite_bounce"></div>
              <div style={{marginTop:'2px'}} className="animated_bounce updownbounce1 infinite_bounce"></div>
              </div>
              {
                ProjectListSmall.map((item,i)=>{
                  return <div key={i} className="groupList">
                          {item.map((it,idx)=>{
                            return <div key={idx+it.img} className="imgBox clickItem projectImgItem hideImgDetailByOut" 
                            onMouseOver={()=>this.MouseOverImg(idx+i*3,'projectImgItem')} 
                            onMouseOut={()=>this.MouseOutImg(idx+i*3,'projectImgItem')} onClick={()=>this.GoToDetail(it,'Project')}>
                            <img src={releaseType+it.img}/>
                            <div className="title"><span>{it.name}</span></div>
                            <div className="mask"></div>
                           </div>
                          })}
                  </div>
                })
              }
              <div className="NextBtn" title={topMenuType === 'cn'?LangConfig.cn.NextPage:LangConfig.en.NextPage} onClick={()=>this.GoNextPage('project')}>
              <div className="animated_bounce updownbounce1 infinite_bounce"></div>
              <div style={{marginTop:'2px'}} className="animated_bounce updownbounce infinite_bounce"></div>
              <img src={down_1}/>
              </div>
              </div>
              <div className="projectDetail animated fadeIn2" style={{display:ProjectShow && ProjectshowDetail?'block':'none',width:'1000px',height:'750px',overflow:'auto',marginTop:'-100px',position:'absolute',zIndex:'9999'}}>
                <div id="detailTarget" onScroll={()=>this.ScrollDetail('detailTarget')} style={{width:'1000px',paddingRight:'10px',height:'750px',overflow:'auto',position:'absolute',zIndex:'9999'}}>
                  <div>{ProDetailTitle}</div>
                  {ProDetail.map((item,i)=>{
                    if(i === 0){
                      return <div key={i}>
                              <div className="prodetailImg"><img src={releaseType+item.src}/></div>
                              <div dangerouslySetInnerHTML={{__html:ProDetailDesc}}></div>
                            </div>
                    }
                    else{
                      return <div key={i} className="prodetailImg"><img src={releaseType+item.src}/></div>
                    }
                  })}
                  <div type="default" style={{display:this.state.showBackToTop?'block':'none'}} className="BackToTop" onClick={()=>this.BackToTop('detailTarget')}>{topMenuType==='cn'?LangConfig.cn.BackToTop:LangConfig.en.BackToTop}</div>
                  <div type="default" className="ProPrevId" onClick={ProPrevId===""||ProPrevId===null?()=>this.ShowTips(topMenuType==='cn'?LangConfig.cn.ShowTips:LangConfig.en.ShowTips):()=>this.GoToProDetail(ProPrevId)}>{topMenuType==='cn'?LangConfig.cn.PrevOne:LangConfig.en.PrevOne}</div>
                  <div type="default" className="PronextId" onClick={PronextId===""||PronextId===null?()=>this.ShowTips(topMenuType==='cn'?LangConfig.cn.ShowTips1:LangConfig.en.ShowTips1):()=>this.GoToProDetail(PronextId)}>{topMenuType==='cn'?LangConfig.cn.NextOne:LangConfig.en.NextOne}</div>
                </div>
              </div>
              {/* EventNews */}
              <div className="projectImg animated fadeIn2" style={{display:EventNewsShow && !EventNewsshowDetail ? 'inline-block':'none'}}>
              {/* <CustomTips type="prev" prevMessage={this.state.prevMessage1} GoToPrevPage = {()=>this.GoToPrevPage('event')}/> */}
              <div className="PrevBtn" title={topMenuType==='cn'?LangConfig.cn.PrevPage:LangConfig.en.PrevPage} onClick={()=>this.GoPrevPage('event')}>
              <img src={top_1}/>
              <div className="animated_bounce updownbounce infinite_bounce"></div>
              <div style={{marginTop:'2px'}} className="animated_bounce updownbounce1 infinite_bounce"></div>
              </div>
              {
                EventsListSmall.map((item,i)=>{
                  return <div key={i} className="eventList">
                          {item.map((it,idx)=>{
                            return <div key={idx+it.img} className="imgBox clickItem EventImgItem hideImgDetailByOut" 
                            onMouseOver={()=>this.MouseOverImg(idx+i*3,'EventImgItem')} 
                            onMouseOut={()=>this.MouseOutImg(idx+i*3,'EventImgItem')} 
                            onClick={()=>this.GoToDetail(it,'EventNews')}>
                            <img src={releaseType+it.img}/>
                            <div className="title"><span>{it.title}</span></div>
                            <div className="mask"></div>
                           </div>
                          })}
                  </div>
                })
              }
              <div className="NextBtn" title={topMenuType === 'cn'?LangConfig.cn.NextPage:LangConfig.en.NextPage} onClick={()=>this.GoNextPage('event')}>
              <div className="animated_bounce updownbounce1 infinite_bounce"></div>
              <div style={{marginTop:'2px'}} className="animated_bounce updownbounce infinite_bounce"></div>
              <img src={down_1}/>
              </div>
              {/* <CustomTips type="next" tipMessage={this.state.tipMessage1} GoToNextPage = {()=>this.GoToNextPage('event')}/> */}
              </div>
              <div className="projectDetail animated fadeIn2"  style={{display:EventNewsShow && EventNewsshowDetail?'block':'none',position:'absolute',zIndex:'999',width:'1000px',height:'750px',overflow:'auto',marginTop:'-100px'}}>
              <div id="detailTarget1" onScroll={()=>this.ScrollDetail1('detailTarget1')} style={{width:'1000px',paddingRight:'10px',height:'750px',overflow:'auto',position:'absolute',zIndex:'9999'}}>
               <div dangerouslySetInnerHTML={{__html:EventDeHtml}}></div>
               {/* <Button onClick={()=>this.BackToTop('detailTarget1')}>回到顶部</Button> */}
               <div type="default" style={{display:this.state.showBackToTop1?'block':'none'}} className="BackToTop" onClick={()=>this.BackToTop('detailTarget1')}>{topMenuType==='cn'?LangConfig.cn.BackToTop:LangConfig.en.BackToTop}</div>
               <div type="default" className="ProPrevId" onClick={EventPrevId===""||EventPrevId===null?()=>this.ShowTips(topMenuType==='cn'?LangConfig.cn.ShowTips:LangConfig.en.ShowTips):()=>this.GoToEventDetail(EventPrevId)}>{topMenuType==='cn'?LangConfig.cn.PrevOne:LangConfig.en.PrevOne}</div>
               <div type="default" className="PronextId" onClick={EventnextId===""||EventnextId===null?()=>this.ShowTips(topMenuType==='cn'?LangConfig.cn.ShowTips1:LangConfig.en.ShowTips1):()=>this.GoToEventDetail(EventnextId)}>{topMenuType==='cn'?LangConfig.cn.NextOne:LangConfig.en.NextOne}</div>
               {/* news */}
               </div>
              </div>
              {/* Contact */}
              <div className="Contact animated fadeIn2" style={{display:ContactShow ? 'block':'none'}}>
              <div dangerouslySetInnerHTML={{ __html: ContactHtml }}></div>
              </div>
              <div className="ContactDetail animated fadeIn2" style={{display:ContactShow && ContactshowDetail?'block':'none'}}>
                Contact详情
              </div>
              {/* AboutUs */}
            <div className="AboutUs_Wrapper_Box">
              <div className="AboutUs animated fadeIn2" style={{display:AboutUsShow ? 'block':'none'}}>
              {AboutUs_st.map((item,i)=>{
                return <div key={item.id} className="clickItem AboutUsTitleItem" onClick={()=>this.GoToDetail(item,'AboutUs')}>{item.title}</div>
              })}
              </div>
              <div className="AboutUsDetail_st animated fadeIn2" style={{display:AboutUsShow && AboutUsshowDetail && !showPeople ?'block':'none'}}>
                <div dangerouslySetInnerHTML={{ __html: AboutUs_nd }}></div>
              </div>
              <div className="AboutUsDetail_nd animated fadeIn2" style={{display:AboutUsShow && AboutUsshowDetail && showPeople ?'block':'none'}}>
                {PeopleList.map((item,i) =>{
                  return <div key={i}>
                    <div className="clickItem AboutUsPeopleItem" onClick={()=>this.GetSinglePerson(i)} dangerouslySetInnerHTML={{ __html: item.name }}></div>
                  </div>
                })}
              </div>
              <div className="SinglePerson animated fadeIn2" style={{display:AboutUsShow && AboutUsshowDetail && showPeople ?'block':'none'}}>
              {
                SinglePerDetail.name !== null ? <div className="SinglePerson_Wrapper"><div className="name">{SinglePerDetail.name}</div>
                <div className="photo"><img src={releaseType+SinglePerDetail.photo}/></div>
                <div className="describe" dangerouslySetInnerHTML={{ __html: SinglePerDetail.intro }}></div></div>
                :<div></div>
              }
              </div>
            </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Main;
