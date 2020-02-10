import {
    PageHeader,
    Image,
    Container,
    Header,
    Main,
    Footer,
    Table,
    TableColumn
} from 'element-ui'
const element = {
    install: function (Vue) {
        Vue.use(PageHeader)
        Vue.use(Image)
        Vue.use(Container)
        Vue.use(Header)
        Vue.use(Main)
        Vue.use(Footer)
        Vue.use(Table)
        Vue.use(TableColumn)
    }
}
export default element