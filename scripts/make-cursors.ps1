Add-Type -AssemblyName System.Drawing

$out = Join-Path $PSScriptRoot "..\public\cursors"
New-Item -ItemType Directory -Force -Path $out | Out-Null

function New-Canvas {
  $bmp = New-Object System.Drawing.Bitmap 32, 32, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
  $g.Clear([System.Drawing.Color]::Transparent)
  return @{ Bitmap = $bmp; Graphics = $g }
}

function Save-Canvas($canvas, $name) {
  $path = Join-Path $out $name
  $canvas.Graphics.Dispose()
  $canvas.Bitmap.Save($path, [System.Drawing.Imaging.ImageFormat]::Png)
  $canvas.Bitmap.Dispose()
}

function New-Color($hex) {
  return [System.Drawing.ColorTranslator]::FromHtml($hex)
}

function Draw-Arrow($fillHex, $strokeHex, $name) {
  $c = New-Canvas
  $g = $c.Graphics
  $points = @(
    (New-Object System.Drawing.PointF 3.5, 2.5),
    (New-Object System.Drawing.PointF 3.5, 21.5),
    (New-Object System.Drawing.PointF 8.5, 16.5),
    (New-Object System.Drawing.PointF 13.2, 25.5),
    (New-Object System.Drawing.PointF 17.2, 23.2),
    (New-Object System.Drawing.PointF 12.4, 14.2),
    (New-Object System.Drawing.PointF 21.5, 14.2)
  )
  $path = New-Object System.Drawing.Drawing2D.GraphicsPath
  $path.AddPolygon($points)
  $fill = New-Object System.Drawing.SolidBrush (New-Color $fillHex)
  $pen = New-Object System.Drawing.Pen (New-Color $strokeHex), 1.6
  $pen.LineJoin = [System.Drawing.Drawing2D.LineJoin]::Round
  $g.FillPath($fill, $path)
  $g.DrawPath($pen, $path)
  $fill.Dispose()
  $pen.Dispose()
  $path.Dispose()
  Save-Canvas $c $name
}

function Draw-Star($fillHex, $strokeHex, $name) {
  $c = New-Canvas
  $g = $c.Graphics
  $cx = 16.0
  $cy = 16.0
  $points = @()
  for ($i = 0; $i -lt 8; $i++) {
    $angle = (-[Math]::PI / 2) + ($i * [Math]::PI / 4)
    $radius = $(if ($i % 2 -eq 0) { 11.5 } else { 3.4 })
    $points += New-Object System.Drawing.PointF (($cx + [Math]::Cos($angle) * $radius), ($cy + [Math]::Sin($angle) * $radius))
  }
  $path = New-Object System.Drawing.Drawing2D.GraphicsPath
  $path.AddPolygon($points)
  $fill = New-Object System.Drawing.SolidBrush (New-Color $fillHex)
  $pen = New-Object System.Drawing.Pen (New-Color $strokeHex), 1.4
  $pen.LineJoin = [System.Drawing.Drawing2D.LineJoin]::Round
  $g.FillPath($fill, $path)
  $g.DrawPath($pen, $path)
  $fill.Dispose()
  $pen.Dispose()
  $path.Dispose()
  Save-Canvas $c $name
}

function Draw-Beam($fillHex, $name) {
  $c = New-Canvas
  $g = $c.Graphics
  $pen = New-Object System.Drawing.Pen (New-Color $fillHex), 1.7
  $pen.StartCap = [System.Drawing.Drawing2D.LineCap]::Round
  $pen.EndCap = [System.Drawing.Drawing2D.LineCap]::Round
  $g.DrawLine($pen, 16, 6, 16, 26)
  $g.DrawLine($pen, 11, 6, 21, 6)
  $g.DrawLine($pen, 11, 26, 21, 26)
  $pen.Dispose()
  Save-Canvas $c $name
}

Draw-Arrow "#1c1216" "#c6a15a" "arrow.png"
Draw-Arrow "#f6eee6" "#e4c88a" "arrow-dark.png"
Draw-Star "#6e2432" "#c6a15a" "star.png"
Draw-Star "#e7b3bc" "#e4c88a" "star-dark.png"
Draw-Beam "#1c1216" "beam.png"
Draw-Beam "#f6eee6" "beam-dark.png"
