<template>
    <div class="register-container relative">
        <!--<i class="fa fa-window-close register-close" @click="goBack"></i>-->
        <!--<div class="logo-img"><img src="../../../static/img/login/logo_03.png" alt=""></div>-->
        <div class="login-title relative">找回密码</div>
        <div class="register-line"></div>

        <div class="login-username relative" :class="{'m-b-lg': telError}">
            <input type="text" maxlength="11" placeholder="请输入您的手机号" v-model="tel" @blur="validateTel">
            <p class="text-red" v-if="telError">{{telErrorMsg}}</p>
            <i class="fa fa-mobile fa-2x register-tel" style="color: #1edeb8;"></i>
            <div class="line-v-sm"></div>
        </div>
        <div class="login-security-code clear" :class="{'m-b-lg': codeError}">
            <input type="text" maxlength="6" class="pull-left" placeholder="请输入验证码" v-model="validateCode" @blur="validateCodes">
            <div class="login-code-img pull-left cursor-p" @click="sendValidateCode">{{sendBtn}} <span
                v-show="sendBtn != '获取验证码'">秒</span></div>
            <p class="text-red" v-if="codeError">请输入验证码</p>
        </div>
        <div class="login-username relative login-username-db" :class="{'m-b-lg': psdError}">
            <input type="password" maxlength="20" placeholder="请输入密码" v-model="password" @blur="validatePs">
            <p class="text-red" v-if="psdError">请输入正确的6-20位英文、数字或特殊字符组合！</p>
            <div class="line-v-sm"></div>
            <i class="fa fa-lock fa-2x login-fa-psd" style="color: #1edeb8;"></i>
        </div>
        <div class="login-username relative" :class="{'m-b-lg': psdError}">
            <input type="password" maxlength="20" placeholder="请再次输入密码" v-model="confirmPassword" @blur="validatePsd">
            <p class="text-red" v-if="psd2Error">两次密码输入不一致，请重新输入！</p>
            <div class="line-v-sm"></div>
            <i class="fa fa-lock fa-2x login-fa-psd" style="color: #1edeb8;"></i>
        </div>
        <div class="m-t-lg psd-submit">
            <button class="login-btn" @click="submit">确定</button>
        </div>
        <div class="m-t-md"><a href="javascript:;" class="text-green1" @click="goBack"><i
            class="fa fa-arrow-circle-left text-lg"></i> 登录</a></div>
    </div>
</template>
<script type="text/ecmascript-6">
    import api from '@/api'
    export default {
        data: () => ({
            password: '',
            confirmPassword: '',
            tel: '',
            validateCode: '',
            psdError: false,
            psd2Error: false,
            codeError: false,
            telError: false,
            telErrorMsg: '请输入正确的手机格式！',
            sendBtn: '获取验证码',
            validateError: false,
            validateErrorMsg: ''
        }),
        computed: {},
        methods: {
            goBack () {
                this.$router.go(-1)
            },
            // 效验密码
            validatePs () {
                if (!/^[a-zA-Z0-9_]{6,20}$/.test(this.password)) {
                    this.psdError = true
                } else {
                    this.psdError = false
                }
            },
            // 确认密码效验
            validatePsd () {
                if (this.password !== this.confirmPassword) {
                    this.psd2Error = true
                } else {
                    this.psd2Error = false
                }
            },
            validateCodes () {
                if (!this.validateCode) {
                    this.codeError = true
                }else {
                    this.codeError = false
                }
            },
            validateTel () {
                if (!/^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|(147))\d{8}$/.test(this.tel)) {
                    this.telErrorMsg = '请输入正确的手机格式!'
                    this.telError = true
                } else {
                    this.telError = false
                }
            },
            sendValidateCode () {
                if (!this.telError && this.sendBtn === '获取验证码') {
                    this.$http.post(api.common.telCodeSend, {
                        mobile: this.tel,
                        identity: 'admin',
                        scene: 4
                    }).then(res => {
                        if (res.data.code === 1) {
                            this.$message({
                                type: 'success',
                                message: '验证码发送成功!'
                            })
                            this.telError = false
                            this.sendBtn = 60
                            let self = this
                            let time = setInterval(function () {
                                if (self.sendBtn > 1) {
                                    self.sendBtn -= 1
                                } else if (self.sendBtn === 1) {
                                    self.sendBtn = '获取验证码'
                                    clearInterval(time)
                                }
                            }, 1000)
                        } else {
                            // this.$message({
                            //   type: 'error',
                            //   message: res.data.msg
                            // })
                            this.telErrorMsg = res.data.msg
                            this.telError = true
                        }
                    }).catch(res => {
                        this.$message({
                            type: 'warning',
                            message: '服务器异常!'
                        })
                    })
                }
            },
            submit () {
                this.validatePs()
                this.validatePsd()
                this.validateCodes()
                this.validateTel()
                if (!this.psdError && !this.psd2Error && !this.telError && this.tel && this.password && this.confirmPassword && this.validateCode) {
                    this.$http.post(api.common.setPassword, {
                        captcha: this.validateCode,
                        mobile: this.tel,
                        password: this.password,
                        identity: 'admin',
                        scene: 4
                    }).then(res => {
                        if (res.data.code === 1) {
                            this.$router.push({name: 'login'})
                            this.$message({
                                type: 'success',
                                message: '密码找回成功!'
                            })
                        } else {
                            this.$message({
                                type: 'warning',
                                message: res.data.msg
                            })
                        }
                    })
                } else {
                    this.$message({
                        type: 'warning',
                        message: '请填写正确的信息!'
                    })
                }
            }
        },
        created () {
        }
    }
