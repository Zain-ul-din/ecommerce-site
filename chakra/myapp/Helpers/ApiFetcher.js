import axios from 'axios'

export async function uploadFile (file , callBack) {
    //if (!file) return
    const url = 'http://localhost:8000/static/'
    let formData = new FormData();
    formData.append("image_upload", file);

    const res = await axios.post(url , formData , {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    }).catch (err => err)
    callBack(res.data)
}
