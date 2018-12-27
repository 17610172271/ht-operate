<template>
    <div v-loading="loading">
        <div class="p-lg appli-container">
            <sub-header :list="subNavList"></sub-header>
            <div class="page-container">
                默认统计
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
            loading: false,
            subNavList: {
                parentNode: {
                    name: '财务管理管理',
                    router: {
                        name: 'financial_statistics'
                    }
                },
                childNode: {
                    name: '默认统计',
                    desc: '主要用于财务默认统计的查看及管理',
                    router: {
                        name: 'financial_statistics'
                    }
                }
            },
        }),
        methods: {
            getData () {}
        },
        created () {
            this.getData()
        },
        watch: {
        }
    }
</script>
<style scoped>
</style>
