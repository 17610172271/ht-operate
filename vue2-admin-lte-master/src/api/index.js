// all api
export const BASE_URL = '/v1'

// 通用api
export const common = {
    upload: '/api/v1/upload/uploadImage', // 上传文件
    codeGet: '/api/v1/user/getCode', // 图片验证码获取
    codeCheck: '/api/v1/user/checkCode', // 图片验证
    news: 'v1/Setting/get_num', // 消息数量
    telCodeSend: '/api/v1/sms/sendCode', // 发送短信验证码
    setPassword: '/api/v1/common/lostPassword', // 找回密码
    getCity: '/api/v1/support/getCity', // 获取区域及省市区
    getRight: '/api/v1/admin/getMenu', // 获取菜单权限
    login: '/api/v1/user/login', // 用户登录
    logout: '/api/v1/user/loginout', // 退出登录
}

// 代理商管理
export  const agent = {
    list:'/api/v1/agent/list',//代理商列表
    detail:'/api/v1/agent/detail'  ,//代理商详情
    edit:'/api/v1/agent/edit',// 代理商编辑
    add:'/api/v1/agent/add',   //添加代理商
    del:'/api/v1/agent/del',   //删除代理商
    disable: '/api/v1/agent/stop', // 代理商启用禁用
    getAllList: '/api/v1/agent/get_agent', // 获取全部代理商列表
    check: '/api/v1/agent/audit', // 代理商审核
}

// 影院
export  const cinema = {
    list:'/api/v1/cinema/list',   //影院列表
    add:'/api/v1/cinema/add',   //添加影院
    edit:'/api/v1/cinema/edit',   //编辑影院
    del:'/api/v1/cinema/del',     //删除影院
    detail:'/api/v1/cinema/detail',   //影院详情
    editDetail: '/api/v1/cinema/cinemaDetail', // 编辑影院-详情
    disable: '/api/v1/cinema/stop', //启用禁用
    check: '/api/v1/cinema/audit', // 影院审核
    agent:'/api/v1/cinema/get_region_agent',   //获取院线列表
    getAllList: '/api/v1/cinema/get_cinema', // 获取全部影院列表
    status: '/api/v1/cinema/device', // 影院设备状态
}

// 首页
export const home = {
    home: '/api/v1/statistics/index' ,
}

export default {
    BASE_URL,
    common,
    home,
    cinema,
    agent
    }