</script>
<style scoped>
    .register-container {
        width: 478px;
        background: rgba(255, 255, 255, 1);
        border-radius: 22px;
        box-shadow: 0px 0px 9px rgba(14, 15, 18, 0.42);
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        padding: 30px 46px 46px;
    }

    .register-close {
        position: absolute;
        right: 18px;
        top: 18px;
        font-size: 30px;
        color: #FB2828;
        cursor: pointer;
    }

    .register-line {
        width: 100%;
        height: 4px;
        margin-bottom: 34px;
        background: -webkit-linear-gradient(left, rgba(0, 0, 0, .1), rgba(0, 0, 0, .4), rgba(0, 0, 0, .1)); /* Safari 5.1 - 6.0 */
        background: -o-linear-gradient(right, rgba(0, 0, 0, .1), rgba(0, 0, 0, .4), rgba(0, 0, 0, .1)); /* Opera 11.1 - 12.0 */
        background: -moz-linear-gradient(right, rgba(0, 0, 0, .1), rgba(0, 0, 0, .4), rgba(0, 0, 0, .1)); /* Firefox 3.6 - 15 */
        background: linear-gradient(to right, rgba(0, 0, 0, .1), rgba(0, 0, 0, .4), rgba(0, 0, 0, .1)); /* 标准的语法 */
        border-radius: 30%;
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
        color: #5F5E5E;
        text-align: center;
        margin-bottom: 13px;
    }

    .login-username {
        height: 58px;
        margin-bottom: 10px;
    }

    .login-username input {
        font-size: 18px;
        width: 100%;
        height: 100%;
        color: #ABABAB;
        background: rgba(0, 0, 0, 1);
        opacity: 0.7;
        border-radius: 5px;
        box-shadow: 2px 0px 0px rgba(234, 230, 238, 1);
        padding-left: 70px;
        padding-right: 20px;
        font-size: 16px;
    }

    .login-security-code input {
        color: #ababab;
    }

    .login-fa-psd {
        position: absolute;
        top: 18px;
        left: 16px;
    }

    .register-tel {
        font-size: 36px;
        position: absolute;
        top: 13px;
        left: 20px;
    }

    .line-v-sm {
        width: 1px;
        height: 32px;
        background-color: #F1ECF5;
        position: absolute;
        top: 14px;
        left: 53px;
    }

    .login-security-code {
        height: 58px;
        margin-bottom: 16px;
    }

    .login-security-code input {
        width: 220px;
        height: 58px;
        background: rgba(0, 0, 0, 1);
        opacity: 0.7;
        border-radius: 5px 0 0 5px;
        line-height: 58px;
        padding: 0 30px;
        font-size: 16px;
        box-shadow: none;
    }

    .login-code-img {
        width: 165px;
        height: 58px;
        background-color: #FFAE00;
        line-height: 58px;
        text-align: center;
        color: #fff;
        border-radius: 0 5px 5px 0;
    }

    .login-btn {
        width: 100%;
        height: 57px;
        background: #1edeb8;
        border-radius: 5px;
        margin-top: 0px;
        font-size: 24px;
        color: #fff;
    }

    .ipt-protocol {
        vertical-align: 1px;
    }

    .login-security-code.m-b-lg,
    .login-username.m-b-lg {
        margin-bottom: 30px;
    }

    @media (min-width: 2000px) {
        .login-username {
            margin-bottom: 20px;
        }

        .login-security-code {
            margin-bottom: 16px;
        }
    }

    @media (max-width: 2000px) {
        .logo-img {
            width: 195px;
            height: 60px;
            position: absolute;
            top: -80px;
            left: 50%;
            transform: translateX(-50%);
        }

        .m-t-lg.psd-submit {
            margin-top: 20px;
        }

        .register-container {
            width: 308px;
            padding: 37px 34px 26px;
            border-radius: 8px;
        }

        .login-username {
            height: 48px;
        }

        .line-v-sm {
            width: 1px;
            height: 22px;
            background-color: #F1ECF5;
            position: absolute;
            top: 15px;
            left: 45px;
        }

        .register-tel {
            font-size: 28px;
            position: absolute;
            top: 12px;
            left: 18px;
        }

        .login-username input {
            padding-left: 60px;
        }

        .login-security-code {
            height: 48px;
            margin-bottom: 10px;
        }

        .login-security-code input {
            width: 160px;
            height: 48px;
            background: rgba(0, 0, 0, 1);
            opacity: 0.7;
            border-radius: 5px 0 0 5px;
            line-height: 48px;
            padding: 0 20px;
            font-size: 16px;
            box-shadow: none;
        }

        .login-code-img {
            width: 80px;
            height: 48px;
            background-color: #FFAE00;
            line-height: 48px;
            text-align: center;
            color: #fff;
            border-radius: 0 5px 5px 0;
        }

        .login-username-db.m-b-lg {
            margin-bottom: 40px;
        }

        .login-title {
            font-size: 22px;
            margin-bottom: 6px;
        }

        .register-line {
            margin-bottom: 20px;
            height: 3px;
        }

        .login-fa-psd {
            top: 17px;
            font-size: 22px;
        }

        .login-btn {
            height: 47px;
            font-size: 18px;
        }

        .register-close {
            font-size: 22px;
        }
    }
</style>
