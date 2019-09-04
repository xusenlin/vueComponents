<template>
    <div class="slot-machine" ref="box">
        <div class="item" v-for="row in column"
             :key="row"
             :style="'background-image: url('+ backgroundImg + ');transition-duration:'+animationDurationCopy+'s'"
        ></div>
    </div>
</template>

<script>
    export default {
        name: 'SlotMachine',
        props: {
            column: {//老虎机有多少列
                type: Number,
                default: 3
            },
            itemNum: { //背景图有多少行内容
                type: Number,
                default: 3
            },
            selectItem: {//选中的值 -1 0 1 2 ... (-1不会选择同一组，0选择第一个，1选择第二个)
                type: Number,
                default: 1
            },
            animationDuration: {//完成滚动动画的时间（单位秒）
                type: Number,
                default: 5
            },
            interval: {//开始抽奖，老虎机每一列滚动的间隔时间(单位毫秒)
                type: Number,
                default: 500
            },
            speed: {//速度，值越大越快，
                type: Number,
                default: 8
            },
            backgroundImg: String //背景图地址
        },
        data: function () {
            return {
                bgImgHeight: 0,
                itemHeight: 0,
                animationDurationCopy: 0,
                running:false,
                lastStatus:[],
            }
        },
        mounted() {

            let itemDom = this.$refs.box.querySelectorAll('.item');

            let image = new Image();
            image.src = this.backgroundImg;

            image.onload = _ => {
                let itemClientRect = itemDom[0].getBoundingClientRect();

                this.bgImgHeight = itemClientRect.width / image.width * image.height;
                this.itemHeight = this.bgImgHeight / this.itemNum;

                this.$refs.box.style.height = this.itemHeight + 'px';

                itemDom.forEach(t=>{
                    //本来css background-size: 100% auto;就很完美了
                    //但是为了兼容微信浏览器加了这行，
                    t.style.backgroundSize = itemClientRect.width + 'px  auto';
                })

            }
        },
        methods: {
            Run(){
                if(this.running) return;
                this.resetSlotMachine();
                this.running = true;
                setTimeout(_=>{
                    this.lastStatus = this.selectItem;
                    this.animationDurationCopy = this.animationDuration;
                    this.$nextTick(_=>{
                        this.runSlotMachine()
                    })
                },300)
            },

            runSlotMachine() {


                let itemDom = this.$refs.box.querySelectorAll('.item');
                this.lastStatus = []


                let randomArr = [];

                if(this.selectItem === -1){
                    itemDom.forEach(_=>{
                        randomArr.push(Math.floor(Math.random() * itemDom.length))
                    });
                    if([...new Set(randomArr)].length === 1 ){
                        this.runSlotMachine();
                        return
                    }
                }
                itemDom.forEach((t, i) => {
                    let h = 0;
                    if (this.selectItem === -1) {
                        h = this.bgImgHeight * this.speed + (randomArr[i] * this.itemHeight);
                        this.lastStatus.push(randomArr[i])
                    } else {
                        this.lastStatus.push(this.selectItem);
                        h = this.bgImgHeight * this.speed + (this.selectItem * this.itemHeight);
                    }

                    setTimeout(_ => {
                        t.style.backgroundPosition = '0px -' + h + 'px';
                    }, this.interval * i)
                });

                setTimeout(_ =>{
                    this.$emit('success',this.selectItem);
                    setTimeout(_=>{
                        this.running = false;
                        this.animationDurationCopy = 0;
                    },30)
                },itemDom.length * this.interval + this.animationDuration * 1000)


            },
            resetSlotMachine(){
                if(this.running) return;
                let itemDom = this.$refs.box.querySelectorAll('.item');

                itemDom.forEach((t,i) => {
                    let h = this.lastStatus[i] * this.itemHeight;
                    t.style.backgroundPosition = '0px -' + h + 'px';
                });
            },
            Reset() {
                if(this.running) return;
                let itemDom = this.$refs.box.querySelectorAll('.item');
                this.lastStatus= [];
                itemDom.forEach(t => {
                    this.lastStatus.push(0);
                    t.style.backgroundPosition = '0px 0px';
                });
            }
        }
    }
</script>

<style scoped lang="scss">
    .slot-machine {
        width: 100%;
        height: 100%;
        display: flex;

        .item {
            position: relative;
            flex: 1;
            height: 100%;
            overflow: hidden;
            transform: translate3d(0,0,0);
            background-repeat: repeat-y;
            transition: background-position ease-in-out;
        }
    }
</style>
