<template>
  <el-drawer
    ref="drawer"
    title="创建策略"
    :before-close="handleClose"
    :visible.sync="dialog"
    :show-close="false"
    size="32%"
  >
    <div class="drawer-content">
      <el-form :model="form">
        <el-form-item label="用户" :label-width="formLabelWidth">
          <el-input v-model="form.name" />
          <div class="input-tips">
            <span>请输入用户名,用户邮箱或者用户手机号码进行搜索</span>
          </div>
        </el-form-item>
        <el-form-item label="角色" :label-width="formLabelWidth">
          <el-select v-model="form.region" style="width:100%" placeholder="请选择授权角色" :loading="queryRoleLoading" @visible-change="showRoleList">
            <el-option
              v-for="item in roleList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
          <div class="input-tips">
            <span>只能选择一个角色, 如果想授权更多功能, 请新建更强的角色</span>
          </div>
        </el-form-item>
        <el-form-item label="范围" :label-width="formLabelWidth">
          <el-input v-model="form.name" />
          <div class="input-tips">
            <span>用于对空间内做更细粒度的访问范围控制</span>
          </div>
        </el-form-item>
        <el-form-item label="过期时间" :label-width="formLabelWidth">
          <el-checkbox v-model="neverExpire">永不过期</el-checkbox>
        </el-form-item>
        <el-form-item v-show="!neverExpire" :label-width="formLabelWidth">
          <el-date-picker
            v-model="expireDatetime"
            style="width:100%"
            type="datetime"
            placeholder="选择日期时间"
            align="right"
            :picker-options="pickerOptions"
          />
        </el-form-item>
      </el-form>
      <div class="drawer-footer">
        <el-button @click="cancelForm">取 消</el-button>
        <el-button type="primary" :loading="loading" @click="$refs.drawer.closeDrawer()">{{ loading ? '提交中 ...' : '确 定' }}</el-button>
      </div>
    </div>
  </el-drawer>
</template>

<script>
import { queryRole } from '@/api/keyauth/role'

export default {
  name: 'CreatePolicyDrawer',
  props: {
    visible: {
      default: false,
      type: Boolean
    }
  },
  data() {
    return {
      queryRoleLoading: false,
      roleList: [],
      roleTotal: 0,
      table: false,
      dialog: false,
      loading: false,
      gridData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now()
        },
        shortcuts: [{
          text: '明天',
          onClick(picker) {
            const date = new Date()
            date.setTime(date.getTime() + 3600 * 1000 * 24)
            picker.$emit('pick', date)
          }
        }, {
          text: '一周',
          onClick(picker) {
            const date = new Date()
            date.setTime(date.getTime() + 3600 * 1000 * 24 * 7)
            picker.$emit('pick', date)
          }
        }, {
          text: '一月',
          onClick(picker) {
            const date = new Date()
            date.setTime(date.getTime() + 3600 * 1000 * 24 * 30)
            picker.$emit('pick', date)
          }
        }, {
          text: '一年',
          onClick(picker) {
            const date = new Date()
            date.setTime(date.getTime() + 3600 * 1000 * 24 * 365)
            picker.$emit('pick', date)
          }
        }]
      },
      neverExpire: true,
      expireDatetime: '',
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '80px'
    }
  },
  watch: {
    visible: {
      handler: function(val, oldVal) {
        this.dialog = val
      },
      immediate: true
    }
  },
  methods: {
    showRoleList(visible) {
      if (visible && this.roleList.length === 0) {
        this.getRoleList()
      }
    },
    getRoleList() {
      this.queryRoleLoading = true
      // 获取用户列表
      queryRole(this.listQuery).then(response => {
        this.roleList = response.data.items
        this.roleTotal = response.data.total
        this.queryRoleLoading = false
      }).catch(() => {
        this.queryRoleLoading = false
      })
    },
    handleClose(done) {
      if (this.loading) {
        return
      }
      this.loading = false
      this.dialog = false
      this.$emit('update:visible', false)
    },
    cancelForm() {
      this.loading = false
      this.dialog = false
      this.$emit('update:visible', false)
    }
  }
}
</script>

<style lang="scss" scoped>

.drawer-footer {
  text-align: center;
}

</style>>