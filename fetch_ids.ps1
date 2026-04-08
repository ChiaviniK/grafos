$html = Invoke-RestMethod -Uri "https://docs.google.com/forms/d/e/1FAIpQLScqmNcepeDjuvU7ry_U-vG5vYVXg_lzdri0d58AiF6MGQuFNg/viewform"
$regex = '\[\d+,\"(.*?)\",null,0,\[\[(\d+)'
$matches = [regex]::Matches($html, $regex)
foreach ($match in $matches) {
    Write-Host ($match.Groups[1].Value + " -> " + $match.Groups[2].Value)
}
