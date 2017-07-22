<template>
    <div>
        <div class="content">
            <h2>LAVAS</h2>
            <h4>{{title}}</h4>
        </div>
    </div>
</template>
<script>
import { mapActions } from 'vuex';

export default {
	name:'register',
    data() {
        return {
        	title:'1111'
        }
    },
    methods: {
        ...mapActions('appShell/appHeader', [
            'setAppHeader'
        ])
    },
    activated:function() {
        this.setAppHeader({
            title: '注册账号',
            show: true,
            showMenu:false,
            showBack: true,
            actions: [
                {
                    icon: 'home',
                    route: {
                        name: 'home'
                    }
                }
            ]
        });
    }
}

</script>
<style>


</style>
