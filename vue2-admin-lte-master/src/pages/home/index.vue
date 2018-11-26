<template>
    <div class="wrapper">
        <va-navibar></va-navibar>
        <va-slider :slideMenuItems="slideMenuItems"></va-slider>
        <va-content-wrap></va-content-wrap>
        <Modal></Modal>
    </div>
</template>
<script type="text/ecmascript-6">
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
                slideMenuItems: slideMenuItems
            }
        },
        methods: {
            getNav () {
                this.$http.get(api.account.getRight).then(res => {
                    if (res.data.code === 1) {
                        this.saveNavList(res.data.data)
                        window.localStorage.setItem('navList', JSON.stringify(res.data.data))
                    }
                })
            },
            getRoot () {
                this.getNavList.map(nav => {
                    this.slideMenuItems.map(item => {
                        if (item.name === nav.name) {
                            item.root = nav.root
                        }
                        if (item.items) {
                            item.items.map(val => {
                                if (val.name === nav.name) {
                                    val.root = nav.root
                                }
                            })
                        }
                    })
                })
            },
            ...mapActions([
                'saveNavList'
            ])
        },
        created () {
            this.getNav()
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
