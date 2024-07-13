import * as esbuild from 'esbuild'
import vuePlugin from 'esbuild-plugin-vue3'

const commonConfig = {
  entryPoints: ['src/app.js'],
  bundle: true,
  outdir: './dist',
  plugins: [vuePlugin({
    cssInline: false,
    compilerOptions: {
      isCustomElement: tag => ['webview', 'uxp-panel'].indexOf(tag) > -1 
    }
  })],
  sourcemap: true, // Enable source maps,
  external: ['uxp', 'indesign'],
}

async function build(watch = false) {
  try {
    const config = { ...commonConfig, sourcemap: false }
    if (watch) {
      // Create a context for watching
      const ctx = await esbuild.context(config)
      await ctx.watch()
      console.log('Watching for changes...')
    } else {
      // One-time build
      await esbuild.build(config)
      console.log('Build completed successfully')
    }
  } catch (error) {
    console.error('Build failed:', error)
    process.exit(1)
  }
}
async function start() {
  try {
    let ctx = await esbuild.context(commonConfig)
    await ctx.watch()
    let { host, port } = await ctx.serve({
      servedir: './dist',
      port: 1234,
    //   keyfile: 'server.key',
    //   certfile: 'server.crt'
    })
    console.log(`Serving at http://${host}:${port}`)
  } catch (error) {
    console.error('Server start failed:', error)
    process.exit(1)
  }
}

// Check command line arguments to determine whether to build or start
const args = process.argv.slice(2)
if (args.includes('--build')) {
  build()
} else if (args.includes('--watch')) {
  build(true)
} else {
  start()
}