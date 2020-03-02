import * as rollup from 'rollup';
import tanager from '../plugin/rollup-plugin-tanager';
import config from './default.config';
import multi from '@rollup/plugin-multi-entry';

export default async function build() {
    const output = config.output as rollup.OutputOptions;
    let input = config;
    input.input = ['./src/md/*.md'];
    input.plugins = [...input.plugins, multi({exports: false}), tanager({exclude: ["!**/*.md"]})];
    output.dir = "./dist";

    const bundle = await rollup.rollup(input);
    await bundle.generate(output);
    await bundle.write(output);
}
