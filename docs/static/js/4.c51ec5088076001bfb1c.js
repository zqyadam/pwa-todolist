webpackJsonp([4],{474:function(t,o,e){function a(t){e(505)}var n=e(37)(e(483),e(516),a,"data-v-a315df0c",null);t.exports=n.exports},483:function(t,o,e){"use strict";Object.defineProperty(o,"__esModule",{value:!0});var a=e(58),n=e.n(a),s=e(59),i=e(126),r=e(178);o.default={data:function(){return{todoType:"ImpEmg",todoContent:"",currentTodo:null,pageType:"",dialogShow:!1}},methods:n()({},e.i(s.b)("appShell/appHeader",["setAppHeader"]),e.i(s.b)("appShell/appBottomNavigator",["hideBottomNav"]),e.i(s.b)("todo",["setTodo","addTodo"]),e.i(s.b)("appShell/appSnackbar",["showSnackbar"]),{isContentChanged:function(){return this.currentTodo.get("content")===this.todoContent},saveTodoChange:function(){var t=this;this.currentTodo.set("type",this.todoType),this.currentTodo.set("content",this.todoContent),this.setTodo(this.currentTodo).then(function(o){t.showSnackbar({type:"success",msg:"保存成功！"}),t.gotoList()},function(t){console.log(t)})},discardTodoChange:function(){},createTodo:function(){var t=this;if(!this.todoContent)return void this.showSnackbar({type:"error",msg:"写点什么吧~！"});e.i(r.b)({content:this.todoContent,type:this.todoType}).then(function(o){t.addTodo(o),t.showSnackbar({type:"success",msg:"添加成功！"}),t.$router.push({name:"list"})},function(o){t.showSnackbar({type:"error",msg:e.i(r.c)(o.code)})})},gotoList:function(){this.$router.push({name:"list"})}}),computed:n()({},e.i(s.a)("todo",["todos"])),created:function(){console.log(this.$router),this.hideBottomNav();var t="";switch(this.$route.params.type){case"add":t="添加待办事项",this.pageType="add";break;case"edit":t="编辑待办事项",this.pageType="edit";break;default:t="编辑待办事项",this.pageType="add"}this.setAppHeader({title:t,show:!0,showMenu:!1,showBack:!0,needBackConfirm:!0,actions:[{icon:"save"}]});var o=this.$route.params.id;o&&"add"!==this.pageType&&(this.currentTodo=this.todos.get(o))&&(console.log(this.currentTodo),this.currentTodo=this.todos.get(o),this.todoType=this.currentTodo.get("type"),this.todoContent=this.currentTodo.get("content"))},mounted:function(){var t=this;i.a.$on("app-header:click-action",function(o){switch(console.log(o),o.actionIdx){case 0:"edit"==t.pageType?t.saveTodoChange():"add"==t.pageType&&t.createTodo()}}),i.a.$on("app-header:click-back",function(o){console.log("back"),console.log(o),t.dialogShow=!0})},beforeDestroy:function(){i.a.$off("app-header:click-action"),i.a.$off("app-header:click-back")}}},497:function(t,o,e){o=t.exports=e(471)(!0),o.push([t.i,".b[data-v-a315df0c]{border:1px solid red}.g[data-v-a315df0c]{border:1px solid green}.app-shell-footer[data-v-a315df0c]{position:fixed;bottom:0;left:0;right:0}","",{version:3,sources:["E:/PWA/pwa-todolist/src/pages/Edit.vue"],names:[],mappings:"AACA,oBACI,oBAAsB,CACzB,AACD,oBACI,sBAAwB,CAC3B,AACD,mCACI,eAAgB,AAChB,SAAU,AACV,OAAQ,AACR,OAAS,CACZ",file:"Edit.vue",sourcesContent:["\n.b[data-v-a315df0c] {\r\n    border: 1px solid red;\n}\n.g[data-v-a315df0c] {\r\n    border: 1px solid green;\n}\n.app-shell-footer[data-v-a315df0c] {\r\n    position: fixed;\r\n    bottom: 0;\r\n    left: 0;\r\n    right: 0;\n}\r\n\r\n"],sourceRoot:""}])},505:function(t,o,e){var a=e(497);"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);e(472)("84daef0a",a,!0)},516:function(t,o){t.exports={render:function(){var t=this,o=t.$createElement,e=t._self._c||o;return e("v-app",{staticClass:"v-app-shell",attrs:{"fill-height":""}},[e("v-layout",{staticClass:"pa-3 fill-height",attrs:{"justify-center":""}},[e("v-text-field",{staticClass:"input-group--focused fill-height edit-area",attrs:{label:"待办内容","multi-line":"","hide-details":""},model:{value:t.todoContent,callback:function(o){t.todoContent=o},expression:"todoContent"}})],1),t._v(" "),e("v-layout",{attrs:{row:"","justify-center":""}},[e("v-dialog",{model:{value:t.dialogShow,callback:function(o){t.dialogShow=o},expression:"dialogShow"}},[e("v-card",[e("v-card-title",[t._v("保存更改")]),t._v(" "),e("v-card-text",[t._v("\n                    内容有所更改，是否保存？\n                ")]),t._v(" "),e("v-card-actions",[e("v-spacer"),t._v(" "),e("v-btn",{staticClass:"blue--text blue-1",attrs:{flat:"flat"},nativeOn:{click:function(o){t.dialogShow=!1}}},[t._v("放弃")]),t._v(" "),e("v-btn",{attrs:{primary:""},nativeOn:{click:function(o){t.dialogShow=!1}}},[t._v("保存")])],1)],1)],1)],1),t._v(" "),e("footer",{staticClass:"app-shell-footer"},[e("v-bottom-nav",{class:{red:"ImpEmg"===t.todoType,green:"ImpNotEmg"===t.todoType,orange:"NotImpEmg"===t.todoType,blue:"NotImpNotEmg"===t.todoType},attrs:{absolute:"",value:"true"}},[e("v-btn",{attrs:{dark:"",value:"ImpEmg"===t.todoType},nativeOn:{click:function(o){t.todoType="ImpEmg"}}},[e("span",[t._v("重要紧急")]),t._v(" "),e("v-icon",{directives:[{name:"show",rawName:"v-show",value:"ImpEmg"===t.todoType,expression:"todoType === 'ImpEmg'"}]},[t._v("check_circle")])],1),t._v(" "),e("v-btn",{attrs:{dark:"",value:"ImpNotEmg"===t.todoType},nativeOn:{click:function(o){t.todoType="ImpNotEmg"}}},[e("span",[t._v("重要不紧急")]),t._v(" "),e("v-icon",{directives:[{name:"show",rawName:"v-show",value:"ImpNotEmg"===t.todoType,expression:"todoType === 'ImpNotEmg'"}]},[t._v("check_circle")])],1),t._v(" "),e("v-btn",{attrs:{dark:"",value:"NotImpEmg"===t.todoType},nativeOn:{click:function(o){t.todoType="NotImpEmg"}}},[e("span",[t._v("不重要紧急")]),t._v(" "),e("v-icon",{directives:[{name:"show",rawName:"v-show",value:"NotImpEmg"===t.todoType,expression:"todoType === 'NotImpEmg'"}]},[t._v("check_circle")])],1),t._v(" "),e("v-btn",{attrs:{dark:"",value:"NotImpNotEmg"===t.todoType},nativeOn:{click:function(o){t.todoType="NotImpNotEmg"}}},[e("span",[t._v("不重要不紧急")]),t._v(" "),e("v-icon",{directives:[{name:"show",rawName:"v-show",value:"NotImpNotEmg"===t.todoType,expression:"todoType === 'NotImpNotEmg'"}]},[t._v("check_circle")])],1)],1)],1)],1)},staticRenderFns:[]}}});
//# sourceMappingURL=4.c51ec5088076001bfb1c.js.map