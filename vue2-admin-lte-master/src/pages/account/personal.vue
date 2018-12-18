<template>
    <div class="" v-loading="loading">
        <div class="p-md">
            <sub-header :list="subNavList"></sub-header>
            <div class="m-t-md clear">
                <div class="p-n" v-loading="settingLoading" style="position: relative;">
                    <div class="border-top-blue bg-white">
                        <h3 class="text-md p-l-sm">个人配置</h3>
                        <div class="avatar-other-container">
                            <label class="setting-avatar-container bg-f5 block cursor-p relative">
                                <div class="avatar-modal">点击编辑</div>
                                <img :src="userData.avatar || '../../../static/img/home/avatar.png'" width="100%" height="100%" alt="avatar">
                                <el-upload
                                    :action="uploadUrl"
                                    class="pos-upload1"
                                    :on-success="avatarUpload"
                                    :before-upload="uploadBefore"
                                    accept="image/*"
                                    :headers="header"
                                    :show-file-list="false"
                                    list-type="text">
                                    <!--<a href="javascript:;" class="btn bg-blue1 text-white add-upload-btn">上传</a>-->
                                </el-upload>
                            </label>
                            <div class="text-xxlg text-center m-t-sm">{{getAuthInfo.nickname}}</div>
                            <div class="text-sm text-muted text-center">{{getAuthInfo.email}}</div>
                        </div>
                        <div class="form-container p-md setting-avatar  ">
                            <div class="form-item-container">
                                <div class="m-b-xs">用户名:</div>
                                <div>
                                    <el-input disabled v-model="userData.username"></el-input>
                                </div>
                            </div>
                            <div class="form-item-container m-t-sm ">
                                <div class="m-b-xs p-n">昵称:</div>
                                <div>
                                    <el-input placeholder="请输入昵称" :class="{'border-red': nicknameError}" v-model="userData.nickname" @blur="validateNickname(userData.nickname)"></el-input>
                                    <p v-if="nicknameError" class="text-red"><span class="fa fa-close m-r-xs"></span>昵称不能为空</p>
                                </div>
                            </div>
                            <div class="form-item-container m-t-sm">
                                <div class="m-b-xs">Email:</div>
                                <div>
                                    <el-input placeholder="请输入Email" :class="{'border-red': emailError}" v-model="userData.email" @blur="validateEmail(userData.email)"></el-input>
                                    <p v-if="emailError" class="text-red"><span class="fa fa-close m-r-xs"></span>email格式不正确</p>
                                </div>
                            </div>

                            <div class="form-item-container m-t-sm">
                                <div class="m-b-xs">手机号:</div>
                                <div>
                                    <el-input placeholder="请输入手机号" :class="{'border-red': mobileError}" v-model="userData.mobile" @blur="validateMobile(userData.mobile)"></el-input>
                                    <p v-if="mobileError" class="text-red"><span class="fa fa-close m-r-xs"></span>手机号格式不正确</p>
                                </div>
                            </div>
                            <div class="form-item-container m-t-md text-center" >
                                    <button class="btn bg-blue1 text-white" @click="updateInfo">提交</button>
                                    <button class="btn btn-default" @click="goEditPass">修改密码</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <el-dialog
            title="修改密码"
            :visible.sync="centerDialogVisible"
            custom-class="dialog-modal3 dailog-p-t-n maxwidth"
            :modal-append-to-body="false"
            :close-on-click-modal="false">
            <div class="p-md setting-psd" v-loading="dailogLoading">
                <div class="form-item-container m-t-sm clear">
                    <div class="m-b-xs p-n text-right line-height-40 col-xs-12 col-sm-2">旧密码:</div>
                    <div class="col-xs-12 col-sm-9">
                        <el-input type="password" style="max-width: 300px;" maxlength="20" placeholder="请输入原密码" v-model="dailogVal.oldpassword"></el-input>
                    </div>
                </div>
                <div class="form-item-container m-t-sm clear">
                    <div class="m-b-xs p-n text-right line-height-40 col-xs-12 col-sm-2">新密码:</div>
                    <div class="col-xs-12 col-sm-9">
                        <el-input type="password" style="max-width: 300px;" maxlength="20" placeholder="请输入新密码" @blur="validatePass" v-model="dailogVal.newpassword"></el-input>
                        <p class="text-red" v-show="validatePsd"><span class="fa fa-close m-r-sm"></span>密码为6-20位字母、数字及特殊字符组合</p>
                    </div>
                </div>
                <div class="form-item-container m-t-sm clear">
                    <div class="m-b-xs p-n text-right line-height-40 col-xs-12 col-sm-2">确认密码:</div>
                    <div class="col-xs-12 col-sm-9">
                        <el-input type="password" style="max-width: 300px;" maxlength="20" placeholder="请再次输入密码" @blur="confirmPsd" v-model="dailogVal.againpassword"></el-input>
                        <p class="text-red" v-show="confirm"><span class="fa fa-close m-r-sm"></span>两次输入密码不一致</p>
                    </div>
                </div>
                <div class="form-item-container m-t-sm">
                    <div class="col-xs-offset-2 p-l-sm">
                        <a href="javascript:;" class="btn bg-blue1 text-white m-r-sm" @click="editPsd">修改</a>
                        <a href="javascript:;" class="btn btn-default" @click="centerDialogVisible=false">取消</a>
                    </div>
                </div>
            </div>
        </el-dialog>
    </div>
