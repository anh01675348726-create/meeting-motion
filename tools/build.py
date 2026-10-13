#!/usr/bin/env python3
"""把 src/ 里的样式、脚本和子集化字体内联成一个完全离线的 index.html。

用法：python3 tools/build.py [字体目录]
字体目录需包含 wenkai.ttf / wenkaib.ttf（霞鹜文楷 Regular / Medium）、kuaile.ttf（站酷快乐体）、caveat.ttf。
"""
import base64, io, os, re, sys
from fontTools import subset
from fontTools.ttLib import TTFont

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, 'src')
FONTS = sys.argv[1] if len(sys.argv) > 1 else '/tmp/fonts'
JS = ['engine.js', 'icons.js', 'scenes_a.js', 'scenes_b.js', 'scenes_c.js', 'scenes_d.js', 'main.js']

def read(n):
    with open(os.path.join(SRC, n), encoding='utf-8') as f:
        return f.read()

tpl = read('template.html')
css = read('style.css')
js = [read(n) for n in JS if os.path.exists(os.path.join(SRC, n))]
alltext = tpl + css + ''.join(js)
chars = set(alltext) | set(chr(c) for c in range(0x20, 0x7f)) | set('“”‘’「」『』《》【】（）—…·、，。：；！？％＋＝→←↑↓✓✗①②③④⑤⑥⑦⑧⑨⑩●○◆★☆✎')
text = ''.join(sorted(chars))

def sub(fname, family, weight='400', only_latin=False):
    path = os.path.join(FONTS, fname)
    font = TTFont(path)
    opts = subset.Options()
    opts.flavor = 'woff2'
    opts.layout_features = ['*'] if only_latin else ['kern', 'liga', 'calt', 'locl', 'vert', 'vrt2']
    opts.name_IDs = ['*']
    opts.notdef_outline = True
    s = subset.Subsetter(opts)
    s.populate(text=''.join(c for c in text if ord(c) < 0x250) if only_latin else text)
    s.subset(font)
    buf = io.BytesIO()
    font.flavor = 'woff2'
    font.save(buf)
    b = buf.getvalue()
    print(f'  {family:8s} {len(b)/1024:7.1f} KB')
    return f"@font-face{{font-family:'{family}';src:url(data:font/woff2;base64,{base64.b64encode(b).decode()}) format('woff2');font-weight:{weight};font-display:block}}"

print('subsetting fonts, %d chars' % len(text))
faces = '\n'.join([
    sub('wenkai.ttf', 'WenKai', '400'),
    sub('wenkaib.ttf', 'WenKai', '700'),
    sub('wenkaib.ttf', 'WenKaiM', '400'),
    sub('kuaile.ttf', 'KuaiLe', '400'),
    sub('caveat.ttf', 'Caveat', '400', only_latin=True),
])
html = tpl.replace('/*FONTS*/', faces).replace('/*CSS*/', css).replace('/*JS*/', '\n'.join(js).replace('</script', '<\\/script'))
out = os.path.join(ROOT, 'index.html')
with open(out, 'w', encoding='utf-8') as f:
    f.write(html)
print('wrote', out, '%.1f KB' % (len(html.encode()) / 1024))
