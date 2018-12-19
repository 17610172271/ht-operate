<template>
    <div class="relative select-container">
        <div class="ipt-select relative" @click="iptShow = !iptShow">
            <input type="text" class="triangle" disabled v-model="iptName" placeholder="全部状态">
            <div class="triangle triangle-position" v-show="!iptShow"></div>
            <div class="de-triangle triangle-position1" v-show="iptShow"></div>
        </div>
        <ul class="ipt-option" v-show="iptShow">
            <li class="modal1" @click="iptShow=false"></li>
            <li class="option-item" v-for="item in list" @click="doSelect(item)">{{item.name}}</li>
        </ul>
    </div>
</template>
<script type="text/ecmascript-6">
    export default {
        props: {
            address: ''
        },
        data () {
            return {

            }
        },
        methods: {

        },
        watch: {}
    }
</script>
<style scoped>

</style>
