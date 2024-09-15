import { useState } from "react";
import { useLocalStorage } from "./useLocalStorage";

export function useFilter(datalist, callback) {

    const [query, setquery] = useLocalStorage('query','')

    const filtered = datalist.filter(
        (data) => {

            // using customized
          return callback(data).toLowerCase().includes(query)

            //for hardcore value
        //    return data.category.toLowerCase().includes(query)
           // console.log(el);
            // console.log(callback(el));

        }
    )
  
   
    return [filtered, setquery]
}

