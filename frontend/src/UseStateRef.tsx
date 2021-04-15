import { useState, useRef, MutableRefObject } from "react";

const useStateRef = <T extends unknown>(value: T): [T, (data: T) => void, MutableRefObject<T>] => {
  const [myState, _setMyState] = useState(value);

  const myStateRef = useRef(myState);

  const setMyState = (data: T) => {
    myStateRef.current = data;
    _setMyState(data);
  };

  return [myState, setMyState, myStateRef]
};

export default useStateRef;