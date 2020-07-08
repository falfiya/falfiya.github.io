Public Class Serious
   Private Sub btnProcess_Click(sender As Object, e As EventArgs) Handles btnProcess.Click
      Dim out = New List(Of String)
      For Each c As Char In txtInput.Text.ToCharArray()
         out.Add(c.ToString)
      Next
      txtOutput.Text = String.Join(" "c, out)
   End Sub

   Private Sub Serious_Load(sender As Object, e As EventArgs) Handles MyBase.Load

   End Sub
End Class
