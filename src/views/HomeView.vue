<script>
export default {
	name: "HomeView"
}
</script>

<template>
	<div>
		<h1>Home</h1>
	</div>
	<v-btn :to="{name: 'link'}">Link</v-btn>
  <div>
    <h1>Sensores</h1>
    <v-btn :to="{name: 'sensor'}">Sensores</v-btn>
  </div>
</template>

<style>

</style>