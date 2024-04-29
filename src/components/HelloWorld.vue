<template>
    <div class="hello">
        <div class="snow">

            <div class="show_snow" v-for="(item, index) in colorList" :key="index"
                :style="{ backgroundColor: item.color, boxShadow: '0px 0px 10px 5px ' + item.color, width: item.width + 'px', height: item.width + 'px' }">
            </div>

            <!-- <div
                class="show_snow"
                style="--size:80px;"
            ></div>
            <div
                class="show_snow"
                style="--size:50px;"
            ></div> -->
            <!-- <div class="show_snow"></div>
            <div class="show_snow"></div>
            <div class="show_snow"></div> -->

        </div>

        <div class="title">{{ msg }}</div>
        <!-- <div>这个是为了测试从别的平台点击进入渔业村的</div>
        <button @click="toRoute">点击事件</button> -->
        <ul>
            <!-- <li>
                <router-link to='/Chat'> 微信聊天截图</router-link>
            </li> -->
            <li>
                <router-link to='/test'>历史影像</router-link>
            </li>

        </ul>
        <button @click="show = !show">Toggle</button>
    </div>
</template>

<script>
import { getColor } from '../utils/colorRandom'
export default {
    name: 'HelloWorld',
    data () {
        return {
            msg: "Ediburgh's little demo",
            show: true,
            docState: 'saved',
            colorList: []
        }
    },
    methods: {

        toRoute () {
            const token = 'eyJhY2Nlc3NfdG9rZW4iOiJleUpoYkdjaU9pSklVekkxTmlJc0luUjVjQ0k2SWtwWFZDSjkuZXlKamJHbGxiblJKWkNJNkltWmhkMnRsY3lJc0luVnpaWEpmYm1GdFpTSTZJbnBvYjNWZmNEWXdNU0lzSW5ObGVDSTZJdWVVdHlJc0luVnpaWEpPYnlJNmJuVnNiQ3dpZFhObGNrNWhiV1VpT2lKNmFHOTFYM0EyTURFaUxDSmpiR2xsYm5SZmFXUWlPaUptWVhkclpYTWlMQ0poZG1GMFlYSlViMnRsYmlJNmJuVnNiQ3dpYkdsalpXNXpaU0k2SW5CdmQyVnlaV1FnWW5rZ1ptRjNhMlZ6SWl3aVlYVmtJanBiSW05aGRYUm9NaTF5WlhOdmRYSmpaU0lzSW05aGRYUm9NaTF6WlhKMlpYSWlYU3dpY0dodmJtVWlPaUl4TlRjek5URTROVEV6TWlJc0luTmpiM0JsSWpwYkltRnNiQ0pkTENKMFpXNWhiblJKWkNJNk1UQXdNREF3TENKMWMyVnlSblZzYkc1aGJXVWlPaUxsa2FqcHVZOGlMQ0pwWkNJNklqRTFNRGt3TlRjd09EQTVOVGN6TkRFMk9UZ2lMQ0oxYzJWeVZIbHdaU0k2TVN3aVpYaHdJam94TmpZNE5EazNOVEF3TENKcWRHa2lPaUkxTm1JM056ZzROUzB3TURKaUxUUmtPV1V0T1dFMU5TMDVNakJtTmpBNE9UY3dNVFlpTENKbGJXRnBiQ0k2SW5wb2IzVmZjRUI1ZVdNdVkyOXRJbjAuaVdLM0drN05ZRG9tcXRnR2p4UmVnRnN3YW02QUlXYzlTMFRXdjRpSlhSbyIsInVzZXJGdWxsbmFtZSI6IuWRqOm5jyIsInVzZXJOYW1lIjoiemhvdV9wNjAxIn0='

            window.open('http://localhost:9528/#/login?token=' + token + '&path=infopage')
        },
        inputColor () {
            for (let i = 0; i < 18; i++) {
                let width = Math.floor(Math.random() * 20)
                let obj = {
                    width: width,
                    color: getColor()
                }

                this.colorList.push(obj)
            }
        }
    },
    mounted () {
        setInterval(() => {
            if (this.colorList.length != 0) {
                this.colorList = []
            }

            this.inputColor()
        }, 5500)


        console.log(this.colorList)
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* 离开动画的生效状态 */

.point_out {
    width: 11px;
    height: 11px;
    border: 1px solid rgba(82, 204, 204, 0.4);
    position: absolute;
    right: -5px;
    align-items: center;
    display: flex;
    justify-content: center;
    border-radius: 10px;
    top: -5px;
    animation: childMove 5s infinite;
    -webkit-animation: childMove 5s infinite;
    animation-delay: 4s;
    -webkit-animation-delay: 4s;
}

.point_in {
    width: 3px;
    height: 3px;
    background: #b3d9ff;
    box-shadow: 0px 0px 2px 1px #7296b9, 0px 0px 5px 2px #4d6781;
}

@keyframes childMove {
    from {
        left: 0px;
    }

    to {
        left: 200px;
    }
}

.hello {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 2%;
}

.title {
    color: #fff;
    font-size: 60px;
    margin: 20px;
}

h1,
h2 {
    font-weight: normal;
    color: #fff;
    font-size: 60px;
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

.outer {
    width: 300px;
    height: 100px;
    background: #aaa;
    display: flex;
    justify-content: center;
    align-items: center;
}

.inner {
    width: 200px;
    height: 80px;
    background: #333;
    color: #fff;
    text-align: center;
    line-height: 20px;
}

.snow {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    opacity: 1;
    z-index: -10;
    /* display: inline-block; */
}

.show_snow {
    width: var(--size);
    height: var(--size);
    border-radius: 50%;
    background: #79bcec;
    animation: flow 5.5s linear infinite;

    display: inline-block;
    margin: 0 20px;
    /* opacity: 0.6; */
}

@keyframes flow {
    from {
        transform: translateY(-10vh) scale(0);
    }

    to {
        transform: translateY(100vh) scale(1);
    }
}</style>
