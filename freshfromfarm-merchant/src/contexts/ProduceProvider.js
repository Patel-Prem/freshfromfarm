// import { useContext, useEffect, useState } from "react";
// import { ProduceContext, AuthContext } from "./Context"
// // import APIService from "../services/APIService";

// const ProduceProvider = ({ children }) => {
//     const [searchInput, setSearchInput] = useState([]);
//     const [produceList, setProduceList] = useState([]);


//     const authContext = useContext(AuthContext)

//     // const fetchData = async () => {
//     //     try {
//     //         // Call the API service to fetch the data
//     //         APIService.getProduceDetails(searchInput)
//     //             .then((produceList) => {
//     //                 if (produceList)
//     //                     setProduceList(produceList.produceDetails)
//     //             })
//     //             .catch((error) => {
//     //                 console.error('Error fetching data:', error); // Handle any errors
//     //             });

//     //     } catch (error) {
//     //         console.error('Error fetching data:', error); // Handle any errors
//     //     }
//     // }

//     // useEffect(() => {
//     //     fetchData();
//     // }, [searchInput, authContext.isAuthenticated]);

//     return (
//         <ProduceContext.Provider value={{ produceList, setSearchInput, fetchData }}>
//             {children}
//         </ProduceContext.Provider>
//     );
// };

// export default ProduceProvider;
