<script>
import { ref } from 'vue';
// icons
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons-vue';
import { useAuthStore } from '@/stores/auth';
import { Form } from 'vee-validate';
import AuthApi from '@/services/auth';

const checkbox = ref(false);
const valid = ref(false);
const show1 = ref(false);
const passwordRules = ref([
  (v) => !!v || 'Password is required',
  (v) => (v && v.length <= 10) || 'Password must be less than 10 characters'
]);
const emailRules = ref([(v) => !!v || 'E-mail is required', (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid']);

function validate(values, { setErrors }) {
  useAuthStore();
}

export default {
  components: {
    EyeInvisibleOutlined,
    EyeOutlined,
    Form
  },
  setup() {
    return {
      checkbox,
      valid,
      show1,
      passwordRules,
      emailRules,
      validate
    };
  },

  data() {
    return {
      email: '',
      password: '',
      checkbox: false,
      show_password: false,
      alert: false,
      alertType: '',
      alertData: null,
      isSubmitting: false,
      valid: false,
      emailRules: [(v) => !!v || 'Email is required', (v) => /.+@.+/.test(v) || 'Email must be valid'],
      passwordRules: [(v) => !!v || 'Password is required', (v) => v.length >= 6 || 'Password must be at least 6 characters']
    };
  },

  created() {
    document.title = 'Bookings - Sign In';
  },
  methods: {
    login() {
      this.isSubmitting = true;
      this.valid = true;

      let data = {
        email: this.email,
        password: this.password
      };

      let auth = new AuthApi();
      auth
        .login(data)
        .then((response) => {
          if (response.data.success) {
            localStorage.setItem('access_token', response.data.token.access_token);
            this.$router.push('/dashboard');
          }
          this.isSubmitting = false;
        })
        .catch((error) => {
          this.valid = false;
          this.isSubmitting = false;
          this.alertData = error.response.data.message;
          this.alertType = 'error';
          this.alert = true;

          setTimeout(() => {
            this.alert = false;
          }, 5000);
        });
    },
    forgotPassword() {
      this.$router.push('/forgot-password');
    }
  }
};
</script>

<template>
  <div>
    <div class="d-flex justify-space-between align-center">
      <h3 class="text-h3 text-center mb-0">Login</h3>
      <router-link to="/auth/register" class="text-primary text-decoration-none">Don't Have an account?</router-link>
    </div>
    <Form @submit="validate" class="mt-7 loginForm" v-slot="{ errors, isSubmitting }">
      <div class="mb-6">
        <v-label>Email Address</v-label>
        <v-text-field
          aria-label="email address"
          v-model="email"
          :rules="emailRules"
          class="mt-2"
          required
          hide-details="auto"
          variant="outlined"
          color="primary"
        ></v-text-field>
      </div>
      <div>
        <v-label>Password</v-label>
        <v-text-field
          aria-label="password"
          v-model="password"
          :rules="passwordRules"
          required
          variant="outlined"
          color="primary"
          hide-details="auto"
          :type="show1 ? 'text' : 'password'"
          class="mt-2"
        >
          <template v-slot:append-inner>
            <v-btn color="secondary" icon rounded variant="text">
              <EyeInvisibleOutlined :style="{ color: 'rgb(var(--v-theme-secondary))' }" v-if="show1 == false" @click="show1 = !show1" />
              <EyeOutlined :style="{ color: 'rgb(var(--v-theme-secondary))' }" v-if="show1 == true" @click="show1 = !show1" />
            </v-btn>
          </template>
        </v-text-field>
      </div>

      <div class="d-flex align-center mt-4 mb-7 mb-sm-0">
        <v-checkbox
          v-model="checkbox"
          :rules="[(v: any) => !!v || 'You must agree to continue!']"
          label="Keep me sign in"
          required
          color="primary"
          class="ms-n2"
          hide-details
        ></v-checkbox>
        <div class="ml-auto">
          <router-link to="/auth/login" class="text-darkText link-hover">Forgot Password?</router-link>
        </div>
      </div>
      <v-btn
        color="primary"
        :loading="isSubmitting"
        block
        class="mt-5"
        variant="flat"
        size="large"
        :disabled="valid"
        @click="login"
        type="submit"
      >
        Login</v-btn
      >
      <div class="mt-2">
        <v-alert v-if="alert" closable :type="alertType" class="custom-alert">
          {{ alertData }}
        </v-alert>
      </div>
    </Form>
  </div>
</template>
<style lang="scss">
.loginForm {
  .v-text-field .v-field--active input {
    font-weight: 500;
  }
}
</style>
