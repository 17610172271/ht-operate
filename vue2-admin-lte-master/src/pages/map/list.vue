<template>
    <div class="p-lg appli-container">
        <sub-header :list="subNavList"></sub-header>
        <div class="page-container">
            <h5 class="text-xlg text-bold">分布数据</h5>
            <div class="clear flex">
                <div class="m-t-sm p-r-sm p-l-n text-white col-7-1" v-for="(item, index) in statistics">
                    <div class="equipment-statistics-item p-o-sm" :class="bgColor[index]">
                        <div class="text-md">{{item.region_name}}</div>
                        <div class="text-center text-lg m-t-sm">{{item.total}} 台</div>
                    </div>
                </div>
            </div>
            <div class="page-toolbar clear m-t-lg">
                <search-ipts :options="searchOptions" @submit="doSearch" v-if="searchShow"></search-ipts>
                <div class="pull-left toolbar-candle clear">
                    <div class="app-refresh btn bg-gray1" title="刷新" @click="refresh"><i class="fa fa-refresh"></i></div>
                </div>
                <div class="pull-right clear m-r-sm">
                    <div class="pull-left btn opacity-8 search-btn" @click="searchShow = !searchShow"><i class="fa fa-search" title="搜索"></i></div>
                </div>
            </div>
            <div class="map-container m-t-lg">
                <el-amap vid="amap" style="height: 550px;width: 800px;" zooms="14" :center="center" :dragEnable="true" :zoomEnable="false">
                    <el-amap-marker v-for="(marker, index) in markers" :position="marker.position" :info="marker.info.visible" :events="events" :vid="marker.id"></el-amap-marker>
                    <el-amap-info-window
                        v-for="(marker, index) in markers"
                        :position="marker.position"
                        :offset="mapOffset"
                        :visible="marker.visible">
                        <ul class="equipment-map-container">
                            <li class="text-center border-bottom text-bold text-lg" style="display: block; padding: 5px 0;margin-bottom: 10px;">{{marker.info.region_agent_name}}</li>
                            <li class="clear">
                                <div class="col-xs-1 text-bold map-title">影院名称:</div>
                                <div class="col-xs-11">{{marker.info.cinema_name}}</div>
                            </li>
                            <li class="clear">
                                <div class="col-xs-1 text-bold map-title">影院地点:</div>
                                <div class="col-xs-11">{{marker.info.address}}</div>
                            </li>
                            <li class="clear">
                                <div class="col-xs-1 text-bold map-title">播放设备:</div>
                                <div class="col-xs-11">{{marker.info.play || 0}}台</div>
                            </li>
                            <li class="clear">
                                <div class="col-xs-1 text-bold map-title">待机设备:</div>
                                <div class="col-xs-11">{{marker.info.wait || 0}}台</div>
                            </li>
                            <li class="clear">
                                <div class="col-xs-1 text-bold map-title">异常设备:</div>
                                <div class="col-xs-11">{{marker.info.abnormal || 0}}台</div>
                            </li>
                            <li class="clear">
                                <div class="col-xs-11"></div>
                                <div class="col-xs-1 p-n" style="min-width: 60px;" @click="goDetail(marker.id)"><a href="javascript:;" class="pull-right">查看详情</a></div>
                            </li>
                        </ul>
                    </el-amap-info-window>
                </el-amap>
            </div>
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
                regionAgentList: [],
                cinemaList: [],
                searchShow: false,
                center: [107.1386718750, 38.3416561928],
                mapOffset: [10, -30],
                events: {
                    click: (e) => {
                        console.log(e.target.F.vid)
                        self.$nextTick(() => {
                            self.markers.map(val => {
                                val.visible = false
                                if (val.id === e.target.F.vid) {
                                    val.visible = true
                                }
                            })
                        })
                        console.log(this.markers)
                    }
                },
                markers: [],
                statistics: {},
                bgColor: ['bg-blue1', 'bg-qing', 'bg-green', 'bg-green1', 'bg-orange', 'bg-yellow', 'bg-red'],
                subNavList: {
                    parentNode: {
                        name: '地图分布',
                        router: {
                            name: 'map_list'
                        }
                    },
                    childNode: {
                        name: '设备分布',
                        desc: '主要用于设备的分布及查看',
                        router: {
                            name: 'map_list'
                        }
                    }
                },
                searchOptions: [
                    {
                        type:'city',
                        name:'地区',
                        value:''
                    },
                    {
                        type:'searchSelect',
                        name:'区域代理商',
                        value:'',
                        options: []
                    },
                    {
                        type:'select',
                        name:'设备状态',
                        value:'',
                        options: [
                            {
                                value: 1,
                                label: '播放中'
                            },
                            {
                                value: 2,
                                label: '暂停'
                            }
                        ]
                    }
                ],
            }
        },
        components: {
            SubHeader,
            SearchIpts
        },
        methods: {
            getList() {
                this.$http.post(api.device.map).then(res => {
                    if (res.data.code === 1) {
                        this.statistics = res.data.data.statistics
                        this.markers = res.data.data.items.map((val, index) => {
                            return {
                                ...val,
                                visible: index === 0 ? true : false
                            }
                        })
                        console.log(this.markers)
                    } else {
                        this.markers = []
                        this.$message({
                            type: 'error',
                            message: res.data.msg
                        })
                    }
                })
            },
            getRegionAgent () {
                this.$http.post(api.circuit.getAllList).then(res => {
                    if (res.data.code === 1) {
                        this.searchOptions[1].options = res.data.data.map(val => {
                            return {
                                label: val.name,
                                value: val.id
                            }
                        })
                    } else {
                        this.searchOptions[1].options = []
                    }
                })
            },
            getCinema () {
                this.$http.post(api.cinema.getAllList).then(res => {
                    if (res.data.code === 1) {
                        this.searchOptions[2].options = res.data.data.map(val => {
                            return {
                                label: val.name,
                                value: val.id
                            }
                        })
                    } else {
                        this.searchOptions[2].options = []
                    }
                })
            },
            goDetail (id) {
              this.$router.push({name: 'map_detail', params: {id: id}})
            },
            doSearch () {},
            refresh () {
                this.getList()
            }
        },
        created () {
            this.page = this.$route.query.page ? parseInt(this.$route.query.page) : 1
            this.getList()
        },
        watch: {
            searchShow (val) {
                if (val) {
                    this.getRegionAgent()
                    this.getCinema()
                }
            }
        }
    }
</script>
<style scoped>
    .map-container {
        width: 800px;
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
    .map-title {
        min-width: 80px;
        text-align: right;
        padding: 0;
    }
    .col-7-1 {
        width: 14.28%;
        float: left;
    }
</style>
