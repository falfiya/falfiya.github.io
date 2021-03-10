declare const dirent: unique symbol;
type dirent<S extends string = string> = S & {readonly [dirent]: void};

type user_profile<username extends dirent> =
   `C:/Users/${unwrap<username>}`;

declare const coalpha: user_profile<"coalpha" & dirent>;

// const get_music = <username extends string>(profile: user_profile<username & dirent>) =>
//    `${profile}/Music` as `${typeof profile}/Music`;

// const e = get_music(coalpha);
