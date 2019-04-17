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
                slideMenuItems: slideMenuItems
            }
        },
        methods: {
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
            },
            ...mapActions([
                'saveNavList'
            ])
        },
        created () {
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
