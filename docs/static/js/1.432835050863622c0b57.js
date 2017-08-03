webpackJsonp([1],{426:function(t,e,a){function s(t){a(454)}var n=a(33)(a(432),a(459),s,"data-v-2b8c5ba9",null);t.exports=n.exports},430:function(t,e,a){"use strict";a.d(e,"b",function(){return s}),a.d(e,"a",function(){return n});var s=function(t){return/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/.test(t)},n=function(t){return t.replace(/\s/g,"")}},432:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a(162),n=a.n(s),r=a(53),o=a.n(r),i=a(54),c=a(430),l=a(112);e.default={name:"login",data:function(){return{email:"",password:"",eye:!1,snackbar:!1,snackbarType:"",snackbarMsg:""}},methods:o()({},a.i(i.b)("appShell/appHeader",["setAppHeader"]),a.i(i.b)("appShell/appBottomNavigator",["hideBottomNav"]),a.i(i.b)("user",["setUserInfo"]),{showSnackbar:function(t,e){this.snackbarType=t,this.snackbarMsg=e,this.snackbar=!0},checkPassword:function(){return this.password=a.i(c.a)(this.password),this.password?this.password.length>=6||"6-25位密码，不能用空格":""},checkEmail:function(){return this.email=a.i(c.a)(this.email),this.email?!!a.i(c.b)(this.email)||"请输入正确的邮箱格式":""},login:function(){var t=this;if(console.log("try login"),!0!==this.checkEmail()||!0!==this.checkPassword())return console.log(this.email),console.log(this.password),console.log("email or password check failed"),"";a.i(l.e)({email:this.email,password:this.password}).then(function(e){if(navigator.credentials){var a=new PasswordCredential({id:t.email,password:t.password});return navigator.credentials.store(a).then(function(){return console.log("navigator store success"),n.a.resolve(e)})}return n.a.resolve(e)},function(e){return t.showSnackbar("error",a.i(l.d)(e.code)),n.a.reject(e)}).then(function(e){console.log("user login passed, going to todo page"),console.log(e),t.setUserInfo(e),t.$router.push({name:"todo"})})}}),created:function(){var t=this;this.setAppHeader({title:"Todo List",show:!0,showMenu:!1,showBack:!1,showLogo:!1,actions:[]}),this.hideBottomNav(),navigator.credentials&&navigator.credentials.get({password:!0}).then(function(e){console.log("navigator get credential success"),console.log(e),e&&(t.email=e.id,t.password=e.password,t.login())},function(e){console.log("navigator get credential failed"),console.log(e),t.email="",t.password=""})}}},450:function(t,e,a){e=t.exports=a(424)(!0),e.push([t.i,".container[data-v-2b8c5ba9]{width:100%;position:absolute;top:50%;left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%)}.container img[data-v-2b8c5ba9]{width:100%;height:100%}","",{version:3,sources:["E:/PWA/pwa-todolist/src/pages/Login.vue"],names:[],mappings:"AACA,4BACI,WAAY,AACZ,kBAAmB,AACnB,QAAS,AACT,SAAU,AACV,uCAAyC,AACjC,8BAAiC,CAC5C,AACD,gCACI,WAAY,AACZ,WAAa,CAChB",file:"Login.vue",sourcesContent:["\n.container[data-v-2b8c5ba9] {\r\n    width: 100%;\r\n    position: absolute;\r\n    top: 50%;\r\n    left: 50%;\r\n    -webkit-transform: translate(-50%, -50%);\r\n            transform: translate(-50%, -50%);\n}\n.container img[data-v-2b8c5ba9] {\r\n    width: 100%;\r\n    height: 100%;\n}\r\n\r\n"],sourceRoot:""}])},454:function(t,e,a){var s=a(450);"string"==typeof s&&(s=[[t.i,s,""]]),s.locals&&(t.exports=s.locals);a(425)("28afa671",s,!0)},456:function(t,e,a){t.exports=a.p+"static/img/todolist1.8f1f31a.png"},459:function(t,e,a){t.exports={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("v-container",[s("v-layout",{attrs:{"justify-center":""}},[s("v-flex",{attrs:{xs8:"",lg3:"","mb-4":""}},[s("img",{attrs:{src:a(456),alt:"logo"}})])],1),t._v(" "),s("v-layout",{attrs:{"justify-center":""}},[s("v-flex",{attrs:{xs8:"",lg4:""}},[s("v-text-field",{attrs:{"prepend-icon":"email",name:"email",label:"邮箱",id:"email",required:"",rules:[t.checkEmail]},model:{value:t.email,callback:function(e){t.email="string"==typeof e?e.trim():e},expression:"email"}})],1)],1),t._v(" "),s("v-layout",{attrs:{"justify-center":""}},[s("v-flex",{attrs:{xs8:"",lg4:""}},[s("v-text-field",{attrs:{"prepend-icon":"lock",type:t.eye?"text":"password",name:"input-1",label:"密码",id:"password",required:"",counter:"","append-icon":t.eye?"visibility":"visibility_off","append-icon-cb":function(){t.eye=!t.eye},rules:[t.checkPassword]},model:{value:t.password,callback:function(e){t.password="string"==typeof e?e.trim():e},expression:"password"}})],1)],1),t._v(" "),s("v-layout",{attrs:{"justify-center":""}},[s("v-flex",{attrs:{xs6:"",lg3:""}},[s("v-btn",{attrs:{primary:"",light:"",block:""},nativeOn:{click:function(e){t.login(e)}}},[t._v("登录")])],1)],1),t._v(" "),s("v-layout",[s("v-flex",{attrs:{xs8:"","offset-xs2":""}},[s("p",[t._v("\n                    还没有账号？注册一个吧~\n                    "),s("v-btn",{attrs:{error:"",flat:"",small:"",to:{name:"register"},router:""}},[t._v("立即注册")])],1)])],1)],1),t._v(" "),s("v-snackbar",{attrs:{success:"success"===t.snackbarType,error:"error"===t.snackbarType,timeout:3e3},model:{value:t.snackbar,callback:function(e){t.snackbar=e},expression:"snackbar"}},[t._v("\n        "+t._s(t.snackbarMsg)+"\n        "),s("v-btn",{attrs:{dark:"",flat:""},nativeOn:{click:function(e){t.snackbar=!1}}},[t._v("关闭")])],1)],1)},staticRenderFns:[]}}});
//# sourceMappingURL=1.432835050863622c0b57.js.map