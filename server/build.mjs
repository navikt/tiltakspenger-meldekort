import { build, context } from 'esbuild';

const options = {
    entryPoints: ['src/server.ts'],
    outfile: 'dist/server.cjs',
    bundle: true,
    platform: 'node',
    packages: 'external',
}

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
