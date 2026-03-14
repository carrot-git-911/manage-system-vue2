import Vue from 'vue'
import {
  Button,
  Input,
  Form,
  FormItem,
  Select,
  Option,
  Table,
  TableColumn,
  Pagination,
  Message,
  MessageBox,
  Notification
} from 'element-ui'

// 按需注册组件
Vue.use(Button)
Vue.use(Input)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Select)
Vue.use(Option)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Pagination)

// 非组件式 API 挂到 Vue 原型，方便 this.$message / this.$confirm 等
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$notify = Notification
