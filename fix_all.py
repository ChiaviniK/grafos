import glob
import re

for f in glob.glob(r"c:\Users\lenovo\Desktop\projetos\grafos\src\components\slides\*.tsx"):
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # Replace ONLY the main container 'h-full' to 'flex-1 min-h-[100%]'
    # We look for `<div className="flex flex-col h-full ..."`
    # and `<div className="flex flex-col items-center justify-center h-full ..."`
    # Many combinations exist. Easiest is to replace ' h-full ' with ' min-h-[100%] flex-1 ' 
    # anywhere inside a className attached to animate-in, or just the first div.
    
    # Using a cautious regex for the outermost div class:
    # Match the export function ... return ( <div className="... h-full ..."
    content = re.sub(r'(return\s*\(\s*<div\s+className="[^"]*?)\bh-full\b([^"]*?")', r'\1min-h-[100%] flex-1\2', content)
    
    with open(f, 'w', encoding='utf-8') as file:
        file.write(content)
        
print("Fixed all Slide root containers")
