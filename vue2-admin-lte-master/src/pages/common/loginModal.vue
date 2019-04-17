<template>
    <div
        class="login-modal-container"
        v-loading="loading"
        element-loading-text="登录中..."
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.5)">
        <div class="login-title">航天影舱运营管理平台</div>
        <div class="login-username relative">
            <input type="text" placeholder="请输入用户名" @keydown.13="submit" v-model="username">
            <i class="fa fa-user-o fa-2x skin-red login-fa-user"></i>
            <div class="line-v-sm"></div>
        </div>
        <div class="login-username relative">
            <input type="password" placeholder="请输入密码" @keydown.13="submit" v-model="password">
            <div class="line-v-sm"></div>
            <i class="fa fa-lock fa-2x skin-red login-fa-psd"></i>
        </div>
        <div class="login-security-code clear">
            <input type="text" maxlength="4" class="pull-left" @keydown.13="submit"
                   style="color: #807A93;background: #fff;opacity: 1;" placeholder="请输入验证码" v-model="validateCode">
            <div class="login-code-img pull-right cursor-p" @click="updateId"><img :src="codeApi" alt="" width="100%" height="100%"></div>
        </div>
        <div>
            <button class="login-btn" @click="submit">登录</button>
        </div>
        <div class="login-other text-lg clear m-t-md">
            <label class="pull-left">
                <input type="checkbox" v-model="keepLogin">
                <span>保持登录</span>
            </label>
            <router-link :to="{name: 'login', query: {action: 'password'}}" class="pull-right" style="color: #18bc9c;">
                忘记密码
            </router-link>
            <!--&lt;!&ndash;<router-link :to="{name: 'login', query: {action: 'register'}}" class="pull-right m-r-sm btn-link">注册</router-link>&ndash;&gt;-->
        </div>
    </div>
