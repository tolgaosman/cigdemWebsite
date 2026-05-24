 = Get-Content -Path 'src\app\globals.css' -Raw -Encoding UTF8
 =  -replace 'Cormorant\+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500', 'Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500'
 =  -replace 'Inter:wght@300;400;500;600', 'Outfit:wght@300;400;500;600'
 =  -replace 'Cormorant Garamond', 'Playfair Display'
 =  -replace 'Inter', 'Outfit'
Set-Content -Path 'src\app\globals.css' -Value  -Encoding UTF8
