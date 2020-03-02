import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import rollup from 'rollup';

export default {
    input: './src/main.ts',
    output: {
        dir: 'dist',
        format: 'es',
    },
    plugins: [
        resolve(),
        typescript(),
        commonjs({extensions: ['.js', '.ts']}),
    ],
} as rollup.RollupOptions;
