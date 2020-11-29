//webpack.config.js

const path = require("path");
const { VueLoaderPlugin } = require("vue-loader");

module.exports = {
    mode:"production",
    entry: "./src/index.js",
    output:{
        //Output dir
        path: path.resolve(__dirname, './dist'),
        filename:"tsukuyomi.app.js"
    },
    module:{
        rules:[
            {
                test:/\.vue$/,
                loader:"vue-loader"
            },
            {
                test: /\.css/,
                use: [
                  "style-loader",
                  {
                    loader: "css-loader",
                    options: { url: false }
                  }
                ]
            }
        ]
    },
    plugins:[
        new VueLoaderPlugin()
    ],
    resolve:{
        alias:{
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
    externals:{
        Dexie:"Dexie"
    }
}