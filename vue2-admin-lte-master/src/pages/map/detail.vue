<template>
    <div class="p-lg appli-container">
        <sub-header :list="subNavList"></sub-header>
        <div class="page-container">
            <div class="page-toolbar clear">
                <div class="pull-left toolbar-candle clear">
                    <div class="app-refresh btn bg-gray1" title="刷新" @click="refresh"><i class="fa fa-refresh"></i></div>
                </div>
            </div>
            <div class="device-list m-t-md">
                <div class="clear">
                    <div v-for="item in data" class="col-xs-12 col-lg-6 clear" style="padding: 5px;">
                        <div class="device-item">
                            <h5 class="clear">
                                <div class="pull-left">影厅名称: {{item.name}} 影厅号: {{item.code}}</div>
                                <span class="pull-right status-container" :class="item.hall_status=='空闲中'?'bg-green':'bg-red'"></span>
                            </h5>
                            <div class="p-o-sm">
                                <div class="clear m-t-md">
                                    <div class="col-xs-4 p-n">代理商: {{item.agent_name}}</div>
                                    <div class="col-xs-4 p-n">区域代理: {{item.region_agent_name}}</div>
                                    <div class="col-xs-4 p-n">影院名称: {{item.cinema_name}}</div>
                                </div>
                                <div class="clear m-t-md">
                                    <div class="col-xs-4 p-n">影厅: {{item.name}}</div>
                                    <div class="col-xs-4 p-n">设备状态: {{item.device_status}}</div>
                                    <div class="col-xs-4 p-n">影片名称: {{item.film_name}}</div>
                                </div>
                                <div class="m-t-md">播放时间： {{item.play_time}}</div>
                                <div class="m-t-md">NAS服务器: {{item.nas_status}}</div>
                                <ul class="device-status-container clear m-t-lg">
                                    <li class="col-xs-1 p-n center" v-for="device in item.$device_info">
                                        <div>{{device.device_name}}</div>
                                        <div>{{device.status_name}}</div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import SubHeader from '../common/subheader'
    import api from '@/api'
    export default {
        data () {
            return {
                data: '',
                subNavList: {
                    parentNode: {
                        name: '设备分布',
                        router: {
                            name: 'map_list'
                        }
                    },
                    childNode: {
                        name: '设备分布详情',
                        desc: '主要用于查看设备情况',
                        router: {
                            name: 'map_detail'
                        }
                    }
                },
            }
        },
        components: {
            SubHeader
        },
        methods: {
            getList () {
              this.$http.post(api.device.mapDetail, {
                  cinema_id: this.$route.params.id || ''
              }).then(res => {
                  if (res.data.code === 1) {
                      this.data = res.data.data
                  } else {
                      this.data = []
                      this.$message({
                          type: 'error',
                          message: res.data.msg
                      })
                  }
              })
            },
            refresh () {
                this.getList()
            }
        },
        created () {
            this.getList()
        },
        watch: {
        }
    }
</script>
<style scoped>
    .device-item {
        height: 280px;
        border: 1px solid #000;
        padding: 0;
    }
    .device-item h5 {
        margin: 0;
        padding: 10px 10px;
        border-bottom: 1px solid #000;
    }
    .status-container {
        width: 20px;
        height: 20px;
        border: 1px solid #000;
        border-radius: 50%;
    }
    .device-status-container {
        display: flex;
    }
    .device-status-container li {
        flex-grow: 1;
    }
</style>
