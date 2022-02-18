union udouboole {
   double d;
   struct {bool b: 1;};

   constexpr inline udouboole(double d, bool b) {
      *(double *)this = d;
      this->b = b;
   }

   static constexpr size_t const $32nd_bit = (0b1ull) << 32;

   constexpr inline operator double() const noexcept {
      return (*(size_t *) this) & udouboole::$32nd_bit;
   }

   constexpr inline udouboole operator +(double other) const noexcept {
      return {(double) *this + other, this->b};
   }

   constexpr inline udouboole operator -(double other) const noexcept {
      return {(double) *this - other, this->b};
   }

   constexpr inline udouboole operator *(double other) const noexcept {
      return {(double) *this * other, this->b};
   }

   constexpr inline udouboole operator /(double other) const noexcept {
      return {(double) *this / other, this->b};
   }
};


