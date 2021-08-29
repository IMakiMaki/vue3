/*
  vite.config.ts在构建时没办法直接获取import.meta.env的环境变量，因此需要一个读取process.env的工具
  写完才发现 vite自带的有……
*/
import path from 'path';
import fs from 'fs';

export const loadEnv = (mode: string) => {
  const envFilePath = path.resolve(__dirname, `./.env.${mode}`);
  try {
    const res = {};
    const data = fs.readFileSync(envFilePath, 'utf8');

    data.split('\n').forEach((kv) => {
      const [key, value] = kv.replace(/\s*/g, '').split('=');
      if (key && value) {
        res[key] = value;
      }
    });

    return res;
  } catch (err) {
    console.error(err);
  }
};
