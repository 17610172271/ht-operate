<template>
    <div class="p-lg">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{name: 'home'}">首页</el-breadcrumb-item>
            <el-breadcrumb-item>影院地图统计</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="page-container">
            <div class="clear p-b-sm">
                <div class="pull-left text-blue p-v-sm">目前已有{{data.cinema_num || 0}}个影院正常使用，涉及{{data.province_num || 0}}个省，{{data.city_num || 0}}个市。</div>
                <div class="pull-right clear flex" style="width: 300px;">
                    <div class="col-xs-1" style="min-width: 70px;padding: 10px 0;">影院搜索:</div>
                    <el-input v-model="searchVal" class="col-xs-11 p-n" placeholder="请输入" @keyup.enter.native="getList"></el-input>
                    <div class="col-xs-1 p-n" style="min-width: 60px;padding: 3px 5px;">
                        <a href="javascript:;" type="primary" class="btn border"  @click="getList">搜索</a>
                    </div>
                </div>
            </div>
            <el-amap vid="amap" id="cinemaMap" style="height: 550px;" :zoom="zoom" :center="center" :dragEnable="true" :zoomEnable="true" v-loading="loading">
                <el-amap-marker v-for="(marker, index) in markers" :draggable="true" :key="marker.cinema_id" :position="marker.position" :events="events" :vid="marker.cinema_id"></el-amap-marker>
                <el-amap-info-window
                    v-for="(marker, index) in markers"
                    :position="marker.position"
                    :offset="mapOffset"
                    :autoMove="false"
                    :events="events1"
                    v-if="marker.visible"
                    :vid="marker.cinema_id"
                    :visible="marker.visible">
                    <ul class="equipment-map-container">
                        <li class="clear">
                            <div class="col-xs-1 text-bold map-title">代理商名称:</div>
                            <div class="col-xs-11 text-center">{{marker.agent_name}}</div>
                        </li>
                        <li class="clear">
                            <div class="col-xs-1 text-bold map-title">影院名称:</div>
                            <div class="col-xs-11 text-center">{{marker.cinema_name}}</div>
                        </li>
                        <li class="clear">
                            <div class="col-xs-1 text-bold map-title">影厅数量:</div>
                            <div class="col-xs-11 text-center">{{marker.hall_num || 0}}个</div>
                        </li>
                        <li class="clear">
                            <div class="col-xs-1 text-bold map-title">正在播放影厅:</div>
                            <div class="col-xs-11 text-center">{{marker.play_hall_num || 0}}个</div>
                        </li>
                        <li class="clear">
                            <div class="col-xs-1 text-bold map-title">今日预定场次:</div>
                            <div class="col-xs-11 text-center">{{marker.today_reserve_num || 0}}场</div>
                        </li>
                        <li class="clear">
                            <div class="col-xs-1 text-bold map-title">异常影厅:</div>
                            <div class="col-xs-11 text-center">{{marker.error_hall_num || 0}}个</div>
                        </li>
                        <li class="clear">
                            <div class="col-xs-11"></div>
                            <div class="col-xs-1 p-n" style="min-width: 60px;" @click="goDetail(marker.cinema_id, marker.cinema_name)"><a href="javascript:;" class="pull-right">查看详情</a></div>
                        </li>
                    </ul>
                </el-amap-info-window>
            </el-amap>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import SubHeader from '../common/subheader'
    import SearchIpts from '../common/searchIpts'
    import api from '@/api'
    export default {
        data () {
            const self = this
            return {
                data: '',
                searchVal: '',
                zoom: 4,
                loading: false,
                center: [107.1386718750, 38.3416561928],
                mapOffset: [10, -30],
                events: {
                    click: (e) => {
                        self.$nextTick(() => {
                            self.markers.map(val => {
                                val.visible = false
                                if (val.cinema_id === e.target.F.vid) {
                                    val.visible = true
                                }
                            })
                        })
                    },
                    dragend: (e) => {
                        self.$nextTick(() => {
                            console.log(e)
                        })
                    }
                },
                events1: {
                    close: (e) => {
                        self.$nextTick(() => {
                            console.log(e.target.F.vid);
                            self.markers.map(val => {
                                if (val.cinema_id === e.target.F.vid) {
                                    val.visible = false
                                }
                            })
                        })
                    }
                },
                markers: [],
            }
        },
        methods: {
            getList() {
                this.loading = true
                this.$http.post(api.cinema.map, {
                    cinema_name: this.searchVal
                }).then(res => {
                    let that = this
                    setTimeout(function () {
                        that.loading = false
                    }, 500)
                    if (res.data.code === 1) {
                        this.data = res.data.data
                        this.markers = res.data.data.items.map((val, index) => {
                            return {
                                ...val,
                                position: [val.longitude, val.latitude],
                                visible: false
                            }
                        })
                    } else {
                        this.markers = []
                        this.$message({
                            type: 'error',
                            message: res.data.msg
                        })
                    }
                })
            },
            goDetail (id, name) {
                this.$router.push({name: 'map_detail', params: {id: id}, query: {title: name}})
            },
            setHeight () {
                var h = document.documentElement.clientHeight || document.body.clientHeight
                document.getElementById('cinemaMap').style.height = h - 220 + 'px'
            },
            refresh () {
                this.getList()
            }
        },
        created () {
            this.getList()
        },
        mounted () {
            this.setHeight()
            window.addEventListener('resize', this.setHeight, false)
        },
        beforeDestroy () {
            window.removeEventListener('resize', this.setHeight, false)
        }
    }
</script>
<style scoped>
    .map-container {
        height: 600px;
        margin: 20px auto 0;
    }
    .equipment-map-container {
        width: 300px;
        margin-top: 10px;
    }
    .equipment-map-container li {
        margin-bottom: 5px;
        display: flex;
    }
    .equipment-map-container li > div {
        flex-grow: 1;
    }
    .page-container {
        padding: 20px;
        margin-top: 15px;
    }
    .map-title {
        min-width: 100px;
        text-align: right;
        padding: 0;
    }
    .col-7-1 {
        width: 14.28%;
        float: left;
    }
</style>
