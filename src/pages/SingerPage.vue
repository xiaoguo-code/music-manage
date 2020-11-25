<template>
  <div class="table">
    <div class="container">
      <el-row class="demo-autocomplete">
        <el-col :span="5">
          <div class="sub-title"></div>
          <el-autocomplete
            class="inline-input"
            v-model="keyword"
            :fetch-suggestions="querySearch"
            placeholder="请输入内容"
            :trigger-on-focus="false"
            @select="keywordQuery"
          ></el-autocomplete>
        </el-col>
        <el-col :span="2" >
          <div class="handler-box">
            <el-button type="primary" size="mini" @click="keywordQuery" >查询</el-button>
          </div>
        </el-col>
        <el-col :span="6" >
          <div class="handler-box">
            <el-button type="primary" size="mini" @click="changeDialogFormVisible" >添加歌手</el-button>
          </div>
        </el-col>
      </el-row>
    </div>

    <el-table size="mini" border style="width:100%;" height="500px" :data="tableData">
        <el-table-column label="歌手图片" prop="pic" width="110" align="center">
          <template slot-scope="scope">
              <div class="singer-img">
                <img :src="getUrl(scope.row.pic)" style="width: 100%"/>
              </div>
              <el-upload :action="uploadUrl(scope.row.id)" :on-success="handlerAvatorSucces"
              :before-upload="beforeAvatorUpload">
                  <el-button size="mini">更新图片</el-button>
              </el-upload>
          </template>
        </el-table-column>
      <el-table-column  prop="name" label="歌手" width="110" align="center"></el-table-column>
      <el-table-column  prop="sex" label="性别" width="50" align="center">
          <template slot-scope="scope">
              {{changeSex(scope.row.sex)}}
          </template>
      </el-table-column>
      <el-table-column  prop="birth" label="生日" width="110" align="center">
          <template slot-scope="scope">
            {{attachBirth(scope.row.birth)}}
          </template>
      </el-table-column>
      <el-table-column  prop="location" label="地区" width="100" align="center"></el-table-column>
      <el-table-column  prop="introduction" label="简介" align="center" >
          <template slot-scope="scope">
              <p style="height: 100px;overflow: scroll;">{{scope.row.introduction}}</p>
          </template>
      </el-table-column>
    </el-table>

    <!--对话框-->
    <el-dialog title="添加歌手" :visible.sync="centerDialogFormVisible" width="400px" center>
      <el-form :model="registerForm" ref="registerForm" :label-width="formLabelWidth">
        <el-form-item  prop= "name" label="歌手名" size="mini" >
          <el-input v-model="registerForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" size="mini" >
          <el-radio-group v-model="registerForm.sex" placeholder="性别">
            <el-radio :label="0" >女</el-radio>
            <el-radio :label="1" >男</el-radio>
            <el-radio :label="2" >组合</el-radio>
            <el-radio :label="3" >不明</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item prop="birth" label="生日" size="mini">
          <el-date-picker type="date" placeholder="选择日期" v-model="registerForm.birth" style="width: 100%" >
          </el-date-picker>
        </el-form-item>
        <el-form-item prop="location" label="地区" size="mini">
          <el-input v-model="registerForm.location" placeholder="地区"></el-input>
        </el-form-item>
        <el-form-item prop="introduction" label="地区" size="mini">
          <el-input v-model="registerForm.introduction" placeholder="简介" type="textarea"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="changeDialogFormVisible">取 消</el-button>
        <el-button type="primary" @click="addSinger">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {setSinger} from '../api/index'
  import {getAllSinger} from "../api/index";
  import {getSingerByName} from "../api/index";
  import {mixin} from "../mixins";

  export default {
      mixins:[mixin],
        name: "InfoPage",
        data(){
            return{
                centerDialogFormVisible:false,
                formLabelWidth: '80px',
                registerForm:{
                    name:'',
                    sex:'',
                    birth:'',
                    location:'',
                    introduction:''
                },
                tableData:[],
                tempData:[],
                select_word:'',
                keyword:'',
                recommendList: [],
            }
        },
        created(){
            this.getData();
        },
        methods:{
            /*-start-输入框，返回所建立输入的值-start-*/
            //选中input输入建议的值时或者点击查询时触发该查询方法（根据姓名模糊查询）
            keywordQuery(item){
                console.log(item);
                this.tableData=[];
                let params = new URLSearchParams;
                params.append("keyword",this.keyword);
                getSingerByName(params)
                    .then(res=>{
                        this.tableData=res;
                    })
                    .catch(err=>{
                        console.log(err);
                    })
            },
            //input输入值后，调用此方法，匹配到建议的值后，callback（data）返回数据列表
            querySearch(queryString, cb) {
                console.log("queryString="+queryString);
                let parms = new URLSearchParams;
                parms.append("keyword",queryString);
                getSingerByName(parms)
                    .then(res=>{
                        for(var i = 0;i<res.length;i++){
                            let obj = new Object();
                            obj.value =res[i].name;
                             this.recommendList[i] = obj;
                             console.log(res[i].name);
                        }
                        console.log("="+this.recommendList);
                        cb(this.recommendList);
                    })
                    .catch(err=>{
                        console.log(err);
                    })
            },
            /*-end-输入框，返回所建立输入的值-end-*/

            changeDialogFormVisible(){
                this.centerDialogFormVisible = !this.centerDialogFormVisible;
            },
            //添加歌手
            addSinger(){
                let d = this.registerForm.birth;
                let datetime = d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate();
                let params = new URLSearchParams;
                console.log(this.registerForm.birth);
                params.append('name',this.registerForm.name);
                params.append('sex',this.registerForm.sex);
                params.append('pic','/img/singerPic/default.jpg');
                params.append('birth',datetime);
                params.append('location',this.registerForm.location);
                params.append('introduction',this.registerForm.introduction);

                setSinger(params)
                    .then(res=>{
                        if(res.code===1){
                            this.notify("添加成功","success");
                        }else{
                            this.notify("添加失败","error");
                        }
                    })
                    .catch(err=>{
                        console.log(err);
                    })
                this.centerDialogFormVisible=false;
            },
            //查询所有歌手
            getData(){
                this.tableData=[];
                getAllSinger()
                    .then(res=>{
                        this.tableData=res;
                    })
            },
            //更新时间
            uploadUrl(id){
                return this.$store.state.HOST+"/singer/updateSingerPic?id="+id;
            },

        }

    }
</script>

<style scoped>
.handler-box{

  margin-top: 6px;

}
  .singer-img{
    width:100%;
    height: 80px;
    border-radius: 5px;
    margin-bottom: 5px;
    overflow: hidden;
  }
</style>
