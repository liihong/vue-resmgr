//引入
import {
    Message
} from 'element-ui'
import {
    Notification
} from 'element-ui'
import {
    MessageBox
} from 'element-ui'
import util from './util'

let message = {}

message.addSuccess = function () {
    Notification({
        title: '添加',
        message: '添加成功',
        type: 'success'
    })
}
message.addError = function (msg) {

    Notification({
        title: '添加',
        message: util.isNotEmpty(msg) ? msg : '添加失败',
        type: 'error'
    })
}
message.editSuccess = function () {
    Notification({
        title: '编辑',
        message: '编辑成功',
        type: 'success'
    })
}
message.editError = function (msg) {
    Notification({
        title: '编辑',
        message: util.isNotEmpty(msg) ? msg : '编辑失败',
        type: 'error'
    })
}
message.deleteSuccess = function () {
    Notification({
        title: '删除',
        message: '删除成功',
        type: 'success'
    })
}
message.deleteError = function (msg) {
    Notification({
        title: '删除',
        message: util.isNotEmpty(msg) ? msg : '删除失败',
        type: 'error'
    })
}
message.confirmDelete = function (resolve) {
    return MessageBox.confirm('是否确定删除？', '确认信息', {
            distinguishCancelAndClose: true,
            confirmButtonText: '删除',
            cancelButtonText: '取消'
        })
        .then(() => {
            resolve()
            this.deleteSuccess()
        })
        .catch(action => {
            Message({
                type: 'woring',
                message: '取消删除'
            })
        });
}
export default message