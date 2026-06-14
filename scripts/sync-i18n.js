#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const zhPath = path.resolve(__dirname, '../lib/i18n/zh.ts');
const enPath = path.resolve(__dirname, '../lib/i18n/en.ts');

const argv = process.argv.slice(2);
const copyValues = argv.includes('--copy'); // if true, copy zh values; otherwise use empty placeholders

function extractExportedObject(content) {
  const exportIdx = content.indexOf('export default');
  if (exportIdx === -1) return null;
  const braceIdx = content.indexOf('{', exportIdx);
  if (braceIdx === -1) return null;

  // find matching closing brace
  let i = braceIdx;
  let depth = 0;
  let inSingle = false;
  let inDouble = false;
  let inTemplate = false;
  let escaped = false;
  while (i < content.length) {
    const ch = content[i];
    if (!escaped) {
      if (ch === "'" && !inDouble && !inTemplate) inSingle = !inSingle;
      else if (ch === '"' && !inSingle && !inTemplate) inDouble = !inDouble;
      else if (ch === '`' && !inSingle && !inDouble) inTemplate = !inTemplate;
      else if (!inSingle && !inDouble && !inTemplate) {
        if (ch === '{') depth++;
        else if (ch === '}') {
          depth--;
          if (depth === 0) {
            // capture from braceIdx to i
            return content.slice(braceIdx, i + 1);
          }
        }
      }
    }
    escaped = !escaped && ch === '\\';
    i++;
  }
  return null;
}

function parseObject(text) {
  // remove trailing `as const` occurrence if present
  try {
    // try to evaluate as JS object safely
    // replace TypeScript readonly modifiers like 'as const' and trailing commas are ok in Node >= 8
    const cleaned = text.replace(/as const\s*;?$/m, '');
    // Function to evaluate object literal
    const fn = new Function('return (' + cleaned + ')');
    return fn();
  } catch (e) {
    console.error('Failed to parse object:', e.message);
    return null;
  }
}

function diffAdditions(src, dest) {
  // returns object containing keys present in src but missing in dest
  if (typeof src !== 'object' || src === null) return src;
  const additions = Array.isArray(src) ? [] : {};
  for (const key of Object.keys(src)) {
    if (!(key in dest)) {
      additions[key] = src[key];
    } else {
      if (typeof src[key] === 'object' && src[key] !== null && typeof dest[key] === 'object' && dest[key] !== null) {
        const sub = diffAdditions(src[key], dest[key]);
        if (typeof sub === 'object' && Object.keys(sub).length === 0) {
          // nothing
        } else if (sub !== undefined && (Array.isArray(sub) ? sub.length > 0 : Object.keys(sub).length > 0)) {
          additions[key] = sub;
        }
      }
    }
  }
  return additions;
}

function makePlaceholders(obj) {
  if (typeof obj !== 'object' || obj === null) return '';
  const out = Array.isArray(obj) ? [] : {};
  for (const k of Object.keys(obj)) {
    if (typeof obj[k] === 'object' && obj[k] !== null) out[k] = makePlaceholders(obj[k]);
    else out[k] = '';
  }
  return out;
}

function mergeWithoutOverwriting(target, additions) {
  if (typeof additions !== 'object' || additions === null) return target;
  const out = Array.isArray(target) ? target.slice() : {...target};
  for (const key of Object.keys(additions)) {
    if (!(key in out)) out[key] = additions[key];
    else if (typeof additions[key] === 'object' && additions[key] !== null && typeof out[key] === 'object' && out[key] !== null) {
      out[key] = mergeWithoutOverwriting(out[key], additions[key]);
    }
  }
  return out;
}

function formatAsTs(obj) {
  // use JSON.stringify then convert double quotes to single quotes for nicer TS look
  const json = JSON.stringify(obj, null, 2);
  // convert keys to unquoted if possible? Keep it simple: return json with single quotes
  return json.replace(/\"([^\"]+)\":/g, '$1:').replace(/\"/g, "'");
}

function syncOnce() {
  const zhRaw = fs.readFileSync(zhPath, 'utf8');
  const enRaw = fs.readFileSync(enPath, 'utf8');
  const zhObjText = extractExportedObject(zhRaw);
  const enObjText = extractExportedObject(enRaw);
  if (!zhObjText) {
    console.error('Cannot find exported object in', zhPath);
    return;
  }
  if (!enObjText) {
    console.error('Cannot find exported object in', enPath);
    return;
  }
  const zhObj = parseObject(zhObjText);
  const enObj = parseObject(enObjText);
  if (!zhObj || !enObj) {
    console.error('Failed to parse objects; aborting');
    return;
  }

  const additionsRaw = diffAdditions(zhObj, enObj);
  const additions = copyValues ? additionsRaw : makePlaceholders(additionsRaw);
  const hasAdditions = Object.keys(additions).length > 0;
  if (!hasAdditions) {
    console.log('No new keys to add.');
    return;
  }
  // backup existing en.ts
  try {
    const bakPath = enPath + '.bak.' + Date.now();
    fs.copyFileSync(enPath, bakPath);
    console.log('Backup created at', bakPath);
  } catch (e) {
    console.warn('Failed to create backup:', e.message);
  }

  const merged = mergeWithoutOverwriting(enObj, additions);
  const out = "export default " + formatAsTs(merged) + " as const;\n";
  fs.writeFileSync(enPath, out, 'utf8');
  console.log('Appended', JSON.stringify(additions, null, 2));
  if (!copyValues) console.log('New keys were added as empty placeholders. Use --copy to copy zh values instead.');
}

function watch() {
  console.log('Watching', zhPath, 'for changes...');
  fs.watchFile(zhPath, {interval: 500}, (curr, prev) => {
    if (curr.mtimeMs !== prev.mtimeMs) {
      console.log('Detected change, syncing...');
      try { syncOnce(); } catch (e) { console.error(e); }
    }
  });
}

if (require.main === module) {
  const argv = process.argv.slice(2);
  if (argv.includes('--watch') || argv.includes('-w')) {
    syncOnce();
    watch();
  } else {
    syncOnce();
  }
}
