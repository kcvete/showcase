<template>
<div class="container">
    <h1>Login</h1>
    <div class="p-col-12 p-md-4">
        <div class="p-inputgroup" style="margin:5px;">
        <span class="p-inputgroup-addon">
            <i class="pi pi-envelope"></i>
        </span>
        <InputText type="text" placeholder="email" v-model="email" />
        </div>
        <div class="p-inputgroup" style="margin:5px;">
        <span class="p-inputgroup-addon">
            <i class="pi pi-lock"></i>
        </span>
        <Password placeholder="password" v-model="password" />
        </div>
        <Button icon="pi pi-check" label="Submit" @click="login" />
    </div>
</div>
</template>
<script>
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Button from 'primevue/button';
import axios from 'axios'


  export default {
    name: 'Login',
    components: {
        InputText,
        Password,
        Button,
    },
        methods: {
					login () {
					const errorMsg = () => this.$toast.add({severity:'error', summary: 'Login was unsuccesful', life: 3000});
					const succMsg = () => this.$toast.add({severity:'success', summary: 'Login was succesful', life: 3000});
					const goTo = () => this.$router.push("/");
						const user = {
							email: this.email,
							password: this.password
						}
					axios.post('http://localhost:5000/api/users/login', {user})
						.then(function (response) {
							localStorage.token = response.data.user.token;
							localStorage._id = response.data.user._id;
							localStorage.email = response.data.user.email;
							succMsg()
							goTo();
						})
						.catch(function (error) {
							errorMsg()
							console.log(error);
						});
					}
        }
  }
</script>

<style scoped>

.container {
  display: flex; /* or inline-flex */
	flex-direction: column;
	flex-wrap: wrap;
    align-items: center;
    justify-content: center
}

</style>
