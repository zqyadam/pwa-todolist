webpackJsonp([1],{476:function(t,e,s){function a(t){s(503)}var n=s(37)(s(485),s(514),a,"data-v-2b8c5ba9",null);t.exports=n.exports},479:function(t,e,s){"use strict";s.d(e,"c",function(){return a}),s.d(e,"b",function(){return n}),s.d(e,"a",function(){return i});var a=function(t){return/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/.test(t)},n=function(t){return t.replace(/\s/g,"")},i=function(t){var e={"M+":this.getMonth()+1,"d+":this.getDate(),"h+":this.getHours(),"m+":this.getMinutes(),"s+":this.getSeconds(),"q+":Math.floor((this.getMonth()+3)/3),S:this.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(this.getFullYear()+"").substr(4-RegExp.$1.length)));for(var s in e)new RegExp("("+s+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?e[s]:("00"+e[s]).substr((""+e[s]).length)));return t}},485:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=s(179),n=s.n(a),i=s(58),o=s.n(i),r=s(59),l=s(479),c=s(178);e.default={name:"login",data:function(){return{email:"test@test.com",password:"111111",eye:!1}},methods:o()({},s.i(r.b)("appShell",["disablePageTransition"]),s.i(r.b)("appShell/appHeader",["setAppHeader"]),s.i(r.b)("appShell/appBottomNavigator",["hideBottomNav"]),s.i(r.b)("appShell/appSnackbar",["showSnackbar"]),{checkPassword:function(){return this.password=s.i(l.b)(this.password),this.password?this.password.length>=6||"6-25位密码，不能用空格":""},checkEmail:function(){return this.email=s.i(l.b)(this.email),this.email?!!s.i(l.c)(this.email)||"请输入正确的邮箱格式":""},login:function(){var t=this;if(console.log("try login"),!0!==this.checkEmail()||!0!==this.checkPassword())return console.log(this.email),console.log(this.password),console.log("email or password check failed"),"";s.i(c.f)({email:this.email,password:this.password}).then(function(e){console.log("user login passed, going to todo page"),console.log(e),t.$router.push({name:"list"})},function(e){return t.showSnackbar({type:"error",msg:s.i(c.c)(e.code)}),n.a.reject(e)})}}),mounted:function(){s.i(c.a)()?this.$router.push({name:"list"}):(this.setAppHeader({title:"Todo List",show:!0,showMenu:!1,showBack:!1,showLogo:!1,actions:[]}),this.hideBottomNav())}}},495:function(t,e,s){e=t.exports=s(471)(!0),e.push([t.i,".container[data-v-2b8c5ba9]{width:100%;position:absolute;top:50%;left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%)}.container img[data-v-2b8c5ba9]{width:100%;height:100%}","",{version:3,sources:["E:/PWA/pwa-todolist/src/pages/Login.vue"],names:[],mappings:"AACA,4BACI,WAAY,AACZ,kBAAmB,AACnB,QAAS,AACT,SAAU,AACV,uCAAyC,AACjC,8BAAiC,CAC5C,AACD,gCACI,WAAY,AACZ,WAAa,CAChB",file:"Login.vue",sourcesContent:["\n.container[data-v-2b8c5ba9] {\r\n    width: 100%;\r\n    position: absolute;\r\n    top: 50%;\r\n    left: 50%;\r\n    -webkit-transform: translate(-50%, -50%);\r\n            transform: translate(-50%, -50%);\n}\n.container img[data-v-2b8c5ba9] {\r\n    width: 100%;\r\n    height: 100%;\n}\r\n\r\n"],sourceRoot:""}])},503:function(t,e,s){var a=s(495);"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);s(472)("28afa671",a,!0)},509:function(t,e,s){t.exports=s.p+"static/img/todolist1.8f1f31a.png"},514:function(t,e,s){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("v-container",[a("v-layout",{attrs:{"justify-center":""}},[a("v-flex",{attrs:{xs8:"",lg3:"","mb-4":""}},[a("img",{attrs:{src:s(509),alt:"logo"}})])],1),t._v(" "),a("v-layout",{attrs:{"justify-center":""}},[a("v-flex",{attrs:{xs8:"",lg4:""}},[a("v-text-field",{attrs:{"prepend-icon":"email",name:"email",label:"邮箱",id:"email",required:"",rules:[t.checkEmail]},model:{value:t.email,callback:function(e){t.email="string"==typeof e?e.trim():e},expression:"email"}})],1)],1),t._v(" "),a("v-layout",{attrs:{"justify-center":""}},[a("v-flex",{attrs:{xs8:"",lg4:""}},[a("v-text-field",{attrs:{"prepend-icon":"lock",type:t.eye?"text":"password",name:"input-1",label:"密码",id:"password",required:"",counter:"","append-icon":t.eye?"visibility":"visibility_off","append-icon-cb":function(){t.eye=!t.eye},rules:[t.checkPassword]},model:{value:t.password,callback:function(e){t.password="string"==typeof e?e.trim():e},expression:"password"}})],1)],1),t._v(" "),a("v-layout",{attrs:{"justify-center":""}},[a("v-flex",{attrs:{xs6:"",lg3:""}},[a("v-btn",{attrs:{primary:"",dark:"",block:""},nativeOn:{click:function(e){t.login(e)}}},[t._v("登录")])],1)],1),t._v(" "),a("v-layout",[a("v-flex",{attrs:{xs8:"","offset-xs2":""}},[a("p",[t._v("\n                还没有账号？注册一个吧~\n                "),a("v-btn",{attrs:{error:"",flat:"",small:"",to:{name:"register"},router:""}},[t._v("立即注册")])],1)])],1)],1)],1)},staticRenderFns:[]}}});
//# sourceMappingURL=1.0e8061a0ef1f7b442bc3.js.map