import commonjs from 'rollup-plugin-commonjs';
import VuePlugin from 'rollup-plugin-vue';

export default {
    input: "src/index.js",

    output: {
        file: "./build/bundle.js",
        format: "iife"
    },

    plugins: [
        commonjs(),
        VuePlugin()
    ]
}
