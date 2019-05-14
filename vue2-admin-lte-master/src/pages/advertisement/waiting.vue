<template>
    <div class="" v-loading="loading">
        <div class="p-lg appli-container">
            <sub-header :list="subNavList"></sub-header>
            <div class="m-t-lg bg-white p-v-md">
                <div id="calendar">
                    <div class="p-b-sm">
                        <el-select v-model="currentYear" placeholder="请选择年" style="max-width: 100px;"@change="getList">
                            <el-option
                              v-for="item in yearList"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                            </el-option>
                        </el-select>
                        <el-select v-model="currentMonth" placeholder="请选择月" style="max-width: 100px;" @change="getList">
                            <el-option
                              v-for="item in monthList"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="calendar-shadow">
                        <ul class="weekdays">
                            <li>一</li>
                            <li>二</li>
                            <li>三</li>
                            <li>四</li>
                            <li>五</li>
                            <li style="color:red">六</li>
                            <li style="color:red">日</li>
                        </ul>
                        <!-- 日期 -->
                        <ul class="days">
                            <!-- 核心 v-for循环 每一次循环用<li>标签创建一天 -->
                            <li  v-for="dayobject in days">
                                <!--本月-->
                                <!--如果不是本月  改变类名加灰色-->

                                <div v-if="dayobject.day.split('-')[1] != currentMonth" class="other-month">
                                    <div class="text-xxlg text-bold">{{ dayobject.day.split('-')[2] }}</div>
                                    <div :class="{'m-t-sm': index === 0}" v-for="(item, index) in 4">
                                        CPT:
                                        <el-popover
                                            class="calendar-popover calendar-popover1"
                                            placement="right"
                                            width="200"
                                            trigger="hover">
                                            <p>这是一段内容,这是一段内容,这是一段内容,这是一段内容1111。</p>
                                            <el-button slot="reference">5个</el-button>
                                        </el-popover>
                                        <span>剩余: {{dayobject.time}}s</span>
                                    </div>
                                </div>

                                <!--如果是本月  还需要判断是不是这一天-->
                                <div v-else>
                              <!--今天  同年同月同日-->
                                    <div class="text-xxlg text-bold" v-if="dayobject.day.split('-')[0] == new Date().getFullYear() && dayobject.day.split('-')[1] == (new Date().getMonth() + 1) && dayobject.day.split('-')[2] == new Date().getDate()"><span class="active">{{ dayobject.day.split('-')[2] }}</span></div>
                                    <div class="text-xxlg text-bold" v-else>{{ dayobject.day.split('-')[2] }}</div>
                                    <div :class="{'m-t-sm': index === 0}" v-for="(item, index) in 4">
                                        CPT:
                                        <el-popover
                                            class="calendar-popover"
                                            placement="right"
                                            width="200"
                                            trigger="hover">
                                            <p>这是一段内容,这是一段内容,这是一段内容,这是一段内容1111。</p>
                                            <el-button slot="reference">5个</el-button>
                                        </el-popover>
                                        <span>剩余: {{dayobject.time}}s</span>
                                    </div>
                                </div>

                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import SubHeader from '../common/subheader'
    import api from '@/api'
    import SearchIpts from '../common/searchIpts'
    import format from '@/tools/format'
    export default {
        data: () => ({
            currentDay: 1,
            currentMonth: 1,
            currentYear: 1970,
            currentWeek: 1,
            days: [],
            yearList: [],
            monthList: [],
            loading: false,
            subNavList: {
                parentNode: {
                    name: '广告管理',
                    router: {
                        name: 'advertisement_project'
                    }
                },
                childNode: {
                    name: '广告排期',
                    desc: '主要用于广告排期的查看及管理',
                    router: {
                        name: 'advertisement_waiting'
                    }
                }
            },
        }),
        components: {
            SubHeader
        },
        methods: {
            initData: function(cur) {
                console.log(cur)
                var leftcount=0; //存放剩余数量
                var date;
                if (cur) {
                    date = new Date(cur);
                } else {
                    var now=new Date();
                    var d = new Date(this.formatDate(now.getFullYear() , now.getMonth() , 1));
                    d.setDate(35);
                    date = new Date(this.formatDate(d.getFullYear(),d.getMonth() + 1,1));
                }
                
                this.currentDay = date.getDate();
                this.currentYear = date.getFullYear();
                this.currentMonth = date.getMonth() + 1;
                this.currentWeek = date.getDay(); // 1...6,0
                if (!cur) {
                    for (let i = this.currentYear - 5; i < this.currentYear + 5; i++) {
                        this.yearList.push({
                            label: i + '年',
                            value: i
                        })
                    }
                    for (let i = 1; i < 13; i++) {
                        this.monthList.push({
                            label: (i < 10 ? '0' + i : i) + '月',
                            value: i
                        })
                    }
                }
                
                if (this.currentWeek == 0) {
                    this.currentWeek = 7;
                }
                var str = this.formatDate(this.currentYear , this.currentMonth, this.currentDay);
                this.days.length = 0;
                // 今天是周日，放在第一行第7个位置，前面6个
                //初始化本周
                for (var i = this.currentWeek - 1; i >= 0; i--) {
                    var d = new Date(str);
                    d.setDate(d.getDate() - i);
                    var dayobject={}; //用一个对象包装Date对象  以便为以后预定功能添加属性
                    dayobject.day=format(d, 'YYYY-MM-DD');
                    dayobject.time=parseInt(Math.random()*10);
                    this.days.push(dayobject);//将日期放入data 中的days数组 供页面渲染使用
                }
                //其他周
                for (var i = 1; i <= 35 - this.currentWeek; i++) {
                    var d = new Date(str);
                    d.setDate(d.getDate() + i);
                    var dayobject={};
                    dayobject.day=format(d, 'YYYY-MM-DD');
                    dayobject.time=parseInt(Math.random()*10);
                    this.days.push(dayobject);
                }
            },
            getList () {
                this.initData(this.currentYear + '-' + (this.currentMonth < 10 ? '0' + this.currentMonth : this.currentMonth) + '-01')
                console.log('获取数据')
            },
            // 返回 类似 2016-01-02 格式的字符串
            formatDate: function(year,month,day){
                var y = year;
                var m = month;
                if(m<10) m = "0" + m;
                var d = day;
                if(d<10) d = "0" + d;
                return y+"-"+m+"-"+d
            }
        },
        created () {
            this.initData(null);
        },
        watch: {

        }
    }
