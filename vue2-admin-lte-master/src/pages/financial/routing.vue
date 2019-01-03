<template>
    <div v-loading="loading">
        <div class="p-lg">
            <sub-header :list="subNavList"></sub-header>
            <div class="page-container">
                <div class="lk-table m-t-sm">
                    <ul class="table-thead clear">
                        <li class="col-xs-1 p-n" v-show="selectVal.indexOf('序号')!=-1" style="max-width: 60px;">序号</li>
                        <li class="col-xs-2 p-n" v-show="selectVal.indexOf('合作方')!=-1">合作方</li>
                        <li class="col-xs-1 p-n" v-show="selectVal.indexOf('分账比例')!=-1">分账比例</li>
                        <li class="col-xs-1 p-n" v-show="selectVal.indexOf('操作')!=-1" style="min-width: 130px;">操作</li>
                    </ul>
                    <ul class="table-tbody clear" v-for="(item, index) in data">
                        <li class="col-xs-1 p-n" v-show="selectVal.indexOf('序号')!=-1" style="max-width: 60px;">{{index + 1}}</li>
                        <li class="col-xs-2 p-n over-omit" v-show="selectVal.indexOf('合作方')!=-1" :title="item.name">{{item.name}}</li>
                        <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('分账比例')!=-1" :title="item.proportion">{{item.proportion}}%</li>
                        <li class="col-xs-1 p-n" v-show="selectVal.indexOf('操作')!=-1" style="min-width: 130px;">
                            <a href="javascript:;" class="link" @click.stop="openAccount(item)">编辑</a>
                            <a href="javascript:;" class="link" @click.stop="delItem(item.id)">删除</a>
                        </li>
                    </ul>
                </div>
                <el-dialog
                    title="分账设置"
                    :visible.sync="accountModal"
                    custom-class="dialog-modal2"
                    :close-on-click-modal="false">
                    <div class="text-center m-t-lg clear">
                        <div class="clear m-b-sm">
                            <div class="col-xs-12 col-md-2 p-v-sm p-r-n text-right min-width-105">分账比例:</div>
                            <div class="col-xs-11 col-md-6">
                                <el-input placeholder="请输入分账比例" v-model="accountNum"></el-input>
                            </div>
                            <div class="col-xs-1 col-md-1 p-n text-left line-height-40">
                                %
                            </div>
                        </div>
                        <div class="col-xs-12 col-md-9 m-t-lg">
                            <el-button type="primary" @click="setAccount">确 定</el-button>
                            <el-button @click="accountModal = false">取 消</el-button>
                        </div>
                    </div>
                </el-dialog>
            </div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import SubHeader from '../common/subheader'
    import api from '@/api'
    import SelectCheckbox from '@/components/SelectCheckbox'
    import SearchIpts from '../common/searchIpts'
    export default {
        //组件
        components: {
            SelectCheckbox,
            SearchIpts,
            SubHeader
        },
        data: () => ({
            data: [],
            accountModal: false,
            accountNum: '',
            accountItem: {},
            loading: false,
            selectVal: ['序号', '合作方', '分账比例', '操作'],
            showList: ['序号', '合作方', '分账比例', '操作'],
            subNavList: {
                parentNode: {
                    name: '财务管理',
                    router: {
                        name: 'financial_statistics'
                    }
                },
                childNode: {
                    name: '分账设置',
                    desc: '主要用于分账的查看及管理',
                    router: {
                        name: 'financial_routing'
                    }
                }
            },
        }),
        methods: {
            getList () {
                this.$http.get(api.financial.routing).then(res => {
                    if (res.data.code === 1) {
                        this.data = res.data.data
                    } else {
                        this.data = []
                        this.$message.error(res.data.msg)
                    }
                })
            },
            openAccount (item) {
                this.accountNum = item.proportion || 0
                this.accountItem = item
                this.accountModal = true
            },
            setAccount () {
                if (this.accountNum) {
                    if (!/^100$|^(\d|[1-9]\d)(\.\d{1,2})*$/.test(this.accountNum)) {
                        this.$message({
                            type: 'warning',
                            message: '分账比例为100以内正数,且最多保留两位小数'
                        })
                        return
                    }
                    this.$http.post(api.financial.setAccount, {
                        proportion: this.accountNum,
                        id: this.accountItem.id
                    }).then(res => {
                        if (res.data.code === 1) {
                            this.$message({
                                type: 'success',
                                message: '分账设置成功'
                            })
                            this.getList()
                            this.accountModal = false
                        } else {
                            this.$message({
                                type: 'error',
                                message: res.data.msg
                            })
                        }
                    })
                }  else {
                    this.$message({
                        type: 'warning',
                        message: '请输入分账比例'
                    })
                }
            },
            //删除
            delItem(id) {
                this.$confirm('此操作将删除该合作方, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$http.get(api.financial.routingDel, {
                        params: {
                            id: id
                        }
                    }).then(res => {
                        if (res.data.code === 1) {
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            })
                            this.getList()
                        } else {
                            this.$message({
                                type: 'warning',
                                message: res.data.msg
                            })
                        }
                    })
                }).catch(() => {
                })
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
</style>
