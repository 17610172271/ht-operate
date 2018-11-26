<template>
    <!--管理员账号列表-->
    <div v-loading="loading">
        <div class="p-lg appli-container">
            <sub-header :list="subNavList"></sub-header>
            <div class="page-container">
                <div class="page-toolbar clear m-t-sm">
                    <search-ipts :options="searchOptions" @submit="doSearch" v-show="searchShow"></search-ipts>
                    <div class="pull-left toolbar-candle clear">
                        <!--<a href="javascript:;" title="删除" class="app-add btn bg-red1 text-white"-->
                           <!--@click="delItem(selectedGroup)"><i class="fa fa-trash"></i>删除</a>-->
                        <div class="app-refresh btn bg-gray1" title="刷新" @click="refresh"><i
                            class="fa fa-refresh"></i></div>
                    </div>
                    <div class="pull-right clear">
                        <div class="pull-left m-r-sm opacity-8" title="列">
                            <select-checkbox :list="showList" v-model="selectVal" style="width: 60px;"></select-checkbox>
                        </div>
                        <div class="pull-left btn opacity-8 search-btn" @click="searchShow = !searchShow"><i
                            class="fa fa-search" title="搜索"></i></div>
                    </div>
                </div>
                <div class="page-contaoner">
                    <div class="lk-table m-t-sm">
                        <ul class="table-thead clear">
                            <li class="col-xs-24 p-n select-box">
                                <el-checkbox v-model="selectAll">全选</el-checkbox>
                            </li>
                            <li class="col-xs-24 p-n" v-show="selectVal.indexOf('ID')!=-1">ID</li>
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('内容')!=-1">内容</li>
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('名称')!=-1">名称</li>
                            <li class="col-xs-24 p-n" v-show="selectVal.indexOf('状态')!=-1">状态</li>
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('操作')!=-1">操作</li>
                        </ul>
                        <ul class="table-tbody clear" v-for="(item, index) in data.items" @click="selectItem(item.id)">
                            <li class="col-xs-24 p-n select-box">
                                <el-checkbox :label="item.id" v-model="selectedGroup"></el-checkbox>
                            </li>
                            <li class="col-xs-24 p-n" v-show="selectVal.indexOf('ID')!=-1" :title="item.id">{{item.id}}</li>
                            <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('内容')!=-1" :title="item.content">{{item.content}}</li>
                            <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('名称')!=-1" :title="item.send_name">{{item.send_name}}</li>
                            <li class="col-xs-24 p-n over-omit" v-show="selectVal.indexOf('状态')!=-1" :title="item.status" :class="item.status=='未读'?'text-red':'text-green'">{{item.status}}</li>
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('操作')!=-1">
                                <a href="javascript:;" title="详情" class="candle-btn btn" @click.stop="openDetail(item)"><i
                                    class="fa fa-search-plus"></i></a>
                                <a href="javascript:;" title="标记已读" class="candle-btn btn" @click.stop="read(item)"><i
                                    class="fa fa-check-square-o"></i></a>
                                <!--<a href="javascript:;" title="删除" class="candle-btn btn"-->
                                   <!--@click.stop="delItem([item.id])"><i class="fa fa-trash"></i></a>-->
                            </li>
                        </ul>
                        <ul class="table-tbody clear" v-if="data.items.length===0">
                            <li class="p-n over-omit">暂无更多数据</li>
                        </ul>
                    </div>
                    <div class="footer clear m-t-md">
                        <div class="pull-left news-record text-lg">
                            <span v-show="data.length>0">显示{{offset + 1}}到{{offset + data.items.length}}条记录，</span>共<span
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
                                <div class="col-xs-2 line-height-40 text-right min-width-105">内容:</div>
                                <div class="col-xs-8 line-height-40">{{detailVal.content}}</div>
                            </div>
                            <div class="clear">
                                <div class="col-xs-2 line-height-40 text-right min-width-105">状态:</div>
                                <div class="col-xs-8 line-height-40">{{detailVal.status}}</div>
                            </div>
                            <div class="clear bg-f9">
                                <div class="col-xs-2 line-height-40 text-right min-width-105">名称:</div>
                                <div class="col-xs-8 line-height-40">{{detailVal.send_name}}</div>
                            </div>
                            <div class="clear">
                                <div class="col-xs-2 line-height-40 text-right min-width-105">创建时间:</div>
                                <div class="col-xs-8 line-height-40">{{format(detailVal.time*1000)}}</div>
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
                curr: 1,
                total: 1,
                total_page: 1,
                items: []
            },
            teamOptions: [],
            loading: false,
            modalLoading: false,
            selectVal: ['ID', '内容', '名称','状态', '操作'],
            showList: ['ID', '内容', '名称','状态', '操作'],
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
            send_idError: false, // 发消息人id
            nicknameError: false,
            emailError: false,
            mobileError: false,
            passwordError: false,
            usernameError: false,
            id: '',
            type: '',
            detailModal: false, // 详情框
            editModal: false, //编辑框
            //头部文字
            subNavList: {
                parentNode: {
                    name: '消息管理',
                    router: {
                        name: 'news_list'
                    }
                },
                childNode: {
                    name: '消息列表',
                    desc: '主要用消息的查看及管理',
                    router: {
                        name: 'news_list'
                    }
                }
            },
            //搜索
            searchOptions: [
                {
                    type: 'select',
                    name: '状态',
                    value: '',
                    options:[
                        {
                            value: 1,
                            label: '已读'
                        },
                        {
                            value: 2,
                            label: '未读'
                        }
                    ]
                },
            ],
        }),
        computed: {
            //页数和总条数
            pages () {
                return this.data.total_page || 1
            },
            offset () {
                return (this.page - 1) * this.limit
            }
        },
        methods: {
            //列表页获取
            getList () {
                this.loading = true
                this.$http.post(api.notice.list, {
                    status: this.searchOptions[0].value,
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
            //删除
//            delItem(id) {
//                if (id.length > 0) {
//                    this.$confirm(id.length > 1 ? '此操作将批量删除选中用户, 是否继续?' : '此操作将删除该用户, 是否继续?', '提示', {
//                        confirmButtonText: '确定',
//                        cancelButtonText: '取消',
//                        type: 'warning'
//                    }).then(() => {
//                        this.$http.get(api.account.delete, {
//                            params: {
//                                id: id.join(',')
//                            }
//                        }).then(res => {
//                            if (res.data.code === 1) {
//                                this.$message({
//                                    type: 'success',
//                                    message: '删除成功!'
//                                })
//                                this.getList()
//                            } else {
//                                this.$message({
//                                    type: 'warning',
//                                    message: res.data.msg
//                                })
//                            }
//                        })
//                    }).catch(() => {
//                    })
//                } else {
//                    this.$message({
//                        type: 'warning',
//                        message: '请选中需要操作的项'
//                    })
//                }
//            },
            // 获取详情
            getDetail (item) {
                this.modalLoading = true
                this.$http.get(api.notice.detail, {
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
                        if (this.type === 'edit') {
                        }
                    } else {
                        this.$message({
                            type: 'warning',
                            message: res.data.msg
                        })
                    }
                })
            },
            //标记已读
            read (item) {
                this.$http.get(api.notice.read, {
                    params: {
                        id: item.id
                    }
                }).then(res => {
                    if (res.data.code === 1) {
                        console.log(111)
                        this.getList()
                    }
                })
            },
            // 打开详情
            openDetail (item) {
                this.detailModal = true
                this.getDetail(item)
                this.read(item)
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
                this.$router.replace({name: 'news_list', query: {page: val}})
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

