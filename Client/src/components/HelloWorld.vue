/* eslint-disable */
<template>
  <div class="hello">

    <button @click="clickButton">Connect</button>
    {{ status }}
    <button @click="clickButton2">Connect</button>
    {{ status }}
  </div>
</template>

<script>
/* eslint-disable */
    export default {
        name: 'HelloWorld',
        data() {
            return {
                msg: 'Welcome to Your Vue.js App'
            }
        },
        methods: {
            clickButton: function () {
                var msg = {
                    type: 'message',
                    date: Date.now()
                };
                this.$socket.sendObj(msg)

                // $socket is [WebSocket](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket) instance
                // or with {format: 'json'} enabled
            },
            clickButton2: function () {
                // $socket is [WebSocket](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket) instance
                // this.$socket.send('some data')
                this.$socket.send({awesome: 'test'})
                // or with {format: 'json'} enabled
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

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
