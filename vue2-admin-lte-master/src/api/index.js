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
    logout: '/api/v1/user/logout', // 退出登录
    editPassword: '/api/v1/admin/editPwd', // 修改密码
}

// 代理商管理
export  const agent = {
    list:'/api/v1/agent/list',//代理商列表
    detail:'/api/v1/agent/detail'  ,//代理商详情
    edit:'/api/v1/agent/edit',// 代理商编辑
    add:'/api/v1/agent/add',   //添加代理商
    del:'/api/v1/agent/del',   //删除代理商
    disable: '/api/v1/agent/stop', // 代理商启用禁用
    check: '/api/v1/agent/audit', // 代理商审核
    getAllAgent:'/api/v1/agent/getAllAgent',  //获取全部代理商
    setAccount: '/api/v1/agent/proportion', // 代理商分账比例设置
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
    //agent:'/api/v1/cinema/get_region_agent',   //获取院线列表
    //getAllList: '/api/v1/cinema/get_cinema', // 获取全部影院列表
    status: '/api/v1/cinema/device', // 影院设备状态
    map: '/api/v1/statistics/cinemaMap', // 影院地图列表
    mapDetail: '/api/v1/statistics/cinemaMapDetail', // 影院地图详情
    getAllList: '/api/v1/hall/device', // 获取所有代理商,影院,影厅列表
}

// 统计
export const statistics = {
    agent: '/api/v1/statistics/agent', // 代理商统计
    cinema: '/api/v1/statistics/cinema', // 影院统计
    play: '/api/v1/statistics/play', // 播放统计
}

// 首页
export const home = {
    home: '/api/v1/statistics/agentAdmin' ,
}

// 管理员模块
export  const account = {
    list: '/api/v1/admin/list', // 管理员列表
    detail: '/api/v1/admin/detail', // 管理员详情
    add:'/api/v1/admin/add',  //添加管理员
    edit:'/api/v1/admin/edit' ,   //编辑管理员
    delete:'/api/v1/admin/del',  //删除管理员
    disable:'/api/v1/admin/stop',   //禁用管理员
    password:'/api/v1/admin/editpwd',   //密码修改
    group:'/api/v1/group/list',   //用户组列表
    groupDetail: '/api/v1/group/detail', // 用户组详情
    useradd:'/api/v1/group/add',   //添加用户组
    useredit:'/api/v1/group/edit',   //编辑用户组
    userdeldte:'/api/v1/group/del',  // 删除用户组
    getGroups: 'api/v1/group/getGroups', // 获取父分组
    getRule: 'api/v1/authRule/authRuleNode', // 获取规则
    getRight: '/api/v1/admin/getMenu', // 获取菜单权限
    childGroup: '/api/v1/admin/childrenGroupsList', // 获取子用户组
}

// 规则管理
export const authrule = {
    list: '/api/v1/authrule/list', // 规则列表
    add: '/api/v1/AuthRule/add', // 规则添加
    edit: '/api/v1/AuthRule/edit', // 规则编辑
    del: '/api/v1/AuthRule/del', //规则删除
    rule:'/api/v1/authRule/authRuleList',  //规则选项列表
    detail:'/api/v1/authRule/detail'  //规则详情
}

export const log = {
    list: '/api/v1/log/list', // 列表
    detail:'/api/v1/log/detail', //详情
}

export const financial = {
    statistics: '/api/v1/finance/index', // 默认统计
    income:'/api/v1/finance/cinemaIncome', //收入明细
    expend: '/api/v1/finance/defrayDetail', // 支出明细
    orderList: '/api/v1/finance/tradeList', // 用户订单
    orderDetail: '/api/v1/finance/tradeDetail', // 订单详情
    clearing: '/api/v1/finance/settlementList', // 结算列表
    clearingDetail: '/api/v1/finance/settlementDetail', // 结算详情
    clearingDates: '/api/v1/finance/settlementDetailDay', // 结算-每日
    clearingComplete: '/api/v1/finance/settlement', // 结算
    uploadCertificate: '/api/v1/finance/uploadVoucher', // 上传凭证
    report: '/api/v1/financeReport/month', // 月报表
    routing: '/api/v1/finance/proportionSetList', // 分账设置列表
    setAccount: '/api/v1/finance/proportionSet', // 分账设置
    routingDel: '/api/v1/finance/delProportion', // 分账删除
    incomes: '/api/v1/financeReport/profitList', // 收益管理
    incomesDetail: '/api/v1/financeReport/profitDetail', // 收益详情
    agentRouting: '/api/v1/financeReport/proportionList', // 代理商分账列表
}

export default {
    BASE_URL,
    common,
    home,
    cinema,
    agent,
    statistics,
    account,
    authrule,
    log,
    financial
}
