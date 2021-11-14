struct unicode_string_buffer {
   struct {
      u16 length;
      u16 max_length;
      char16_t *buffer;
   } string;
   struct {
      char16_t *buffer;
      char16_t *static_buffer;
      size_t size;
      size_t static_size;
      size_t *reserved1;
      void *reserved2;
   } byte_buffer;
   char16_t null_char;
};
