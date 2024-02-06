import { useEffect } from "react";
import axios from "axios";
import swal from "sweetalert";
const useAdd = (params) => {
    const addData = async (url) => {
      try {
        const response = await axios.post(url , params); //Adding the data
        if (response) {
          swal("User Added SuccessFully!!!");
        }
      } catch (error) {
        return error;
      }
    };
return [addData]
};
export { useAdd };
