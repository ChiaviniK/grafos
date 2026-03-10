import pathlib, re

path = r"c:\Users\lenovo\Desktop\projetos\grafos\src\pages\Fisica1Lesson1.tsx"
content = pathlib.Path(path).read_text(encoding='utf-8')
# Remove unused Beaker import from line 3
content = content.replace(', Beaker', '').replace('Beaker, ', '')
pathlib.Path(path).write_text(content, encoding='utf-8')
print("FIXED")
