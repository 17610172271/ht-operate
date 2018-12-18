<template>
    <div class="p-lg appli-container">
        <sub-header :list="subNavList"></sub-header>
        <div class="page-container">
            <div class="map-container m-t-lg">
                <el-amap vid="amap" style="height: 550px;" :zooms="zooms" zoom="14" :center="center" :dragEnable="true" :zoomEnable="true">
                    <el-amap-marker v-for="(marker, index) in markers" :position="marker.position" :info="marker.info.visible" :events="events" :vid="marker.id"></el-amap-marker>
                    <el-amap-info-window
                        v-for="(marker, index) in markers"
                        :position="marker.position"
                        :offset="mapOffset"
                        :autoMove="false"
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
                zooms: [3, 18],
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
                markers: []
            }
        },
        components: {
            SubHeader,
            SearchIpts
        },
        methods: {
            getList() {
                this.$http.post(api.cienma.map, {
                    cinema_name: ''
                }).then(res => {
                    if (res.data.code === 1) {
                        this.statistics = res.data.data.statistics
                        this.markers = res.data.data.items.map((val, index) => {
                            return {
                                ...val,
                                visible: index === 0 ? true : false
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
            getCinema () {
                this.$http.post(api.cinema.getAllList).then(res => {
                    if (res.data.code === 1) {
                        this.searchOptions[0].options = res.data.data.map(val => {
                            return {
                                label: val.name,
                                value: val.id
                            }
                        })
                    } else {
                        this.searchOptions[0].options = []
                    }
                })
            },
            goDetail (id) {
              this.$router.push({name: 'map_detail', params: {id: id}})
            },
            doSearch (data) {
                this.page = 1
                this.searchOptions = data
                this.getList()
            },
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
                    this.getCinema()
                }
            }
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