</template>
<script type="text/ecmascript-6">
    import { mapGetters, mapActions } from 'vuex'
    import SubHeader from '../common/subheader'
    import api from '@/api'
    import format from '@/tools/format'
    import validate from '@/tools/validate'
    import SelectCheckbox from '@/components/SelectCheckbox'
    import SearchIpts from '../common/searchIpts'
    export default {
        data: () => ({
            userData: {},
            centerDialogVisible: false,
            dailogVal: {
                oldpassword: null,
                newpassword: null,
                againpassword: null
            },
            confirm: false,
            validatePsd: false,
            searchShow: false,
            loading: false,
            settingLoading: false,
            dailogLoading: false,
            nicknameError: false,
            emailError: false,
            mobileError: false,
            subNavList: {
                parentNode: {
                    name: '账号管理',
                    router: {
                        name: 'account_list'
                    }
                },
                childNode: {
                    name: '个人配置',
                    router: {
                        name: 'account_personal'
                    }
                }
            }
        }),
        components: {
            SubHeader,
            SelectCheckbox,
            SearchIpts
        },
        computed: {
            pages () {
                return this.data ? Math.ceil(this.data.total / this.limit) : 1
            },
            offset () {
                return (this.page - 1) * this.limit
            },
            ...mapGetters([
                'getAuthInfo'
            ]),
            uploadUrl () {
                return api.common.upload
            },
            header () {
                return {
                    ContentType: 'application/x-www-form-urlencoded'
                }
            }
        },
        methods: {
            //修改个人资料
            updateInfo () {
                this.validateNickname(this.userData.nickname)
                this.validateEmail(this.userData.email)
                this.validateMobile(this.userData.mobile)
                if (this.nicknameError || this.emailError || this.mobileError) return
                this.settingLoading = true
                this.$http.post(api.admin.editPerson, {
                    email: this.userData.email,
                    nickname: this.userData.nickname,
                    mobile: this.userData.mobile,
                    avatar: this.userData.avatar
                }).then(res => {
                    let that = this
                    setTimeout(function () {
                        that.settingLoading = false
                    }, 500)
                    if (res.data.code === 1) {
                        window.localStorage.setItem('authInfo', JSON.stringify({
                            ...res.data.data,
                            group_id: this.getAuthInfo.group_id
                        }))
                        this.setAuthInfo({
                            ...res.data.data,
                            group_id: this.getAuthInfo.group_id
                        })
                        this.$message({
                            type: 'success',
                            message: '个人信息修改成功'
                        })
                    } else {
                        this.$message({
                            type: 'warning',
                            message: res.data.msg
                        })
                    }
                })
            },
            uploadBefore () {
                this.settingLoading = true
            },
            avatarUpload (res) {
                let that = this
                setTimeout(function () {
                    that.settingLoading = false
                }, 500)
                if (res.code === 1) {
                    this.userData.avatar = res.data.image
                } else if (res.code === -14) {
                    window.localStorage.removeItem('authInfo')
                    this.$router.replace({name: 'login'})
                    this.$message({
                        type: 'error',
                        message: '登录信息已失效,请重新登录'
                    })
                } else {
                    this.$message({
                        type: 'error',
                        message: '图片上传失败'
                    })
                }
            },
            ...mapActions([
                'setAuthInfo'
            ]),
            validatePass () {
                if (!/^[a-zA-Z0-9_]{6,20}$/.test(this.dailogVal.newpassword)) {
                    this.validatePsd = true
                } else {
                    this.validatePsd = false
                }
            },
            validateNickname (val) {
                this.nicknameError = val ? false : true
            },
            validateEmail (val) {
                this.emailError = this.vEmail(val)
            },
            validateMobile (val) {
                this.mobileError = this.vMobile(val)
            },
            vUsername: validate.username,
            vEmail: validate.email,
            vMobile: validate.mobile,
            confirmPsd () {
                if (this.dailogVal.newpassword !== this.dailogVal.againpassword) {
                    this.confirm = true
                } else {
                    this.confirm = false
                }
            },
            goEditPass () {
                this.validatePsd = false
                this.confirm = false
                this.dailogVal = {
                    oldpassword: null,
                    newpassword: null,
                    againpassword: null
                }
                this.centerDialogVisible = true
            },
            //密码修改
            editPsd () {
                if (!this.validatePsd && !this.confirm) {
                    if (this.dailogVal.oldpassword && this.dailogVal.newpassword && this.dailogVal.againpassword) {
                        this.dailogLoading = true
                        this.$http.post(api.admin.editPwd, {      //修改密码
                            oldpassword: this.dailogVal.oldpassword,
                            newpassword: this.dailogVal.newpassword,
                            againpassword: this.dailogVal.againpassword
                        }).then(res => {
                            this.dailogLoading = false
                            if (res.data.code === 1) {
                                this.$message({
                                    type: 'success',
                                    message: '密码修改成功,请重新登录'
                                })
                                this.dailogVal = {
                                    oldpassword: null,
                                    newpassword: null,
                                    againpassword: null
                                }
                                this.centerDialogVisible = false
                                this.$http.get(api.user.logout).then(res => {   //退出登陆
                                    if (res.data.code === 1) {
                                        window.localStorage.removeItem('Auth')
                                        this.$router.push({name: 'login'})
                                    } else {
                                        this.$message({
                                            type: 'error',
                                            message: res.data.msg
                                        })
                                    }
                                })

                            } else {
                                this.$message({
                                    type: 'error',
                                    message: res.data.msg
                                })
                            }
                        })
                    } else if(!this.dailogVal.againpassword && this.dailogVal.oldpassword && this.dailogVal.newpassword) {
                        this.$message({
                            type: 'warning',
                            message: '请输入确认密码'
                        })
                    } else {
                        this.$message({
                            type: 'warning',
                            message: '请输入旧密码和新密码'
                        })
                    }
                }
            },
        },
        created () {
            this.page = this.$route.query.page ? parseInt(this.$route.query.page) : 1
            this.userData = JSON.parse(JSON.stringify(this.getAuthInfo))
        },
        watch: {
        }
    }
</script>
<style>
    .setting-avatar-container {
        width: 100px;
        height: 100px;
        margin: 0 auto;
    }

    .setting-avatar{
        margin: 0 auto;
        max-width: 500px
    }

    .setting-tab #tab-0 {
        border-bottom: 1px solid #fff;
    }
    .setting-avatar-container:hover .avatar-modal {
        display: inline-block;
    }
    .avatar-modal {
        width: 100%;
        height: 100%;
        line-height: 100px;
        background-color: rgba(0,0,0,0.5);
        color: #fff;
        text-align: center;
        display: none;
        position: absolute;
        top: 0;
        left: 0;
    }
    @media (max-width: 768px) {
        .setting-psd .text-right {
            text-align: left;
        }
        .setting-psd.p-md {
            padding: 0;
        }
        .dialog-modal3 {
            min-width: 300px;
            z-index: 9999;
        }
    }
    @media (max-width: 1200px) {
        .usersetting-list {
            padding: 0;
            margin-top: 10px;
        }
    }
    .maxwidth{
        max-width: 600px;
    }
</style>
