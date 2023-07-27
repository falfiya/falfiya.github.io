Add-Type -assembly System.Windows.Forms

$frm = New-Object System.Windows.Forms.Form
$frm.Text = "GUI for my PoSh script"
$frm.Width = 600
$frm.Height = 400

$res = $frm.ShowDialog()


[System.Windows.Forms.DialogResult]::Abort.GetType()
