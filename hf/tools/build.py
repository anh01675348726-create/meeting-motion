#!/usr/bin/env python3
"""把 src/timeline.json（唯一的时间表来源）写成 src/timeline.js，并同步 index.html 的总时长。"""
import json,re
tl=json.load(open('src/timeline.json',encoding='utf-8'))
open('src/timeline.js','w',encoding='utf-8').write('window.TIMELINE='+json.dumps(tl,ensure_ascii=False)+';\n')
h=open('index.html',encoding='utf-8').read()
h=re.sub(r'data-duration="[\d.]+"',f'data-duration="{tl["duration"]}"',h)
h=re.sub(r'tl\.to\(\{\}, \{ duration: [\d.]+',f'tl.to({{}}, {{ duration: {tl["duration"]}',h)
open('index.html','w',encoding='utf-8').write(h)
print('timeline synced:',tl['duration'],'s,',len(tl['scenes']),'scenes')
