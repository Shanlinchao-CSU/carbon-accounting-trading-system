<template>
  <div class="background_box">
    <el-dialog
        v-model="dialogVisible"
        title="提交成功!"
        width="500"
    >
      <span>审核后会通过手机短信告知您结果,请留意!</span>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="dialogVisible = false">
            确定
          </el-button>
        </div>
      </template>
    </el-dialog>

    <div class="register_box">
      <div class="register_type_box">
        <span :class="[{'active':register_type===0},'register_type']" @click="change_register_type(0)" ref="company_user">企业用户注册</span>
        <span :class="[{'active':register_type===1},'register_type']" @click="change_register_type(1)" ref="monitor_institution">监管机构注册</span>
        <div class="animation-shadow"></div>
        <div class="animation"></div>
      </div>
      <el-form
          ref="ruleFormRef"
          :model="register_company_user"
          :rules="rules"
          class="main_input_box"
          :size="'default'"
          status-icon
          v-if="register_type === 0">
        <el-form-item
            prop="name"
            class="form_item">
          <el-input
              v-model="register_company_user.name"
              placeholder="请输入公司全称"
              maxlength="30"
              class="input"></el-input>
        </el-form-item>
        <el-form-item
            prop="phone"
            class="form_item">
          <el-input
              v-model="register_company_user.phone"
              placeholder="请输入公司电话"
              maxlength="11"
              class="input"></el-input>
        </el-form-item>
        <el-form-item
            prop="password"
            class="form_item">
          <el-input
              v-model="register_company_user.password"
              placeholder="请设置密码"
              maxlength="18"
              class="input"></el-input>
        </el-form-item>
        <el-form-item
            prop="v_code"
            class="form_item">
          <div class="code_box">
            <el-input
                v-model="register_company_user.v_code"
                placeholder="请输入验证码"
                maxlength="4"
                class="input"></el-input>
            <el-button
                class="get_code_btn"
                @click="sendMessage(ruleFormRef)"
                :disabled="counting">
              {{get_code_text}}
            </el-button>
          </div>
        </el-form-item>
        <el-form-item
            prop="confirm_password"
            class="form_item">
          <el-input
              v-model="register_company_user.confirm_password"
              placeholder="请确认密码"
              maxlength="18"
              class="input"></el-input>
        </el-form-item>
        <el-form-item
            prop="enterprise_type"
            class="form_item">
          <el-select
              v-model="enterprise_type"
              placeholder="请选择企业类型"
              size="large"
              style="width: 260px;">
            <el-option
                v-for="item in all_enterprise_type"
                :key="item.value"
                :label="item.label"
                :value="item.value"/>
          </el-select>
        </el-form-item>
        <div></div>
        <el-upload
            action="#"
            ref="uploadBox"
            :limit="1"
            :auto-upload="false"
            :http-request="upload">
          <el-button class="choose_file_btn">提交证明材料</el-button>
        </el-upload>
      </el-form>

      <el-form
          ref="ruleFormRef_monitor"
          :model="monitor_institution"
          :rules="rules"
          class="main_input_box"
          :size="'default'"
          status-icon
          v-if="register_type === 1">
        <el-form-item
            prop="name"
            class="form_item">
          <el-input
              v-model="monitor_institution.name"
              placeholder="请输入机构名称"
              maxlength="30"
              class="input"></el-input>
        </el-form-item>
        <el-form-item
            prop="phone"
            class="form_item">
          <el-input
              v-model="monitor_institution.phone"
              placeholder="请输入机构电话"
              maxlength="11"
              class="input"></el-input>
        </el-form-item>
        <el-form-item
            prop="password"
            class="form_item">
          <el-input
              v-model="monitor_institution.password"
              placeholder="请设置密码"
              maxlength="18"
              class="input"></el-input>
        </el-form-item>
        <el-form-item
            prop="v_code"
            class="form_item">
          <div class="code_box">
            <el-input
                v-model="monitor_institution.v_code"
                placeholder="请输入验证码"
                maxlength="4"
                class="input"></el-input>
            <el-button
                class="get_code_btn"
                @click="sendMessage(ruleFormRef_monitor)"
                :disabled="counting_monitor">
              {{get_code_text_monitor}}
            </el-button>
          </div>
        </el-form-item>
        <el-form-item
            prop="confirm_password"
            class="form_item">
          <el-input
              v-model="monitor_institution.confirm_password"
              placeholder="请确认密码"
              maxlength="18"
              class="input"></el-input>
        </el-form-item>
        <el-upload
            action="#"
            ref="uploadBox_monitor"
            :limit="1"
            :auto-upload="false"
            :http-request="upload">
          <el-button class="choose_file_btn">提交证明材料</el-button>
        </el-upload>
      </el-form>
      <div class="login_btn_box">
        <el-button
            class="reset_btn"
            @click="reset">重置</el-button>
        <el-button
            type="primary"
            class="upload_btn"
            @click="submit(ruleFormRef)">提交</el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref,reactive } from 'vue'
