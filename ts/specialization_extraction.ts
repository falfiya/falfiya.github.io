declare const dirent: unique symbol;
type dirent<S extends string> = S & {readonly [dirent]: void};

const make_dirent = <S extends string>(S: S) => S as dirent<S>;

declare const user_profile: unique symbol;
type user_profile<username> =
   & `C:/Users/${username extends dirent<infer S> ? S : never}`
   & {readonly [user_profile]: void};

const make_user_profile = <username>(username: username) =>
   `C:/Users/${username}` as user_profile<username>;

const coalpha_dirent = make_dirent("coalpha");
const coalpha_user   = make_user_profile(coalpha_dirent);

if (coalpha_user === "C:/Users/coalpha") {
   
}
