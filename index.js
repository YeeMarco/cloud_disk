
window.onload = (function(){
  let div = document.getElementById('loading');
  setTimeout(()=>{document.getElementsByTagName('body')[0].removeChild(div)},1000)
  
  var cb = function(){
    if (xhr.readyState == 4 )
      if( xhr.status == 200) {
        let data = JSON.parse(xhr.responseText)
        render(data);
      } 
  }
  //step1
  let xhr = new XMLHttpRequest();
  //step2
  xhr.onreadystatechange = cb;
  //step3
  xhr.open("GET","data?/yunpan",true);
  //step4  post 不为空
  xhr.send(null)
  //step5

})()

function ajax(path,callback){
  let data,
  cb = function(){
    if (xhr.readyState == 4 )
      if( xhr.status == 200) {
        try {
          data = JSON.parse(xhr.responseText)
          callback(data)
        } catch (error) {
          console.log(xhr.responseText)
        }
       
      } 
  }
  //step1
  let xhr = new XMLHttpRequest();
  //step2
  xhr.onreadystatechange = cb;
  //step3
  xhr.open("GET","data?/"+ path,true);
  //step4  post 不为空
  xhr.send(null)
  //step5

}


  

// const e = React.createElement;
//   const c = React.Component;

//   class Container extends c {

//     render() {
//       return e(
//         'div',
//         null, 
//         e(UserName,{name:this.props.data.username}),
//         e(ItemList,{data:this.props.data.child})
//       );
//     }
//   }

//   class UserName extends c{
//    render() {
//      return e(
//        'h3',
//        {className:'title'},
//        `${this.props.name}`
//      )
//    }
//   }


//   class ItemList extends c {
//     render () {
//       let list = [];
//       let object = this.props.data;
//       for (const key in object) {
//         if (object.hasOwnProperty(key)) {
//           const element = object[key];
//           let el = e(Item,{key:element.id,element:element})
//           list.push(el)
//         }
//       }
//       return e('ul',null,list)
//     }
//   }
 
//   class Item extends c {
    
//     constructor(props){
//       super(props);
//       this.handleClick = this.handleClick.bind(this);
//       this.state = {
//         child: this.props.element.child,
//         childcopy:[]
//       }
//     }
//     handleClick(params) {
//       if (this.state.childcopy.length === 0) {
//         this.setState({childcopy:this.props.element.child}) 
//       } else {    
//         this.setState({childcopy:[]})
//       }
//     }
  
//     render () {
//       let that = this;
//       let reactelement,
//           type = this.props.element.type;
//       if (type === 'files') {
//         let butoon = e('button',
//         {className:'btn',
//          onClick:function(){
//            that.handleClick(that.props.element.id)
//          }
//         },
//         '+')
//         let list = [];
//         let object = this.state.childcopy;
//         for (const key in object) {
//           if (object.hasOwnProperty(key)) {
//             const element = object[key];
//             let el = e(Item,{key:element.id,element:element})
//             list.push(el)
//           }
//         }
//         reactelement = e('div',{className:'files'},this.props.element.name,butoon,list)
//       } else {
//         reactelement = e('li',{className:'file'},`${this.props.element.name}`)
//       }
//       return reactelement
//     }
//   }

  
  
//   let element = e(Container,{data:data},null)

//   ReactDOM.render(
//     element,
//     document.getElementById('app')
//   );

// ——————————————————————————————————————————————————————————————————————————————————
import {Header} from '/header.js'
import {Contentbar} from '/contentbar.js' 
import {Content} from '/content.js'
import {Footer} from '/footer.js' 
import {Pop} from '/floatdiv.js' 
// ------------------------------------------自下而上------------------------------------------------------
function render(params){

  let data = params;
  const e = React.createElement;
  const c = React.Component;
 
  
  class Container extends c {
    constructor(props){
      super(props);
      
      this.state = {
        data: this.props.data,
        currentPath:'yunpan',
        // style:(string) table||list
        style:'table',
        pop:false,
        src:''
      }
      this.floderhandle =  this.floderhandle.bind(this); 
      this.changeStyle = this.changeStyle.bind(this);
      this.changePop = this.changePop.bind(this);
      this.updataSrc = this.updataSrc.bind(this);
    }
    floderhandle(path,flag){
      let that = this;
      if (flag) {
        let callback = function(params){
          that.setState({data:params,currentPath:path})
        }
        ajax(path,callback)
      } else {
        let callback = function(params){
          that.setState({data:params,currentPath:that.state.currentPath+'/'+path})
        }
        ajax(this.state.currentPath+'/'+path,callback)
      }
     
    }
    changePop(){
      this.setState({pop : (this.state.pop === true)?false:true})
    }
    updataSrc(src){
      this.setState({src : src,pop : (this.state.pop === true)?false:true});

    }
    changeStyle(){
      this.setState({style : (this.state.style === 'list')?'table':'list'})
    }

    render(){

      return e('div',
                {className:'container'},
                
                e(Header,{},null),
                e(Contentbar,{currentPath:this.state.currentPath,
                              styleHandle:this.changeStyle,
                              floderhandle:this.floderhandle,
                              style:this.state.style
                              }, null),
                e(Content,
                  {data:this.state.data,
                    floderhandle:this.floderhandle,
                    currentPath:this.state.currentPath,
                    updataSrc:this.updataSrc,
                    style:this.state.style                    
                  },
                  null),
                e(Footer,{},null),
                e(Pop,{switch:this.state.pop,src:this.state.src,changePop:this.changePop},null)
                
              
        )
    }
  }
  
  let app = e(Container,{data:data},null)
  ReactDOM.render(
    app,
    document.getElementById('app')
  )
}

// --------------------------------------------------------------------------------------------------------