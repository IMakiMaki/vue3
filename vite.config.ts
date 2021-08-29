import { defineConfig, loadEnv, UserConfigExport, UserConfigFn } from 'vite';
import vue from '@vitejs/plugin-vue';
import styleImport from 'vite-plugin-style-import';
import legacy from '@vitejs/plugin-legacy';
import path from 'path';

// https://vitejs.dev/config/

const getConfig: UserConfigFn = ({ command, mode }) => {
  const envConstants = loadEnv(mode, '.');
  return {
    /**
     * 开发或生产环境服务的公共基础路径。
     * https://cn.vitejs.dev/config/#base
     */
    base: '/',
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.', 'src'),
      },
    },
    build: {
      /**
       * 打包目录
       * https://cn.vitejs.dev/config/#build-outdir
       */
      outDir: envConstants.VITE_OUT_DIR ? envConstants.VITE_OUT_DIR : 'dist',
    },
    server: {
      // 是否开启 https
      https: false,
      /**
       * 端口号
       * @default 9530
       */
      port: 9530,
    },
    plugins: [
      legacy({
        targets: ['defaults', 'not IE 11'],
      }),
      vue(),
      styleImport({
        libs: [
          {
            libraryName: 'element-plus',
            esModule: true,
            ensureStyleFile: true,
            resolveStyle: (name) => {
              name = name.slice(3);
              return `element-plus/packages/theme-chalk/src/${name}.scss`;
            },
            resolveComponent: (name) => {
              return `element-plus/lib/${name}`;
            },
          },
        ],
      }),
    ],
  };
};

export default getConfig;
