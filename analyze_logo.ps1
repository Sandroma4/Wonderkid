Add-Type -AssemblyName System.Drawing

$img = [System.Drawing.Bitmap]::FromFile("c:\Users\romai\golden-xi\public\logo.png")
$width = $img.Width
$height = $img.Height
$startY = [int]($height * 0.75) # Bottom 25%

$colorCounts = @{}

for ($y = $startY; $y -lt $height; $y++) {
    for ($x = 0; $x -lt $width; $x++) {
        $pixel = $img.GetPixel($x, $y)
        if ($pixel.A -gt 50 -and ($pixel.R -lt 240 -or $pixel.G -lt 240 -or $pixel.B -lt 240)) {
            $hex = "#{0:X2}{1:X2}{2:X2}" -f $pixel.R, $pixel.G, $pixel.B
            if (-not $colorCounts.ContainsKey($hex)) {
                $colorCounts[$hex] = 0
            }
            $colorCounts[$hex]++
        }
    }
}

$img.Dispose()

$colorCounts.GetEnumerator() | Sort-Object Value -Descending | Select-Object -First 10 | Format-Table Name, Value
