#include <type_traits>
using namespace std;

using u8 = unsigned char;
using u16 = unsigned short;
using u32 = unsigned int;
using u64 = unsigned long;
using handle = void *;

namespace kernel32 {
   constexpr u32 std_output_handle = -11;

   __declspec(dllimport) handle get_std_handle(u32) noexcept asm("GetStdHandle");
   __declspec(dllimport) u32 write_console_w(
      handle where,
      char16_t const *text,
      u32 chars_to_write,
      u32 *amount_written = (u32[1]){},
      void *reserved_always_null = nullptr
   ) noexcept asm("WriteConsoleW");

   __declspec(dllimport) __attribute__((noreturn)) void exit(u32 = 0) noexcept asm("ExitProcess");
}

namespace ntdll {
   constexpr u32 OK{0};
   constexpr u32 length_mismatch{0xC0000004};
   struct unicode_string {
      // length in bytes. yes, the API is stupid
      u16 length;
      u16 max_length;
      char16_t *buffer;

      inline unicode_string() noexcept = default;
      __declspec(dllimport) unicode_string(char16_t const *source) noexcept asm("RtlInitUnicodeString");
   };

   namespace access {
      constexpr u32 maximum{0x02000000L};
   }

   namespace process {
      __declspec(dllimport) u32 get_next(
         handle process,
         u32 desired_access,
         u64 h_attrib,
         u64 flags,
         handle *next_process
      ) noexcept asm("NtGetNextProcess");
      enum class info_class {
         basic_information = 0,
         debug_port = 7,
         wow64_information = 26,
         image_filename = 27,
         break_on_termination = 29,
         subsystem_information = 75,
      };
      __declspec(dllimport) u32 query_information(
         handle process,
         info_class pic,
         void *res_buf,
         u64 buf_length,
         u64 *info_length
      ) noexcept asm("NtQueryInformationProcess");
   }

   namespace rtl {
      struct buffer {
         char16_t *buffer;
         char16_t *static_buffer;
         size_t size;
         size_t static_size;
         size_t *reserved1;
         void *reserved2;
      };
      struct unicode_string_buffer {
         unicode_string string;
         buffer byte_buffer;
         char16_t null_char;
      };

      namespace path {
         __declspec(dllimport) u32 nt_to_dos(
            u64 flags,
            unicode_string_buffer *path,
            u64 *idk,
            char16_t **filepart
         ) noexcept asm("RtlNtPathNameToDosPathName");

         // the above API is so despicable that not making a wrapper would be
         // downright cruelty.
         // inline nt_to_dos(unicode_string *path) noexcept {
            
         // }
      }
   }
}
