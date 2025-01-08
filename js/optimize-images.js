const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = 'images';
const outputDir = 'optimized-images';

if (!fs.existsSync(outputDir)){
    fs.mkdirSync(outputDir);
}

fs.readdirSync(inputDir).forEach(file => {
    if (file.match(/\.(jpg|jpeg|png)$/i)) {
        sharp(path.join(inputDir, file))
            .resize(1200, null, { // Max width 1200px
                withoutEnlargement: true
            })
            .webp({ quality: 80 })
            .toFile(path.join(outputDir, `${path.parse(file).name}.webp`))
            .then(info => console.log(`Optimized: ${file}`))
            .catch(err => console.error(`Error optimizing ${file}:`, err));
    }
}); 