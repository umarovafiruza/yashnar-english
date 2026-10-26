const fs = require('fs');
const path = require('path');
const { MsEdgeTTS, OUTPUT_FORMAT } = require('msedge-tts');

// Load exercises from data/listening-exercises.js
global.window = {};
require('../data/listening-exercises.js');
const exercises = window.LISTENING_EXERCISES;

console.log(`Loaded ${exercises.length} listening exercises for neural synthesis.`);

async function synthesizeText(tts, text, outputPath) {
  return new Promise((resolve, reject) => {
    try {
      const { audioStream } = tts.toStream(text, {
        rate: '-3%', // Slight gentle reduction for crystal-clear ESL comprehension
        pitch: '+0Hz'
      });
      const file = fs.createWriteStream(outputPath);
      audioStream.pipe(file);
      file.on('finish', () => resolve(fs.statSync(outputPath).size));
      file.on('error', reject);
      audioStream.on('error', reject);
    } catch (err) {
      reject(err);
    }
  });
}

async function run() {
  const ttsJenny = new MsEdgeTTS();
  await ttsJenny.setMetadata('en-US-JennyNeural', OUTPUT_FORMAT.AUDIO_24KHZ_96KBITRATE_MONO_MP3);

  // 1. Synthesize 12 Exercises with JennyNeural
  for (let i = 0; i < exercises.length; i++) {
    const ex = exercises[i];
    const numStr = (i + 1).toString().padStart(2, '0');
    const outPath = path.join(__dirname, '..', 'audio', `listening-${numStr}.mp3`);

    console.log(`[${i + 1}/${exercises.length}] Generating ${outPath}...`);
    const size = await synthesizeText(ttsJenny, ex.transcript, outPath);
    console.log(`  -> Saved (${(size / 1024).toFixed(1)} KB)`);

    // Clean up old .wav file if exists
    const oldWav = path.join(__dirname, '..', 'audio', `listening-${numStr}.wav`);
    if (fs.existsSync(oldWav)) {
      fs.unlinkSync(oldWav);
    }
  }
  ttsJenny.close();

  // 2. Synthesize Previews
  console.log('\nGenerating Voice Previews...');

  // Jenny
  const tts1 = new MsEdgeTTS();
  await tts1.setMetadata('en-US-JennyNeural', OUTPUT_FORMAT.AUDIO_24KHZ_96KBITRATE_MONO_MP3);
  await synthesizeText(
    tts1,
    'Hello! This is Jenny, a natural American English voice designed for clear and engaging listening comprehension practice.',
    path.join(__dirname, '..', 'audio', 'preview-jenny.mp3')
  );
  tts1.close();
  console.log('  -> preview-jenny.mp3 created');

  // Aria
  const tts2 = new MsEdgeTTS();
  await tts2.setMetadata('en-US-AriaNeural', OUTPUT_FORMAT.AUDIO_24KHZ_96KBITRATE_MONO_MP3);
  await synthesizeText(
    tts2,
    'Hi there! I am Aria, providing clear, expressive, and professional American English pronunciation.',
    path.join(__dirname, '..', 'audio', 'preview-aria.mp3')
  );
  tts2.close();
  console.log('  -> preview-aria.mp3 created');

  // Sonia (British)
  const tts3 = new MsEdgeTTS();
  await tts3.setMetadata('en-GB-SoniaNeural', OUTPUT_FORMAT.AUDIO_24KHZ_96KBITRATE_MONO_MP3);
  await synthesizeText(
    tts3,
    'Hello! I am Sonia, offering authentic British English pronunciation with natural rhythm and intonation.',
    path.join(__dirname, '..', 'audio', 'preview-sonia.mp3')
  );
  tts3.close();
  console.log('  -> preview-sonia.mp3 created');

  console.log('\nAll neural audio generation completed successfully!');
}

run().catch(err => {
  console.error('Fatal error during synthesis:', err);
  process.exit(1);
});
