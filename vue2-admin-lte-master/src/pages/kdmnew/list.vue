<template>
    <!--管理员账号列表-->
    <div v-loading="loading">
        <div class="p-lg appli-container">
            <sub-header :list="subNavList"></sub-header>
            <div class="page-container">
                <div class="page-toolbar clear m-t-sm">
                    <div class="pull-left toolbar-candle clear">
                        <div class="app-refresh btn bg-gray1" title="刷新" @click="refresh"><i
                            class="fa fa-refresh"></i></div>
                    </div>
                    <div class="pull-right clear">
                        <div class="pull-left m-r-sm opacity-8" title="列">
                            <select-checkbox :list="showList" v-model="selectVal" style="width: 60px;"></select-checkbox>
                        </div>
                    </div>
                </div>
                <div class="page-contaoner">
                    <div class="lk-table m-t-sm">
                        <ul class="table-thead clear">
                            <!--<li class="col-xs-24 p-n select-box">-->
                                <!--<el-checkbox v-model="selectAll">全选</el-checkbox>-->
                            <!--</li>-->
                            <li class="col-xs-24 p-n" v-show="selectVal.indexOf('ID')!=-1">ID</li>
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('kdm编码')!=-1">kdm编码</li>
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('订单编码')!=-1">订单编码</li>
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('影片名称')!=-1">影片名称</li>
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('影厅名称')!=-1">影厅名称</li>
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('失效时间')!=-1">失效时间</li>
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('操作')!=-1">操作</li>
                        </ul>
                        <ul class="table-tbody clear" v-for="(item, index) in data.items" @click="selectItem(item.id)">
                            <!--<li class="col-xs-24 p-n select-box">-->
                                <!--<el-checkbox :label="item.id" v-model="selectedGroup"></el-checkbox>-->
                            <!--</li>-->
                            <li class="col-xs-24 p-n" v-show="selectVal.indexOf('ID')!=-1" :title="item.id">{{item.id}}</li>
                            <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('kdm编码')!=-1" :title="item.kdm_code">{{item.kdm_code}}</li>
                            <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('订单编码')!=-1" :title="item.order_code">{{item.order_code}}</li>
                            <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('影片名称')!=-1" :title="item.film_name">{{item.film_name}}</li>
                            <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('影厅名称')!=-1" :title="item.hall_name">{{item.hall_name}}</li>
                            <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('失效时间')!=-1" :title="format(item.invalidtime*1000)">{{format(item.invalidtime*1000)}}</li>
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('操作')!=-1">
                                <a href="javascript:;" title="详情" class="candle-btn btn" @click.stop="openDetail(item)"><i
                                    class="fa fa-search-plus"></i></a>
                            </li>
                        </ul>
                        <ul class="table-tbody clear" v-if="data.items.length===0">
                            <li class="p-n over-omit">暂无更多数据</li>
                        </ul>
                    </div>
                    <div class="footer clear m-t-md">
                        <div class="pull-left news-record text-lg">
                            <span v-show="data.items.length>0">显示{{offset + 1}}到{{offset + data.items.length}}条记录，</span>共<span
                            class="text-blue">{{data.total}}</span>条记录 每页显示
                            <el-select v-model="limit" placeholder="请选择" style="width: 66px;">
                                <el-option
                                    v-for="(item,index) in options"
                                    :key="index"
                                    :label="item"
                                    :value="item">
                                </el-option>
                            </el-select>
                            条记录
                        </div>
                        <div class="pull-right">
                            <el-pagination
                                background
                                layout="prev, pager, next"
                                :current-page.sync="page"
                                :page-count="pages">
                            </el-pagination>
                        </div>
                    </div>
                    <el-dialog
                        title="详情"
                        :visible.sync="detailModal"
                        custom-class="dialog-modal1">
                        <div v-loading="modalLoading">
                            <div class="clear">
                                <div class="col-xs-2 line-height-40 text-right text-bold min-width-105">标题</div>
                                <div class="col-xs-8 line-height-40 text-bold">内容</div>
                            </div>
                            <div class="clear bg-f9">
                                <div class="col-xs-2 line-height-40 text-right min-width-105">kdm编码:</div>
                                <div class="col-xs-8 line-height-40">{{detailVal.kdm_code}}</div>
                            </div>
                            <div class="clear">
                                <div class="col-xs-2 line-height-40 text-right min-width-105">订单编码:</div>
                                <div class="col-xs-8 line-height-40">{{detailVal.order_code}}</div>
                            </div>
                            <div class="clear bg-f9">
                                <div class="col-xs-2 line-height-40 text-right min-width-105">影厅名称:</div>
                                <div class="col-xs-8 line-height-40">{{detailVal.film_name}}</div>
                            </div>
                            <div class="clear">
                                <div class="col-xs-2 line-height-40 text-right min-width-105">影厅名称:</div>
                                <div class="col-xs-8 line-height-40">{{detailVal.hall_name}}</div>
                            </div>
                            <div class="clear bg-f9">
                                <div class="col-xs-2 line-height-40 text-right min-width-105">失效时间:</div>
                                <div class="col-xs-8 line-height-40">{{format(detailVal.invalidtime*1000)}}</div>
                            </div>
                        </div>
                    </el-dialog>
                </div>
            </div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import SubHeader from '../common/subheader'
    import api from '@/api'
    import format from '@/tools/format'
    import validate from '@/tools/validate'
    import SelectCheckbox from '@/components/SelectCheckbox'
    import SearchIpts from '../common/searchIpts'
    export default {
        //组件
        components: {
            SelectCheckbox,
            SearchIpts,
            SubHeader,
        },
        data: () => ({
            data: {
                limit: 10,
                page: 1,
                pageSize: 1,
                total: 1,
                items: []
            },
            teamOptions: [],
            loading: false,
            modalLoading: false,
            selectVal: ['ID', 'kdm编码', '订单编码', '影片名称', '影厅名称', '失效时间','操作'],
            showList: ['ID', 'kdm编码', '订单编码', '影片名称', '影厅名称', '失效时间', '操作'],
            options: [10, 25, 50],   //条数数目
            searchShow: false,   //搜索开关
            selectAll: false,    //多选框开关
            selectedGroup: [], // 多选框选中值
            limit: 10,
            page: 1,
            //编辑
            detailVal:{
                group_id: '',
                username:'',
                nickname:'',
                mobile: '',
                email:'',
                password: '',
                status: 1
            }, // 编辑详情弹出框值
            groupError: false,
            usernameError: false,
            nicknameError: false,
            emailError: false,
            mobileError: false,
            passwordError: false,
            id: '',
            type: '',
            detailModal: false, // 详情框
            editModal: false, //编辑框
            //头部文字
            subNavList: {
                parentNode: {
                    name: 'kdm列表',
                    router: {
                        name: 'kdmnew_list'
                    }
                },
                childNode: {
                    name: 'kdm列表',
                    desc: '主要用于KDM的查看及管理',
                    router: {
                        name: 'kdmnew_list'
                    }
                }
            },
            //搜索
            searchOptions: [],
        }),
        computed: {
            //页数和总条数
            pages () {
                return this.data.pageSize || 1
            },
            offset () {
                return (this.page - 1) * this.limit
            }
        },
        methods: {
            //列表页获取
            getList () {
                this.loading = true
                this.$http.post(api.kdm.list, {
                    page: this.page,
                    limit: this.limit
                }).then(res => {
                    this.selectedGroup = []
                    let that = this
                    setTimeout(function () {
                        that.loading = false
                    }, 500)
                    if (res.data.code === 1) {
                        this.data = res.data.data
                    } else {
                        this.data = {
                            limit: 10,
                            page: 1,
                            pageSize: 1,
                            total: 1,
                            items: []
                        }
                        this.$message({
                            type: 'warning',
                            message: res.data.msg
                        })
                    }
                })
            },
            // 获取详情
            getDetail (item) {
                this.modalLoading = true
                this.$http.get(api.kdm.detail, {
                    params: {
                        id: item.id
                    }
                }).then(res => {
                    if (res.data.code === 1) {
                        let that = this
                        setTimeout(function () {
                            that.modalLoading = false
                        }, 500)
                        this.detailVal = res.data.data
                        console.log(res.data.data)
                        if (this.type === 'edit') {
                            this.getGroupList()
                        }
                    } else {
                        this.$message({
                            type: 'warning',
                            message: res.data.msg
                        })
                    }
                })
            },
            // 打开详情
            openDetail (item) {
                this.detailModal = true
                this.getDetail(item)
            },
            //刷新
            refresh () {
                this.getList()    //列表刷新
            },
            // 搜索
            doSearch (data) {
                this.page = 1
                this.searchOptions = data
                this.getList()
            },
            // 点击该行复选框选中
            selectItem (id) {
                if (this.selectedGroup.indexOf(id) !== -1) {
                    this.selectedGroup.splice(this.selectedGroup.indexOf(id), 1)
                } else {
                    this.selectedGroup.push(id)
                }
            },
            // 下一页
            addPage () {
                if (this.page < this.pages) this.page += 1
            },
            // 上一页
            delPage () {
                if (this.page > 1) this.page -= 1
            },
            format: format
        },
        created () {
            this.page = this.$route.query.page ? parseInt(this.$route.query.page) : 1
            this.getList()
        },
        watch: {
            //监听checkbook
            selectedGroup (val) {
                if (val.length === this.data.items.length && val.length > 0) {    //全选全不选
                    this.selectAll = true
                } else {
                    this.selectAll = false
                }
            },
            //全选全不选
            selectAll (val) {
                if (val) {
                    this.selectedGroup = []
                    this.data.items.map(val => {
                        this.selectedGroup.push(val.id)
                    })
                } else {
                    if (this.selectedGroup.length !== this.data.items.length - 1) {
                        this.selectedGroup = []
                    }
                }
            },
            page (val) {
                this.$router.replace({name: 'kdmnew_list', query: {page: val}})
                this.getList()
            },
            limit (val) {
                this.getList()
            },
            editModal (val) {
                if (val) {
                    this.groupError = false
                    this.usernameError = false
                    this.nicknameError = false
                    this.emailError = false
                    this.mobileError = false
                    this.passwordError = false
                }
            }
        }
    }
</script>
<style>

</style>

