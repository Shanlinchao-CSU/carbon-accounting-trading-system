<template>
  <div class="background_box">
    <bg/>
    <el-dialog
        v-model="dialogVisible"
        title="提交成功!"
        width="500"
    >
      <span>审核后会通过邮件告知结果,请留意!</span>
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
              placeholder="请输入公司邮箱"
              maxlength="26"
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
        <el-upload
            action="#"
            ref="uploadBox"
            :limit="1"
            :auto-upload="false"
            :http-request="upload"
            :on-success="handle_upload_success">
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
              placeholder="请输入机构邮箱"
              maxlength="26"
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
            :http-request="upload"
            :on-success="handle_upload_success">
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
import bg from "@/components/bg/defaultBg.vue"; // 引入home组件
import $target from "@/main";

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
let enterprise_type = ref(null)
let dialogVisible = ref(false)
let register_company_user = reactive({
  name:"",
  password:"",
  confirm_password:"",
  phone:"",
  v_code:"",
  enterprise_type:0,
  public_key:""
})
let register_monitor_institution = reactive({
  name:"",
  password:"",
  confirm_password:"",
  phone:"",
  v_code:""
})
const all_enterprise_type = [
  {
    value: 0,
    label: "发电企业"
  },
  {
    value: 1,
    label: "电网企业"
  },
  {
    value: 2,
    label: "钢铁生产企业"
  },
  {
    value: 3,
    label: "化工生产企业"
  },
  {
    value: 4,
    label: "电解铝生产企业"
  },
  {
    value: 5,
    label: "镁冶炼企业"
  },
  {
    value: 6,
    label: "平板玻璃生产企业"
  },
  {
    value: 7,
    label: "水泥生产企业"
  },
  {
    value: 8,
    label: "陶瓷生产企业"
  },
  {
    value: 9,
    label: "民航企业"
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
    return callback(new Error("请输入手机号码"))
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

const validateKey = (rule, value, callback) => {
  if (value === "") {
    return callback(new Error("请输入以太坊账户公钥"))
  }else {
    return callback()
  }
}

const rules = {
  name: [{validator: validateName, trigger: "blur"}],
  password: [{validator: validatePass, trigger: "blur"}],
  confirm_password: [{validator: validateConfirmPass, trigger: "blur"}],
  email: [{validator: validateEmail, trigger: "blur"}],
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
        url = `${$target.$target}/general/verify/email?email=`+register_company_user.phone+"&token="+localStorage.getItem("token")
      }else {
        url = `${$target.$target}/general/verify/email?email=`+register_monitor_institution.phone+"&token="+localStorage.getItem("token")
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
                  counting.value = true
                  let interval = setInterval(() => {
                    if (count !== 0) {
                      get_code_text.value = count + "s后重新发送"
                    } else {
                      get_code_text.value = "获取验证码"
                      counting.value = false
                      cancelInterval(interval)
                    }
                    count--
                  }, 1000)
                }else {
                  let count = 60
                  counting_monitor.value = true
                  let interval = setInterval(() => {
                    if (count !== 0) {
                      get_code_text_monitor.value = count + "s后重新发送"
                    } else {
                      get_code_text_monitor.value = "获取验证码"
                      counting_monitor.value = false
                      cancelInterval(interval)
                    }
                    count--
                  }, 1000)
                }
              }else if (resp.data.code === 1) {
                ElMessage({
                  message: `该 邮 箱 已 被 注 册 !`,
                  type: 'error',
                  offset: 70
                })
              }else if (resp.data.code === -1) {
                ElMessage({
                  message: `无 效 请 求 !`,
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

async function upload(fileObject) {
  let params = new FormData()
  let url
  if (register_type.value === 0) {
    window.ethereum.request({ method: 'eth_requestAccounts' })
        .then(async accounts => {
          let message = "Confirmation will bind your account to your account on this website, and your public key will be stored in our database for future transactions"
          register_company_user.public_key = accounts[0]
          let signature
          try {
            signature = await window.ethereum.request({
              method: 'personal_sign',
              params: [message, register_company_user.public_key]
            });
            console.log(register_company_user.public_key)
            params.append("file",fileObject.file)
            params.append("name",register_company_user.name)
            params.append("password",register_company_user.password)
            params.append("phone",register_company_user.phone)
            params.append("enterprise_type",register_company_user.enterprise_type)
            params.append("type","1")
            params.append("code",register_company_user.v_code)
            params.append("signature",signature)
            params.append("message",message)
            params.append("address",register_company_user.public_key)
            params.append("public_key",register_company_user.public_key)
            url = `${$target.$target}/enterprise/info`
            axios({
              url:url,
              method:"POST",
              data:params,
              headers:{"Content-Type": "multipart/form-data"}
            }).then(resp => {
              if (resp.status === 200) {
                if (resp.data.code === 0) {
                  dialogVisible.value = true
                }else if (resp.data.code === 1) {
                  ElMessage({
                    message: "验 证 码 错 误 !",
                    type: 'error',
                    offset: 70
                  })
                }else if (resp.data.code === 2) {
                  ElMessage({
                    message: "文 件 已 被 使 用 !",
                    type: 'error',
                    offset: 70
                  })
                }else if (resp.data.code === 3) {
                  ElMessage({
                    message: "签 名 验 证 不 通 过 !",
                    type: 'error',
                    offset: 70
                  })
                }
              }else {
                ElMessage({
                  message: "失 败 , 请 检 查 网 络 !",
                  type: 'error',
                  offset: 70
                })
              }
            })
          }catch (error) {
            ElMessage({
              message: "签名出现错误,请正确安装MetaMask并登录输入公钥对应的以太坊账户",
              type: 'error',
              offset: 70
            })
            return 1
          }
        })
  }else {
    params.append("file",fileObject.file)
    params.append("name",register_monitor_institution.name)
    params.append("password",register_monitor_institution.password)
    params.append("phone",register_monitor_institution.phone)
    params.append("type","2")
    params.append("code",register_monitor_institution.v_code)
    url = `${$target.$target}/thirdParty/info`
    axios({
      url:url,
      method:"POST",
      data:params,
      headers:{"Content-Type": "multipart/form-data"}
    }).then(resp => {
      if (resp.status === 200) {
        if (resp.data.code === 0) {
          dialogVisible.value = true
        }else if (resp.data.code === 1) {
          ElMessage({
            message: "验 证 码 错 误 !",
            type: 'error',
            offset: 70
          })
        }else if (resp.data.code === 2) {
          ElMessage({
            message: "文 件 已 被 使 用 !",
            type: 'error',
            offset: 70
          })
        }else if (resp.data.code === 3) {
          ElMessage({
            message: "签 名 验 证 不 通 过 !",
            type: 'error',
            offset: 70
          })
        }
      }else {
        ElMessage({
          message: "失 败 , 请 检 查 网 络 !",
          type: 'error',
          offset: 70
        })
      }
    })
  }
}

function handle_upload_success() {
  if (register_type.value === 0) {
    uploadBox.value.clearFiles()
  }else {
    uploadBox_monitor.value.clearFiles()
  }
}
function submit(formEl) {
  formEl.validate(async valid => {
    if (valid) {
      if (register_type.value === 0) {
        uploadBox.value.submit()
      } else {
        uploadBox_monitor.value.submit()
      }
    }
  })
}

async function signature() {
  const message = "Confirmation will bind your account to your account on this website, and your public key will be stored in our database for future transactions";
  try {
    const account = register_company_user.public_key
    const signature = await window.ethereum.request({
      method: 'personal_sign',
      params: [message, account]
    });
    const address = await window.ethereum.request({method: 'eth_accounts'});
    const response = await fetch(`${$target.$target}/general/signature`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json;charset=utf-8"
      },
      body: JSON.stringify({
        signature: signature.toString(),
        message: message.toString(),
        address: address.toString(),
      })
    }).then(response => response.json())
        .then(data => {
          if (data.data) {
            return 0
          } else {
            return 1
          }
        })
  } catch (error) {
    alert('签名过程出现错误，请检查您的 MetaMask 插件是否正确安装和配置。')
    return 2
  }
}

function reset() {
  if (register_type.value === 0) {
    register_company_user = reactive({
      name:"",
      password:"",
      confirm_password:"",
      phone:"",
      v_code:"",
      enterprise_type:0
    })
  }else {
    register_monitor_institution = reactive({
      name:"",
      password:"",
      confirm_password:"",
      phone:"",
      v_code:""
    })
  }
}
</script>

<style scoped lang="less">
@import '@/assets/css/Register.less';
</style>