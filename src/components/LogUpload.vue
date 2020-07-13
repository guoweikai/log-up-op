<!--
 * @Date: 2020-07-13 07:37:00
 * @LastEditors: GWK
 * @LastEditTime: 2020-07-13 21:19:13
 * @FilePath: /log-upload/src/components/LogUpload.vue
--> 
<template>
  <!-- 上传表单 -->
  <div>
    <div class="main">
      <div class="mb30" style="text-align:center">通知用户上传</div>
      <el-form :model="upForm" :rules="upRules" ref="upForm" label-width="70px" class="up-Form">
        <el-form-item label="env:" prop="env">
          <el-select v-model="upForm.env" placeholder="请选择环境">
            <el-option label="liveme-qa" value="liveme-QA"></el-option>
            <el-option label="liveme-prod" value="liveme-Prod"></el-option>
            <el-option label="猎户-qa" value="cmcm-QA"></el-option>
            <el-option label="猎户-prod" value="cmcm-Prod"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="user_id:" prop="userid">
          <el-input v-model="upForm.userid"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitUpForm('upForm')">通知上传</el-button>
          <el-button @click="resetForm('upForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="line"></div>
    <!-- 筛选 下载表单 -->
    <div class="main">
      <div class="mb30 mt100" style="text-align:center">查询日志</div>
      <el-form
        :model="downForm"
        :rules="downRules"
        ref="downForm"
        label-width="70px"
        class="up-Form"
      >
        <el-form-item label="app_id:" prop="appid">
          <el-input v-model="downForm.appid"></el-input>
        </el-form-item>
        <el-form-item label="room_id:" prop="roomid">
          <el-input v-model="downForm.roomid"></el-input>
        </el-form-item>
        <el-form-item label="user_id:" prop="userid">
          <el-input v-model="downForm.userid"></el-input>
        </el-form-item>
        <el-form-item label="date:">
          <el-date-picker
            v-model="downForm.time"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="expireTimeOption"
            value-format="timestamp"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitDownForm('downForm')">查询</el-button>
          <el-button @click="resetForm('downForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-dialog title="日志列表" :visible.sync="dialogTableVisible" width="600px">
      <el-table :data="list">
        <el-table-column property="name" label="文件名称" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <a :href="scope.row.url">下载</a>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      upForm: {
        userid: "",
        env: ""
      },
      upRules: {
        userid: [{ required: true, message: "请输入用户Id", trigger: "blur" }],
        env: [{ required: true, message: "请选择环境", trigger: "change" }]
      },
      downForm: {
        appid: "",
        roomid: "",
        userid: "",
        time: ""
      },
      downRules: {
        appid: [{ required: true, message: "请输入appid", trigger: "blur" }]
      },
      expireTimeOption: {
        disabledDate(date) {
          return date.getTime() > Date.now() - 24 * 60 * 60 * 1000;
        }
      },
      list: [],
      dialogTableVisible: false
    };
  },

  computed: {},
  created() {
    console.log(this.$http);
  },
  methods: {
    handleClick1(data) {
      console.log(data);
    },
    handleClick() {
      this.list.forEach(item => {
        let data = {
          filename: item
        };
        data = this.formatData(data);
        this.download(data);
      });
    },
    submitUpForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // eslint-disable-next-line no-unused-vars
          let data = {
            userid: this.upForm.userid,
            env: this.upForm.env
          };
          data = this.formatData(data);
          this.notify(data);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    submitDownForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // this.query(data)
          let data = {};
          for (const key in this.downForm) {
            if (typeof this.downForm[key] == "object") {
              data.begintime = this.downForm[key][0];
              data.endtime = this.downForm[key][1];
            } else {
              if (this.downForm[key]) {
                data[key] = this.downForm[key];
              }
            }
          }
          data = this.formatData(data);
          this.query(data);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 通知
    notify(params) {
      this.$http.get(`/v1/notify${params}`).then(response => {
        if (response.data && response.data.code == 0) {
          this.list = response.data.list;
          this.$message({
            message: `[msg]:${response.data.msg} [resp]:${response.data.resp}`,
            type: "success",
            duration:5000
          });
        } else {
          this.$message.error(response.data.msg);
        }
      });
    },
    // 查询
    query(params) {
      this.$http.get(`/v1/query${params}`).then(response => {
        if (response.data && response.data.code == 0) {
          this.list = [];
          response.data.list.forEach(item => {
            let name = item.split("/").pop();
            let data = {
              url: item,
              name: name
            };
            this.list.push(data);
          });
          this.dialogTableVisible = true;
        } else {
          this.$message.error(response.data.message);
        }
      });
    },
    // 下载
    // download(params) {
    //   this.$http({
    //     method: "get",
    //     url: `/v1/download${params}`,
    //     responseType: "arraybuffer"
    //   }).then(response => {
    //     console.log(response);
    //     let blob = new Blob([response.data]);
    //     this.saveAs(blob, "aaaaa");
    //   });
    // },

    // saveAs(blob, filename) {
    //   if (window.navigator.msSaveOrOpenBlob) {
    //     navigator.msSaveBlob(blob, filename);
    //   } else {
    //     const link = document.createElement("a");
    //     const body = document.querySelector("body");

    //     link.href = window.URL.createObjectURL(blob); // 创建对象url
    //     link.download = filename;

    //     // fix Firefox
    //     link.style.display = "none";
    //     body.appendChild(link);

    //     link.click();
    //     body.removeChild(link);

    //     window.URL.revokeObjectURL(link.href); // 通过调用 URL.createObjectURL() 创建的 URL 对象
    //   }
    // },
    formatData(obj) {
      var str = "?";
      for (var i in obj) {
        str += i;
        str += "=";
        str += obj[i];
        str += "&";
      }
      str = str.substr(0, str.length - 1);
      return str;
    }
  }
};
</script>

<style>
.main {
  width: 600px;
  margin: 0 auto;
}

.mb30 {
  margin-bottom: 30px;
}

.mt100 {
  margin-top: 100px;
}

.el-select {
  width: 100%;
}

.el-range-editor.el-input__inner {
  width: 100%;
}
</style>