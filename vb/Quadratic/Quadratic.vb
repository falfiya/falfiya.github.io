Imports System.Text
Imports AnsiCodes
Module Quadratic
   Sub Main(args As String())
      For Each arg As String In args
         Console.WriteLine($"{Color.Cyan}{arg}{Reset.All}")
      Next
   End Sub
   Private Sub PrintEq(a As Integer, b As Integer, c As Integer)
      ' It's faster to allocate once
      Dim sb As New StringBuilder(64)
      sb.Append(a, Color.DrkGray, "x", )
      Console.WriteLine(
      )
   End Sub
End Module
