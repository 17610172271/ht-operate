<template>
    <!--代理商列表-->
    <div>
        <div class="p-lg appli-container">
            <sub-header :list="subNavList"></sub-header>
            <div class="page-container">
                <div class="page-toolbar clear m-t-sm">
                    <!--<search-ipts :options="searchOptions" @submit="doSearch" v-show="searchShow"></search-ipts>-->
                    <div class="pull-left toolbar-candle clear">
                        <a href="javascript:;" v-if="getNavList['4090201']" title="添加" @click="addItem"
                           class="app-add btn bg-blue1 text-white"><i class="fa fa-plus-square"></i>添加
                        </a>
                        <div class="app-refresh btn bg-gray1" title="刷新" @click="refresh"><i
                            class="fa fa-refresh"></i></div>
                    </div>
                    <div class="pull-right clear">
                        <!--<div class="pull-left m-r-sm opacity-8" title="列">-->
                            <!--<select-checkbox :list="showList" v-model="selectVal" style="width: 60px;"></select-checkbox>-->
                        <!--</div>-->
                        <!--<div class="pull-left btn opacity-8 search-btn" @click="searchShow = !searchShow"><i-->
                            <!--class="fa fa-search" title="搜索"></i></div>-->
                    </div>
                </div>
                <div class="page-contaoner">
                    <div class="lk-table m-t-sm">
                        <ul class="table-thead clear">
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('序号')!=-1" style="max-width: 60px;">序号</li>
                            <li class="col-xs-3 p-n" v-show="selectVal.indexOf('合同类型')!=-1">合同类型</li>
                            <li class="col-xs-24 p-n" v-show="selectVal.indexOf('操作')!=-1" style="min-width: 120px;">操作</li>
                        </ul>
                        <ul class="table-tbody clear" v-for="(item, index) in data.items">
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('序号')!=-1" style="max-width: 60px;">{{offset + index + 1}}</li>
                            <li class="col-xs-3 p-n over-omit" v-show="selectVal.indexOf('合同类型')!=-1" :title="item.type_name">{{item.type_name}}</li>
                            <li class="col-xs-24 p-n" v-show="selectVal.indexOf('操作')!=-1" style="min-width: 120px;">
                                <a href="javascript:;" class="link" v-if="getNavList['4090202']" @click.stop="editItem(item)">编辑</a>
                                <span v-else>---</span>
                            </li>
                        </ul>
                        <ul class="table-tbody clear" v-if="data.items.length===0">
                            <li class="p-n over-omit">暂无更多数据</li>
                        </ul>
                    </div>
                    <el-dialog
                        :title="type=='edit'?'编辑':'添加'"
                        :visible.sync="detailModal"
                        custom-class="dialog-modal1">
                        <div class="clear m-t-sm flex ">
                                <div class="col-xs-2 text-right p-v-sm">合同类型:</div>
                                <div class="col-xs-10">
                                    <el-input placeholder="请输入合同类型" style="max-width: 366px;"  v-model="detailVal.type_name"  :class="{'border-red': openBankError}"  @blur="validateOpenBank"></el-input>
                                    <p v-if="openBankError" class="text-red"><span class="fa fa-close m-r-xs"></span>合同类型不能为空</p>
                                </div>
                        </div>
                        <div class="p-o-sm p-v-sm clear center">
                            <el-button type="primary" @click="checkSubmit(id)">提交</el-button>
                            <el-button @click.stop="detailModal = false">取 消</el-button>
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
    import SelectCheckbox from '@/components/SelectCheckbox'
    import SearchIpts from '../common/searchIpts'
    import { mapGetters } from 'vuex'
    export default {
        //组件
        components: {
            SelectCheckbox,
            SearchIpts,
            SubHeader
        },
        data: () => ({
            data: {
                limit: 10,
                page: 1,
                pageSize: 1,
                total: 1,
                items: [],
            },
            detailVal :{
                type_name :'',
            },
            id:'',
            type:'',
            stopLog:[],
            activeName: 'first',
            loading: false,
            selectVal: ['序号', '合同类型', '操作'],
            showList: ['序号', '合同类型', '操作'],
            options: [10, 25, 50],   //条数数目
            searchShow: false,   //搜索开关
            detailModal:false,
            openBankError:false,
            limit: 10,
            page: 1,
            subNavList: {
                parentNode: {
                    name: '合同管理',
                    router: {
                        name: 'contract_list'
                    }
                },
                childNode: {
                    name: '合同类型',
                    desc: '主要用于合同类型的添加及管理',
                    router: {
                        name: 'contract_list'
                    }
                }
            },
//            //搜索
//            searchOptions: [
//                {
//                    type: 'text',
//                    name: '影院名称',
//                    value: ''
//                },
//                {
//                    type: 'searchSelect',
//                    name: '代理商',
//                    value: '',
//                    options: []
//                },
//                {
//                    type: 'time',
//                    name: '创建起始时间',
//                    value: ''
//                },
//                {
//                    type: 'time',
//                    name: '截止时间',
//                    value: ''
//                },
//                {
//                    type: 'searchSelect',
//                    name: '所属区域',
//                    value: '',
//                    options: []
//                },
//                {
//                    type: 'select',
//                    name: '状态',
//                    value: '',
//                    options: [
//                        {
//                            value: 1,
//                            label:'正常'
//                        },
//                        // {
//                        //     value: 2,
//                        //     label:'待审核'
//                        // },
//                        {
//                            value: 4,
//                            label:'禁用'
//                        },
//
//                    ]
//                },
//            ],
        }),
        computed: {
            //页数和总条数
            pages () {
                return this.data.pageSize || 1
            },
            offset () {
                return (this.page - 1) * this.limit
            },
            ...mapGetters([
                'getNavList'
            ])
        },
        methods: {
            //列表页获取
            getList () {
                this.loading = true
                this.$http.post(api.contract.typelist, {
                    page: this.page,
                    limit: this.limit
                }).then(res => {
                    if (res.data.code === 1) {
                        this.data = res.data.data
                    } else {
                        this.$message({
                            type: 'warning',
                            message: res.data.msg
                        })
                    }
                })
            },
            addItem() {
                this.type= 'add'
                this.detailVal ={
                    type_name :'',
                }
                this.detailModal = true
            },
            checkSubmit(id){
                this.validateOpenBank(this.detailVal.type_name)

                if (this.type === 'edit') {
                    this.$http.post(api.contract.edittype,this.detailVal).then(res => {
                        if (res.data.code === 1) {
                            this.$message({
                                type: 'success',
                                message: '修改成功'
                            })
                            this.detailModal = false
                            this.getList()
                        } else {
                            this.$message({
                                type: 'warning',
                                message: res.data.msg
                            })
                        }
                    })
                } else {
                    this.$http.post(api.contract.addtype, this.detailVal).then(res => {
                        if (res.data.code === 1) {
                            this.$message({
                                type: 'success',
                                message: '添加成功'
                            })
                            this.detailModal = false
                            this.getList()
                        } else {
                            this.$message({
                                type: 'warning',
                                message: res.data.msg
                            })
                        }
                    })
                }
            },
            editItem (item) {
                this.type = 'edit'
                this.detailModal = true
                this.detailVal.type_name = item.type_name
                this.detailVal.id = item.id
            },
            validateOpenBank (val){
                this.openBankError = val ? false : true
            },

            //刷新
            refresh () {
                this.getList()    //列表刷新
            },
            // 搜索
            doSearch (data) {
                this.page = 1
//                this.searchOptions = data
                this.getList()
            },
            // 下一页
            addPage () {
                if (this.page < this.pages) this.page += 1
            },
            // 上一页
            delPage () {
                if (this.page > 1) this.page -= 1
            }
        },
        created () {
            this.page = this.$route.query.page ? parseInt(this.$route.query.page) : 1
            this.getList()
        },
        watch: {

            page (val) {
                this.$router.replace({name: 'contract_list', query: {page: val}})
                this.getList()
            },
            limit (val) {
                this.getList()
            },
            searchShow (searchShow){
                this.getCity()
                this.getAllAgent()
            },
            detailModal(val) {
                if(val){
                    this.openBankError = false
                }
            }
        }
    }
</script>
<style scoped>
</style>
