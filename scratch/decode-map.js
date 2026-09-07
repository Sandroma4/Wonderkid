import fs from 'fs';
import { SourceMapConsumer } from 'source-map';

async function locate() {
  const mapFile = process.argv[2];
  const line = parseInt(process.argv[3], 10);
  const column = parseInt(process.argv[4], 10);

  const rawSourceMap = JSON.parse(fs.readFileSync(mapFile, 'utf8'));

  await SourceMapConsumer.with(rawSourceMap, null, consumer => {
    const pos = consumer.originalPositionFor({
      line: line,
      column: column
    });

    console.log(pos);
  });
}

locate().catch(console.error);
