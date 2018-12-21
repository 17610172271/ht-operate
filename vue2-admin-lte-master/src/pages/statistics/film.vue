<template>
    <div class="">
        <div class="p-lg">
            <sub-header :list="subNavList"></sub-header>
            <div class="page-container">
                <div class="m-t-sm">
                    影片统计
                </div>
                <el-input v-model="address"></el-input>
                <ul>
                    <li v-for="item in searchList" @click="selectItem(item.location)">{{item.district}}{{item.address.length > 0 ? item.address : ''}}{{item.name}}</li>
                </ul>
                <map-search :address="address" :position="position" @marker="getPosition" @searchResult="getResult"></map-search>
            </div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import SubHeader from '../common/subheader'
    import MapSearch from '@/components/mapSearch'
    import api from '@/api'
    export default {
        data: () => ({
            data: '',
            address: '毛线沟',
            position: [],
            searchList: [],
            subNavList: {
                parentNode: {
                    name: '数据统计',
                    router: {
                        name: 'statistics_agent'
                    }
                },
                childNode: {
                    name: '影片统计',
                    desc: '主要用于影片的查看及统计',
                    router: {
                        name: 'statistics_film'
                    }
                }
            }
        }),
        components: {
            SubHeader,
            MapSearch
        },
        methods: {
            getResult (result) {
                this.searchList = result
            },
            selectItem (position) {
                this.position = [position.lng, position.lat]
            },
            getPosition (val) {
                console.log(val)
            }
        },
        created () {
            this.page = this.$route.query.page ? parseInt(this.$route.query.page) : 1
        }
    }
</script>
<style scoped>
</style>
