import pkg from './package.json';
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import filesize from 'rollup-plugin-filesize';

const sourcemap = true;

export default {
    input: './src/index.tsx',
    output: [
        // ESM
        {
            file: pkg.module,
            sourcemap,
        },
        // CommonJS
        {
            file: pkg.main,
            format: 'cjs',
            exports: 'default',
            sourcemap,
        },
    ],
    plugins: [
        peerDepsExternal(),
        resolve(),
        commonjs(),
        typescript({ useTsconfigDeclarationDir: true }),
        filesize(),
    ],
    onwarn(warning, rollupWarn) {
        if (warning.code !== 'UNUSED_EXTERNAL_IMPORT') {
          rollupWarn(warning);
        }
    },
};