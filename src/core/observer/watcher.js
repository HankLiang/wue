import {popTarget, pushTarget} from './dep'
import Dep from './dep'

function randomString(len) {
  　　len = len || 32;
  　　var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
  　　var maxPos = $chars.length;
  　　var pwd = '';
  　　for (let i = 0; i < len; i++) {
  　　　　pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
  　　}
  　　return pwd;
  }

export default class Watcher {
  constructor (vm, expression, cb) {
    this.vm = vm
    this.cb = cb
    this.expression = expression
    this.id = randomString(5)
    this.value = this.getVal()
  }
  getVal () {
    console.log('getVal', this.id);
    pushTarget(this)
    let val = this.vm
    this.expression.split('.').forEach((key) => {
      val = val[key]
    })
    popTarget()
    return val
  }
  addDep (dep) {
    dep.addSub(this)
  }

  update () {
    let val = this.vm
    this.expression.split('.').forEach((key) => {
      val = val[key]
    })
    this.cb.call(this.vm, val, this.value)
    this.value = val;
  }
}