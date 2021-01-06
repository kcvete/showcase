<template>
	<div class="body">
			<Button v-if="isLogged" @click="logout" label="logut" class="p-button-danger" style="position: absolute; top: 5px; right: 5px;"/>
			<Card v-if="!isLogged" v-show="isReady" style="position:relative;">
					<template #header>
							<Button @click="isReady=false" icon="pi pi-times" class="p-button-rounded p-button-danger" style="position: absolute; top: 5px; right: 5px;"/>
							<img alt="user header" src="https://cdn2.f-cdn.com/contestentries/1262273/26237065/5a8d53d99fc82_thumb900.jpg">
					</template>
					<template #title>
						Are you an artist? Sign in or register today to display your art for millions to see.
					</template>
					<template #content>
							<Button label="Login"  @click="this.$router.push('/login')"/>
							<Button label="Register" @click="this.$router.push('/register')" class="p-button-secondary" style="margin-left: .5em" />
					</template>
			</Card>
				<h1 v-if="isLogged">Welcome {{email}}</h1>
				<h1 v-if="!isLogged">Artist</h1>
			<div v-if="!isLogged" class="flex-grid">
			<UserRound @clicked="onClickChild" class="flex-grid-item"
				v-for="artist in artists"
				:imageUrl="artist.imageUrl || 'https://www.seekpng.com/png/detail/847-8474751_download-empty-profile.png'"
				:key="artist.firstName"
				:name="artist.firstName+' '+artist.lastName"
				:id="artist._id"
				:clicked="artist._id === clickedId"
				>
				</UserRound>
		</div>
		<h1><span v-if="isLogged">Manage your </span>Art</h1>
		<div class="flex-container">
			<Card v-if="isLogged" style="width:20em;margin:5px">
					<template #header>
							<img alt="user header" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHksk3yaps9IE9_Fpik1f71FcBkklP_kzzNA&usqp=CAU">
					</template>
					<template #title>
						<Button label="Add new art"  @click="this.$router.push('/art')"/>
					</template>
			</Card>
			<Card v-for="art in arts" :key="art.title" style="width:20em;margin:5px">
					<template #header>
							<img alt="user header" style="height:250px;" :src="art.imageUrl">
					</template>
					<template #title>
							{{art.title}}
					</template>
					<template subtitle>
						{{art.subtitle}}
					</template>
					<template #content>
							<p>{{art.content}}</p>
					</template>
					<template v-if="isLogged" #footer>
							<Button icon="pi pi-check" @click="del(art._id)" class="p-button-danger" label="Delete" />
					</template>
			</Card>
		</div>
	</div>
</template>

<script>
import axios from 'axios'
import Card from 'primevue/card';
import Button from 'primevue/button';
import UserRound from './../UserRound.vue'


export default {
  name: 'MainView',
  components: {
    Card,
		Button,
		UserRound
  },
	data() {
		return {
			isReady: true,
			isLogged: false,
			email: "",
			id: "",
			arts: [
			],
			artists: [
			],
			clickedId: ""
		}
	},
	methods: {
		del (id) {
				const errorMsg = () => this.$toast.add({severity:'error', summary: 'Couldnt delete art', life: 3000});
				const succMsg = () => this.$toast.add({severity:'success', summary: 'Deleted art', life: 3000});
				const goTo = () => this.$router.push("/");
				axios.delete('http://localhost:5000/api/arts/'+id, {headers: {authorization: "Token "+localStorage.token}})
				.then((response) => {
					succMsg()
					goTo()
					console.log('response: ', response);
				})
				.catch(function (error) {
					errorMsg()
					console.log('error: ', error);
				});
		},
		logout () {
			this.isLogged = false;
			localStorage.removeItem('token');
			localStorage.removeItem('email');
			localStorage.removeItem('id');
			this.email = "";
			this.id = "";
		},
		hide () {
			this.isReady=false
		},
		onClickChild (value) {
			this.clickedId = value; // someValue
			axios.get('http://localhost:5000/api/arts/user/'+value)
				.then((response) => {
					this.arts = response.data.length > 0  ? response.data : []
				})
				.catch(function (error) {
					console.log('error: ', error);
				});
		}
	},
	created () { /* Options API */
			if(localStorage.token) {
				this.id=localStorage._id
				this.isLogged = true;
				this.email = localStorage.email;
				}
			else { 
				this.isLogged = false; 
				}
			const id = this.isLogged ? "user/"+this.id : ""
			axios.get('http://localhost:5000/api/arts/'+id)
				.then((response) => {
					this.arts = this.isLogged ? response.data : response.data.art;
				})
				.catch(function (error) {
					console.log('error: ', error);
				});
			!this.isLogged ? axios.get('http://localhost:5000/api/users')
				.then((response) => {
					this.artists = response.data.users
				})
				.catch(function (error) {
					console.log('error: ', error);
				}) : null;
	}
}
</script>

<style>
.body {
  display: flex; /* or inline-flex */
	flex-direction: column;
	flex-wrap: wrap;
	justify-content: center;
	align-items: center
}
.flex-container {
  display: flex; /* or inline-flex */
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: flex-start;
	align-content: center
}
@media only screen and (max-width: 768px) {
	.flex-grid {
		max-width: 80vw;
		display: flex;
		overflow-x: auto;
  }
}
@media only screen and (min-width: 769px) {
	.flex-grid {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
  }
  .flex-grid-item {
    flex-grow: 0;
    flex-shrink: 0;
    align-items: center;
  }
}
</style>
