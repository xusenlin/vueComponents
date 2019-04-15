<template>
    <div class="collapse" :class="{ ' pack-up' : collapse }">
        <slot name="head"></slot>
        <div class="info" ref="description" :style="'transition:' + cssTransitionVal">
            <div ref="info">
                <span v-if="packUpTextLength < content.length">
                    {{ collapse ? content.substr(0,packUpTextLength)+'...' : content }}
                </span>
                <span v-else>{{ content }}</span>
            </div>
        </div>
        <span v-if="packUpTextLength < content.length" class="more-info" @click="toggleCollapse">
            {{ collapse ? expandTip : packUpTip }}
        </span>
    </div>
</template>
<script>
    export default {
        name: 'Collapse',
        props: {
            cssTransitionVal: {
                type: String,
                default: 'height .45s cubic-bezier(0.68, -0.55, 0.27, 1.55) 0s'
            },
            expandTip: {
                type: String,
                default: '点击展开'
            },
            packUpTip: {
                type: String,
                default: '点击收起'
            },
            packUpTextLength: {
                type: Number,
                default: 90
            },
            content: {
                type: String,
                required: true
            }
        },
        data: function () {
            return {
                collapse: true,
            }
        },
        methods: {
            toggleCollapse(){
                this.collapse = !this.collapse
                this.$nextTick(_=>{
                    this.$refs.description.style.height = (this.$refs.info).offsetHeight+'px'
                })

            }
        },
        watch: {
            'content': {
                handler: function () {
                    if(this.content.length){
                        this.$nextTick(_=>{
                            this.$refs.description.style.height = (this.$refs.info).offsetHeight+'px'
                        })
                    }
                },
                deep: true
            }
        },
    }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .collapse {
        background: #fff;
        margin-top: 10px;
        padding: 10px 40px 36px;
        .info{
            overflow: hidden;
            font-size: 28px;
            color: #666;
            background: #fff;
            margin: 10px 0 0;
            line-height: 58px;
        }
        .more-info{
            display: flex;
            justify-content: flex-end;
            align-items: center;
            text-align: right;
            color: #999;
            height: 40px;
            font-size: 26px;
            font-weight: normal;
            position: relative;
        }
        .more-info:after{
            content: '';
            margin: 16px;
            width: 8px;
            height: 8px;
            transform: rotate(-45deg);
            border-top: 4px solid #999;
            border-right: 4px solid #999;
        }
    }
    .pack-up.collapse{
        .more-info:after{
            transform: rotate(135deg)
        }
    }
</style>
