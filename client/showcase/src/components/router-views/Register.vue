<template>
<div class="container">
    <h1>Register</h1>
    <div class="p-col-12 p-md-4">
				<p v-show="nameReq" style="color:red">Fields first name and last name are required</p>
        <div class="p-inputgroup" style="margin:5px;">
        <span class="p-inputgroup-addon">
            <i class="pi pi-user"></i>
        </span>
        <InputText type="text" placeholder="first name" v-model="firstName" />
        <InputText type="text" placeholder="last name" v-model="lastName" />
        </div>
        <div class="p-inputgroup" style="margin:5px;">
        <span class="p-inputgroup-addon">
        <i class="pi pi-link"></i>
        </span>
        <InputText type="text" placeholder="profile image url" v-model="imageUrl" />
        </div>
				<p v-show="emailReq" style="color:red">Email is required</p>
        <div class="p-inputgroup" style="margin:5px;">
        <span class="p-inputgroup-addon">
            <i class="pi pi-envelope"></i>
        </span>
        <InputText type="text" placeholder="email" v-model="email" />
        </div>
				<p v-show="passwordReq" style="color:red">Password is required</p>
        <div class="p-inputgroup" style="margin:5px;">
        <span class="p-inputgroup-addon">
            <i class="pi pi-lock"></i>
        </span>
        <Password placeholder="password" v-model="password" />
        </div>
        <Button icon="pi pi-check" label="Submit" @click="register" />
    </div>
</div>
</template>
<script>
import axios from 'axios'
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Button from 'primevue/button';

  export default {
    name: 'Register',
    components: {
        InputText,
        Password,
        Button,
    },
			data() {
				return {
					nameReq: false,
					emailReq: false,
					passwordReq: false,
					}
		},
			methods: {
				register () {
					if(!this.firstName || !this.lastName) {
						this.nameReq = true
						return
					} else {
						this.nameReq = false
					}
					if(!this.email) {
						this.emailReq = true
						return
					} else {
						this.emailReq = false
					}
					if(!this.password) {
						this.passwordReq = true
						return
					} else {
						this.passwordReq = false
					}
					const errorMsg = () => this.$toast.add({severity:'error', summary: 'Registration was unsuccesful', life: 3000});
					const succMsg = () => this.$toast.add({severity:'success', summary: 'Registration was succesful', life: 3000});
					const goTo = () => this.$router.push("/");
					const user = {
						firstName: this.firstName,
						lastName: this.lastName,
						password: this.password,
						email: this.email,
						imageUrl: this.imageUrl
					}
					axios.post('http://localhost:5000/api/users', {user})
					.then(function (response) {
						console.log('response: ', response);
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

<style>

.container {
  display: flex; /* or inline-flex */
	flex-direction: column;
	flex-wrap: wrap;
    align-items: center;
    justify-content: center
}

</style>