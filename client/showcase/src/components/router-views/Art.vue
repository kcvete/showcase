<template>
<div class="container">
    <h1>Submit art</h1>
    <div class="p-col-12 p-md-4">
				<p v-show="titleReq" style="color:red">Title is required</p>
        <div class="p-inputgroup" style="margin:5px;">
        <span class="p-inputgroup-addon">
            <i class="pi pi-user"></i>
        </span>
        <InputText type="text" placeholder="title" v-model="title" />
        </div>
				<p v-show="imageUrlReq" style="color:red">Image url is required</p>
        <div class="p-inputgroup" style="margin:5px;">
        <span class="p-inputgroup-addon">
        <i class="pi pi-link"></i>
        </span>
        <InputText type="text" placeholder="art image url" v-model="imageUrl" />
        </div>
        <div class="p-inputgroup" style="margin:5px;">
        <span class="p-inputgroup-addon">
            <i class="pi pi-envelope"></i>
        </span>
        <Textarea type="text" placeholder="description" v-model="description" />
        </div>
        <Button icon="pi pi-check" label="Submit" @click="submit" />
    </div>
</div>
</template>
<script>
import axios from 'axios'
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Textarea from 'primevue/textarea'

  export default {
    name: 'Register',
    components: {
        InputText,
        Button,
				Textarea
    },
			data() {
				return {
					titleReq: false,
					descriptionReq: false,
					imageUrlReq: false,
					}
		},
			methods: {
				submit () {
					if(!this.title) {
						this.titleReq = true
						return
					} else {
						this.titleReq = false
					}
					if(!this.description) {
						this.descriptionReq = true
						return
					} else {
						this.descriptionReq = false
					}
					if(!this.imageUrl) {
						this.imageUrlReq = true
						return
					} else {
						this.imageUrlReq = false
					}
					const errorMsg = () => this.$toast.add({severity:'error', summary: 'Art was submited unsuccesfuly', life: 3000});
					const succMsg = () => this.$toast.add({severity:'success', summary: 'Art was submited succesfuly', life: 3000});
					const goTo = () => this.$router.push("/");
					const art = {
						title: this.title,
						description: this.description,
						imageUrl: this.imageUrl,
						userID: localStorage._id
					}
					axios.post('http://localhost:5000/api/arts', art, {headers: {authorization: "Token "+localStorage.token}})
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
