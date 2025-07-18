const fs = require('fs');
const { promises } = fs;
const { resolve } = require('path');

// 🔧 Update this to point to your actual file
const filePath = resolve(__dirname, './routes.ts');

async function removeServerBlock() {
  try {
    const content = await promises.readFile(filePath, 'utf8');

    const updated = content.replace(
      /\/\/ BEGIN SERVER[\s\S]*?\/\/ END SERVER/g,
      ''
    );

    await promises.writeFile(filePath, updated, 'utf8');
    console.log('✅ Server block removed successfully.');
  } catch (err) {
    if (err instanceof Error) {
      console.error('❌ Failed to update file:', err.message);
    } else {
      console.error('❌ Failed to update file:', err);
    }
  }
}

removeServerBlock();