import axios from "axios";
import {ElMessage} from "element-plus";
// const fs = require('fs');
// const path = require('path');
// const crypto = require('crypto');
// const getEtag = require("@/assets/js/qetag")
// const buffer = fs.readFileSync(path.join(__dirname, 'FulXa-5czsCtfGnavTTbwwdyChlc.txt'));
const company_user = ref()
const monitor_institution = ref()
const uploadBox = ref()
const uploadBox_monitor = ref()
let register_type = ref(0)
let counting = ref(false)
let counting_monitor = ref(false)
let ruleFormRef = ref()
let ruleFormRef_monitor = ref()
let get_code_text = ref("获取验证码")
let get_code_text_monitor = ref("获取验证码")
let code_counting = ref(false)
let code_counting_monitor = ref(false)
let enterprise_type = ref(null)
let dialogVisible = ref(false)
const register_company_user = reactive({
  name:"",
  password:"",
  confirm_password:"",
  phone:"",
  v_code:"",
  enterprise_type:0
})
const register_monitor_institution = reactive({
  name:"",
  password:"",
  confirm_password:"",
  phone:"",
  v_code:""
})
const all_enterprise_type = [
  {
    value: 0,
    label: "电网企业"
  },
  {
    value: 1,
    label: "化工生产企业"
  },
  {
    value: 2,
    label: "电解铝生产企业"
  },
  {
    value: 3,
    label: "镁冶炼企业"
  },
  {
    value: 4,
    label: "平板玻璃生产企业"
  },
  {
    value: 5,
    label: "水泥生产企业"
  },
  {
    value: 6,
    label: "陶瓷生产企业"
  },
  {
    value: 7,
    label: "民航企业"
  },
  {
    value: 8,
    label: "钢铁生产企业"
  },
  {
    value: 9,
    label: "发电企业"
  },
  {
    value: 10,
    label: "其它企业"
  }
]

let validateName = (rule, value, callback) => {
  if (!value) {
    return callback(new Error("请输入公司名称!"))
  }
  return callback();
}

const validatePass = (rule, value, callback) => {
  if (value === "") {
    return callback(new Error("请输入密码"));
  }
  // 长度在6-18之间,允许字母数字和下划线
  const passwordRule = /^\w{6,18}$/;
  if (passwordRule.test(value)) {
    return callback();
  } else {
    return callback(
        new Error("密码格式错误:长度6-18之间,允许字母数字和下划线")
    );
  }
};

const validateConfirmPass = (rule, value, callback) => {
  if (register_type.value === 0) {
    if (value !== "" && value === register_company_user.password) {
      return callback()
    }else {
      return callback(new Error("两次密码不相符!"))
    }
  } else {
    if (value !== "" && value === register_monitor_institution.password) {
      return callback()
    }else {
      return callback(new Error("两次密码不相符!"))
    }
  }
}

//邮箱校验方法
const validateEmail = (rule, value, callback) => {
  const emailRule = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+/
  if (value === ""){
    return callback(new Error("请输入邮箱"))
  }else if (emailRule.test(value)){
    return callback()
  }else{
    return callback(new Error("请输入格式正确的邮箱!"))
  }
}

const validatePhone = (rule, value, callback) => {
  const phoneRule = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
  if (value === ""){
    return callback(new Error("请输入邮箱"))
  }else if (phoneRule.test(value)){
    return callback()
  }else{
    return callback(new Error("请输入格式正确的手机号码!"))
  }
}

const validateType = (rule, value, callback) => {
  if (enterprise_type.value === null) {
    return callback(new Error("请选择企业类型!"))
  } else {
    return callback()
  }
}

// 不用el-form对验证码进行校验
const validateCode = (rule, value, callback) => {
  if (value === "") {
    return callback(new Error("请输入联合验证码"));
  }else if(value.length !== 8) {
    return callback(new Error("验证码格式错误:验证码长度为8"));
  }
  const validateRule = /^[0-9a-zA-Z]+$/;
  if (validateRule.test(value)) {
    return callback();
  }else {
    return callback(new Error("验证码格式错误:验证码只包含数字和字母"))
  }
}

