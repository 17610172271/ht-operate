<template>
    <div class="wrapper">
        <va-navibar></va-navibar>
        <va-slider :slideMenuItems="slideMenuItems"></va-slider>
        <va-content-wrap></va-content-wrap>
        <Modal></Modal>
    </div>
</template>
<script>
    import VANaviBar from '../common/NaviBar.vue'
    import VASlider from '../common/Slider.vue'
    import VAContentWrap from '../common/ContentWrap.vue'
    import Modal from '../../components/Modal.vue'
    import slideMenuItems from '../../lib/slideMenuItems.js'
    import { mapGetters, mapActions } from 'vuex'
    import api from '@/api'

    export default {
        data () {
            return {
                slideMenuItems: slideMenuItems,
                rightList: {
                    401: true,
                    402: true,
                    403: true,
                    40301: true,
                    4030101: true,
                    4030102: true,
                    4030103: true,
                    40302: true,
                    40303: true,
                    404: true,
                    40401: true,
                    40402: true,
                    405: true,
                    40501: true,
                    40502: true,
                    40503: true,
                    40504: true,
                    40505: true,
                    40506: true,
                    40507: true,
                    40508: true,
                    40509: true,
                    406: true,
                    40601: true,
                    40602: true,
                    40603: true,
                    407: true,
                    40701: true,
                    408: true,
                    40801: true,
                    40802: true,
                    409: true,
                    40901: true,
                    40902: true,
                }
            }
        },
        methods: {
            getNav () {
                // this.$http.get(api.account.getRight).then(res => {
                //     if (res.data.code === 1) {
                //         this.saveNavList(res.data.data)
                //         window.localStorage.setItem('navList', JSON.stringify(res.data.data))
                //     }
                // })
                this.saveNavList(this.rightList)
                window.localStorage.setItem('navList', JSON.stringify(this.rightList))
            },
            getRoot () {
                for(let key in this.getNavList) {
                    this.slideMenuItems.map(item => {
                        if (item.id == key) {
                            item.isShow = this.getNavList[key]
                        }
                        if (item.items) {
                            item.items.map(val => {
                                if (val.id == key) {
                                    val.isShow = this.getNavList[key]
                                }
                            })
                        }
                    })
                }
                // this.getNavList.map(nav => {
                //     this.slideMenuItems.map(item => {
                //         if (item.name === nav.name) {
                //             item.root = nav.root
                //         }
                //         if (item.items) {
                //             item.items.map(val => {
                //                 if (val.name === nav.name) {
                //                     val.root = nav.root
                //                 }
                //             })
                //         }
                //     })
                // })
            },
            ...mapActions([
                'saveNavList'
            ])
        },
        created () {
            this.getNav()
            this.getRoot()
        },
        watch: {
            getNavList (val) {
                 this.getRoot()
            }
        },
        computed: {
            ...mapGetters([
                'getNavList'
            ])
        },
        components: {
            'va-navibar': VANaviBar,
            'va-slider': VASlider,
            'va-content-wrap': VAContentWrap,
            Modal
        }
    }
</script>
