import re, pathlib

files = {
    r"c:\Users\lenovo\Desktop\projetos\grafos\src\pages\Fisica1Syllabus.tsx": ("(s, i)", "(_, i)"),
    r"c:\Users\lenovo\Desktop\projetos\grafos\src\pages\Fisica2Syllabus.tsx": ("(s, i)", "(_, i)"),
    r"c:\Users\lenovo\Desktop\projetos\grafos\src\pages\Fisica3Syllabus.tsx": ("(b, i)", "(_, i)"),
}

for path, (old, new) in files.items():
    content = pathlib.Path(path).read_text(encoding='utf-8')
    if old in content:
        pathlib.Path(path).write_text(content.replace(old, new), encoding='utf-8')
        print(f"FIXED: {path}")
    else:
        print(f"NOT FOUND {old} in {path}")
