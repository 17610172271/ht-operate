<template>
    <div class="bg-white">
        <div class="p-md border-bottom relative">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{name: 'home'}">首页</el-breadcrumb-item>
                <el-breadcrumb-item :to="{name: 'map_list'}">影院地图统计</el-breadcrumb-item>
                <el-breadcrumb-item>影院详情</el-breadcrumb-item>
            </el-breadcrumb>
            <a href="javascript:;" class="btn bg-blue1 text-white btn-back" @click="goBack">返回</a>
        </div>
        <div class="p-o-lg p-v-sm" style="padding-bottom: 50px;" v-loading="loading">
            <h5 class="text-xxlg text-bold p-b-sm m-n">{{$route.query.title || '影院信息'}}</h5>
            <el-collapse class="p-v-sm p-o-md" v-model="activeNames" @change="handleChange">
                <el-collapse-item name="playing">
                    <template slot="title"><span class="text-bold text-lg">正在播放 ({{data.play_hall_num}}场)</span></template>
                    <div class="clear flex p-v-sm" v-for="item in data.play_hall">
                        <div class="col-xs-3" style="max-width: 250px;">{{item.hall_name}}</div>
                        <div class="col-xs-9">
                            <span style="min-width: 160px;display:inline-block;">{{item.film_name}}</span>
                            <span class="m-l-sm">{{item.time}}</span>
                        </div>
                    </div>
                </el-collapse-item>
                <el-collapse-item name="reserve">
                    <template slot="title"><span class="text-bold text-lg">今日预定 ({{data.today_reserve_num}}场)</span></template>
                    <div class="clear">
                        <div class="col-xs-6 p-v-sm" v-for="item in data.today_reserve" :class="{'text-999': item.is_expire==1}">
                            <span class="m-r-lg">{{item.hall_name}}</span>
                            <span class="m-r-sm" style="min-width: 160px;display:inline-block;">{{item.film_name}}</span>
                            <span>{{item.time}}</span>
                        </div>
                    </div>
                </el-collapse-item>
                <el-collapse-item name="all">
                    <template slot="title"><span class="text-bold text-lg">全部影厅 ({{data.hall_num}}个)</span></template>
                    <div class="clear flex p-v-sm" v-for="item in data.hall">
                        <div class="col-xs-3" style="max-width: 250px;">{{item.hall_name}}</div>
                        <div class="col-xs-9" :class="item.status==1?'text-green':'text-red'">{{item.status_name}}</div>
                    </div>
                </el-collapse-item>
            </el-collapse>
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
                loading: false,
                activeNames: 'playing'
            }
        },
        components: {
            SubHeader
        },
        methods: {
            getList () {
              this.$http.get(api.cinema.mapDetail, {
                  params: {
                      id: this.$route.params.id || ''
                  }
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
            goBack () {
                this.$router.go(-1)
            },
            handleChange () {},
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
