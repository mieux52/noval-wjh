<template>
  <!-- 登录页 -->
  <div class="logonView">
    <!-- 顶部导航 -->
    <div class="top">
      <div class="left">
        <router-link to="/" href=""> <i></i> </router-link>
        登录
      </div>
      <!-- 图片 -->
      <div class="topimg" v-if="state.img">
        <div class="lefttext">
          <img :src="state.img.topimg1" alt="" />
        </div>
        <div class="rightimg">
          <img :src="state.img.topimg2" alt="" />
        </div>
      </div>
    </div>

    <!-- 登录功能 -->
    <div class="content">
      <div class="logonbox">
        <!-- 手机和验证码 -->

        <div class="phone">
          <!-- 最大输入个数11 maxlength="11"-->
          <input
            type="text"
            placeholder="请输入手机号"
            maxlength="11"
            v-model="state.phone"
            @blur="addphone"
          />
        </div>
        <div class="code">
          <input
            type="text"
            placeholder="请输入验证码"
            maxlength="4"
            v-model="state.code"
          />
          <div class="getcode" @click="tips" ref="verify">获取验证码</div>
        </div>
        <div :class="state.checked && state.code==state.codeto ?'logonbutton2':'logonbutton'" @click="addlogon">登录</div>
        <!-- 协议条款 -->
        <div class="agreement">
          <span :class="{yes:state.checked}" @click="state.checked = !state.checked"
            >我已阅读并接受<a href="">《用户协议》</a>和<a href=""
              >《隐私协议》</a
            ></span
          >
        </div>
        <!-- 其他登录方式 -->
        <div class="Otherlogin">
          <div class="line">
            <div class="linetext">其他登录方式</div>
          </div>
        </div>
        <!-- 底部 -->
        <div class="footer" v-if="state.img">
          <div class="Otherlogin_img">
            <div class="img">
              <img :src="state.img.qqimgs" alt="" />
            </div>
            <span>QQ登录</span>
          </div>
          <div class="Otherlogin_img">
            <div class="img">
              <img :src="state.img.weiboimgs" alt="" />
            </div>
            <span>微博登录</span>
          </div>
          <div class="Otherlogin_img">
            <div class="img">
              <img :src="state.img.phoneimgs" alt="" />
            </div>
            <span>账号密码登录</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from "vue";
import { Toast } from "vant"
import { getlogon_lists } from "../api/logon.js";
import { useRouter } from 'vue-router';
export default {
  setup() {

    let state = reactive({
      checked:false,// 协议勾选
      img: null, //图片
      phone:null, //存放用户输入的手机号
      code:null,// 验证码
      codeto:0,
    });

     
    let router = useRouter();
    const verify = ref(null) // 获取dom对象
    console.log(verify);
    
    // 验证码  需要获取手机号码才能获取
    let tips =()=>{
      let reg=/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
      if(!reg.test(state.phone)){
        Toast.fail('请输入正确的手机号码！');
      }else{
        let num = Math.floor((Math.random()*10000))
          if(num<=1000){
              tips();
          }else{
            Toast('验证码为：'+num);
            state.codeto = num
          }
          // 定时器 控制获取时间
          console.dir(verify.value.innerHTML);
          let time = 60;
          let loop = setInterval(function(){
            
            if(time<0){
              verify.value.style.pointerEvents = "auto" // 允许点击
              clearInterval(loop)
              verify.value.innerHTML = "获取验证码"
            }else{
              verify.value.style.pointerEvents = "none" // 禁止点击
              verify.value.innerHTML = time+"s"
              time--
            }
          },1000)
          
      }
    }

    // 请求数据
    getlogon_lists().then((data) => {
      state.img = data;
    });


    // 获取用户输入号码
    let addphone = (event) => {
      console.log(event.target.value);
      state.phone = event.target.value
    };
    // 登录
    let addlogon = ()=>{
      let reg=/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
      
      if(!reg.test(state.phone)){
        Toast.fail('请输入正确的手机号码！');
      }else{
        if(state.codeto != state.code){
          Toast.fail('请输入正确的验证码！');
        }else{
          if(state.checked){
              window.localStorage.setItem("userdata",state.phone);
              console.log(router);
              router.push("/user")
          }else{
              Toast.fail('请勾选协议');
          }
        }
      }
      

      
    }

    return {
      // 数据：
      state,
      // 方法：
      addphone, // 获取用户输入号码
      tips,
      verify,
      addlogon,
    };

  },

};
</script>


