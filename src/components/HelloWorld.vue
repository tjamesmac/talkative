<template>
  <div class="hello">
    <form v-on:submit="postFile">
      <label>
        Upload file here:
         <input id="fileUpload" name="fileUpload" type="file" />
      </label>
      <input type="submit" />
    </form>
    <div v-if="fileError">{{ fileError }}</div>
    <div v-if="loading">Loading...</div>
    <div class="data-output" v-if="wordData">
      <div>
        <p>Word Count = {{ wordData.totalWords}}</p>
      </div>
      <div>
        <p>Average word length = {{ wordData.averageWordCount }}</p>
      </div>
      <div v-for="(item, index) in Object.keys(wordData.wordCounts)" :key="index">
        <p>Number of words of length {{ item }} is {{ wordData.wordCounts[item] }}</p>
      </div>
      <div v-if="wordHighArray">
        <p v-if="wordHighArray.length === 1">
          The most frequently occuring word length is
          <span v-for="(item, index) of wordHighArray" :key="index">{{ item }}</span>
        </p>
        <p v-else>
          The most frequently occuring word lengths are:
          <span v-for="(item, index) of wordHighArray" :key="index">{{ item }} </span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWords',
  data: function () {   //eslint-disable-line
    return {
      wordData: null,
      wordHighArray: null,
      loading: false,
      fileError: null,
    };
  },
  methods: {
    postFile: async function(event) { //eslint-disable-line
      event.preventDefault();
      this.loading = true;
      this.fileError = '';
      const fileUpload = document.getElementById('fileUpload');
      const formData = new FormData();
      formData.append('streamfile', fileUpload.files[0]);
      if (fileUpload.files) {
        try {
          const dataUpload = await fetch('/', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
            },
            body: formData,
          });
          const response = await dataUpload;
          if (response.status === 200) {
            const responseJSON = await response.json();

            this.wordData = await responseJSON;
            const { wordCounts } = responseJSON;
            const wordKeys = Object.keys(wordCounts);

            const amounts = wordKeys.map(item => wordCounts[item]);
            const highestAmount = Math.max(...amounts);

            const highestWordCount = wordKeys.filter(word => wordCounts[word] === highestAmount);

            this.wordHighArray = highestWordCount;
            this.loading = false;
          } else {
            console.log(response.status);
            this.loading = false;
            this.fileError = 'No file uploaded';
          }
        } catch (error) {
          console.error('File upload error', error);
        }
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
.data-output {
  text-align: left;
}
</style>
