<template>
    <div class="bg-white">
        <div class="p-sm"><el-checkbox v-model="checked">全选</el-checkbox></div>
        <el-tree
            :data="ruleList"
            show-checkbox
            :accordion="true"
            node-key="id"
            :check-strictly="true"
            @check="nodeChange"
            @check-change="checkChange"
            ref="ruleTree">
        </el-tree>
    </div>
</template>
<script>
    export default {
        props: {
            data: {
                type: Array,
                default: []
            },
            value: {
                type: Array,
                default: []
            }
        },
        data: () => ({
            ruleList: [],
            nodeVal: [],
            checked: false,
            selectValue: []
        }),
        methods: {
            nodeChange (node) {
                let nodeItem = this.$refs.ruleTree.getNode(node.id)
                if (nodeItem.checked) {
                    this.nodeVal = this.$refs.ruleTree.getCheckedKeys()
                    this.selectParents(nodeItem)
                    this.$refs.ruleTree.setCheckedKeys(this.nodeVal)
                    if (node.children) {
                        this.nodeVal = this.$refs.ruleTree.getCheckedKeys()
                        this.selectAllChildren(node)
                        this.$refs.ruleTree.setCheckedKeys(this.nodeVal)
                    }
                    if (nodeItem.data.label === '编辑') {
                        nodeItem.parent.data.children.map(val => {
                            if (val.label === '查看') {
                                this.nodeVal = this.$refs.ruleTree.getCheckedKeys()
                                this.nodeVal.push(val.id)
                                this.$refs.ruleTree.setCheckedKeys(this.nodeVal)
                            }
                        })
                    }
                } else {
                    if (node.children) {
                        this.nodeVal = this.$refs.ruleTree.getCheckedKeys()
                        this.unselectAllChildren(node)
                        this.$refs.ruleTree.setCheckedKeys(this.nodeVal)
                    }
                }
            },
            checkChange () {
                this.$emit('input', this.$refs.ruleTree.getCheckedKeys())
            },
            selectAllChildren (node) {
                node.children.map(val => {
                    this.nodeVal.push(val.id)
                    if (val.children) {
                        this.selectAllChildren(val)
                    }
                })
            },
            unselectAllChildren (node) {
                node.children.map(val => {
                    if (this.nodeVal.indexOf(val.id) > -1) {
                        this.nodeVal.splice(this.nodeVal.indexOf(val.id), 1)
                    }
                    if (val.children) {
                        this.unselectAllChildren(val)
                    }
                })
            },
            selectParents (node) {
                if (node.level > 1) {
                    this.nodeVal.push(node.parent.data.id)
                    this.selectParents(node.parent)
                }
            },
            selectAll (list) {
                list.map(val => {
                    this.selectValue.push(val.id)
                    if (val.children) {
                        this.selectAll(val.children)
                    }
                })
            }
        },
        created () {
            this.ruleList = this.data
            this.$nextTick(() => {
                this.$refs.ruleTree.setCheckedKeys(this.value)
            })
        },
        watch: {
            data (val) {
                this.ruleList = val
            },
            value (val) {
                this.$refs.ruleTree.setCheckedKeys(val)
            },
            checked (val) {
                if (val) {
                    this.selectValue = []
                    this.selectAll(this.ruleList)
                    this.$refs.ruleTree.setCheckedKeys(this.selectValue)
                } else {
                    this.$refs.ruleTree.setCheckedKeys([])
                }
            }
        }
    }
</script>