</template>
<script>
    import api from '@/api'
    import { mapGetters, mapActions } from 'vuex'
    export default {
        data: () => ({
            id: '',
            clickSubmit: true,
            username: '',
            password: '',
            validateCode: '',
            keepLogin: false,
            loading: false,
            rightList: {}
        }),
        computed: {
            codeApi () {
                return api.common.codeGet + '?id=' + this.id
            },
            ...mapGetters([
                'getAuthInfo'
            ])
        },
        methods: {
            updateId () {
                this.id = Math.floor(Math.random() * 1000000)
            },
            getNav (data) {
                this.rightList = data
                this.saveNavList(this.rightList)
                window.localStorage.setItem('navList', JSON.stringify(this.rightList))
            },
            submit () {
                if (!this.username) {
                    this.$message({
                        type: 'warning',
                        message: '请输入用户名'
                    })
                }
                if (!this.password) {
                    this.$message({
                        type: 'warning',
                        message: '请输入密码'
                    })
                }
                if (!this.validateCode) {
                    this.$message({
                        type: 'warning',
                        message: '请输入验证码'
                    })
                }
                if (this.username && this.password && this.validateCode && this.clickSubmit) {
                    this.clickSubmit = false
                    let that = this
                    setTimeout(function () {
                        that.clickSubmit = true
                    }, 1500)
                    this.loading = true
                    this.$http.get(api.common.codeCheck, {
                        params: {
                            id: this.id,
                            code: this.validateCode
                        }
                    }).then(res => {
                        if (res.data.code === 1) {
                            this.$http.post(api.common.login, {
                                username: this.username,
                                password: this.password,
                                identity: 'admin',
                                scene: 4,
                                keeplogin: this.keepLogin ? 1 : 2
                            }).then(res => {
                                let that = this
                                setTimeout(function () {
                                    that.loading = false
                                    if (res.data.code === 1) {
                                        window.localStorage.setItem('authInfo', JSON.stringify(res.data.data))
                                        that.setAuthInfo(res.data.data)
                                        that.getNav(res.data.data.menu_list)
                                        that.updateId()
                                        that.validateCode = ''
                                        $('.sidebar-menu .treeview').removeClass('menu-open')
                                        $('.sidebar-menu .treeview .treeview-menu').css('display', 'none')
                                        that.$router.push({name: 'home'})
                                        // 登录成功后路由跳转
                                        let rightList = res.data.data.menu_list
                                        let pageVal = ''
                                        let newList = {}
                                        for (let key in rightList) {
                                            if (String(key).length === 3) {
                                                newList[(key + '99') * Math.pow(10, 7 - String(key).length)] = rightList[key]
                                            } else {
                                                newList[key * Math.pow(10, 9 - String(key).length)] = rightList[key]
                                            }
                                            
                                        }
                                        for (let key in newList) {
                                            if (newList[key]) {
                                                pageVal = key
                                                break;
                                            }
                                        }
                                        console.log(pageVal)
                                        switch (pageVal)
                                        {
                                            case '401990000':
                                               that.$router.push({name: 'home'})
                                               break

                                            case '402990000':
                                                that.$router.push({name: 'map_list'})
                                                break

                                            case '403990000':
                                               that.$router.push({name: 'agent_list'})
                                               break
                                            case '403010000':
                                               that.$router.push({name: 'agent_list'})
                                               break
                                            case '403020000':
                                               that.$router.push({name: 'agent_mine'})
                                               break
                                            case '403030000':
                                               that.$router.push({name: 'agent_check'})
                                               break

                                            case '404990000':
                                                that.$router.push({name: 'cinema_list'})
                                                break
                                            case '404010000':
                                                that.$router.push({name: 'cinema_list'})
                                                break
                                            case '404020000':
                                                that.$router.push({name: 'cinema_check'})
                                                break

                                            case '405990000':
                                               that.$router.push({name: 'financial_statistics'})
                                               break
                                            case '405010000':
                                               that.$router.push({name: 'financial_statistics'})
                                               break
                                            case '405020000':
                                               that.$router.push({name: 'financial_income'})
                                               break
                                            case '405030000':
                                               that.$router.push({name: 'financial_expend'})
                                               break
                                            case '405040000':
                                               that.$router.push({name: 'financial_order'})
                                               break
                                            case '405050000':
                                               that.$router.push({name: 'financial_clearing'})
                                               break
                                            case '405060000':
                                               that.$router.push({name: 'financial_report'})
                                               break
                                            case '405070000':
                                               that.$router.push({name: 'financial_routing'})
                                               break
                                            case '405080000':
                                               that.$router.push({name: 'financial_agentRouting'})
                                               break
                                            case '405090000':
                                               that.$router.push({name: 'financial_incomes'})
                                               break

                                            case '406990000':
                                                that.$router.push({name: 'statistics_agent'})
                                                break
                                            case '406010000':
                                                that.$router.push({name: 'statistics_agent'})
                                                break
                                            case '406020000':
                                                that.$router.push({name: 'statistics_cinema'})
                                                break
                                            case '406030000':
                                                that.$router.push({name: 'statistics_play'})
                                                break

                                            case '407990000':
                                               that.$router.push({name: 'log_list'})
                                               break

                                            case '408990000':
                                                that.$router.push({name: 'account_list'})
                                                break
                                            case '408010000':
                                                that.$router.push({name: 'account_list'})
                                                break
                                            case '408020000':
                                                that.$router.push({name: 'account_right'})
                                                break

                                            case '409990000':
                                                that.$router.push({name: 'contract_list'})
                                               break
                                            case '409010000':
                                                that.$router.push({name: 'contract_list'})
                                               break
                                            case '409020000':
                                                that.$router.push({name: 'contract_type'})
                                               break
                                            default:
                                                that.$router.push({name: 'home'})
                                        }
                                    } else {
                                        that.updateId()
                                        that.validateCode = ''
                                        that.$message({
                                            type: 'warning',
                                            message: res.data.msg
                                        })
                                    }
                                }, 500)
                            }).catch(() => {
                                this.loading = false
                            })
                        } else {
                            this.loading = false
                            this.updateId()
                            this.validateCode = ''
                            this.$message({
                                type: 'error',
                                message: '验证码错误!'
                            })
                        }
                    }).catch(() => {
                        this.loading = false
                    })

                } else if (!this.username || !this.password) {
                    this.$message({
                        type: 'error',
                        message: '请输入用户名或密码!'
                    })
                }
            },
            ...mapActions([
                'setAuthInfo',
                'saveNavList'
            ])
        },
        created () {
            this.updateId()
            console.log('3.29')
        },
        watch: {
            '$route' (val) {
                this.updateId()
            }
        }
    }
