<template>
  <div class="container">
    <div class="left-oauth">
      <p v-if="userData">Bạn đang đăng nhập vào trang web của</p>
      <p>{{ userData ? userData.fullname : '' }}</p>
    </div>
    <div class="vue-tempalte">
      <form @submit.prevent="signIn">
        <h3>Sign In</h3>
        <div class="form-group">
          <label>Email address</label>
          <input
            type="email"
            v-model="email"
            class="form-control form-control-lg"
          />
        </div>
        <div class="form-group">
          <label>Password</label>
          <input
            type="password"
            v-model="password"
            class="form-control form-control-lg"
          />
        </div>
        <button
          @click="signIn"
          type="submit"
          class="btn btn-dark btn-lg btn-block"
        >
          Sign In
        </button>
        <p class="forgot-password text-right mt-2 mb-4">
          <router-link to="/forgot-password">Forgot password ?</router-link>
        </p>
      </form>
    </div>
    <div v-if="isOpenPopup" class="popupAccept">
      <div class="popup-overlay">
        <div class="popup-content">
        <h2>Xin chào {{ userDataLogin ? userDataLogin.fullname : '' }} bạn có muốn ủy quyền cho thông tin cho chúng tôi</h2>
          <p></p>
          <div class="button-group">
            <button @click="acceptOauth">Xác nhận</button>
            <button @click="refuseAccept">Từ chối</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";

const email = ref("");
const password = ref("");
const route = useRoute();
const userData = ref(null);
const userDataLogin = ref(null);
const isOpenPopup = ref(false);

const signIn = async () => {
  try {
    const response = await axios.post("http://localhost:3000/auth/login", {
      email: email.value,
      password: password.value,
    });
    console.log(response.data);
    userDataLogin.value = response.data;
    isOpenPopup.value = true;
  } catch (error) {
    console.error(error);
  }
};

const getUserInfo = async (clientId, scope) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/authorzation/Oauth",
      { client_id: clientId, scope: scope }
    );
    userData.value = response.data.userData;
    console.log(userData.value);
  } catch (error) {
    console.error(error);
  }
};
const refuseAccept = () => {
    isOpenPopup.value = false
}
const acceptOauth = async () => {
  const userid = parseInt(userData.value.id);
    const useridLogin = parseInt(userDataLogin.value.id);
    try {
    const response = await axios.post(
      "http://localhost:3000/authorzation/code",
      { client_id: clientId, user_id: userid, user_id_login:useridLogin }
    );
    window.location.href = response.data;
  } catch (error) {
    console.error(error);
  }
}
const clientId = route.query.client_id;
const scope = route.query.scope;
if (clientId && scope) {
  getUserInfo(clientId, scope);
}
</script>
<style scoped>
.lef-oauth {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.popup-content {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  text-align: center;
}

.button-group {
  margin-top: 20px;
}

.button-group button {
  margin: 0 10px;
  padding: 8px 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: #007bff;
  color: white;
}

.button-group button:hover {
  background-color: #0056b3;
}
</style>
