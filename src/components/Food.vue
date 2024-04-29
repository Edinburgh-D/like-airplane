<template>
<div class="body">
<div class="head">
    <div class="text">图标</div>
    <div class="text">介绍</div>
    <div class="text">学习</div>
    <div class="text">交流</div>
    <div class="text">运营</div>
    <div class="text">客服</div>
</div>
<div class="title"></div>
<div class="content"></div>

</div>
</template>
<script>
export default{
name:'Food'
}
</script>
<style lang="scss" scoped>
.body{
    width: 100%;
    .head{
        height:100px;
        background-color: #ffffff;
        color: #6e6d7a;
        display:flex;
        .text{
            margin:10px 10px;
        }
    }
}

</style>