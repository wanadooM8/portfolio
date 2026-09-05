const test = require('node:test');
const assert = require('node:assert/strict');
const { matchesKeySequence } = require('../js/utils.js');

test('matchesKeySequence returns false when buffer is shorter than sequence', () => {
  assert.equal(matchesKeySequence(['up'], ['up', 'up', 'down']), false);
});

test('matchesKeySequence returns false when the tail does not match', () => {
  assert.equal(
    matchesKeySequence(['a', 'up', 'down', 'left'], ['up', 'up', 'down']),
    false
  );
});

test('matchesKeySequence returns true when the tail matches exactly', () => {
  assert.equal(
    matchesKeySequence(['x', 'y', 'up', 'up', 'down'], ['up', 'up', 'down']),
    true
  );
});

test('matchesKeySequence returns true when buffer length equals sequence length and matches', () => {
  assert.equal(matchesKeySequence(['up', 'down'], ['up', 'down']), true);
});
