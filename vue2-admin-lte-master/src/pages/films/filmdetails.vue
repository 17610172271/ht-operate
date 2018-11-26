<template>
    <div class="">
        <div class="p-lg appli-container">
            <sub-header :list="subNavList"></sub-header>
            <div class="page-container">
                <div class="m-t-sm ">
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                        <el-form-item label="ID" prop="name" class="search-item col-xs-4 col-sm-4 col-md-2 col-lg-4 p-l-n">
                            <el-input v-model="ruleForm.name" style="max-width: 202px;"></el-input>
                        </el-form-item>
                        <el-form-item label="影厅名称" prop="name" class="search-item col-xs-4 col-sm-4 col-md-4 col-lg-4  p-l-n">
                            <el-input v-model="ruleForm.name"  style="max-width: 202px;"></el-input>
                        </el-form-item>
                        <el-form-item label="影厅名称" prop="name" class="search-item col-xs-4 col-sm-4 col-md-4 col-lg-4  p-l-n">
                            <el-input v-model="ruleForm.name"  style="max-width: 202px;"></el-input>
                        </el-form-item>


                            <el-form-item label="代理商" prop="region"
                                          class="search-item col-xs-4 col-sm-4 col-md-2 col-lg-4 p-l-n">
                                <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
                                    <el-option label="区域一" value="shanghai"></el-option>
                                    <el-option label="区域二" value="beijing"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="院线" prop="region"
                                          class="search-item col-xs-4 col-sm-4 col-md-2 col-lg-4 p-l-n">
                                <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
                                    <el-option label="区域一" value="shanghai"></el-option>
                                    <el-option label="区域二" value="beijing"></el-option>
                                </el-select>
                            </el-form-item>
                        <el-form-item label="活动时间" class="search-item col-xs-4 col-sm-4 col-md-2 col-lg-4 p-l-n">
                                <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;max-width: 202px;"></el-date-picker>
                        </el-form-item>

                        <el-form-item label="影厅介绍" prop="desc">
                            <el-input type="textarea" v-model="ruleForm.desc"></el-input>
                        </el-form-item>

                        <el-form-item label="房间设施" prop="type">
                            <el-checkbox-group v-model="ruleForm.type">
                                <el-checkbox label="零食" name="type"></el-checkbox>
                                <el-checkbox label="空调" name="type"></el-checkbox>
                                <el-checkbox label="音响" name="type"></el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>


                        <el-form-item>
                            <el-button type="primary" @click="submitForm('ruleForm')">完成</el-button>
                            <el-button @click="resetForm('ruleForm')">取消</el-button>
                        </el-form-item>
                    </el-form>
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
            ruleForm: {
                name: '',
                region: '',
                type: [],
                desc: '',
                value1:''
            },
            rules: {
                name: [
                    { required: true, message: '请输入活动名称', trigger: 'blur' },
                    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                region: [
                    { required: true, message: '请选择活动区域', trigger: 'change' }
                ],
                type: [
                    { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
                ],
                desc: [
                    { required: true, message: '请填写活动形式', trigger: 'blur' }
                ]
            },
            subNavList: {
                parentNode: {
                    name: '影片列表',
                    router: {
                        name: 'films_list'
                    }
                },
                childNode: {
                    name: '影片详情',
                    desc: '主要用展示影片的详情',
                    router: {
                        name: 'films_filmdetails'
                    }
                }
            }
        }),
        components: {
            SubHeader
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        },
        created () {
            this.page = this.$route.query.page ? parseInt(this.$route.query.page) : 1
        }
    }
</script>
<style scoped>
</style>
