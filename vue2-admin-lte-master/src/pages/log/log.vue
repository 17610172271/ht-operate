<template>
    <div class="">
        <div class="p-lg appli-container">
            <sub-header :list="subNavList"></sub-header>
            <div class="page-container">
                <div class="m-t-sm">
                    日志管理
                </div>
            </div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import SubHeader from '../common/subheader'
    import api from '@/api'
    export default {
        data: () => ({
            data: '',
            subNavList: {
                parentNode: {
                    name: '日志管理',
                    router: {
                        name: 'log_list'
                    }
                },
                childNode: {
                    name: '日志列表',
                    desc: '主要用日志的查看及管理',
                    router: {
                        name: 'log_list'
                    }
                }
            }
        }),
        components: {
            SubHeader
        },
        methods: {
        },
        created () {
            this.page = this.$route.query.page ? parseInt(this.$route.query.page) : 1
        }
    }
</script>
<style scoped>
</style>
