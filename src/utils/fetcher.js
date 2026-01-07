import Axios from "config/api";

const fetcher = (url , user) => {
    if(user) {
        return Axios( url , {
            headers : {
                Authorization : `Bearer ${user?.token || ''}`
            }
        });
    }else {
        return Axios( url );
    }
}

export default fetcher;