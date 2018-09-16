const e = React.createElement;
const c = React.Component;
const fileType  = {
  'jpg': '\ue657',
  'zip': '\ue655',
  'mp3': '\ue654',
  'txt': '\ue658',
  'mp4': '\ue659',
  'pdf': '\ue65b',
  'jpg': '\ue657',
  'unknow':'\ue65d',
  'floder': '\ue653'
} 

class Row extends c {
  constructor(props){
    super(props);
  }  
  
  render(){
    let el;
    let checkbox;
    if (this.props.selected[1] === true) {
      checkbox = e('div',{className: `iconfont checkbox ${'checkedbox'}`,
                    onClick:()=>{let that =this;this.props.checkboxChange(that.props.selected)}},
                    '\ue60e')
    } else if(this.props.selected[1] === false){
     
      checkbox = e('div',{className: `iconfont checkbox ${'uncheckedbox'}`,
                    onClick:()=>{let that =this;this.props.checkboxChange(that.props.selected)}},
                    '\ue629')
    }
    
    if (this.props.name.indexOf('.') === -1) {
      el = e(Floder,
              {floderhandle:this.props.floderhandle,
               name:this.props.name
              },
               null)
             
    } else {
      el = e(File,{name:this.props.name,
                  currentPath:this.props.currentPath,
                  updataSrc:this.props.updataSrc,
                  style:this.props.style
              },
              null)   
    }
    return e('div',{className:(this.props.od%2 === 0)?'odd':'double'},checkbox,el)
    }
}



class File extends c{

  render(){
    let el;
    let name = this.props.name;
    let style = this.props.style;
    let type = name.substr(name.indexOf('.')+1,name.length);
    let show ;
    if (fileType[type]) {  
    } else {
      type = 'unknow';
    }
//
    if (name.length > 10 & style === 'table') {
      
      show = name.substr(0,10) + '…'
    
    } else if(name.length < 10 & style === 'table'){
      show = name
    }
//
    if (name.length > 20 & style === 'list') {
      show = name.substr(0,40) + '…'
    } else if(name.length < 20 & style === 'list'){
      show = name
    }
    let that = this;
    if((name).indexOf('.jpg') !== -1 & style === 'table'){
      el = e('div',
              {className:'item',onClick:function(){ 
                let src = `./${that.props.currentPath}/${that.props.name}`
                that.props.updataSrc(src) } },
              e('img',{src:`./${this.props.currentPath}/${name}`,className:'pic'},null)
            )
    } else if((name).indexOf('.mp4') !== -1 & style === 'table'){
      el = e('div',
              {className:'item',onClick:function(){ 
                let src = `./${that.props.currentPath}/${that.props.name}`
                that.props.updataSrc(src) } },
                e('div',{className:`iconfont graphics ${type}`},fileType[type]),
                e('div',{className:'filename'},show)
            )
    } else{
      el = e('div',
              {className:'item',
              },
              e('div',{className:`iconfont graphics ${type}`},fileType[type]),
              e('div',{className:'filename'},show)
          ) 
    }
    
    return el
    
  }
}
class Floder extends c{
  render(){
    let that = this;
    let type = 'floder';
    return e('div',
              {className:'item ',
              onClick:function(){
                that.props.floderhandle(that.props.name)
                 },
              },
              e('div',{className:`iconfont graphics ${type}`},fileType[type]),
              e('div',{className:'filename'},this.props.name)
    )
  }
}
//
class Content extends c { 
  constructor(props){
    super(props);
    let length = this.props.data.length;
    let arr = [];
    for (let index = 0; index < length; index++) {
      arr[index] = false;
    }
    this.state = {
      selected: arr
    };
    this.checkboxChange = this.checkboxChange.bind(this)
  }
  checkboxChange(arr){
    
    let index = arr[0];
    let data = this.state.selected;
    data[index] = (this.state.selected[index] === true)?false:true;
    console.log(this.props.currentPath+'/'+this.props.data[index])
    this.setState({selected:data});

  }
  componentWillReceiveProps(nextProps) {
    let length = nextProps.data.length;
    let arr = [];
    for (let index = 0; index < length; index++) {
      arr[index] = false;
    }
    
    if (this.state.selected.length === arr.length) {
      
    } else {
      this.setState({
        selected: arr
        })
    }
    
    
    }
  
  render(){
    let list = [];
    
    let data = this.props.data;
    data.forEach(
      (value,index,array)=>{

        list.push(e(Row,
                    {key:index,
                      od:index,
                      name:value,
                      floderhandle:this.props.floderhandle,
                      currentPath:this.props.currentPath,
                      style:this.props.style,
                      updataSrc:this.props.updataSrc,
                      selected:[index,this.state.selected[index]],
                      checkboxChange:this.checkboxChange
                    },
                    value
                    )
                  )
      }
    )
    if (this.props.style === 'table') {
      let el = e('div',{className:'double'},e('div',{className:'item'},e('div',{className:`iconfont graphics floder`},'\ue802')));
      return e('div',{className:`contenttable`},list,el) 
    } else if (this.props.style === 'list'){
      let el = e('div',
                {className:'item',
                },
                e('div',{style:{margin:'0 0px'}},'select all'),
                e('div',{},'file type'),
                e('div',{},'file name'),
                e('div',{},'file size'),
          ) 
      return e('div',{className:`content${this.props.style}`},el,list) 
    }
  }
}
export  {
  Content
}