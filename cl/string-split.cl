(defun string-split (needle haystack)
   (if (= 0 (length haystack))
      nil
      (let ((idx (position needle haystack)))
         (if (null idx)
            (list haystack)
            (let (
               (word (subseq haystack 0 idx))
               (rest (subseq haystack (+ idx 1))))
                  (append (list word) (string-split needle rest)))))))
(trace string-split)
(print (string-split #\ "hello world"))

(defun string-split2 (needle haystack)
   (if (= 0 (length haystack))
      (return-from string-split nil))

   (let ((idx (position needle haystack)))
      (if (null idx)
         (return-from string-split (list haystack)))

      (let (
         (word (subseq haystack 0 idx))
         (rest (subseq haystack (+ idx 1))))
            (append (list word) (string-split needle rest)))))
(trace string-split2)
(print (string-split2 #\ "hello world"))
