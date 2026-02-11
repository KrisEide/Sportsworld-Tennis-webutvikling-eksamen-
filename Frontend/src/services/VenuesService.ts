import axios from "axios";
import { type IVenue } from "../interfaces/IVenue";

const endpoint = "http://localhost:5285/api/venue";
const endpointImgUpload = "http://localhost:5285/api/venue/imgupload";

interface IVenuesListResponse {
  success: boolean;
  data: IVenue[] | null; 
}
interface IVenuesSingleResponse {
  success: boolean;
  data: IVenue | null; 
}

const getAllVenues = async (): Promise<IVenuesListResponse> => {
  try {
    const response = await axios.get(endpoint);
    return {
      success: true,
      data: response.data,
    };
  } catch {
    return {
      success: false,
      data: null,
    };
  }
};


const postVenue = async (venue: IVenue, image: File) => {
  try {
    // legger til venue
    const response = await axios.post(endpoint, venue);

    //bildeopplastning - opprette et objekt som pakker inn bildet/filen slik at det kan tas imot av APIet, formdata er en måte å gjre dette på slik at det kan tas i bruk
   const formData = new FormData();
   formData.append("file", image);

   await axios ({
    // POST-kall for bildeopplastning, bildet sendes som multipart/formdata ved hjelp av formdata og headers
    url: endpointImgUpload,
    method: "POST",
    data: formData,
    headers: { "Content-Type": "multipart/form-data" },
  });

  formData.delete("file");

  // returnerer objekt som viser at det var suksess eller ikke 
  return { success: true, data: response.data };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Creating venue failed!" };
  }


};

const getVenueById = async (id: number): Promise<IVenuesSingleResponse> => {
  try {
    const response = await axios.get(`${endpoint}/${id}`);
    return {
      success: true,
      data: response.data, // et enkelt-venue
    };
  } catch {
    return {
      success: false,
      data: null,
    };
  }
};

interface IDefaultResponse{
    success: boolean
}

const putVenue = async (
  editedVenue: IVenue
): Promise<IDefaultResponse> => {
  try {
    const response = await axios.put(endpoint, editedVenue);
    return {
      success: true,
    };
  } catch {
    return {
      success: false,
    };
  }
};

const deleteVenue = async (id: number) => {
  try {
    const response = await fetch(`${endpoint}/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      return { success: true };
    } else {
      return { success: false, error: "Delete failed!" };
    }
  } catch (error) {
    return { success: false, error };
  }
};

export default { getAllVenues, postVenue, getVenueById, putVenue, deleteVenue };
