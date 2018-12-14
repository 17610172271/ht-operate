// all api
export const BASE_URL = '/v1'

// 通用api
export const common = {
    upload: '/api/v1/upload/uploadImage', // 上传文件
    uploadXML: '/api/5b74dc0ed7a92', // 上传xml
    uploadCover: '/api/5b74d91c459bd', // 上传封面
    uploadJson: '/api/5b7b7f8c67ecc', // 上传JSON
    codeGet: '/api/v1/user/getCode', // 图片验证码获取
    // codeCheck: '/api/5bac80d870088', // 图片验证
    codeCheck: '/api/v1/user/checkCode', // 图片验证
    news: 'v1/Setting/get_num', // 消息数量
    emailCodeSend: '/api/5b7f731b36b0e', // 发送邮箱验证码
    emailCodeCheck: '/api/5b7f73451beb6', // 邮箱验证码验证
    telCodeSend: '/api/v1/sms/sendCode', // 发送短信验证码
    setPassword: '/api/v1/common/lostPassword', // 找回密码
    getCity: '/api/v1/support/getCity', // 获取区域及省市区
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

// 院线管理  ==   区域代理商
export const circuit = {
    list: '/api/v1/line/list', // 院线列表
    add: '/api/v1/line/add', // 添加
    edit: '/api/v1/line/edit', // 编辑
    del: '/api/v1/line/del', //删除
    detail: '/api/v1/line/detail', // 详情
    disable: '/api/v1/line/stop', //启用禁用
    getAllList: 'api/v1/line/get_region_agent', // 获取全部区域代理
    setAccount: '/api/v1/line/proportion', // 设置分账
}
// 代理商管理
export  const agent = {
    list:'/api/v1/agent/list',//代理商列表
    details:'/api/v1/agent/detail'  ,//代理商详情
    edit:'/api/v1/agent/edit',// 代理商编辑
    add:'/api/v1/agent/add',   //添加代理商
    del:'/api/v1/agent/del',   //添加代理商
    disable: '/api/v1/agent/stop', // 代理商启用禁用
    getProvince:'/api/v1/agent/getProvince',   //获取省份下拉列表
    getCity:'/api/v1/agent/getCity', //获取城市下拉列表
    getArea: '/api/v1/agent/getArea', // 获取区县下拉列表
    getAllList: '/api/v1/agent/get_agent', // 获取全部代理商列表
    setAccount: '/api/v1/agent/proportion', // 设置分账
}

// 影院
export  const cinema = {
    list:'/api/v1/cinema/list',   //影院列表
    add:'/api/v1/cinema/add',   //添加影院
    edit:'/api/v1/cinema/edit',   //编辑影院
    del:'/api/v1/cinema/del',     //删除影院
    detail:'/api/v1/cinema/detail',   //影院详情
    disable: '/api/v1/cinema/stop', //启用禁用
    agent:'/api/v1/cinema/get_region_agent',   //获取院线列表
    getAllList: '/api/v1/cinema/get_cinema', // 获取全部影院列表
    status: '/api/v1/cinema/device', // 影院设备状态
    setAccount: '/api/v1/cinema/proportion', // 设置分账
}

// 影厅
export  const moviehall = {
    list:'/api/v1/moviehall/list',   //影厅列表
    add:'/api/v1/moviehall/add',    //添加影厅
    edit:'/api/v1/moviehall/edit',   //编辑影厅
    del:'/api/v1/moviehall/del',    //删除影厅
    detail:'/api/v1/moviehall/detail',    //影厅详情
    getAllList: '/api/v1/hall/get_hall', // 获取全部影院列表
    bindList: '/api/v1/hall/binding', // 绑定设备列表
    status: '/api/v1/hall/device_status', // 影厅绑定设备状态
    device: '/api/v1/hall/device', // 影厅绑定设备
    setAccount: '/api/v1/cinema/setPrice', // 设置价格
}

// 会员列表
export const member = {
    list: '/api/v1/user/list',  //会员列表
    detail:'/api/v1/user/detail',   //会员详情
    stop:'/api/v1/user/stop',   //会员禁用
}


// 首页
export const home = {
    home: '/api/v1/statistics/index' ,
}
// 订单
export  const order = {
    list:'/api/v1/order/list',   //影厅列表
    detail:'/api/v1/order/detail' ,   //订单详情
    cancel: '/api/v1/order/cancel', // 取消订单
}

// 用户功能相关
export const user = {
    login: '/api/v1/user/login', // 用户登录
    logout: '/api/v1/user/loginout', // 退出登录
    userList: '/api/5b99c947af869', // 用户管理列表
    userEdit: '/api/5b99ca895411d', // 个人配置
    findPsd: '/api/5b99f9eca68ee', // 找回密码
}

//消息列表
export  const notice = {
    list:'/api/v1/notice/list',   //消息列表
    add:'/api/v1/notice/add',    //添加消息
    read:'/api/v1/notice/read',   //  消息阅读
    detail:'/api/v1/notice/detail'    //消息详情
}

//影片列表
export const film = {
    list: '/api/v1/film/list' ,
    edit:'/api/v1/film/edit',   //影片价格与编辑
    detail:'/api/v1/film/detail',   //影片详情
    status:'/api/v1/film/status',   // 影院上下线
}

//设备播放
export const device = {
    playlist: '/api/v1/device/playlist' ,   //设备播放列表
    addplay:'/api/v1/device/addplay',   //添加播放设备
    editplay:'/api/v1/device/editplay',   //编辑播放设备
    detail:'/api/v1/device/detail',    //播放详情
    manufacturer: '/api/v1/device/get_manufacturer', // 获取全部厂商列表
    model: '/api/v1/device/get_model', // 获取全部型号列表
    manufacturerList: '/api/v1/device/manufacturer', // 厂商列表
    manufacturerAdd: '/api/v1/device/add_manufacturer', // 厂商添加
    manufacturerEdit: '/api/v1/device/edit_manufacturer', // 厂商编辑
    manufacturerDel: '/api/v1/device/del_manufacturer', // 厂商删除
    modelList: '/api/v1/device/model', // 型号列表
    modelAdd: '/api/v1/device/add_model', // 型号添加
    modelEdit: '/api/v1/device/edit_model', // 型号编辑
    modelDel: '/api/v1/device/del_model', // 型号删除
    map: '/api/v1/device/distribute', // 设备分布
    mapDetail: '/api/v1/hall/hallsInfo', // 设备分布
    export: '/api/v1/device/play_export', // 播放设备导入
}

//控制设备管理
export const nas = {
    gatewayList: '/api/v1/gateway/list' ,   //网关列表
    gatewayAdd: '/api/v1/gateway/add', // 添加网关
    gatewayEdit: '/api/v1/gateway/edit', // 编辑网关
    gatewayDel: '/api/v1/gateway/del', // 网关删除
    gatewayDetail: '/api/v1/gateway/detail', // 网关详情
    gatewayDisable: '/api/v1/gateway/stop', // 网关禁用
    cinema: '/api/v1/nas/cinema',   //nas绑定影院
    nasList: '/api/v1/nas/list',   //nas列表
    nasAdd: '/api/v1/nas/add', // 添加nas
    nasEdit: '/api/v1/nas/edit', // 编辑nas
    nasDel: '/api/v1/nas/del', // 删除nas
    nasDetail: '/api/v1/nas/detail', // nas详情
}

//财务列表
export const naslist = {
    film: '/api/v1/nas/film' ,   //财务列表
    detail:'/api/v1/nas/detail/{$nas_id}' ,   //收入详情
}


//财务列表
export const income = {
    list: '/api/v1/finance/index' ,   //财务列表
    detail:'/api/v1/finance/detail' ,   //收入详情
}

//kdm列表
export const kdm = {
    list: '/api/v1/kdm/list' ,   //kdm列表
    detail:'/api/v1/kdm/detail' ,   //nas绑定影院
}

//修改个人配置
export const admin = {
    editPerson: '/api/v1/admin/editPerson' ,   //个人配置修改
    editPwd:'/api/v1/admin/editPwd' ,   //nas绑定影院
}

// 统计
//修改个人配置
export const statistics = {
    order: 'api/v1/statistics/orderStatistics' ,   //订单统计
    equipment: 'api/v1/statistics/deviceStatistics', // 设备统计
}

export default {
    BASE_URL,
    common,
    home,
    user,
    circuit,
    account,
    cinema,
    moviehall,
    agent,
    order,
    member,
    notice,
    authrule,
    film,
    device,
    nas,
    income,
    kdm,
    admin,
    naslist,
    statistics,}
