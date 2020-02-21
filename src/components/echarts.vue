<template>
  <div class="map">
    <div id="main" style="width: 100%;height:400px;"></div>
  </div>
</template>

<script>
import echarts from "echarts/lib/echarts";
import "echarts/map/js/china.js"; // 引入中国地图数据
import province from "../province.js"; // 中国各省份的中文与拼音对应
import illPeople from "../data.js"; // 数据处理对象
import nameMap from "../nameMap.js"; // 地名映射，用来解决部分地名不对应的问题
export default {
  data() {
    return {};
  },
  mounted() {
    this.mapNameEnter();
  },
  methods: {
    /**
     * 获取路由地址进行判断要显示的地图
     */
    mapNameEnter: function(mapName) {
      if (this.$route.path !== "/") {
        mapName = this.$route.params.pathMatch;
      }
      if (mapName !== undefined) {
        // 引入省份地图数据
        require(`echarts/map/js/province/${mapName}.js`);
      }
      _.forEach(province, function(key, value) {
        if (key == mapName) {
          mapName = value;
        }
      });
      let map = new illPeople(mapName);
      map.getAllData(() => {
        let headData = {
          local: mapName,
          time: map.Time,
          tableData: map.switchArr()
        };
        this.$emit("func", headData);
        this.myecharts(mapName, map.mapdata());
      });
    },
    /**
     * 绘制地图，接收省份名字(可选)，地区数据
     */
    myecharts: function(mapName, mapData) {
      var myChart = echarts.init(document.getElementById("main"));
      myChart.setOption({
        title: {
          subtext: "数据来自腾讯新闻",
          sublink: "https://view.inews.qq.com/g2/getOnsInfo?name=disease_h5"
        },
        tooltip: {
          trigger: "item",
          formatter: "{b}<br/>{c}人"
        },
        visualMap: {
          top: "55%",
          right: "right",
          splitNumber: 5,
          pieces: [
            {
              min: 2000
            },
            {
              min: 1000,
              max: 2000
            },
            {
              min: 500,
              max: 1000
            },
            {
              min: 200,
              max: 500
            },
            {
              min: 10,
              max: 200
            },
            {
              max: 10
            }
          ],
          inRange: {
            color: ["#ffc0b1", "#f75244", "#9c0505"]
          }
        },
        series: [
          {
            name: "全国疫情状况",
            type: "map",
            mapType: mapName || "china", // 自定义扩展图表类型
            top: "5%",
            label: {
              show: true,
              fontSize: 8
            },
            scaleLimit: {
              max: 1.5,
              min: 0.5
            },
            data: mapData
          }
        ],
        nameMap: nameMap
      });
      this.mapShift();
    },
    /**
     * 根据点击的省份从字典中找到对应的拼音拼接至地址栏进行跳转
     */
    mapShift: function() {
      var myChart = echarts.init(document.getElementById("main"));
      myChart.on("click", params => {
        if (params.name in province) {
          window.location.href = "#/" + province[params.name];
        }
      });
    }
  },
  /**
   * 监视路由的变化
   */
  watch: {
    "$route.path": function(newVal, oldVal) {
      this.mapNameEnter();
    }
  }
};
</script>

<style scoped></style>
