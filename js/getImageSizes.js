import fs from 'fs';
import path from 'path';
import sizeOf from 'image-size';

// 画像フォルダのパス
const imageDirectory = './public/images';

function getImageSizes() {
  const sizes = {};

  try {
    const files = fs.readdirSync(imageDirectory);

    for (const file of files) {
      const filePath = path.join(imageDirectory, file);
      
      try {
        const stat = fs.statSync(filePath);
        if (stat.isFile()) {
          const fileBuffer = fs.readFileSync(filePath);
          const dimensions = sizeOf(fileBuffer); 

          if (dimensions) {
            sizes[file] = {
              width: dimensions.width,
              height: dimensions.height
            };
            console.log(`✅ ${file}: ${dimensions.width}px x ${dimensions.height}px`);
          }
        }
      } catch (error) {
        console.error(`⚠️ ${file} のサイズ取得に失敗しました: ${error.message}`);
      }
    }
    
    return sizes;

  } catch (error) {
    console.error(`❌ ディレクトリの読み込みに失敗しました: ${error.message}`);
    return null;
  }
}

/**
 * 取得した画像サイズをSCSSファイルとして出力
 * @param {object} sizes - 画像サイズ情報のオブジェクト
 */
function generateSassFile(sizes) {
  const sassContent = Object.entries(sizes).map(([name, dim]) => {
    return `  "${name}": (width: ${dim.width}, height: ${dim.height})`;
  }).join(',\n');

  const fileContent = `$image-sizes: (\n${sassContent}\n);\n`;

  try {
    // SCSSファイルを書き出す場所のパス
    const outputPath = path.join(process.cwd(), 'scss', '_image-sizes.scss');
    fs.writeFileSync(outputPath, fileContent);
    console.log('\n--- SCSSファイルが正常に生成されました ---');
  } catch (error) {
    console.error('❌ SCSSファイルの書き込みに失敗しました:', error);
  }
}

// スクリプトの実行
const imageSizes = getImageSizes();
if (imageSizes) {
  generateSassFile(imageSizes);
}