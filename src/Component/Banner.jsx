import { useEffect, useState } from "react";
import axios from "axios";




const Banner = () => {
    const [user, setUser] = useState([]);

    const fetchData = async () => {
        try{
            const res = await axios.get(`https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/banners`, {
                headers: { apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c" }
            });
            console.log(res?.data?.data);
            setUser (res?.data?.data);
        } catch {
            console.log("error");
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <div>
            {user.map((item)=> (
                <div key={item.id}>
                    <h1>{item.name}</h1>
                    <img src={item.imageUrl} alt={item.name} />
                </div>
            ))}
            <h1>Banner</h1>
        </div>
    )
}


export default Banner;