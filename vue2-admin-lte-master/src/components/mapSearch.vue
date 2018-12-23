<template>
    <div>
        <el-amap vid="amap" id="cinemaMap" class="border" style="height: 400px;max-width: 700px;" :zoom="zoom" :center="center" :dragEnable="true" :zoomEnable="true">
            <el-amap-marker :offset="markerOffset" :draggable="true" :position="marker" v-if="position[0] && position[1]"  :events="events"></el-amap-marker>
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
                markerOffset: [-9, -5],
                center: [107.1386718750, 38.3416561928],
                searchOption: {
                    city: '',
                    citylimit: false
                },
                events: {
                    dragend: (e) => {
                        console.log(e)
                        self.$nextTick(() => {
                            self.dragMarker = [e.lnglat.O, e.lnglat.P]
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
                if (val[0] && val[1]) this.marker = val
                if (val[0] && val[1]) this.center = val
                this.zoom = 16
            },
            dragMarker (val) {
                this.$emit('marker', val)
            }
        }
    }
</script>
<style scoped>

</style>