</script>
<style scoped>
#calendar{
    min-width:900px;
    width: 95%;
    margin: 0 auto;
}
.calendar-shadow {
    box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.1), 0 1px 5px 0 rgba(0,0,0,0.12);
}
.month {
    width: 100%;
    background: #00B8EC;
}
.month ul {
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: space-between;
}
.year-month {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
}
.year-month:hover {
    background: rgba(150, 2, 12, 0.1);
}
.choose-year {
    padding-left: 20px;
    padding-right: 20px;
}
.choose-month {
    text-align: center;
    font-size: 1.5rem;
}
.arrow {
    padding: 30px;
}
.arrow:hover {
    background: rgba(100, 2, 12, 0.1);
}
.month ul li {
    color: white;
    font-size: 20px;
    text-transform: uppercase;
    letter-spacing: 3px;
}
.weekdays {
    margin: 0;
    padding: 20px 0;
    background-color: #00B8EC;
    display: flex;
    flex-wrap: wrap;
    color: #FFFFFF;
    justify-content: space-around;
}
.weekdays li {
    display: inline-block;
    width: 13.6%;
    text-align: center;
}
.days {
    padding: 0;
    background: #FFFFFF;
    margin: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
}
.days li {
    list-style-type: none;
    display: inline-block;
    width: 14.2%;
    height: 140px;
    text-align: center;
    padding-bottom: 15px;
    padding-top: 15px;
    font-size: 1rem;
    color: #333;
    cursor: pointer;
}
.days li .active {
    padding: 6px 10px;
    border-radius: 50%;
    background: #00B8EC;
    color: #fff;
}
.days li .other-month {
    padding: 5px;
    color: #ccc;
}
.days li:hover {
    background: #f5f5f5;
}
.calendar-popover > .el-button {
    padding: 0;
    border: none;
    background-color: inherit;
}
.calendar-popover1 > .el-button {
    color: #ccc;
}
.calendar-popover1 > .el-button:hover {
    color: #409EFF;
}
</style>
