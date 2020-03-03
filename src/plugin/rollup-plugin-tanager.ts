import createDOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';
import winston from 'winston';
import rollup from 'rollup';
import { createFilter } from 'rollup-pluginutils';
import marked from 'marked';

export interface MarkdownOverrideObject {}

export type markdownOverrideMap = {
    [key in keyof marked.Renderer]?: MarkdownOverrideObject
}

export interface tanagerOptions {
    include?: string | RegExp | (string | RegExp)[];
    exclude?: string | RegExp | (string | RegExp)[];
    markedOptions?: marked.MarkedOptions;
}

export default function tanager(options: tanagerOptions = {}): rollup.Plugin {
    const filter = createFilter( options.include, options.exclude );

    const logger = winston.createLogger({
        level: 'info',
        format: winston.format.json(),
        transports: [
            new winston.transports.File({filename: 'tanager.log'}),
            new winston.transports.Console({format: winston.format.simple()})
        ]
    })

    if(options.markedOptions) {
        marked.setOptions(options.markedOptions);
    }
    logger.log('info', 'Begin generation...');

    return {
        name: 'tanager',
        async transform(code, id) {
            if(!filter(id)) return;
            logger.log('info', 'transform: ' + id);
            // logger.log('info', 'original: ' + code.toString())
            var renderer = new marked.Renderer();
            renderer.heading = (text, level) => {
                return `<demo-heading>${text}</demo-heading>`;
            };
            const data = marked(code, {renderer});

            logger.log('info', 'renderer: ' + data);
            // logger.log('info', 'transformed: ' + data.toString());
            // TODO: generate source from markdown.
            let res: rollup.TransformResult = {
                code: ''
                // TODO: return source map.
            };

            return res;
        },

        buildEnd() {
            logger.log('info', 'Generation complete!');
        }
    }
}

async function clean(html: string) {
    // create a jsdom window to render our html and return a sanitized version.
    const window = new JSDOM('').window;
    const DOMPurify = createDOMPurify(window as any);
    return DOMPurify.sanitize(html);
}