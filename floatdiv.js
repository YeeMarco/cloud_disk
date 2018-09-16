const e = React.createElement;
const c = React.Component;
class Pop extends  c {
  render(){
    let el;
    let child;
    if (!this.props.switch) {
      el = e('div',{},null)
    } else {
      if ((this.props.src).indexOf('.mp4') !== -1) {
        console.log('mp4')
        child = e ('video',{className:'popchild pic',src:this.props.src,preload:"auto",controls:"controls"},null);
      } else if ((this.props.src).indexOf('.jpg') !== -1) {
        child = e ('img',{className:'popchild pic',src:this.props.src},null);
      } else {
        
      }
     
      let btn = e('div',{className:'close',onClick:this.props.changePop},'X')
      el = e('div',{className:'pop'},child,btn)
    }
    return el
  }
}
export {
  Pop
}
