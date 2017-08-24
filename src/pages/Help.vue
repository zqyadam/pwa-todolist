<template>
	<v-container fluid class="pa-2">
        <v-card>
            <v-card-text class="text-xs-left markdown-body" v-html="html(content)"></v-card-text>
        </v-card>
    </v-container>
</template>
<script>
import { mapActions } from 'vuex'
import marked from 'marked'
import "github-markdown-css/github-markdown.css"
export default {
	name:'help',
	data(){
		return {
			content:'## 基本功能\n- 登录注册\n- 重要紧急程度分类（参考"高效Todo"App）\n- 支持Markdown\n\n## 基本手势操作\n1. 点击：查看详情\n2. 长按：删除\n3. 右划（仅在“未完成”页面有效）：设置为“已完成”\n4. 左划（仅在“已完成”页面有效）：设置为“未完成”\n',
		}
	},
	methods:{
		...mapActions('appShell/appHeader', [
            'setAppHeader'
        ]),
        ...mapActions('appShell/appBottomNavigator', [
            'hideBottomNav'
        ]),
        html(text){
        	return marked(text)
        }
	},
	created:function() {
		this.setAppHeader({
			title: '帮助',
            show: true,
            showMenu: false,
            showBack: true,
            actions: []
		});
		this.hideBottomNav();
	}
}
</script>
