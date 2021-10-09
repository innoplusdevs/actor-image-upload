import { useState, useEffect, useRef } from "react";

export const useFetch = (reqInfo) => {
    const isMounted = useRef(true);
    const [state, setState] = useState({
        data: null,
        loading: true,
        error: null,
    });

    useEffect(() => {
        return () => {
            isMounted.current = false;
        };
    }, []);

    useEffect(() => {
        setState({ data: null, loading: true, error: null });

        reqInfo()
            .then((data) => {
                if (isMounted.current) {
                    setState({
                        loading: false,
                        error: null,
                        data,
                    });
                }
            })
            .catch((error) => console.error(error, 'eras'));
    }, [reqInfo]);

    return state;
};
