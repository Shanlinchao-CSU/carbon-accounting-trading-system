<template>
  <div class="login_box">
    <el-text class="title">登 录 系 统</el-text>
    <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
        class="form"
        :size="formSize"
        status-icon>
      <el-form-item
          prop="username"
          class="form_item">
        <el-input
            v-model="ruleForm.username"
            placeholder="请输入用户名"
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
    </el-form>
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

  </div>
</template>

<script setup lang="ts">
import VerificationCode from "@/components/common/VerificationCode.vue";
import {onMounted, reactive, ref} from 'vue'
import { User,Lock } from "@element-plus/icons-vue";
import type { FormInstance, FormRules } from "element-plus";
import $ from 'jquery';

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
}

const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive({
  username: '',
  password: '',
  verification_code: ''
})

// 用户名的校验方法
const validateName = (rule: any, value: any, callback: any) => {
  if (!value) {
    return callback(new Error("请输入用户名"));
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
        new Error("长度6-18之间,允许字母数字和下划线")
    );
  }
};
// 验证码的校验方法
const validateCode = (rule:any, value:any, callback:any) => {
  if (value === "") {
    return callback(new Error("请输入验证码"));
  }else if(value.length != 4) {
    return callback(new Error("验证码长度为4"));
  }
  const validateRule = /^[0-9a-zA-Z]+$/;
  if (validateRule.test(value)) {
    return callback();
  }else {
    return callback(new Error("验证码只包含数字和字母"))
  }
}

const rules = reactive<FormRules<typeof ruleForm>>({
  username: [{ validator: validateName, trigger: 'blur' }],
  password: [{ validator: validatePass, trigger: 'blur' }],
  verification_code: [{ validator: validateCode, trigger: 'blur' }]
})

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      //TODO 登录逻辑
    }
  })
}

const reset = () => {

}

const vCode = ref(null)

onMounted(() => {
  console.log(vCode!.value!["code"])
});
</script>

<style scoped lang="less">
@import '@/assets/css/Login.less';
</style>