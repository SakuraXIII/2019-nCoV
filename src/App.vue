<template>
    <el-container id="app" direction="vertical">
        <el-header height="40px">
            <el-page-header @back="goBack" content="2019-nCoV疫情地图"></el-page-header>
        </el-header>
        <div class="image">
            <div class="block">
                <el-image :src="url" :fit="fit"></el-image>
            </div>
        </div>
        <el-main>
            <router-view></router-view>
        </el-main>
        <el-footer>
            <div>
                页面复刻自
                <a href="http://101.200.145.232/#/">border-1px</a>，
                仅供学习使用。数据来自
                <a href="https://view.inews.qq.com/g2/getOnsInfo?name=disease_h5">腾讯新闻</a>
            </div>
        </el-footer>
    </el-container>
</template>

<script>
import img from "./assets/img/nCoV.png";
export default {
    data() {
        return {
            fit: "contain",
            url: img
        };
    },
    methods: {
        goBack() {
            window.history.go(-1);
        }
    }
};
</script>

<style scoped>
a {
    color: #00e2fc;
    text-decoration: none;
}

#app {
    margin: 0 auto;
    max-width: 500px;
}

.el-page-header {
    line-height: 35px;
}

.el-footer {
    background-color: #464d66;
    text-align: center;
    padding: 20px;
}
</style>
