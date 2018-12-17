<template>
    <div class="">
        <div class="p-lg appli-container">
            <sub-header :list="subNavList"></sub-header>
            <div class="page-container">
                <div class="m-t-sm">
                    播放统计
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
                    name: '数据统计',
                    router: {
                        name: 'statistics_order'
                    }
                },
                childNode: {
                    name: '播放统计',
                    desc: '主要用于会员的查看及统计',
                    router: {
                        name: 'statistics_vip'
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
