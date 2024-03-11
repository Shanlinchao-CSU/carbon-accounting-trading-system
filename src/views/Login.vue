<template>
  <div class="background_box">
    <div class="login_image_box">
      <el-text class="title">CNTS碳核算交易系统</el-text>
      <el-image
          class="login_image"
          :src="require('@/assets/images/login/login_pic.png')"
          :fit="'cover'"></el-image>
      <el-text class="slogan">区块链赋能绿色转型</el-text>
    </div>
    <div class="login_box">
      <Transition :name="transition_name" mode="out-in">
        <el-text class="title" v-if="login_method === 0">账户ID登录</el-text>
        <el-text class="title" v-else-if="login_method === 1">邮箱登录</el-text>
        <el-text class="title" v-else>手机号登录</el-text>
      </Transition>
      <el-form
          ref="ruleFormRef"
          :model="ruleForm"
          :rules="rules"
          class="form"
          :size="formSize"
          status-icon>
        <Transition :name="transition_name" mode="out-in">
          <div class="ID_login_box" v-if="login_method===0">
            <el-form-item
                prop="username"
                class="form_item">
              <el-input
                  v-model="ruleForm.username"
                  placeholder="请输入账户ID/手机号码/邮箱"
                  maxlength="16"
                  :prefix-icon="User"
                  class="input"/>
            </el-form-item>
            <el-form-item
                prop="password"
                class="form_item">
              <el-input
                  v-model="ruleForm.password"
                  placeholder="请输入密码"
                  maxlength="18"
                  :prefix-icon="Lock"
                  show-password
                  class="input"/>
            </el-form-item>
            <el-form-item
                prop="verification_code"
                class="form_item">
              <el-input
                  v-model="ruleForm.verification_code"
                  placeholder="请输入验证码"
                  maxlength="4"
                  class="input"/>
              <div class="code_box" id="code_box">
                <VerificationCode
                    :contentWidth=196
                    :contentHeight=70
                    ref="vCode" />
              </div>
            </el-form-item>
          </div>
          <div class="email_login_box" v-else-if="login_method===1">
            <el-form-item
                prop="email"
                class="form_item">
              <el-input
                  v-model="ruleForm.email"
                  placeholder="请输入邮箱"
                  maxlength="26"
                  class="input"/>
            </el-form-item>
            <el-form-item
                prop="email_code"
                class="form_item">
              <el-input
                  v-model="ruleForm.email_code"
                  placeholder="请输入验证码"
                  maxlength="4"
                  class="input"/>
              <el-button
                  class="get_code_btn"
                  @click="sendMessage(ruleFormRef)"
                  :disabled="email_counting">
                {{get_email_code_text}}
              </el-button>
            </el-form-item>
          </div>
          <div class="phone_login_box" v-else-if="login_method===2">
            <el-form-item
                prop="phone"
                class="form_item">
              <el-input
                  v-model="ruleForm.phone"
                  placeholder="请输入手机号码"
                  maxlength="11"
                  class="input"/>
            </el-form-item>
            <el-form-item
                prop="phone_code"
                class="form_item">
              <el-input
                  v-model="ruleForm.phone_code"
                  placeholder="请输入验证码"
                  maxlength="4"
                  class="input"/>
              <el-button
                  class="get_code_btn"
                  @click="sendMessage(ruleFormRef)"
                  :disabled="phone_counting">
                {{get_phone_code_text}}
              </el-button>
            </el-form-item>
          </div>
        </Transition>
      </el-form>
      <el-text class="go_login" @click="openLogin">立即注册</el-text>
      <div class="button_box">
        <el-button
            type="primary"
            class="button"
            @click="submitForm(ruleFormRef)">
          登录
        </el-button>
        <el-button
            class="button"
            @click="reset">
          重置
        </el-button>
      </div>
      <el-divider>其它登录方式</el-divider>
      <div class="other_method_box">
        <div class="method_box"
             v-if="login_method!==0"
             @click="setLoginMethod(0)">
          <el-image :src="require('@/assets/images/login/id.png')" style="height: 50px; width: auto"></el-image>
          <el-text class="method_text">账户ID登录</el-text>
        </div>
        <div class="method_box"
             v-if="login_method!==1"
             @click="setLoginMethod(1)">
          <el-image :src="require('@/assets/images/login/email.png')" style="height: 50px; width: auto"></el-image>
          <el-text class="method_text">邮箱登录</el-text>
        </div>
        <div class="method_box"
             v-if="login_method!==2"
             @click="setLoginMethod(2)">
          <el-image :src="require('@/assets/images/login/phone.png')" style="height: 50px; width: auto"></el-image>
          <el-text class="method_text">手机号登录</el-text>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import VerificationCode from "@/components/common/VerificationCode.vue";
import {computed, onMounted, reactive, ref} from 'vue';
import { User,Lock } from "@element-plus/icons-vue";
import type { FormInstance, FormRules } from "element-plus";
import { ElMessage } from "element-plus";
import axios from 'axios';
import { useRouter } from "vue-router";

// vue router初始化
const router = useRouter()
// 验证码长宽
const code_size = ref({
  width:0,
  height:0
})

// 输入检查接口
interface RuleForm {
  username: string
  password: string
  verification_code: string
  email: string
  email_code: string
  phone: string
  phone_code: string
}

