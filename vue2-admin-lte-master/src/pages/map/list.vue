<template>
    <div class="p-lg">
        <div >
            <span style="font-size: 22px;color: #000000;margin-right: 8px;">影院地图</span>
            <span class="content-muted-xs">影院地图分布</span>
        </div>
        <div class="page-container">
            <div class="clear p-b-sm">
                <div class="pull-left app-refresh btn bg-gray1 m-r-md" title="刷新" @click="refresh"><i class="fa fa-refresh text-white"></i></div>
                <div class="pull-left text-blue p-v-sm">目前已有{{data.cinema_num || 0}}个影院正常使用，涉及{{data.province_num || 0}}个省，{{data.city_num || 0}}个市。</div>
                <div class="pull-right clear flex" style="width: 550px;">
                    <div class="col-xs-1" style="min-width: 80px;padding: 10px 0;">代理商级别:</div>
                    <el-select  class="col-xs-5 p-l-n" clearable v-model="selectVal" placeholder="请选择">
                        <el-option
                            v-for="item in agentOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                    <div class="col-xs-1" style="min-width: 80px;padding: 10px 0;">代理商名称:</div>
                    <el-input v-model="searchVal" style="max-width: 180px;" class="col-xs-3 p-n" placeholder="请输入代理商名称" clearable @keyup.enter.native="getList"></el-input>
                    <div class="col-xs-1 p-n" style="min-width: 60px;padding: 3px 5px;">
                        <a href="javascript:;" type="primary" class="btn border"  @click="getList">搜索</a>
                    </div>
                </div>
            </div>
            <el-amap vid="amap" id="cinemaMap" style="height: 550px;" :zoom="zoom" :center="center" :dragEnable="true" :zoomEnable="true" v-loading="loading">
                <el-amap-marker v-for="(marker, index) in markers" :draggable="false" :key="marker.cinema_id" :position="marker.position" :events="events" :vid="marker.cinema_id"></el-amap-marker>
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
                        <li class="clear" v-if="getNavList['40201']">
                            <div class="col-xs-11"></div>
                            <div class="col-xs-1 p-n" style="min-width: 60px;" @click="goDetail(marker.cinema_id, marker.cinema_name)" ><a href="javascript:;" class="pull-right">查看详情</a></div>
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
    import { mapGetters } from 'vuex'
    export default {
        data () {
            const self = this
            return {
                data: '',
                searchVal: '',
                selectVal: '',
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
                agentOptions: [
                    {
                        label: '请选择',
                        value: ''
                    },
                    {
                        label: '一级代理商',
                        value: 1
                    },
                    {
                        label: '二级代理商',
                        value: 2
                    },
                    {
                        label: '三级代理商',
                        value: 3
                    }
                ],
                markers: [],
            }
        },
        computed: {
            ...mapGetters([
                'getNavList'
            ])
        },
        methods: {
            getList() {
                this.loading = true
                this.$http.post(api.cinema.map, {
                    agent_name: this.searchVal,
                    level: this.selectVal
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
                this.searchVal = ''
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
