const { defineConfig } = require('@vue/cli-service')
const { VantResolver } = require('unplugin-vue-components/resolvers')
const componentsPlugin = require('unplugin-vue-components/webpack')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer:{
    // https:true,
    proxy:{
      // 女生
      // https://apis.netstart.cn/yunyuedu/category/original/data.json?id=8&gender=female&sort=2&pay=0&state=0&page=2

      // 首页
      // https://apis.netstart.cn/yunyuedu/store/rankList.json?rankType=26&uuid=ca03da7b64ca443ab25ec3b662fa91e2&all=40

      // 书籍详情  id + 书籍id
      // https://apis.netstart.cn/yunyuedu/book/getsub.json?id=13c58cc086f74e36978b4a7881b82517_4&title=女掌事
      // https://apis.netstart.cn/yunyuedu/book/getsub.json?id=ts_b9308d66b6f2414bb9bc384efd73eb01_4&title=重返2000


      // 章节目录
      // https://apis.netstart.cn/yunyuedu/reader/book/info.json?source_uuid=bd_0c70b944c4c94244b05e3fb102cc2a67_4


      //搜索
      // https://apis.netstart.cn/yunyuedu/search/book.json?keyword=乡村

      // 章节详情 source_uuid书籍id content_uuid章节id

      // 评论 书籍id
      // https://apis.netstart.cn/yunyuedu/comment/getComments.json?bookId=654ebfbcccd64b3ea0a51934953f300e_4

      "/yunyuedu":{
        target: 'https://apis.netstart.cn',
        ws: false,
        changeOrigin: true,
      },
      
    }
  },
  configureWebpack:{
    plugins:[
      componentsPlugin({
        resolvers:[VantResolver()]
      }),
    ],
  },
})
