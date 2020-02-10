<template>
    <div class="head">
        <div class="notice">
            <h1>{{local}}疫情状况</h1>
            <span>时间截止至{{date}}</span>
        </div>
        <router-view @func="getNeedData"></router-view>
        <div class="alldata">
            <h3>数据统计</h3>
            <el-table :fit="false" :data="tableData" :cell-style="cellStyle" style="width: 100%">
                <el-table-column prop="name" label="地区"></el-table-column>
                <el-table-column prop="add" label="新增"></el-table-column>
                <el-table-column prop="confirm" label="确诊"></el-table-column>
                <el-table-column prop="heal" label="治愈"></el-table-column>
                <el-table-column prop="dead" label="死亡"></el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            local: "全国",
            date: "",
            tableData: []
        }
    },
    created() {
        // this.getNeedData();
    },
    methods: {
        getNeedData(obj) {
            this.local = obj.local || '全国'
            this.date = obj.time;
            this.tableData = obj.tableData;
        },
        cellStyle({
            row,
            column,
            rowIndex,
            columnIndex
        }) {
            if (columnIndex === 0 || columnIndex === 1) {
                return `color:red;`;
            }
        }
    }
}
</script>

<style scoped>
.head .notice h1 {
    margin: 0;
}

.head .notice span {
    font-size: 12px;
    color: #a1a1a1;
}
</style>
