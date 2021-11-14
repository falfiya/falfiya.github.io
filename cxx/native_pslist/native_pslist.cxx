// sources:
// The Definitive Guide on Win32 to NT Path Conversions
//    https://googleprojectzero.blogspot.com/2016/02/the-definitive-guide-on-win32-to-nt.html
// Convert DOS and NT paths using RTL functions
//    https://mecanik.dev/2020/08/13/convert-dos-and-nt-paths-using-rtl-functions/
#include "windows.hxx"

using namespace ntdll;
using namespace kernel32;

#pragma comment(linker, "/entry:start")
#pragma comment(linker, "/subsystem:console")
void start() noexcept {
   handle stdout{get_std_handle(std_output_handle)};

   rtl::unicode_string_buffer DosPath = {};
   char16_t *FilePart{};
   unicode_string NtPath{u"\\Device\\HarddiskVolume6\\Program Files\\Mullvad VPN\\Mullvad VPN.exe"};

   char16_t *const DosPathBuffer = (char16_t *) __builtin_alloca(NtPath.length + 2);
   char16_t *const NtPathBuffer  = (char16_t *) __builtin_alloca(NtPath.length + 2);

   {
      size_t i{NtPath.length / 2u};
      DosPathBuffer[i] = NtPathBuffer[i] = u'\0';
      while (i --> 0) {
         DosPathBuffer[i] = NtPathBuffer[i] = NtPath.buffer[i];
      }
   }

   DosPath.byte_buffer.buffer = DosPathBuffer;
   DosPath.byte_buffer.static_buffer = nullptr;
   DosPath.byte_buffer.size = NtPath.length;
   DosPath.byte_buffer.static_size = 0;
   DosPath.string.buffer = NtPath.buffer;
   DosPath.string.length = NtPath.length;
   DosPath.string.max_length = NtPath.length;

   if (rtl::path::nt_to_dos(0, &DosPath, nullptr, &FilePart) == OK) {
      write_console_w(stdout, DosPath.string.buffer, DosPath.string.length / 2);
      // write_console_w(stdout, DosPathBuffer, DosPath.byte_buffer.size / 2);
   }
   exit();

   handle proc{};
   u64 buf_len{0xff};
   using namespace ntdll::process;
   while (get_next(proc, access::maximum, 0, 0, &proc) == OK) {
      u64 actual_len;
      u32 status;

      unicode_string *const buf{(unicode_string *) __builtin_alloca(buf_len + 2)};

      status = {query_information(proc, info_class::image_filename, buf, buf_len, &actual_len)};

      if (status == length_mismatch) {
         buf_len = {actual_len};
         status = {query_information(proc, info_class::image_filename, buf, buf_len, &actual_len)};
      }

      if (status == OK) {
         u32 halflen{buf->length / 2u};
         buf->buffer[halflen] = u'\n';
         write_console_w(stdout, buf->buffer, halflen + 1);
      }

      // u64 path_type;
      // if (path::nt_to_dos(0, buf, &path_type) == OK) {
      //    u32 halflen{buf->length / 2u};
      //    buf->buffer[halflen] = u'\n';
      //    write_console_w(stdout, buf->buffer, halflen + 1);
      // }
   }

   exit();
}