const rules = {
  name: [{validator: validateName, trigger: "blur"}],
  password: [{validator: validatePass, trigger: "blur"}],
  confirm_password: [{validator: validateConfirmPass, trigger: "blur"}],
  phone: [{validator: validatePhone, trigger: "blur"}],
  enterprise_type: [{validator: validateType, trigger: "change"}]
}

function change_register_type(type) {
  if (register_type.value !== type) {
    register_type.value = type
  }
}

function sendMessage(formEl) {
  formEl.validate(valid => {
    if (valid) {
      let url = undefined
      if (register_type.value === 0) {
        url = "http://localhost:8080/general/code/phone?phone="+register_company_user.phone
      }else {
        url = "http://localhost:8080/general/code/phone?phone="+register_monitor_institution.phone
      }
      axios
          .get(url)
          .then(resp => {
            if (resp.status === 200) {
              if (resp.data.code === 0) {
                ElMessage({
                  message: " 验 证 码 已 发 送 ",
                  type: 'success',
                  offset: 70
                })
                if (register_type.value === 0) {
                  let count = 60
                  code_counting.value = true
                  let interval = setInterval(() => {
                    if (count !== 0) {
                      get_code_text.value = count + "s后重新发送"
                    } else {
                      get_code_text.value = "获取验证码"
                      code_counting.value = false
                      cancelInterval(interval)
                    }
                    count--
                  }, 1000)
                }else {
                  let count = 60
                  code_counting_monitor.value = true
                  let interval = setInterval(() => {
                    if (count !== 0) {
                      get_code_text_monitor.value = count + "s后重新发送"
                    } else {
                      get_code_text_monitor.value = "获取验证码"
                      code_counting_monitor.value = false
                      cancelInterval(interval)
                    }
                    count--
                  }, 1000)
                }
              }else {
                ElMessage({
                  message: `该 手 机 号 未 被 注 册 !`,
                  type: 'error',
                  offset: 70
                })
              }
            }else {
              ElMessage({
                message: "失 败 , 请 检 查 网 络",
                type: 'error',
                offset: 70
              })
            }
          })
    }
  })
}

const cancelInterval = (interval) => {
  clearInterval(interval)
}

function upload(fileObject) {
  // let file = fileObject.file
  // console.log(file)
  // getEtag(buffer, function (etag) {
  //   console.log(etag);
  // })

  // axios
  //     //TODO 验证手机验证码
  //     .get("")
  //     .then(resp => {
  //       if (resp.status === 200) {
  //         if (resp.data.code === 0) {
  //           let params = new FormData()
  //           let url
  //           if (register_type.value === 0) {
  //             params.append("file",fileObject.file)
  //             params.append("name",register_company_user.name)
  //             params.append("password",register_company_user.password)
  //             params.append("phone",register_company_user.phone)
  //             params.append("enterprise_type",register_company_user.enterprise_type)
  //             params.append("type",register_type.value)
  //             url = "http://localhost:8080/enterprise/info"
  //           }else {
  //             params.append("file",fileObject.file)
  //             params.append("name",register_monitor_institution.name)
  //             params.append("password",register_monitor_institution.password)
  //             params.append("phone",register_monitor_institution.phone)
  //             params.append("type",register_type.value)
  //             url = "http://localhost:8080/enterprise/info"
  //           }
  //           axios({
  //             url:url,
  //             method:"POST",
  //             data:params,
  //             headers:{"Content-Type": "multipart/form-data"}
  //           }).then(resp => {
  //             if (resp.status === 200) {
  //               if (resp.data.code === 0) {
  //                 dialogVisible.value = true
  //               }else {
  //                 ElMessage({
  //                   message: "该 手 机 号 已 被 注 册 !",
  //                   type: 'error',
  //                   offset: 70
  //                 })
  //               }
  //             }else {
  //               ElMessage({
  //                 message: "失 败 , 请 检 查 网 络 !",
  //                 type: 'error',
  //                 offset: 70
  //               })
  //             }
  //           })
  //         }else {
  //           ElMessage({
  //             message: "验 证 码 错 误 !",
  //             type: 'error',
  //             offset: 70
  //           })
  //         }
  //       }
  //     })
}
function submit(formEl) {
  // formEl.validate(valid => {
  //   if (valid) {
  //     if (register_type.value === 0) {
  //       uploadBox.value.submit()
  //     }else {
  //       uploadBox_monitor.value.submit()
  //     }
  //   }
  // })
  uploadBox.value.submit()
}

function reset() {

}
</script>

<style scoped lang="less">
@import '@/assets/css/Register.less';
</style>