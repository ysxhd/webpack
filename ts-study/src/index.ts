function getTutureTutorialsInfo<T, U extends Profile<string> & Tuture>(info: Array<T>, profile: U): Array<T> {
    console.log(info.length);
    console.log(profile);
    return info;
}
const getTutureTutorialsInfo1: <T>(info: T[]) => T[] = (info) => {
    console.log(info.length);
    return info;
}

getTutureTutorialsInfo<string, object>(['hello tuture'], { username: 'tuture' })
getTutureTutorialsInfo1<string>(['test']);
class Profile<T> {
    username: string;
    nickName: string;
    avatar: string;
    age: T;
}

type Tuture = {
    github: string;
    remote: string[];
}

interface ConstructorFunction<C> {
    new (): C;
}


class TutureProfile extends Profile<string> {
    github: string;
    remote: string[];
}

function createInstance<A extends Profile<string>>(B: ConstructorFunction<A>) {
    return new B();
  }
const myTutureProfile = createInstance(TutureProfile);
