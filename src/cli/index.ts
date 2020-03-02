import program from 'commander';
import build from './build';
import serve from './serve';

(async function entry() {
    program
        .version('0.0.1');

    program
        .command('build')
        .option('-p, --production', 'Generate a prod build.')
        .description('Generate a static site from markdown.')
        .action(build);

    program
        .command('serve')
        .option('-p, --production', 'Serve a prod build.')
        .description('Serve the generated static site and watch for changes.')
        .action(serve);

    await program.parseAsync(process.argv);
})();
