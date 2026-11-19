// news-image-20261119 entry (Node 22, standard library only):
// the image is the entry.png beside this file, and the program copies
// it to /output/entry.png, verifying the copy byte for byte.
//
// The gate takes a whole PNG or JPEG of at most 1 MiB and 1024 by
// 1024 pixels, and the judge sees exactly the bytes copied.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for
// /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join } from 'node:path';

const source = new URL('./entry.png', import.meta.url);
const dest = join(process.env.MAKEFUN_OUTPUT_DIR ?? '/output', 'entry.png');

copyFileSync(source, dest);

const want = createHash('sha256').update(readFileSync(source)).digest('hex');
const got = createHash('sha256').update(readFileSync(dest)).digest('hex');
if (want !== got) {
  throw new Error(`entry.png copy mismatch: ${got} != ${want}`);
}
console.log(`wrote ${dest} (sha256 ${got})`);
