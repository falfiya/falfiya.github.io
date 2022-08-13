// taken from my blasted CIS 22A course
import java.util.Arrays;
import java.util.stream.Stream;

import java.lang.IndexOutOfBoundsException;

@SuppressWarnings("unchecked")
public class Vector<T> {
   private int cursor = 0;
   private int capacity;
   private T[] elements;

   public Vector() {
      this(0);
   }

   public Vector(final int capacity) {
      this.capacity = capacity;
      this.elements = (T[]) new Object[capacity];
   }

   public Vector(final T[] data) {
      this.cursor = data.length;
      this.capacity = data.length * 2;
      this.elements = (T[]) new Object[capacity];

      // copy <5>data.length elements from <1>data starting at <2> into the
      // destination array at <3>this.elements starting at <4>0
      System.arraycopy(data, 0, this.elements, 0, data.length);
   }

   public void addCapacity(final int moreCapacity) {
      if (capacity < 0) {
         return;
      }

      this.capacity += moreCapacity;
      final var newArray = (T[]) new Object[this.capacity];

      System.arraycopy(this.elements, 0, newArray, 0, this.cursor);

      this.elements = newArray;
   }

   public void doubleCapacity() {
      this.capacity *= 2;

      final var newArray = (T[]) new Object[this.capacity];

      System.arraycopy(this.elements, 0, newArray, 0, this.cursor);

      this.elements = newArray;

      System.gc();
   }

   public void pushBack(final T elem) {
      if (this.cursor == this.capacity) {
         this.doubleCapacity();
      }

      this.elements[this.cursor] = elem;
      this.cursor++;
   }

   public void pushBackUnchecked(final T elem) {
      this.elements[this.cursor] = elem;
      this.cursor++;
   }

   public int size() { return this.cursor; }
   public int capacity() { return this.capacity; }

   public T get(int idx) {
      if (idx < this.cursor) {
         return this.elements[idx];
      }

      throw new IndexOutOfBoundsException(
         new StringBuilder(48)
            .append("Cannot get index ")
            .append(idx)
            .append("! Max is ")
            .append(this.cursor - 1)
            .toString()
      );
   }

   public T getUnchecked(int idx) {
      return this.elements[idx];
   }

   public Stream<T> stream() {
      return Arrays.stream(this.elements);
   }
}
