'use strict';

const assert = require('assert');
const Kareem = require('../');
const { describe, it } = require('mocha');

describe('hasHooks', function() {
  it('returns false for toString (Automattic/mongoose#6538)', function() {
    const k = new Kareem();
    assert.ok(!k.hasHooks('toString'));
  });
});

describe('merge', function() {
  it('handles async pres if source doesnt have them', function() {
    const k1 = new Kareem();
    k1.pre('cook', true, function(next, done) {
      setTimeout(
        function() {
          done('error!');
        },
        5);

      next();
    });

    assert.equal(k1._pres.get('cook').numAsync, 1);

    const k2 = new Kareem();
    const k3 = k2.merge(k1);
    assert.equal(k3._pres.get('cook').numAsync, 1);
  });
});

describe('filter', function() {
  it('returns clone with only hooks that match `fn()`', function() {
    const k1 = new Kareem();

    k1.pre('update', { document: true }, f1);
    k1.pre('update', { query: true }, f2);
    k1.pre('remove', { document: true }, f3);

    k1.post('update', { document: true }, f1);
    k1.post('update', { query: true }, f2);
    k1.post('remove', { document: true }, f3);

    const k2 = k1.filter(hook => hook.document);
    assert.equal(k2._pres.get('update').length, 1);
    assert.equal(k2._pres.get('update')[0].fn, f1);
    assert.equal(k2._pres.get('remove').length, 1);
    assert.equal(k2._pres.get('remove')[0].fn, f3);

    assert.equal(k2._posts.get('update').length, 1);
    assert.equal(k2._posts.get('update')[0].fn, f1);
    assert.equal(k2._posts.get('remove').length, 1);
    assert.equal(k2._posts.get('remove')[0].fn, f3);

    const k3 = k1.filter(hook => hook.query);
    assert.equal(k3._pres.get('update').length, 1);
    assert.equal(k3._pres.get('update')[0].fn, f2);
    assert.ok(!k3._pres.has('remove'));

    assert.equal(k3._posts.get('update').length, 1);
    assert.equal(k3._posts.get('update')[0].fn, f2);
    assert.ok(!k3._posts.has('remove'));

    function f1() {}
    function f2() {}
    function f3() {}
  });
});
