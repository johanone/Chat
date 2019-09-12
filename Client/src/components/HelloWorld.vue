/* eslint-disable */
<template>
  <div class="hello">

    <button @click="setNameBtn">Connect</button>
    <input v-model="name" placeholder="Enter name">
    <div style="">
      <ul id="example-1">
        <li v-for="message in messages" >
          {{ message }}
        </li>
      </ul>
    </div>
    <button @click="sendBtn">Send</button>
    <input v-model="newMsg" placeholder="...">
  </div>
</template>

<script>
  /* eslint-disable */
  export default {
    name: 'HelloWorld',
    data() {
      return {
        name:"",
        msg: 'Welcome to Your Vue.js App',
        messages:["fsdfsfsfsfsd","gsgsds","evrsvcvesssssssssssssssssssssssssssssssssssssssssssssssssssssssssss"],
        newMsg:""
      }
    },
    methods: {
      setNameBtn: function () {
        var msg = {
          content: 'setName',
          name: this.name
        };
        console.log(msg);
        this.$socket.sendObj(msg)

      },
      sendBtn: function () {
        var msg = {
          content: 'message',
          name: this.name,
          message:this.newMsg
        };
        console.log(msg);
        this.$socket.sendObj(msg)
        this.newMsg=""
      }
    },
    created() {
      this.$options.sockets.onmessage = (response) => {
        let object=JSON.parse(response.data)
        let msg= object.name+": "+object.message
        this.messages.push(msg)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }



  a {
    color: #42b983;
  }
</style>
