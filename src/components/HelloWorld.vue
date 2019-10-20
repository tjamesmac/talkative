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
    postFile: async (event) => {
      event.preventDefault();
      console.log('hello world');
      const fileUpload = document.getElementById('fileUpload');
      console.log(fileUpload.value);
      console.log(fileUpload.files[0]);
      try {
        const dataUpload = await fetch('/', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: fileUpload.files[0],
        });
        const response = await dataUpload;
        if (response.status === 200) {
          console.log('yay');
        }
      } catch (error) {
        console.error('File upload error', error);
      }
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
