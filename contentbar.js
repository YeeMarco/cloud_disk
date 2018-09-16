
const e = React.createElement;
const c = React.Component;

class Contentstr extends  c{
  constructor(props){
    super(props);
  }
  render(){
    let that = this;
    return e('a',
            {onClick: function(){
                        that.props.floderhandle(that.props.path,1)
              },
              className:'direct'
            },this.props.value)
  }
}
class ContentstrList extends  c{
  constructor(props){
    super(props);
  }
  render(){
    let dataArr = this.props.currentPath.split('/')
    // let that = this;
    let list = [];
    let path;
    dataArr.forEach((value,index,arr) => {
     
      if (index === arr.length - 1) {
        list.push(e('div',{key:index},value));
        
      } else {
        let pathArr = arr.slice(0,index+1);
        path = pathArr.join('/');
      
        list.push(e(Contentstr,{
                    key:index,
                    value:value,
                    path:path,
                    floderhandle:this.props.floderhandle
                     },
                    null))
        list.push(e('div',{key:index+'>'},'>'))
      }
      
    });
    return e('div',
            {className:'directorybar'},
           list
            )
  }
}

class Changstyle extends  c{
 
  render(){ 
    let that = this;
    let str1 = (this.props.style === 'list')?'selected':'';
    let str2 = (this.props.style === 'table')?'selected':'';
    return e('div',
              {className:"iconfont directorybar"},
              e('div',{className:`icon ${str1}` ,style:{margin:'0 10px'},
                        onClick:function(){
                         
                          that.props.styleHandle()
                        }},'\ue721'),
              e('div',{className:`icon ${str2} `,style:{margin:'0 10px'},
                        onClick:function(){
                        
                          that.props.styleHandle()
                        }},'\ue601')
            )
  }
}

class Contentbar extends c {
  render(){
    return e('div',
              {className:'contentbar spacebetween'},
              e(ContentstrList,{currentPath:this.props.currentPath,floderhandle:this.props.floderhandle},null),
              e(Changstyle,{styleHandle:this.props.styleHandle,style:this.props.style},null)
    )
  }
}

export {
  Contentbar
}