
const e = React.createElement;
const c = React.Component;

class Footer extends c {
  render(){
    let left = e('div',{className:'footleft'},
                      e('div',{className:'rect'},
                          e('div',{},null), e('div',{},'xmy'), e('div',{className:'iconfont'},'\ue614')
                        ),
                      e('div',{className:'tri'},null)
                );
    let right = e('div',{className:'footright'},'Copyright © 2018 eksemy Inc.');
    return e('div',
              {className:'footer'}, 
              left,
              right                         
            )
  }
}

export {
  Footer
}