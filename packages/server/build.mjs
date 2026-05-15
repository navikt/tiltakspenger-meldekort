import { build, context } from 'esbuild';
import { readFileSync } from 'node:fs';

const pkg = JSON.parse(readFileSync(new URL('./package.json', import.meta.url), 'utf8'));

// Externaliser alle npm-deps (inkl. devDeps som vite — kun brukt i dev mode),
// men IKKE workspace-pakker (@meldekort/*) — disse bundles inn slik at runtime
// ikke trenger TS-stripping.
const external = [
    ...Object.keys(pkg.dependencies),
    ...Object.keys(pkg.devDependencies ?? {}),
].filter((d) => !d.startsWith('@meldekort/'));

const options = {
    entryPoints: ['src/server.ts'],
    outfile: 'dist/server.cjs',
    bundle: true,
    platform: 'node',
    external,
};

const isWatchMode = process.argv[2] === 'watch';

if (isWatchMode) {
    console.log('Building in watch mode');
    const stop = async (signal) => {
        console.log(`Received ${signal} - Aborting build/watch`);
        await ctx.dispose();
    };
    process.on('SIGTERM', stop);
    process.on('SIGINT', stop);
    const ctx = await context(options);
    await ctx.watch();
} else {
    console.log('Building in production mode');
    await build(options);
}