const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive({
  username: '',
  password: '',
  verification_code: '',
  email: '',
  email_code: '',
  phone: '',
  phone_code: ''
})
const vCode = ref<InstanceType<typeof VerificationCode>>() //验证码组件的ref
const login_method = ref(0)
const get_email_code_text = ref("获取验证码")
const get_phone_code_text = ref("获取验证码")
let email_counting = ref(false) //邮箱登录发送验证码状态
let phone_counting = ref(false)
let transition_name = ref("left")
let path = undefined

// 用户名的校验方法
const validateName = (rule: any, value: any, callback: any) => {
  if (!value) {
    return callback(new Error("请输入账户ID/手机号码/邮箱"));
  }
  return callback();
};
// 密码的校验方法
const validatePass = (rule:any, value:any, callback:any) => {
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
// 验证码的校验方法
const validateCode = (rule:any, value:any, callback:any) => {
  if (value === "") {
    return callback(new Error("请输入验证码"));
  }else if(value.length != 4) {
    return callback(new Error("验证码格式错误:验证码长度为4"));
  }
  const validateRule = /^[0-9a-zA-Z]+$/;
  if (validateRule.test(value)) {
    return callback();
  }else {
    return callback(new Error("验证码格式错误:验证码只包含数字和字母"))
  }
}

//邮箱校验方法
const validateEmail = (rule:any, value:any, callback:any) => {
  const emailRule = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+/
  if (value === ""){
    return callback(new Error("请输入邮箱"))
  }else if (emailRule.test(value)){
    return callback()
  }else{
    return callback(new Error("请输入格式正确的邮箱!"))
  }
}

//手机号校验方法
const validatePhone = (rule:any, value:any, callback:any) => {
  const phoneRule = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
  if (value === ""){
    return callback(new Error("请输入手机号码"))
  }else if (phoneRule.test(value)){
    return callback()
  }else{
    return callback(new Error("请输入格式正确的手机号码!"))
  }
}

let rules = reactive<FormRules<typeof ruleForm>>({
  username: [{ validator: validateName, trigger: 'blur' }],
  password: [{ validator: validatePass, trigger: 'blur' }],
  email: [{ validator: validateEmail, trigger: 'blur' }],
  phone: [{ validator: validatePhone, trigger: 'blur' }]
})

const submitForm = (formEl: FormInstance) => {
  formEl.validate((valid) => {
    if (valid) {
      let url = undefined
      if (login_method.value === 0) {
        if (vCode.value!["code"] == ruleForm.verification_code){
          url="http://localhost:8080/general/id?id="+ruleForm.username+"&password="+ruleForm.password
        }else{
          ElMessage({
            message: " 验 证 码 错 误 ! ",
            type: 'error',
            offset: 70
          })
          vCode.value?.refresh()
          ruleForm.verification_code = ''
        }
      }else if (login_method.value === 1) {
        //TODO 验证手机验证码
        axios
            .get("")
            .then(resp=>{
              if (resp.status === 200) {

              }
            })
      }else {

      }
    }
  })
}

const reset = () => {
  ruleForm.username = ''
  ruleForm.password = ''
  ruleForm.verification_code = ''
  ruleForm.email = ''
  ruleForm.email_code = ''
  ruleForm.phone = ''
  ruleForm.phone_code = ''
}

const setLoginMethod = (type : number) => {
  // 切换动画效果判断
  if (login_method.value === 0) {
    if (type === 1) {
      transition_name.value = "left"
    }else {
      transition_name.value = "right"
    }
  }else if (login_method.value === 1) {
    if (type === 0) {
      transition_name.value = "left"
    }else {
      transition_name.value = "right"
    }
  }else {
    if (type === 0) {
      transition_name.value = "left"
    }else {
      transition_name.value = "right"
    }
  }
  login_method.value = type
}

const sendMessage = (formEl: FormInstance) => {
  formEl.validate((valid) => {
    if (valid) {
      let url = undefined
      if (login_method.value === 1) {
        url = "http://localhost:8080/general/code/email?email="+ruleForm.email
      }else {
        url = "http://localhost:8080/general/code/phone?phone="+ruleForm.phone
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
                if (login_method.value === 1) {
                  let count = 60
                  email_counting.value = true
                  let interval = setInterval(() => {
                    if (count != 0) {
                      get_email_code_text.value = count + "s后重新发送"
                    } else {
                      get_email_code_text.value = "获取验证码"
                      email_counting.value = false
                      cancelInterval(interval)
                    }
                    count--
                  }, 1000)
                }else {
                  let count = 60
                  phone_counting.value = true
                  let interval = setInterval(() => {
                    if (count != 0) {
                      get_phone_code_text.value = count + "s后重新发送"
                    } else {
                      get_phone_code_text.value = "获取验证码"
                      phone_counting.value = false
                      cancelInterval(interval)
                    }
                    count--
                  }, 1000)
                }
              }else {
                ElMessage({
                  message: `该${login_method.value===1?" 邮 箱 ":" 手 机 号 "}未 被 注 册 !`,
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

const cancelInterval = (interval: any) => {
  clearInterval(interval)
}

const openLogin = () => {
  let url = router.resolve({
    path: "/register"
  })
  window.open(url.href,"_blank")
}
const jump = (type: string) => {
  switch (type) {
      //用户
    case '1':
      path = ""
      break
      //第三方
    case '2':
      path = ""
      break
      //数据审核员
    case '3':
      path = "/auditing"
      break
    case '4':
      path = ""
      break
  }
  router.push({path: "/auditing"})
}
</script>

<style scoped lang="less">
@import '@/assets/css/Login.less';
</style>