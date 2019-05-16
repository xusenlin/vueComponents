<template>
    <div class="rich-text">
        <quillEditor class="quill-editor"
                     ref="quillEditor"
                     :content="value"
                     @change="onEditorChange($event)"
                     :options="editorOption">
        </quillEditor>

        <el-dialog
                :title="dialogTitle"
                :visible.sync="dialogVisible"
                width="40%"
                :before-close="handleClose">
            <div>
                <el-upload
                        ref="upload"
                        class="upload"
                        drag
                        :before-upload="beforeUpload"
                        :on-error="onError"
                        :on-success="uploadSuccess"
                        :limit="1"
                        action="https://jsonplaceholder.typicode.com/posts/">
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                </el-upload>
            </div>
            <span slot="footer" class="dialog-footer">
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import 'quill/dist/quill.core.css'
    import 'quill/dist/quill.snow.css'
    import 'quill/dist/quill.bubble.css'

    import {quillEditor} from 'vue-quill-editor'
    export default {
        name: 'RichText',
        props: {
            value: String,
            height:{
                type:Number,
                default:46
            }
        },
        data() {
            return {
                resourceType:'',//img,audio,video  本次上传的资源类型，会根据值显示不同的标题，限制不同的文件类型，生成不同的html
                resourceTypeVal:{
                    img:'图像',
                    audio:'音频',
                    video:'视频'
                },
                dialogVisible:false,
                dialogTitle:'上传附件',
                editorOption: {
                    modules: {
                        toolbar: {
                            container: [
                                ['bold', 'italic', 'underline', 'strike'],
                                // ['blockquote', 'code-block'],
                                // [{'header': 1}, {'header': 2}],
                                [{'list': 'ordered'}, {'list': 'bullet'}],
                                [{'script': 'sub'}, {'script': 'super'}],
                                // [{'indent': '-1'}, {'indent': '+1'}],
                                // [{'direction': 'rtl'}],
                                [{'size': ['small', false, 'large', 'huge']}],
                                // [{'header': [1, 2, 3, 4, 5, 6, false]}],
                                [{'color': []}, {'background': []}],
                                // [{'font': []}],
                                [{'align': []}],
                                // [{'clean':'源码编辑'}],
                                ['image', 'audio', 'video'],
                            ],
                            handlers: {
                                image: ()=> {
                                    this.openDialog('img')
                                },
                                audio: ()=> {
                                    this.openDialog('audio')
                                },
                                video: ()=> {
                                    this.openDialog('video')
                                }

                            }
                        }
                    },
                    initButton: () =>{
                        let thisDome = this.$refs.quillEditor.$el
                        thisDome.querySelector('.ql-audio').innerHTML = `
                        <svg class="audio" style="fill:#444"  viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                          xmlns:xlink="http://www.w3.org/1999/xlink" width="16" height="16">
                        <path d="M640 1007.232v-134.72C788.8 819.648 896 679.04 896 512c0-166.912-107.2-307.584-256-360.448V16.768C860.672 73.728 1024 273.536 1024 512c0 238.528-163.328 438.336-384 495.232zM192 768c-106.048 0-192-86.016-192-192v-128a192 192 0 0 1 192-192h64L576 0v1024L256 768H192z m256 0V256l-128 128H192a64 64 0 0 0-64 64v128c0 35.392 28.608 64 64 64h128l128 128z m384-256c0 119.104-81.728 218.368-192 246.912v-136.64c38.144-22.208 64-63.04 64-110.272s-25.856-88.064-64-110.272v-136.64c110.272 28.48 192 127.744 192 246.912z"></path>
                    </svg>
                        `
                    }
                }
            }
        },
        methods:{
            onEditorChange(e){

                this.$emit('input',e.html)
            },
            uploadSuccess(response, file, fileList){
                // console.log(response)
                // console.log(file)
                // console.log(fileList)

                if(this.resourceType =='img'){
                    this.$emit('input',this.value + `<p>你插入了图片（等待后台对接api做事情）</p>`)
                }
                if(this.resourceType =='audio'){
                    this.$emit('input',this.value + `<p>你插入了音频（等待后台对接api做事情）</p>`)

                }
                if(this.resourceType =='video'){
                    this.$emit('input',this.value + `<p>你插入了视频（等待后台对接api做事情）</p>`)

                }

                //在这里插入其他html
                this.dialogVisible = false
                this.$refs.upload.clearFiles();
            },
            openDialog(type){
                this.resourceType = type
                this.dialogTitle = '上传' + this.resourceTypeVal[type];
                this.dialogVisible = true
            },
            onError(err, file, fileList){
                this.$message.error('上传失败，请检查文件格式在重新上传。');
            },
            beforeUpload(file){
                let imgFormat = ['image/jpeg','image/png']
                let audioFormat = ['audio/mp3']
                let videoFormat = ['video/mp4']//不一定准

                if(this.resourceType =='img'){
                    let yes = imgFormat.indexOf(file.type) != -1;
                    if(!yes)this.$message.error('只允许上传'+ imgFormat.join(','));
                    return yes
                }
                if(this.resourceType =='audio'){
                    let yes = audioFormat.indexOf(file.type) != -1;
                    if(!yes)this.$message.error('只允许上传'+audioFormat.join(','));
                    return yes
                }
                if(this.resourceType =='video'){
                    let yes = videoFormat.indexOf(file.type) != -1;
                    if(!yes)this.$message.error('只允许上传'+videoFormat.join(','));
                    return yes
                }
            },
            handleClose(done) {
                if(this.$refs.upload.uploadFiles.length == 0){//文件是否正在上传
                    done();
                    return;
                }
                this.$confirm('确认放弃上传？')
                    .then(_ => {
                        this.$refs.upload.abort();
                        this.$refs.upload.clearFiles();
                        done();
                    })
                    .catch(_ => {});
            }
        },
        components: {quillEditor},
        mounted: function () {
            this.editorOption.initButton();
            this.$refs.quillEditor.quill.container.style.height = `${this.height}px`
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
    .rich-text {
        line-height: normal;
        background: #fff;
        .ql-audio:hover svg {
            fill: #06c !important;
        }
        .el-upload-dragger,.el-upload{
            width: 100%;
        }
    }
</style>
