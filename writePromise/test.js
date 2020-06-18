let Promise = require('./index')

new Promise(function(res, rej) {
  setTimeout(_ => res('成功'), 500)
})
// .then(res => {
//   console.log('1:' + res)
//   return '第一个then'
// })
// .then(res => {
//   return new Promise(res => {
//       setTimeout(_ => res('第二个then'), 3000)
//   })
// }).then(res => {
//   console.log(res)
// })
// .then(res => {
//   return new Promise((suc, fail) => {
//       setTimeout(_ => {
//           fail('then失败')
//      }, 400)
//   })
// })
// .then(res => {
//   console.log(iko)
// })
// .then(_ => {}, () => {
//  return new Promise(function(res, rej) {
//      setTimeout(_ => rej('promise reject'), 3000)
//  })
// })
// .then()
// .then()
// .then(_ => {},
//   rej => {
//       console.log(rej);
//       return rej + '处理完成'
//   })
// .then(res => {
//   console.log(res);
//   // 故意出错
//   console.log(ppppppp)
// })
// .then(res => {}, rej => {
//   console.log(rej);
//   // 再次抛错
//   console.log(oooooo)
// }).catch(e => {
//   console.log(e)
// })