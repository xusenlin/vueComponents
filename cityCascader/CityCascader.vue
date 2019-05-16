<template>
    <div >
        <el-cascader
            style="width: 100%"
            size="small"
            :options="options"
            @change="cityChange"
            :value="value"
            >
        </el-cascader>
    </div>
</template>

<script>
    import { regionData } from 'element-china-area-data'
    export default {
        name: 'CityCascader',
        props: {
            value: Array
        },
        data:function () {
            return {
                options: regionData,
            }
        },
        methods:{
            cityChange(val){
                this.$emit('input',val)
            }
        }
    }
</script>

<style scoped lang="scss">

</style>
