<template>
  <aside id="slider" class="main-sidebar" ref="aside">
    <!-- sidebar: style can be found in sidebar.less -->
    <section class="sidebar">
      <!-- Sidebar user panel -->
      <!--<div class="user-panel sidebar-form">-->
        <!--<div class="pull-left image slide-avatar-container cursor-p" @click="goSetting">-->
          <!--<img :src="getAuthInfo.avatar ? ($bus.url + getAuthInfo.avatar) : '../../../static/img/home/avatar.png'" class="img-circle slide-avatar" alt="User Image">-->
        <!--</div>-->
        <!--<div class="pull-left info">-->
          <!--<p @click="goSetting" class=" cursor-p">{{ getAuthInfo.nickname || getAuthInfo.username }}</p>-->
          <!--<a href="#"><i class="fa fa-circle" style="color:rgb(60, 118, 61);"></i> 在线</a>-->
        <!--</div>-->
      <!--</div>-->
      <!--&lt;!&ndash; search form &ndash;&gt;-->
      <!--<form class="sidebar-form">-->
        <!--<div class="input-group">-->
          <!--&lt;!&ndash; <input type="text" class="form-control" placeholder="请输入搜索内容..."> &ndash;&gt;-->
          <!--<el-autocomplete-->
            <!--style="width: 100%;"-->
            <!--class="inline-input"-->
            <!--v-model="state1"-->
            <!--:fetch-suggestions="querySearch"-->
            <!--placeholder="请输入搜索内容..."-->
            <!--@select="handleSelect"-->
          <!--&gt;</el-autocomplete>-->
          <!--<span class="input-group-btn">-->
            <!--<a href="javascript:;" class="btn"><i class="fa fa-search"></i>-->
            <!--</a>-->
          <!--</span>-->
        <!--</div>-->
      <!--</form>-->
      <!-- /.search form -->
      <!-- sidebar menu: : style can be found in sidebar.less -->
      <ul data-widget="tree" class="sidebar-menu">
        <va-slide-item
          v-for="(item,index) in slideMenuItems"
          :data="item"
          :key="index"
          :type="item.type"
          :isHeader="item.isHeader"
          :icon="item.icon"
          :name="item.name"
          :badge="item.badge"
          :items="item.items"
          :router="item.router"
          :link="item.link"
          :isShow="item.isShow"
        >
        </va-slide-item>
      </ul>
    </section>
    <!-- /.sidebar -->
  </aside>
</template>

<script type="text/ecmascript-6">
import VASlideItem from '../../components/VASlideItem'
import { mapGetters } from 'vuex'
export default {
  name: 'va-slider',
  props: {
    slideMenuItems: {
      type: Array,
      default: []
    }
  },
  data: () => ({
    state1: ''
  }),
  computed: {
    ...mapGetters([
      'getAuthInfo',
    ])
  },
  methods: {
  },
  created () {
  },
  mounted () {
      let that = this
      var h = document.documentElement.clientHeight || document.body.clientHeight
      this.$refs.aside.style.height = h + 'px'
      window.addEventListener('resize', function () {
          var h = document.documentElement.clientHeight || document.body.clientHeight
          that.$refs.aside.style.height = h + 'px'
      })
  },
  components: {
    'va-slide-item': VASlideItem
  }
}
</script>
<style>
  .slider-avatar {
    position: relative;
    width: 100%;
    padding-bottom: 100%;
  }
  .slider-avatar img {
    position:  absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .slide-avatar-container {
    width: 45px;
    height: 45px;
    border: 0.5px solid #f5f5f5;
    border-radius: 50%;
  }
  .user-panel>.image .slide-avatar {
    height: 45px;
    border: none;
  }
  .user-panel.sidebar-form {
    border: none;
  }
  @media (max-width: 768px) {
    .navbar-nav {
      padding-right: 0;
    }
    .navbar-nav .nav>li>a {
      padding: 10px 5px;
    }
  }
  @media (min-width: 768px) and (max-width: 1500px) {

  }
  @media (min-width: 1500px) {
    .slide-avatar-container {
      width: 70px;
      height: 70px;
    }
    .user-panel>.image>img {
      max-width: 70px;
    }
    .user-panel>.image .slide-avatar {
      height: 70px;
    }
    .user-panel>.info {
      left: 80px;
      padding-top: 20px;
    }
    .sidebar-menu>li {
      font-size: 16px;
    }
    .sidebar-menu>li>a {
      padding: 15px 5px 15px 15px;
    }
    .treeview-menu>li>a {
      font-size: 18px;
    }
  }
</style>
