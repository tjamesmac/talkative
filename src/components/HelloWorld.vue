<template>
  <div class="hello">
    <form v-on:submit="postFile">
      <label>
        Upload file here:
         <input id="fileUpload" type="file" />
      </label>
      <input type="submit" />
    </form>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String,
  },
  methods: {
    postFile: (event) => {
      event.preventDefault();
      console.log('hello world');
      const fileUpload = document.getElementById('fileUpload');
      console.log(fileUpload.value);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