<style lang="scss" scoped>
@import "../assets/css/mobliebase.css";
.logonView {
  .top {
    padding-left: 16px;
    padding-right: 16px;
    padding-top: 15px;
    box-sizing: border-box;
    background: linear-gradient(127deg, #fffefb 0, #fff5e6 100%);
    height: 175px;
    .left {
      color: #313131;
      font-size: 18px;
      a {
        i {
          background: url(../assets/img/jingling.png) no-repeat;
          background-position: -71px -5px;
          width: 10px;
          height: 20px;
          display: inline-block;
          background-size: 86px;
          position: relative;
          top: 2px;
          margin-right: 12px;
        }
      }
    }
  }
  .topimg {
    padding-top: 15px;
    display: flex;
    padding-left: 25px;
    align-items: center;
    height: 104px;
    .lefttext {
      width: 150px;
      height: 53px;
    }
    .rightimg {
      width: 140px;
      height: 104px;
    }
  }
  .content {
    background-color: #fff;
    padding: 0 25px;
    width: 100%;
    box-sizing: border-box;
    border-top-left-radius: 24px;
    border-top-right-radius: 24px;
    margin-top: -16px;
  }
  .logonbox {
    padding-top: 33px;
    .phone {
      height: 50px;
      border-radius: 25px;
      background-color: #f5f7f9;
      width: 100%;
      input {
        border: none;
        box-sizing: border-box;
        padding: 0 16px;
        outline: 0;
        height: 50px;
        font-size: 17px;
        color: #2e3033;
        width: 100%;
      }
    }
    .code {
      height: 50px;
      border-radius: 25px;
      background-color: #f5f7f9;
      margin-top: 16px;
      margin-bottom: 25px;
      width: 100%;
      display: flex;
      .getcode {
        font-size: 16px;
        color: #38abff;
        width: 30%;
        height: 50px;
        line-height: 50px;
        text-align: right;
      }
      input {
        border: none;
        box-sizing: border-box;
        padding: 0 16px;
        outline: 0;
        height: 50px;
        font-size: 17px;
        color: #2e3033;
        width: 65%;
      }
    }
    .logonbutton {
      color: #5c5f66;
      font-size: 16px;
      text-align: center;
      background: #eff0f2;
      height: 50px;
      border-radius: 25px;
      line-height: 50px;
    }
    
    .logonbutton2 {
      color: #5c5f66;
      font-size: 16px;
      text-align: center;
      background: #ffd338;
      height: 50px;
      border-radius: 25px;
      line-height: 50px;
    }
    .agreement {
      width: 100%;
      text-align: center;
      margin-top: 27px;
      span {
        display: block;
        color: #8a8f99;
        font-size: 13px;
        &::before {
          content: "";
          display: inline-block;
          background: url(../assets/img/login10.png) no-repeat center center;
          background-size: 100%;
          width: 16px;
          height: 16px;
          vertical-align: middle;
          margin-right: 4px;
        }
        a {
          color: #2e3033;
          font-size: 13px;
        }
      }
      .yes {
        &::before {
          background: url(../assets/img/login11.png) no-repeat center center;
          background-size: 100%;
        }
      }
    }
  }
  .Otherlogin {
    .line {
      border-bottom: 1px solid #ccd4e3;
      position: relative;
      margin-top: 54px;
      .linetext {
        font-size: 13px;
        color: #8a8f99;
        transform: translate(-50%, -50%);
        position: absolute;
        left: 50%;
        top: 0;
        background-color: #fff;
      }
    }
  }
  .footer {
    display: flex;
    justify-content: space-between;
    margin-top: 22px;
  }
  .Otherlogin_img {
    display: flex;
    flex-direction: column;
    align-items: center;
    .img {
      width: 46px;
      height: 46px;
      margin-bottom: 8px;
    }
    span {
      color: #5c5f66;
      font-size: 13px;
      text-align: center;
    }
  }
}
</style>