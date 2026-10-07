import test from 'node:test';
import assert from 'node:assert/strict';
import { wistiaMediaId, wistiaUrls, vimeoUrls, iClosedConfirmationUrl } from '../integrations/urls.js';

const id = 'g5pnf59ala'; // Public example from Wistia's own documentation.

test('video IDs and official share, iframe and Aurora script URLs resolve identically', () => {
  for (const value of [id, ` ${id} `, `https://support.wistia.com/medias/${id}`, `https://fast.wistia.net/embed/iframe/${id}`, `https://fast.wistia.com/embed/${id}.js`, `https://support.wi.st/medias/${id}/`]) {
    assert.equal(wistiaMediaId(value), id, value);
  }
});

test('empty, invalid, unsafe and lookalike sources cannot become players', () => {
  for (const value of [null, '', '  ', {}, 'REPLACE_ME', '<iframe src="x">', `https://wistia.com.evil.test/medias/${id}`, `https://evilwistia.com/medias/${id}`, `http://support.wistia.com/medias/${id}`, `https://secret@support.wistia.com/medias/${id}`, `https://fast.wistia.net:8000/embed/iframe/${id}`, `https://support.wistia.com/not-a-video/${id}`]) {
    assert.equal(wistiaUrls(value), null, String(value));
  }
});

test('source links cannot carry booking identity or autoplay/tracking overrides to Wistia', () => {
  const result = wistiaUrls(`https://support.wistia.com/medias/${id}?email=private%40example.test&callId=private&doNotTrack=false#token`, {playerColor:'1d6586'});
  const url = new URL(result.embed);
  assert.equal(url.searchParams.get('email'), null);
  assert.equal(url.searchParams.get('callId'), null);
  assert.equal(url.searchParams.get('doNotTrack'), 'true');
  assert.equal(url.hash, '');
  assert.equal(url.hostname, 'fast.wistia.net');
  assert.equal(url.searchParams.get('web_component'), 'true');
  assert.equal(url.searchParams.get('playerColor'), '1d6586');
});

test('player settings validate color and require explicit tracking opt-in', () => {
  const defaults = new URL(wistiaUrls(id, {playerColor:'url(bad)'}).embed);
  assert.equal(defaults.searchParams.get('playerColor'), '1d6586');
  assert.equal(defaults.searchParams.get('doNotTrack'), 'true');
  const optIn = new URL(wistiaUrls(id, {doNotTrack:false}).embed);
  assert.equal(optIn.searchParams.get('doNotTrack'), 'false');
});

test('Vimeo IDs and official player/share URLs resolve to the same video', () => {
  const videoId = '1233122486';
  for (const value of [videoId, ` ${videoId} `, `https://player.vimeo.com/video/${videoId}?title=0&app_id=58479`, `https://vimeo.com/${videoId}`, `https://www.vimeo.com/${videoId}/`]) {
    const urls = vimeoUrls(value);
    assert.equal(urls.id, videoId);
    assert.equal(new URL(urls.embed).pathname, `/video/${videoId}`);
    assert.equal(new URL(urls.embed).searchParams.get('autoplay'), '0');
    assert.equal(new URL(urls.embed).searchParams.get('autopause'), '1');
    assert.equal(new URL(urls.external).searchParams.has('autoplay'), false);
  }
});

test('Vimeo rejects malformed players, credentials and lookalike hosts', () => {
  for (const value of [null, '', ' ', {}, 'invalid', '0', '<iframe src="x">', 'https://player.vimeo.com.evil.test/video/1233122486', 'https://evilvimeo.com/1233122486', 'http://player.vimeo.com/video/1233122486', 'https://user:password@player.vimeo.com/video/1233122486', 'https://player.vimeo.com:8000/video/1233122486', 'https://player.vimeo.com/not-a-video/1233122486', 'https://vimeo.com/1233122486/extra', 'https://player.vimeo.com/video/1233122486?h=bad%20hash']) {
    assert.equal(vimeoUrls(value), null, String(value));
  }
});

test('Vimeo retains a video access hash without forwarding personal data or playback overrides', () => {
  const result = vimeoUrls('https://player.vimeo.com/video/1233122486?h=abc123&email=private%40example.test&callId=private&autoplay=1&autopause=0&title=1#token');
  const url = new URL(result.embed);
  assert.equal(url.searchParams.get('h'), 'abc123');
  assert.equal(new URL(result.external).searchParams.get('h'), 'abc123');
  assert.equal(url.searchParams.has('email'), false);
  assert.equal(url.searchParams.has('callId'), false);
  assert.equal(url.searchParams.get('title'), '0');
  assert.equal(url.searchParams.get('autoplay'), '0');
  assert.equal(url.searchParams.get('autopause'), '1');
  assert.equal(url.hash, '');
});

test('iClosed requires its official secure host and a widget path', () => {
  for (const value of ['', null, {}, 'https://app.iclosed.io/', 'http://app.iclosed.io/test-widget', 'https://app.iclosed.io.evil.test/test-widget', 'https://user:password@app.iclosed.io/test-widget', 'https://app.iclosed.io:4000/test-widget', 'javascript:alert(1)']) {
    assert.equal(iClosedConfirmationUrl(value), null);
  }
  assert.equal(iClosedConfirmationUrl(' https://app.iclosed.io/test-widget?event=test#ignored '), 'https://app.iclosed.io/test-widget?event=test');
});
