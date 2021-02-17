declare const fs_path_s: unique symbol;

type index_holder<path extends string, index extends number> =
   {[i in index]: path};

type fs_path<path extends string, index extends number> =
   string & {readonly fs_path: index_holder<path, index>};

type usr_p = fs_path<"usr", 0>;
type etc_p = fs_path<"etc", 0>;

type nonsense_p = usr_p & etc_p;
type nonsense_p_is_never = nonsense_p extends never ? true : false;

type usr_i = index_holder<"usr", 0>;
type etc_i = index_holder<"etc", 0>;

type nonsense_i = usr_i & etc_i;
type nonsense_i_is_never = nonsense_i extends never ? true : false;

const a: number = "" as never;
