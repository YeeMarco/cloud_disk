const e = React.createElement;
const c = React.Component;

class Searchbar extends  c{
  constructor(props){
    super(props);
  }
  render(){
    return e('div',
            {className:'search'},
            e('p',{className:'name'},'Clouddisk'),
            e('div',{className:'searchcontainer'},
              e('div',{className:'button one iconfont'},'Search'),
              e('div',{className:'button two triangle'},null),
              e('div',{className:'three'},e('input',{className:'button '},null)),
              e('div',{className:'button four iconfont'},'\ue602')
            )
          )
  }
}

class Info extends  c{
  constructor(props){
    super(props);
  }
  render(){
    return e('div',
              {className:'avtar'},
              e('div',{className:'button'},e('i',{className:'iconfont'},'eksemy')),
              e('div',{className:'button upload'},e('i',{className:'iconfont'},'\uec51',` `,'upload')),
              e('div',{},e('img',{src:'./avtar.jpg'},null))
            )
  }
}

class Header extends c {
  render(){
    return e('div',
              {className:'header spacebetween'}, 
              e(Searchbar,{},null),
              e(Info,{},null)
            )
  }
}

export {
  Header
}