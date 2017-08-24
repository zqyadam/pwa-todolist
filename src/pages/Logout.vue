<template></template>
<script>
import { logOut } from '@/common/api'

export default {
	name:'logout',
    mounted: function() {
        console.log('loging out');
        logOut();
        this.$router.push('/');
    }
}
</script>

