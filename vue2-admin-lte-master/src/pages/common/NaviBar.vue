<template>
    <header class="main-header">
        <!-- Logo -->
        <router-link :to="{name: 'home'}" class="logo">
            <!-- mini logo for sidebar mini 50x50 pixels -->
            <span class="logo-mini" style="font-size: 14px;">SPCB</span>
            <!-- logo for regular state and mobile devices -->
            <span class="logo-lg"><b>航天运营管理平台</b></span>
        </router-link>

        <!-- Header Navbar: style can be found in header.less -->
        <nav class="navbar navbar-static-top">
            <!-- Sidebar toggle button-->
            <a href="#" class="sidebar-toggle" data-toggle="push-menu" role="button">
                <span class="sr-only">Toggle navigation</span>
            </a>
            <router-link :to="{name: 'home'}" class="link-home-icon"><span class="fa fa-home fa-lg"
                                                                           style="color: #fff;"></span></router-link>
            <!-- Navbar Right Menu -->
            <div class="navbar-custom-menu">
                <ul class="nav navbar-nav p-r-md">
                    <li class="dropdown top-nav-username hidden-xs"><a href="javascript:;">欢迎您， {{getAuthInfo.nickname
                        || getAuthInfo.username}} !</a></li>
                    <!-- Notifications: style can be found in dropdown.less -->
                    <!--<li class="dropdown notifications-menu">-->
                        <!--<router-link :to="{name: 'news_list'}" class="dropdown-toggle" title="消息">-->
                            <!--<i class="fa fa-bell-o"></i>-->
                            <!--<span class="label label-warning">{{ getNewsNum }}</span>-->
                        <!--</router-link>-->
                    <!--</li>-->
                    <!-- User Account: style can be found in dropdown.less -->
                    <li class="dropdown user user-menu">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                            <img
                                :src="getAuthInfo.avatar ? getAuthInfo.avatar : '../../../static/img/home/avatar.png'"
                                class="user-image nav-avatar-container" alt="avatar">
                            <i class="fa fa-chevron-down"></i>
                        </a>
                        <ul class="dropdown-menu">
                            <!-- User image -->
                            <li class="user-header navbar-drop-menu">
                                <div class="slide-avatar"><img
                                    :src="getAuthInfo.avatar ? getAuthInfo.avatar : '../../../static/img/home/avatar.png'"
                                    class="img-circle" alt="User Image"></div>

                                <p>
                                    {{getAuthInfo.nickname || getAuthInfo.username}}
                                    <small class="m-t-sm">电话: {{getAuthInfo.mobile}}</small>
                                </p>
                            </li>
                            <li class="user-footer">
                                <!--<div class="pull-left">-->
                                    <!--<router-link :to="{name: 'account_personal'}" class="btn btn-default btn-flat">个人配置</router-link>-->
                                <!--</div>-->
                                <div class="pull-right">
                                    <a href="#" class="btn bg-red1 text-white" style="color: #fff;" @click="signOut"><i class="fa fa-sign-out"></i>退出</a>
                                </div>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </nav>
    </header>
</template>

<script type="text/ecmascript-6">
    import { mapGetters, mapActions } from 'vuex'
    import api from '@/api'
    export default {
        name: 'va-navibar',
        data: () => ({
            newsNum: 0
        }),
        computed: {
            ...mapGetters([
                'getAuthInfo',
                'getNewsNum'
            ])
        },
        methods: {
            signOut () {
                this.$http.get(api.common.logout).then(res => {
                })
                this.$router.replace({name: 'login'})
            },
            getNewsData () {
//                this.$http.get(api.common.news, {
//                    params: {
//                    }
//                }).then(res => {
//                    if (res.data.code === 1) {
//                        this.saveNewsNum(res.data.data.message_num + res.data.data.notice_num)
//                    } else {
//                        this.saveNewsNum(0)
//                    }
//                })
            },
            ...mapActions([
                'saveNewsNum'
            ])
        },
        created () {
            this.getNewsData()
        }
    }

</script>
<style>
    .link-home-icon {
        color: #fff;
        padding: 15px;
        float: left;
    }

    .link-home-icom:hover {
        background-color: #357ca5;
    }

    .skin-blue .main-header {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
    }

    .skin-blue .main-header .navbar .link-home-icom {
        color: #fff;
    }

    .slide-avatar {
        width: 90px;
        height: 90px;
        border: 0.5px solid #f5f5f5;
        border-radius: 50%;
        overflow: hidden;
        margin: 0 auto;
    }

    .slide-avatar img {
        width: 100%;
        height: 100%;
    }

    .navbar-drop-menu {
        position: relative;
        z-index: 9999;
    }

    .nav-avatar-container {
        /*border: 0.5px solid #f5f5f5;*/
    }

    @media (max-width: 768px) {
        .navbar-nav {
            padding-right: 0;
        }

        .navbar-nav .nav > li > a {
            padding: 10px 5px;
        }
    }

    @media (min-width: 768px) and (max-width: 1500px) {

    }

</style>
