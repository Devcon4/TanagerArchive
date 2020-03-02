import * as rollup from 'rollup';

const watchOptions: rollup.RollupWatchOptions = {};
const outputOptions: rollup.OutputOptions = {};

export default async function serve() {
    const bundle = await rollup.watch([watchOptions]);
    // TODO: hook this up!
}