</script>
<style scoped>
    .btn-link:hover, .btn-link:active, .btn-link:focus {
        color: #333;
    }

    .login-modal-container {
        width: 430px;
        background: rgba(0, 0, 0, .6);
        border-radius: 11px;
        box-shadow: 0px 0px 9px rgba(255, 255, 255, .7);
        border-radius: 8px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        padding: 40px 47px 37px;
    }

    .logo-img {
        width: 285px;
        height: 90px;
        position: absolute;
        top: -120px;
        left: 50%;
        transform: translateX(-50%);
    }

    .logo-img img {
        width: 100%;
    }

    .login-title {
        font-size: 30px;
        height: 30px;
        line-height: 30px;
        font-family: MicrosoftYaHeiUI;
        color: #18bc9c;
        font-weight: 700;
        text-align: center;
        margin-bottom: 30px;
    }

    .login-username {
        height: 66px;
        margin-bottom: 18px;
    }

    .login-username input {
        font-size: 18px;
        width: 100%;
        height: 100%;
        color: #807A93;
        background: #fff;
        border-radius: 5px;
        box-shadow: 1px 0px 0px rgba(234, 230, 238, 1);
        padding-left: 110px;
        padding-right: 30px;
    }

    .login-fa-psd {
        position: absolute;
        top: 21px;
        left: 30px;
    }

    .login-fa-user {
        position: absolute;
        top: 21px;
        left: 30px;
    }

    .line-v-sm {
        width: 1px;
        height: 32px;
        background-color: #F1ECF5;
        position: absolute;
        top: 19px;
        left: 84px;
    }

    .login-security-code {
        height: 66px;
    }

    .login-security-code input {
        width: 212px;
        height: 66px;
        background: rgba(0, 0, 0, 1);
        border-radius: 5px;
        box-shadow: 2px 0px 0px rgba(234, 230, 238, 1);
        line-height: 66px;
        padding: 0 30px;
        font-size: 18px;
    }

    .login-code-img {
        width: 112px;
        height: 66px;
        /*border: 1px solid #EAE6EE;*/
        border-radius: 5px;
        box-shadow: 2px 0px 0px rgba(234, 230, 238, 1);
    }

    .login-btn {
        width: 337px;
        height: 65px;
        /*background: #e74c3c;*/
        border-radius: 5px;
        margin-top: 16px;
        font-size: 24px;
        color: #fff;
    }

    .login-other {
        height: 18px;
        color: #fff;
    }

    .login-other label input {
        width: 18px;
        height: 18px;
        vertical-align: -4px;
    }

    @media (max-width: 2000px) {
        .login-modal-container {
            width: 308px;
            border-radius: 8px;
            box-shadow: 0px 0px 9px rgba(255, 255, 255, .7);
            padding: 37px 34px 26px;
        }

        .logo-img {
            width: 195px;
            height: 60px;
            position: absolute;
            top: -80px;
            left: 50%;
            transform: translateX(-50%);
        }

        .login-title {
            font-size: 22px;
            margin-bottom: 22px;
            height: 22px;
            line-height: 22px;
        }

        .login-username {
            height: 48px;
            margin-bottom: 13px;
        }

        .login-username input {
            font-size: 14px;
            border-radius: 4px;
            box-shadow: 1px 0px 0px rgba(234, 230, 238, 1);
            padding-left: 78px;
            padding-right: 20px;
        }

        .login-fa-psd {
            font-size: 24px;
            position: absolute;
            top: 15px;
            left: 22px;
        }

        .login-fa-user {
            font-size: 20px;
            position: absolute;
            top: 15px;
            left: 22px;
        }

        .line-v-sm {
            width: 1px;
            height: 24px;
            background-color: #F1ECF5;
            position: absolute;
            top: 13px;
            left: 59px;
        }

        .login-security-code {
            height: 48px;
        }

        .login-security-code input {
            width: 151px;
            height: 48px;
            border-radius: 4px;
            box-shadow: 1px 0px 0px rgba(234, 230, 238, 1);
            line-height: 48px;
            padding: 0 20px;
            font-size: 14px;
        }

        .login-code-img {
            width: 80px;
            height: 48px;
            /*border: 1px solid #EAE6EE;*/
            border-radius: 4px;
            box-shadow: 1px 0px 0px rgba(234, 230, 238, 1);
        }

        .login-btn {
            width: 240px;
            height: 48px;
            border-radius: 4px;
            margin-top: 18px;
            font-size: 18px;
        }

        .login-other {
            height: 12px;
            margin-top: 20px;
        }

        .login-other label input {
            width: 13px;
            height: 13px;
            vertical-align: -2px;
        }
    }
</style>
