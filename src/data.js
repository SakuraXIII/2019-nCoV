import axios from 'axios'

class illPeople {
    constructor(name) {
        this.mapName = name || 'china';
        this.baseUrl = 'https://bird.ioliu.cn/v1'
    }
    /**
     * 请求数据并进行初步处理
     * @param {function} callback 返回数据:数据获取时间:Time,全国数据:chinaData
     */
    getAllData(callback) {
        axios.get(this.baseUrl + '?url=https://view.inews.qq.com/g2/getOnsInfo?name=disease_h5')
            .then((data) => {
                data = JSON.parse(data.data.data);
                this.Time = data.lastUpdateTime;
                this.arr = data.areaTree[0].children
                callback()
            })
    }
    /**
     * 根据地图名决定返回的地区数据
     */
    switchArr() {
        if (this.mapName !== 'china') {
            this.haveName(this.mapName);
        } else {
            this.noneName();
        }
        return this.arr
    }
    /**
     * 返回该地区内的数据
     * @param {string} name 地区名字
     */
    haveName(name) {
        let objData = []
        _.forEach(this.arr, (key, value) => {
            if (key.name === name) {
                this.arr = key.children
                this.noneName()
            }
        })
    }
    /**
     * 返回全国的表格数据
     */
    noneName() {
        let objData = []
        _.forEach(this.arr, function (key, value) {
            let temobj = {
                name: String,
                add: Number,
                confirm: Number,
                dead: Number,
                heal: Number
            }
            temobj.name = key.name;
            temobj.add = key.today.confirm + key.today.suspect;
            temobj.confirm = key.total.confirm
            temobj.dead = key.total.dead
            temobj.heal = key.total.heal
            objData.push(temobj)
        })
        this.arr = objData
    }
    /**
     * 获得指定地区的地图需要数据
     * @param {string} mapName 地图名字
     * @param {Function} callback 返回对象：地名name  确诊人数confirm
     */
    mapdata() {
        let dataArr = []
        _.forEach(this.arr, (key, value) => {
            let obj = {
                name: String,
                value: Number
            }
            // echarts的地区需要加上“市”.....
            if (this.mapName !== 'china' && this.mapName !== '上海') {                
                obj.name = key.name + '市';
            } else if (this.mapName == '上海') {  
                // 针对上海地区的名字的纠正
                obj.name = key.name + '区'
            } else {
                obj.name = key.name
            }
            // 几个特别的地区的名字处理纠正成echarts能接受的
            if (key.name === '保山市'||key.name === '丽江市'||key.name === '昭通市') {
                obj.name = key.name
            }
            obj.value = key.confirm;
            dataArr.push(obj)
        })
        return dataArr
    }
}

export default illPeople