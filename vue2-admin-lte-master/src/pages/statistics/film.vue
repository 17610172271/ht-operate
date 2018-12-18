<template>
    <div class="">
        <div class="p-lg">
            <sub-header :list="subNavList"></sub-header>
            <div class="page-container">
                <div class="m-t-sm">
                    影片统计
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
                        name: 'statistics_agent'
                    }
                },
                childNode: {
                    name: '影片统计',
                    desc: '主要用于影片的查看及统计',
                    router: {
                        name: 'statistics_film'
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
