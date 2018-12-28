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
                    <ul class="table-tbody clear" v-for="(item, index) in data.items">
                        <li class="col-xs-1 p-n" v-show="selectVal.indexOf('序号')!=-1" style="max-width: 60px;">{{offset + index + 1}}</li>
                        <li class="col-xs-2 p-n over-omit" v-show="selectVal.indexOf('合作方')!=-1" :title="item.code">{{item.code}}</li>
                        <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('分账比例')!=-1" :title="item.name">{{item.name}}</li>
                        <li class="col-xs-1 p-n" v-show="selectVal.indexOf('操作')!=-1" style="min-width: 130px;">
                            <a href="javascript:;" class="link">结算</a>
                            <router-link :to="{name: 'clearingDetail', params: {id: item.id}}" href="javascript:;" class="link">详情</router-link>
                            <a href="javascript:;" class="link">上传凭证</a>
                        </li>
                    </ul>
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
                items: []
            },
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
        },
        created () {
        },
        watch: {
        }
    }
</script>
<style scoped>
</style>
