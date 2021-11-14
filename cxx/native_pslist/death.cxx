#include "windows.hxx"

using namespace ntdll;

/*
Here is documentation on how to use the FUCKING rtl::path::nt_to_dos function.
Also known as RtlNtPathNameToDosPathName. this [PIECE OF FUCKING GARBAGE] API is
so shit that I have to make an entire thing on how to properly instantiate the
absolutely mindnumbingly braindead RTL_UNICODE_STRING_BUFFER. If you're reading
this, fuck you. I don't have anything against you personally, I was just passing
on what the native API told me.
Thank whatever is holy that this author went through it all.
https://mecanik.dev/2020/08/13/convert-dos-and-nt-paths-using-rtl-functions/
Jesus christ, lord almighty.
*/

void start() noexcept {
   rtl::unicode_string_buffer DosPath = {};
   char16_t *FilePart{};
   unicode_string NtPath{u"\\??\\C:\\WINDOWS\\system32\\drivers"};

   char16_t *const DosPathBuffer = (char16_t *) __builtin_alloca(NtPath.length + 2);
   char16_t *const NtPathBuffer  = (char16_t *) __builtin_alloca(NtPath.length + 2);

   {
      size_t i{NtPath.length / 2u};
      DosPathBuffer[i] = NtPathBuffer[i] = u'\0';
      while (i --> 0) {
         DosPathBuffer[i] = NtPathBuffer[i] = NtPath.buffer[i];
      }
   }

   // I renamed the fields. Just figure it out.
   DosPath.byte_buffer.buffer = DosPathBuffer;
   DosPath.byte_buffer.static_buffer = NtPathBuffer;
   DosPath.byte_buffer.size = NtPath.length;
   DosPath.byte_buffer.static_size = NtPath.length;
   DosPath.string.buffer = NtPath.buffer;
   DosPath.string.length = NtPath.length;
   DosPath.string.max_length = NtPath.length;

   if (rtl::path::nt_to_dos(0, &DosPath, nullptr, &FilePart) == OK) {
      // char16_t DosPath.string.buffer[DosPath.string.length / 2]
   }
}
