<template>
    <div>
        <el-amap vid="amap" id="cinemaMap" style="height: 400px;" :zoom="zoom" :center="center" :dragEnable="true" :zoomEnable="true">
            <el-amap-marker :draggable="true" :position="marker" v-if="position.length>0"  :events="events"></el-amap-marker>
        </el-amap>
    </div>
</template>
<script type="text/ecmascript-6">
    export default {
        props: {
            address: '',
            position: {
                type: Array,
                default: []
            }
        },
        data () {
            const self = this
            return {
                marker: [],
                dragMarker: [],
                zoom: 4,
                center: [107.1386718750, 38.3416561928],
                searchOption: {
                    city: '',
                    citylimit: false
                },
                events: {
                    dragend: (e) => {
                        self.$nextTick(() => {
                            self.dragMarker = [e.lnglat.lng, e.lnglat.lat]
                        })
                    }
                },
            }
        },
        computed: {
            _autoComplete () {
                return new AMap.Autocomplete(this.searchOption || {})
            },
            _placeSearch () {
                return new AMap.PlaceSearch(this.searchOption || {})
            },
        },
        methods: {
            search () {
                this._autoComplete.search(this.address, (status, result) => {
                    if (status === 'complete') {
                        this.$emit('searchResult', result.tips)
                    }
                })
            }
        },
        created () {
        },
        watch: {
            address (val) {
                this.search()
            },
            position (val) {
                this.marker = val
                this.center = val
                this.zoom = 18
            },
            dragMarker (val) {
                this.$emit('marker', val)
            }
        }
    }
</script>
<style scoped>

</style>
