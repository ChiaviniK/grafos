import glob
import re

for f in glob.glob(r"c:\\Users\\lenovo\\Desktop\\projetos\\grafos\\src\\components\\slides\\DevSecSlide*.tsx"):
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # Replace ONLY the main container 'h-full' to 'flex-1' or 'min-h-full'
    # We look for `<div className="flex flex-col h-full animate-in`
    # and `<div className="flex flex-col items-center justify-center h-full`
    content = re.sub(r'className="(.*?)h-full(.*?animate-in.*?)"', r'className="\1 min-h-full flex-1 \2"', content)
    
    with open(f, 'w', encoding='utf-8') as file:
        file.write(content)
print("Done fixing slides")
