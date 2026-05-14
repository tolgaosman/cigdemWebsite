Add-Type -AssemblyName System.Drawing
function Remove-WhiteBackground ($inputFile, $outputFile) {
    if (-not (Test-Path $inputFile)) { Write-Host "$inputFile not found"; return }
    $img = [System.Drawing.Image]::FromFile($inputFile)
    $bmp = new-object System.Drawing.Bitmap($img)
    $img.Dispose()
    $white = [System.Drawing.Color]::FromArgb(255, 255, 255, 255)
    $bmp.MakeTransparent($white)
    $bmp.Save($outputFile, [System.Drawing.Imaging.ImageFormat]::Png)
    $bmp.Dispose()
    Write-Host "Processed $inputFile -> $outputFile"
}
Remove-WhiteBackground -inputFile "public\logo isimli.png" -outputFile "public\logo-isimli-transparent.png"
Remove-WhiteBackground -inputFile "public\logo.png" -outputFile "public\logo-transparent.png"
