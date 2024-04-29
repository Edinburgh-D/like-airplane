<template>
    <div class="main">
        <div class="lick-container" @keyup.enter="sendMessage">
            <div class="chat-content-container">
                <div class="header">

                </div>
                <div class="body" ref="msgBody">
                    <div class="message" v-for="(message, index) in messageList" :key="index"
                        :class="{ self: message.type === 'self' }">
                        <div class="avatar"></div>
                        <div class="trangle"></div>
                        <div class="content">{{ message.content }}</div>
                    </div>
                </div>
            </div>
            <div class="type-container">
                <input class="type-input" v-model="keyWord">
                <div class="send-btn" @click="sendMessage">发送</div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Chat',
    data () {
        return {
            keyWord: '',
            messageList: [
                { type: 'oppsite', content: '宝，在不在哇！' },
                { type: 'oppsite', content: '今天我也好想你！' }
            ],
            simpWordList: [

            ]
        }
    },
    mounted () {
        setInterval(this.addReply, 10000)
    },
    methods: {
        addReply () {
            const { simpWordList } = this
            const length = simpWordList.length
            const index = Math.floor(Math.random() * length)
            this.messageList.push({ type: 'oppsite', content: simpWordList[index] })
            this.$nextTick(() => {
                this.$refs.msgBody.scrollTop = this.$refs.msgBody.scrollHeight
            })
        },
        sendMessage () {
            if (this.keyWord === '') {
                return
            }
            this.messageList.push({ type: 'self', content: this.keyWord })
            this.addReply()
            this.keyWord = ''
        }
    }
}

</script>
<style lang="scss" scoped>
.main {
    width: 100%;

    .lick-container {
        width: 750px;
        height: 100%;
        margin: 0 auto;
    }

    .chat-content-container {
        .header {
            width: 100%;
            height: 79px;
            background: #ededed;
            border-bottom: 3px solid #e9e9e9;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 30px;
        }

        .body {
            width: 100%;
            height: calc(100vh - 158px);
            overflow: auto;

            &::-webkit-scrollbar {
                width: 0 !important;
            }

            background: #ededed;
            padding-top: 10px;

            .message {
                display: flex;
                align-items: center;
                margin-bottom: 10px;
                margin-left: 15px;

                &.self {
                    flex-direction: row-reverse;
                    margin-left: auto;
                    margin-right: 15px;

                    .trangle {
                        border: none;
                        border-top: 12.5px solid transparent;
                        border-left: 12.5px solid rgb(149, 236, 105);
                        border-bottom: 12.5px solid transparent;
                        margin-left: 0;
                        margin-right: 20px;
                    }

                    .content {
                        background: rgb(149, 236, 105);
                    }

                    .avatar {
                        background: url("../assets/avatar1.jpg");
                        background-size: cover;
                    }
                }

                .avatar {
                    width: 75px;
                    height: 75px;
                    background: url("../assets/test.jpg");
                    background-size: cover;
                }

                .trangle {
                    width: 0;
                    height: 0;
                    border-right: 12.5px solid #fff;
                    border-bottom: 12.5px solid transparent;
                    border-top: 12.5px solid transparent;
                    margin-left: 20px;
                }

                .content {
                    min-height: 75px;
                    max-width: 505px;
                    display: flex;
                    align-items: center;
                    font-size: 30px;
                    padding: 20px 20px;
                    background: #fff;
                }
            }
        }
    }

    .type-container {
        width: 100%;
        height: 79px;
        background: #ededed;
        border-top: 3px solid #e9e9e9;
        display: flex;
        align-items: center;
        justify-content: space-evenly;

        .type-input {
            border: none;
            width: 75%;
            height: 59px;
            font-size: 30px;
            outline: none;
            text-indent: 30px;
        }

        .send-btn {
            // rgb(149, 236, 105)
            background: rgb(80, 236, 105);
            width: 15%;
            height: 59px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 30px;
            color: #fff;
            cursor: pointer;
        }
    }
}
</style>