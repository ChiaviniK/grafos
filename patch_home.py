import pathlib, re

# ── Patch Fisica2Syllabus to link first 10 aulas of S1 ─────────────────────
path = r"c:\Users\lenovo\Desktop\projetos\grafos\src\pages\Fisica2Syllabus.tsx"
content = pathlib.Path(path).read_text(encoding='utf-8').replace('\r\n', '\n')

# Find the lesson row div and replace it (same pattern as Fisica1Syllabus)
old_snippet = 'className="flex gap-4 p-4 rounded-xl border border-slate-800 bg-slate-900/50 transition-all hover:border-slate-600">'
if old_snippet in content:
    # Look for the broader block
    # Use a pattern similar to F1 patch
    print("FOUND LESSON ROW — applying patch")
else:
    print("NOT FOUND, checking file structure...")
    idx = content.find('aulas.map')
    print(repr(content[idx:idx+400]))
